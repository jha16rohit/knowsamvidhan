"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  articleNumber: string;
  title: string;
  shortSummary: string | null;
  tags: string | null;
}

interface Part {
  id: string;
  partNumber: string;
  title: string;
  range: string;
  articles: number;
  description: string | null;
  articlesList: Article[];
}

function romanFromPartNumber(partNumber: string): string {
  return partNumber.replace(/^Part\s+/i, "").trim();
}

function articleToSlug(articleNumber: string): string {
  return articleNumber.toLowerCase().replace(/\s+/g, "-");
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

function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function PartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [part, setPart] = useState<Part | null>(null);
  const [allParts, setAllParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch(`/api/parts/${slug}`).then((r) => r.json()),
      fetch("/api/parts").then((r) => r.json()),
    ]).then(([partData, partsData]) => {
      setPart(partData.error ? null : partData);
      setAllParts(partsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const otherParts = allParts.filter((p) => p.id !== slug);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf7f2] pt-16 px-8 py-16">
          <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
            <div className="h-10 bg-[#e0d5c5] rounded-xl w-1/3" />
            <div className="h-6 bg-[#e0d5c5] rounded-xl w-2/3" />
            <div className="h-48 bg-[#e0d5c5] rounded-2xl mt-8" />
          </div>
        </div>
      </>
    );
  }

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

  const roman = romanFromPartNumber(part.partNumber);

  return (
    <>
      <Navbar />
      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* Hero */}
        <section className="`bg-gradient-to-br from-[#fdf6ec] via-[#f5ede0] to-[#ede8df] border-b border-[#d6c7a8] px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => router.push("/user_parts")}
              className="flex items-center gap-1.5 text-xs text-[#9e8c73] hover:text-[#c48232] transition-colors duration-150 mb-8"
            >
              <ArrowLeftIcon />
              Back to all parts
            </button>

            <div className="flex items-start gap-5 sm:gap-7">
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#c48232] flex items-center justify-center shadow-[0_4px_20px_rgba(196,130,50,0.35)]">
                <span className="text-white font-extrabold text-xl sm:text-2xl font-serif tracking-wide">
                  {roman}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#c48232] tracking-[2px] uppercase mb-1">
                  {part.partNumber} · {part.range}
                </p>
                <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-2 text-3xl sm:text-4xl md:text-5xl">
                  {part.title}
                </h1>
                {part.description && (
                  <p className="text-sm text-[#7a6a50] leading-relaxed mt-2 max-w-xl">
                    {part.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">

            {/* Main */}
            <div className="flex-1 min-w-0 space-y-10">
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-extrabold text-[#1a1208] text-xl sm:text-2xl font-serif">
                    Articles in this Part
                  </h2>
                  <span className="text-xs font-semibold text-[#9e8c73] bg-[#f0ece4] border border-[#d6c7a8] px-3 py-1 rounded-full">
                    {part.articlesList.length} articles
                  </span>
                </div>

                {part.articlesList.length === 0 ? (
                  <div className="rounded-2xl border border-[#d6c7a8] bg-white p-8 text-center">
                    <p className="text-sm text-[#9e8c73]">No articles available for this part yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {part.articlesList.map((article) => (
                      <div
                        key={article.id}
                        className="group relative bg-white border border-[#c9b99a] rounded-2xl p-5 flex flex-col justify-between min-h-40 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(196,130,50,0.15)] hover:border-[#c48232]"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          {article.tags && (
                            <span className="bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-[#c48232] leading-5 shrink-0 max-w-[75%] truncate">
                              {article.tags.split(",")[0].trim()}
                            </span>
                          )}
                          <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[#c9b99a] ml-auto">
                            <BookmarkIcon />
                          </span>
                        </div>

                        <p className="font-extrabold text-lg text-[#1a1208] font-serif leading-tight">
                          {article.articleNumber}
                        </p>
                        <p className="font-semibold text-sm text-[#4a3c28] mb-1">{article.title}</p>
                        <p className="text-xs text-[#7a6a50] leading-relaxed flex-1">
                          {article.shortSummary ?? ""}
                        </p>

                        <Link
                          href={`/user_articles/${articleToSlug(article.articleNumber)}`}
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

            {/* Sidebar */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-5 lg:sticky lg:top-20 lg:self-start">
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
                    <span className="text-sm font-bold text-[#1a1208]">{roman}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9e8c73]">Range</span>
                    <span className="text-sm font-bold text-[#1a1208]">{part.range}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9e8c73]">Articles available</span>
                    <span className="text-sm font-bold text-[#1a1208]">{part.articlesList.length}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-4">
                  Other Parts
                </p>
                <div className="space-y-2">
                  {otherParts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/user_parts/${p.id}`}
                      className="block rounded-xl border border-[#ede8df] bg-[#faf7f2] px-4 py-3 hover:border-[#c48232] hover:bg-[#fdf3e3] transition-all duration-150 group"
                    >
                      <p className="text-sm font-bold text-[#1a1208] group-hover:text-[#c48232] transition-colors duration-150">
                        {p.partNumber}
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