import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeInput, createSecurityMiddleware } from "@/lib/security";
import { recordSecurityAudit } from "@/lib/security-engine";

const securityMiddleware = createSecurityMiddleware();

export async function GET(req: NextRequest) {
  const securityCheck = await securityMiddleware(req);
  if (securityCheck) return securityCheck;

  const { searchParams } = new URL(req.url);
  const searchRaw = searchParams.get("search") ?? "";
  const partRaw = searchParams.get("part") ?? "";

  const searchResult = sanitizeInput(searchRaw);
  if (searchResult.isThreat && searchResult.threatType === "SQL_INJECTION") {
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                      req.headers.get("x-real-ip") || "unknown";
    await recordSecurityAudit({
      action: "SQL_INJECTION_BLOCKED",
      description: `SQL injection in articles search: ${searchRaw.substring(0, 50)}`,
      severity: "HIGH",
      entityType: "API",
      entityId: "articles",
      ipAddress,
      userAgent: req.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json(
      { error: "Invalid search parameters" },
      { status: 400 }
    );
  }

  const search = searchResult.sanitized;
  const partResult = sanitizeInput(partRaw);
  const part = partResult.isThreat ? "" : partResult.sanitized;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { articleNumber: { contains: search, mode: "insensitive" } },
      { title:         { contains: search, mode: "insensitive" } },
      { tags:          { contains: search, mode: "insensitive" } },
    ];
  }

  if (part && part !== "All") {
    where.part = { partNumber: { equals: part, mode: "insensitive" } };
  }

  const articles = await prisma.article.findMany({
    where,
    include: { part: true },
    orderBy: { articleNumber: "asc" },
  });

  return NextResponse.json(articles);
}