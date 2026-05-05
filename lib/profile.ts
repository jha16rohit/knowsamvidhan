import type { SessionPayload } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ============================================================
// TYPES
// ============================================================

export type ProfileView = "user" | "admin";

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
  status: string;
  memberSince: string;
  accountAgeText: string;
  level: number;
  points: number;
  badges: number;
  streak: number;
  rank: number;
  phone: string | null;
  location: string;
};

export type ActivityIconType =
  | "quiz"
  | "comment"
  | "share"
  | "badge"
  | "course"
  | "feedback";

export type ProfileActivity = {
  icon: ActivityIconType;
  text: string;
  time: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  pts: number;
  you: boolean;
};

export type ProgressGraphData = {
  months: string[];
  scores: number[];
};

export type JourneyMilestone = {
  title: string;
  desc: string;
  pts: number;
  unlocked: boolean;
  progress?: number;
};

export type QuizProgress = {
  title: string;
  score: number;
  done: number;
  total: number;
};

export type AdminProfileFeatures = {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalQuizzes: number;
  feedbackCount: number;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    joined: string;
  }>;
};

export type ProfileDashboard = {
  user: ProfileUser;
  activities: ProfileActivity[];
  leaderboard: LeaderboardEntry[];
  progressGraph: ProgressGraphData;
  milestones: JourneyMilestone[];
  quizProgress: QuizProgress[];
  features: {
    showAdminTools: boolean;
    admin: AdminProfileFeatures | null;
  };
};

// ============================================================
// HELPERS
// ============================================================

function formatYear(date: Date): string {
  return new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRelativeDate(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / 86_400_000));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(date);
}

/** Returns a "YYYY-MM" key for grouping attempts by calendar month. */
function toMonthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/** Returns the short month label (e.g. "Jan") for a given YYYY-MM key. */
function monthKeyToLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

/** Generates an ordered array of the last N calendar month keys. */
function lastNMonthKeys(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (n - 1 - i));
    return toMonthKey(d);
  });
}

/** Calculates consecutive-day streak from a set of ISO date strings (YYYY-MM-DD). */
function calcStreak(attemptDates: Date[]): number {
  if (attemptDates.length === 0) return 0;

  const daySet = new Set(
    attemptDates.map((d) => d.toISOString().slice(0, 10))
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);

    if (daySet.has(key)) {
      streak++;
    } else {
      // Allow one-day grace: if today has no attempt yet, check yesterday first
      if (i === 0) continue;
      break;
    }
  }

  return streak;
}

// ============================================================
// LEADERBOARD
// ============================================================

async function getLeaderboard(
  currentUserId: string
): Promise<LeaderboardEntry[]> {
  const users = await prisma.user.findMany({
    where: { isDeleted: false, status: "ACTIVE" },
    select: {
      id: true,
      name: true,
      email: true,
      quizAttempts: { select: { score: true } },
    },
  });

  return users
    .map((u) => ({
      id: u.id,
      name: u.name?.trim() || u.email.split("@")[0],
      pts: u.quizAttempts.reduce((sum, a) => sum + a.score * 10, 0),
    }))
    .sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name))
    .slice(0, 8)
    .map((entry, index) => ({
      rank: index + 1,
      name: entry.name,
      pts: entry.pts,
      you: entry.id === currentUserId,
    }));
}

// ============================================================
// ADMIN FEATURES
// ============================================================

async function getAdminFeatures(): Promise<AdminProfileFeatures> {
  const [
    totalUsers,
    activeUsers,
    blockedUsers,
    totalQuizzes,
    feedbackCount,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.user.count({ where: { isDeleted: false, status: "ACTIVE" } }),
    prisma.user.count({ where: { isDeleted: false, status: "BLOCKED" } }),
    prisma.quiz.count(),
    prisma.feedback.count(),
    prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalUsers,
    activeUsers,
    blockedUsers,
    totalQuizzes,
    feedbackCount,
    recentUsers: recentUsers.map((u) => ({
      id: u.id,
      name: u.name?.trim() || "Unnamed user",
      email: u.email,
      role: u.role,
      joined: formatDate(u.createdAt),
    })),
  };
}

// ============================================================
// MAIN PROFILE DASHBOARD
// ============================================================

