import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { maskEmail } from "@/lib/security-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [users, sessions, logs] = await Promise.all([
      prisma.user.findMany({
        where: { isDeleted: false },
        orderBy: { updatedAt: "desc" },
        take: 80,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          lastLogin: true,
          createdAt: true,
        },
      }),
      prisma.session.findMany({
        orderBy: { createdAt: "desc" },
        take: 300,
      }),
      prisma.auditLog.findMany({
        where: { scope: "SECURITY" },
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
    ]);

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      users: users.map((user) => {
        const userSessions = sessions.filter((session) => session.userId === user.id);
        const userLogs = logs.filter((log) => log.actorId === user.id);
        const riskScore = Math.min(
          99,
          userSessions.length * 7 +
            userLogs.filter((log) => ["HIGH", "CRITICAL"].includes(log.severity)).length * 18 +
            (user.status !== "ACTIVE" ? 25 : 8),
        );

        return {
          id: user.id,
          name: user.name || maskEmail(user.email),
          email: maskEmail(user.email),
          role: user.role,
          status: user.status,
          riskScore,
          activeSessions: userSessions.filter((session) => session.isActive).length,
          devices: new Set(userSessions.map((session) => session.userAgent || "unknown")).size,
          lastLogin: user.lastLogin?.toISOString() || null,
          createdAt: user.createdAt.toISOString(),
        };
      }),
    });
  } catch (error) {
    console.error("GET /api/security/users error:", error);
    return NextResponse.json(
      { error: "Failed to load security users" },
      { status: 500 },
    );
  }
}
