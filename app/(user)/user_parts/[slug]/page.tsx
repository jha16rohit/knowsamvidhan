"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { allArticles, articleToSlug } from "../../user_articles/page";
import { parts } from "../page";

// ─── Icons ─────────────────────────────────────────────────────────────────────

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

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-[#c48232]">
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
      <path d="M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.8C7.21 16.16 6 14.22 6 12a6 6 0 0 1 6-6z" />
      <line x1="12" y1="2" x2="12" y2="3" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const part = parts.find((p) => p.slug === slug);

  // Articles that belong to this part
  const partArticles = allArticles.filter((a) => {
    const partMap: Record<string, string> = {
      "part-i": "Part I",
      "part-ii": "Part II",
      "part-iii": "Part III",
      "part-iv": "Part IV",
      "part-iv-a": "Part IV-A",
      "part-v": "Part V",
      "part-vi": "Part VI",
    };
    return a.part === partMap[slug];
  });

  // Other parts (excluding current)
  const otherParts = parts.filter((p) => p.slug !== slug);

  if (!part) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a1208] mb-2">Part not found</p>
          <Link href="/user_parts" className="text-[#c48232] underline text-sm">
            ← Back to all parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#fdf6ec] via-[#f5ede0] to-[#ede8df] border-b border-[#d6c7a8] px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16">
          <div className="max-w-5xl mx-auto">

            {/* Back link */}
            <button
              onClick={() => router.push("/user_parts")}
              className="flex items-center gap-1.5 text-xs text-[#9e8c73] hover:text-[#c48232] transition-colors duration-150 mb-8"
            >
              <ArrowLeftIcon />
              Back to all parts
            </button>

            {/* Part label + Title row */}
            <div className="flex items-start gap-5 sm:gap-7">
              {/* Orange icon block */}
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#c48232] flex items-center justify-center shadow-[0_4px_20px_rgba(196,130,50,0.35)]">
                <span className="text-white font-extrabold text-xl sm:text-2xl font-serif tracking-wide">
                  {part.romanNumeral}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#c48232] tracking-[2px] uppercase mb-1">
                  {part.number} · {part.articlesRange}
                </p>
                <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-2 text-3xl sm:text-4xl md:text-5xl">
                  {part.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">

            {/* ── Left: Main Content ── */}
            <div className="flex-1 min-w-0 space-y-10">
                 {/* Overview */}
              <section>
                <h2 className="font-extrabold text-[#1a1208] text-xl sm:text-2xl font-serif mb-4">
                  Overview
                </h2>
                <p className="text-sm sm:text-base text-[#4a3c28] leading-7">{part.overview}</p>
              </section>

              {/* Articles in this Part */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-extrabold text-[#1a1208] text-xl sm:text-2xl font-serif">
                    Key Articles
                  </h2>
                  <span className="text-xs font-semibold text-[#9e8c73] bg-[#f0ece4] border border-[#d6c7a8] px-3 py-1 rounded-full">
                    {partArticles.length} articles
                  </span>
                </div>

                {partArticles.length === 0 ? (
                  <div className="rounded-2xl border border-[#d6c7a8] bg-white p-8 text-center">
                    <p className="text-sm text-[#9e8c73]">No articles available for this part yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {partArticles.map((article) => (
                      <div
                        key={article.number}
                        className="group relative bg-white border border-[#c9b99a] rounded-2xl p-5 flex flex-col justify-between min-h-[160px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(196,130,50,0.15)] hover:border-[#c48232]"
                      >
                        {/* Tag + Bookmark */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-[#c48232] leading-5 shrink-0 max-w-[75%] truncate">
                            {article.tag}
                          </span>
                          <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[#c9b99a]">
                            <BookmarkIcon />
                          </span>
                        </div>

                        {/* Number */}
                        <p className="font-extrabold text-lg text-[#1a1208] font-serif leading-tight">
                          {article.number}
                        </p>

                        {/* Title */}
                        <p className="font-semibold text-sm text-[#4a3c28] mb-1">{article.title}</p>

                        {/* Description */}
                        <p className="text-xs text-[#7a6a50] leading-relaxed flex-1">{article.description}</p>

                        {/* Read Article */}
                        <Link
                          href={`/user_articles/${articleToSlug(article.number)}`}
                          className="mt-3 self-start flex items-center gap-1 text-xs font-semibold text-[#c48232] hover:gap-2 transition-all duration-200"
                        >
                          Read article
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>

             

              

            </div>

            {/* ── Right: Sidebar ── */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-5 lg:sticky lg:top-20 lg:self-start">

              {/* Quick Facts */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpenIcon />
                </div>
                <p className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-4">
                  Quick Facts
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9e8c73]">Part</span>
                    <span className="text-sm font-bold text-[#1a1208]">{part.romanNumeral}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9e8c73]">Range</span>
                    <span className="text-sm font-bold text-[#1a1208]">{part.articlesRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9e8c73]">Articles available</span>
                    <span className="text-sm font-bold text-[#1a1208]">{partArticles.length}</span>
                  </div>
                </div>
              </div>

              {/* Other Parts */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-4">
                  Other Parts
                </p>
                <div className="space-y-2">
                  {otherParts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/user_parts/${p.slug}`}
                      className="block rounded-xl border border-[#ede8df] bg-[#faf7f2] px-4 py-3 hover:border-[#c48232] hover:bg-[#fdf3e3] transition-all duration-150 group"
                    >
                      <p className="text-sm font-bold text-[#1a1208] group-hover:text-[#c48232] transition-colors duration-150">
                        {p.number.replace("PART ", "Part ")}
                      </p>
                      <p className="text-xs text-[#9e8c73] mt-0.5">{p.title}</p>
                    </Link>
                  ))}
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