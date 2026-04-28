import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET articles — supports ?search=, ?partId=, ?page=, ?limit=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search")?.trim() ?? "";
  const partId = searchParams.get("partId") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));
  const skip = (page - 1) * limit;

  // Build the where clause dynamically
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { articleNumber: { contains: search, mode: "insensitive" } },
      { title: { contains: search, mode: "insensitive" } },
    ];
  }

  if (partId) {
    where.partId = partId;
  }

  // Run count + data in parallel for speed
  const [total, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      include: { part: true },
      orderBy: { articleNumber: "asc" },
      skip,
      take: limit,
    }),
  ]);

  return NextResponse.json({ articles, total });
}

// CREATE article
export async function POST(req: Request) {
  const body = await req.json();

  const article = await prisma.article.create({
    data: {
      articleNumber: body.articleNumber,
      title: body.title,
      shortSummary: body.shortSummary,
      officialText: body.officialText,
      simpleExplanation: body.simpleExplanation,
      example: body.example,
      tags: body.tags,
      featured: body.featured,
      partId: body.partId,
    },
    include: { part: true },
  });

  return NextResponse.json(article, { status: 201 });
}