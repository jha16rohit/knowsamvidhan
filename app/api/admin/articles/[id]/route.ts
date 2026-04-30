import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.article.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted" });
}

// UPDATE (safe partial update)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.article.update({
    where: { id },
    data: {
      ...(body.articleNumber !== undefined && { articleNumber: body.articleNumber }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.shortSummary !== undefined && { shortSummary: body.shortSummary }),
      ...(body.officialText !== undefined && { officialText: body.officialText }),
      ...(body.simpleExplanation !== undefined && { simpleExplanation: body.simpleExplanation }),
      ...(body.example !== undefined && { example: body.example }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.partId !== undefined && { partId: body.partId }),
    },
    include: { part: true }, // return full object including part
  });

  return NextResponse.json(updated);
}