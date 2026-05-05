import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = getUserSession(req);

  if (!session) {
    return NextResponse.json(
      { error: "User must login first" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, status: true, isDeleted: true },
  });

  if (!user || user.isDeleted || user.status !== "ACTIVE") {
    return NextResponse.json(
      { error: "User must login first" },
      { status: 401 }
    );
  }

  const body = (await req.json()) as {
    rating?: unknown;
    name?: unknown;
    comment?: unknown;
  };

  const rating = Number(body.rating);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Select a rating between 1 and 5" },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  await prisma.$executeRaw`
    INSERT INTO "Feedback" ("id", "userId", "rating", "name", "comment")
    VALUES (${crypto.randomUUID()}, ${user.id}, ${rating}, ${name || null}, ${comment || null})
  `;

  return NextResponse.json({ message: "Feedback saved" });
}
