"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Amendment {
  year: string;
  number: string;
  title: string;
  description: string;
  whyMatters: string;
  relatedArticles: string[];
  side: "right" | "left";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const amendments: Amendment[] = [
  {
    year: "1951",
    number: "1st Amendment",
    title: "First Amendment",
    description: "Added the Ninth Schedule to protect land reform laws and modified Articles 15 and 19.",
    whyMatters: "Set early limits on free speech and enabled state-led social reform.",
    relatedArticles: ["article-15", "article-19"],
    side: "right",
  },
  {
    year: "1976",
    number: "42nd Amendment",
    title: "The 'Mini-Constitution'",
    description: "Added the words Socialist, Secular and Integrity to the Preamble; introduced Fundamental Duties.",
    whyMatters: "The most extensive amendment in Indian history, expanding state power during the Emergency.",
    relatedArticles: ["article-21", "article-51a"],
    side: "left",
  },
  {
    year: "1978",
    number: "44th Amendment",
    title: "Restoration of Rights",
    description: "Reversed many of the 42nd Amendment's changes; right to property removed from Fundamental Rights.",
    whyMatters: "Strengthened safeguards for civil liberties after the Emergency.",
    relatedArticles: ["article-19", "article-21"],
    side: "right",
  },
  {
    year: "1992",
    number: "73rd Amendment",
    title: "Panchayati Raj",
    description: "Constitutional status to Panchayats; created a three-tier system of local self-government.",
    whyMatters: "Decentralised democracy and empowered rural governance.",
    relatedArticles: [],
    side: "left",
  },
  {
    year: "2002",
    number: "86th Amendment",
    title: "Right to Education",
    description: "Made elementary education a fundamental right under Article 21A.",
    whyMatters: "Cornerstone of universal schooling for children aged 6 to 14.",
    relatedArticles: ["article-21"],
    side: "right",
  },
  {
    year: "2016",
    number: "101st Amendment",
    title: "Goods and Services Tax",
    description: "Introduced GST, replacing a web of indirect taxes with a unified national tax.",
    whyMatters: "Reshaped India's economic and federal tax architecture.",
    relatedArticles: [],
    side: "left",
  },
  {
    year: "2019",
    number: "103rd Amendment",
    title: "EWS Reservation",
    description: "10% reservation in education and employment for Economically Weaker Sections among general category.",
    whyMatters: "Extended affirmative action beyond traditional caste-based criteria.",
    relatedArticles: ["article-15"],
    side: "right",
  },
];

// ─── Amendment Card ───────────────────────────────────────────────────────────

function AmendmentCard({ amendment }: { amendment: Amendment }) {
  const [saved, setSaved] = useState(false);
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
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        width: 280,
      }}
    >
      {/* Year dot */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c48232", display: "inline-block" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#c48232", fontFamily: "system-ui, sans-serif" }}>{amendment.year}</span>
      </div>

      {/* Title */}
      <div style={{ fontWeight: 800, fontSize: 18, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.2, marginBottom: 8 }}>
        {amendment.number} — {amendment.title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>
        {amendment.description}
      </div>

      {/* Why it matters */}
      <div style={{ background: "#fffbf5", border: "1px solid #f5e6c8", borderRadius: 8, padding: "10px 12px", marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#c48232", fontFamily: "system-ui, sans-serif" }}>Why it matters: </span>
        <span style={{ fontSize: 12, color: "#7a6a50", fontFamily: "system-ui, sans-serif" }}>{amendment.whyMatters}</span>
      </div>

      {/* Related article tags */}
      {amendment.relatedArticles.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 14 }}>
          {amendment.relatedArticles.map((a) => (
            <span
              key={a}
              style={{
                background: "#f5f3ef",
                border: "1px solid #ede8df",
                borderRadius: 6,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: "#7a6a50",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setSaved((s) => !s)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            background: saved ? "#fdf3e3" : "#fff",
            border: "1px solid #ede8df",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: saved ? "#c48232" : "#4a3c28",
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
            transition: "all 0.15s",
          }}
        >
          🔖 {saved ? "Saved" : "Save"}
        </button>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            background: "#fff",
            border: "1px solid #ede8df",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#4a3c28",
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          🧩 Add to quiz
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AmendmentsPage() {
  return (
    <>
    <Navbar />
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

      {/* ── Hero Header ── */}
      <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Timeline</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1208", margin: "0 0 14px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
            How the Constitution has evolved
          </h1>
          <p style={{ fontSize: 15, color: "#7a6a50", margin: 0, lineHeight: 1.65, maxWidth: 440 }}>
            A chronological journey through the most important amendments — what changed and why it matters.
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px", position: "relative" as const }}>

        {/* Centre line */}
        <div
          style={{
            position: "absolute" as const,
            top: 60,
            bottom: 80,
            left: "50%",
            width: 2,
            background: "#ede8df",
            transform: "translateX(-50%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 48 }}>
          {amendments.map((amendment, i) => (
            <div
              key={amendment.number}
              style={{
                display: "flex",
                justifyContent: amendment.side === "right" ? "flex-end" : "flex-start",
                position: "relative" as const,
              }}
            >
              {/* Centre dot */}
              <div
                style={{
                  position: "absolute" as const,
                  left: "50%",
                  top: 18,
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#c48232",
                  border: "3px solid #fff",
                  boxShadow: "0 0 0 2px #c48232",
                  zIndex: 2,
                }}
              />
              <AmendmentCard amendment={amendment} />
            </div>
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
    </>
  );
}