import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugToArticleNumber(slug: string): string {
  // "article-14" → "Article 14"
  // "article-51a" → "Article 51A"
  const parts = slug.split("-");
  // Capitalize first word ("article" → "Article")
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  // Join remaining parts with space, uppercase them
  const rest = parts.slice(1).join(" ").toUpperCase();
  return `${parts[0]} ${rest}`;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const articleNumber = slugToArticleNumber(slug);

  const article = await prisma.article.findFirst({
    where: { articleNumber: { equals: articleNumber, mode: "insensitive" } },
    include: {
      part: true,
      clauses: { orderBy: { clauseNumber: "asc" } },
    },
  });

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}