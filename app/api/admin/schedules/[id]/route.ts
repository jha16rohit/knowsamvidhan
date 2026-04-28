// app/api/admin/schedules/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper
function formatTopics(topics: string): string[] {
  return topics.split(",").map((t: string) => t.trim()).filter(Boolean);
}

// ✅ PUT (UPDATE)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const topics = Array.isArray(body.topics)
    ? body.topics.join(", ")
    : body.topics ?? "";

  const updated = await prisma.schedule.update({
    where: { id },
    data: {
      shortId:     body.shortId,
      schedule:    body.schedule,
      title:       body.title,
      description: body.description ?? "",
      topics,
    },
  });

  return NextResponse.json({
    id:          updated.id,
    shortId:     updated.shortId,
    schedule:    updated.schedule,
    title:       updated.title,
    description: updated.description ?? "",
    topics:      formatTopics(updated.topics),
  });
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.schedule.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" });
}