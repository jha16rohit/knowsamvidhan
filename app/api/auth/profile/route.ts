import { NextResponse } from "next/server";
import {
  getAdminSession,
  getUserSession,
} from "@/lib/auth";
import { getProfileDashboard } from "@/lib/profile";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const requestedView =
      searchParams.get("view") === "admin"
        ? "admin"
        : "user";

    const session =
      requestedView === "admin"
        ? await getAdminSession()
        : await getUserSession();

    if (!session) {
      return NextResponse.json(
        {
          user: null,
          activities: [],
          leaderboard: [],
          progressGraph: {
            months: [],
            scores: [],
          },
          milestones: [],
          quizProgress: [],
          features: {
            showAdminTools: false,
            admin: null,
          },
        },
        { status: 401 }
      );
    }

    const dashboard = await getProfileDashboard(
      session,
      requestedView
    );

    if (!dashboard) {
      return NextResponse.json(
        {
          user: null,
          activities: [],
          leaderboard: [],
          progressGraph: {
            months: [],
            scores: [],
          },
          milestones: [],
          quizProgress: [],
          features: {
            showAdminTools: false,
            admin: null,
          },
        },
        { status: 401 }
      );
    }

    const response = {
      user: {
        id: dashboard.user.id,
        name: dashboard.user.name,
        email: dashboard.user.email,
        role: dashboard.user.role,
        avatar: dashboard.user.avatar ?? null,
        status: dashboard.user.status ?? "active",
        memberSince:
          dashboard.user.memberSince ?? "",
        accountAgeText:
          dashboard.user.accountAgeText ?? "",
        level: dashboard.user.level ?? 1,
        points: dashboard.user.points ?? 0,
        badges: dashboard.user.badges ?? 0,
        streak: dashboard.user.streak ?? 0,
        rank: dashboard.user.rank ?? 0,
        phone: dashboard.user.phone ?? null,
        location:
          dashboard.user.location ?? "India",
      },

      activities: (
        dashboard.activities ?? []
      ).map((a) => ({
        icon: a.icon,
        text: a.text,
        time: a.time,
      })),

      leaderboard: (
        dashboard.leaderboard ?? []
      ).map((e) => ({
        rank: e.rank,
        name: e.name,
        pts: e.pts,
        you: e.you,
      })),

      progressGraph: {
        months:
          dashboard.progressGraph?.months ?? [],
        scores:
          dashboard.progressGraph?.scores ?? [],
      },

      milestones: (
        dashboard.milestones ?? []
      ).map((m) => ({
        title: m.title,
        desc: m.desc,
        pts: m.pts,
        unlocked: m.unlocked,
        progress: m.progress ?? 0,
      })),

      quizProgress: (
        dashboard.quizProgress ?? []
      ).map((q) => ({
        title: q.title,
        score: q.score,
        done: q.done,
        total: q.total,
      })),

      features: {
        showAdminTools:
          dashboard.features?.showAdminTools ??
          false,

        admin:
          requestedView === "admin" &&
          dashboard.features?.admin
            ? {
                totalUsers:
                  dashboard.features.admin
                    .totalUsers,

                activeUsers:
                  dashboard.features.admin
                    .activeUsers,

                blockedUsers:
                  dashboard.features.admin
                    .blockedUsers,

                totalQuizzes:
                  dashboard.features.admin
                    .totalQuizzes,

                feedbackCount:
                  dashboard.features.admin
                    .feedbackCount,

                recentUsers: (
                  dashboard.features.admin
                    .recentUsers ?? []
                ).map((u) => ({
                  id: u.id,
                  name: u.name,
                  email: u.email,
                  role: u.role,
                  joined: u.joined,
                })),
              }
            : null,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}