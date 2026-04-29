// "use client";

// import FooterSection from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useState } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Part {
//   number: string;
//   title: string;
//   articles: string;
//   description: string;
//   articleCount: number;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const parts: Part[] = [
//   {
//     number: "PART I",
//     title: "The Union and its Territory",
//     articles: "Articles 1 – 4",
//     description: "Defines India as a Union of States and provides for admission, formation and alteration of States.",
//     articleCount: 1,
//   },
//   {
//     number: "PART II",
//     title: "Citizenship",
//     articles: "Articles 5 – 11",
//     description: "Lays down who is a citizen of India at the commencement of the Constitution and Parliament's power to regulate citizenship.",
//     articleCount: 1,
//   },
//   {
//     number: "PART III",
//     title: "Fundamental Rights",
//     articles: "Articles 12 – 35",
//     description: "The cornerstone of individual liberty — equality, freedom, life, religion and constitutional remedies.",
//     articleCount: 5,
//   },
//   {
//     number: "PART IV",
//     title: "Directive Principles of State Policy",
//     articles: "Articles 36 – 51",
//     description: "Non-justiciable guidelines for the State to build a just social and economic order.",
//     articleCount: 1,
//   },
//   {
//     number: "PART IV-A",
//     title: "Fundamental Duties",
//     articles: "Article 51A",
//     description: "Eleven moral duties of every Indian citizen, added by the 42nd Amendment.",
//     articleCount: 1,
//   },
//   {
//     number: "PART V",
//     title: "The Union",
//     articles: "Articles 52 – 151",
//     description: "Structure of the Union government — President, Parliament, Supreme Court and the CAG.",
//     articleCount: 0,
//   },
//   {
//     number: "PART VI",
//     title: "The States",
//     articles: "Articles 152 – 237",
//     description: "Governance of States — Governor, State Legislature and High Courts.",
//     articleCount: 0,
//   },
// ];

// // ─── Part Card ────────────────────────────────────────────────────────────────

// function PartCard({ part }: { part: Part }) {
//   const [hovered, setHovered] = useState(false);

//   return (
    
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "#fff",
//         border: "1px solid #ede8df",
//         borderRadius: 16,
//         padding: "24px",
//         cursor: "pointer",
//         transition: "all 0.2s ease",
//         boxShadow: hovered
//           ? "0 8px 28px rgba(196,130,50,0.12)"
//           : "0 1px 4px rgba(0,0,0,0.05)",
//         display: "flex",
//         flexDirection: "column" as const,
//         gap: 0,
//         position: "relative" as const,
//       }}
//     >
//       {/* Article count badge — top right */}
//       <div
//         style={{
//           position: "absolute" as const,
//           top: 20,
//           right: 20,
//           background: "#fdf3e3",
//           border: "1px solid #e8d4a0",
//           borderRadius: 20,
//           padding: "3px 10px",
//           fontSize: 11,
//           fontWeight: 600,
//           color: "#c48232",
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {part.articleCount} articles
//       </div>

//       {/* Icon */}
//       <div
//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 10,
//           background: "#fdf3e3",
//           border: "1px solid #e8d4a0",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 18,
//           marginBottom: 20,
//           flexShrink: 0,
//         }}
//       >
//         📖
//       </div>

//       {/* Part number */}
//       <div
//         style={{
//           fontSize: 11,
//           fontWeight: 700,
//           color: "#c48232",
//           letterSpacing: 0.8,
//           textTransform: "uppercase" as const,
//           marginBottom: 4,
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {part.number}
//       </div>

//       {/* Title */}
//       <div
//         style={{
//           fontWeight: 800,
//           fontSize: 20,
//           color: "#1a1208",
//           lineHeight: 1.2,
//           marginBottom: 6,
//           fontFamily: "'Georgia', serif",
//         }}
//       >
//         {part.title}
//       </div>

//       {/* Articles range */}
//       <div
//         style={{
//           fontSize: 13,
//           color: "#9e8c73",
//           fontWeight: 500,
//           marginBottom: 12,
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {part.articles}
//       </div>

//       {/* Description */}
//       <div
//         style={{
//           fontSize: 13,
//           color: "#7a6a50",
//           lineHeight: 1.6,
//           marginBottom: 20,
//           flex: 1,
//           fontFamily: "system-ui, sans-serif",
//         }}
//       >
//         {part.description}
//       </div>

//       {/* Explore link */}
//       <div
//         style={{
//           fontSize: 13,
//           color: "#c48232",
//           fontWeight: 600,
//           display: "flex",
//           alignItems: "center",
//           gap: 4,
//           fontFamily: "system-ui, sans-serif",
//           marginTop: "auto",
//         }}
//       >
//         Explore Part →
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ─────────────────────────────────────────────────────────────────

