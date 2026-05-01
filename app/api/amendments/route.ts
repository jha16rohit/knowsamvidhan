import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const amendments = await prisma.amendment.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(amendments);
  } catch (error) {
    console.error("GET /api/amendments error:", error);
    return NextResponse.json({ error: "Failed to fetch amendments" }, { status: 500 });
  }
}