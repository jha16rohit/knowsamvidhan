import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // ───────────────── USERS ─────────────────

    const totalUsers = await prisma.user.count({
      where: {
        isDeleted: false,
      },
    });

    const newUsersToday = await prisma.user.count({
      where: {
        isDeleted: false,
        createdAt: {
          gte: startOfToday,
        },
      },
    });

    const activeLoginsToday = await prisma.session.count({
      where: {
        isActive: true,
        createdAt: {
          gte: startOfToday,
        },
      },
    });

    const totalFeedbacks = await prisma.feedback.count();

    // ───────────────── PAGE VIEWS ─────────────────

    const pageViewsToday = await prisma.pageView.count({
      where: {
        visitedAt: {
          gte: startOfToday,
        },
      },
    });

    // ───────────────── TRAFFIC SOURCES ─────────────────

    const trafficSources = await prisma.trafficSource.findMany({
      orderBy: {
        value: "desc",
      },
    });

    // ───────────────── DAILY ANALYTICS ─────────────────

    const thirtyDaysAgo = new Date(
      now.getTime() - 30 * 24 * 60 * 60 * 1000
    );

    const dailyAnalytics = await prisma.dailyAnalytics.findMany({
      where: {
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // ───────────────── CHATBOT ANALYTICS ─────────────────

    const firstOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const chatbotRows = await prisma.chatbotQuery.groupBy({
      by: ["category", "resolved"],

      where: {
        createdAt: {
          gte: firstOfMonth,
        },
      },

      _count: true,
    });

    const chatbotMap = new Map<
      string,
      {
        resolved: number;
        unresolved: number;
      }
    >();

    let totalBotQueries = 0;

    for (const row of chatbotRows) {
      const key = row.category;

      if (!chatbotMap.has(key)) {
        chatbotMap.set(key, {
          resolved: 0,
          unresolved: 0,
        });
      }

      const entry = chatbotMap.get(key)!;

      if (row.resolved) {
        entry.resolved += row._count;
      } else {
        entry.unresolved += row._count;
      }

      totalBotQueries += row._count;
    }

    const chatbotData = Array.from(chatbotMap.entries()).map(
      ([category, counts]) => ({
        category,
        resolved: counts.resolved,
        unresolved: counts.unresolved,
      })
    );

    // ───────────────── QUIZ ANALYTICS ─────────────────

    const fourteenDaysAgo = new Date(
      now.getTime() - 14 * 24 * 60 * 60 * 1000
    );

    const quizAttempts = await prisma.userQuizAttempt.findMany({
      where: {
        submittedAt: {
          gte: fourteenDaysAgo,
        },
      },

      select: {
        score: true,
        totalQ: true,
        submittedAt: true,
      },

      orderBy: {
        submittedAt: "asc",
      },
    });

    const quizDataMap = new Map<
      string,
      {
        quizzes: number;
        totalScore: number;
        totalQ: number;
      }
    >();

    for (const attempt of quizAttempts) {
      const day = attempt.submittedAt
        .toISOString()
        .slice(0, 10);

      const entry = quizDataMap.get(day) || {
        quizzes: 0,
        totalScore: 0,
        totalQ: 0,
      };

      entry.quizzes += 1;
      entry.totalScore += attempt.score;
      entry.totalQ += attempt.totalQ;

      quizDataMap.set(day, entry);
    }

    const quizData = Array.from(
      quizDataMap.entries()
    ).map(([day, data]) => ({
      day: day.slice(5),
      quizzes: data.quizzes,

      avgScore:
        data.totalQ > 0
          ? Math.round(
            (data.totalScore / data.totalQ) * 100
          )
          : 0,
    }));

    const totalScoreSum = quizAttempts.reduce(
      (sum, a) => sum + a.score,
      0
    );

    const totalQSum = quizAttempts.reduce(
      (sum, a) => sum + a.totalQ,
      0
    );

    const avgScorePeriod =
      totalQSum > 0
        ? Math.round(
          (totalScoreSum / totalQSum) * 100
        )
        : 0;

    return NextResponse.json({
      totalUsers,
      newUsersToday,
      activeLoginsToday,
      pageViewsToday,
      totalFeedbacks,
      trafficSources,
      dailyAnalytics,
      chatbotData,
      totalBotQueries,
      quizData,
      avgScorePeriod,
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch analytics",
      },
      {
        status: 500,
      }
    );
  }
}