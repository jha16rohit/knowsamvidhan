import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Public route — no auth required
// Only returns feedback where showOnSite = true
// This is what the TestimonialsSection on the homepage calls
export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        showOnSite: true, // ✅ Only approved/published feedback visible to users
      },
      orderBy: {
        createdAt: "desc",
      },
      // Only expose safe fields to public
      select: {
        id: true,
        name: true,
        rating: true,
        comment: true,
        createdAt: true,
        showOnSite: true,
      },
    });

    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Public feedback GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}