// export default function PartsPage() {
//   return (
//     <>
//     < Navbar />
//     <div
//       style={{
//         fontFamily: "system-ui, sans-serif",
//         background: "#faf7f2",
//         minHeight: "100vh",
//         color: "#1a1208",
//         paddingTop: 64,
//       }}
//     >
//       {/* ── Hero Header ── */}
//       <section
//         style={{
//           background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)",
//           borderBottom: "1px solid #ede8df",
//           padding: "56px 48px 52px",
//         }}
//       >
//         <div style={{ maxWidth: 860, margin: "0 auto" }}>
//           {/* Label */}
//           <div
//             style={{
//               fontSize: 11,
//               fontWeight: 700,
//               color: "#c48232",
//               letterSpacing: 1.5,
//               textTransform: "uppercase" as const,
//               marginBottom: 14,
//             }}
//           >
//             Chapters
//           </div>

//           {/* Heading */}
//           <h1
//             style={{
//               fontSize: 42,
//               fontWeight: 800,
//               color: "#1a1208",
//               margin: "0 0 16px",
//               lineHeight: 1.1,
//               fontFamily: "'Georgia', serif",
//             }}
//           >
//             Browse the Constitution by Part
//           </h1>

//           {/* Subtext */}
//           <p
//             style={{
//               fontSize: 15,
//               color: "#7a6a50",
//               margin: 0,
//               lineHeight: 1.65,
//               maxWidth: 480,
//             }}
//           >
//             The Constitution is organised into Parts. Each Part groups related Articles into a single
//             chapter — start with whichever interests you.
//           </p>
//         </div>
//       </section>

//       {/* ── Parts Grid ── */}
//       <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: 20,
//           }}
//         >
//           {parts.map((part) => (
//             <PartCard key={part.number} part={part} />
//           ))}
//         </div>
//       </main>
//     </div>
//     <FooterSection />
//     </>
//   );
// }
"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface KeyArticle {
  num: string;
  title: string;
  text: string;
}

