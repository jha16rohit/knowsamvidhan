import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeInput, createSecurityMiddleware } from "@/lib/security";
import { recordSecurityAudit } from "@/lib/security-engine";

const securityMiddleware = createSecurityMiddleware();

export async function GET(req: NextRequest) {
  const securityCheck = await securityMiddleware(req);
  if (securityCheck) return securityCheck;

  const { searchParams } = new URL(req.url);
  const qRaw = searchParams.get("q") ?? "";

  if (qRaw) {
    const qResult = sanitizeInput(qRaw);
    if (qResult.isThreat && qResult.threatType === "SQL_INJECTION") {
      const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                        req.headers.get("x-real-ip") || "unknown";
      await recordSecurityAudit({
        action: "SQL_INJECTION_BLOCKED",
        description: `SQL injection in amendments search: ${qRaw.substring(0, 50)}`,
        severity: "HIGH",
        entityType: "API",
        entityId: "amendments",
        ipAddress,
        userAgent: req.headers.get("user-agent") || "unknown",
      });
      return NextResponse.json(
        { error: "Invalid search parameters" },
        { status: 400 }
      );
    }
  }

  try {
    const amendments = await prisma.amendment.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(amendments);
  } catch (error) {
    console.error("GET /api/amendments error:", error);
    return NextResponse.json({ error: "Failed to fetch amendments" }, { status: 500 });
  }
}