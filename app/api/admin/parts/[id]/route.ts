import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.part.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted" });
}

// ✅ PUT (UPDATE)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.part.update({
    where: { id },
    data: {
      partNumber: body.partNumber,
      title: body.title,
      range: body.range,
      description: body.description,
      articles: body.articles,
    },
  });

  return NextResponse.json(updated);
}