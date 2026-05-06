import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/random_amendments
// Returns all amendments ordered by year ascending.
// The Hero component picks 4 random ones client-side and reshuffles every 5 minutes.
export async function GET() {
  try {
    const amendments = await prisma.amendment.findMany({
      orderBy: { year: "asc" },
    });

    return NextResponse.json(amendments);
  } catch (error) {
    console.error("GET /api/random_amendments error:", error);
    return NextResponse.json({ error: "Failed to fetch amendments" }, { status: 500 });
  }
}