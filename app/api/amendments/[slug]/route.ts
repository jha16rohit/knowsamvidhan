import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// slug = amendment.number.toLowerCase().replace(/\s+/g, "-")
// e.g. "42nd" → "42nd", "101st" → "101st"
function slugToNumber(slug: string): string {
  // slugify just lowercases + replaces spaces, numbers like "42nd" don't change
  // We need to do a case-insensitive lookup
  return slug; // slug IS the number in lowercase
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug; // e.g. "42nd"

    // Find amendment where number matches the slug (case-insensitive)
    const amendment = await prisma.amendment.findFirst({
      where: {
        number: {
          equals: slug,
          mode: "insensitive",
        },
      },
    });

    if (!amendment) {
      return NextResponse.json({ error: "Amendment not found" }, { status: 404 });
    }

    return NextResponse.json(amendment);
  } catch (error) {
    console.error("GET /api/amendments/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch amendment" }, { status: 500 });
  }
}