"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const keywords = [
  { word: "Sovereign", meaning: "India is fully independent — free from external control in both internal and foreign affairs.", icon: "◆" },
  { word: "Socialist", meaning: "The State strives for social and economic equality, reducing concentration of wealth.", icon: "◈" },
  { word: "Secular", meaning: "The State has no official religion and treats every faith with equal respect.", icon: "◇" },
  { word: "Democratic", meaning: "Government derives its authority from the people through free and fair elections.", icon: "○" },
  { word: "Republic", meaning: "The Head of State is elected by the people — not a hereditary monarch.", icon: "□" },
  { word: "Justice", meaning: "Social, economic and political fairness guaranteed to every citizen without distinction.", icon: "◉" },
  { word: "Liberty", meaning: "Freedom of thought, expression, belief, faith and worship — the bedrock of a free society.", icon: "◎" },
  { word: "Equality", meaning: "Equal status and opportunity for all, regardless of birth, caste, sex or religion.", icon: "≡" },
  { word: "Fraternity", meaning: "A spirit of brotherhood that assures the dignity of every individual and the unity of the nation.", icon: "∞" },
];

const preambleLines = [
  { text: "WE, THE PEOPLE OF INDIA,", type: "opening" },
  { text: "having solemnly resolved to constitute India into a", type: "body" },
  { text: "SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC", type: "highlight" },
  { text: "and to secure to all its citizens:", type: "body" },
  { text: "JUSTICE,", type: "value", sub: "social, economic and political;" },
  { text: "LIBERTY", type: "value", sub: "of thought, expression, belief, faith and worship;" },
  { text: "EQUALITY", type: "value", sub: "of status and of opportunity;" },
  { text: "and to promote among them all", type: "body" },
  { text: "FRATERNITY", type: "value", sub: "assuring the dignity of the individual and the unity and integrity of the Nation;" },
  { text: "IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do", type: "closing" },
  { text: "HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.", type: "closing-bold" },
];

