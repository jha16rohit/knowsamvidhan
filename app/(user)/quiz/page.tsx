"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizLevel {
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  description: string;
  questions: number;
  minutes: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const quizLevels: QuizLevel[] = [
  {
    tag: "Basic",
    tagColor: "#166534",
    tagBg: "#dcfce7",
    title: "Basic level",
    description: "Foundations: Preamble, structure and key articles every citizen should know.",
    questions: 10,
    minutes: "~8 min",
  },
  {
    tag: "Moderate",
    tagColor: "#92400e",
    tagBg: "#fef3c7",
    title: "Moderate level",
    description: "Fundamental Rights, Directive Principles and core amendments in depth.",
    questions: 15,
    minutes: "~15 min",
  },
  {
    tag: "Advanced",
    tagColor: "#1e3a5f",
    tagBg: "#dbeafe",
    title: "Advanced level",
    description: "Landmark cases, constitutional interpretation and complex inter-article links.",
    questions: 20,
    minutes: "~25 min",
  },
];

const features: Feature[] = [
  {
    icon: "🔄",
    title: "Adaptive",
    description: "Questions adjust to your weak topics.",
  },
  {
    icon: "⏱",
    title: "Timed practice",
    description: "Mock real exam pacing if you wish.",
  },
  {
    icon: "📄",
    title: "Explained answers",
    description: "Every answer cites the article.",
  },
];

// ─── Quiz Card ────────────────────────────────────────────────────────────────

function QuizCard({ level, index }: { level: QuizLevel; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: hovered ? "1.5px solid #c48232" : "1px solid #ede8df",
        borderRadius: 16,
        padding: "28px 24px",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.12)" : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
      }}
    >
      {/* Tag */}
      <span
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          background: level.tagBg,
          color: level.tagColor,
          borderRadius: 20,
          padding: "3px 12px",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          border: `1px solid ${level.tagColor}22`,
        }}
      >
        {level.tag}
      </span>

      {/* Title */}
      <div style={{ fontWeight: 800, fontSize: 22, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.1 }}>
        {level.title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", flex: 1 }}>
        {level.description}
      </div>

      {/* Meta: questions + time */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9e8c73", fontFamily: "system-ui, sans-serif" }}>
          <span>📋</span>
          <span>{level.questions} questions</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9e8c73", fontFamily: "system-ui, sans-serif" }}>
          <span>⏱</span>
          <span>{level.minutes}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        style={{
          background: "#c48232",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px 20px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          transition: "background 0.15s",
          marginTop: 4,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#a86a28")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#c48232")}
      >
        Start quiz →
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function QuizPage() {
  return (
    <>
    < Navbar />
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

      {/* ── Hero Header ── */}
      <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 48px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Practice</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#1a1208", margin: "0 0 12px", lineHeight: 1.15, fontFamily: "'Georgia', serif" }}>
            Quiz yourself. Master the Constitution.
          </h1>
          <p style={{ fontSize: 15, color: "#7a6a50", margin: 0, lineHeight: 1.6 }}>
            Three levels with instant feedback, explanations and progress tracking.
          </p>
        </div>
      </section>

      {/* ── Quiz Cards ── */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "44px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
          {quizLevels.map((level, i) => (
            <QuizCard key={level.tag} level={level} index={i} />
          ))}
        </div>

        {/* Features strip */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ede8df",
            borderRadius: 16,
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {features.map((f) => (
            <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#fdf3e3",
                  border: "1px solid #e8d4a0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1208", marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#7a6a50", lineHeight: 1.5 }}>{f.description}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      < FooterSection/>
    </div>
    </>
  );
}