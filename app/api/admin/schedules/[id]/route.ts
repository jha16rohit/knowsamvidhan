import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatTopics(topics: string): string[] {
  return topics.split(",").map((t: string) => t.trim()).filter(Boolean);
}

function parseTagDetails(raw: string): { tag: string; detail: string }[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const topics = Array.isArray(body.topics)
    ? body.topics.join(", ")
    : body.topics ?? "";

  const tagDetails = JSON.stringify(
    Array.isArray(body.tagDetails) ? body.tagDetails : []
  );

  const updated = await prisma.schedule.update({
    where: { id },
    data: {
      shortId:     body.shortId,
      schedule:    body.schedule,
      slug:        body.slug,
      title:       body.title,
      description: body.description ?? "",
      topics,
      tagDetails,
    },
  });

  return NextResponse.json({
    schedule: {
      id:          updated.id,
      shortId:     updated.shortId,
      schedule:    updated.schedule,
      slug:        updated.slug,
      title:       updated.title,
      description: updated.description ?? "",
      topics:      formatTopics(updated.topics),
      tagDetails:  parseTagDetails(updated.tagDetails),
    }
  });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await prisma.schedule.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}