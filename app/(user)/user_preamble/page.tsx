"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Keyword      { word: string; meaning: string; icon: string }
interface Timeline     { year: string; event: string }
interface QuickFact    { label: string; value: string }
interface LandmarkCase { year: string; name: string; description: string }
interface Note         { type: "amendment" | "did-you-know"; text: string }

interface PreambleData {
  officialText:      string;
  simpleExplanation: string;
  whyItMatters:      string;
  keywords:          Keyword[];
  timeline:          Timeline[];
  quickFacts:        QuickFact[];
  landmarkCases:     LandmarkCase[];
  notes:             Note[];
}

// ─── Icons ────────────────────────────────────────────────────────────────────

// function BookmarkIcon({ filled }: { filled: boolean }) {
//   return (
//     <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
//       stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
//       className="w-4 h-4">
//       <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
//     </svg>
//   );
// }

// ─── Speak Button ─────────────────────────────────────────────────────────────

function SpeakButton({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleClick = () => {
    if (!("speechSynthesis" in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-IN";
    utt.rate = 0.92;
    utt.pitch = 1;

    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  };

  // Stop on unmount
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  return (
    <button
      onClick={handleClick}
      title={speaking ? "Stop speaking" : "Listen to Preamble"}
      className={`
        inline-flex items-center gap-2 rounded-full border px-4 py-1.5
        text-[12px] font-semibold tracking-wide
        transition-all duration-200 select-none
        ${speaking
          ? "border-[#c48232] bg-[#fdf3e3] text-[#c48232] hover:bg-[#fde8c4]"
          : "border-[#c9b99a] bg-white text-[#7a6a50] hover:border-[#c48232] hover:text-[#c48232] hover:bg-[#fdf3e3]"
        }
      `}
    >
      {/* Speaker / Stop icon */}
      {speaking ? (
        /* Stop icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="w-3.5 h-3.5 shrink-0">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ) : (
        /* Volume / speaker icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="w-3.5 h-3.5 shrink-0">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
      {speaking ? "Stop" : "Listen"}

      {/* Animated bars when speaking */}
      {speaking && (
        <span className="flex items-end gap-0.5 h-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-0.75 rounded-full bg-[#c48232] animate-bounce"
              style={{
                animationDelay: `${i * 0.18}s`,
                animationDuration: "0.7s",
                height: i === 1 ? "12px" : "7px",
              }}
            />
          ))}
        </span>
      )}
    </button>
  );
}

// ─── Keyword Card ─────────────────────────────────────────────────────────────

function KeywordCard({ word, meaning, icon }: Keyword) {
  return (
    <div className="group relative bg-white border border-[#c9b99a] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(196,130,50,0.15)] hover:border-[#c48232] overflow-hidden">
      <span className="absolute top-3 right-4 text-5xl font-bold text-[#f5ede0] select-none pointer-events-none group-hover:text-[#fde8c4] transition-colors duration-300">
        {icon}
      </span>
      <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-2 relative z-10">Key Term</p>
      <p className="font-extrabold text-lg text-[#1a1208] font-serif mb-2 relative z-10">{word}</p>
      <p className="text-sm text-[#7a6a50] leading-relaxed relative z-10">{meaning}</p>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f0e8d8] rounded ${className}`} />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PreamblePage() {
  const [data,       setData]       = useState<PreambleData | null>(null);
  const [isLoading,  setIsLoading]  = useState(true);
  // const [bookmarked, setBookmarked] = useState(false);

  const parse = <T,>(raw: unknown, fallback: T): T => {
    if (!raw) return fallback;
    if (typeof raw !== "string") return raw as T;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  };

  useEffect(() => {
    fetch("/api/preamble")
      .then((r) => r.json())
      .then((d) => {
        setData({
          officialText:      d.officialText      ?? "",
          simpleExplanation: d.simpleExplanation ?? "",
          whyItMatters:      d.whyItMatters      ?? "",
          keywords:          parse(d.keywords,      []),
          timeline:          parse(d.timeline,      []),
          quickFacts:        parse(d.quickFacts,    []),
          landmarkCases:     parse(d.landmarkCases, []),
          notes:             parse(d.notes,         []),
        });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const amendmentNotes  = data?.notes.filter((n) => n.type === "amendment")     ?? [];
  const didYouKnowNotes = data?.notes.filter((n) => n.type === "did-you-know")  ?? [];

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero ── */}
        <section className="relative `bg-gradient-to-br from-[#fdf6ec] via-[#f5ede0] to-[#ede8df] border-b border-[#d6c7a8] overflow-hidden">
          <span className="absolute -right-8 top-0 text-[180px] sm:text-[260px] font-extrabold font-serif text-[#e8d8c0]/40 select-none pointer-events-none leading-none">We</span>
          <div className="relative max-w-368 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-3 py-1 text-[11px] font-bold text-[#c48232] tracking-wide">
                Foundational Document
              </span>
              <span className="text-[#c9b99a] text-xs">·</span>
              <span className="text-[11px] text-[#9e8c73] font-medium">Adopted 26 November 1949</span>
            </div>
            <h1 className="font-extrabold text-[#1a1208] font-serif leading-none mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              The<br />Preamble
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#7a6a50] leading-relaxed max-w-xl mb-8">
              The soul of the Constitution — a single paragraph that declares who we are, what we believe, and what we promise each other as a nation.
            </p>
          </div>
        </section>

        {/* ── Main Body ── */}
        <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* ── Left Column ── */}
            <div className="flex-1 min-w-0 space-y-10">

              {/* Official Text */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Official Text</span>
                  <div className="flex-1 h-px bg-[#e8d4a0]" />
                </div>
                <div className="relative bg-white border border-[#c9b99a] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(196,130,50,0.08)]">
                  <div className="h-1.5 `bg-gradient-to-r from-[#c48232] via-[#e8a84a] to-[#c48232]" />
                  <div className="px-6 sm:px-10 py-8 sm:py-10">
                    <div className="text-7xl font-serif text-[#f0e0c4] leading-none mb-2 select-none">&quot;</div>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[100, 80, 90, 70, 85].map((w, i) => (
                          <Skeleton key={i} className={`h-4 w-[${w}%]`} />
                        ))}
                      </div>
                    ) : (
                      <p className="font-serif text-sm sm:text-base text-[#4a3c28] leading-8 whitespace-pre-wrap">
                        {data?.officialText}
                      </p>
                    )}

                    {/* ── Footer row: attribution + SPEAK BUTTON ── */}
                    <div className="mt-8 pt-6 border-t border-[#f0ece4] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-[#c48232] flex items-center justify-center shrink-0">
                          <span className="text-[#c48232] text-xs font-bold">IN</span>
                        </div>
                        <p className="text-[11px] text-[#9e8c73] font-medium">
                          Constitution of India · Adopted 26 November 1949
                        </p>
                      </div>

                      {/* Speak button — only added here, nothing else changed */}
                      {!isLoading && data?.officialText && (
                        <SpeakButton text={data.officialText} />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Plain English */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">In Plain English</span>
                  <div className="flex-1 h-px bg-[#e8d4a0]" />
                </div>
                <div className="bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-8">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm sm:text-base text-[#4a3c28] leading-8 whitespace-pre-wrap">
                        {data?.simpleExplanation}
                      </p>
                      <div className="mt-5 pt-5 border-t border-[#f0ece4]">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {["Justice", "Liberty", "Equality", "Fraternity"].map((v) => (
                            <div key={v} className="text-center bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl py-3 px-2">
                              <p className="text-xs font-bold text-[#c48232] tracking-wide">{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Why It Matters */}
              {(isLoading || data?.whyItMatters) && (
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Why It Matters</span>
                    <div className="flex-1 h-px bg-[#e8d4a0]" />
                  </div>
                  <div className="bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-8">
                    {isLoading ? (
                      <Skeleton className="h-16 w-full" />
                    ) : (
                      <p className="text-sm sm:text-base text-[#4a3c28] leading-8 whitespace-pre-wrap">
                        {data?.whyItMatters}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* Keywords */}
              {(isLoading || (data?.keywords?.length ?? 0) > 0) && (
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Key Terms</span>
                    <div className="flex-1 h-px bg-[#e8d4a0]" />
                  </div>
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data?.keywords.map((kw) => <KeywordCard key={kw.word} {...kw} />)}
                    </div>
                  )}
                </section>
              )}

              {/* Timeline */}
              {(isLoading || (data?.timeline?.length ?? 0) > 0) && (
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Historical Timeline</span>
                    <div className="flex-1 h-px bg-[#e8d4a0]" />
                  </div>
                  <div className="bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-8">
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12" />)}
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-2.75 top-2 bottom-2 w-px bg-[#e8d4a0]" />
                        <div className="space-y-6">
                          {data?.timeline.map((item, i) => (
                            <div key={i} className="flex gap-5 items-start relative">
                              <div className="shrink-0 w-6 h-6 rounded-full bg-[#fdf3e3] border-2 border-[#c48232] flex items-center justify-center relative z-10">
                                <div className="w-2 h-2 rounded-full bg-[#c48232]" />
                              </div>
                              <div className="flex-1 pb-1">
                                <span className="text-[11px] font-bold text-[#c48232] tracking-widest">{item.year}</span>
                                <p className="text-sm text-[#4a3c28] leading-relaxed mt-0.5">{item.event}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

            </div>

            {/* ── Right Sidebar ── */}
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5 lg:sticky lg:top-20 lg:self-start">

              {/* Quick Facts */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-4">Quick Facts</p>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4" />)}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data?.quickFacts.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-[#9e8c73]">{label}</span>
                        <span className="text-sm font-bold text-[#1a1208]">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Landmark Cases */}
              {(isLoading || (data?.landmarkCases?.length ?? 0) > 0) && (
                <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                  <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-4">Landmark Cases</p>
                  {isLoading ? (
                    <Skeleton className="h-24" />
                  ) : (
                    <div className="space-y-3">
                      {data?.landmarkCases.map((lc, i) => (
                        <div key={i} className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl p-4">
                          <p className="text-[10px] font-bold text-[#c48232] uppercase tracking-widest mb-1">{lc.year}</p>
                          <p className="font-bold text-sm text-[#1a1208] font-serif mb-2">{lc.name}</p>
                          <p className="text-xs text-[#7a6a50] leading-relaxed">{lc.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Amendment Notes */}
              {(isLoading || amendmentNotes.length > 0) && (
                <div className="rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-5">
                  <p className="text-[10px] font-bold text-amber-700 tracking-[2px] uppercase mb-3">Amendment Notes</p>
                  {isLoading ? (
                    <Skeleton className="h-12" />
                  ) : (
                    <div className="space-y-3">
                      {amendmentNotes.map((n, i) => (
                        <p key={i} className="text-sm text-[#7a5e00] leading-relaxed border-b border-amber-100 last:border-0 pb-3 last:pb-0">
                          {n.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Did You Know */}
              {(isLoading || didYouKnowNotes.length > 0) && (
                <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                  <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-3">Did You Know?</p>
                  {isLoading ? (
                    <Skeleton className="h-16" />
                  ) : (
                    <div className="space-y-3">
                      {didYouKnowNotes.map((n, i) => (
                        <p key={i} className="text-sm text-[#4a3c28] leading-relaxed border-b border-[#f0ece4] last:border-0 pb-3 last:pb-0">
                          {n.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </aside>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}