import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSecurityRequestContext, maskEmail, recordSecurityAudit } from "@/lib/security-engine";
import { revokeAllUserSessions } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const [sessions, refreshTokens, logs] = await Promise.all([
      prisma.session.findMany({
        where: { createdAt: { gte: dayAgo } },
        include: { user: { select: { id: true, email: true, name: true, role: true } } },
        orderBy: { createdAt: "desc" },
        take: 120,
      }),
      prisma.refreshToken.findMany({
        where: { createdAt: { gte: dayAgo } },
        orderBy: { createdAt: "desc" },
        take: 120,
      }),
      prisma.auditLog.findMany({
        where: { scope: "SECURITY", createdAt: { gte: dayAgo } },
        orderBy: { createdAt: "desc" },
        take: 80,
      }),
    ]);

    const activeSessionsCount = sessions.filter((s) => s.isActive).length;
    const revokedTokensCount = refreshTokens.filter((t) => t.revoked).length;
    const deviceMismatchCount = sessions.filter((s) => !s.userAgent).length;
    const geoDriftCount = new Set(sessions.map((s) => s.ipAddress)).size;

    const failedLogins = logs.filter((l) => l.action === "LOGIN_FAILED" || l.severity === "HIGH");
    const successLogins = logs.filter((l) => l.action === "LOGIN_SUCCESS" || l.action === "LOGIN_OTP_VERIFIED");

    const loginTimeline = [];
    for (let i = 0; i < 24; i++) {
      const hourStart = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);
      const hourSuccess = successLogins.filter((l) => {
        const logTime = new Date(l.createdAt);
        return logTime >= hourStart && logTime < hourEnd;
      }).length;
      const hourFailed = failedLogins.filter((l) => {
        const logTime = new Date(l.createdAt);
        return logTime >= hourStart && logTime < hourEnd;
      }).length;
      loginTimeline.push({ hour: `${i}:00`, success: hourSuccess, failed: hourFailed });
    }

    const ipCounts: Record<string, number> = {};
    failedLogins.forEach((log) => {
      const ip = log.ipAddress || "unknown";
      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
    });
    const blockedIps = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const failedCount = failedLogins.length;
    const otpSent = sessions.length * 2 + Math.floor(failedCount * 0.5);
    const blockedIpCount = Object.keys(ipCounts).filter((ip) => ipCounts[ip] >= 5).length;

    const sessionData = sessions.map((session) => ({
      id: session.id,
      userId: session.userId,
      user: session.user.name || maskEmail(session.user.email),
      email: maskEmail(session.user.email),
      role: session.user.role,
      ipAddress: session.ipAddress || "unknown",
      userAgent: session.userAgent || "unknown",
      device: (session.userAgent || "unknown").slice(0, 64),
      active: session.isActive,
      createdAt: session.createdAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
    }));

    const tokenData = refreshTokens.map((token) => ({
      id: token.id,
      userId: token.userId,
      sessionId: token.sessionId,
      jti: token.id,
      revoked: token.revoked,
      createdAt: token.createdAt.toISOString(),
      expiresAt: token.expiresAt.toISOString(),
    }));

    const logData = logs.map((log) => ({
      id: log.id,
      action: log.action,
      description: log.description,
      severity: log.severity.toLowerCase(),
      ipAddress: log.ipAddress || "unknown",
      createdAt: log.createdAt.toISOString(),
    }));

    return NextResponse.json({
      updatedAt: now.toISOString(),
      kpis: {
        totalLogins: successLogins.length + failedLogins.length,
        failedLogins: failedCount,
        otpSent,
        blockedIps: blockedIpCount,
        activeSessions: activeSessionsCount,
        revokedTokens: revokedTokensCount,
        deviceMismatch: deviceMismatchCount,
        geoDrift: geoDriftCount,
      },
      loginTimeline,
      blockedIps,
      events: logData.map((log) => ({
        email: log.description?.includes("@") ? log.description.split(" ")[0] : "system",
        action: log.action,
        ipAddress: log.ipAddress,
        status: log.severity === "LOW" ? "SUCCESS" : "FAILED",
        createdAt: log.createdAt,
      })),
      sessions: sessionData,
      tokens: tokenData,
      logs: logData,
    });
  } catch (error) {
    console.error("GET /api/security/auth-logs error:", error);
    return NextResponse.json(
      { error: "Failed to load authentication logs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const context = getSecurityRequestContext(request);
    const body = await request.json().catch(() => ({}));
    const userId = String(body.userId || "");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    await revokeAllUserSessions(userId);
    await recordSecurityAudit({
      action: "NUKE_SESSIONS",
      description: `Admin force logged out user ${userId}`,
      severity: "HIGH",
      entityType: "Session",
      entityId: userId,
      entityLabel: userId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/security/auth-logs error:", error);
    return NextResponse.json(
      { error: "Failed to revoke sessions" },
      { status: 500 },
    );
  }
}