"use client";

import { useState, useEffect } from "react";
import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

interface Amendment {
  id: string;
  number: string;
  year: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relatedArticles: string;
  createdAt: string;
  updatedAt: string;
}

const ERA_MAP: Record<string, string> = {
  "1st":   "Post-Independence",
  "42nd":  "Emergency Era",
  "44th":  "Post-Emergency",
  "73rd":  "Liberalisation",
  "86th":  "Modern Era",
  "101st": "Digital Era",
  "103rd": "Digital Era",
};

// 8 alternating accent colors — cycles by card index
const CYCLE_COLORS = [
  "#b85c38", // terracotta
  "#6b4c9a", // purple
  "#2d7d6f", // teal
  "#4a7c3f", // forest green
  "#c48232", // amber
  "#1a6b99", // steel blue
  "#8b4a6b", // mauve
  "#7a3b1e", // dark rust
];

function getColor(index: number): string {
  return CYCLE_COLORS[index % CYCLE_COLORS.length];
}

function getEra(number: string) {
  const n = (number ?? "").trim();
  return ERA_MAP[n] ?? "Modern Era";
}

function slugify(number: string) {
  return (number ?? "").trim().toLowerCase().replace(/\s+/g, "-");
}

function AmendmentCard({
  amendment,
  index,
  onClick,
}: {
  amendment: Amendment;
  index: number;
  onClick: () => void;
}) {
  const color = getColor(index);
  const era = getEra(amendment.number);
  const related = amendment.relatedArticles
    ? amendment.relatedArticles.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      onClick={onClick}
      className="group relative w-full bg-white rounded-[20px] p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: `1.5px solid ${color}40` }}
    >
      {/* Top colour bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: color }}
      />

      {/* Year + Era row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide flex-shrink-0"
          style={{ background: `${color}1a`, color }}
        >
          {amendment.year}
        </span>
      </div>

      {/* Amendment number label */}
      <div
        className="text-[11px] font-bold tracking-[0.08em] uppercase mb-1.5 break-words"
        style={{ color }}
      >
        {amendment.number} Amendment
      </div>

      {/* Title — full text, wraps naturally */}
      <h3
        className="text-[18px] font-extrabold text-[#1a1208] leading-snug tracking-tight mb-3 font-serif break-words"
      >
        {amendment.title}
      </h3>

      {/* Summary — clamped to 3 lines */}
      <p
        className="text-[13px] text-[#7a6a50] leading-relaxed mb-4"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          wordBreak: "break-word",
        }}
      >
        {amendment.summary}
      </p>

      {/* Why it matters — clamped to 2 lines */}
      {amendment.whyItMatters && (
        <div
          className="rounded-xl p-3 mb-4"
          style={{ background: `${color}0d`, border: `1px solid ${color}30` }}
        >
          <span
            className="block text-[10px] font-bold tracking-[0.10em] uppercase mb-1"
            style={{ color }}
          >
            Why it matters
          </span>
          <span
            className="text-[12px] text-[#6b5a3e] leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {amendment.whyItMatters}
          </span>
        </div>
      )}

      {/* Related article tags */}
      {related.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {related.map((a) => (
            <span
              key={a}
              className="rounded-md px-2.5 py-0.5 text-[10px] font-semibold tracking-wide"
              style={{
                background: `${color}12`,
                border: `1px solid ${color}30`,
                color,
                wordBreak: "break-all",
              }}
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Read more */}
      <div
        className="flex items-center gap-1.5 text-[12px] font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color }}
      >
        Read more
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function AmendmentsPage() {
  const router = useRouter();
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/amendments")
      .then((r) => r.json())
      .then((data) => {
        setAmendments(Array.isArray(data) ? data : data.amendments ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }
        .anim-fade-up     { animation: fadeUp     0.5s ease both; }
        .anim-slide-right { animation: slideRight 1.4s ease-in-out infinite; }

        .amendment-card-wrap * {
          min-width: 0;
          max-width: 100%;
        }
      `}</style>

      <div className="bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16 font-sans">

        {/* Hero */}
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
              <br />
              <span className="text-orange-900">evolved?</span>
            </h1>
            <p className="text-base text-[#6b5a3e] leading-relaxed max-w-md">
              A chronological journey through the most important amendments — what changed and why it
              matters for every Indian.
            </p>
          </div>
        </section>

        {/* Scroll hint */}
        <div className="flex items-center gap-2 px-6 md:px-12 lg:px-16 pt-7 text-[12px] font-semibold text-[#b0a090]">
          Scroll horizontally to explore
          <span className="anim-slide-right">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Timeline */}
        <div
          className="overflow-x-auto overflow-y-hidden py-12 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#ddd5c0 transparent",
          }}
        >
          <div className="flex items-start px-6 md:px-12 lg:px-16 w-max">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-[280px] flex-shrink-0 px-3">
                      <div className="bg-white border border-[#ede8df] rounded-[20px] h-64 animate-pulse" />
                    </div>
                    {i < 4 && (
                      <div className="flex items-center w-10 flex-shrink-0 mt-[42px]">
                        <div className="flex-1 h-[2px] bg-[#ede8df]" />
                      </div>
                    )}
                  </div>
                ))
              : amendments.map((amendment, i) => (
                  <div key={amendment.id} className="flex items-start">
                    <div
                      className="anim-fade-up amendment-card-wrap flex flex-col items-center w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0"
                      style={{ animationDelay: `${i * 0.07}s` }}
                    >
                      {/* Timeline dot — uses cycling color */}
                      <div className="mb-4 flex items-center justify-center">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-[3px] border-white z-10"
                          style={{
                            background: getColor(i),
                            boxShadow: `0 0 0 2px ${getColor(i)}`,
                          }}
                        />
                      </div>

                      {/* Card */}
                      <div className="w-full px-3 overflow-hidden">
                        <AmendmentCard
                          amendment={amendment}
                          index={i}
                          onClick={() =>
                            router.push(`/user_amendments/${slugify(amendment.number)}`)
                          }
                        />
                      </div>
                    </div>

                    {/* Connector line */}
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