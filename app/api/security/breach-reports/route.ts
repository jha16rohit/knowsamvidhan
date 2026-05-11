import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recordSecurityAudit } from "@/lib/security-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const securityLogs = await prisma.auditLog.findMany({
      where: { scope: "SECURITY", createdAt: { gte: yearStart } },
      orderBy: { createdAt: "desc" },
      take: 120,
    });
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: "desc" },
      take: 80,
    });

    const severe = alerts.filter((alert) =>
      ["CRITICAL", "HIGH"].includes(alert.severity),
    );
    const incidents = severe.slice(0, 6).map((alert, index) => ({
      id: `INC-${alert.createdAt.getFullYear()}-${String(index + 41).padStart(3, "0")}`,
      title: alert.title,
      status:
        alert.status === "OPEN"
          ? "Investigating"
          : alert.status === "ACKED"
            ? "Containment"
            : "Resolved",
      severity: alert.severity.toLowerCase(),
      openedAt: alert.createdAt.toISOString(),
      services: [alert.serviceName, ...(alert.serviceIcon ? [alert.serviceIcon] : [])],
      progress: alert.status === "DISMISSED" ? 100 : alert.status === "ACKED" ? 70 : 35,
      description: alert.description,
    }));

    return NextResponse.json({
      updatedAt: now.toISOString(),
      kpis: {
        openIncidents: alerts.filter((alert) => alert.status !== "DISMISSED").length,
        mttr: "4h 12m",
        resolvedYtd: alerts.filter((alert) => alert.status === "DISMISSED").length,
        auditPassRate: Math.max(
          50,
          100 - securityLogs.filter((log) => ["HIGH", "CRITICAL"].includes(log.severity)).length,
        ),
      },
      incidents,
      timeline: securityLogs.slice(0, 6).map((log) => ({
        label: log.description || log.action,
        time: log.createdAt.toISOString(),
        actor: log.actorEmail || log.actorName || "system",
      })),
      rootCause: {
        trigger: incidents[0]?.description || "No active incidents. System monitoring ongoing.",
        contributingFactors: securityLogs.length > 0 
          ? `Recent activity: ${securityLogs.slice(0, 3).map(l => l.action).join(", ")}`
          : "System nominal. No active threats detected.",
        permanentFix: "Continue monitoring security logs and maintain current authentication controls.",
      },
      auditResults: securityLogs.slice(0, 5).map((log, index) => ({
        id: `AUD-${10000 - index}`,
        control: log.action.length > 30 ? log.action.slice(0, 30) + "..." : log.action,
        status: log.severity === "HIGH" || log.severity === "CRITICAL" ? "FAIL" : log.severity === "MEDIUM" ? "WARN" : "PASS",
      })),
    });
  } catch (error) {
    console.error("GET /api/security/breach-reports error:", error);
    return NextResponse.json(
      { error: "Failed to load breach reports" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const title = String(body.title || "Manual security incident");
    await recordSecurityAudit({
      action: "INCIDENT_CREATED",
      description: title,
      severity: "HIGH",
      entityType: "SecurityIncident",
      entityLabel: title,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/security/breach-reports error:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 },
    );
  }
}
