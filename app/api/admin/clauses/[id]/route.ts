import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single clause
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const clause = await prisma.clause.findUnique({
    where: { id },
    include: { article: true },
  });

  if (!clause) {
    return NextResponse.json({ error: "Clause not found" }, { status: 404 });
  }

  return NextResponse.json(clause);
}

// PUT — safe partial update
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.clause.update({
    where: { id },
    data: {
      ...(body.clauseNumber !== undefined && { clauseNumber: body.clauseNumber }),
      ...(body.text         !== undefined && { text:         body.text         }),
      ...(body.articleId    !== undefined && { articleId:    body.articleId    }),
    },
    include: { article: true },
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.clause.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" });
}