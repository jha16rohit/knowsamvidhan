"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TestimonialsSection from "./TestimonialsSection";

// ─── Detail Modal ─────────────────────────────────────────────────────────────

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

function PartIcon({ icon, color }: { icon: string; color: string }) {
  switch (icon) {
    case "map":    return <IconMap color={color} />;
    case "id":     return <IconId color={color} />;
    case "scale":  return <IconScale color={color} />;
    case "scroll": return <IconScroll color={color} />;
    case "shield": return <IconShield color={color} />;
    case "pillar": return <IconPillar color={color} />;
    default:       return <IconScroll color={color} />;
  }
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const partStyles: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  "Part I":     { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", icon: "map" },
  "Part II":    { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "id" },
  "Part III":   { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "scale" },
  "Part IV":    { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: "scroll" },
  "Part IV-A":  { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "shield" },
  "Part V":     { color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: "pillar" },
  "Part VI":    { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "pillar" },
  "Part VII":   { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "map" },
  "Part VIII":  { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", icon: "id" },
  "Part IX":    { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: "scale" },
  "Part IX-A":  { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "scroll" },
  "Part IX-B":  { color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: "shield" },
  "Part X":     { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", icon: "pillar" },
  "Part XI":    { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "scale" },
  "Part XII":   { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "scroll" },
  "Part XIII":  { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: "map" },
  "Part XIV":   { color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: "id" },
  "Part XV":    { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "pillar" },
  "Part XVI":   { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", icon: "scale" },
  "Part XVII":  { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "scroll" },
  "Part XVIII": { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "shield" },
  "Part XIX":   { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: "pillar" },
  "Part XX":    { color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: "map" },
  "Part XXI":   { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "scale" },
  "Part XXII":  { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", icon: "scroll" },
};

const fallbackStyle = { color: "#78716c", bg: "#f5f5f4", border: "#d6d3d1", icon: "scroll" };

const amendmentPalette = [
  { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
];

function getPaletteForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return amendmentPalette[hash % amendmentPalette.length];
}

const quickAccessData: Record<string, string> = {
  Preamble: `The Preamble to the Constitution of India is a brief introductory statement that sets out the guiding purpose, principles and philosophy of the Indian Constitution. It was adopted on 26 November 1949 and came into effect on 26 January 1950.`,
  "Fundamental Rights": "Fundamental Rights (Articles 12–35) are justiciable — enforceable in courts. The six Fundamental Rights are: Right to Equality (14–18), Right to Freedom (19–22), Right against Exploitation (23–24), Right to Freedom of Religion (25–28), Cultural and Educational Rights (29–30), and Right to Constitutional Remedies (32).",
  "Directive Principles": "Part IV (Articles 36 to 51) contains the Directive Principles of State Policy (DPSP). Though non-justiciable, they are fundamental in governance. Divided into Socialist, Gandhian, and Liberal-Intellectual principles.",
  "Recent Amendments": "Recent significant amendments: (1) 101st Amendment (2016) — GST. (2) 103rd Amendment (2019) — 10% EWS reservation. (3) 104th Amendment (2020) — Extended SC/ST reservations till 2030. (4) 106th Amendment (2023) — Women's Reservation Bill.",
  Schedules: "The Constitution has 12 Schedules. Schedule 7: Union, State, Concurrent Lists. Schedule 8: 22 recognised languages. Schedule 9: Laws protected from judicial review. Schedule 10: Anti-defection law. Schedule 11: 29 Panchayat subjects. Schedule 12: 18 Municipal subjects.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRandomItems<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function articleNumberToSlug(articleNumber: string): string {
  return articleNumber.toLowerCase().replace(/\s+/g, "-");
}

function amendmentNumberToSlug(number: string): string {
  return number.toLowerCase().replace(/\s+/g, "-");
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e7e1d5] animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-stone-100" />
        <div className="w-16 h-6 rounded-full bg-stone-100" />
      </div>
      <div className="h-4 bg-stone-100 rounded mb-2 w-3/4" />
      <div className="h-3 bg-stone-100 rounded mb-3 w-1/2" />
      <div className="h-px bg-stone-100 mb-3" />
      <div className="h-3 bg-stone-100 rounded mb-1 w-full" />
      <div className="h-3 bg-stone-100 rounded w-2/3" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const router = useRouter();
  const rotatingWords = ["the Smart Way", "Simply", "Smartly", "Effectively"];
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [modal, setModal] = useState<ModalData | null>(null);

  const [preambleData, setPreambleData] = useState<any>(null);
  const [loadingPreamble, setLoadingPreamble] = useState(true);

  const [parts, setParts] = useState<any[]>([]);
  const [loadingParts, setLoadingParts] = useState(true);
  const [displayParts, setDisplayParts] = useState<any[]>([]);

  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [amendments, setAmendments] = useState<any[]>([]);
  const [loadingAmendments, setLoadingAmendments] = useState(true);
  const [displayAmendments, setDisplayAmendments] = useState<any[]>([]);

  // ── Rotating word ───────────────────────────────────────────────────────────
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

  // ── Fetch preamble ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/preamble")
      .then((r) => r.json())
      .then(setPreambleData)
      .catch((e) => console.error("preamble fetch error:", e))
      .finally(() => setLoadingPreamble(false));
  }, []);

  // ── Fetch parts ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/parts")
      .then((r) => r.json())
      .then(setParts)
      .catch((e) => console.error("parts fetch error:", e))
      .finally(() => setLoadingParts(false));
  }, []);

  useEffect(() => {
    if (parts.length === 0) return;
    setDisplayParts(getRandomItems(parts, 6));
    const id = setInterval(() => setDisplayParts(getRandomItems(parts, 6)), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [parts]);

  // ── Fetch featured articles ─────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/featured_articles")
      .then((r) => r.json())
      .then(setFeaturedArticles)
      .catch((e) => console.error("featured articles fetch error:", e))
      .finally(() => setLoadingArticles(false));
  }, []);

  // ── Fetch amendments ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/random_amendments")
      .then((r) => r.json())
      .then(setAmendments)
      .catch((e) => console.error("amendments fetch error:", e))
      .finally(() => setLoadingAmendments(false));
  }, []);

  useEffect(() => {
    if (amendments.length === 0) return;
    setDisplayAmendments(getRandomItems(amendments, 4));
    const id = setInterval(() => setDisplayAmendments(getRandomItems(amendments, 4)), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [amendments]);

  const openModal = (data: ModalData) => setModal(data);
  const closeModal = () => setModal(null);

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
        @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .live-dot  { animation: livePulse 1.8s ease-in-out infinite; }
        .float-card{ animation: floatUp 5s ease-in-out infinite; }
        .chakra-cw { animation: chakraCW  100s linear infinite; display:block; }
        .chakra-ccw{ animation: chakraCCW  70s linear infinite; display:block; }
        .chakra-sm { animation: chakraCW   50s linear infinite; display:block; }
        * { box-sizing: border-box; }

        /* Part cards */
        .part-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; }
        .part-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.11); border-color: #c48232 !important; }
        .part-card:hover .part-arrow { transform: translateX(4px); }
        .part-arrow { transition: transform 0.2s ease; }

        /* Article cards */
        .article-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; position:relative; overflow:hidden; }
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,0.10); }
        .article-card:hover .article-arrow { transform: translateX(4px); opacity:1; }
        .article-arrow { transition: transform 0.2s ease, opacity 0.2s ease; opacity:0.4; }

        /* Amendment cards */
        .amend-card { transition: all 0.22s cubic-bezier(.4,0,.2,1); cursor:pointer; }
        .amend-card:hover { transform: translateY(-2px); box-shadow: 0 16px 44px rgba(0,0,0,0.10); border-color: #c48232 !important; }
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
        .see-all:hover { color: #ea580c !important; }

        /* Quick tag buttons */
        .tag-btn:hover { background: #1c1412 !important; color: #fff !important; border-color: #1c1412 !important; }

        /* ── LAYOUT ── */
        .hero-grid { display:flex; flex-direction:row; align-items:center; gap:64px; }
        .hero-book { width:440px; }
        .hero-h1   { font-size:72px; }
        .parts-grid        { display:grid; grid-template-columns:repeat(3,1fr); }
        .articles-grid     { display:grid; grid-template-columns:repeat(3,1fr); }
        .amendments-grid   { display:grid; grid-template-columns:repeat(4,1fr); }
        .preamble-inner    { flex-direction:row; }

        /* ── RESPONSIVE ── */
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
           HERO SECTION
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", background: "#f4ead8", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Ashoka wheel decorations */}
        <div style={{ position: "absolute", right: -320, pointerEvents: "none", zIndex: 0, opacity: 0.08 }}>
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-cw" width={900} height={900} />
        </div>
        <div style={{ position: "absolute", bottom: -208, left: -208, pointerEvents: "none", zIndex: 0, opacity: 0.06 }}>
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-ccw" width={700} height={500} />
        </div>
        <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: -160, pointerEvents: "none", zIndex: 0, opacity: 0.04 }}>
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-sm" width={480} height={280} />
        </div>

        {/* Background text watermark */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 40, pointerEvents: "none", overflow: "hidden", userSelect: "none" }}>
          {["सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
            "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र"].map((line, i) => (
            <span key={i} style={{ fontSize: "3rem", fontWeight: 900, whiteSpace: "nowrap", letterSpacing: "0.1em", lineHeight: 1, color: "rgba(90,58,8,0.04)" }}>{line}</span>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "80px 40px" }}>
          <div className="hero-grid">
            {/* Left: text content */}
            <div style={{ flex: 1, width: "100%" }}>
              <h1 className="hero-h1" style={{ fontFamily: "'Georgia', serif", fontWeight: 700, lineHeight: 1.1, color: "#111827", letterSpacing: "-0.02em", marginBottom: 0 }}>
                Learn the <br />Constitution of India,
                <br />
                <span style={{ display: "inline-block", marginTop: 8 }}>
                  <button
                    onClick={() => openModal({ title: "Learn the Constitution", badge: "About KnowSamvidhan", content: "KnowSamvidhan is India's premier platform to learn the Constitution of India in a smart, simple and effective way." })}
                    style={{
                      padding: "4px 8px", borderRadius: 12, color: "#fb923c",
                      opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)",
                      transition: "opacity 0.25s, transform 0.25s",
                      border: "none", background: "transparent", cursor: "pointer",
                      fontFamily: "'Georgia', serif", fontSize: "inherit", fontWeight: "inherit",
                    }}
                  >
                    {rotatingWords[wordIndex]}
                  </button>
                </span>
              </h1>

              <p style={{ fontSize: "1rem", color: "#737373", lineHeight: 1.78, marginBottom: 32, maxWidth: 560, fontFamily: "'DM Sans', sans-serif", marginTop: 16 }}>
                Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
                <button
                  onClick={() => openModal({ title: "About KnowSamvidhan", badge: "Platform", content: "KnowSamvidhan is built for students, citizens, and aspirants who want to learn the Constitution of India in a structured, modern, and AI-assisted way." })}
                  style={{ fontWeight: 700, color: "#1c1412", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#f97316", textUnderlineOffset: 3 }}
                >
                  KnowSamvidhan
                </button>{" "}
                — built for students, citizens, and aspirants.
              </p>

              {/* Search bar */}
              <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", border: "1px solid #ddd0b0", borderRadius: 16, padding: "14px 16px", gap: 12, marginBottom: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", cursor: "text" }}>
                <svg style={{ color: "#a3a3a3", flexShrink: 0 }} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search any Article, Amendment, or ask AI..."
                  style={{ flex: 1, background: "transparent", outline: "none", border: "none", fontSize: "0.94rem", color: "#404040", fontFamily: "'DM Sans', sans-serif", minWidth: 0 }}
                />
                <kbd style={{ display: "inline-block", fontSize: "0.67rem", color: "#a3a3a3", background: "#ede5d0", border: "1px solid #ddd0b0", borderRadius: 8, padding: "4px 10px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                  ⌘ K
                </kbd>
              </div>

              {/* Quick access tags */}
              <div className="quick-tags" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 36 }}>
                <span style={{ fontSize: "0.67rem", fontWeight: 700, color: "#a3a3a3", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Quick Access:</span>
                {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
                  <button
                    key={tag}
                    className="tag-btn"
                    style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #ddd0b0", borderRadius: 999, padding: "6px 14px", fontSize: "0.8rem", color: "#525252", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.2s" }}
                    onClick={() => openModal({ title: tag, badge: "Quick Reference", content: quickAccessData[tag] || "" })}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Stats row */}
              <div className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
                {[
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, bold: "100%", text: "Source-cited answers", detail: "Every answer cites the specific Article, Schedule, or Amendment." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, bold: "42,000+", text: "Learners onboard", detail: "Students, aspirants, lawyers, and citizens across India." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>, bold: "395", text: "Articles · 12 Schedules", detail: "The world's longest written national constitution." },
                ].map((s) => (
                  <button
                    key={s.bold}
                    onClick={() => openModal({ title: s.bold + " " + s.text, badge: "Platform Stats", content: s.detail })}
                    style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "#737373", fontFamily: "'DM Sans', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                  >
                    <span style={{ color: "#d97706" }}>{s.icon}</span>
                    <strong style={{ color: "#111827", fontWeight: 600 }}>{s.bold}</strong>
                    <span>{s.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Book image */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => openModal({ title: "The Constitution of India", badge: "About the Document", content: "The Constitution of India is the supreme law of the land. Adopted on 26 November 1949, it is the world's longest written national constitution with 395 Articles, 12 Schedules, 22 Parts, and 106 Amendments." })}
              >
                <div style={{ position: "absolute", inset: -32, zIndex: -1, filter: "blur(48px)", borderRadius: "50%", background: "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "75%", height: 32, filter: "blur(24px)", borderRadius: "50%", zIndex: -1, background: "rgba(120,80,10,0.18)" }} />
                <img
                  src="image/book.png"
                  alt="Constitution of India"
                  className="float-card hero-book"
                  style={{ position: "relative", zIndex: 10, objectFit: "contain", filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.28))", borderRadius: 20 }}
                />
                <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", color: "#a3a3a3", letterSpacing: "0.18em", textTransform: "uppercase" }}>सत्यमेव जयते</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           PREAMBLE SECTION
      ══════════════════════════════════════════ */}
      <section className="section-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px 16px" }}>
        <div
          className="preamble-banner"
          onClick={() => router.push("/user_preamble")}
          style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: "linear-gradient(135deg, #1c0f00 0%, #3d1f00 50%, #1c0f00 100%)", border: "1px solid #5a3a10" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none", backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 40%)" }} />
          <div style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", opacity: 0.06, pointerEvents: "none", userSelect: "none" }} className="hidden-mobile">
            <img src="image/ashoka.png" alt="" width={220} height={220} />
          </div>

          <div className="preamble-inner" style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 48, padding: "48px" }}>
            {/* Accent column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }} className="preamble-accent">
              <div style={{ width: 3, height: 60, background: "linear-gradient(to bottom, transparent, #f97316, transparent)", borderRadius: 99 }} />
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid rgba(249,115,22,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, color: "#f97316" }}>॥</span>
              </div>
              <div style={{ width: 3, height: 60, background: "linear-gradient(to bottom, transparent, #f97316, transparent)", borderRadius: 99 }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316" }} />
                <span className="section-label" style={{ color: "#f97316", fontFamily: "'DM Sans', sans-serif" }}>Foundational Document</span>
              </div>
              <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.2, fontFamily: "'Georgia', serif" }}>
                Begin with the Preamble
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#a8a29e", lineHeight: 1.7, marginBottom: 20, maxWidth: 520, fontFamily: "'DM Sans', sans-serif" }}>
                {loadingPreamble
                  ? "Loading Preamble..."
                  : (preambleData?.simpleExplanation || "A single sentence that defines who we are as a nation. Justice, Liberty, Equality, Fraternity — the four pillars every citizen must know.")}
              </p>
              <blockquote className="preamble-quote" style={{ fontSize: "0.83rem", color: "#78716c", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", lineHeight: 1.7, marginBottom: 24, paddingLeft: 16, borderLeft: "2px solid rgba(249,115,22,0.4)" }}>
                {loadingPreamble
                  ? "Loading..."
                  : (preambleData?.officialText || `"WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC…"`)}
              </blockquote>
              <div
                className="preamble-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 12, fontSize: "0.875rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: "#f97316", color: "#fff" }}
              >
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
      <section className="section-wrap" style={{ maxWidth: "100%", padding: "64px 32px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className="section-label" style={{ color: "#f97316", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Chapters</p>
            <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#1c1917", lineHeight: 1.2, fontFamily: "'Georgia', serif", margin: 0 }}>
              Browse by Parts
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#a8a29e", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
              The Constitution is organised into 22 Parts. Pick a chapter.
            </p>
          </div>
          <button
            onClick={() => router.push("/user_parts")}
            className="see-all"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#78716c", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer", transition: "color 0.18s" }}
          >
            View all Parts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="parts-grid" style={{ gap: 16 }}>
          {loadingParts
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : displayParts.map((p) => {
                const style = partStyles[p.partNumber] ?? fallbackStyle;
                return (
                  <div
                    key={p.id}
                    className="part-card"
                    style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #c58428" }}
                    onClick={() => router.push(`/user_parts/${p.id}`)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: style.bg, border: `1px solid ${style.border}` }}>
                        <PartIcon icon={style.icon} color={style.color} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", padding: "4px 10px", borderRadius: 999, color: style.color, background: style.bg, border: `1px solid ${style.border}` }}>
                        {p.partNumber}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#1c1917", marginBottom: 4, lineHeight: 1.35, fontFamily: "'DM Sans', sans-serif" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.75rem", color: "#a8a29e", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{p.range}</p>
                    <div style={{ height: 1, background: "#f5f5f4", marginBottom: 12 }} />
                    <p style={{ fontSize: "0.75rem", color: "#78716c", lineHeight: 1.6, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", fontWeight: 600, color: style.color, fontFamily: "'DM Sans', sans-serif" }}>
                      Explore
                      <svg className="part-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           FEATURED ARTICLES
      ══════════════════════════════════════════ */}
      <section className="section-wrap" style={{ maxWidth: "100%", padding: "64px 32px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className="section-label" style={{ color: "#f97316", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Featured</p>
            <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#1c1917", lineHeight: 1.2, fontFamily: "'Georgia', serif", margin: 0 }}>
              Articles to start with
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#a8a29e", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>Landmark articles every citizen should know.</p>
          </div>
          <button
            onClick={() => router.push("/user_articles")}
            className="see-all"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#78716c", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer", transition: "color 0.18s" }}
          >
            View all Articles
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="articles-grid" style={{ gap: 20 }}>
          {loadingArticles
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : featuredArticles.length === 0
            ? (
              <p style={{ fontSize: "0.875rem", color: "#a8a29e", fontFamily: "'DM Sans', sans-serif", gridColumn: "1/-1" }}>
                No featured articles yet. Mark some as featured from the admin panel.
              </p>
            )
            : featuredArticles.map((a, idx) => {
                const partStyle = a.part?.partNumber
                  ? (partStyles[a.part.partNumber] ?? amendmentPalette[idx % amendmentPalette.length])
                  : amendmentPalette[idx % amendmentPalette.length];
                const color  = (partStyle as any).color;
                const bg     = (partStyle as any).bg;
                const border = (partStyle as any).border;
                const slug   = articleNumberToSlug(a.articleNumber);

                return (
                  <div
                    key={a.id}
                    className="article-card"
                    style={{ borderRadius: 16, padding: "24px 28px", background: bg, border: `1px solid ${border}` }}
                    onClick={() => router.push(`/user_articles/${slug}`)}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.7)", color, border: `1px solid ${border}` }}>
                        {a.part?.title ?? "Constitution"}
                      </span>
                      <span style={{ fontSize: "1.875rem", fontWeight: 900, lineHeight: 1, fontFamily: "'Georgia', serif", color, opacity: 0.15 }}>
                        {idx + 1}
                      </span>
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", color }}>{a.articleNumber}</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, color: "#1c1917", marginBottom: 12, lineHeight: 1.25, fontFamily: "'Georgia', serif" }}>{a.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#57534e", lineHeight: 1.6, marginBottom: 24, fontFamily: "'DM Sans', sans-serif", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {a.shortSummary ?? a.simpleExplanation ?? ""}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 600, color, fontFamily: "'DM Sans', sans-serif" }}>
                      Read article
                      <svg className="article-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           IMPORTANT AMENDMENTS
      ══════════════════════════════════════════ */}
      <section className="section-wrap" style={{ maxWidth: "100%", padding: "64px 32px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className="section-label" style={{ color: "#f97316", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Timeline</p>
            <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#1c1917", lineHeight: 1.2, fontFamily: "'Georgia', serif", margin: 0 }}>
              Important Amendments
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#a8a29e", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>Key moments that shaped the Constitution.</p>
          </div>
          <button
            onClick={() => router.push("/user_amendments")}
            className="see-all"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#78716c", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer", transition: "color 0.18s" }}
          >
            See full timeline
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="amendments-grid" style={{ gap: 16 }}>
          {loadingAmendments
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : displayAmendments.map((a) => {
                const palette = getPaletteForId(a.id);
                const slug    = amendmentNumberToSlug(a.number);
                return (
                  <div
                    key={a.id}
                    className="amend-card"
                    style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, border: "1px solid #f1cf9e" }}
                    onClick={() => router.push(`/user_amendments/${slug}`)}
                  >
                    {/* Year chip + number watermark */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", borderRadius: 999, background: palette.bg, color: palette.color, border: `1px solid ${palette.border}` }}>
                        {a.year}
                      </span>
                      <span style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1, fontFamily: "'Georgia', serif", color: palette.color, opacity: 0.1 }}>
                        {a.number}
                      </span>
                    </div>

                    {/* Left accent bar */}
                    <div style={{ paddingLeft: 12, borderLeft: `3px solid ${palette.color}` }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: 4, color: palette.color }}>
                        {a.number} Amendment
                      </p>
                      <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#1c1917", lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{a.title}</h3>
                    </div>

                    {/* Summary */}
                    <p style={{ fontSize: "0.75rem", color: "#78716c", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{a.summary}</p>

                    {/* CTA */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", fontWeight: 600, color: palette.color, fontFamily: "'DM Sans', sans-serif", marginTop: "auto" }}>
                      Learn more
                      <svg className="amend-arrow" width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           TESTIMONIALS
      ══════════════════════════════════════════ */}
      <TestimonialsSection />

      <div style={{ paddingBottom: 64 }} />
    </>
  );
}