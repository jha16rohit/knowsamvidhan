import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET clauses — supports ?search=, ?articleId=, ?page=, ?limit=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search   = searchParams.get("search")?.trim() ?? "";
  const articleId = searchParams.get("articleId") ?? "";
  const page     = Math.max(1, parseInt(searchParams.get("page")  ?? "1",  10));
  const limit    = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));
  const skip     = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { clauseNumber: { contains: search, mode: "insensitive" } },
      { text:         { contains: search, mode: "insensitive" } },
    ];
  }

  if (articleId) {
    where.articleId = articleId;
  }

  // Parallel count + data query for speed
  const [total, clauses] = await Promise.all([
    prisma.clause.count({ where }),
    prisma.clause.findMany({
      where,
      include: { article: true },   // include parent article info for display
      orderBy: [
        { article: { articleNumber: "asc" } },
        { clauseNumber: "asc" },
      ],
      skip,
      take: limit,
    }),
  ]);

  return NextResponse.json({ clauses, total });
}

// POST — create a new clause
export async function POST(req: Request) {
  const body = await req.json();

  const clause = await prisma.clause.create({
    data: {
      clauseNumber: body.clauseNumber,
      text:         body.text,
      articleId:    body.articleId,
    },
    include: { article: true },
  });

  return NextResponse.json(clause, { status: 201 });
}