interface Part {
  number: string;
  title: string;
  articles: string;
  description: string;
  articleCount: number;
  overview: string;
  keyArticles: KeyArticle[];
  insight: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const parts: Part[] = [
  {
    number: "PART I",
    title: "The Union and its Territory",
    articles: "Articles 1–4",
    description:
      "Defines India as a Union of States and provides for admission, formation and alteration of States.",
    articleCount: 4,
    overview:
      "Part I lays the geographical and political foundation of the Indian Republic. It establishes the name 'India, that is Bharat' and declares it a Union of States — a deliberate choice to underscore the indestructible nature of the federation.",
    keyArticles: [
      {
        num: "Article 1",
        title: "Name and Territory of the Union",
        text: "Declares India as a Union of States and lists three categories of territory: states, Union territories, and territories acquired in future.",
      },
      {
        num: "Article 2",
        title: "Admission of New States",
        text: "Empowers Parliament to admit or establish new states on terms it thinks fit — used when Sikkim joined in 1975.",
      },
      {
        num: "Article 3",
        title: "Formation of New States",
        text: "Parliament may form new states by separating, uniting, or altering boundaries — exercised dozens of times, most recently for Telangana in 2014.",
      },
      {
        num: "Article 4",
        title: "Supplementary Provisions",
        text: "Laws under Articles 2 and 3 amend the First and Fourth Schedules but are not treated as constitutional amendments under Article 368.",
      },
    ],
    insight:
      "Unlike a federation, India is described as a 'Union' — meaning states cannot secede. The Constituent Assembly rejected the word 'federal' intentionally to keep the Union paramount.",
  },
  {
    number: "PART II",
    title: "Citizenship",
    articles: "Articles 5–11",
    description:
      "Lays down who is a citizen of India at commencement and Parliament's power to regulate citizenship.",
    articleCount: 7,
    overview:
      "Part II settled the complex question of citizenship at the Constitution's commencement in 1950, particularly for people who migrated between India and Pakistan during Partition. It grants Parliament plenary power to legislate on citizenship thereafter.",
    keyArticles: [
      {
        num: "Article 5",
        title: "Citizenship at Commencement",
        text: "A person domiciled in India who was born there, or whose parents were born there, or who had resided there for 5 years, became a citizen on 26 January 1950.",
      },
      {
        num: "Article 6",
        title: "Rights of Migrants from Pakistan",
        text: "Persons who migrated from Pakistan before 19 July 1948 became citizens; those who came later needed registration.",
      },
      {
        num: "Article 9",
        title: "No Dual Citizenship",
        text: "A person who voluntarily acquires citizenship of a foreign state ceases to be an Indian citizen.",
      },
      {
        num: "Article 11",
        title: "Parliament's Power",
        text: "Parliament can make any provision with respect to acquisition and termination of citizenship — the Citizenship Act, 1955 is enacted under this.",
      },
    ],
    insight:
      "India follows the principle of single citizenship. Unlike the US, there is no concept of 'state citizenship.' The Citizenship (Amendment) Act, 2019 became controversial as the first law to link religion to citizenship.",
  },
  {
    number: "PART III",
    title: "Fundamental Rights",
    articles: "Articles 12–35",
    description:
      "The cornerstone of individual liberty — equality, freedom, life, religion and constitutional remedies.",
    articleCount: 24,
    overview:
      "Often called the 'Magna Carta of India', Part III is the heart of the Constitution. It guarantees six categories of fundamental rights against state action, and makes them enforceable directly in the Supreme Court and High Courts.",
    keyArticles: [
      {
        num: "Article 14",
        title: "Right to Equality",
        text: "Guarantees equality before law and equal protection of laws — the twin pillars against arbitrary State action.",
      },
      {
        num: "Article 19",
        title: "Six Freedoms",
        text: "Guarantees speech, assembly, association, movement, residence, and profession — subject to reasonable restrictions by the State.",
      },
      {
        num: "Article 21",
        title: "Right to Life",
        text: "No person shall be deprived of life or personal liberty except by procedure established by law — the most expansive right, covering privacy, health, education, livelihood and more.",
      },
      {
        num: "Article 32",
        title: "Constitutional Remedies",
        text: "The 'heart and soul' of the Constitution (Dr. Ambedkar's words) — allows direct petition to the Supreme Court for enforcement of Fundamental Rights via writs.",
      },
    ],
    insight:
      "Article 21 has been the subject of over 1,000 Supreme Court judgments. The right to privacy (2017, Puttaswamy case) and the right to a dignified death (2018) were both read into it.",
  },
  {
    number: "PART IV",
    title: "Directive Principles of State Policy",
    articles: "Articles 36–51",
    description:
      "Non-justiciable guidelines for the State to build a just social and economic order.",
    articleCount: 16,
    overview:
      "Inspired by the Irish Constitution, the Directive Principles are socio-economic goals the State must strive to achieve. While not enforceable in courts, they have been used to uphold laws that restrict Fundamental Rights.",
    keyArticles: [
      {
        num: "Article 39",
        title: "Certain Policy Principles",
        text: "Includes equal pay for equal work, prevention of concentration of wealth, and distribution of ownership — basis for land reform and nationalisation laws.",
      },
      {
        num: "Article 44",
        title: "Uniform Civil Code",
        text: "The State shall endeavour to secure a Uniform Civil Code for citizens — among the most debated and unimplemented directives.",
      },
      {
        num: "Article 45",
        title: "Early Childhood Care",
        text: "Originally about free and compulsory education; amended in 2002 to focus on children below 6 years, with education becoming a Fundamental Right under Article 21A.",
      },
      {
        num: "Article 48A",
        title: "Environment Protection",
        text: "Added by the 42nd Amendment, 1976 — State shall protect environment and safeguard forests and wildlife. Foundation of environmental law in India.",
      },
    ],
    insight:
      "The Supreme Court in Minerva Mills (1980) held that Fundamental Rights and DPSPs are complementary — neither can be sacrificed for the other. Laws made to implement DPSPs are shielded from certain Fundamental Rights challenges under Article 31C.",
  },
  {
    number: "PART IV-A",
    title: "Fundamental Duties",
    articles: "Article 51A",
    description:
      "Eleven moral obligations of every Indian citizen, added by the 42nd Amendment.",
    articleCount: 1,
    overview:
      "Added by the 42nd Constitutional Amendment in 1976 on the recommendation of the Swaran Singh Committee, Part IV-A lists duties of citizens. The 86th Amendment in 2002 added an 11th duty — to provide opportunities for education to children aged 6–14.",
    keyArticles: [
      {
        num: "Article 51A(a)",
        title: "Abide by the Constitution",
        text: "Every citizen must abide by the Constitution and respect the national flag and national anthem.",
      },
      {
        num: "Article 51A(g)",
        title: "Protect the Environment",
        text: "To protect and improve the natural environment including forests, lakes, rivers and wildlife — cited in many PIL judgments.",
      },
      {
        num: "Article 51A(h)",
        title: "Scientific Temper",
        text: "To develop scientific temper, humanism and the spirit of inquiry and reform — a unique duty found in few constitutions globally.",
      },
      {
        num: "Article 51A(k)",
        title: "Education for Children",
        text: "Added in 2002 — every parent must provide educational opportunities to their child between 6 and 14 years of age.",
      },
    ],
    insight:
      "Fundamental Duties are not enforceable in courts, but courts have used them as interpretive tools. In Vishaka v. State of Rajasthan (1997), the Court referenced 51A to read gender equality obligations into the law.",
  },
  {
    number: "PART V",
    title: "The Union",
    articles: "Articles 52–151",
    description:
      "Structure of the Union government — President, Parliament, Supreme Court and the CAG.",
    articleCount: 100,
    overview:
      "Part V is the most extensive part of the Constitution. It establishes the entire framework of the Union Government — the executive (President, Vice-President, Council of Ministers, Attorney General), the legislature (Rajya Sabha and Lok Sabha), and the judiciary (Supreme Court), along with the Comptroller and Auditor General.",
    keyArticles: [
      {
        num: "Article 53",
        title: "Executive Power of the Union",
        text: "Vested in the President, exercised either directly or through officers subordinate — in practice, always on the advice of the Council of Ministers.",
      },
      {
        num: "Article 74",
        title: "Council of Ministers",
        text: "There shall be a Council of Ministers headed by the Prime Minister to aid and advise the President, who shall act in accordance with such advice.",
      },
      {
        num: "Article 110",
        title: "Definition of Money Bills",
        text: "A bill that deals only with taxation, borrowing, appropriation of funds — can only be introduced in Lok Sabha; Rajya Sabha has limited powers over it.",
      },
      {
        num: "Article 124",
        title: "Establishment of Supreme Court",
        text: "Provides for the Supreme Court, Chief Justice of India, and the appointment and removal of judges — cornerstone of judicial independence.",
      },
    ],
    insight:
      "Article 74's 'shall act in accordance with such advice' was inserted by the 42nd Amendment (1976). The 44th Amendment (1978) added that the President may send the advice back for reconsideration once — but must accept it thereafter.",
  },
  {
    number: "PART VI",
    title: "The States",
    articles: "Articles 152–237",
    description:
      "Governance of States — Governor, State Legislature and High Courts.",
    articleCount: 86,
    overview:
      "Part VI mirrors the Union structure at the state level. It establishes the office of the Governor, the State Council of Ministers led by the Chief Minister, the State Legislature (Vidhan Sabha and Vidhan Parishad where applicable), and the High Courts.",
    keyArticles: [
      {
        num: "Article 154",
        title: "Executive Power of the State",
        text: "Vested in the Governor, exercised either directly or through officers — parallel to Article 53 for the Union.",
      },
      {
        num: "Article 163",
        title: "Council of Ministers for States",
        text: "There shall be a Council of Ministers headed by the Chief Minister to aid the Governor — who must act on their advice except where the Constitution requires discretion.",
      },
      {
        num: "Article 200",
        title: "Assent to Bills",
        text: "The Governor may give assent, withhold assent, or reserve a bill for Presidential consideration — a frequent source of Centre-State tension.",
      },
      {
        num: "Article 226",
        title: "Writ Jurisdiction of High Courts",
        text: "High Courts can issue writs to enforce fundamental rights and for other purposes — broader jurisdiction than the Supreme Court under Article 32.",
      },
    ],
    insight:
      "The Governor's discretionary powers under Article 163 have been extensively litigated. The Supreme Court in Shamsher Singh (1974) held that the Governor must act on ministerial advice in virtually all matters, limiting gubernatorial discretion.",
  },
];

// ─── Part Card ─────────────────────────────────────────────────────────────────

interface PartCardProps {
  part: Part;
  onClick: () => void;
}

function PartCard({ part, onClick }: PartCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        group relative bg-white border border-[#ede8df] rounded-2xl p-5
        cursor-pointer flex flex-col gap-0
        transition-all duration-200 ease-in-out
        hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,130,50,0.13)]
        shadow-[0_1px_4px_rgba(0,0,0,0.05)]
      "
    >
      {/* Article count badge */}
      <span className="
        absolute top-4 right-4
        bg-[#fdf3e3] border border-[#e8d4a0] rounded-full
        px-2.5 py-0.5 text-[11px] font-semibold text-[#c48232]
      ">
        {part.articleCount} articles
      </span>

      {/* Icon */}
      <div className="
        w-9 h-9 rounded-[9px] bg-[#fdf3e3] border border-[#e8d4a0]
        flex items-center justify-center text-base mb-4 shrink-0
      ">
        📖
      </div>

      {/* Part number */}
      <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-1">
        {part.number}
      </p>

      {/* Title */}
      <h2 className="font-extrabold text-lg text-[#1a1208] leading-tight mb-1.5 font-serif">
        {part.title}
      </h2>

      {/* Articles range */}
      <p className="text-xs text-[#9e8c73] font-medium mb-3">{part.articles}</p>

      {/* Description */}
      <p className="text-xs text-[#7a6a50] leading-relaxed flex-1 mb-5">
        {part.description}
      </p>

      {/* Explore link */}
      <div className="
        flex items-center gap-1 text-xs font-semibold text-[#c48232]
        mt-auto group-hover:gap-2 transition-all duration-200
      ">
        Explore Part
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

interface DetailPanelProps {
  part: Part | null;
  onClose: () => void;
}

function DetailPanel({ part, onClose }: DetailPanelProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (part) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [part]);

  const isOpen = !!part;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-[#1a1208]/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Slide-in Panel */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full
          w-full sm:w-[420px] md:w-[480px] lg:w-[520px]
          bg-white flex flex-col
          transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          shadow-[-4px_0_40px_rgba(26,18,8,0.12)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-modal="true"
        role="dialog"
        aria-label={part?.title ?? "Part Detail"}
      >
        {part && (
          <>
            {/* Sticky Header */}
            <div className="
              sticky top-0 z-10 shrink-0
              bg-gradient-to-br from-[#fdf3e3] to-[#f5edd5]
              border-b border-[#e8d4a0] px-5 pt-6 pb-5
            ">
              {/* Close button */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4 w-8 h-8 rounded-full
                  bg-[#c48232]/10 border border-[#e8d4a0]
                  flex items-center justify-center
                  text-[#c48232] text-sm font-bold
                  hover:bg-[#c48232]/20 transition-colors duration-150
                "
                aria-label="Close panel"
              >
                ✕
              </button>

              <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-1">
                {part.number}
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1208] font-serif leading-tight mb-1.5 pr-10">
                {part.title}
              </h2>
              <p className="text-sm text-[#9e8c73] font-medium">{part.articles}</p>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7">

              {/* Overview */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#ede8df]">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase">
                    Overview
                  </span>
                </div>
                <p className="text-sm text-[#4a3c28] leading-7">{part.overview}</p>
              </section>

              {/* Key Articles */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#ede8df]">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase">
                    Key Articles
                  </span>
                </div>
                <div className="space-y-3">
                  {part.keyArticles.map((ka) => (
                    <div
                      key={ka.num}
                      className="bg-[#faf7f2] border border-[#ede8df] rounded-xl px-4 py-3.5"
                    >
                      <p className="text-[10px] font-bold text-[#c48232] uppercase tracking-wide mb-1">
                        {ka.num}
                      </p>
                      <p className="text-sm font-bold text-[#1a1208] font-serif mb-1.5">
                        {ka.title}
                      </p>
                      <p className="text-xs text-[#7a6a50] leading-relaxed">{ka.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Insight */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#ede8df]">
                  <span className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase">
                    Key Insight
                  </span>
                </div>
                <div className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl px-4 py-4">
                  <p className="text-sm text-[#6b4c1e] leading-7">{part.insight}</p>
                </div>
              </section>

            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PartsPage() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <>
      {/* ── Navbar placeholder — replace with your <Navbar /> ── */}
       <Navbar /> 

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero Header ── */}
        <section className="
          bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df]
          border-b border-[#ede8df]
          px-5 sm:px-8 md:px-12 lg:px-16
          py-10 sm:py-14 md:py-16
        ">
          <div className="max-w-3xl mx-auto">
            {/* Label */}
            <p className="text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
              Chapters
            </p>

            {/* Heading */}
            <h1 className="
              font-extrabold text-[#1a1208] font-serif leading-tight mb-4
              text-3xl sm:text-4xl md:text-5xl
            ">
              Browse the Constitution by Part
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-lg">
              The Constitution is organised into Parts. Each Part groups related Articles into a
              single chapter — click any card to explore its details.
            </p>
          </div>
        </section>

        {/* ── Parts Grid ── */}
        <main className="
          max-w-6xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-12
          py-10 sm:py-12 md:py-14
        ">
          <div className="
            grid gap-4 sm:gap-5
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          ">
            {parts.map((part) => (
              <PartCard
                key={part.number}
                part={part}
                onClick={() => setSelectedPart(part)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* ── Detail Panel ── */}
      <DetailPanel
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
      />

      {/* ── Footer placeholder — replace with your <FooterSection /> ── */}
      <FooterSection /> 
    </>
  );
}