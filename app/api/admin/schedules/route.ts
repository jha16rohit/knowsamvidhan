// app/api/admin/schedules/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper
function formatTopics(topics: string): string[] {
  return topics.split(",").map((t: string) => t.trim()).filter(Boolean);
}

// ✅ GET all schedules
export async function GET() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { createdAt: "asc" },
  });

  const formatted = schedules.map((s) => ({
    id:          s.id,
    shortId:     s.shortId,
    schedule:    s.schedule,
    title:       s.title,
    description: s.description ?? "",
    topics:      formatTopics(s.topics),
  }));

  return NextResponse.json({ schedules: formatted });
}

// ✅ POST create schedule
export async function POST(req: Request) {
  const body = await req.json();

  const topics = Array.isArray(body.topics)
    ? body.topics.join(", ")
    : body.topics ?? "";

  const created = await prisma.schedule.create({
    data: {
      shortId:     body.shortId,
      schedule:    body.schedule,
      title:       body.title,
      description: body.description ?? "",
      topics,
    },
  });

  return NextResponse.json({
    schedule: {
      id:          created.id,
      shortId:     created.shortId,
      schedule:    created.schedule,
      title:       created.title,
      description: created.description ?? "",
      topics:      formatTopics(created.topics),
    }
  }, { status: 201 });
}