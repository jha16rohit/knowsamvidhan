import { NextResponse } from "next/server";
import { getAdminSession, getUserSession } from "@/lib/auth";
import { getProfileDashboard } from "@/lib/profile";

/**
 * Shape contracts inferred from the frontend ProfileDashboard type.
 *
 * ProfileDashboard {
 *   user: ProfileUser
 *   activities: ProfileActivity[]
 *   leaderboard: LeaderboardEntry[]
 *   progressGraph?: ProgressGraphData          // { months: string[], scores: number[] }
 *   milestones?: JourneyMilestone[]
 *   quizProgress?: QuizProgress[]
 *   features: {
 *     showAdminTools: boolean
 *     admin: AdminProfileFeatures | null
 *   }
 * }
 *
 * ProfileUser {
 *   id, name, email, role ("USER"|"ADMIN"),
 *   avatar (string|null), status, memberSince, accountAgeText,
 *   level, points, badges, streak, rank,
 *   phone (string|null), location
 * }
 *
 * ProfileActivity {
 *   icon: "quiz"|"comment"|"share"|"badge"|"course"|"feedback"
 *   text: string
 *   time: string
 * }
 *
 * LeaderboardEntry { rank, name, pts, you }
 *
 * JourneyMilestone { title, desc, pts, unlocked, progress? }
 *
 * QuizProgress { title, score, done, total }
 *
 * AdminProfileFeatures {
 *   totalUsers, activeUsers, blockedUsers, totalQuizzes, feedbackCount,
 *   recentUsers: Array<{ id, name, email, role, joined }>
 * }
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const requestedView =
    searchParams.get("view") === "admin" ? "admin" : "user";

  // ── Auth ──────────────────────────────────────────────────────────────────
  const session =
    requestedView === "admin"
      ? getAdminSession(req)
      : getUserSession(req);

  if (!session) {
    return NextResponse.json(
      {
        user: null,
        activities: [],
        leaderboard: [],
        progressGraph: { months: [], scores: [] },
        milestones: [],
        quizProgress: [],
        features: { showAdminTools: false, admin: null },
      },
      { status: 401 },
    );
  }

  // ── Data fetch ────────────────────────────────────────────────────────────
  // getProfileDashboard must return a value that satisfies the full
  // ProfileDashboard shape below.  The library function is responsible for
  // querying the database and shaping each sub-document.
  const dashboard = await getProfileDashboard(session, requestedView);

  if (!dashboard) {
    return NextResponse.json(
      {
        user: null,
        activities: [],
        leaderboard: [],
        progressGraph: { months: [], scores: [] },
        milestones: [],
        quizProgress: [],
        features: { showAdminTools: false, admin: null },
      },
      { status: 401 },
    );
  }

  // ── Safe-defaults: guarantee every field the frontend reads ───────────────
  // The frontend destructures these keys unconditionally; missing ones would
  // cause runtime errors or silent empty-state bugs.
  const response = {
    // ── Core user object ────────────────────────────────────────────────────
    user: {
      id:             dashboard.user.id,
      name:           dashboard.user.name,
      email:          dashboard.user.email,
      role:           dashboard.user.role,               // "USER" | "ADMIN"
      avatar:         dashboard.user.avatar ?? null,
      status:         dashboard.user.status ?? "active",
      memberSince:    dashboard.user.memberSince ?? "",
      accountAgeText: dashboard.user.accountAgeText ?? "",
      level:          dashboard.user.level   ?? 1,
      points:         dashboard.user.points  ?? 0,
      badges:         dashboard.user.badges  ?? 0,
      streak:         dashboard.user.streak  ?? 0,
      rank:           dashboard.user.rank    ?? 0,
      phone:          dashboard.user.phone   ?? null,
      location:       dashboard.user.location ?? "India",
    },

    // ── Recent activity feed ────────────────────────────────────────────────
    // icon must be one of: "quiz"|"comment"|"share"|"badge"|"course"|"feedback"
    activities: (dashboard.activities ?? []).map((a) => ({
      icon: a.icon,   // ActivityIconType — validated by getProfileDashboard
      text: a.text,
      time: a.time,
    })),

    // ── Leaderboard ─────────────────────────────────────────────────────────
    leaderboard: (dashboard.leaderboard ?? []).map((e) => ({
      rank: e.rank,
      name: e.name,
      pts:  e.pts,
      you:  e.you,   // boolean — marks the current user's own row
    })),

    // ── Progress graph (optional, defaults to empty) ────────────────────────
    // months: short month labels e.g. ["Nov","Dec","Jan",…]
    // scores: 0-100 quiz-score values aligned with months
    progressGraph: {
      months: dashboard.progressGraph?.months ?? [],
      scores: dashboard.progressGraph?.scores ?? [],
    },

    // ── Journey milestones (optional) ──────────────────────────────────────
    milestones: (dashboard.milestones ?? []).map((m) => ({
      title:    m.title,
      desc:     m.desc,
      pts:      m.pts,
      unlocked: m.unlocked,
      progress: m.progress ?? 0,   // 0–100, shown when unlocked === false
    })),

    // ── Quiz progress (optional) ────────────────────────────────────────────
    quizProgress: (dashboard.quizProgress ?? []).map((q) => ({
      title: q.title,
      score: q.score,   // 0–100 percentage shown in the progress bar
      done:  q.done,
      total: q.total,
    })),

    // ── Feature flags & admin sub-document ─────────────────────────────────
    features: {
      showAdminTools: dashboard.features?.showAdminTools ?? false,

      // admin is null for regular users; populated for admins
      admin:
        requestedView === "admin" && dashboard.features?.admin
          ? {
              totalUsers:   dashboard.features.admin.totalUsers,
              activeUsers:  dashboard.features.admin.activeUsers,
              blockedUsers: dashboard.features.admin.blockedUsers,
              totalQuizzes: dashboard.features.admin.totalQuizzes,
              feedbackCount: dashboard.features.admin.feedbackCount,

              // recentUsers: last N registered users shown in the admin panel
              recentUsers: (dashboard.features.admin.recentUsers ?? []).map(
                (u) => ({
                  id:     u.id,
                  name:   u.name,
                  email:  u.email,
                  role:   u.role,     
                  joined: u.joined,   
                }),
              ),
            }
          : null,
    },
  };

  return NextResponse.json(response);
}