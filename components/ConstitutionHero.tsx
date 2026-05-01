"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Detail Modal (kept for hero section quick-access tags only) ──────────────

interface ModalData {
  title: string;
  badge: string;
  badgeColor?: string;
  content: string;
  year?: string;
}

function DetailModal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(20,12,4,0.65)",
        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, padding: "36px 32px 32px",
          maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto",
          boxShadow: "0 32px 100px rgba(20,12,4,0.30)", position: "relative",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, background: "#fef3e2",
            border: "none", borderRadius: "50%", width: 34, height: 34,
            cursor: "pointer", fontSize: 22, color: "#92400e",
            display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
          }}
          aria-label="Close"
        >×</button>

        {data.year && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#78716c", letterSpacing: 1 }}>{data.year}</span>
          </div>
        )}

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: data.badgeColor || "#fef3e2", border: `1px solid ${data.badgeColor ? data.badgeColor : "#fed7aa"}`,
          borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700,
          color: "#c2410c", marginBottom: 14, letterSpacing: 0.8, textTransform: "uppercase",
        }}>
          {data.badge}
        </div>

        <div style={{
          fontWeight: 800, fontSize: 22, color: "#1c0f00",
          fontFamily: "'Georgia', serif", lineHeight: 1.2, marginBottom: 16, paddingRight: 28,
        }}>
          {data.title}
        </div>

        <p style={{ fontSize: 14, color: "#44332a", lineHeight: 1.82, margin: 0 }}>
          {data.content}
        </p>
      </div>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconMap = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const IconId = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M14 9h4M14 12h4M14 15h2" />
  </svg>
);

const IconScale = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 9l9-6 9 6M5 12l-2 5h4l-2-5zM19 12l-2 5h4l-2-5z" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </svg>
);

const IconScroll = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const IconShield = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconPillar = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="3" rx="1" />
    <rect x="3" y="18" width="18" height="3" rx="1" />
    <rect x="6" y="6" width="2" height="12" />
    <rect x="11" y="6" width="2" height="12" />
    <rect x="16" y="6" width="2" height="12" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const preambleDetail = `The Preamble to the Constitution of India is a brief introductory statement that sets out the guiding purpose, principles and philosophy of the Indian Constitution. It was adopted on 26 November 1949 along with the rest of the Constitution and came into effect on 26 January 1950.`;

