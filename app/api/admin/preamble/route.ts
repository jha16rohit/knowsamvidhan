import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The Preamble is a singleton — there's only ever ONE row.
// We use a fixed id so upsert always targets the same record.
const PREAMBLE_ID = "singleton";

// GET — fetch the preamble
export async function GET() {
  const preamble = await prisma.preamble.findUnique({
    where: { id: PREAMBLE_ID },
  });

  if (!preamble) {
    // Return empty defaults so the frontend form still renders cleanly
    return NextResponse.json({
      id:                PREAMBLE_ID,
      officialText:      "",
      simpleExplanation: "",
      whyItMatters:      "",
      keywords:          "[]",
    });
  }

  return NextResponse.json(preamble);
}

// PUT — upsert the preamble (create if first save, update on every subsequent save)
export async function PUT(req: Request) {
  const body = await req.json();

  const preamble = await prisma.preamble.upsert({
    where: { id: PREAMBLE_ID },
    create: {
      id:                PREAMBLE_ID,
      officialText:      body.officialText      ?? "",
      simpleExplanation: body.simpleExplanation ?? "",
      whyItMatters:      body.whyItMatters      ?? "",
      keywords:          body.keywords          ?? "[]",
    },
    update: {
      ...(body.officialText      !== undefined && { officialText:      body.officialText      }),
      ...(body.simpleExplanation !== undefined && { simpleExplanation: body.simpleExplanation }),
      ...(body.whyItMatters      !== undefined && { whyItMatters:      body.whyItMatters      }),
      ...(body.keywords          !== undefined && { keywords:          body.keywords          }),
    },
  });

  return NextResponse.json(preamble);
}