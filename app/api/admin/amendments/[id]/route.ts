import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ PUT — update amendment
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await prisma.amendment.update({
      where: { id },
      data: {
        number:          body.number,
        year:            body.year,
        title:           body.title,
        summary:         body.summary,
        whyItMatters:    body.whyItMatters    ?? "",
        relatedArticles: body.relatedArticles ?? "",
      },
    });

    return NextResponse.json({ amendment: updated });
  } catch (error) {
    console.error("PUT /api/admin/amendments/[id] error:", error);
    return NextResponse.json({ error: "Failed to update amendment" }, { status: 500 });
  }
}

// ✅ DELETE — remove amendment
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.amendment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/amendments/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete amendment" }, { status: 500 });
  }
}
