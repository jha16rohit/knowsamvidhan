"use client";

import { useState } from "react";
import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
}

interface Amendment {
  year: string;
  number: string;
  title: string;
  description: string;
  whyMatters: string;
  relatedArticles: string[];
  era: string;
  color: string;
}

// ─── Article Data ─────────────────────────────────────────────────────────────

const articleData: Record<string, Article> = {
  "article-15": {
    id: "article-15",
    number: "Article 15",
    title: "Prohibition of Discrimination",
    category: "Fundamental Rights",
    description:
      "Prohibits discrimination on grounds of religion, race, caste, sex or place of birth.",
  },
  "article-19": {
    id: "article-19",
    number: "Article 19",
    title: "Six Freedoms",
    category: "Fundamental Rights",
    description:
      "Guarantees six fundamental freedoms including speech, assembly and movement.",
  },
  "article-21": {
    id: "article-21",
    number: "Article 21",
    title: "Right to Life",
    category: "Fundamental Rights",
    description:
      "No person shall be deprived of their life or personal liberty except by procedure established by law.",
  },
  "article-51a": {
    id: "article-51a",
    number: "Article 51A",
    title: "Fundamental Duties",
    category: "Fundamental Duties",
    description:
      "Lists eleven duties of every citizen of India towards the nation and its people.",
  },
};

// ─── Amendment Data ───────────────────────────────────────────────────────────

const amendments: Amendment[] = [
  {
    year: "1951",
    number: "1st",
    title: "First Amendment",
    description:
      "Added the Ninth Schedule to protect land reform laws and modified Articles 15 and 19.",
    whyMatters:
      "Set early limits on free speech and enabled state-led social reform.",
    relatedArticles: ["article-15", "article-19"],
    era: "Post-Independence",
    color: "#b85c38",
  },
  {
    year: "1976",
    number: "42nd",
    title: "Mini-Constitution",
    description:
      "Added Socialist, Secular and Integrity to the Preamble; introduced Fundamental Duties.",
    whyMatters:
      "The most extensive amendment in Indian history, expanding state power during the Emergency.",
    relatedArticles: ["article-21", "article-51a"],
    era: "Emergency Era",
    color: "#6b4c9a",
  },
  {
    year: "1978",
    number: "44th",
    title: "Restoration of Rights",
    description:
      "Reversed many of the 42nd Amendment changes; right to property removed from Fundamental Rights.",
    whyMatters:
      "Strengthened safeguards for civil liberties after the Emergency.",
    relatedArticles: ["article-19", "article-21"],
    era: "Post-Emergency",
    color: "#2d7d6f",
  },
  {
    year: "1992",
    number: "73rd",
    title: "Panchayati Raj",
    description:
      "Constitutional status to Panchayats; created a three-tier system of local self-government.",
    whyMatters: "Decentralised democracy and empowered rural governance.",
    relatedArticles: [],
    era: "Liberalisation",
    color: "#4a7c3f",
  },
  {
    year: "2002",
    number: "86th",
    title: "Right to Education",
    description:
      "Made elementary education a fundamental right under Article 21A.",
    whyMatters:
      "Cornerstone of universal schooling for children aged 6 to 14.",
    relatedArticles: ["article-21"],
    era: "Modern Era",
    color: "#c48232",
  },
  {
    year: "2016",
    number: "101st",
    title: "Goods and Services Tax",
    description:
      "Introduced GST, replacing a web of indirect taxes with a unified national tax.",
    whyMatters: "Reshaped India's economic and federal tax architecture.",
    relatedArticles: [],
    era: "Digital Era",
    color: "#1a6b99",
  },
  {
    year: "2019",
    number: "103rd",
    title: "EWS Reservation",
    description:
      "10% reservation in education and employment for Economically Weaker Sections.",
    whyMatters:
      "Extended affirmative action beyond traditional caste-based criteria.",
    relatedArticles: ["article-15"],
    era: "Digital Era",
    color: "#8b4a6b",
  },
];

// ─── Amendment Detail Page ────────────────────────────────────────────────────

