import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ PUT — update amendment
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.amendment.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.amendment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/amendments/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete amendment" }, { status: 500 });
  }
}