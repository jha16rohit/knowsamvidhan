import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PREAMBLE_ID = "singleton";

// ── DEFAULT DATA (MATCHES UI) ──
const DEFAULTS = {
  officialText: "We, the people of India...",
  simpleExplanation: "This explains the Constitution...",
  whyItMatters: "Defines core values of India",

  keywords: JSON.stringify([]),
  timeline: JSON.stringify([]),
  quickFacts: JSON.stringify([]),

  // ✅ ARRAY
  landmarkCases: JSON.stringify([]),

  // ✅ ARRAY WITH TYPES
  notes: JSON.stringify([
    { type: "amendment", text: "" },
    { type: "did-you-know", text: "" }
  ]),
};

// ── GET ──
export async function GET() {
  try {
    const preamble = await prisma.preamble.findUnique({
      where: { id: PREAMBLE_ID },
    });

    if (!preamble) {
      return NextResponse.json({ id: PREAMBLE_ID, ...DEFAULTS });
    }

    return NextResponse.json(preamble);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// ── PUT ──
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const preamble = await prisma.preamble.upsert({
      where: { id: PREAMBLE_ID },

      create: {
        id: PREAMBLE_ID,
        officialText:      body.officialText      ?? DEFAULTS.officialText,
        simpleExplanation: body.simpleExplanation ?? DEFAULTS.simpleExplanation,
        whyItMatters:      body.whyItMatters      ?? DEFAULTS.whyItMatters,

        keywords:      body.keywords      ?? DEFAULTS.keywords,
        timeline:      body.timeline      ?? DEFAULTS.timeline,
        quickFacts:    body.quickFacts    ?? DEFAULTS.quickFacts,
        landmarkCases: body.landmarkCases ?? DEFAULTS.landmarkCases,
        notes:         body.notes         ?? DEFAULTS.notes,
      },

      update: {
        ...(body.officialText      !== undefined && { officialText:      body.officialText }),
        ...(body.simpleExplanation !== undefined && { simpleExplanation: body.simpleExplanation }),
        ...(body.whyItMatters      !== undefined && { whyItMatters:      body.whyItMatters }),

        ...(body.keywords      !== undefined && { keywords:      body.keywords }),
        ...(body.timeline      !== undefined && { timeline:      body.timeline }),
        ...(body.quickFacts    !== undefined && { quickFacts:    body.quickFacts }),
        ...(body.landmarkCases !== undefined && { landmarkCases: body.landmarkCases }),
        ...(body.notes         !== undefined && { notes:         body.notes }),
      },
    });

    return NextResponse.json(preamble);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}