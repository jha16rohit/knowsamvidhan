// PATH: src/app/api/admin/quizzes/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust import path as needed

// GET /api/admin/quizzes  — list all quizzes with pagination + filter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level"); // "basic" | "intermediate" | "advanced" | null
    const search = searchParams.get("search") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = 6;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (level && level !== "all") where.level = level;
    if (search) where.title = { contains: search, mode: "insensitive" };

    const [quizzes, total] = await Promise.all([
      prisma.quiz.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { questions: true } },
        },
      }),
      prisma.quiz.count({ where }),
    ]);

    const totalQuizzes = await prisma.quiz.count();
    const totalQuestions = await prisma.question.count();
    const publishedQuizzes = await prisma.quiz.count({ where: { status: "published" } });

    return NextResponse.json({
      quizzes: quizzes.map((q) => ({
        id: q.id,
        title: q.title,
        level: q.level,
        status: q.status,
        createdAt: q.createdAt,
        questionCount: q._count.questions,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      stats: { totalQuizzes, totalQuestions, publishedQuizzes },
    });
  } catch (error) {
    console.error("[GET /api/admin/quizzes]", error);
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 });
  }
}

// POST /api/admin/quizzes — create a new quiz with questions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, level, questions } = body;

    if (!title || !level) {
      return NextResponse.json({ error: "Title and level are required" }, { status: 400 });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "At least one question is required" }, { status: 400 });
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText || !q.optionA || !q.optionB || !q.optionC || !q.optionD || !q.correctAnswer) {
        return NextResponse.json(
          { error: `Question ${i + 1} is missing required fields` },
          { status: 400 }
        );
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        level,
        status: "published",
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
      },
      include: { _count: { select: { questions: true } } },
    });

    return NextResponse.json({
      message: "Quiz created successfully",
      quiz: {
        id: quiz.id,
        title: quiz.title,
        level: quiz.level,
        status: quiz.status,
        questionCount: quiz._count.questions,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/quizzes]", error);
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}