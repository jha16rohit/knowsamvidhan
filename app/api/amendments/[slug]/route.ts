import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

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
