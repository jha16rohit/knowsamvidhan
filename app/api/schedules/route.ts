import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatTopics(topics: string): string[] {
  return topics.split(",").map((t: string) => t.trim()).filter(Boolean);
}

function parseTagDetails(raw: string): { tag: string; detail: string }[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export async function GET() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(schedules.map((s) => ({
    id:          s.id,
    shortId:     s.shortId,
    schedule:    s.schedule,
    slug:        s.slug,
    title:       s.title,
    description: s.description ?? "",
    topics:      formatTopics(s.topics),
    tagDetails:  parseTagDetails(s.tagDetails),
  })));
}