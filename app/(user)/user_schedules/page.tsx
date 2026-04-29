"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Schedule {
  ordinal: string;
  ordinalNum: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const schedules: Schedule[] = [
  {
    ordinal: "1st",
    ordinalNum: "FIRST SCHEDULE",
    label: "1st",
    title: "States and Union Territories",
    description: "Lists the States and Union Territories of the Indian Union and their territorial jurisdictions.",
    tags: ["States", "Union Territories", "Territory"],
  },
  {
    ordinal: "2nd",
    ordinalNum: "SECOND SCHEDULE",
    label: "2nd",
    title: "Salaries and Allowances",
    description: "Provisions for the salaries, allowances and emoluments of the President, Governors, Speakers, Judges and the CAG.",
    tags: ["President", "Governor", "Judges", "CAG"],
  },
  {
    ordinal: "3rd",
    ordinalNum: "THIRD SCHEDULE",
    label: "3rd",
    title: "Forms of Oaths and Affirmations",
    description: "Standardised oaths for Ministers, Members of Parliament, Judges and the CAG.",
    tags: ["Oaths", "Constitutional Officers"],
  },
  {
    ordinal: "4th",
    ordinalNum: "FOURTH SCHEDULE",
    label: "4th",
    title: "Allocation of Rajya Sabha Seats",
    description: "Allocation of seats in the Council of States to each State and Union Territory.",
    tags: ["Rajya Sabha", "Federalism"],
  },
  {
    ordinal: "5th",
    ordinalNum: "FIFTH SCHEDULE",
    label: "5th",
    title: "Scheduled Areas and Tribes",
    description: "Provisions for administration and control of Scheduled Areas and Scheduled Tribes outside the North-East.",
    tags: ["Tribal Areas", "Administration"],
  },
  {
    ordinal: "6th",
    ordinalNum: "SIXTH SCHEDULE",
    label: "6th",
    title: "Tribal Areas of the North-East",
    description: "Special provisions for administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram via Autonomous District Councils.",
    tags: ["North-East", "Autonomy"],
  },
  {
    ordinal: "7th",
    ordinalNum: "SEVENTH SCHEDULE",
    label: "7th",
    title: "Union, State and Concurrent Lists",
    description: "Distributes legislative powers between the Union and States across three lists of subjects.",
    tags: ["Federalism", "Lists", "Powers"],
  },
  {
    ordinal: "8th",
    ordinalNum: "EIGHTH SCHEDULE",
    label: "8th",
    title: "Recognised Languages",
    description: "Lists the 22 official languages recognised by the Constitution of India.",
    tags: ["Languages", "Culture"],
  },
  {
    ordinal: "9th",
    ordinalNum: "NINTH SCHEDULE",
    label: "9th",
    title: "Validation of Land Reform Laws",
    description: "Added by the 1st Amendment — laws placed here are protected from judicial review on fundamental rights grounds (subject to basic structure).",
    tags: ["Land Reform", "Judicial Review"],
  },
  {
    ordinal: "10th",
    ordinalNum: "TENTH SCHEDULE",
    label: "10th",
    title: "Anti-Defection Law",
    description: "Provisions for disqualification of legislators on grounds of defection from their political party.",
    tags: ["Anti-Defection", "Politics"],
  },
  {
    ordinal: "11th",
    ordinalNum: "ELEVENTH SCHEDULE",
    label: "11th",
    title: "Powers of Panchayats",
    description: "29 subjects on which State Legislatures may devolve powers to Panchayats (added by 73rd Amendment).",
    tags: ["Panchayats", "Local Government"],
  },
  {
    ordinal: "12th",
    ordinalNum: "TWELFTH SCHEDULE",
    label: "12th",
    title: "Powers of Municipalities",
    description: "18 subjects on which Municipalities may exercise powers (added by 74th Amendment).",
    tags: ["Municipalities", "Urban Government"],
  },
];

// ─── Schedule Card ────────────────────────────────────────────────────────────

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #ede8df",
        borderRadius: 16,
        padding: "24px 22px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 0,
        position: "relative" as const,
      }}
    >
      {/* Ordinal badge — top right */}
      <div
        style={{
          position: "absolute" as const,
          top: 18,
          right: 18,
          background: "#fdf3e3",
          border: "1px solid #e8d4a0",
          borderRadius: 20,
          padding: "2px 10px",
          fontSize: 11,
          fontWeight: 700,
          color: "#c48232",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {schedule.label}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "#e8f5f0",
          border: "1px solid #b2ddd0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 18,
        }}
      >
        📋
      </div>

      {/* Schedule label */}
      <div style={{ fontSize: 10, fontWeight: 700, color: "#c48232", letterSpacing: 1.2, textTransform: "uppercase" as const, marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
        {schedule.ordinalNum}
      </div>

      {/* Title */}
      <div style={{ fontWeight: 800, fontSize: 18, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.2, marginBottom: 10 }}>
        {schedule.title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", marginBottom: 16, flex: 1 }}>
        {schedule.description}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
        {schedule.tags.map((tag) => (
          <span
            key={tag}
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
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SchedulesPage() {
  return (
    <>
    <Navbar />
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

      {/* ── Hero Header ── */}
      <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Reference</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1208", margin: "0 0 16px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
            Schedules of the Constitution
          </h1>
          <p style={{ fontSize: 15, color: "#7a6a50", margin: 0, lineHeight: 1.65, maxWidth: 560 }}>
            The Schedules contain detailed lists, forms and tables that supplement the Articles — from the names
            of States to the languages of India and the anti-defection law.
          </p>
        </div>
      </section>

      {/* ── Schedules Grid ── */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "44px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {schedules.map((s) => (
            <ScheduleCard key={s.ordinal} schedule={s} />
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
    </>
  );
}