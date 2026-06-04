import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeInput, createSecurityMiddleware } from "@/lib/security";
import { recordSecurityAudit } from "@/lib/security-engine";

const securityMiddleware = createSecurityMiddleware();

export async function GET(req: NextRequest) {
  const securityCheck = await securityMiddleware(req);
  if (securityCheck) return securityCheck;

  const { searchParams } = new URL(req.url);
  const filterRaw = searchParams.get("filter") ?? "";

  if (filterRaw) {
    const filterResult = sanitizeInput(filterRaw);
    if (filterResult.isThreat && filterResult.threatType === "SQL_INJECTION") {
      const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                        req.headers.get("x-real-ip") || "unknown";
      await recordSecurityAudit({
        action: "SQL_INJECTION_BLOCKED",
        description: `SQL injection in parts filter: ${filterRaw.substring(0, 50)}`,
        severity: "HIGH",
        entityType: "API",
        entityId: "parts",
        ipAddress,
        userAgent: req.headers.get("user-agent") || "unknown",
      });
      return NextResponse.json(
        { error: "Invalid filter parameters" },
        { status: 400 }
      );
    }
  }

  try {
    const parts = await prisma.part.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(parts);
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed. Please try again later." },
      { status: 500 }
    );
  }
}