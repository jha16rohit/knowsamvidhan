import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { maskEmail } from "@/lib/security-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [users, sessions, securityLogs, riskAssessments] = await Promise.all([
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
        where: { createdAt: { gte: dayAgo } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.auditLog.findMany({
        where: { scope: "SECURITY", createdAt: { gte: dayAgo } },
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.securityRiskAssessment.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      kpis: {
        totalUsers: users.length,
        highRiskUsers: users.filter(u => {
          const userRisk = riskAssessments.find(r => r.userId === u.id);
          return userRisk ? userRisk.riskScore >= 70 : false;
        }).length,
        activeSessions: sessions.filter(s => s.isActive).length,
        blockedUsers: users.filter(u => u.status === "BLOCKED").length,
      },
      riskDistribution: [
        { name: "Low Risk", value: users.filter(u => {
          const userRisk = riskAssessments.find(r => r.userId === u.id);
          return userRisk ? userRisk.riskScore < 40 : true;
        }).length, color: "#22c55e" },
        { name: "Medium Risk", value: users.filter(u => {
          const userRisk = riskAssessments.find(r => r.userId === u.id);
          return userRisk ? userRisk.riskScore >= 40 && userRisk.riskScore < 70 : false;
        }).length, color: "#facc15" },
        { name: "High Risk", value: users.filter(u => {
          const userRisk = riskAssessments.find(r => r.userId === u.id);
          return userRisk ? userRisk.riskScore >= 70 : false;
        }).length, color: "#ef4444" },
      ],
      riskyUsers: riskAssessments
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 10)
        .map(r => ({
          email: r.emailHash ? `${r.emailHash.slice(0, 4)}***@user.com` : "Unknown",
          riskScore: r.riskScore,
        })),
      users: users.map((user) => {
        const userSessions = sessions.filter((session) => session.userId === user.id);
        const userLogs = securityLogs.filter((log) => log.actorId === user.id);
        const userRisk = riskAssessments.find(r => r.userId === user.id);
        
        const riskScore = userRisk?.riskScore ?? Math.min(
          99,
          userSessions.length * 7 +
            userLogs.filter((log) => ["HIGH", "CRITICAL"].includes(log.severity)).length * 18 +
            (user.status !== "ACTIVE" ? 25 : 8),
        );
        
        const trustScore = userRisk?.trustScore ?? Math.max(0, 100 - riskScore);
        
        const lastActiveSession = userSessions.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        
        const lastActive = lastActiveSession 
          ? lastActiveSession.createdAt.toISOString()
          : (user.lastLogin?.toISOString() || null);

        return {
          id: user.id,
          name: user.name || maskEmail(user.email),
          email: maskEmail(user.email),
          role: user.role,
          status: user.status,
          riskScore,
          trustScore,
          activeSessions: userSessions.filter((session) => session.isActive).length,
          deviceCount: new Set(userSessions.map((session) => session.userAgent || "unknown")).size,
          lastActive: lastActive ? new Intl.DateTimeFormat("en-IN", { 
            hour: "2-digit", 
            minute: "2-digit", 
            day: "2-digit", 
            month: "short" 
          }).format(new Date(lastActive)) : "Never",
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
