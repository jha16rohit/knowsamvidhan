import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/featured_articles
// Returns all articles where featured = true, ordered by articleNumber
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { featured: true },
      include: { part: true },
      orderBy: { articleNumber: "asc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET /api/featured_articles error:", error);
    return NextResponse.json({ error: "Failed to fetch featured articles" }, { status: 500 });
  }
}