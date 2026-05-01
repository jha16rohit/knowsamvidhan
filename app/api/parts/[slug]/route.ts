import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const part = await prisma.part.findUnique({
    where: { id: slug },
    include: {
      articlesList: {
        orderBy: { articleNumber: "asc" },
      },
    },
  });

  if (!part) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(part);
}