"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Part {
  id: string;
  partNumber: string;
  title: string;
  range: string;
  articles: number;
  description: string | null;
}

function romanFromPartNumber(partNumber: string): string {
  // "Part III" → "III", "Part IV-A" → "IV-A"
  return partNumber.replace(/^Part\s+/i, "").trim();
}

function PartCard({ part, onClick }: { part: Part; onClick: () => void }) {
  const roman = romanFromPartNumber(part.partNumber);
  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col gap-0 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,130,50,0.18)] hover:border-[#c48232] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
    >
      <span className="absolute top-5 right-5 bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-3 py-1 text-[12px] font-semibold text-[#c48232]">
        {part.articles} articles
      </span>

      <div className="w-12 h-12 rounded-xl bg-[#c48232] flex items-center justify-center mb-5 shrink-0">
        <span className="text-white font-extrabold text-base font-serif tracking-wide">
          {roman}
        </span>
      </div>

      <p className="text-[11px] font-bold text-[#c48232] tracking-widest uppercase mb-1.5">
        {part.partNumber}
      </p>

      <h2 className="font-extrabold text-xl text-[#1a1208] leading-tight mb-2 font-serif pr-20">
        {part.title}
      </h2>

      <p className="text-sm text-[#9e8c73] font-medium mb-3">{part.range}</p>

      <p className="text-sm text-[#7a6a50] leading-relaxed flex-1 mb-6">
        {part.description ?? ""}
      </p>

      <div className="flex items-center gap-1 text-sm font-semibold text-[#c48232] mt-auto group-hover:gap-2 transition-all duration-200">
        Explore Part
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  );
}

export default function PartsPage() {
  const router = useRouter();
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parts")
      .then((r) => r.json())
      .then((data) => {
        setParts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">
        <section className="`bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df] border-b border-[#d6c7a8] px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16">
          <div className="max-w-368 mx-auto">
            <p className="text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
              Chapters
            </p>
            <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-4 text-3xl sm:text-4xl md:text-5xl">
              Browse the Constitution by Part
            </h1>
            <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-lg">
              The Constitution is organised into Parts. Each Part groups related
              Articles into a single chapter — click any card to explore its details.
            </p>
          </div>
        </section>

        <main className="max-w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-12 md:py-14">
          {loading ? (
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#c9b99a] rounded-2xl p-6 h-56 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {parts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  onClick={() => router.push(`/user_parts/${part.id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <FooterSection />
    </>
  );
}