const timeline = [
  { year: "1946", event: "Constituent Assembly formed under Cabinet Mission Plan" },
  { year: "1947", event: "Objective Resolution moved by Jawaharlal Nehru — seeds of the Preamble" },
  { year: "1949", event: "Preamble adopted on 26 November along with the Constitution" },
  { year: "1973", event: "Kesavananda Bharati case — Preamble declared part of the Constitution" },
  { year: "1976", event: "42nd Amendment added 'Socialist', 'Secular' and 'Integrity'" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ─── Keyword Card ─────────────────────────────────────────────────────────────

function KeywordCard({ word, meaning, icon }: { word: string; meaning: string; icon: string }) {
  return (
    <div className="group relative bg-white border border-[#c9b99a] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(196,130,50,0.15)] hover:border-[#c48232] overflow-hidden">
      {/* Decorative background glyph */}
      <span className="absolute top-3 right-4 text-5xl font-bold text-[#f5ede0] select-none pointer-events-none group-hover:text-[#fde8c4] transition-colors duration-300">
        {icon}
      </span>
      <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-2 relative z-10">
        Key Term
      </p>
      <p className="font-extrabold text-lg text-[#1a1208] font-serif mb-2 relative z-10">
        {word}
      </p>
      <p className="text-sm text-[#7a6a50] leading-relaxed relative z-10">
        {meaning}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PreamblePage() {
  const [bookmarked, setBookmarked] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an expert on the Indian Constitution. Answer this question about the Preamble of the Indian Constitution concisely and clearly.\n\nQuestion: ${aiQuestion}`,
          }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((i: { type: string; text?: string }) => i.type === "text" ? i.text : "").join("") || "Sorry, I couldn't get an answer.";
      setAiAnswer(text);
    } catch {
      setAiAnswer("An error occurred. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#fdf6ec] via-[#f5ede0] to-[#ede8df] border-b border-[#d6c7a8] overflow-hidden">
          {/* Decorative large text watermark */}
          <span className="absolute -right-8 top-0 text-[180px] sm:text-[260px] font-extrabold font-serif text-[#e8d8c0]/40 select-none pointer-events-none leading-none">
            We
          </span>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14">

            {/* Label row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#fdf3e3] border border-[#e0c99a] rounded-full px-3 py-1 text-[11px] font-bold text-[#c48232] tracking-wide">
                Foundational Document
              </span>
              <span className="text-[#c9b99a] text-xs">·</span>
              <span className="text-[11px] text-[#9e8c73] font-medium">Adopted 26 November 1949</span>
            </div>

            {/* Title */}
            <h1 className="font-extrabold text-[#1a1208] font-serif leading-none mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              The<br />Preamble
            </h1>

            {/* Subtitle */}
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

              {/* Official Text — styled as a document */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Official Text</span>
                  <div className="flex-1 h-px bg-[#e8d4a0]" />
                </div>

                <div className="relative bg-white border border-[#c9b99a] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(196,130,50,0.08)]">
                  {/* Top accent stripe */}
                  <div className="h-1.5 bg-gradient-to-r from-[#c48232] via-[#e8a84a] to-[#c48232]" />

                  <div className="px-6 sm:px-10 py-8 sm:py-10">
                    {/* Decorative quote mark */}
                    <div className="text-7xl font-serif text-[#f0e0c4] leading-none mb-2 select-none">"</div>

                    <div className="space-y-4 font-serif">
                      {preambleLines.map((line, i) => {
                        if (line.type === "opening") return (
                          <p key={i} className="text-base sm:text-lg font-extrabold text-[#1a1208] tracking-wide">
                            {line.text}
                          </p>
                        );
                        if (line.type === "highlight") return (
                          <p key={i} className="text-sm sm:text-base font-extrabold text-[#c48232] tracking-widest leading-relaxed border-l-4 border-[#c48232] pl-4 bg-[#fdf3e3] py-2 rounded-r-lg">
                            {line.text}
                          </p>
                        );
                        if (line.type === "value") return (
                          <div key={i} className="pl-4 border-l-2 border-[#e8d4a0]">
                            <span className="text-sm sm:text-base font-extrabold text-[#1a1208] tracking-widest">{line.text} </span>
                            <span className="text-sm text-[#7a6a50] font-normal italic">{line.sub}</span>
                          </div>
                        );
                        if (line.type === "closing-bold") return (
                          <p key={i} className="text-sm sm:text-base font-extrabold text-[#1a1208] tracking-wide pt-2">
                            {line.text}
                          </p>
                        );
                        return (
                          <p key={i} className="text-sm sm:text-base text-[#4a3c28] leading-relaxed">
                            {line.text}
                          </p>
                        );
                      })}
                    </div>

                    {/* Bottom seal decoration */}
                    <div className="mt-8 pt-6 border-t border-[#f0ece4] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-[#c48232] flex items-center justify-center">
                        <span className="text-[#c48232] text-xs font-bold">IN</span>
                      </div>
                      <p className="text-[11px] text-[#9e8c73] font-medium">Constitution of India · Adopted 26 November 1949</p>
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
                  <p className="text-sm sm:text-base text-[#4a3c28] leading-8">
                    The Preamble is the opening statement of the Constitution — its soul and identity card. Written as a single solemn sentence, it was adopted by the Constituent Assembly on 26 November 1949. It tells us three things: <strong className="text-[#1a1208]">who enacted the Constitution</strong> (We, the People), <strong className="text-[#1a1208]">what kind of state India is</strong> (Sovereign, Socialist, Secular, Democratic Republic), and <strong className="text-[#1a1208]">the four great values</strong> it promises to every citizen — Justice, Liberty, Equality, and Fraternity.
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
                </div>
              </section>

              {/* Keywords */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Key Terms</span>
                  <div className="flex-1 h-px bg-[#e8d4a0]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keywords.map((kw) => (
                    <KeywordCard key={kw.word} {...kw} />
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase">Historical Timeline</span>
                  <div className="flex-1 h-px bg-[#e8d4a0]" />
                </div>
                <div className="bg-white border border-[#c9b99a] rounded-2xl p-6 sm:p-8">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#e8d4a0]" />
                    <div className="space-y-6">
                      {timeline.map((item, i) => (
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
                </div>
              </section>

              

            </div>

            {/* ── Right Sidebar ── */}
            <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-5 lg:sticky lg:top-20 lg:self-start">

              {/* Quick Facts */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-4">Quick Facts</p>
                <div className="space-y-3">
                  {[
                    { label: "Adopted", value: "26 Nov 1949" },
                    { label: "Enforced", value: "26 Jan 1950" },
                    { label: "Amended", value: "1976 (42nd)" },
                    { label: "Words", value: "85 words" },
                    { label: "Justiciable", value: "Partly" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-[#9e8c73]">{label}</span>
                      <span className="text-sm font-bold text-[#1a1208]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Case */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-4">Landmark Case</p>
                <div className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-[#c48232] uppercase tracking-widest mb-1">1973</p>
                  <p className="font-bold text-sm text-[#1a1208] font-serif mb-2">Kesavananda Bharati</p>
                  <p className="text-xs text-[#7a6a50] leading-relaxed">The Supreme Court held that the Preamble is an integral part of the Constitution — and that its core ideals form the "basic structure" which Parliament cannot destroy.</p>
                </div>
              </div>

              {/* 42nd Amendment note */}
              <div className="rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-5">
                <p className="text-[10px] font-bold text-amber-700 tracking-[2px] uppercase mb-2">Amendment Note</p>
                <p className="text-sm text-[#7a5e00] leading-relaxed">The words <strong>Socialist</strong>, <strong>Secular</strong> and <strong>Integrity</strong> were inserted by the 42nd Constitutional Amendment Act, 1976.</p>
              </div>

              {/* Did you know */}
              <div className="rounded-2xl border border-[#c9b99a] bg-white p-5">
                <p className="text-[10px] font-bold text-[#c48232] tracking-[2px] uppercase mb-3">Did You Know?</p>
                <p className="text-sm text-[#4a3c28] leading-relaxed">The Preamble was the very last part of the Constitution to be finalised by the Constituent Assembly — debated on 17 October 1949, over two years after the Assembly first met.</p>
              </div>

            </aside>
          </div>
        </div>

        <FooterSection />
      </div>
    </>
  );
}