function AmendmentDetail({
  amendment,
  onBack,
}: {
  amendment: Amendment;
  onBack: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const otherAmendments = amendments.filter((a) => a.number !== amendment.number);

  return (
    <div className="bg-[#faf7f2] min-h-screen font-sans">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden border-b border-[#ddd5c0] px-6 pt-12 pb-14 md:px-12 lg:px-16"
        style={{ background: "linear-gradient(160deg,#f5f0e8 0%,#ede4d0 50%,#e8dfc8 100%)" }}
      >
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(196,130,50,.08) 0%,transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(196,130,50,.06) 0%,transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto">

          {/* Back */}
          <button
            onClick={onBack}
            className="mb-7 flex items-center gap-2 bg-transparent border-0 text-[#c48232] text-[13px] font-semibold cursor-pointer p-0 transition-all duration-200 hover:gap-3"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to timeline
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
              style={{ background: "rgba(196,130,50,.12)", color: "#c48232" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {amendment.year}
            </span>
            <span className="text-[#c9b89a] text-sm">/</span>
            <span className="text-[#c48232] text-[13px] font-bold">{amendment.number} Amendment</span>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold text-[#1a1208] leading-[1.1] tracking-tight mb-4 font-serif">
            {amendment.title}
          </h1>

         

          
        </div>
      </section>

      {/* ── Body: scrollable left + sticky right ── */}
      <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-10 flex flex-col lg:flex-row gap-8 items-start">

        {/* Left — independently scrollable */}
<div className="flex-1 min-w-0 space-y-5 pr-0 lg:pr-1">
          {/* Why it matters */}
          <div className="bg-white border border-[#ede8df] rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
              Why it matters
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#1a1208] leading-snug font-serif">
              {amendment.whyMatters}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white border border-[#ede8df] rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Summary
            </div>
            <h2 className="text-xl font-extrabold text-[#1a1208] mb-3 font-serif">
              What this amendment did
            </h2>
            <p className="text-[15px] text-[#6b5a3e] leading-relaxed">{amendment.description}</p>
          </div>

          {/* Related Articles */}
          {amendment.relatedArticles.length > 0 && (
            <div className="bg-white border border-[#ede8df] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 015.656 0" />
                </svg>
                Related Articles
              </div>
              <h2 className="text-xl font-extrabold text-[#1a1208] mb-5 font-serif">
                Articles affected
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amendment.relatedArticles.map((articleId) => {
                  const article = articleData[articleId];
                  if (!article) return null;
                  return (
                    <div
                      key={articleId}
                      className="group bg-[#faf7f2] border border-[#ede8df] rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#c48232] hover:shadow-[0_4px_16px_rgba(196,130,50,.10)]"
                    >
                      <span
                        className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold tracking-[0.10em] uppercase mb-3"
                        style={{ background: "rgba(196,130,50,.12)", color: "#c48232" }}
                      >
                        {article.category}
                      </span>
                      <div className="text-[11px] font-bold text-[#c48232] tracking-[0.08em] uppercase mb-1">
                        {article.number}
                      </div>
                      <h3 className="text-[16px] font-extrabold text-[#1a1208] mb-2 leading-snug font-serif">
                        {article.title}
                      </h3>
                      <p className="text-[13px] text-[#7a6a50] leading-relaxed mb-4">
                        {article.description}
                      </p>
                      <span className="text-[13px] font-semibold text-[#c48232]">
                        Read article →
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right — sticky sidebar */}
        <div className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 lg:sticky lg:top-6">
          <div className="bg-white border border-[#ede8df] rounded-2xl p-6">
            <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232] mb-4">
              Other Amendments
            </div>
            <div className="space-y-0.5">
              {otherAmendments.map((a) => (
                <div
                  key={a.number}
                  className="flex flex-col rounded-xl px-3 py-3 cursor-pointer transition-colors duration-150 hover:bg-[#faf7f2]"
                >
                  <span className="text-[13px] font-extrabold text-[#1a1208] leading-tight">
                    {a.number} · {a.year}
                  </span>
                  <span className="text-[12px] text-[#9a8a70] mt-0.5">{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Timeline Card ────────────────────────────────────────────────────────────

function AmendmentCard({
  amendment,
  onClick,
}: {
  amendment: Amendment;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full bg-white border border-[#ede8df] rounded-[20px] p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Top accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: amendment.color }}
      />

      {/* Year + era */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide"
          style={{ background: `${amendment.color}1a`, color: amendment.color }}
        >
          {amendment.year}
        </span>
        <span className="text-[11px] font-semibold text-[#b0a090] tracking-wide">
          {amendment.era}
        </span>
      </div>

      {/* Number label */}
      <div
        className="text-[11px] font-bold tracking-[0.08em] uppercase mb-1.5"
        style={{ color: amendment.color }}
      >
        {amendment.number} Amendment
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-extrabold text-[#1a1208] leading-snug tracking-tight mb-3 font-serif">
        {amendment.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-[#7a6a50] leading-relaxed mb-4">
        {amendment.description}
      </p>

      {/* Why it matters box */}
      <div
        className="rounded-xl p-3 mb-4"
        style={{ background: `${amendment.color}0d`, border: `1px solid ${amendment.color}30` }}
      >
        <span
          className="block text-[10px] font-bold tracking-[0.10em] uppercase mb-1"
          style={{ color: amendment.color }}
        >
          Why it matters
        </span>
        <span className="text-[12px] text-[#6b5a3e] leading-relaxed">
          {amendment.whyMatters}
        </span>
      </div>

      {/* Article tags */}
      {amendment.relatedArticles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {amendment.relatedArticles.map((a) => (
            <span
              key={a}
              className="bg-[#f5f3ef] border border-[#e8e2d8] rounded-md px-2.5 py-0.5 text-[10px] font-semibold text-[#8a7a60] tracking-wide"
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div
        className="flex items-center gap-1.5 text-[12px] font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: amendment.color }}
      >
        Read more
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AmendmentsPage() {
  const [selected, setSelected] = useState<Amendment | null>(null);

  if (selected) {
    return (
      <>
        <Navbar />
        <div className="pt-16">
          <AmendmentDetail amendment={selected} onBack={() => setSelected(null)} />
          <FooterSection />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/*
        Two keyframe animations that Tailwind cannot express with arbitrary values alone:
        fadeUp   — staggered card entrance on the timeline
        slideRight — the scroll-hint arrow pulse
      */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }
        .anim-fade-up   { animation: fadeUp    0.5s ease both; }
        .anim-slide-right { animation: slideRight 1.4s ease-in-out infinite; }
      `}</style>

      <div className="bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16 font-sans">

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden border-b border-[#ddd5c0] px-6 py-14 md:px-12 lg:px-16"
          style={{ background: "linear-gradient(150deg,#f5f0e8 0%,#ede4d0 60%,#e4d8c0 100%)" }}
        >
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle,rgba(196,130,50,.10) 0%,transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-1/3 h-52 w-52 rounded-full"
            style={{ background: "radial-gradient(circle,rgba(196,130,50,.06) 0%,transparent 70%)" }}
          />

          <div className="relative max-w-2xl">
            <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#c48232] mb-3">
              Constitutional Timeline
            </p>
            <h1 className="text-[clamp(32px,5vw,52px)] font-black text-[#1a1208] leading-[1.08] tracking-tight mb-4 font-serif">
              How the Constitution has 
              <br></br><span className="text-orange-900">evolved ?</span>
            </h1>
            <p className="text-base text-[#6b5a3e] leading-relaxed max-w-md">
              A chronological journey through the most important amendments — what changed and why it matters for every Indian.
            </p>
          </div>
          
        </section>

        {/* ── Scroll hint ── */}
        <div className="flex items-center gap-2 px-6 md:px-12 lg:px-16 pt-7 text-[12px] font-semibold text-[#b0a090]">
          Scroll horizontally to explore
          <span className="anim-slide-right">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* ── Horizontal timeline ── */}
        <div className="overflow-x-auto overflow-y-hidden py-12 cursor-grab active:cursor-grabbing [scrollbar-width:thin] [scrollbar-color:#ddd5c0_transparent] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:bg-[#ddd5c0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="flex items-start px-6 md:px-12 lg:px-16 w-max">

            {amendments.map((amendment, i) => (
              <div key={amendment.number} className="flex items-start">

                {/* Card column */}
                <div
                  className="anim-fade-up flex flex-col items-center w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* Timeline dot */}
                  <div className="mb-4 flex items-center justify-center">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-[3px] border-white z-10"
                      style={{
                        background: amendment.color,
                        boxShadow: `0 0 0 2px ${amendment.color}`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div className="w-full px-3">
                    <AmendmentCard
                      amendment={amendment}
                      onClick={() => setSelected(amendment)}
                    />
                  </div>
                </div>

                {/* Connector between cards */}
                {i < amendments.length - 1 && (
                  <div className="flex items-center w-10 flex-shrink-0 mt-[42px]">
                    <div
                      className="flex-1 h-[2px]"
                      style={{ background: "linear-gradient(90deg,#ede8df,#ddd5c0)" }}
                    />
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}