// app/api/admin/amendments/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET all amendments
export async function GET() {
  const amendments = await prisma.amendment.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ amendments });
}

// ✅ POST create amendment
export async function POST(req: Request) {
  const body = await req.json();

  const created = await prisma.amendment.create({
    data: {
      number:          body.number,
      year:            body.year,
      title:           body.title,
      summary:         body.summary,
      whyItMatters:    body.whyItMatters    ?? "",
      relatedArticles: body.relatedArticles ?? "",
    },
  });

  return NextResponse.json({ amendment: created }, { status: 201 });
}