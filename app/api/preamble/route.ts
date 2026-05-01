import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PREAMBLE_ID = "singleton";

export async function GET() {
  try {
    const preamble = await prisma.preamble.findUnique({
      where: { id: PREAMBLE_ID },
    });

    if (!preamble) {
      return NextResponse.json({
        officialText: "",
        simpleExplanation: "",
        whyItMatters: "",
        keywords: "[]",
        timeline: "[]",
        quickFacts: "[]",
        landmarkCases: "[]",
        notes: "[]",
      });
    }

    return NextResponse.json(preamble);
  } catch (error) {
    console.error("USER GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch preamble" },
      { status: 500 }
    );
  }
}