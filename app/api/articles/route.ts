import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() ?? "";
  const part   = searchParams.get("part")?.trim() ?? "";

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