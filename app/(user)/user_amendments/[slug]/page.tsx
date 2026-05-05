"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Amendment {
  id: string;
  number: string;
  year: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relatedArticles: string;
}

interface Article {
  id: string;
  articleNumber: string;
  title: string;
  shortSummary: string | null;
  tags: string | null;
}

const COLOR_MAP: Record<string, string> = {
  "1st": "#b85c38",
  "42nd": "#6b4c9a",
  "44th": "#2d7d6f",
  "73rd": "#4a7c3f",
  "86th": "#c48232",
  "101st": "#1a6b99",
  "103rd": "#8b4a6b",
};

const ERA_MAP: Record<string, string> = {
  "1st": "Post-Independence",
  "42nd": "Emergency Era",
  "44th": "Post-Emergency",
  "73rd": "Liberalisation",
  "86th": "Modern Era",
  "101st": "Digital Era",
  "103rd": "Digital Era",
};

function normalizeNumber(number: string): string {
  return (number ?? "").trim();
}

function getColor(number: string) {
  return COLOR_MAP[normalizeNumber(number)] ?? "#c48232";
}

function getEra(number: string) {
  return ERA_MAP[normalizeNumber(number)] ?? "Modern Era";
}

function slugify(number: string) {
  return (number ?? "").trim().toLowerCase().replace(/\s+/g, "-");
}

function articleToSlug(articleNumber: string) {
  return (articleNumber ?? "").toLowerCase().replace(/\s+/g, "-");
}

// Shared prose text style — prevents long unbroken strings from overflowing
const proseStyle: React.CSSProperties = {
  wordBreak: "break-word",
  overflowWrap: "break-word",
  minWidth: 0,
};

