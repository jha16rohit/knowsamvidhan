import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatTopics(topics: string): string[] {
  return topics.split(",").map((t: string) => t.trim()).filter(Boolean);
}

function parseTagDetails(raw: string): { tag: string; detail: string }[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const s = await prisma.schedule.findUnique({ where: { slug } });

  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id:          s.id,
    shortId:     s.shortId,
    schedule:    s.schedule,
    slug:        s.slug,
    title:       s.title,
    description: s.description ?? "",
    topics:      formatTopics(s.topics),
    tagDetails:  parseTagDetails(s.tagDetails),
  });
}