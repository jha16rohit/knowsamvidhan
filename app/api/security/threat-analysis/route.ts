import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Severity = "critical" | "high" | "medium" | "low";

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const severityFromScore = (score: number): Severity => {
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

export async function GET() {
  try {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
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
        where: {
          createdAt: { gte: dayAgo },
          scope: "SECURITY",
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.alertFrequencyMetric.findMany({
        where: { date: { gte: dayAgo } },
        orderBy: [{ date: "asc" }, { hour: "asc" }],
      }),
    ]);

    const activeThreats = openAlerts || alerts.length;
    const suspiciousLogins = recentSessions.length;
    const botAttacks = recentPageViews.filter((view) =>
      (view.userAgent || "").toLowerCase().includes("bot"),
    ).length;
    const apiAbuse = recentPageViews.filter((view) => view.path.startsWith("/api")).length;
    const failedOtps = auditSecurityEvents.filter((event) =>
      `${event.action} ${event.description || ""}`
        .toLowerCase()
        .includes("otp"),
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
        path: alert.serviceName.startsWith("/")
          ? alert.serviceName
          : `/api/${alert.serviceName.toLowerCase().replace(/\s+/g, "-")}`,
        time: formatTime(alert.createdAt),
        severity: alert.severity.toLowerCase() as Severity,
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

    const liveFeed = feedSource.length > 0
      ? feedSource.slice(0, 9)
      : [];

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

    const countryStats = new Map<string, number>();
    recentPageViews.forEach((view) => {
      const countryCode = view.ipAddress?.split(".")[0] || "XX";
      countryStats.set(countryCode, (countryStats.get(countryCode) || 0) + 1);
    });
    const heatmap = isSafe ? [] : countryPool.slice(0, 7).map((country, index) => {
      const requests = countryStats.get(country.code) || 0;
      return {
        ...country,
        requests,
        intensity: Math.min(0.95, requests / 5000),
      };
    });

    return NextResponse.json({
      updatedAt: now.toISOString(),
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
        signals: isSafe ? [
          { label: "Failed logins", value: 0 },
          { label: "Bot traffic", value: 0 },
          { label: "Geo anomalies", value: 0 },
        ] : [
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
    });
  } catch (error) {
    console.error("GET /api/security/threat-analysis error:", error);
    return NextResponse.json(
      { error: "Failed to load threat analysis" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = String(body.action || "security_event");
    const target = String(body.target || "threat-analysis");

    await prisma.auditLog.create({
      data: {
        action,
        description: `Threat analysis action: ${action} ${target}`,
        scope: "SECURITY",
        severity: action === "block_region" ? "HIGH" : "INFO",
        entityType: "ThreatAnalysis",
        entityId: target,
        entityLabel: target,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/security/threat-analysis error:", error);
    return NextResponse.json(
      { error: "Failed to record threat action" },
      { status: 500 },
    );
  }
}