export async function getProfileDashboard(
  session: SessionPayload,
  view: ProfileView
): Promise<ProfileDashboard | null> {
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      status: true,
      isDeleted: true,
      createdAt: true,

      // NOTE: Add `phone` and `location` here if those columns exist in your
      // User model. e.g.  phone: true,  location: true

      quizAttempts: {
        orderBy: { submittedAt: "desc" },
        select: {
          score: true,
          totalQ: true,
          submittedAt: true,
          quiz: { select: { title: true } },
        },
      },

      feedbacks: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { rating: true, createdAt: true },
      },
    },
  });

  // ==========================================================
  // GUARD: invalid / inactive / unauthorised
  // ==========================================================

  if (!user || user.isDeleted || user.status !== "ACTIVE") return null;
  if (view === "admin" && user.role !== "ADMIN") return null;

  // ==========================================================
  // POINTS & LEVEL
  // ==========================================================

  const totalScore = user.quizAttempts.reduce((sum, a) => sum + a.score, 0);
  const points = totalScore * 10;
  const level = Math.max(1, Math.floor(points / 100) + 1);

  // ==========================================================
  // ACCOUNT AGE
  // ==========================================================

  const joinedDate = user.createdAt;
  const monthsActive = Math.max(
    1,
    Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
  );
  const accountAgeText =
    monthsActive === 1 ? "1 month" : `${monthsActive} months`;

  // ==========================================================
  // STREAK  (fix #3 — real consecutive-day streak)
  // ==========================================================

  const streak = calcStreak(user.quizAttempts.map((a) => a.submittedAt));

  // ==========================================================
  // LEADERBOARD & RANK
  // ==========================================================

  const leaderboard = await getLeaderboard(user.id);
  const rank = leaderboard.find((e) => e.you)?.rank ?? 0;

  // ==========================================================
  // MILESTONES  (built early so badge count can reference them)
  // ==========================================================

  const milestones: JourneyMilestone[] = [
    {
      title: "First Quiz",
      desc: "Completed your first quiz",
      pts: 100,
      unlocked: user.quizAttempts.length >= 1,
      progress: Math.min(100, user.quizAttempts.length >= 1 ? 100 : 0),
    },
    {
      title: "Quiz Explorer",
      desc: "Complete 5 quizzes",
      pts: 300,
      unlocked: user.quizAttempts.length >= 5,
      progress: Math.min(
        100,
        Math.round((user.quizAttempts.length / 5) * 100)
      ),
    },
    {
      title: "Constitution Master",
      desc: "Reach 500 points",
      pts: 500,
      unlocked: points >= 500,
      progress: Math.min(100, Math.round((points / 500) * 100)),
    },
  ];

  // fix #4 — badges = number of unlocked milestones
  const badges = milestones.filter((m) => m.unlocked).length;

  // ==========================================================
  // ACTIVITIES  (fix #1 — icon must be ActivityIconType literal)
  // ==========================================================

  const quizActivities: ProfileActivity[] = user.quizAttempts
    .slice(0, 4)
    .map((a) => ({
      icon: "quiz" as ActivityIconType,
      text: `Scored ${a.score}/${a.totalQ} in ${a.quiz.title}`,
      time: formatRelativeDate(a.submittedAt),
    }));

  const feedbackActivities: ProfileActivity[] = user.feedbacks.map((f) => ({
    icon: "feedback" as ActivityIconType, // fix #1 — was wrongly set to initials string
    text: `Shared ${f.rating}/5 feedback`,
    time: formatRelativeDate(f.createdAt),
  }));

  const activities: ProfileActivity[] = [
    ...quizActivities,
    ...feedbackActivities,
  ].slice(0, 6);

  // ==========================================================
  // PROGRESS GRAPH  (fix #2 — aggregate by calendar month)
  // ==========================================================

  // Build a map: YYYY-MM → list of per-attempt percentage scores
  const scoresByMonth = new Map<string, number[]>();
  for (const attempt of user.quizAttempts) {
    if (attempt.totalQ === 0) continue; // guard against division by zero
    const key = toMonthKey(attempt.submittedAt);
    const pct = Math.round((attempt.score / attempt.totalQ) * 100);
    if (!scoresByMonth.has(key)) scoresByMonth.set(key, []);
    scoresByMonth.get(key)!.push(pct);
  }

  // Last 7 calendar months (always exactly 7 points on the chart)
  const monthKeys = lastNMonthKeys(7);
  const progressGraph: ProgressGraphData = {
    months: monthKeys.map(monthKeyToLabel),
    scores: monthKeys.map((key) => {
      const values = scoresByMonth.get(key);
      if (!values || values.length === 0) return 0;
      return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    }),
  };



  const quizProgress: QuizProgress[] = user.quizAttempts
    .slice(0, 5)
    .map((a) => ({
      title: a.quiz.title,
      // score is 0-100 percentage for the progress bar
      score: a.totalQ > 0 ? Math.round((a.score / a.totalQ) * 100) : 0,
      // done / total = correct answers out of total questions
      done: a.score,
      total: a.totalQ,
    }));



  return {
    user: {
      id: user.id,
      name: user.name?.trim() || user.email.split("@")[0],
      email: user.email,
      role: user.role,
      avatar: user.avatar ?? null,
      status: user.status,
      memberSince: formatYear(joinedDate),
      accountAgeText,
      level,
      points,
      badges,
      streak,
      rank,
      // fix #6 — extend Prisma select with phone/location when columns exist
      // phone: user.phone ?? null,
      // location: user.location ?? "India",
      phone: null,
      location: "India",
    },
    activities,
    leaderboard,
    progressGraph,
    milestones,
    quizProgress,
    features: {
      showAdminTools: view === "admin" && user.role === "ADMIN",
      admin:
        view === "admin" && user.role === "ADMIN"
          ? await getAdminFeatures()
          : null,
    },
  };
}