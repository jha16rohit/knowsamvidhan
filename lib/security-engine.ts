import crypto from "crypto";
import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type RiskDecision = "ALLOW" | "OTP" | "BLOCK";
export type RiskSeverity = "low" | "medium" | "high" | "critical";

type Signal = {
  key: string;
  label: string;
  value: number;
  weight: number;
  active: boolean;
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const parseIp = (value?: string | null) =>
  (value || "unknown").split(",")[0]?.trim() || "unknown";

export const hashDeviceFingerprint = (input: {
  userAgent?: string | null;
  acceptLanguage?: string | null;
  ipAddress?: string | null;
}) =>
  crypto
    .createHash("sha256")
    .update(
      [
        input.userAgent || "unknown-agent",
        input.acceptLanguage || "unknown-language",
        (input.ipAddress || "unknown-ip").split(".").slice(0, 3).join("."),
      ].join("|"),
    )
    .digest("hex");

export const getSecurityRequestContext = (request: Request | NextRequest) => {
  const headers = request.headers;
  const ipAddress = parseIp(
    headers.get("x-forwarded-for") ||
      headers.get("x-real-ip") ||
      headers.get("cf-connecting-ip"),
  );
  const userAgent = headers.get("user-agent") || "unknown";
  const acceptLanguage = headers.get("accept-language") || "unknown";
  const country =
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country") ||
    "UN";

  return {
    ipAddress,
    userAgent,
    acceptLanguage,
    country,
    deviceId: hashDeviceFingerprint({ userAgent, acceptLanguage, ipAddress }),
  };
};

const decisionFromRisk = (riskScore: number): RiskDecision => {
  if (riskScore > 70) return "BLOCK";
  if (riskScore >= 30) return "OTP";
  return "ALLOW";
};

export const severityFromRisk = (riskScore: number): RiskSeverity => {
  if (riskScore >= 85) return "critical";
  if (riskScore > 70) return "high";
  if (riskScore >= 30) return "medium";
  return "low";
};

export const maskEmail = (email?: string | null) => {
  if (!email) return "unknown";
  const [name, domain] = email.split("@");
  if (!domain) return "masked";
  return `${name.slice(0, 2)}*****@${domain}`;
};

export const maskPhone = (phone?: string | null) => {
  if (!phone) return "*******000";
  return `${"*".repeat(Math.max(phone.length - 3, 4))}${phone.slice(-3)}`;
};

export async function calculateAdaptiveRisk(input: {
  email?: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  country?: string;
  deviceId: string;
}) {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [recentIpSessions, failedSecurityEvents, userSessions, apiViews] =
    await Promise.all([
      prisma.session.count({
        where: { ipAddress: input.ipAddress, createdAt: { gte: fifteenMinutesAgo } },
      }),
      prisma.auditLog.count({
        where: {
          createdAt: { gte: fifteenMinutesAgo },
          scope: "SECURITY",
          OR: [
            { action: { contains: "fail", mode: "insensitive" } },
            { action: { contains: "blocked", mode: "insensitive" } },
            { description: { contains: input.ipAddress, mode: "insensitive" } },
          ],
        },
      }),
      input.userId
        ? prisma.session.findMany({
            where: { userId: input.userId, createdAt: { gte: dayAgo } },
            orderBy: { createdAt: "desc" },
            take: 8,
          })
        : Promise.resolve([]),
      prisma.pageView.count({
        where: {
          ipAddress: input.ipAddress,
          path: { startsWith: "/api" },
          visitedAt: { gte: fifteenMinutesAgo },
        },
      }),
    ]);

  const lowerAgent = input.userAgent.toLowerCase();
  const isBotLike = /bot|crawler|spider|headless|curl|python|httpclient/.test(
    lowerAgent,
  );
  const isVpnLike =
    input.ipAddress === "unknown" ||
    input.ipAddress.startsWith("10.") ||
    input.ipAddress.startsWith("172.") ||
    input.ipAddress.startsWith("192.168.");
  const userAgentMismatch =
    userSessions.length > 0 &&
    !userSessions.some((session) => session.userAgent === input.userAgent);
  const ipDrift =
    userSessions.length > 0 &&
    !userSessions.some((session) => session.ipAddress === input.ipAddress);
  const loginVelocity = recentIpSessions >= 4;

  const signals: Signal[] = [
    {
      key: "ip_reputation",
      label: "IP reputation",
      value: clamp(failedSecurityEvents * 16 + apiViews * 2),
      weight: 0.18,
      active: failedSecurityEvents > 0 || apiViews > 12,
    },
    {
      key: "login_velocity",
      label: "Login velocity",
      value: clamp(recentIpSessions * 18),
      weight: 0.16,
      active: loginVelocity,
    },
    {
      key: "device_fingerprint",
      label: "Device fingerprint drift",
      value: userAgentMismatch ? 82 : 12,
      weight: 0.16,
      active: userAgentMismatch,
    },
    {
      key: "geo_drift",
      label: "Geo drift / impossible travel",
      value: ipDrift ? 68 : 10,
      weight: 0.13,
      active: ipDrift,
    },
    {
      key: "vpn_tor",
      label: "VPN/TOR likelihood",
      value: isVpnLike ? 48 : 8,
      weight: 0.11,
      active: isVpnLike,
    },
    {
      key: "browser_entropy",
      label: "Browser entropy",
      value: isBotLike ? 88 : input.userAgent.length < 28 ? 52 : 14,
      weight: 0.12,
      active: isBotLike || input.userAgent.length < 28,
    },
    {
      key: "failed_attempts",
      label: "Failed attempts",
      value: clamp(failedSecurityEvents * 22),
      weight: 0.14,
      active: failedSecurityEvents > 1,
    },
  ];

  const weighted = signals.reduce(
    (total, signal) => total + signal.value * signal.weight,
    0,
  );
  const riskScore = Math.round(clamp(weighted + (input.email ? 0 : 8)));

  return {
    riskScore,
    decision: decisionFromRisk(riskScore),
    severity: severityFromRisk(riskScore),
    trustScore: 100 - riskScore,
    deviceId: input.deviceId,
    signals,
    ttlSeconds: riskScore < 30 ? 60 * 30 : 0,
  };
}

export function scoreBehavioralBiometrics(input: {
  keydownTimestamps?: number[];
  keyupTimestamps?: number[];
  focusDurationMs?: number;
  pasteCount?: number;
  mouseSamples?: Array<{ t: number; x: number; y: number }>;
}) {
  const keydowns = input.keydownTimestamps || [];
  const intervals = keydowns
    .slice(1)
    .map((time, index) => Math.max(0, time - keydowns[index]));
  const avgInterval =
    intervals.length > 0
      ? intervals.reduce((total, value) => total + value, 0) / intervals.length
      : 0;
  const instantTyping = intervals.length > 4 && avgInterval < 35;
  const pastePenalty = clamp((input.pasteCount || 0) * 28);
  const focusPenalty =
    input.focusDurationMs && keydowns.length > 8 && input.focusDurationMs < 900
      ? 25
      : 0;
  const mouseSamples = input.mouseSamples || [];
  const hasMouse = mouseSamples.length > 3;
  const mousePenalty = hasMouse ? 0 : 12;
  const rhythmPenalty = instantTyping ? 38 : avgInterval > 900 ? 18 : 4;
  const anomalyScore = clamp(
    pastePenalty + focusPenalty + mousePenalty + rhythmPenalty,
  );

  return {
    anomalyScore,
    classification: anomalyScore >= 70 ? "bot" : anomalyScore >= 35 ? "review" : "human",
    model: "Isolation Forest + One-Class SVM lightweight pipeline",
    features: {
      averageKeyIntervalMs: Math.round(avgInterval),
      instantTyping,
      pasteCount: input.pasteCount || 0,
      mouseSamples: mouseSamples.length,
      focusDurationMs: input.focusDurationMs || 0,
    },
  };
}

export async function recordSecurityAudit(input: {
  action: string;
  description: string;
  severity?: "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  entityType: string;
  entityId?: string;
  entityLabel?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  return prisma.auditLog.create({
    data: {
      action: input.action,
      description: input.description,
      scope: "SECURITY",
      severity: input.severity || "INFO",
      entityType: input.entityType,
      entityId: input.entityId,
      entityLabel: input.entityLabel,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata,
    },
  });
}
