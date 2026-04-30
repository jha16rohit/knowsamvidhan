"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Part {
  number: string;
  title: string;
  articles: string;
  description: string;
  articleCount: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const parts: Part[] = [
  {
    number: "PART I",
    title: "The Union and its Territory",
    articles: "Articles 1 – 4",
    description: "Defines India as a Union of States and provides for admission, formation and alteration of States.",
    articleCount: 1,
  },
  {
    number: "PART II",
    title: "Citizenship",
    articles: "Articles 5 – 11",
    description: "Lays down who is a citizen of India at the commencement of the Constitution and Parliament's power to regulate citizenship.",
    articleCount: 1,
  },
  {
    number: "PART III",
    title: "Fundamental Rights",
    articles: "Articles 12 – 35",
    description: "The cornerstone of individual liberty — equality, freedom, life, religion and constitutional remedies.",
    articleCount: 5,
  },
  {
    number: "PART IV",
    title: "Directive Principles of State Policy",
    articles: "Articles 36 – 51",
    description: "Non-justiciable guidelines for the State to build a just social and economic order.",
    articleCount: 1,
  },
  {
    number: "PART IV-A",
    title: "Fundamental Duties",
    articles: "Article 51A",
    description: "Eleven moral duties of every Indian citizen, added by the 42nd Amendment.",
    articleCount: 1,
  },
  {
    number: "PART V",
    title: "The Union",
    articles: "Articles 52 – 151",
    description: "Structure of the Union government — President, Parliament, Supreme Court and the CAG.",
    articleCount: 0,
  },
  {
    number: "PART VI",
    title: "The States",
    articles: "Articles 152 – 237",
    description: "Governance of States — Governor, State Legislature and High Courts.",
    articleCount: 0,
  },
];

// ─── Part Card ────────────────────────────────────────────────────────────────

function PartCard({ part }: { part: Part }) {
  const [hovered, setHovered] = useState(false);

  return (
    
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #ede8df",
        borderRadius: 16,
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 8px 28px rgba(196,130,50,0.12)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 0,
        position: "relative" as const,
      }}
    >
      {/* Article count badge — top right */}
      <div
        style={{
          position: "absolute" as const,
          top: 20,
          right: 20,
          background: "#fdf3e3",
          border: "1px solid #e8d4a0",
          borderRadius: 20,
          padding: "3px 10px",
          fontSize: 11,
          fontWeight: 600,
          color: "#c48232",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {part.articleCount} articles
      </div>

      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "#fdf3e3",
          border: "1px solid #e8d4a0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 20,
          flexShrink: 0,
        }}
      >
        📖
      </div>

      {/* Part number */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#c48232",
          letterSpacing: 0.8,
          textTransform: "uppercase" as const,
          marginBottom: 4,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {part.number}
      </div>

      {/* Title */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 20,
          color: "#1a1208",
          lineHeight: 1.2,
          marginBottom: 6,
          fontFamily: "'Georgia', serif",
        }}
      >
        {part.title}
      </div>

      {/* Articles range */}
      <div
        style={{
          fontSize: 13,
          color: "#9e8c73",
          fontWeight: 500,
          marginBottom: 12,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {part.articles}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 13,
          color: "#7a6a50",
          lineHeight: 1.6,
          marginBottom: 20,
          flex: 1,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {part.description}
      </div>

      {/* Explore link */}
      <div
        style={{
          fontSize: 13,
          color: "#c48232",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "system-ui, sans-serif",
          marginTop: "auto",
        }}
      >
        Explore Part →
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PartsPage() {
  return (
    <>
    < Navbar />
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#faf7f2",
        minHeight: "100vh",
        color: "#1a1208",
        paddingTop: 64,
      }}
    >
      {/* ── Hero Header ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)",
          borderBottom: "1px solid #ede8df",
          padding: "56px 48px 52px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Label */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#c48232",
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              marginBottom: 14,
            }}
          >
            Chapters
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#1a1208",
              margin: "0 0 16px",
              lineHeight: 1.1,
              fontFamily: "'Georgia', serif",
            }}
          >
            Browse the Constitution by Part
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: 15,
              color: "#7a6a50",
              margin: 0,
              lineHeight: 1.65,
              maxWidth: 480,
            }}
          >
            The Constitution is organised into Parts. Each Part groups related Articles into a single
            chapter — start with whichever interests you.
          </p>
        </div>
      </section>

      {/* ── Parts Grid ── */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {parts.map((part) => (
            <PartCard key={part.number} part={part} />
          ))}
        </div>
      </main>
    </div>
    <FooterSection />
    </>
  );
}