"use client";

import {
  Award,
  BadgeCheck,
  ChartNoAxesCombined,
  Crown,
  Flame,
  LibraryBig,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Settings,
  Share2,
  Sparkles,
  BookOpen,
  TrendingUp,
  Trophy,
  MessageSquareMore,
  Pen,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
type ProfileView = "user" | "admin";

type ProfileUser = {
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

type ActivityIconType =
  | "quiz"
  | "comment"
  | "share"
  | "badge"
  | "course"
  | "feedback";

type ProfileActivity = {
  icon: ActivityIconType;
  text: string;
  time: string;
};

type LeaderboardEntry = {
  rank: number;
  name: string;
  pts: number;
  you: boolean;
};

type AdminProfileFeatures = {
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

type ProfileDashboard = {
  user: ProfileUser;
  activities: ProfileActivity[];
  leaderboard: LeaderboardEntry[];
  progressGraph?: ProgressGraphData;
  milestones?: JourneyMilestone[];
  quizProgress?: QuizProgress[];

  features: {
    showAdminTools: boolean;
    admin: AdminProfileFeatures | null;
  };
};

type ProgressGraphData = {
  months: string[];
  scores: number[];
};

type JourneyMilestone = {
  title: string;
  desc: string;
  pts: number;
  unlocked: boolean;
  progress?: number;
};

type QuizProgress = {
  title: string;
  score: number;
  done: number;
  total: number;
};

const card = {
  background: `
    linear-gradient(
      180deg,
      rgba(255,255,255,0.72) 0%,
      rgba(255,255,255,0.58) 100%
    )
  `,

  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  borderRadius: "30px",
  padding: "24px",
  border: "1px solid rgba(255,255,255,0.42)",
  boxShadow: `
    0 10px 35px rgba(15,23,42,0.08),
    0 2px 10px rgba(249,115,22,0.06),
    0 0 0 1px rgba(255,255,255,0.15),
    inset 0 1px 0 rgba(255,255,255,0.55)
  `,
  position: "relative" as const,
  overflow: "hidden" as const,
  transition: "all 0.3s ease",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}



function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 22,
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "relative",

          width: 48,
          height: 48,

          borderRadius: "50%",

          background: `
            linear-gradient(
              135deg,
              rgba(249,115,22,1) 0%,
              rgba(251,146,60,0.96) 45%,
              rgba(253,186,116,0.92) 100%
            )
          `,

          border: "1px solid rgba(255,255,255,0.35)",

          boxShadow: `
            0 12px 28px rgba(249,115,22,0.30),
            0 4px 10px rgba(249,115,22,0.16),
            inset 0 1px 2px rgba(255,255,255,0.35)
          `,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(
                circle at top left,
                rgba(255,255,255,0.45),
                transparent 42%
              )
            `,
            opacity: 0.9,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 18,
            color: "#1f1f1f",
            letterSpacing: "-0.02em",
            marginBottom: 2,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 13.5,
            color: "#9b8c7d",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}



function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 48,
        height: 26,
        borderRadius: 999,
        background: on
          ? `
            linear-gradient(
              135deg,
              #f97316 0%,
              #fb923c 55%,
              #fdba74 100%
            )
          `
          : "rgba(223,213,202,0.82)",

        border: on
          ? "1px solid rgba(255,255,255,0.22)"
          : "1px solid rgba(210,197,184,0.72)",

        backdropFilter: "blur(12px)",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.28s ease",
        boxShadow: on
          ? `
            0 8px 20px rgba(249,115,22,0.25),
            inset 0 1px 2px rgba(255,255,255,0.35)
          `
          : `
            inset 0 1px 2px rgba(255,255,255,0.4),
            0 2px 8px rgba(0,0,0,0.05)
          `,
      }}
    >
      {/* KNOB */}

      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,1) 0%,
              rgba(245,245,245,0.95) 100%
            )
          `,

          position: "absolute",
          top: 2.5,
          left: on ? 25 : 3,
          transition: "all 0.28s ease",
          boxShadow: `
            0 4px 12px rgba(0,0,0,0.14),
            inset 0 1px 1px rgba(255,255,255,0.7)
          `,
        }}
      />
    </div>
  );
}



function ContactItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,

        padding: "8px 14px",

        borderRadius: 999,

        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.72) 0%,
            rgba(255,255,255,0.48) 100%
          )
        `,

        border: "1px solid rgba(255,255,255,0.45)",

        backdropFilter: "blur(12px)",

        boxShadow: `
          0 4px 12px rgba(15,23,42,0.04),
          inset 0 1px 0 rgba(255,255,255,0.6)
        `,

        transition: "all 0.25s ease",

        cursor: "default",
      }}
    >
      {/* ICON */}

      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>

      {/* TEXT */}

      <span
        style={{
          color: "#5f5348",

          fontSize: 13.5,

          fontWeight: 500,

          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </span>
  );
}



function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: boolean;
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.025)";

        e.currentTarget.style.boxShadow = `
          0 18px 35px rgba(249,115,22,0.12),
          0 10px 22px rgba(15,23,42,0.08),
          inset 0 1px 0 rgba(255,255,255,0.65)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px) scale(1)";

        e.currentTarget.style.boxShadow = `
          0 10px 22px rgba(15,23,42,0.05),
          inset 0 1px 0 rgba(255,255,255,0.6)
        `;
      }}
      style={{
        position: "relative",

        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.78) 0%,
            rgba(255,255,255,0.58) 100%
          )
        `,

        backdropFilter: "blur(16px)",

        border: "1px solid rgba(255,255,255,0.45)",

        borderRadius: 22,

        padding: "18px 18px",

        display: "flex",
        alignItems: "center",
        gap: 14,

        overflow: "hidden",

        transition: "all 0.28s ease",

        boxShadow: `
          0 10px 22px rgba(15,23,42,0.05),
          inset 0 1px 0 rgba(255,255,255,0.6)
        `,
      }}
    >
      {/* ATMOSPHERIC GLOW */}

      <div
        style={{
          position: "absolute",

          top: -20,
          right: -20,

          width: 90,
          height: 90,

          borderRadius: "50%",

          background: accent
            ? "rgba(249,115,22,0.12)"
            : "rgba(245,158,11,0.08)",

          filter: "blur(30px)",

          pointerEvents: "none",
        }}
      />

      {/* ICON WRAPPER */}

      <div
        style={{
          position: "relative",

          width: 46,
          height: 46,

          minWidth: 46,

          borderRadius: "50%",

          background: accent
            ? `
              linear-gradient(
                135deg,
                #f97316 0%,
                #fb923c 45%,
                #fdba74 100%
              )
            `
            : `
              linear-gradient(
                135deg,
                #f6d2a9 0%,
                #f8e2ca 100%
              )
            `,

          border: "1px solid rgba(255,255,255,0.35)",

          boxShadow: accent
            ? `
              0 10px 24px rgba(249,115,22,0.24),
              0 2px 8px rgba(249,115,22,0.14),
              inset 0 1px 2px rgba(255,255,255,0.28)
            `
            : `
              0 6px 14px rgba(0,0,0,0.06),
              inset 0 1px 2px rgba(255,255,255,0.45)
            `,

          transition: "all 0.25s ease",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,

          overflow: "hidden",
        }}
      >
        {/* ICON LIGHT */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            background: `
              radial-gradient(
                circle at top left,
                rgba(255,255,255,0.4),
                transparent 45%
              )
            `,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>

      {/* TEXT */}

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 11,

            color: "#9a8a7b",

            fontWeight: 700,

            letterSpacing: "0.08em",

            textTransform: "uppercase",

            marginBottom: 4,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 24,

            fontWeight: 800,

            letterSpacing: "-0.03em",

            color: "#1f1f1f",

            lineHeight: 1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}



function ProfileCard({
  profile,
  onEditProfile,
}: {
  profile: ProfileUser;
  onEditProfile: () => void;
}) {
  return (
    <div
      style={{
        ...card,

        padding: "34px 34px 28px",

        position: "relative",

        overflow: "hidden",

        marginBottom: 22,

        border: "1px solid rgba(255,255,255,0.38)",

        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.76) 0%,
            rgba(255,255,255,0.56) 100%
          )
        `,

        backdropFilter: "blur(24px)",

        boxShadow: `
          0 20px 45px rgba(15,23,42,0.08),
          0 10px 24px rgba(249,115,22,0.06),
          inset 0 1px 0 rgba(255,255,255,0.6)
        `,
      }}
    >
      {/* =========================
          ATMOSPHERIC BLOBS
      ========================= */}

      <div
        style={{
          position: "absolute",

          top: -120,
          right: -80,

          width: 320,
          height: 320,

          borderRadius: "50%",

          background: `
            radial-gradient(
              circle,
              rgba(249,115,22,0.24) 0%,
              rgba(251,146,60,0.14) 30%,
              rgba(255,255,255,0.02) 70%,
              transparent 100%
            )
          `,

          filter: "blur(30px)",

          opacity: 0.95,

          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",

          bottom: -120,
          left: -80,

          width: 240,
          height: 240,

          borderRadius: "50%",

          background: "rgba(251,146,60,0.10)",

          filter: "blur(45px)",

          zIndex: 0,
        }}
      />

      {/* =========================
          CONTENT
      ========================= */}

      <div
        style={{
          display: "flex",

          alignItems: "flex-start",

          justifyContent: "space-between",

          position: "relative",

          zIndex: 2,

          marginBottom: 34,

          gap: 24,
        }}
      >
        {/* LEFT */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* =========================
              AVATAR
          ========================= */}

          <div
            style={{
              position: "relative",
            }}
          >
            {/* OUTER GLOW */}

            <div
              style={{
                position: "absolute",

                inset: -10,

                borderRadius: "50%",

                background: "rgba(249,115,22,0.16)",

                filter: "blur(18px)",

                zIndex: 0,
              }}
            />

            {/* AVATAR */}

            <div
              style={{
                width: 94,
                height: 94,

                borderRadius: "50%",

                padding: 3,

                background: `
                  linear-gradient(
                    135deg,
                    #f97316 0%,
                    #fb923c 45%,
                    #fdba74 100%
                  )
                `,

                boxShadow: `
                  0 16px 34px rgba(249,115,22,0.25),
                  0 4px 12px rgba(249,115,22,0.14)
                `,

                position: "relative",

                zIndex: 2,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid rgba(255,255,255,0.7)",
                }}
              >
                <Image
                  src={profile.avatar || "/image/avatar.png"}
                  alt={profile.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* LEVEL BADGE */}

            <div
              style={{
                position: "absolute",

                bottom: -8,
                left: "50%",

                transform: "translateX(-50%)",

                background: `
                  linear-gradient(
                    135deg,
                    #f97316 0%,
                    #fb923c 50%,
                    #fdba74 100%
                  )
                `,

                border: "1px solid rgba(255,255,255,0.35)",

                color: "white",

                fontSize: 11.5,

                fontWeight: 700,

                padding: "6px 12px",

                borderRadius: 999,

                display: "flex",
                alignItems: "center",
                gap: 5,

                whiteSpace: "nowrap",

                backdropFilter: "blur(10px)",

                boxShadow: `
                  0 10px 22px rgba(249,115,22,0.24),
                  inset 0 1px 2px rgba(255,255,255,0.25)
                `,

                zIndex: 3,
              }}
            >
              <Flame size={13} strokeWidth={2.5} />
              Lvl {profile.level || 1}
            </div>
          </div>

          <div>
            {/* NAME */}
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#1b1b1b",
                marginBottom: 8,
                lineHeight: 1,
              }}
            >
              {profile.name}
            </h1>

            {/* ROLE */}

            <p
              style={{
                fontSize: 14.5,
                color: "#8f7d69",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              {profile.role || "Learner"} · Member since{" "}
              {profile.memberSince || "2026"}
            </p>

            {/* CONTACTS */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <ContactItem
                icon={<Mail size={14} color="#f97316" strokeWidth={2.2} />}
                label={profile.email}
              />

              <ContactItem
                icon={<Phone size={14} color="#10b981" strokeWidth={2.2} />}
                label={profile.phone || "Not added"}
              />

              <ContactItem
                icon={<MapPin size={14} color="#ef4444" strokeWidth={2.2} />}
                label={profile.location || "India"}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";

            e.currentTarget.style.boxShadow = `
              0 18px 34px rgba(249,115,22,0.30),
              0 8px 18px rgba(249,115,22,0.18),
              inset 0 1px 2px rgba(255,255,255,0.35)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px) scale(1)";

            e.currentTarget.style.boxShadow = `
              0 12px 26px rgba(249,115,22,0.22),
              0 4px 10px rgba(249,115,22,0.12),
              inset 0 1px 2px rgba(255,255,255,0.25)
            `;
          }}
          style={{
            background: `
              linear-gradient(
                135deg,
                #f97316 0%,
                #fb923c 45%,
                #fdba74 100%
              )
            `,

            color: "white",

            border: "1px solid rgba(255,255,255,0.25)",

            borderRadius: 999,

            padding: "12px 22px",

            fontSize: 14,

            fontWeight: 700,

            cursor: "pointer",

            boxShadow: `
              0 12px 26px rgba(249,115,22,0.22),
              0 4px 10px rgba(249,115,22,0.12),
              inset 0 1px 2px rgba(255,255,255,0.25)
            `,

            display: "flex",
            alignItems: "center",
            gap: 8,

            fontFamily: "'Plus Jakarta Sans', sans-serif",

            backdropFilter: "blur(12px)",

            transition: "all 0.28s ease",

            flexShrink: 0,
          }}
        >
          <Pen size={16} strokeWidth={2.4} />
          Edit profile
        </button>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(4, 1fr)",

          gap: 16,

          position: "relative",

          zIndex: 2,
        }}
      >
        <StatCard
          label="POINTS"
          value={profile.points || 0}
          icon={<Trophy size={20} color="#ffffff" strokeWidth={2.5} />}
          accent
        />

        <StatCard
          label="BADGES"
          value={profile.badges || 0}
          icon={<Award size={20} color="#f59e0b" strokeWidth={2.5} />}
          accent={false}
        />

        <StatCard
          label="DAY STREAK"
          value={profile.streak || 0}
          icon={<Flame size={20} color="#fff7ed" strokeWidth={2.5} />}
          accent
        />

        <StatCard
          label="RANK"
          value={`#${profile.rank || 0}`}
          icon={
            <ChartNoAxesCombined size={20} color="#f59e0b" strokeWidth={2.5} />
          }
          accent={false}
        />
      </div>
    </div>
  );
}



function getActivityIcon(type: ActivityIconType) {
  const common = {
    size: 17,
    strokeWidth: 2.3,
  };

  switch (type) {
    case "quiz":
      return <BookOpen {...common} color="#fb923c" />;

    case "comment":
      return <MessageCircle {...common} color="#38bdf8" />;

    case "share":
      return <Share2 {...common} color="#c084fc" />;

    case "badge":
      return <BadgeCheck {...common} color="#22c55e" />;

    case "course":
      return <LibraryBig {...common} color="#f59e0b" />;

    case "feedback":
      return <MessageSquareMore {...common} color="#ef4444" />;

    default:
      return <Sparkles {...common} color="#fb923c" />;
  }
}



function RecentActivity({ activities }: { activities: ProfileActivity[] }) {
  return (
    <div
      style={{
        ...card,
        marginBottom: 22,
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.72) 0%,
            rgba(255,255,255,0.52) 100%
          )
        `,
        border: "1px solid rgba(255,255,255,0.38)",
        backdropFilter: "blur(22px)",
        boxShadow: `
          0 18px 40px rgba(15,23,42,0.08),
          0 6px 20px rgba(249,115,22,0.05),
          inset 0 1px 0 rgba(255,255,255,0.55)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionHeader
          icon={<Sparkles size={20} color="#ffffff" strokeWidth={2.5} />}
          title="Recent activity"
          subtitle="Latest interactions"
        />
        {activities.length === 0 ? (
          <div
            style={{
              border: "1.5px dashed rgba(240,191,143,0.8)",
              borderRadius: 22,
              padding: "34px 20px",
              textAlign: "center",
              background: `
                linear-gradient(
                  135deg,
                  rgba(255,248,241,0.82) 0%,
                  rgba(255,255,255,0.45) 100%
                )
              `,
              backdropFilter: "blur(16px)",
              color: "#9a7757",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.5)
              `,
            }}
          >
            No User Activity Found
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              marginTop: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 19,
                top: 8,
                bottom: 8,
                width: 3,
                borderRadius: 999,
                background: `
                  linear-gradient(
                    to bottom,
                    rgba(249,115,22,0.35),
                    rgba(251,146,60,0.16),
                    rgba(255,255,255,0)
                  )
                `,
                boxShadow: "0 0 14px rgba(249,115,22,0.12)",
              }}
            />

            {activities.map((a, i) => (
              <div
                key={i}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `
                    0 14px 26px rgba(15,23,42,0.08),
                    0 6px 14px rgba(249,115,22,0.08)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                style={{
                  display: "flex",
                  gap: 16,
                  position: "relative",
                  marginBottom: i === activities.length - 1 ? 0 : 16,
                  padding: "16px 18px",
                  borderRadius: 24,
                  transition: "all 0.28s ease",
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.62) 0%,
                      rgba(255,255,255,0.34) 100%
                    )
                  `,
                  border: "1px solid rgba(255,255,255,0.34)",
                  backdropFilter: "blur(14px)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(249,115,22,0.06)",
                    filter: "blur(25px)",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    width: 40,
                    height: 40,
                    minWidth: 40,
                    borderRadius: "50%",
                    background: `
                      linear-gradient(
                        135deg,
                        rgba(255,255,255,0.95) 0%,
                        rgba(255,244,236,0.88) 100%
                      )
                    `,
                    border: "1px solid rgba(255,255,255,0.65)",
                    boxShadow: `
                      0 10px 24px rgba(249,115,22,0.10),
                      inset 0 1px 0 rgba(255,255,255,0.65)
                    `,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(12px)",
                    zIndex: 2,
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(249,115,22,0.08)",
                      filter: "blur(8px)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {getActivityIcon(a.icon)}
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    flex: 1,
                    paddingTop: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 15.2,
                      color: "#2f241d",
                      lineHeight: 1.45,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {a.text}
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(249,115,22,0.08)",
                      border: "1px solid rgba(249,115,22,0.10)",
                      fontSize: 12.5,
                      color: "#9a7757",
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#fb923c",
                        boxShadow: "0 0 10px rgba(249,115,22,0.45)",
                      }}
                    />
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



function Leaderboard({
  entries,
}: {
  entries: LeaderboardEntry[];
}) {
  return (
    <div
      style={{
        ...card,
        marginBottom: 22,
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.74) 0%,
            rgba(255,255,255,0.52) 100%
          )
        `,
        border: "1px solid rgba(255,255,255,0.38)",
        backdropFilter: "blur(20px)",
        boxShadow: `
          0 18px 40px rgba(15,23,42,0.08),
          0 6px 20px rgba(249,115,22,0.05),
          inset 0 1px 0 rgba(255,255,255,0.55)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionHeader
          icon={
            <Crown
              size={20}
              color="#ffffff"
              strokeWidth={2.5}
            />
          }
          title="Leaderboard"
          subtitle="Top constitutional learners"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {entries.map((entry, i) => {
            const topThree =
              entry.rank <= 3;

            return (
              <div
                key={i}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
                  e.currentTarget.style.boxShadow =
                    topThree
                      ? `
                        0 18px 35px rgba(249,115,22,0.18),
                        0 8px 18px rgba(249,115,22,0.10)
                      `
                      : `
                        0 14px 30px rgba(15,23,42,0.08),
                        0 6px 14px rgba(15,23,42,0.04)
                      `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px) scale(1)";
                  e.currentTarget.style.boxShadow =
                    entry.you
                      ? `
                        0 12px 30px rgba(249,115,22,0.12)
                      `
                      : `
                        0 8px 20px rgba(15,23,42,0.05)
                      `;
                }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding:
                    topThree
                      ? "14px 16px"
                      : "12px 15px",
                  borderRadius: 26,
                  transition: "all 0.28s ease",
                  background: entry.you
                    ? `
                      linear-gradient(
                        135deg,
                        rgba(255,244,236,0.88) 0%,
                        rgba(255,255,255,0.64) 100%
                      )
                    `
                    : `
                      linear-gradient(
                        135deg,
                        rgba(255,255,255,0.62) 0%,
                        rgba(255,255,255,0.38) 100%
                      )
                    `,

                  border: entry.you
                    ? "1px solid rgba(249,115,22,0.22)"
                    : "1px solid rgba(255,255,255,0.34)",

                  backdropFilter: "blur(14px)",
                  boxShadow: entry.you
                    ? `
                      0 12px 30px rgba(249,115,22,0.12)
                    `
                    : `
                      0 8px 20px rgba(15,23,42,0.05)
                    `,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: topThree
                      ? "rgba(249,115,22,0.10)"
                      : "rgba(255,255,255,0.18)",
                    filter: "blur(30px)",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: topThree
                      ? 42
                      : 38,
                    height: topThree
                      ? 42
                      : 38,
                    minWidth: topThree
                      ? 42
                      : 38,
                    borderRadius: "50%",
                    background: topThree
                      ? `
                        linear-gradient(
                          135deg,
                          #f97316 0%,
                          #fb923c 45%,
                          #fdba74 100%
                        )
                      `
                      : `
                        linear-gradient(
                          135deg,
                          rgba(255,255,255,0.88) 0%,
                          rgba(248,241,231,0.95) 100%
                        )
                      `,
                    border: topThree
                      ? "1px solid rgba(255,255,255,0.4)"
                      : "1px solid rgba(223,200,168,0.55)",
                    color: topThree
                      ? "#fff"
                      : "#2f241d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: topThree
                      ? 16
                      : 15,
                    boxShadow: topThree
                      ? `
                        0 12px 24px rgba(249,115,22,0.28),
                        inset 0 1px 2px rgba(255,255,255,0.25)
                      `
                      : `
                        0 6px 14px rgba(15,23,42,0.05)
                      `,
                  }}
                >
                  {entry.rank}
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: topThree
                          ? 16
                          : 15,
                        fontWeight: entry.you
                          ? 800
                          : 700,
                        color: "#1f1f1f",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.name}
                    </div>

                    {entry.you && (
                      <div
                        style={{
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: "rgba(249,115,22,0.12)",
                          color: "#ea580c",
                          fontSize: 11,
                          fontWeight: 700,
                          border: "1px solid rgba(249,115,22,0.16)",
                        }}
                      >
                        YOU
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      borderRadius: 999,
                      overflow: "hidden",
                      background: "rgba(226,212,194,0.45)",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (entry.pts / 1000) *
                            100,
                        )}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: `
                          linear-gradient(
                            90deg,
                            #f97316 0%,
                            #fb923c 55%,
                            #fdba74 100%
                          )
                        `,
                        boxShadow:
                          "0 0 14px rgba(249,115,22,0.22)",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#2f241d",
                      lineHeight: 1,
                    }}
                  >
                    {entry.pts}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#9a7757",
                      letterSpacing: "0.08em",
                      marginTop: 4,
                    }}
                  >
                    PTS
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



const ACCESSIBILITY_ITEMS = [
  {
    key: "Dark Mode",
    label: "Dark Mode",
  },
  {
    key: "screenReader",
    label: "Screen reader hints",
  },
  {
    key: "keyboard",
    label: "Keyboard shortcuts",
  },
  {
    key: "Change Cursor",
    label: "Change cursor",
  },
];




// Needs Modification
function Accessibility() {
  const [state, setState] = useState({
    highContrast: false,
    screenReader: true,
    keyboard: true,
    reducedMotion: false,
  });

  function toggle(key: string) {
    setState((prev) => ({
      ...prev,
      [key]:
        !prev[
          key as keyof typeof prev
        ],
    }));
  }

  return (
    <div
      style={{
        ...card,
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.70) 0%,
            rgba(255,255,255,0.48) 100%
          )
        `,
        border: "1px solid rgba(255,255,255,0.38)",
        backdropFilter: "blur(20px)",
        boxShadow: `
          0 18px 40px rgba(15,23,42,0.08),
          inset 0 1px 0 rgba(255,255,255,0.55)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionHeader
          icon={
            <Settings
              size={20}
              color="#ffffff"
              strokeWidth={2.5}
            />
          }
          title="Accessibility"
          subtitle="Tune your experience"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {ACCESSIBILITY_ITEMS.map(
            (item) => (
              <div
                key={item.key}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: 20,
                  transition: "all 0.25s ease",
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.62) 0%,
                      rgba(255,255,255,0.34) 100%
                    )
                  `,
                  border: "1px solid rgba(255,255,255,0.34)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 18px rgba(15,23,42,0.04)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: "#2f241d",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9a7757",
                    }}
                  >
                    Personalize your
                    interface
                  </div>
                </div>

                <Toggle
                  on={
                    state[
                      item.key as keyof typeof state
                    ]
                  }
                  onToggle={() =>
                    toggle(item.key)
                  }
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}



function AdminFeatureCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 16px 30px rgba(249,115,22,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 8px 18px rgba(15,23,42,0.04)";
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.42) 100%)",
        border: "1px solid rgba(255,255,255,0.42)",
        borderRadius: 24,
        padding: "18px 18px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 18px rgba(15,23,42,0.04)",
        transition: "all 0.28s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.08)",
          filter: "blur(30px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#9a7757",
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1f1f1f",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}



function AdminFeatures({admin,}: {admin: AdminProfileFeatures;}) {
  return (
    <div
      style={{
        ...card,
        marginBottom: 22,
        background: "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.50) 100%)",
        border: "1px solid rgba(255,255,255,0.40)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 18px 40px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionHeader
          icon={
            <Settings
              size={20}
              color="#ffffff"
              strokeWidth={2.5}
            />
          }
          title="Admin controls"
          subtitle="Platform analytics & monitoring"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <AdminFeatureCard
            label="TOTAL USERS"
            value={admin.totalUsers}
          />

          <AdminFeatureCard
            label="ACTIVE USERS"
            value={admin.activeUsers}
          />

          <AdminFeatureCard
            label="BLOCKED USERS"
            value={admin.blockedUsers}
          />

          <AdminFeatureCard
            label="QUIZZES"
            value={admin.totalQuizzes}
          />

          <AdminFeatureCard
            label="FEEDBACK"
            value={admin.feedbackCount}
          />
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#1f1f1f",
            marginBottom: 14,
          }}
        >
          Recent users
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {admin.recentUsers.map(
            (user) => (
              <div
                key={user.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 22,
                  transition: "all 0.25s ease",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.64) 0%, rgba(255,255,255,0.38) 100%)",
                  border: "1px solid rgba(255,255,255,0.34)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 18px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 800,
                      fontSize: 14,
                      boxShadow: "0 10px 22px rgba(249,115,22,0.18)",
                      flexShrink: 0,
                    }}
                  >
                    {user.name
                      .split(" ")
                      .map(
                        (part) =>
                          part[0],
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 700,
                        color: "#2f241d",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: 4,
                      }}
                    >
                      {user.name}
                    </div>

                    <div
                      style={{
                        fontSize: 12.5,
                        color: "#9a7757",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px 10px",
                      borderRadius: 999,
                      background:
                        user.role ===
                        "ADMIN"
                          ? "rgba(239,68,68,0.10)"
                          : "rgba(249,115,22,0.10)",
                      color:
                        user.role ===
                        "ADMIN"
                          ? "#dc2626"
                          : "#ea580c",
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {user.role}
                  </div>

                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#9a7757",
                      fontWeight: 600,
                    }}
                  >
                    {user.joined}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}



function ProgressBar({
  value,
}: {
  value: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "rgba(251,146,60,0.12)",
        borderRadius: 999,
        height: 10,
        border: "1px solid rgba(249,115,22,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div
        style={{
          height: "100%",
          borderRadius: 999,
          background: "linear-gradient(90deg, #f97316 0%, #fb923c 45%, #fdba74 100%)",
          width: `${value}%`,
          transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 18px rgba(249,115,22,0.28)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(255,255,255,0.32), transparent)",
          }}
        />
      </div>
    </div>
  );
}



function ProgressGraph({data, profile,}: {data: ProgressGraphData; profile: ProfileUser;}) {
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    score: number;
    month: string;
  } | null>(null);

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const fallbackMonths = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (6 - index));
    return new Intl.DateTimeFormat("en", {month: "short",}).format(date);
  });

  const hasData =
    data.months.length > 0 &&
    data.scores.length > 0;

  const months = hasData
    ? data.months
    : fallbackMonths;

  const scores = hasData
    ? data.scores
    : [0, 0, 0, 0, 0, 0, 0];

  const W = 720;
  const H = 320;

  const PL = 52;
  const PR = 22;
  const PT = 26;
  const PB = 50;

  const xs = months.map(
    (_, i) =>
      PL +
      (i * (W - PL - PR)) /
        (months.length - 1),
  );

  const ys = scores.map(
    (s) =>
      PT +
      (H - PT - PB) *
        (1 - s / 100),
  );

  const pathD =
    `M ${xs[0]} ${ys[0]} ` +
    xs
      .slice(1)
      .map(
        (x, i) =>
          `L ${x} ${ys[i + 1]}`,
      )
      .join(" ");

  const areaD = `
    ${pathD}
    L ${xs[xs.length - 1]} ${H - PB}
    L ${xs[0]} ${H - PB}
    Z
  `;

  const avgScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (a, b) => a + b,
            0,
          ) / scores.length,
        )
      : 0;

  return (
    <div
      style={{
        ...card,

        position: "relative",
        marginBottom: 22,
        padding: 30,
        borderRadius: 34,
        overflow: "hidden",
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.72) 0%,
            rgba(255,255,255,0.46) 100%
          )
        `,
        border: "1px solid rgba(255,255,255,0.40)",
        backdropFilter: "blur(24px)",
        boxShadow: `
          0 25px 50px rgba(15,23,42,0.08),
          0 10px 24px rgba(249,115,22,0.05),
          inset 0 1px 0 rgba(255,255,255,0.65)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.12)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -100,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(251,146,60,0.08)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: `
                linear-gradient(
                  135deg,
                  #f97316 0%,
                  #fb923c 45%,
                  #fdba74 100%
                )
              `,
              boxShadow: `
                0 16px 30px rgba(249,115,22,0.25),
                inset 0 1px 2px rgba(255,255,255,0.28)
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              flexShrink: 0,
            }}
          >
            <TrendingUp
              size={24}
              strokeWidth={2.5}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#1f1f1f",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              Progress Timeline
            </div>

            <div
              style={{
                fontSize: 14,
                color: "#8f7d69",
                fontWeight: 500,
              }}
            >
              Your learning curve
              over the last{" "}
              {
                profile.accountAgeText
              }
            </div>
          </div>
        </div>
        
        {!hasData && (
          <div
            style={{
              marginBottom: 22,
              border: "1.5px dashed rgba(224,201,171,0.75)",
              borderRadius: 22,
              padding: "16px 18px",
              textAlign: "center",
              background: `
                linear-gradient(
                  135deg,
                  rgba(255,248,241,0.82) 0%,
                  rgba(255,255,255,0.42) 100%
                )
              `,
              backdropFilter: "blur(12px)",
              color: "#b08968",
              fontSize: 13.5,
              fontWeight: 700,
            }}
          >
            No learning activity
            found yet
          </div>
        )}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            marginBottom: 26,
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#f97316"
                stopOpacity="0.28"
              />

              <stop
                offset="100%"
                stopColor="#f97316"
                stopOpacity="0.02"
              />
            </linearGradient>
          </defs>
          
          {[0, 25, 50, 75, 100].map(
            (value) => {
              const y =
                PT +
                (H - PT - PB) *
                  (1 -
                    value / 100);

              return (
                <g key={value}>
                  <line
                    x1={PL}
                    y1={y}
                    x2={W - PR}
                    y2={y}
                    stroke="rgba(176,136,104,0.22)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />

                  <text
                    x={PL - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#9a7757"
                    fontWeight="600"
                  >
                    {value}
                  </text>
                </g>
              );
            },
          )}

          <path
            d={areaD}
            fill="url(#areaGradient)"
          />

          <path
            d={pathD}
            fill="none"
            stroke="#f97316"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 10px rgba(249,115,22,0.28))",
            }}
          />

          {xs.map((x, i) => {
            const nextX = xs[i + 1] || x + 40;
            const hoverWidth = nextX - x;

            return (
              <g key={i}>
                <rect
                  x={
                    x -
                    hoverWidth / 2
                  }
                  y={PT}
                  width={hoverWidth}
                  height={H - PT - PB}
                  fill="transparent"
                  onMouseMove={(e) => {
                    const svg =
                      e.currentTarget
                        .ownerSVGElement;

                    if (!svg) return;

                    const rect = svg.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const segmentStart = x;
                    const segmentEnd = xs[i + 1] || x;
                    const currentScore = scores[i];
                    const nextScore = scores[i + 1] ?? scores[i];
                    const progress =
                      Math.min(
                        1,
                        Math.max(
                          0,
                          (mouseX -
                            segmentStart) /
                            (segmentEnd -
                              segmentStart),
                        ),
                      );

                    const interpolatedScore =
                      Math.round(
                        currentScore +
                          (nextScore -
                            currentScore) *
                            progress,
                      );

                    const interpolatedY = PT + (H - PT - PB) * (1 -interpolatedScore / 100);
                    setHoverData({
                      x: mouseX,
                      y: interpolatedY,
                      score:
                        interpolatedScore,
                      month:
                        months[i],
                    });
                    setHoveredIndex(i);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null, );
                    setHoverData(null, );
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />

                <circle
                  cx={x}
                  cy={ys[i]}
                  r={hoveredIndex === i ? 18 : 0}
                  fill="rgba(249,115,22,0.14)"
                  style={{transition: "all 0.25s ease",}}
                />

                <circle
                  cx={x}
                  cy={ys[i]}
                  r={hoveredIndex === i ? 10 : 5}
                  fill="#f97316"
                  opacity={hoveredIndex === i ? 0.28 : 1}
                  style={{transition: "all 0.25s ease",}}
                />

                <circle
                  cx={x}
                  cy={ys[i]}
                  r ={hoveredIndex === i ? 7 : 5}
                  fill="#ffffff"
                  stroke="#f97316"
                  strokeWidth="3.5"
                  style={{transition: "all 0.25s ease", filter: hoveredIndex === i ? "drop-shadow(0 0 16px rgba(249,115,22,0.75))" : "none",}}
                />

                {hoverData &&
                  hoveredIndex ===
                    i && (
                    <g>
                      <foreignObject
                        x={
                          hoverData.x -
                          62
                        }
                        y={Math.max(
                          PT + 10,
                          hoverData.y -
                            118,
                        )}
                        width={124}
                        height={104}
                        style={{
                          overflow: "visible",
                          pointerEvents: "none",
                        }}
                      >
                        <div
                          style={{
                            width: 120,
                            height: 98,
                            borderRadius: 24,
                            background: `
                              linear-gradient(
                                135deg,
                                rgba(255,255,255,0.72) 0%,
                                rgba(255,255,255,0.48) 100%
                              )
                            `,
                            border: "1px solid rgba(255,255,255,0.45)",
                            backdropFilter: "blur(18px)",
                            boxShadow: `
                              0 18px 35px rgba(15,23,42,0.10),
                              0 8px 18px rgba(249,115,22,0.08)
                            `,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: -30,
                              right: -20,
                              width: 90,
                              height: 90,
                              borderRadius: "50%",
                              background: "rgba(249,115,22,0.10)",
                              filter: "blur(20px)",
                            }}
                          />

                          <div
                            style={{
                              position: "relative",
                              zIndex: 2,
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#7b6856",
                              marginBottom: 10,
                            }}
                          >
                            {months[i]}
                          </div>

                          <div
                            style={{
                              position: "relative",
                              zIndex: 2,
                              fontSize: 28,
                              fontWeight: 800,
                              lineHeight: 1,
                              color: "#1f1f1f",
                              marginBottom: 6,
                            }}
                          >
                            {hoverData.score}
                          </div>

                          <div
                            style={{
                              position: "relative",
                              zIndex: 2,
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#f97316",
                              letterSpacing: "0.08em",
                            }}
                          >
                            SCORE
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  )}

                <text
                  x={x}
                  y={H - PB + 24}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#7b6856"
                  fontWeight="600"
                >
                  {months[i]}
                </text>
              </g>
            );
          })}

          <line
            x1={PL}
            y1={PT}
            x2={PL}
            y2={H - PB}
            stroke="rgba(31,31,31,0.8)"
            strokeWidth="1.5"
          />

          <line
            x1={PL}
            y1={H - PB}
            x2={W - PR}
            y2={H - PB}
            stroke="rgba(31,31,31,0.8)"
            strokeWidth="1.5"
          />
        </svg>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {[
            {
              label: "Avg score",
              value: `${avgScore}%`,
            },

            {
              label: "Quizzes taken",
              value: scores.length,
            },

            {
              label: "Hours learned",
              value: Math.max(0, Math.round( scores.reduce((a, b) => a + b, 0,) / 12,),),
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "18px 16px",
                borderRadius: 24,
                background: `
                  linear-gradient(
                    135deg,
                    rgba(255,255,255,0.68) 0%,
                    rgba(255,255,255,0.42) 100%
                  )
                `,
                border: "1px solid rgba(255,255,255,0.38)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -35,
                  right: -25,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "rgba(249,115,22,0.08)",
                  filter: "blur(22px)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#8f7d69",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#1f1f1f",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



function YourJourney({
  milestones,
  quizProgress,
}: {
  milestones: JourneyMilestone[];
  quizProgress: QuizProgress[];
}) {
  const [tab, setTab] = useState<"milestones" | "quiz">("milestones");

  return (
    <div
      style={{
        ...card,
        marginBottom: 18,
      }}
    >
      <SectionHeader
        icon={<Route size={20} />}
        title="Your journey"
        subtitle="Track your learning"
      />

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 22,
        }}
      >
        <button
          onClick={() => setTab("milestones")}
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
            background:
              tab === "milestones"
                ? "linear-gradient(135deg,#f97316 0%,#fb923c 100%)"
                : "rgba(255,255,255,0.55)",
            color: tab === "milestones" ? "#fff" : "#5b4636",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            boxShadow:
              tab === "milestones"
                ? "0 10px 24px rgba(249,115,22,0.24)"
                : "0 4px 12px rgba(15,23,42,0.05)",
            transition: "all 0.22s ease",
          }}
        >
          Milestones
        </button>

        <button
          onClick={() => setTab("quiz")}
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
            background:
              tab === "quiz"
                ? "linear-gradient(135deg,#f97316 0%,#fb923c 100%)"
                : "rgba(255,255,255,0.55)",
            color: tab === "quiz" ? "#fff" : "#5b4636",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            boxShadow:
              tab === "quiz"
                ? "0 10px 24px rgba(249,115,22,0.24)"
                : "0 4px 12px rgba(15,23,42,0.05)",
            transition: "all 0.22s ease",
          }}
        >
          Quiz Progress
        </button>
      </div>

      {tab === "milestones" && (
        <>
          {milestones.length === 0 ? (
            <div
              style={{
                border: "2px dashed rgba(249,115,22,0.18)",
                borderRadius: 20,
                padding: "34px 20px",
                textAlign: "center",
                background: "rgba(255,248,241,0.72)",
                backdropFilter: "blur(14px)",
                color: "#b08968",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              No User Activity Found
            </div>
          ) : (
            milestones.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "18px",
                  background: "rgba(255,255,255,0.52)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: 22,
                  marginBottom: 12,
                  boxShadow: `
                    0 10px 30px rgba(15,23,42,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.6)
                  `,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#2b2b2b",
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      background: "linear-gradient(135deg,#fff1df 0%,#fde4c1 100%)",
                      color: "#d4620a",
                      padding: "5px 12px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 800,
                      border: "1px solid rgba(249,115,22,0.14)",
                    }}
                  >
                    +{item.pts} pts
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#8a7767",
                    lineHeight: 1.6,
                    marginBottom: !item.unlocked ? 12 : 0,
                  }}
                >
                  {item.desc}
                </div>

                {!item.unlocked && (
                  <>
                    <ProgressBar value={item.progress || 0} />

                    <div
                      style={{
                        fontSize: 12,
                        color: "#a28c7b",
                        marginTop: 7,
                        fontWeight: 600,
                      }}
                    >
                      {item.progress}% to unlock
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </>
      )}

      {tab === "quiz" && (
        <>
          {quizProgress.length === 0 ? (
            <div
              style={{
                border: "2px dashed rgba(249,115,22,0.18)",
                borderRadius: 20,
                padding: "34px 20px",
                textAlign: "center",
                background: "rgba(255,248,241,0.72)",
                backdropFilter: "blur(14px)",
                color: "#b08968",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              No User Activity Found
            </div>
          ) : (
            quizProgress.map((quiz, i) => (
              <div
                key={i}
                style={{
                  padding: "18px",
                  background: "rgba(255,255,255,0.52)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: 22,
                  marginBottom: 12,
                  boxShadow: `
                    0 10px 30px rgba(15,23,42,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.6)
                  `,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#2b2b2b",
                    }}
                  >
                    {quiz.title}
                  </div>

                  <div
                    style={{
                      color: "#f97316",
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    {quiz.score}%
                  </div>
                </div>

                <ProgressBar value={quiz.score} />

                <div
                  style={{
                    fontSize: 12,
                    color: "#a28c7b",
                    marginTop: 8,
                    fontWeight: 600,
                  }}
                >
                  {quiz.done}/{quiz.total} quizzes completed
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}



export default function SamvidhanDashboard({view = "user",}: {view?: ProfileView;}) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [activities, setActivities] = useState<ProfileActivity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [adminFeatures, setAdminFeatures] = useState<AdminProfileFeatures | null>(null);

  const createFallbackMonths = () =>
    Array.from({ length: 7 }, (_, index) => {
      const date = new Date();

      date.setMonth(date.getMonth() - (6 - index));

      return new Intl.DateTimeFormat("en", {
        month: "short",
      }).format(date);
    });

  const [progressGraph, setProgressGraph] = useState<ProgressGraphData>({
    months: createFallbackMonths(),
    scores: [0, 0, 0, 0, 0, 0, 0],
  });

  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [quizProgress, setQuizProgress] = useState<QuizProgress[]>([]);
  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const profileData = await fetcher<ProfileDashboard>(
        `/api/auth/profile${view === "admin" ? "?view=admin" : ""}`,
      );
      setProfile(profileData.user);
      setActivities(profileData.activities || []);
      setLeaderboard(profileData.leaderboard || []);
      setProgressGraph(
        profileData.progressGraph || {
          months: createFallbackMonths(),
          scores: [0, 0, 0, 0, 0, 0, 0],
        },
      );
      setMilestones(profileData.milestones || []);
      setQuizProgress(profileData.quizProgress || []);
      setAdminFeatures(profileData.features.admin);
    } catch (error) {
      console.error(error);
      setProfile(null);
      setActivities([]);
      setLeaderboard([]);
      setMilestones([]);
      setQuizProgress([]);
      setAdminFeatures(null);
    } finally {
      setLoading(false);
    }
  }, [view]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#f8f4ee 0%,#f4ede4 45%,#efe7dc 100%)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            padding: "24px 30px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: `
              0 10px 30px rgba(15,23,42,0.08),
              inset 0 1px 0 rgba(255,255,255,0.65)
            `,
            fontSize: 16,
            fontWeight: 700,
            color: "#2b2b2b",
          }}
        >
          Loading Profile Dashboard...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#f8f4ee 0%,#f4ede4 45%,#efe7dc 100%)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            padding: "24px 30px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: `
              0 10px 30px rgba(15,23,42,0.08),
              inset 0 1px 0 rgba(255,255,255,0.65)
            `,
            fontSize: 16,
            fontWeight: 700,
            color: "#dc2626",
          }}
        >
          Unauthorized
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        paddingTop: view === "user" ? 96 : 24,
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(circle at top left, rgba(249,115,22,0.12), transparent 25%),
          radial-gradient(circle at bottom right, rgba(251,146,60,0.10), transparent 30%),
          linear-gradient(135deg,#f8f4ee 0%,#f4ede4 45%,#efe7dc 100%)
        `,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(249,115,22,0.12)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          bottom: -180,
          left: -140,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(251,146,60,0.10)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <ProfileCard
          profile={profile}
          onEditProfile={() => {
            console.log("Edit profile");
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <ProgressGraph data={progressGraph} profile={profile} />
            <YourJourney milestones={milestones} quizProgress={quizProgress}/>
            {view === "admin" && adminFeatures && (<AdminFeatures admin={adminFeatures} />)}
          </div>
          <div>
            <Leaderboard entries={leaderboard} />
            <RecentActivity activities={activities} />
            <Accessibility />
          </div>
        </div>
      </div>
    </div>
  );
}