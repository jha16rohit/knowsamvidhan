"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Part {
  id: string;
  partNumber: string;
  title: string;
}

interface Article {
  id: string;
  articleNumber: string;
  title: string;
  shortSummary: string | null;
  tags: string | null;
  featured: boolean;
  part: Part;
}

// ─── Helper ────────────────────────────────────────────────────────────────────

export function articleToSlug(number: string): string {
  return number.toLowerCase().replace(/\s+/g, "-");
}

const FILTER_TABS = [
  "All", "Part I", "Part II", "Part III",
  "Part IV", "Part IV-A", "Part V", "Part VI",
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"} stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-[#e8d4a0] rounded-2xl p-4 sm:p-5 min-h-[170px] animate-pulse flex flex-col gap-3">
      <div className="h-4 w-24 bg-[#f0ece4] rounded-full" />
      <div className="h-6 w-32 bg-[#f0ece4] rounded" />
      <div className="h-4 w-48 bg-[#f0ece4] rounded" />
      <div className="h-3 w-full bg-[#f0ece4] rounded" />
      <div className="h-3 w-3/4 bg-[#f0ece4] rounded" />
    </div>
  );
}

// ─── Article Card ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  bookmarked,
  onBookmark,
}: {
  article: Article;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  const router = useRouter();

  return (
    <div className="
      group relative bg-white
      border border-[#d6c7a8] rounded-2xl
      p-4 sm:p-5 flex flex-col justify-between
      min-h-[170px]
      transition-all duration-200
      hover:-translate-y-1
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]
      hover:border-[#c48232]
    ">
      {/* Tag + Bookmark */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-full
          px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#c48232]
          leading-5 shrink-0 max-w-[75%] truncate">
          {article.part.partNumber}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
          className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full
            transition-colors duration-150
            ${bookmarked
              ? "text-[#c48232] bg-[#fdf3e3]"
              : "text-[#c9b99a] hover:text-[#c48232] hover:bg-[#fdf3e3]"}`}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </div>

      <p className="font-extrabold text-lg sm:text-xl text-[#1a1208] font-serif leading-tight">
        {article.articleNumber}
      </p>

      <p className="font-semibold text-sm text-[#4a3c28]">{article.title}</p>

      <p className="text-xs text-[#7a6a50] leading-relaxed flex-1 line-clamp-2 break-words overflow-wrap-anywhere">
        {article.shortSummary ?? ""}
      </p>

      <button
        onClick={() => router.push(`/user_articles/${articleToSlug(article.articleNumber)}`)}
        className="
          mt-2 self-start flex items-center gap-1
          text-xs font-semibold text-[#c48232] bg-transparent border-none p-0 cursor-pointer
          hover:gap-2 transition-all duration-200
        "
      >
        Read article
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const [activeFilter, setActiveFilter]         = useState("All");
  const [search, setSearch]                     = useState("");
  const [debouncedSearch, setDebouncedSearch]   = useState("");
  const [bookmarks, setBookmarks]               = useState<Set<string>>(new Set());
  const [articles, setArticles]                 = useState<Article[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(false);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch articles from DB whenever search or filter changes
  useEffect(() => {
    setLoading(true);
    setError(false);

    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (activeFilter !== "All") params.set("part", activeFilter);

    fetch(`/api/articles?${params.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data: Article[]) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [debouncedSearch, activeFilter]);

  const toggleBookmark = (num: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero Header ── */}
        <section className="
          bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df]
          border-b border-[#ede8df]
          px-4 sm:px-6 md:px-10 lg:px-16
          py-8 sm:py-10 md:py-14 lg:py-16
        ">
          <div className="max-w-[92rem] mx-auto">

            <p className="text-[10px] sm:text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-2 sm:mb-3">
              Library
            </p>

            <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-3 sm:mb-4
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Every Article. Clearly explained.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#7a6a50] leading-relaxed max-w-lg mb-5 sm:mb-7">
              Filter by part of the Constitution or search by Article number, name or topic.
            </p>

            {/* Search bar */}
            <div className="
              flex items-center gap-3 bg-white border border-[#cbb896] rounded-xl
              px-3 sm:px-4 py-2 sm:py-2.5
              w-full max-w-xs sm:max-w-sm md:max-w-md
              shadow-[0_2px_8px_rgba(0,0,0,0.05)]
              focus-within:border-[#c48232] focus-within:shadow-[0_0_0_3px_rgba(196,130,50,0.12)]
              transition-all duration-200
            ">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Article 21, Right to Education..."
                className="flex-1 border-none outline-none bg-transparent
                  text-xs sm:text-sm text-[#1a1208] placeholder:text-[#b0a08a] font-sans min-w-0"
              />
              <button
                aria-label="Search"
                className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg
                  text-[#9e8c73] hover:bg-[#fdf3e3] hover:text-[#c48232]
                  active:scale-95 transition-all duration-150"
              >
                <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Filter tabs */}
            <div className="mt-4 sm:mt-5 -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-hide">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full
                      text-[11px] sm:text-[13px] font-medium border
                      transition-all duration-150 whitespace-nowrap
                      ${activeFilter === tab
                        ? "border-[#c48232] bg-[#fdf3e3] text-[#c48232] font-bold"
                        : "border-[#ede8df] bg-white text-[#7a6a50] hover:border-[#c48232]/50 hover:text-[#c48232]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Articles Grid ── */}
        <main className="w-full px-2 sm:px-4 md:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-14 pb-8">

          {/* Results count */}
          {!loading && !error && (search || activeFilter !== "All") && (
            <p className="text-xs text-[#9e8c73] mb-5 sm:mb-6">
              {articles.length} article{articles.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-16 text-red-500 text-sm">
              Failed to load articles. Please refresh the page.
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-16 sm:py-20 text-[#9e8c73] text-sm sm:text-base">
              No articles found. Try a different search or filter.
            </div>
          )}

          {/* Articles grid */}
          {!loading && !error && articles.length > 0 && (
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  bookmarked={bookmarks.has(article.articleNumber)}
                  onBookmark={() => toggleBookmark(article.articleNumber)}
                />
              ))}
            </div>
          )}

          {/* Quiz CTA */}
          <div className="flex justify-center mt-10 sm:mt-12 md:mt-14 mb-4">
            <Link
              href="/user_quiz"
              className="inline-flex items-center gap-2
                bg-transparent border border-[#cbb896] rounded-xl
                px-5 sm:px-7 py-2.5 sm:py-3
                text-xs sm:text-sm font-semibold text-[#4a3c28]
                hover:border-[#c48232] hover:text-[#c48232] hover:bg-[#fdf3e3]
                transition-all duration-200 group"
            >
              Test your knowledge in a quiz
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

        </main>

        <FooterSection />
      </div>
    </>
  );
}