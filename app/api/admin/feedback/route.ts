import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // ✅ Auth check: only ADMIN can access this
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

    // ✅ Fetch ALL feedback (admins see everything, not just shown)
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Admin feedback GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}