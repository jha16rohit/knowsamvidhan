"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Part {
  id: string;
  partNumber: string;
  title: string;
  range: string;
}

interface Clause {
  id: string;
  clauseNumber: string;
  text: string;
}

interface Article {
  id: string;
  articleNumber: string;
  title: string;
  shortSummary: string | null;
  officialText: string | null;
  simpleExplanation: string | null;
  example: string | null;
  tags: string | null;
  featured: boolean;
  part: Part;
  clauses: Clause[];
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"} stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <line x1="12" y1="2" x2="12" y2="3" />
      <path d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.8C7.21 16.16 6 14.22 6 12a6 6 0 0 1 6-6z" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6 py-8">
      <div className="h-3 w-32 bg-[#f0ece4] rounded-full" />
      <div className="h-10 w-3/4 bg-[#f0ece4] rounded" />
      <div className="h-4 w-full bg-[#f0ece4] rounded" />
      <div className="h-4 w-2/3 bg-[#f0ece4] rounded" />
      <div className="h-36 bg-[#f0ece4] rounded-2xl" />
      <div className="h-28 bg-[#f0ece4] rounded-2xl" />
      <div className="h-24 bg-[#f0ece4] rounded-2xl" />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug   = params?.slug as string;

  const [article, setArticle]   = useState<Article | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved]       = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/articles/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data: Article | null) => {
        if (data) setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  // ── Loading state ──
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="font-sans bg-[#faf7f2] min-h-screen pt-16 px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <SkeletonDetail />
          </div>
        </div>
      </>
    );
  }

  // ── Not found state ──
  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a1208] mb-2">Article not found</p>
          <Link href="/user_articles" className="text-[#c48232] underline text-sm">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const isFeatured  = article.featured;
  const clauseCount = article.clauses.length;
  const tagList     = article.tags
    ? article.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df] border-b border-[#ede8df] px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-14">
          <div className="max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
              <button
                onClick={() => router.push("/user_articles")}
                className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#9e8c73] hover:text-[#c48232] transition-colors duration-150"
              >
                <ArrowLeftIcon />
                <span>All Articles</span>
              </button>
              <span className="text-[#cbb896] text-xs">·</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#c48232]">
                {article.part.partNumber}
              </span>
              {isFeatured && (
                <>
                  <span className="text-[#cbb896] text-xs">·</span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-600">
                    <StarIcon />
                    Featured
                  </span>
                </>
              )}
            </div>

            {/* Title + Actions */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-1">
                  {article.articleNumber}
                </p>
                <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-3
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl break-words overflow-wrap-anywhere">
                  {article.title}
                </h1>
                {article.shortSummary && (
                  <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-2xl break-words overflow-wrap-anywhere">
                    {article.shortSummary}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-center">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150
                    ${saved
                      ? "border-[#c48232] bg-[#fdf3e3] text-[#c48232]"
                      : "border-[#d6c7a8] bg-white text-[#4a3c28] hover:border-[#c48232] hover:text-[#c48232]"
                    }`}
                >
                  <BookmarkIcon filled={saved} />
                  Save
                </button>
                <button
                  onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d6c7a8] bg-white text-[#4a3c28] text-xs font-semibold hover:border-[#c48232] hover:text-[#c48232] transition-all duration-150"
                >
                  <ShareIcon />
                  Share
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 min-w-0">

            {/* ── Left: Main Content ── */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* Official Text */}
              {article.officialText && (
                <div className="border border-[#e8d4a0] rounded-2xl p-5 sm:p-6 bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpenIcon />
                    <span className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase">
                      Official Text
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#1a1208] leading-relaxed font-serif italic break-words overflow-wrap-anywhere">
                    "{article.officialText}"
                  </p>
                </div>
              )}

              {/* In Plain English */}
              {article.simpleExplanation && (
                <div>
                  <h2 className="font-extrabold text-[#1a1208] text-xl sm:text-2xl font-serif mb-3 sm:mb-4">
                    In plain English
                  </h2>
                  <p className="text-sm sm:text-base text-[#4a3c28] leading-relaxed mb-4 break-words overflow-wrap-anywhere">
                    {article.simpleExplanation}
                  </p>

                  {/* Example */}
                  {article.example && (
                    <div className="border border-[#b6e8c8] rounded-2xl p-4 sm:p-5 bg-[#f0faf4]">
                      <div className="flex items-center gap-2 mb-2">
                        <LightbulbIcon />
                        <span className="text-[10px] font-bold text-emerald-700 tracking-[1.5px] uppercase">
                          Example
                        </span>
                      </div>
                      <p className="text-sm text-[#2e5c3a] leading-relaxed break-words overflow-wrap-anywhere">
                        {article.example}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Clauses */}
              {clauseCount > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ListIcon />
                    <h2 className="font-extrabold text-[#1a1208] text-xl sm:text-2xl font-serif">
                      Clauses
                    </h2>
                    <span className="ml-auto text-[11px] font-semibold text-[#9e8c73] bg-[#f0ece4] px-2.5 py-0.5 rounded-full">
                      {clauseCount} {clauseCount === 1 ? "clause" : "clauses"}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-[#e8d4a0] overflow-hidden">
                    {article.clauses.map((clause, i) => (
                      <div
                        key={clause.id}
                        className={`flex gap-4 p-4 sm:p-5 bg-white ${
                          i < clauseCount - 1 ? "border-b border-[#f0ece4]" : ""
                        }`}
                      >
                        <span className="text-sm font-bold text-[#c48232] font-serif shrink-0 w-8">
                          ({clause.clauseNumber})
                        </span>
                        <p className="text-sm text-[#4a3c28] leading-relaxed break-words overflow-wrap-anywhere">
                          {clause.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tagList.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm text-[#7a6a50] mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white border border-[#e8d4a0] text-xs text-[#4a3c28] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ── Right: Sidebar ── */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-5 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">

              {/* At a Glance */}
              <div className="rounded-2xl border border-[#e8d4a0] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-4">
                  At a Glance
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Article",  value: article.articleNumber.replace("Article ", "") },
                    { label: "Part",     value: article.part.partNumber },
                    { label: "Clauses",  value: clauseCount > 0 ? String(clauseCount) : "—" },
                    { label: "Featured", value: isFeatured ? "Yes" : "No" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-[#9e8c73]">{label}</span>
                      <span className="text-sm font-bold text-[#1a1208]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Part */}
              <div className="rounded-2xl border border-[#e8d4a0] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
                  Parent Part
                </p>
                <div className="rounded-xl border border-[#f0ece4] p-3.5">
                  <p className="text-xs text-[#9e8c73] mb-0.5">{article.part.partNumber}</p>
                  <p className="font-extrabold text-base text-[#1a1208] font-serif break-words overflow-wrap-anywhere">
                    {article.part.title}
                  </p>
                  <p className="text-xs text-[#9e8c73] mt-1">{article.part.range}</p>
                </div>
              </div>

            </aside>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}