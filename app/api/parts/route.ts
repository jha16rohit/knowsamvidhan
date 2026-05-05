import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const parts = await prisma.part.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(parts);
}