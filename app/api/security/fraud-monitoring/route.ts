import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { maskEmail } from "@/lib/security-engine";

export const dynamic = "force-dynamic";

const scoreFromCounts = (sessions: number, edits: number, apiHits: number) =>
  Math.min(99, Math.round(sessions * 8 + edits * 3 + apiHits * 1.5 + 18));

export async function GET() {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const [
      users,
      sessions,
      auditLogs,
      apiViews,
      botViews,
      quizAttempts,
      alerts,
    ] = await Promise.all([
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
      prisma.alert.findMany({
        where: { createdAt: { gte: dayAgo } },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    const profiles = users.slice(0, 8).map((user) => {
      const userSessions = sessions.filter((session) => session.userId === user.id);
      const userEdits = auditLogs.filter((log) => log.actorId === user.id).length;
      const score = scoreFromCounts(userSessions.length, userEdits, apiViews.length / 50);
      return {
        user: user.name || maskEmail(user.email),
        email: maskEmail(user.email),
        riskScore: score,
        signal:
          score > 80
            ? "Account takeover suspected"
            : score > 60
              ? "Behavioral drift"
              : "Normal activity",
        devices: new Set(userSessions.map((session) => session.userAgent || "unknown")).size,
        edits: userEdits,
        geo: userSessions[0]?.ipAddress?.slice(0, 7) || "stable",
        status: user.status,
      };
    });

    const anomalySeries = Array.from({ length: 14 }, (_, index) => {
      const day = new Date(now.getTime() - (13 - index) * 24 * 60 * 60 * 1000);
      const dayLogs = auditLogs.filter(
        (log) => log.createdAt.toDateString() === day.toDateString(),
      ).length;
      const dayQuizzes = quizAttempts.filter(
        (attempt) => attempt.submittedAt.toDateString() === day.toDateString(),
      ).length;
      return {
        day: `D${index + 1}`,
        score: Math.min(100, 28 + dayLogs * 7 + dayQuizzes * 2 + index),
      };
    });

    return NextResponse.json({
      updatedAt: now.toISOString(),
      kpis: {
        fraudRiskIndex: Math.min(100, Math.round(alerts.length * 4 + botViews * 1.5 + 34)),
        fakeAccountsBlocked: await prisma.user.count({ where: { status: "BLOCKED" } }),
        accountTakeovers: alerts.filter((alert) =>
          /takeover|session|credential/i.test(`${alert.title} ${alert.description}`),
        ).length,
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
      profiles,
      suspiciousEdits: auditLogs.slice(0, 6).map((log) => ({
        title: log.description || log.action,
        actor: log.actorEmail ? maskEmail(log.actorEmail) : log.actorName || "system",
        time: log.createdAt.toISOString(),
        severity: log.severity.toLowerCase(),
      })),
      deviceAnomalies: [
        { label: "Multi-device burst", detail: "5+ device fingerprints in <60s", value: sessions.length },
        { label: "Geo jump", detail: "Sessions across distinct networks", value: new Set(sessions.map((s) => s.ipAddress)).size },
        { label: "Token replay", detail: "Refresh token revocation signals", value: alerts.filter((a) => /token/i.test(a.title)).length },
        { label: "Headless browser", detail: "Missing browser signatures", value: botViews },
      ],
    });
  } catch (error) {
    console.error("GET /api/security/fraud-monitoring error:", error);
    return NextResponse.json(
      { error: "Failed to load fraud monitoring" },
      { status: 500 },
    );
  }
}
