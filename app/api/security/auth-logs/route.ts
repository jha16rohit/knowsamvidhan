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

    return NextResponse.json({
      updatedAt: now.toISOString(),
      kpis: {
        activeSessions: sessions.filter((session) => session.isActive).length,
        revokedTokens: refreshTokens.filter((token) => token.revoked).length,
        deviceMismatch: sessions.filter((session) => !session.userAgent).length,
        geoDrift: new Set(sessions.map((session) => session.ipAddress)).size,
      },
      sessions: sessions.map((session) => ({
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
      })),
      tokens: refreshTokens.map((token) => ({
        id: token.id,
        userId: token.userId,
        sessionId: token.sessionId,
        jti: token.id,
        revoked: token.revoked,
        createdAt: token.createdAt.toISOString(),
        expiresAt: token.expiresAt.toISOString(),
      })),
      logs: logs.map((log) => ({
        id: log.id,
        action: log.action,
        description: log.description,
        severity: log.severity.toLowerCase(),
        ipAddress: log.ipAddress || "unknown",
        createdAt: log.createdAt.toISOString(),
      })),
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
