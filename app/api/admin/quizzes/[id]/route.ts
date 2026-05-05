import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type QuizQuestionInput = {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id },
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await req.json()) as {
      title?: string;
      level?: string;
      status?: string;
      questions?: QuizQuestionInput[];
    };

    const existing = await prisma.quiz.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    await prisma.question.deleteMany({ where: { quizId: id } });

    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.level && { level: body.level }),
        ...(body.status && { status: body.status }),
        ...(body.questions && {
          questions: {
            create: body.questions.map((question, idx) => ({
              questionText: question.questionText,
              optionA: question.optionA,
              optionB: question.optionB,
              optionC: question.optionC,
              optionD: question.optionD,
              correctAnswer: question.correctAnswer,
              explanation: question.explanation || null,
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

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const existing = await prisma.quiz.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    await prisma.quiz.delete({ where: { id } });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/admin/quizzes/[id]]", error);
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}
