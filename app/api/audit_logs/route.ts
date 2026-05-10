import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditScope, AuditSeverity } from "@prisma/client";

// ───────────────── TYPES ─────────────────

interface AuditLogResponse {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
  scope: AuditScope;
  severity: AuditSeverity;
}

interface TopActorResponse {
  name: string;
  value: number;
}


const HOURS_24 = 24 * 60 * 60 * 1000;

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return "just now";

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day ago`;
}


export async function GET() {
  try {
    const now = new Date();

    const last24Hours = new Date(
      now.getTime() - HOURS_24
    );


    const [
      totalEvents24h,
      adminActions24h,
      roleChanges24h,
      dbModifications24h,
    ] = await Promise.all([
      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: last24Hours,
          },
        },
      }),

      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: last24Hours,
          },

          actorRole: "ADMIN",
        },
      }),

      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: last24Hours,
          },

          action: {
            contains: "role",
            mode: "insensitive",
          },
        },
      }),

      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: last24Hours,
          },

          scope: "DATABASE",
        },
      }),
    ]);


    const logsRaw = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 20,

      select: {
        id: true,
        action: true,
        entityLabel: true,
        scope: true,
        severity: true,
        createdAt: true,
        actorEmail: true,
        actorName: true,
      },
    });

    const logs: AuditLogResponse[] = logsRaw.map(
      (log) => ({
        id: log.id,

        time: formatTimeAgo(log.createdAt),

        actor:
          log.actorName ||
          log.actorEmail ||
          "System",

        action: log.action,

        target:
          log.entityLabel ||
          "Unknown entity",

        scope: log.scope,

        severity: log.severity,
      })
    );


    const topActorsRaw = await prisma.auditLog.groupBy({
      by: ["actorEmail"],

      _count: {
        actorEmail: true,
      },

      where: {
        actorEmail: {
          not: null,
        },
      },

      orderBy: {
        _count: {
          actorEmail: "desc",
        },
      },

      take: 5,
    });

    const topActors: TopActorResponse[] =
      topActorsRaw.map((actor) => ({
        name: actor.actorEmail || "Unknown",

        value: actor._count.actorEmail,
      }));


    const integrityStatus = {
      enabled: true,
      retentionDays: 365,
      exportEnabled: true,
    };


    return NextResponse.json({
      success: true,

      metrics: {
        totalEvents24h,
        adminActions24h,
        roleChanges24h,
        dbModifications24h,
      },

      logs,

      topActors,

      compliance: integrityStatus,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/audit-logs error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch audit logs",
      },
      {
        status: 500,
      }
    );
  }
}