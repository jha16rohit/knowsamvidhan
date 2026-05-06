import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, role: true, status: true, isDeleted: true },
    });

    if (!user || user.isDeleted || user.status !== "ACTIVE" || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params; // ✅ await here

    const existing = await prisma.feedback.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    const body = await req.json();

    if (typeof body.showOnSite !== "boolean") {
      return NextResponse.json(
        { error: "showOnSite must be a boolean" },
        { status: 400 }
      );
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: { showOnSite: body.showOnSite },
    });

    return NextResponse.json({
      message: `Feedback ${updated.showOnSite ? "published to site" : "removed from site"}`,
      showOnSite: updated.showOnSite,
    });
  } catch (error) {
    console.error("Admin feedback PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}