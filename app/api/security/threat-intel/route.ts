import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const whereClause = type ? { type: type as any } : {};

    const [threats, totalCount, criticalCount, mitigatedCount] = await Promise.all([
      prisma.threatIntelligenceEvent.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.threatIntelligenceEvent.count(),
      prisma.threatIntelligenceEvent.count({ where: { ...whereClause, severity: "CRITICAL" } }),
      prisma.threatIntelligenceEvent.count({ where: { ...whereClause, mitigated: true } }),
    ]);

    const typeDistribution = await prisma.threatIntelligenceEvent.groupBy({
      by: ["type"],
      _count: true,
      where: { createdAt: { gte: weekAgo } },
    });

    const distribution = typeDistribution.map(t => ({
      name: t.type.replace(/_/g, " "),
      value: t._count,
      color: ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6"][Math.floor(Math.random() * 5)],
    }));

    const severityDistribution = [
      { name: "Critical", value: criticalCount, color: "#ef4444" },
      { name: "High", value: await prisma.threatIntelligenceEvent.count({ where: { ...whereClause, severity: "HIGH" } }), color: "#f97316" },
      { name: "Medium", value: await prisma.threatIntelligenceEvent.count({ where: { ...whereClause, severity: "MEDIUM" } }), color: "#f59e0b" },
      { name: "Low", value: await prisma.threatIntelligenceEvent.count({ where: { ...whereClause, severity: "LOW" } }), color: "#22c55e" },
    ];

    const threatTrend = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const count = await prisma.threatIntelligenceEvent.count({
          where: { createdAt: { gte: startOfDay, lte: endOfDay } },
        });
        
        return {
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
          count,
        };
      })
    );

    const kpis = {
      totalThreats: totalCount,
      criticalThreats: criticalCount,
      mitigatedThreats: mitigatedCount,
      activeThreats: totalCount - mitigatedCount,
    };

    return NextResponse.json({
      kpis,
      threats: threats.map(t => ({
        id: t.id,
        type: t.type,
        severity: t.severity,
        confidence: t.confidence,
        ipAddress: t.ipAddress,
        country: t.country,
        endpoint: t.endpoint,
        mitigated: t.mitigated,
        createdAt: t.createdAt,
      })),
      distribution,
      severityDistribution,
      threatTrend,
    });
  } catch (error) {
    console.error("GET /api/security/threat-intel error:", error);
    return NextResponse.json(
      { error: "Failed to load threat intelligence" },
      { status: 500 }
    );
  }
}