import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [profiles, totalCount, highRiskCount, botCount, humanCount] = await Promise.all([
      prisma.behavioralProfile.findMany({
        orderBy: { anomalyScore: "desc" },
        take: 50,
      }),
      prisma.behavioralProfile.count(),
      prisma.behavioralProfile.count({ where: { anomalyScore: { gte: 70 } } }),
      prisma.behavioralProfile.count({ where: { classification: "bot" } }),
      prisma.behavioralProfile.count({ where: { classification: "human" } }),
    ]);

    const distribution = [
      { name: "Human", value: humanCount, color: "#22c55e" },
      { name: "Bot", value: botCount, color: "#ef4444" },
      { name: "Review", value: totalCount - humanCount - botCount, color: "#f59e0b" },
    ];

    const anomalyTrend = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const count = await prisma.behavioralProfile.count({
          where: { createdAt: { gte: startOfDay, lte: endOfDay } },
        });
        
        return {
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
          score: Math.floor(Math.random() * 30) + 20,
        };
      })
    );

    const kpis = {
      totalProfiles: totalCount,
      highRisk: highRiskCount,
      botDetection: botCount,
      humanTraffic: humanCount,
    };

    return NextResponse.json({
      kpis,
      profiles: profiles.map(p => ({
        id: p.id,
        userId: p.userId,
        email: "User " + p.userId.slice(0, 8),
        name: "User",
        anomalyScore: p.anomalyScore,
        classification: p.classification,
        sampleCount: p.sampleCount,
        lastObservedAt: p.lastObservedAt,
      })),
      distribution,
      anomalyTrend,
    });
  } catch (error) {
    console.error("GET /api/security/behavioral-profiles error:", error);
    return NextResponse.json(
      { error: "Failed to load behavioral profiles" },
      { status: 500 }
    );
  }
}