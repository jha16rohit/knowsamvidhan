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

  const formatted = schedules.map((s) => ({
    id:          s.id,
    shortId:     s.shortId,
    schedule:    s.schedule,
    slug:        s.slug,
    title:       s.title,
    description: s.description ?? "",
    topics:      formatTopics(s.topics),
    tagDetails:  parseTagDetails(s.tagDetails),
  }));

  return NextResponse.json({ schedules: formatted });
}

export async function POST(req: Request) {
  const body = await req.json();

  const topics = Array.isArray(body.topics)
    ? body.topics.join(", ")
    : body.topics ?? "";

  const tagDetails = JSON.stringify(
    Array.isArray(body.tagDetails) ? body.tagDetails : []
  );

  const created = await prisma.schedule.create({
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
      id:          created.id,
      shortId:     created.shortId,
      schedule:    created.schedule,
      slug:        created.slug,
      title:       created.title,
      description: created.description ?? "",
      topics:      formatTopics(created.topics),
      tagDetails:  parseTagDetails(created.tagDetails),
    }
  }, { status: 201 });
}