export default function AmendmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [amendment, setAmendment] = useState<Amendment | null>(null);
  const [allAmendments, setAllAmendments] = useState<Amendment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`/api/amendments/${slug}`).then((r) => r.json()),
      fetch("/api/amendments").then((r) => r.json()),
    ])
      .then(async ([detail, all]) => {
        const a: Amendment | null = detail.error ? null : detail;
        setAmendment(a);
        setAllAmendments(Array.isArray(all) ? all : (all.amendments ?? []));

        if (a?.relatedArticles) {
          const refs = a.relatedArticles
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);

          const fetched = await Promise.all(
            refs.map((ref: string) =>
              fetch(`/api/articles/${ref}`)
                .then((r) => r.json())
                .catch(() => null),
            ),
          );
          setRelatedArticles(
            fetched.filter((article): article is Article => {
              return Boolean(article) && !("error" in article);
            }),
          );
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf7f2] pt-16 px-8 py-16 animate-pulse">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="h-6 bg-[#e0d5c5] rounded-xl w-1/4" />
            <div className="h-14 bg-[#e0d5c5] rounded-xl w-2/3" />
            <div className="h-48 bg-[#e0d5c5] rounded-2xl mt-8" />
          </div>
        </div>
      </>
    );
  }

  /* ── 404 ── */
  if (!amendment) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a1208] mb-2">
            Amendment not found
          </p>
          <Link
            href="/user_amendments"
            className="text-[#c48232] underline text-sm"
          >
            ← Back to timeline
          </Link>
        </div>
      </div>
    );
  }

  const color = getColor(amendment.number);
  const era = getEra(amendment.number);
  const others = allAmendments.filter((a) => a.id !== amendment.id);

  return (
    <>
      <Navbar />

      {/* Global min-width-0 so flex children never overflow */}
      <style>{`
        .detail-root * { min-width: 0; }
      `}</style>

      <div className="detail-root bg-[#faf7f2] min-h-screen font-sans pt-16">
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden border-b border-[#ddd5c0] px-6 pt-12 pb-14 md:px-12 lg:px-16"
          style={{
            background:
              "linear-gradient(160deg,#f5f0e8 0%,#ede4d0 50%,#e8dfc8 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(196,130,50,.08) 0%,transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(196,130,50,.06) 0%,transparent 70%)",
            }}
          />

          <div className="relative max-w-5xl mx-auto overflow-hidden">
            {/* Back button */}
            <button
              onClick={() => router.push("/user_amendments")}
              className="mb-7 flex items-center gap-2 bg-transparent border-0 text-[#c48232] text-[13px] font-semibold cursor-pointer p-0 transition-all duration-200 hover:gap-3"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5M12 5l-7 7 7 7"
                />
              </svg>
              Back to timeline
            </button>

            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shrink-0"
                style={{ background: "rgba(196,130,50,.12)", color: "#c48232" }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {amendment.year}
              </span>
              <span className="text-[#c9b89a] text-sm">/</span>
              <span className="text-[#c48232] text-[13px] font-bold truncate">
                {amendment.number} Amendment
              </span>
            </div>

            {/* Era Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase"
                style={{
                  backgroundColor: `${color}18`,
                  color,
                  border: `1px solid ${color}30`,
                }}
              >
                {era}
              </span>

              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#7a6a50",
                  border: "1px solid #e7dcc8",
                }}
              >
                Constitutional Amendment
              </span>
            </div>

            {/* Title — break-words prevents overflow */}
            <h1
              className="text-[clamp(28px,4vw,52px)] font-extrabold text-[#1a1208] leading-[1.1] tracking-tight mb-4 font-serif"
              style={proseStyle}
            >
              {amendment.title}
            </h1>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-10 flex flex-col lg:flex-row gap-8 items-start overflow-hidden">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-5 overflow-hidden">
            {/* Why it matters */}
            {amendment.whyItMatters && (
              <div className="bg-white border border-[#ede8df] rounded-2xl p-7 overflow-hidden">
                <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                  Why it matters
                </div>
                <p
                  className="text-xl md:text-2xl font-bold text-[#1a1208] leading-snug font-serif"
                  style={proseStyle}
                >
                  {amendment.whyItMatters}
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="bg-white border border-[#ede8df] rounded-2xl p-7 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Summary
              </div>
              <h2
                className="text-xl font-extrabold text-[#1a1208] mb-3 font-serif"
                style={proseStyle}
              >
                What this amendment did
              </h2>
              <p
                className="text-[15px] text-[#6b5a3e] leading-relaxed"
                style={proseStyle}
              >
                {amendment.summary}
              </p>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white border border-[#ede8df] rounded-2xl p-7 overflow-hidden">
                <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.828 14.828a4 4 0 015.656 0"
                    />
                  </svg>
                  Related Articles
                </div>
                <h2
                  className="text-xl font-extrabold text-[#1a1208] mb-5 font-serif"
                  style={proseStyle}
                >
                  Articles affected
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/user_articles/${articleToSlug(article.articleNumber)}`}
                      className="group bg-[#faf7f2] border border-[#ede8df] rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#c48232] hover:shadow-[0_4px_16px_rgba(196,130,50,.10)] overflow-hidden block"
                    >
                      {article.tags && (
                        <span
                          className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-3"
                          style={{
                            background: "rgba(196,130,50,.12)",
                            color: "#c48232",
                          }}
                        >
                          {article.tags.split(",")[0].trim()}
                        </span>
                      )}
                      <div className="text-[11px] font-bold text-[#c48232] tracking-[0.08em] uppercase mb-1 wrap-break-words">
                        {article.articleNumber}
                      </div>
                      <h3
                        className="text-[16px] font-extrabold text-[#1a1208] mb-2 leading-snug font-serif"
                        style={proseStyle}
                      >
                        {article.title}
                      </h3>
                      <p
                        className="text-[13px] text-[#7a6a50] leading-relaxed mb-4"
                        style={proseStyle}
                      >
                        {article.shortSummary ?? ""}
                      </p>
                      <span className="text-[13px] font-semibold text-[#c48232] group-hover:underline">
                        Read article →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sticky sidebar */}
          <div className="w-full lg:w-70 xl:w-75 shrink-0 lg:sticky lg:top-6 overflow-hidden">
            <div className="bg-white border border-[#ede8df] rounded-2xl p-6">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#c48232] mb-4">
                Other Amendments
              </div>
              <div className="space-y-0.5">
                {others.map((a) => (
                  <button
                    key={a.id}
                    onClick={() =>
                      router.push(`/user_amendments/${slugify(a.number)}`)
                    }
                    className="w-full flex flex-col rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[#faf7f2] overflow-hidden"
                  >
                    <span
                      className="text-[13px] font-extrabold text-[#1a1208] leading-tight"
                      style={proseStyle}
                    >
                      {a.number} · {a.year}
                    </span>
                    <span
                      className="text-[12px] text-[#9a8a70] mt-0.5"
                      style={proseStyle}
                    >
                      {a.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}
