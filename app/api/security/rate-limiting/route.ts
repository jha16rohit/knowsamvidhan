import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [events, totalCount, blockedCount, uniqueIPs] = await Promise.all([
      prisma.rateLimitEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.rateLimitEvent.count(),
      prisma.rateLimitEvent.count({ where: { blockedUntil: { not: null } } }),
      prisma.rateLimitEvent.findMany({
        select: { ipAddress: true },
        distinct: ["ipAddress"],
      }).then(res => res.length),
    ]);

    const endpointDistribution = await prisma.rateLimitEvent.groupBy({
      by: ["endpoint"],
      _count: true,
      _sum: { attempts: true },
      where: { createdAt: { gte: dayAgo } },
      orderBy: { _count: { endpoint: "desc" } },
      take: 10,
    });

    const distribution = endpointDistribution.map(e => ({
      name: e.endpoint || "unknown",
      value: e._count,
      attempts: e._sum.attempts || 0,
      color: "#f59e0b",
    }));

    const hourlyTrend = await Promise.all(
      Array.from({ length: 24 }, async (_, hour) => {
        const startOfHour = new Date(now.getTime() - (23 - hour) * 60 * 60 * 1000);
        startOfHour.setMinutes(0, 0, 0);
        const endOfHour = new Date(startOfHour.getTime() + 60 * 60 * 1000);
        
        const count = await prisma.rateLimitEvent.count({
          where: { createdAt: { gte: startOfHour, lte: endOfHour } },
        });
        
        return {
          hour: `${String(hour).padStart(2, "0")}:00`,
          count,
        };
      })
    );

    const kpis = {
      totalEvents: totalCount,
      blockedEvents: blockedCount,
      uniqueIPs: uniqueIPs,
      activeRateLimits: await prisma.rateLimitEvent.count({ where: { blockedUntil: { gte: now } } }),
    };

    return NextResponse.json({
      kpis,
      events: events.map(e => ({
        id: e.id,
        key: e.key,
        ipAddress: e.ipAddress,
        endpoint: e.endpoint,
        attempts: e.attempts,
        delayMs: e.delayMs,
        blockedUntil: e.blockedUntil,
        createdAt: e.createdAt,
      })),
      distribution,
      hourlyTrend,
    });
  } catch (error) {
    console.error("GET /api/security/rate-limiting error:", error);
    return NextResponse.json(
      { error: "Failed to load rate limiting data" },
      { status: 500 }
    );
  }
}