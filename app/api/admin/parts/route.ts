import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all parts
export async function GET() {
  const parts = await prisma.part.findMany();
  return NextResponse.json(parts);
}

// CREATE new part
export async function POST(req: Request) {
  const body = await req.json();

  const part = await prisma.part.create({
    data: body,
  });

  return NextResponse.json(part);
}