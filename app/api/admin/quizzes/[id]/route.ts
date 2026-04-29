// PATH: src/app/api/admin/quizzes/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust import path as needed

// GET /api/admin/quizzes/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: {
        questions: { orderBy: { order: "asc" } },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("[GET /api/admin/quizzes/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

// PUT /api/admin/quizzes/[id] — update quiz title/level/status + replace questions
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, level, status, questions } = body;

    const existing = await prisma.quiz.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Delete old questions and recreate (simplest approach for full quiz edit)
    await prisma.question.deleteMany({ where: { quizId: params.id } });

    const quiz = await prisma.quiz.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(level && { level }),
        ...(status && { status }),
        ...(questions && {
          questions: {
            create: questions.map((q: {
              questionText: string;
              optionA: string;
              optionB: string;
              optionC: string;
              optionD: string;
              correctAnswer: string;
              explanation?: string;
            }, idx: number) => ({
              questionText: q.questionText,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || null,
              order: idx,
            })),
          },
        }),
      },
      include: { _count: { select: { questions: true } } },
    });

    return NextResponse.json({
      message: "Quiz updated successfully",
      quiz: {
        id: quiz.id,
        title: quiz.title,
        level: quiz.level,
        status: quiz.status,
        questionCount: quiz._count.questions,
      },
    });
  } catch (error) {
    console.error("[PUT /api/admin/quizzes/[id]]", error);
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
  }
}

// DELETE /api/admin/quizzes/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const existing = await prisma.quiz.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Questions cascade delete via Prisma schema onDelete: Cascade
    await prisma.quiz.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/admin/quizzes/[id]]", error);
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}