const partsData = [
  { slug: "part-i",    part: "Part I",    title: "The Union and its Territory", articles: "Articles 1–4",    icon: "map",    color: "#f97316", bg: "#fff7ed", border: "#fed7aa", preview: "Defines India as a Union of States. Parliament can form new States and alter existing boundaries." },
  { slug: "part-ii",   part: "Part II",   title: "Citizenship",                 articles: "Articles 5–11",   icon: "id",     color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", preview: "Determines who were citizens at commencement and empowers Parliament to regulate citizenship." },
  { slug: "part-iii",  part: "Part III",  title: "Fundamental Rights",          articles: "Articles 12–35",  icon: "scale",  color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", preview: "The Magna Carta of India — six categories of rights guaranteed to every citizen and person." },
  { slug: "part-iv",   part: "Part IV",   title: "Directive Principles",        articles: "Articles 36–51",  icon: "scroll", color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", preview: "Non-justiciable guidelines for governance — the conscience of the Constitution." },
  { slug: "part-iv-a", part: "Part IV-A", title: "Fundamental Duties",          articles: "Article 51A",     icon: "shield", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", preview: "11 moral obligations for every citizen — added by the 42nd Amendment in 1976." },
  { slug: "part-v",    part: "Part V",    title: "The Union",                   articles: "Articles 52–151", icon: "pillar", color: "#b45309", bg: "#fffbeb", border: "#fde68a", preview: "President, Parliament, Supreme Court, and CAG — the complete structure of Union Government." },
];

const articlesData = [
  { slug: "article-14", number: "Art. 14", title: "Equality Before Law",          part: "Fundamental Rights", color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd", desc: "No person shall be denied equality before law or equal protection of laws within India." },
  { slug: "article-19", number: "Art. 19", title: "Six Freedoms",                 part: "Fundamental Rights", color: "#0891b2", bg: "#ecfeff", border: "#67e8f9", desc: "Speech, assembly, movement, residence, and profession — six freedoms for every citizen." },
  { slug: "article-21", number: "Art. 21", title: "Right to Life & Liberty",      part: "Fundamental Rights", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", desc: "No person shall be deprived of life or personal liberty except by procedure established by law." },
];

const amendmentsData = [
  { slug: "1st-amendment",  number: "1st",  year: "1951", title: "Land Reform Shield",     color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", desc: "Added Ninth Schedule to protect land reform laws. Modified speech restrictions to add public order." },
  { slug: "42nd-amendment", number: "42nd", year: "1976", title: "The Mini Constitution",  color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", desc: "Added Socialist, Secular to Preamble. Inserted Fundamental Duties. Called the Mini Constitution." },
  { slug: "44th-amendment", number: "44th", year: "1978", title: "Democratic Restoration", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", desc: "Removed Right to Property from Fundamental Rights. Restored 5-year term for Lok Sabha." },
  { slug: "73rd-amendment", number: "73rd", year: "1992", title: "Panchayati Raj",         color: "#f97316", bg: "#fff7ed", border: "#fed7aa", desc: "Gave constitutional status to Panchayati Raj. Three-tier system with reserved seats for women." },
];

const quickAccessData: Record<string, string> = {
  Preamble: preambleDetail,
  "Fundamental Rights": "Fundamental Rights (Articles 12–35) are justiciable — enforceable in courts. The six Fundamental Rights are: Right to Equality (14–18), Right to Freedom (19–22), Right against Exploitation (23–24), Right to Freedom of Religion (25–28), Cultural and Educational Rights (29–30), and Right to Constitutional Remedies (32).",
  "Directive Principles": "Part IV (Articles 36 to 51) contains the Directive Principles of State Policy (DPSP). Though non-justiciable, they are fundamental in governance. Divided into Socialist, Gandhian, and Liberal-Intellectual principles.",
  "Recent Amendments": "Recent significant amendments: (1) 101st Amendment (2016) — GST. (2) 103rd Amendment (2019) — 10% EWS reservation. (3) 104th Amendment (2020) — Extended SC/ST reservations till 2030. (4) 106th Amendment (2023) — Women's Reservation Bill.",
  Schedules: "The Constitution has 12 Schedules. Schedule 7: Union, State, Concurrent Lists. Schedule 8: 22 recognised languages. Schedule 9: Laws protected from judicial review. Schedule 10: Anti-defection law. Schedule 11: 29 Panchayat subjects. Schedule 12: 18 Municipal subjects.",
};

// ─── Helper to render part icon ───────────────────────────────────────────────

function PartIcon({ icon, color }: { icon: string; color: string }) {
  switch (icon) {
    case "map":    return <IconMap color={color} />;
    case "id":     return <IconId color={color} />;
    case "scale":  return <IconScale color={color} />;
    case "scroll": return <IconScroll color={color} />;
    case "shield": return <IconShield color={color} />;
    case "pillar": return <IconPillar color={color} />;
    default:       return null;
  }
}

// ─── Main Hero Component ───────────────────────────────────────────────────────

export default function Hero() {
  const router = useRouter();
  const rotatingWords = ["the Smart Way", "Simply", "Smartly", "Effectively"];
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [modal, setModal] = useState<ModalData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setAnimating(false);
      }, 250);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const openModal = (data: ModalData) => setModal(data);
  const closeModal = () => setModal(null);

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
        @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .live-dot  { animation: livePulse 1.8s ease-in-out infinite; }
        .float-card{ animation: floatUp 5s ease-in-out infinite; }
        .chakra-cw { animation: chakraCW  100s linear infinite; display:block; }
        .chakra-ccw{ animation: chakraCCW  70s linear infinite; display:block; }
        .chakra-sm { animation: chakraCW   50s linear infinite; display:block; }
        .clickable-card { transition: all 0.2s ease; cursor: pointer; }
        .clickable-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.10); }
        .tag-btn:hover { background: #1c1412 !important; color: #fff !important; border-color: #1c1412 !important; }
        * { box-sizing: border-box; }

        /* Part cards */
        .part-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; }
        .part-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.11); }
        .part-card:hover .part-arrow { transform: translateX(4px); }
        .part-arrow { transition: transform 0.2s ease; }

        /* Article cards */
        .article-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; position:relative; overflow:hidden; }
        .article-card::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity 0.2s; border-radius:inherit; }
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,0.10); }
        .article-card:hover .article-arrow { transform: translateX(4px); opacity:1; }
        .article-arrow { transition: transform 0.2s ease, opacity 0.2s ease; opacity:0.4; }

        /* Amendment cards */
        .amend-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; }
        .amend-card:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,0.10); }
        .amend-card:hover .amend-arrow { transform: translateX(4px); }
        .amend-arrow { transition: transform 0.2s ease; }

        /* Section label */
        .section-label { letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px; font-weight: 700; }

        /* Preamble banner */
        .preamble-banner { transition: all 0.25s ease; cursor:pointer; }
        .preamble-banner:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(180,100,0,0.16); }
        .preamble-banner:hover .preamble-cta { background: #ea580c !important; }
        .preamble-cta { transition: background 0.18s ease; }

        /* See all link */
        .see-all { transition: all 0.18s ease; }
        .see-all:hover { color: #ea580c !important; gap: 8px !important; }

        /* ── RESPONSIVE ── */
        .hero-grid { display:flex; flex-direction:row; align-items:center; gap:64px; }
        .hero-book { width:440px; }
        .hero-h1   { font-size:72px; }
        .parts-grid        { grid-template-columns: repeat(3,1fr); }
        .articles-grid     { grid-template-columns: repeat(3,1fr); }
        .amendments-grid   { grid-template-columns: repeat(4,1fr); }
        .preamble-inner    { flex-direction:row; }

        @media (max-width:1280px) {
          .hero-h1 { font-size:60px !important; }
          .hero-book { width:380px !important; }
          .hero-grid { gap:48px; }
        }
        @media (max-width:1024px) {
          .hero-h1 { font-size:52px !important; }
          .hero-book { width:320px !important; }
          .hero-grid { gap:36px; }
          .amendments-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width:900px) {
          .hero-grid { flex-direction:column !important; gap:32px; }
          .hero-h1 { font-size:46px !important; }
          .hero-book { width:280px !important; }
          .parts-grid { grid-template-columns:repeat(2,1fr) !important; }
          .articles-grid { grid-template-columns:repeat(2,1fr) !important; }
          .amendments-grid { grid-template-columns:repeat(2,1fr) !important; }
          .preamble-inner { flex-direction:column !important; gap:24px !important; }
        }
        @media (max-width:768px) {
          .hero-h1 { font-size:40px !important; }
          .section-wrap { padding-left:16px !important; padding-right:16px !important; }
        }
        @media (max-width:640px) {
          .hero-h1 { font-size:34px !important; }
          .parts-grid { grid-template-columns:1fr !important; }
          .articles-grid { grid-template-columns:1fr !important; }
          .amendments-grid { grid-template-columns:1fr !important; }
          .hero-stats { flex-direction:column !important; gap:12px !important; }
          .hero-cta { flex-direction:column !important; }
          .hero-cta button { width:100%; justify-content:center; }
          .preamble-quote { display:none !important; }
        }
        @media (max-width:430px) {
          .hero-h1 { font-size:28px !important; }
          .hero-book { width:220px !important; }
          .quick-tags { gap:6px !important; }
        }
        @media (max-width:375px) {
          .hero-h1 { font-size:25px !important; }
        }
      `}</style>

      {modal && <DetailModal data={modal} onClose={closeModal} />}

      {/* ══════════════════════════════════════════
           HERO SECTION — UNTOUCHED
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">
        <div className="absolute -right-80 pointer-events-none z-0 opacity-[0.08]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-cw" width={900} height={900} />
        </div>
        <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-ccw" width={700} height={500} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-sm" width={480} height={280} />
        </div>
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none">
          {["सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
            "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र"].map((line, i) => (
            <span key={i} className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none" style={{ color: "rgba(90,58,8,0.04)" }}>{line}</span>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
          <div className="hero-grid">
            <div className="w-full lg:flex-1">
              <h1 className="hero-h1 font-bold leading-[1.1] text-gray-900 mb-0" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
                Learn the <br />Constitution of India,
                <br />
                <span className="inline-block mt-2">
                  <button
                    onClick={() => openModal({ title: "Learn the Constitution", badge: "About KnowSamvidhan", content: "KnowSamvidhan is India's premier platform to learn the Constitution of India in a smart, simple and effective way. Whether you are a student preparing for UPSC, a law aspirant, a citizen curious about your rights, or a teacher — KnowSamvidhan has resources for you." })}
                    className="px-2 py-1 rounded-xl text-orange-400 transition-all duration-300"
                    style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", border: "none", fontFamily: "'Georgia', serif", fontSize: "inherit", fontWeight: "inherit", cursor: "pointer" }}
                  >
                    {rotatingWords[wordIndex]}
                  </button>
                </span>
              </h1>
              <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-xl font-['DM_Sans'] mt-4">
                Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
                <button onClick={() => openModal({ title: "About KnowSamvidhan", badge: "Platform", content: "KnowSamvidhan is built for students, citizens, and aspirants who want to learn the Constitution of India in a structured, modern, and AI-assisted way." })}
                  style={{ fontWeight: 700, color: "#1c1412", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#f97316", textUnderlineOffset: 3 }}>
                  KnowSamvidhan
                </button>{" "}
                — built for students, citizens, and aspirants.
              </p>
              <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.10)]" style={{ cursor: "text" }}>
                <svg className="text-neutral-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Search any Article, Amendment, or ask AI..." className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0" />
                <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">⌘ K</kbd>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-9 quick-tags">
                <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">Quick Access:</span>
                {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
                  <button key={tag} className="tag-btn bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
                    onClick={() => openModal({ title: tag, badge: "Quick Reference", content: quickAccessData[tag] || "" })}>
                    {tag}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 sm:gap-8 hero-stats">
                {[
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, bold: "100%", text: "Source-cited answers", detail: "Every answer cites the specific Article, Schedule, or Amendment." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, bold: "42,000+", text: "Learners onboard", detail: "Students, aspirants, lawyers, and citizens across India." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>, bold: "395", text: "Articles · 12 Schedules", detail: "The world's longest written national constitution." },
                ].map((s) => (
                  <button key={s.bold} onClick={() => openModal({ title: s.bold + " " + s.text, badge: "Platform Stats", content: s.detail })}
                    className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans'] hover:text-neutral-800 transition-colors"
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <span className="text-amber-600">{s.icon}</span>
                    <strong className="text-neutral-900 font-semibold">{s.bold}</strong>
                    <span>{s.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-end">
              <div className="relative" onClick={() => openModal({ title: "The Constitution of India", badge: "About the Document", content: "The Constitution of India is the supreme law of the land. Adopted on 26 November 1949, it is the world's longest written national constitution with 395 Articles, 12 Schedules, 22 Parts, and 106 Amendments." })} style={{ cursor: "pointer" }}>
                <div className="absolute -inset-8 -z-10 blur-3xl rounded-full" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10" style={{ background: "rgba(120,80,10,0.18)" }} />
                <img src="image/book.png" alt="Constitution of India" className="float-card hero-book relative z-10 object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.28)]" style={{ borderRadius: "20px" }} />
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[0.75rem] font-['DM_Sans'] text-neutral-400 tracking-[0.18em] uppercase">सत्यमेव जयते</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           PREAMBLE SECTION
      ══════════════════════════════════════════ */}
      <section className="section-wrap max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-4">
        <div
          className="preamble-banner relative rounded-3xl overflow-hidden"
          onClick={() => router.push("/user_preamble")}
          style={{ background: "linear-gradient(135deg, #1c0f00 0%, #3d1f00 50%, #1c0f00 100%)", border: "1px solid #5a3a10" }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 40%)",
          }} />
          {/* Ashoka wheel watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none hidden md:block">
            <img src="image/ashoka.png" alt="" width={220} height={220} />
          </div>

          <div className="preamble-inner relative z-10 flex items-center gap-8 sm:gap-12 p-8 sm:p-10 lg:p-12">
            {/* Left accent */}
            <div className="hidden sm:flex shrink-0 flex-col items-center gap-3">
              <div style={{ width: 3, height: 60, background: "linear-gradient(to bottom, transparent, #f97316, transparent)", borderRadius: 99 }} />
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid rgba(249,115,22,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, color: "#f97316" }}>॥</span>
              </div>
              <div style={{ width: 3, height: 60, background: "linear-gradient(to bottom, transparent, #f97316, transparent)", borderRadius: 99 }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 live-dot" />
                <span className="section-label font-['DM_Sans']" style={{ color: "#f97316" }}>Foundational Document</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Begin with the Preamble
              </h2>
              <p className="text-sm sm:text-base text-stone-400 leading-relaxed mb-5 max-w-xl font-['DM_Sans']">
                A single sentence that defines who we are as a nation. Justice, Liberty, Equality, Fraternity — the four pillars every citizen must know.
              </p>
              <blockquote className="preamble-quote text-xs sm:text-sm text-stone-500 font-['DM_Sans'] italic leading-relaxed mb-6 pl-4" style={{ borderLeft: "2px solid rgba(249,115,22,0.4)" }}>
                "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC…"
              </blockquote>
              <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold font-['DM_Sans'] preamble-cta"
                style={{ background: "#f97316", color: "#fff" }}>
                Read the Preamble
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           BROWSE BY PARTS
      ══════════════════════════════════════════ */}
      <section className="section-wrap max-w-full mx-auto px-6 sm:px-8 pt-16 pb-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="section-label font-['DM_Sans'] text-orange-500 mb-2">Chapters</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Browse by Parts
            </h2>
            <p className="text-sm text-stone-400 mt-1.5 font-['DM_Sans']">
              The Constitution is organised into 22 Parts. Pick a chapter.
            </p>
          </div>
          <button
            onClick={() => router.push("/user_parts")}
            className="see-all flex items-center gap-1.5 text-sm font-semibold text-stone-500 font-['DM_Sans'] whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            View all Parts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="parts-grid grid gap-4">
          {partsData.map((p) => (
            <div
              key={p.slug}
              className="part-card bg-white rounded-2xl p-5 sm:p-6 border border-[#c58428] hover:border-[#c48232] transition-all duration-200 hover:shadow-md"
              onClick={() => router.push(`/user_parts/${p.slug}`)}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                  <PartIcon icon={p.icon} color={p.color} />
                </div>
                <span className="text-[10px] font-bold tracking-widest font-['DM_Sans'] px-2.5 py-1 rounded-full"
                  style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>
                  {p.part}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug font-['DM_Sans']">{p.title}</h3>
              <p className="text-xs text-stone-400 mb-3 font-['DM_Sans']">{p.articles}</p>

              {/* Divider */}
              <div className="h-px bg-stone-100 mb-3" />

              {/* Preview */}
              <p className="text-xs text-stone-500 leading-relaxed mb-4 font-['DM_Sans'] line-clamp-2">{p.preview}</p>

              {/* CTA */}
              <div className="flex items-center gap-1 text-xs font-semibold font-['DM_Sans']" style={{ color: p.color }}>
                Explore
                <svg className="part-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           FEATURED ARTICLES
      ══════════════════════════════════════════ */}
      <section className="section-wrap max-w-full mx-auto px-6 sm:px-8 pt-16 pb-4">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="section-label font-['DM_Sans'] text-orange-500 mb-2">Featured</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Articles to start with
            </h2>
            <p className="text-sm text-stone-400 mt-1.5 font-['DM_Sans']">Three landmark articles every citizen should know.</p>
          </div>
          <button
            onClick={() => router.push("/user_articles")}
            className="see-all flex items-center gap-1.5 text-sm font-semibold text-stone-500 font-['DM_Sans'] whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            View all Articles
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="articles-grid grid gap-5">
          {articlesData.map((a, idx) => (
            <div
              key={a.slug}
              className="article-card rounded-2xl p-6 sm:p-7"
              style={{ background: a.bg, border: `1px solid ${a.border}` }}
              onClick={() => router.push(`/user_articles/${a.slug}`)}
            >
              {/* Article badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold tracking-widest font-['DM_Sans'] px-3 py-1.5 rounded-full bg-white/70"
                  style={{ color: a.color, border: `1px solid ${a.border}` }}>
                  {a.part}
                </span>
                <span className="text-3xl font-black font-['Georgia'] leading-none" style={{ color: a.color, opacity: 0.15 }}>
                  {idx + 1}
                </span>
              </div>

              {/* Number + title */}
              <div className="mb-1">
                <span className="text-xs font-bold font-['DM_Sans'] tracking-wider" style={{ color: a.color }}>{a.number}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 leading-snug font-['Georgia']">{a.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6 font-['DM_Sans'] line-clamp-3">{a.desc}</p>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-xs font-semibold font-['DM_Sans']" style={{ color: a.color }}>
                Read article
                <svg className="article-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           IMPORTANT AMENDMENTS
      ══════════════════════════════════════════ */}
      <section className="section-wrap max-w-full mx-auto px-6 sm:px-8 pt-16 pb-20">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="section-label font-['DM_Sans'] text-orange-500 mb-2">Timeline</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Important Amendments
            </h2>
            <p className="text-sm text-stone-400 mt-1.5 font-['DM_Sans']">Key moments that shaped the Constitution.</p>
          </div>
          <button
            onClick={() => router.push("/user_amendments")}
            className="see-all flex items-center gap-1.5 text-sm font-semibold text-stone-500 font-['DM_Sans'] whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            See full timeline
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="amendments-grid grid gap-4">
          {amendmentsData.map((a) => (
            <div
              key={a.slug}
              className="amend-card bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-[#f1cf9e] hover:border-[#c48232] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              onClick={() => router.push(`/user_amendments/${a.slug}`)}
            >
              {/* Year chip + number */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-['DM_Sans'] px-3 py-1.5 rounded-full"
                  style={{ background: a.bg, color: a.color, border: `1px solid ${a.border}` }}>
                  {a.year}
                </span>
                <span className="text-4xl font-black leading-none font-['Georgia']" style={{ color: a.color, opacity: 0.1 }}>
                  {a.number}
                </span>
              </div>

              {/* Left accent bar + title */}
              <div className="pl-3" style={{ borderLeft: `3px solid ${a.color}` }}>
                <p className="text-[10px] font-bold tracking-widest font-['DM_Sans'] uppercase mb-1" style={{ color: a.color }}>
                  {a.number} Amendment
                </p>
                <h3 className="text-base font-bold text-stone-900 leading-snug font-['DM_Sans']">{a.title}</h3>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-500 leading-relaxed font-['DM_Sans'] flex-1">{a.desc}</p>

              {/* CTA */}
              <div className="flex items-center gap-1 text-xs font-semibold font-['DM_Sans'] mt-auto" style={{ color: a.color }}>
                Learn more
                <svg className="amend-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}