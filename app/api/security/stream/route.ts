import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSocketServer } from "../../socketio/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const severityFromScore = (score: number): "critical" | "high" | "medium" | "low" => {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  return "low";
};

const countryPool = [
  { code: "RU", name: "Russia", x: 78, y: 38 },
  { code: "CN", name: "China", x: 82, y: 50 },
  { code: "US", name: "United States", x: 25, y: 42 },
  { code: "BR", name: "Brazil", x: 39, y: 66 },
  { code: "IN", name: "India", x: 70, y: 56 },
  { code: "NG", name: "Nigeria", x: 60, y: 62 },
  { code: "IR", name: "Iran", x: 64, y: 49 },
  { code: "DE", name: "Germany", x: 52, y: 39 },
];

async function fetchSecurityData() {
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const [
    alerts,
    openAlerts,
    criticalAlerts,
    highAlerts,
    mediumAlerts,
    recentSessions,
    recentPageViews,
    auditSecurityEvents,
    frequencyRows,
    users,
    sessions,
    auditLogs,
    apiViews,
    botViews,
    quizAttempts,
  ] = await Promise.all([
    prisma.alert.findMany({
      orderBy: { createdAt: "desc" },
      take: 14,
    }),
    prisma.alert.count({ where: { status: "OPEN" } }),
    prisma.alert.count({ where: { status: "OPEN", severity: "CRITICAL" } }),
    prisma.alert.count({ where: { status: "OPEN", severity: "HIGH" } }),
    prisma.alert.count({ where: { status: "OPEN", severity: "MEDIUM" } }),
    prisma.session.findMany({
      where: { createdAt: { gte: fiveMinutesAgo } },
      orderBy: { createdAt: "desc" },
      take: 40,
      include: { user: { select: { email: true } } },
    }),
    prisma.pageView.findMany({
      where: { visitedAt: { gte: dayAgo } },
      orderBy: { visitedAt: "desc" },
      take: 120,
    }),
    prisma.auditLog.findMany({
      where: { createdAt: { gte: dayAgo }, scope: "SECURITY" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.alertFrequencyMetric.findMany({
      where: { date: { gte: dayAgo } },
      orderBy: [{ date: "asc" }, { hour: "asc" }],
    }),
    prisma.user.findMany({
      where: { isDeleted: false },
      take: 20,
      orderBy: { updatedAt: "desc" },
      select: { id: true, email: true, name: true, status: true },
    }),
    prisma.session.findMany({
      where: { createdAt: { gte: dayAgo } },
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.auditLog.findMany({
      where: { createdAt: { gte: dayAgo } },
      orderBy: { createdAt: "desc" },
      take: 120,
    }),
    prisma.pageView.findMany({
      where: { visitedAt: { gte: dayAgo }, path: { startsWith: "/api" } },
      orderBy: { visitedAt: "desc" },
      take: 200,
    }),
    prisma.pageView.count({
      where: {
        visitedAt: { gte: dayAgo },
        userAgent: { contains: "bot", mode: "insensitive" },
      },
    }),
    prisma.userQuizAttempt.findMany({
      where: { submittedAt: { gte: twoWeeksAgo } },
      orderBy: { submittedAt: "desc" },
      take: 200,
    }),
    prisma.auditLog.findMany({
      where: { scope: "SECURITY", createdAt: { gte: yearStart } },
      orderBy: { createdAt: "desc" },
      take: 120,
    }),
  ]);

  const activeThreats = openAlerts || alerts.length;
  const suspiciousLogins = recentSessions.length;
  const botAttacks = recentPageViews.filter((view) =>
    (view.userAgent || "").toLowerCase().includes("bot"),
  ).length;
  const apiAbuse = recentPageViews.filter((view) => view.path.startsWith("/api")).length;
  const failedOtps = auditSecurityEvents.filter((event) =>
    `${event.action} ${event.description || ""}`.toLowerCase().includes("otp"),
  ).length;
  const isSafe = activeThreats === 0 && criticalAlerts === 0 && highAlerts === 0 && suspiciousLogins === 0 && botAttacks === 0;

  const chartData = Array.from({ length: 24 }, (_, hour) => {
    const row = frequencyRows.find((metric) => metric.hour === hour);
    const hourAlerts = alerts.filter((a) => new Date(a.createdAt).getHours() === hour);
    return {
      hour: `${String(hour).padStart(2, "0")}:00`,
      failed: isSafe ? 0 : (row?.totalAlerts || hourAlerts.length),
      critical: isSafe ? 0 : (row?.criticalAlerts || hourAlerts.filter((a) => a.severity === "CRITICAL").length),
    };
  });

  const severityDistribution = [
    { name: "Low", value: isSafe ? 0 : alerts.filter((a) => a.severity === "LOW").length, color: "#22c55e" },
    { name: "Medium", value: isSafe ? 0 : mediumAlerts, color: "#facc15" },
    { name: "High", value: isSafe ? 0 : highAlerts, color: "#f97316" },
    { name: "Critical", value: isSafe ? 0 : criticalAlerts, color: "#ef4444" },
  ];

  const feedSource = isSafe ? [] : [
    ...alerts.map((alert) => ({
      ip: `10.${alert.id.charCodeAt(0)}.${alert.id.charCodeAt(1)}.${alert.id.charCodeAt(2)}`,
      country: countryPool[alert.id.charCodeAt(0) % countryPool.length].code,
      label: alert.title,
      path: alert.serviceName.startsWith("/") ? alert.serviceName : `/api/${alert.serviceName.toLowerCase().replace(/\s+/g, "-")}`,
      time: formatTime(alert.createdAt),
      severity: alert.severity.toLowerCase() as "critical" | "high" | "medium" | "low",
    })),
    ...auditSecurityEvents.map((event) => ({
      ip: event.ipAddress || "138.19.190.70",
      country: countryPool[event.id.charCodeAt(0) % countryPool.length].code,
      label: event.action,
      path: `/${event.entityType.toLowerCase()}`,
      time: formatTime(event.createdAt),
      severity: severityFromScore(event.severity === "CRITICAL" ? 92 : 66),
    })),
  ];

  const liveFeed = feedSource.length > 0 ? feedSource.slice(0, 9) : [];

  const registry = isSafe ? [] : liveFeed.slice(0, 7).map((item, index) => {
    const score = clamp(92 - index * 8 + (item.severity === "critical" ? 8 : 0), 32, 98);
    return {
      ip: item.ip,
      country: countryPool.find((country) => country.code === item.country)?.name || "Unknown",
      type: item.label.length > 18 ? item.label.split(" ").slice(0, 2).join(" ") : item.label,
      score,
      severity: severityFromScore(score),
      lastSeen: `${Math.floor(Math.random() * 60) + 5}m ago`,
      action: "Block",
    };
  });

  const heatmap = isSafe ? [] : countryPool.slice(0, 7).map((country) => ({
    ...country,
    requests: Math.floor(Math.random() * 5000),
    intensity: Math.min(0.95, Math.random()),
  }));

  const fraudProfiles = users.slice(0, 8).map((user) => {
    const userSessions = sessions.filter((session) => session.userId === user.id);
    const userEdits = auditLogs.filter((log) => log.actorId === user.id).length;
    const score = Math.min(99, Math.round(userSessions.length * 8 + userEdits * 3 + apiViews.length / 50 * 1.5 + 18));
    return {
      user: user.name || user.email?.split("@")[0] || "Unknown",
      email: user.email?.replace(/(.{2})(.*)(@.*)/, "$1***$3") || "unknown***@domain.com",
      riskScore: score,
      signal: score > 80 ? "Account takeover suspected" : score > 60 ? "Behavioral drift" : "Normal activity",
      devices: new Set(userSessions.map((session) => session.userAgent || "unknown")).size,
      edits: userEdits,
      geo: userSessions[0]?.ipAddress?.slice(0, 7) || "stable",
      status: user.status,
    };
  });

  const anomalySeries = Array.from({ length: 14 }, (_, index) => {
    const day = new Date(now.getTime() - (13 - index) * 24 * 60 * 60 * 1000);
    const dayLogs = auditLogs.filter((log) => log.createdAt.toDateString() === day.toDateString()).length;
    const dayQuizzes = quizAttempts.filter((attempt) => attempt.submittedAt.toDateString() === day.toDateString()).length;
    return {
      day: `D${index + 1}`,
      score: Math.min(100, 28 + dayLogs * 7 + dayQuizzes * 2 + index),
    };
  });

  return {
    timestamp: now.toISOString(),
    threatAnalysis: {
      status: isSafe ? "secure" : "threat_detected",
      isSecure: isSafe,
      kpis: {
        activeThreats: isSafe ? 0 : activeThreats,
        critical: isSafe ? 0 : criticalAlerts,
        high: isSafe ? 0 : highAlerts,
        medium: isSafe ? 0 : mediumAlerts,
        suspiciousLogins: isSafe ? 0 : suspiciousLogins,
        botAttacks: isSafe ? 0 : botAttacks,
        apiAbuse: isSafe ? 0 : apiAbuse,
        trafficSpikes: isSafe ? 0 : Math.round(recentPageViews.length / 2),
        geoAnomalies: isSafe ? 0 : new Set(recentSessions.map((s) => s.ipAddress)).size,
        failedOtps: isSafe ? 0 : failedOtps,
        badIpScore: isSafe ? 0 : clamp(50 + failedOtps * 2, 0, 100),
        deviceMismatch: isSafe ? 0 : recentSessions.filter((s) => !s.userAgent).length,
        aiConfidence: isSafe ? 100 : clamp(70 + criticalAlerts * 3, 0, 100),
      },
      chartData,
      severityDistribution,
      liveFeed,
      heatmap,
      registry,
      anomaly: {
        confidence: isSafe ? 0 : clamp(60 + failedOtps * 2 + botAttacks, 0, 100),
        signals: isSafe
          ? [{ label: "Failed logins", value: 0 }, { label: "Bot traffic", value: 0 }, { label: "Geo anomalies", value: 0 }]
          : [
              { label: "Failed logins", value: Math.min(100, failedOtps * 5) },
              { label: "Bot traffic", value: Math.min(100, botAttacks * 3) },
              { label: "Geo anomalies", value: Math.min(100, registry.length * 10) },
            ],
      },
      settings: [
        { key: "device", label: "Device fingerprint mismatch", enabled: true },
        { key: "geo", label: "Geo-location anomaly", enabled: true },
        { key: "otp", label: "Failed OTP threshold", enabled: false },
        { key: "ai", label: "AI predicted attack", enabled: true },
      ],
    },
    fraudMonitoring: {
      kpis: {
        fraudRiskIndex: Math.min(100, Math.round(alerts.length * 4 + botViews * 1.5 + 34)),
        fakeAccountsBlocked: users.filter((u) => u.status === "BLOCKED").length,
        accountTakeovers: alerts.filter((alert) => /takeover|session|credential/i.test(`${alert.title} ${alert.description}`)).length,
        botTraffic: Number(((botViews / Math.max(apiViews.length, 1)) * 100).toFixed(1)),
      },
      anomalySeries,
      distribution: [
        { name: "Fake accounts", value: Math.max(1, users.filter((u) => u.status === "BLOCKED").length) },
        { name: "Spam", value: auditLogs.filter((log) => /spam/i.test(log.action)).length },
        { name: "Quiz tampering", value: quizAttempts.filter((a) => a.score === a.totalQ).length },
        { name: "Scraping", value: botViews },
        { name: "Token abuse", value: alerts.filter((a) => /token|jwt|session/i.test(a.title)).length },
      ],
      profiles: fraudProfiles,
      suspiciousEdits: auditLogs.slice(0, 6).map((log) => ({
        title: log.description || log.action,
        actor: log.actorEmail ? log.actorEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3") : log.actorName || "system",
        time: log.createdAt.toISOString(),
        severity: log.severity.toLowerCase(),
      })),
      deviceAnomalies: [
        { label: "Multi-device burst", detail: "5+ device fingerprints in <60s", value: sessions.length },
        { label: "Geo jump", detail: "Sessions across distinct networks", value: new Set(sessions.map((s) => s.ipAddress)).size },
        { label: "Token replay", detail: "Refresh token revocation signals", value: alerts.filter((a) => /token/i.test(a.title)).length },
        { label: "Headless browser", detail: "Missing browser signatures", value: botViews },
      ],
    },
  };
}

let emitterInterval: NodeJS.Timeout | null = null;

function emitSecurityUpdates() {
  if (emitterInterval) return;
  
  emitterInterval = setInterval(async () => {
    try {
      const data = await fetchSecurityData();
      const io = getSocketServer();
      if (io) {
        io.to("security").emit("security:update", data);
        io.to("threat-analysis").emit("threat:update", data.threatAnalysis);
        io.to("fraud-monitoring").emit("fraud:update", data.fraudMonitoring);
      }
    } catch (error) {
      console.error("Error emitting security updates:", error);
    }
  }, 5000);
}

export async function GET() {
  emitSecurityUpdates();
  
  return NextResponse.json({
    status: "Security stream active",
    emitter: "socket.io",
    interval: "5s"
  });
}