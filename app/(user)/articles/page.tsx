// // "use client";

// // import FooterSection from "@/components/Footer";
// // import Navbar from "@/components/Navbar";
// // import { useState } from "react";

// // // ─── Types ────────────────────────────────────────────────────────────────────

// // interface Article {
// //   part: string;
// //   tag: string;
// //   number: string;
// //   title: string;
// //   description: string;
// // }

// // // ─── Data ─────────────────────────────────────────────────────────────────────

// // const allArticles: Article[] = [
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 14", title: "Equality before law", description: "The State shall not deny to any person equality before the law or the equal protection of the laws." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 15", title: "Prohibition of discrimination", description: "Prohibits discrimination on grounds of religion, race, caste, sex or place of birth." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 19", title: "Six freedoms", description: "Guarantees six fundamental freedoms including speech, assembly, and movement." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 21", title: "Right to life and personal liberty", description: "No person shall be deprived of life or personal liberty except according to procedure established by law." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 32", title: "Right to constitutional remedies", description: "The right to move the Supreme Court for enforcement of fundamental rights." },
// //   { part: "Part IV", tag: "Directive Principles of State Policy", number: "Article 44", title: "Uniform Civil Code", description: "The State shall endeavour to secure for citizens a uniform civil code throughout India." },
// //   { part: "Part I", tag: "The Union and its Territory", number: "Article 1", title: "Name and territory of the Union", description: "India, that is Bharat, shall be a Union of States." },
// //   { part: "Part II", tag: "Citizenship", number: "Article 5", title: "Citizenship at the commencement of the Constitution", description: "Defines who automatically became a citizen of India on 26 January 1950." },
// //   { part: "Part IV-A", tag: "Fundamental Duties", number: "Article 51A", title: "Fundamental Duties", description: "Eleven duties every citizen of India must observe." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 16", title: "Equality of opportunity in public employment", description: "Equal opportunity for all citizens in matters relating to employment under the State." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 17", title: "Abolition of Untouchability", description: "Untouchability is abolished and its practice in any form is forbidden." },
// //   { part: "Part III", tag: "Fundamental Rights", number: "Article 25", title: "Freedom of religion", description: "All persons are equally entitled to freedom of conscience and the right to profess, practise and propagate religion." },
// //   { part: "Part V", tag: "The Union", number: "Article 72", title: "Power of President to grant pardons", description: "The President shall have the power to grant pardons, reprieves, respites or remissions of punishment." },
// //   { part: "Part V", tag: "The Union", number: "Article 124", title: "Establishment of Supreme Court", description: "There shall be a Supreme Court of India constituted as provided in this article." },
// //   { part: "Part VI", tag: "The States", number: "Article 214", title: "High Courts for States", description: "There shall be a High Court for each State." },
// // ];

// // const filterTabs = ["All", "Part I", "Part II", "Part III", "Part IV", "Part IV-A", "Part V", "Part VI"];

// // // ─── Article Card ─────────────────────────────────────────────────────────────

// // function ArticleCard({ article, onBookmark, bookmarked }: { article: Article; onBookmark: () => void; bookmarked: boolean }) {
// //   const [hovered, setHovered] = useState(false);
// //   return (
// //     <div
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //       style={{
// //         background: "#fff",
// //         border: "1px solid #ede8df",
// //         borderRadius: 16,
// //         padding: "22px 20px",
// //         cursor: "pointer",
// //         transition: "all 0.2s ease",
// //         boxShadow: hovered ? "0 8px 28px rgba(196,130,50,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
// //         display: "flex",
// //         flexDirection: "column" as const,
// //         gap: 6,
// //         position: "relative" as const,
// //       }}
// //     >
// //       {/* Top row: tag + bookmark */}
// //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
// //         <span style={{ background: "#fdf3e3", border: "1px solid #e8d4a0", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#c48232", fontFamily: "system-ui, sans-serif" }}>
// //           {article.tag}
// //         </span>
// //         <button
// //           onClick={(e) => { e.stopPropagation(); onBookmark(); }}
// //           style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: bookmarked ? "#c48232" : "#c9b99a", padding: 0 }}
// //         >
// //           🔖
// //         </button>
// //       </div>

// //       <div style={{ fontWeight: 800, fontSize: 20, color: "#1a1208", fontFamily: "'Georgia', serif", lineHeight: 1.1 }}>{article.number}</div>
// //       <div style={{ fontWeight: 600, fontSize: 14, color: "#4a3c28", fontFamily: "system-ui, sans-serif" }}>{article.title}</div>
// //       <div style={{ fontSize: 13, color: "#7a6a50", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", flex: 1 }}>{article.description}</div>

// //       <div style={{ marginTop: 8, fontSize: 13, color: "#c48232", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, fontFamily: "system-ui, sans-serif" }}>
// //         Read article →
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Page ─────────────────────────────────────────────────────────────────

// // export default function ArticlesPage() {
  
  
  
// //   const [activeFilter, setActiveFilter] = useState("All");
// //   const [search, setSearch] = useState("");
// //   const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

// //   const toggleBookmark = (num: string) => {
// //     setBookmarks((prev) => {
// //       const next = new Set(prev);
// //       next.has(num) ? next.delete(num) : next.add(num);
// //       return next;
// //     });
// //   };

// //   const filtered = allArticles.filter((a) => {
// //     const matchesPart = activeFilter === "All" || a.part === activeFilter;
// //     const q = search.toLowerCase();
// //     const matchesSearch = !q || a.number.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q);
// //     return matchesPart && matchesSearch;
// //   });

// //   return (
// //     <>
// //     <Navbar />
// //     <div style={{ fontFamily: "system-ui, sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#1a1208", paddingTop: 64 }}>

// //       {/* ── Hero Header ── */}
// //       <section style={{ background: "linear-gradient(135deg, #f5f3ef 60%, #ede8df 100%)", borderBottom: "1px solid #ede8df", padding: "52px 48px 40px" }}>
// //         <div style={{ maxWidth: 900, margin: "0 auto" }}>
// //           <div style={{ fontSize: 11, fontWeight: 700, color: "#c48232", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 12 }}>Library</div>
// //           <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1208", margin: "0 0 12px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
// //             Every Article. Clearly explained.
// //           </h1>
// //           <p style={{ fontSize: 15, color: "#7a6a50", margin: "0 0 28px", lineHeight: 1.6, maxWidth: 500 }}>
// //             Filter by part of the Constitution or search by Article number, name or topic.
// //           </p>

// //           {/* Search */}
// //           <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #ede8df", borderRadius: 12, padding: "10px 16px", maxWidth: 480, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
// //             <span style={{ fontSize: 16, color: "#9e8c73" }}>🔍</span>
// //             <input
// //               type="text"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search Article 21, Right to Education..."
// //               style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", color: "#1a1208", fontFamily: "system-ui, sans-serif" }}
// //             />
// //           </div>

// //           {/* Filter tabs */}
// //           <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" as const, alignItems: "center" }}>
// //             <span style={{ fontSize: 13, color: "#9e8c73", marginRight: 4 }}>⚙</span>
// //             {filterTabs.map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveFilter(tab)}
// //                 style={{
// //                   padding: "6px 16px",
// //                   borderRadius: 20,
// //                   border: activeFilter === tab ? "1.5px solid #c48232" : "1px solid #ede8df",
// //                   background: activeFilter === tab ? "#fdf3e3" : "#fff",
// //                   color: activeFilter === tab ? "#c48232" : "#7a6a50",
// //                   fontSize: 13,
// //                   fontWeight: activeFilter === tab ? 700 : 500,
// //                   cursor: "pointer",
// //                   transition: "all 0.15s",
// //                   fontFamily: "system-ui, sans-serif",
// //                 }}
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Articles Grid ── */}
// //       <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
// //         {filtered.length === 0 ? (
// //           <div style={{ textAlign: "center" as const, padding: "60px 0", color: "#9e8c73", fontSize: 15 }}>
// //             No articles found. Try a different search or filter.
// //           </div>
// //         ) : (
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
// //             {filtered.map((article) => (
// //               <ArticleCard
// //                 key={article.number}
// //                 article={article}
// //                 bookmarked={bookmarks.has(article.number)}
// //                 onBookmark={() => toggleBookmark(article.number)}
// //               />
// //             ))}
// //           </div>
// //         )}

// //         {/* Bottom CTA */}
// //         <div style={{ textAlign: "center" as const, marginTop: 52 }}> 
// //           { <button style={{ background: "transparent", border: "1px solid #ede8df", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, color: "#4a3c28", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
// //             Test your knowledge in a quiz
// //           </button> }
// //          </div>
// //       </main>
// //       <FooterSection />
// //     </div>
// //     </>
// //   );

// // }
// "use client";

// import FooterSection from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { useState } from "react";

// // ─── Types ─────────────────────────────────────────────────────────────────────

// interface Article {
//   part: string;
//   tag: string;
//   number: string;
//   title: string;
//   description: string;
// }

// // ─── Data ──────────────────────────────────────────────────────────────────────

// const allArticles: Article[] = [
//   { part: "Part I",    tag: "The Union and its Territory",         number: "Article 1",   title: "Name and territory of the Union",                description: "India, that is Bharat, shall be a Union of States." },
//   { part: "Part II",   tag: "Citizenship",                         number: "Article 5",   title: "Citizenship at the commencement of the Constitution", description: "Defines who automatically became a citizen of India on 26 January 1950." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 14",  title: "Equality before law",                            description: "The State shall not deny to any person equality before the law or the equal protection of the laws." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 15",  title: "Prohibition of discrimination",                  description: "Prohibits discrimination on grounds of religion, race, caste, sex or place of birth." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 16",  title: "Equality of opportunity in public employment",   description: "Equal opportunity for all citizens in matters relating to employment under the State." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 17",  title: "Abolition of Untouchability",                    description: "Untouchability is abolished and its practice in any form is forbidden." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 19",  title: "Six freedoms",                                   description: "Guarantees six fundamental freedoms including speech, assembly, and movement." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 21",  title: "Right to life and personal liberty",             description: "No person shall be deprived of life or personal liberty except according to procedure established by law." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 25",  title: "Freedom of religion",                            description: "All persons are equally entitled to freedom of conscience and the right to profess, practise and propagate religion." },
//   { part: "Part III",  tag: "Fundamental Rights",                  number: "Article 32",  title: "Right to constitutional remedies",               description: "The right to move the Supreme Court for enforcement of fundamental rights." },
//   { part: "Part IV",   tag: "Directive Principles of State Policy",number: "Article 44",  title: "Uniform Civil Code",                             description: "The State shall endeavour to secure for citizens a uniform civil code throughout India." },
//   { part: "Part IV-A", tag: "Fundamental Duties",                  number: "Article 51A", title: "Fundamental Duties",                             description: "Eleven duties every citizen of India must observe." },
//   { part: "Part V",    tag: "The Union",                           number: "Article 72",  title: "Power of President to grant pardons",            description: "The President shall have the power to grant pardons, reprieves, respites or remissions of punishment." },
//   { part: "Part V",    tag: "The Union",                           number: "Article 124", title: "Establishment of Supreme Court",                 description: "There shall be a Supreme Court of India constituted as provided in this article." },
//   { part: "Part VI",   tag: "The States",                          number: "Article 214", title: "High Courts for States",                         description: "There shall be a High Court for each State." },
// ];

// const filterTabs = ["All", "Part I", "Part II", "Part III", "Part IV", "Part IV-A", "Part V", "Part VI"];

// // ─── Search Icon SVG ───────────────────────────────────────────────────────────

// function SearchIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <circle cx="11" cy="11" r="8" />
//       <line x1="21" y1="21" x2="16.65" y2="16.65" />
//     </svg>
//   );
// }

// // ─── Article Card ──────────────────────────────────────────────────────────────

// interface ArticleCardProps {
//   article: Article;
//   bookmarked: boolean;
//   onBookmark: () => void;
// }

// function ArticleCard({ article, bookmarked, onBookmark }: ArticleCardProps) {
//   return (
//     <div className="
//       group relative bg-white border border-[#ede8df] rounded-2xl
//       p-5 flex flex-col gap-1.5 cursor-pointer
//       transition-all duration-200
//       hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,130,50,0.10)]
//       shadow-[0_1px_4px_rgba(0,0,0,0.05)]
//     ">
//       {/* Top row: tag + bookmark */}
//       <div className="flex items-start justify-between gap-2 mb-1">
//         <span className="
//           bg-[#fdf3e3] border border-[#e8d4a0] rounded-full
//           px-2.5 py-0.5 text-[11px] font-semibold text-[#c48232]
//           leading-5 shrink-0
//         ">
//           {article.tag}
//         </span>

//         {/* Bookmark button — no emoji, clean SVG */}
//         <button
//           onClick={(e) => { e.stopPropagation(); onBookmark(); }}
//           aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
//           className={`
//             shrink-0 w-7 h-7 flex items-center justify-center rounded-full
//             transition-colors duration-150
//             ${bookmarked
//               ? "text-[#c48232] bg-[#fdf3e3]"
//               : "text-[#c9b99a] hover:text-[#c48232] hover:bg-[#fdf3e3]"}
//           `}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
//             fill={bookmarked ? "currentColor" : "none"}
//             stroke="currentColor" strokeWidth={2}
//             strokeLinecap="round" strokeLinejoin="round"
//             className="w-4 h-4"
//           >
//             <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
//           </svg>
//         </button>
//       </div>

//       {/* Article number */}
//       <p className="font-extrabold text-xl text-[#1a1208] font-serif leading-tight">
//         {article.number}
//       </p>

//       {/* Title */}
//       <p className="font-semibold text-sm text-[#4a3c28]">{article.title}</p>

//       {/* Description */}
//       <p className="text-xs text-[#7a6a50] leading-relaxed flex-1">
//         {article.description}
//       </p>

//       {/* Read link */}
//       <div className="
//         mt-2 text-xs font-semibold text-[#c48232]
//         flex items-center gap-1
//         group-hover:gap-2 transition-all duration-200
//       ">
//         Read article
//         <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ─────────────────────────────────────────────────────────────────

// export default function ArticlesPage() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [search, setSearch]             = useState("");
//   const [bookmarks, setBookmarks]       = useState<Set<string>>(new Set());

//   const toggleBookmark = (num: string) => {
//     setBookmarks((prev) => {
//       const next = new Set(prev);
//       next.has(num) ? next.delete(num) : next.add(num);
//       return next;
//     });
//   };

//   const filtered = allArticles.filter((a) => {
//     const matchesPart   = activeFilter === "All" || a.part === activeFilter;
//     const q             = search.toLowerCase();
//     const matchesSearch =
//       !q ||
//       a.number.toLowerCase().includes(q) ||
//       a.title.toLowerCase().includes(q) ||
//       a.tag.toLowerCase().includes(q);
//     return matchesPart && matchesSearch;
//   });

//   return (
//     <>
//       <Navbar />

//       <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

//         {/* ── Hero Header ── */}
//         <section className="
//           bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df]
//           border-b border-[#ede8df]
//           px-5 sm:px-8 md:px-12 lg:px-16
//           py-10 sm:py-12 md:py-16
//         ">
//           <div className="max-w-4xl mx-auto">

//             {/* Label */}
//             <p className="text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
//               Library
//             </p>

//             {/* Heading */}
//             <h1 className="
//               font-extrabold text-[#1a1208] font-serif leading-tight mb-4
//               text-3xl sm:text-4xl md:text-5xl
//             ">
//               Every Article. Clearly explained.
//             </h1>

//             {/* Subtext */}
//             <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-lg mb-7">
//               Filter by part of the Constitution or search by Article number, name or topic.
//             </p>

//             {/* ── Search bar — icon on RIGHT ── */}
//             <div className="
//               flex items-center gap-3 bg-white
//               border border-[#ede8df] rounded-xl
//               px-4 py-2.5
//               max-w-sm sm:max-w-md
//               shadow-[0_2px_8px_rgba(0,0,0,0.05)]
//               focus-within:border-[#c48232] focus-within:shadow-[0_0_0_3px_rgba(196,130,50,0.12)]
//               transition-all duration-200
//             ">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search Article 21, Right to Education..."
//                 className="
//                   flex-1 border-none outline-none bg-transparent
//                   text-sm text-[#1a1208] placeholder:text-[#b0a08a]
//                   font-sans
//                 "
//               />

//               {/* Search icon — right side with hover effect */}
//               <button
//                 aria-label="Search"
//                 className="
//                   group/search shrink-0
//                   w-8 h-8 flex items-center justify-center
//                   rounded-lg text-[#9e8c73]
//                   hover:bg-[#fdf3e3] hover:text-[#c48232]
//                   active:scale-95
//                   transition-all duration-150
//                 "
//               >
//                 <SearchIcon className="w-4 h-4" />
//               </button>
//             </div>

//             {/* ── Filter tabs — no prefix icon ── */}
//             <div className="flex flex-wrap gap-2 mt-5">
//               {filterTabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveFilter(tab)}
//                   className={`
//                     px-4 py-1.5 rounded-full text-[13px] font-medium
//                     border transition-all duration-150
//                     ${activeFilter === tab
//                       ? "border-[#c48232] bg-[#fdf3e3] text-[#c48232] font-bold"
//                       : "border-[#ede8df] bg-white text-[#7a6a50] hover:border-[#c48232]/50 hover:text-[#c48232]"
//                     }
//                   `}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Articles Grid ── */}
//         <main className="
//           max-w-6xl mx-auto
//           px-4 sm:px-6 md:px-10 lg:px-12
//           py-10 sm:py-12
//         ">
//           {filtered.length === 0 ? (
//             <div className="text-center py-20 text-[#9e8c73] text-base">
//               No articles found. Try a different search or filter.
//             </div>
//           ) : (
//             <div className="
//               grid gap-4 sm:gap-5
//               grid-cols-1
//               sm:grid-cols-2
//               lg:grid-cols-3
//             ">
//               {filtered.map((article) => (
//                 <ArticleCard
//                   key={article.number}
//                   article={article}
//                   bookmarked={bookmarks.has(article.number)}
//                   onBookmark={() => toggleBookmark(article.number)}
//                 />
//               ))}
//             </div>
//           )}

//           {/* ── Bottom CTA ── */}
//           <div className="flex justify-center mt-14">
//             <button className="
//               bg-transparent border border-[#ede8df] rounded-xl
//               px-7 py-3 text-sm font-semibold text-[#4a3c28]
//               hover:border-[#c48232] hover:text-[#c48232] hover:bg-[#fdf3e3]
//               transition-all duration-200
//             ">
//               Test your knowledge in a quiz
//             </button>
//           </div>
//         </main>

//         <FooterSection />
//       </div>
//     </>
//   );
// }
"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CaseLaw {
  name: string;
  year: string;
  significance: string;
}

interface ArticleDetail {
  overview: string;
  keyPoints: string[];
  amendment?: string;
  caselaw?: CaseLaw[];
  insight: string;
}

interface Article {
  part: string;
  tag: string;
  number: string;
  title: string;
  description: string;
  detail: ArticleDetail;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const allArticles: Article[] = [
  {
    part: "Part I", tag: "The Union and its Territory",
    number: "Article 1", title: "Name and territory of the Union",
    description: "India, that is Bharat, shall be a Union of States.",
    detail: {
      overview: "Article 1 gives the Republic its dual identity — 'India, that is Bharat' — acknowledging both the colonial legacy and the ancient name. It defines three categories of territory: States listed in the First Schedule, Union Territories, and territories that may be acquired in the future.",
      keyPoints: [
        "India is a Union of States — not a federation, not a confederation.",
        "Territories are of three types: States, Union Territories, and acquired territories.",
        "The word 'Union' was chosen deliberately to signal that no State can secede.",
        "First Schedule lists all States and UTs by name.",
      ],
      insight: "Dr. Ambedkar explained that 'Union' was used instead of 'Federation' to make clear the indestructible nature of the Union. Unlike the US, Indian states have no independent right of secession.",
    },
  },
  {
    part: "Part II", tag: "Citizenship",
    number: "Article 5", title: "Citizenship at the commencement of the Constitution",
    description: "Defines who automatically became a citizen of India on 26 January 1950.",
    detail: {
      overview: "Article 5 settled citizenship at the Constitution's commencement (26 January 1950). Anyone domiciled in India who was born in India, whose parents were born in India, or who had ordinarily resided in India for at least 5 years became a citizen automatically.",
      keyPoints: [
        "Citizenship was automatically conferred — no application required.",
        "Three qualifying grounds: birth in India, parents born in India, or 5-year residence.",
        "Domicile in India was a prerequisite in all three cases.",
        "Article 11 grants Parliament full power to legislate on citizenship thereafter.",
      ],
      insight: "The Citizenship Act, 1955 was enacted under Article 11 and governs all citizenship matters today. The Citizenship (Amendment) Act, 2019 became the most controversial amendment to this framework.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 14", title: "Equality before law",
    description: "The State shall not deny to any person equality before the law or the equal protection of the laws.",
    detail: {
      overview: "Article 14 contains two concepts: 'equality before law' (a negative concept borrowed from English common law — the State will not favour anyone) and 'equal protection of laws' (a positive concept from the US Constitution — likes must be treated alike).",
      keyPoints: [
        "Applies to all persons — citizens and non-citizens alike.",
        "Equality before law: absence of special privilege; equal subjection to ordinary law.",
        "Equal protection: equals shall be treated equally; unequals may be treated differently.",
        "Reasonable classification is permitted if based on intelligible differentia with a rational nexus to the object.",
      ],
      caselaw: [
        { name: "E.P. Royappa v. State of Tamil Nadu", year: "1974", significance: "Expanded Article 14 to strike down arbitrariness in State action — 'equality is antithetic to arbitrariness.'" },
        { name: "Maneka Gandhi v. Union of India", year: "1978", significance: "Linked Article 14 with Articles 19 and 21, creating a 'golden triangle' of fundamental rights." },
      ],
      insight: "The Supreme Court has read Article 14 expansively — it is not merely a shield against discriminatory laws but strikes down any arbitrary State action, even if facially neutral.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 15", title: "Prohibition of discrimination",
    description: "Prohibits discrimination on grounds of religion, race, caste, sex or place of birth.",
    detail: {
      overview: "Article 15 prohibits the State from discriminating against any citizen on five specific grounds: religion, race, caste, sex, or place of birth. It also prohibits discrimination in access to shops, public restaurants, hotels, and places of public entertainment.",
      keyPoints: [
        "Five protected grounds: religion, race, caste, sex, place of birth.",
        "Applies only to citizens (unlike Article 14 which applies to all persons).",
        "Article 15(3) permits special provisions for women and children.",
        "Articles 15(4) and 15(5) permit reservations for SCs, STs, and OBCs.",
        "Article 15(6) added by 103rd Amendment allows EWS reservation.",
      ],
      caselaw: [
        { name: "State of Madras v. Champakam Dorairajan", year: "1951", significance: "First major case on Article 15 — led to the First Constitutional Amendment adding Article 15(4)." },
      ],
      insight: "The 'place of birth' ground in Article 15 is different from domicile. 'Son of the soil' policies that favour residents over migrants have been struck down as violating Article 15.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 16", title: "Equality of opportunity in public employment",
    description: "Equal opportunity for all citizens in matters relating to employment under the State.",
    detail: {
      overview: "Article 16 guarantees equality of opportunity in matters of public employment. No citizen can be discriminated against on grounds of religion, race, caste, sex, descent, place of birth, or residence in respect of any employment or office under the State.",
      keyPoints: [
        "Applies specifically to public employment — not private sector jobs.",
        "Article 16(3): Parliament may prescribe residence as a qualification for certain State or UT posts.",
        "Article 16(4): Permits reservation for backward classes not adequately represented in State services.",
        "Article 16(4A): Allows reservation in promotions for SCs/STs.",
        "Indra Sawhney (1992) capped total reservations at 50%, subject to exceptional circumstances.",
      ],
      caselaw: [
        { name: "Indra Sawhney v. Union of India", year: "1992", significance: "Upheld OBC reservations, struck down creamy layer exemption, and set 50% ceiling on reservations." },
        { name: "M. Nagaraj v. Union of India", year: "2006", significance: "Upheld reservation in promotions subject to quantifiable data on backwardness and inadequate representation." },
      ],
      insight: "The 103rd Constitutional Amendment (2019) introduced 10% EWS reservation under Article 16(6) — the first reservation based solely on economic criterion. Its validity was upheld in Janhit Abhiyan v. Union of India (2022).",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 17", title: "Abolition of Untouchability",
    description: "Untouchability is abolished and its practice in any form is forbidden.",
    detail: {
      overview: "Article 17 abolishes 'untouchability' in absolute terms — it applies horizontally to private individuals, not just the State. This is one of the few Fundamental Rights that operates against private parties directly.",
      keyPoints: [
        "The only Fundamental Right that binds private individuals directly.",
        "Enforcement of disability arising from untouchability is a punishable offence.",
        "The term 'untouchability' is not defined in the Constitution itself — courts have given it a broad meaning.",
        "SC/ST (Prevention of Atrocities) Act, 1989 further strengthens protection.",
      ],
      insight: "Article 17 is unique in constitutional law — most rights only restrain the State. Dr. Ambedkar insisted on making it a constitutional command because he felt legislative protection alone would be insufficient.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 19", title: "Six freedoms",
    description: "Guarantees six fundamental freedoms including speech, assembly, and movement.",
    detail: {
      overview: "Article 19 originally guaranteed seven freedoms; the right to property (Article 19(1)(f)) was deleted by the 44th Amendment, 1978. The six remaining freedoms are: speech and expression, peaceful assembly, association, movement, residence, and profession.",
      keyPoints: [
        "Freedom of speech and expression (19(1)(a)) — includes press freedom, commercial speech, right to silence.",
        "Freedom of peaceful assembly without arms (19(1)(b)).",
        "Freedom to form associations or unions (19(1)(c)) — covers political parties and trade unions.",
        "Freedom to move freely throughout India (19(1)(d)).",
        "Freedom to reside and settle anywhere (19(1)(e)).",
        "Freedom to practise any profession or trade (19(1)(g)).",
      ],
      caselaw: [
        { name: "Shreya Singhal v. Union of India", year: "2015", significance: "Struck down Section 66A of the IT Act as unconstitutional — landmark internet free speech ruling." },
        { name: "Indian Express Newspapers v. Union of India", year: "1985", significance: "Held that freedom of press is implicit in Article 19(1)(a); import duty on newsprint is unconstitutional." },
      ],
      amendment: "44th Amendment Act, 1978 deleted the right to property (Article 19(1)(f)) from the list of freedoms.",
      insight: "The freedoms under Article 19 are not absolute — each is subject to reasonable restrictions under Articles 19(2) to 19(6). The word 'reasonable' is crucial and is always subject to judicial review.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 21", title: "Right to life and personal liberty",
    description: "No person shall be deprived of life or personal liberty except according to procedure established by law.",
    detail: {
      overview: "Article 21 is the most expansive and most litigated Fundamental Right. The Supreme Court has read into it a vast array of rights — from the right to livelihood to the right to privacy, from the right to a clean environment to the right to die with dignity.",
      keyPoints: [
        "Applies to all persons — citizens and non-citizens.",
        "'Procedure established by law' must be fair, just, and reasonable (not merely any procedure).",
        "Article 21A (added by 86th Amendment, 2002): Free and compulsory education for children aged 6–14.",
        "Encompasses right to privacy, dignity, livelihood, health, speedy trial, and more.",
        "Cannot be suspended even during a National Emergency (post-44th Amendment).",
      ],
      caselaw: [
        { name: "Maneka Gandhi v. Union of India", year: "1978", significance: "Expanded Article 21 — procedure must be fair, just and reasonable; linked Articles 14, 19 and 21." },
        { name: "Justice K.S. Puttaswamy v. Union of India", year: "2017", significance: "9-judge bench unanimously held right to privacy is a fundamental right under Article 21." },
        { name: "Common Cause v. Union of India", year: "2018", significance: "Right to die with dignity is a fundamental right; recognised passive euthanasia and living wills." },
      ],
      insight: "Article 21 has been called a 'repository of all human rights.' The Supreme Court has used it to read in rights that are not explicitly mentioned anywhere in the Constitution — making it the most dynamic provision in Indian constitutional law.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 25", title: "Freedom of religion",
    description: "All persons are equally entitled to freedom of conscience and the right to profess, practise and propagate religion.",
    detail: {
      overview: "Article 25 guarantees freedom of conscience and the right to profess, practise, and propagate religion. It covers both the inner freedom of conscience and the external freedom to manifest religious belief.",
      keyPoints: [
        "Applies to all persons — not just citizens.",
        "Four aspects: freedom of conscience, right to profess, right to practise, right to propagate.",
        "Subject to public order, morality, health, and other Fundamental Rights.",
        "State can regulate secular (non-religious) activities associated with religious practice.",
        "Explanation I: Wearing and carrying kirpans is part of the Sikh religion.",
      ],
      caselaw: [
        { name: "Commissioner, Hindu Religious Endowments v. Sri Lakshmindra Thirtha Swamiar", year: "1954", significance: "Distinguished essential religious practices (protected) from secular activities (regulable)." },
        { name: "Shirur Mutt case", year: "1954", significance: "Established the 'essential religious practices' test — only essential practices get constitutional protection." },
      ],
      insight: "The 'essential religious practices' doctrine has been the subject of intense academic and judicial debate. Critics argue courts are not equipped to determine theological essentiality — yet this test governs most religious freedom cases.",
    },
  },
  {
    part: "Part III", tag: "Fundamental Rights",
    number: "Article 32", title: "Right to constitutional remedies",
    description: "The right to move the Supreme Court for enforcement of fundamental rights.",
    detail: {
      overview: "Article 32 is the 'heart and soul' of the Constitution — Dr. Ambedkar's own words. It gives every person the right to approach the Supreme Court directly if any Fundamental Right is violated. The Supreme Court can issue five types of writs.",
      keyPoints: [
        "Right to move the Supreme Court is itself a Fundamental Right — cannot be suspended ordinarily.",
        "Habeas corpus: produce the body — challenges illegal detention.",
        "Mandamus: command a public authority to perform its duty.",
        "Certiorari: quash orders of inferior courts/tribunals acting without jurisdiction.",
        "Prohibition: stop an inferior court from exceeding jurisdiction.",
        "Quo warranto: challenge a person's right to hold public office.",
      ],
      caselaw: [
        { name: "A.D.M. Jabalpur v. Shivakant Shukla", year: "1976", significance: "Controversial case held Article 21 could be suspended during Emergency — later overruled by the 44th Amendment." },
      ],
      insight: "Dr. Ambedkar called Article 32 the most important article in the Constitution — 'without it, the Constitution would be a nullity.' The 44th Amendment ensured that Article 21 (and Article 32) cannot be suspended even during a National Emergency.",
    },
  },
  {
    part: "Part IV", tag: "Directive Principles of State Policy",
    number: "Article 44", title: "Uniform Civil Code",
    description: "The State shall endeavour to secure for citizens a uniform civil code throughout India.",
    detail: {
      overview: "Article 44 directs the State to secure a Uniform Civil Code (UCC) governing personal matters — marriage, divorce, inheritance, adoption — for all citizens, replacing religion-specific personal laws. It remains one of the most debated and unimplemented Directives.",
      keyPoints: [
        "A Directive Principle — not justiciable (cannot be enforced in court).",
        "Aims to replace Hindu, Muslim, Christian, Parsi personal laws with one common code.",
        "Goa is the only state with a Uniform Civil Code in force (Portuguese Civil Code, 1867).",
        "Supreme Court has repeatedly urged Parliament to implement UCC.",
        "Uttarakhand became the first State to enact a UCC in 2024.",
      ],
      caselaw: [
        { name: "Mohd. Ahmed Khan v. Shah Bano Begum", year: "1985", significance: "SC directed Parliament to implement UCC; political controversy led to the Muslim Women Act, 1986." },
        { name: "Sarla Mudgal v. Union of India", year: "1995", significance: "SC reiterated the need for UCC to prevent misuse of personal law for bigamy." },
      ],
      insight: "The UCC debate sits at the intersection of secularism, gender equality, and religious personal law. Those in favour argue it is essential for gender justice; opponents argue it violates religious freedom under Articles 25–28.",
    },
  },
  {
    part: "Part IV-A", tag: "Fundamental Duties",
    number: "Article 51A", title: "Fundamental Duties",
    description: "Eleven duties every citizen of India must observe.",
    detail: {
      overview: "Article 51A was inserted by the 42nd Constitutional Amendment, 1976. Originally 10 duties, an 11th was added by the 86th Amendment, 2002. These duties are not justiciable but courts use them as interpretive tools.",
      keyPoints: [
        "51A(a): Abide by the Constitution; respect national flag and national anthem.",
        "51A(b): Cherish and follow noble ideals of the freedom struggle.",
        "51A(g): Protect and improve the natural environment.",
        "51A(h): Develop scientific temper, humanism, spirit of inquiry and reform.",
        "51A(j): Strive towards excellence in individual and collective activity.",
        "51A(k): Provide educational opportunities to children aged 6–14 (added 2002).",
      ],
      amendment: "Added by 42nd Constitutional Amendment Act, 1976. 11th duty added by 86th Amendment Act, 2002.",
      caselaw: [
        { name: "Vishaka v. State of Rajasthan", year: "1997", significance: "Court used Article 51A to read gender equality obligations into workplace law pending legislation." },
      ],
      insight: "India is one of the few countries with codified Fundamental Duties. While unenforceable in court, Parliament has used them as justification for laws restricting Fundamental Rights — courts have accepted this reasoning.",
    },
  },
  {
    part: "Part V", tag: "The Union",
    number: "Article 72", title: "Power of President to grant pardons",
    description: "The President shall have the power to grant pardons, reprieves, respites or remissions of punishment.",
    detail: {
      overview: "Article 72 gives the President clemency powers in five forms: pardon (complete absolution), reprieve (stay of execution), respite (reduced sentence due to special circumstance), remission (reduction of sentence without changing nature), and commutation (substitution of lighter punishment).",
      keyPoints: [
        "Pardon: completely absolves the offender — wipes out conviction and sentence.",
        "Reprieve: temporary stay of execution, usually pending appeal or mercy petition.",
        "Respite: reduced sentence for special reasons (e.g., pregnancy).",
        "Remission: reduces quantum of sentence without changing its nature.",
        "Commutation: substitutes a heavier sentence with a lighter one.",
        "The President acts on the advice of the Council of Ministers (Article 74).",
      ],
      caselaw: [
        { name: "Kehar Singh v. Union of India", year: "1989", significance: "SC held Presidential pardon power is subject to limited judicial review only — not on merits." },
        { name: "Epuru Sudhakar v. Government of Andhra Pradesh", year: "2006", significance: "Pardon power cannot be exercised on extraneous or irrelevant grounds; it is subject to judicial review." },
      ],
      insight: "The Governor has parallel powers under Article 161 but cannot pardon death sentences or offences under Union law — only the President can. Inordinate delay in deciding mercy petitions has itself been held a ground for commuting death sentences.",
    },
  },
  {
    part: "Part V", tag: "The Union",
    number: "Article 124", title: "Establishment of Supreme Court",
    description: "There shall be a Supreme Court of India constituted as provided in this article.",
    detail: {
      overview: "Article 124 establishes the Supreme Court of India. It provides for the appointment of the Chief Justice of India and other judges, the qualifications required, and the process for their removal. It is the bedrock of judicial independence in India.",
      keyPoints: [
        "Supreme Court consists of the CJI and up to 33 other judges (as increased by Parliament).",
        "Judges are appointed by the President on the recommendation of the collegium.",
        "Qualification: High Court judge for 5 years, or HC advocate for 10 years, or eminent jurist.",
        "Removal requires an address by both Houses of Parliament in the same session.",
        "Judges hold office until age 65.",
      ],
      caselaw: [
        { name: "S.P. Gupta v. Union of India (First Judges Case)", year: "1982", significance: "Held executive primacy in judicial appointments — later overruled." },
        { name: "Supreme Court Advocates-on-Record Association v. Union of India (Second Judges Case)", year: "1993", significance: "Established collegium system — CJI's opinion is binding on the Executive." },
        { name: "Third Judges Case (Presidential Reference)", year: "1998", significance: "Collegium to consist of CJI + 4 senior-most judges for Supreme Court appointments." },
      ],
      insight: "The collegium system — judges appointing judges — is unique to India and has no express mention in the Constitution. It evolved entirely through judicial interpretation of the word 'consultation' in Article 124. The NJAC (99th Amendment) sought to replace it but was struck down in 2015.",
    },
  },
  {
    part: "Part VI", tag: "The States",
    number: "Article 214", title: "High Courts for States",
    description: "There shall be a High Court for each State.",
    detail: {
      overview: "Article 214 mandates a High Court for each State. High Courts are the principal civil and criminal courts of original jurisdiction in their State. They also exercise appellate and supervisory jurisdiction over all subordinate courts and tribunals within the State.",
      keyPoints: [
        "Every State must have a High Court — Parliament can establish a common High Court for two or more States.",
        "High Court judges are appointed by the President after consultation with the CJI and the Governor.",
        "Judges retire at age 62 (unlike Supreme Court judges who retire at 65).",
        "High Courts have writ jurisdiction under Article 226 — broader than Supreme Court's Article 32 jurisdiction.",
        "Supervisory jurisdiction over all subordinate courts under Article 227.",
      ],
      caselaw: [
        { name: "L. Chandra Kumar v. Union of India", year: "1997", significance: "High Courts' writ jurisdiction under Article 226 is part of the basic structure — cannot be abridged." },
      ],
      insight: "Article 226 gives High Courts writ jurisdiction 'for any other purpose' beyond enforcement of Fundamental Rights — making their jurisdiction broader than the Supreme Court's under Article 32. This is a significant advantage in many civil and service matters.",
    },
  },
];

const filterTabs = ["All", "Part I", "Part II", "Part III", "Part IV", "Part IV-A", "Part V", "Part VI"];

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

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

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 3v18M3 9l9-6 9 6M5 21h14" />
      <path d="M5 12l-2 6h4l-2-6zM19 12l-2 6h4l-2-6z" />
    </svg>
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

interface DetailPanelProps {
  article: Article | null;
  onClose: () => void;
}

function DetailPanel({ article, onClose }: DetailPanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  const isOpen = !!article;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-[#1a1208]/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={article?.title ?? "Article Detail"}
        className={`
          fixed top-0 right-0 z-50 h-full flex flex-col bg-white
          w-full sm:w-[440px] md:w-[500px] lg:w-[540px]
          shadow-[-4px_0_40px_rgba(26,18,8,0.12)]
          transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {article && (
          <>
            {/* Sticky header */}
            <div className="shrink-0 sticky top-0 z-10
              bg-gradient-to-br from-[#fdf3e3] to-[#f5edd5]
              border-b border-[#e8d4a0] px-5 pt-6 pb-5">
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="absolute top-4 right-4 w-8 h-8 rounded-full
                  bg-[#c48232]/10 border border-[#e8d4a0]
                  flex items-center justify-center text-[#c48232]
                  hover:bg-[#c48232]/20 transition-colors duration-150"
              >
                <CloseIcon />
              </button>

              <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-1">
                {article.tag}
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1208] font-serif leading-tight mb-1 pr-10">
                {article.number}
              </h2>
              <p className="text-sm font-semibold text-[#4a3c28] pr-10">{article.title}</p>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

              {/* Overview */}
              <section>
                <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-2 pb-2 border-b border-[#ede8df]">
                  Overview
                </p>
                <p className="text-sm text-[#4a3c28] leading-7">{article.detail.overview}</p>
              </section>

              {/* Key Points */}
              <section>
                <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-3 pb-2 border-b border-[#ede8df]">
                  Key Points
                </p>
                <ul className="space-y-2">
                  {article.detail.keyPoints.map((pt, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[#4a3c28] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c48232] shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Amendment History */}
              {article.detail.amendment && (
                <section>
                  <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-2 pb-2 border-b border-[#ede8df]">
                    Amendment History
                  </p>
                  <div className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl px-4 py-3">
                    <p className="text-sm text-[#6b4c1e] leading-relaxed">{article.detail.amendment}</p>
                  </div>
                </section>
              )}

              {/* Landmark Cases */}
              {article.detail.caselaw && article.detail.caselaw.length > 0 && (
                <section>
                  <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-3 pb-2 border-b border-[#ede8df]">
                    Landmark Cases
                  </p>
                  <div className="space-y-3">
                    {article.detail.caselaw.map((c, i) => (
                      <div key={i} className="bg-[#faf7f2] border border-[#ede8df] rounded-xl px-4 py-3.5">
                        <div className="flex gap-2 items-start mb-1.5">
                          <ScaleIcon />
                          <p className="text-sm font-bold text-[#1a1208] font-serif leading-tight">
                            {c.name}
                            <span className="ml-1.5 text-xs font-normal text-[#9e8c73]">({c.year})</span>
                          </p>
                        </div>
                        <p className="text-xs text-[#7a6a50] leading-relaxed pl-6">{c.significance}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Insight */}
              <section>
                <p className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-2 pb-2 border-b border-[#ede8df]">
                  Key Insight
                </p>
                <div className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-xl px-4 py-4">
                  <p className="text-sm text-[#6b4c1e] leading-7">{article.detail.insight}</p>
                </div>
              </section>

            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ─── Article Card ──────────────────────────────────────────────────────────────

interface ArticleCardProps {
  article: Article;
  bookmarked: boolean;
  onBookmark: () => void;
  onReadArticle: () => void;
}

function ArticleCard({ article, bookmarked, onBookmark, onReadArticle }: ArticleCardProps) {
  return (
    <div className="
      group relative bg-white border border-[#ede8df] rounded-2xl
      p-5 flex flex-col gap-1.5
      transition-all duration-200
      hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(196,130,50,0.10)]
      shadow-[0_1px_4px_rgba(0,0,0,0.05)]
    ">
      {/* Tag + Bookmark */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="bg-[#fdf3e3] border border-[#e8d4a0] rounded-full
          px-2.5 py-0.5 text-[11px] font-semibold text-[#c48232] leading-5 shrink-0 max-w-[75%]">
          {article.tag}
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

      {/* Number */}
      <p className="font-extrabold text-xl text-[#1a1208] font-serif leading-tight">
        {article.number}
      </p>

      {/* Title */}
      <p className="font-semibold text-sm text-[#4a3c28]">{article.title}</p>

      {/* Description */}
      <p className="text-xs text-[#7a6a50] leading-relaxed flex-1">{article.description}</p>

      {/* Read Article — triggers panel */}
      <button
        onClick={onReadArticle}
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
  const [activeFilter, setActiveFilter]       = useState("All");
  const [search, setSearch]                   = useState("");
  const [bookmarks, setBookmarks]             = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const toggleBookmark = (num: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const filtered = allArticles.filter((a) => {
    const matchesPart   = activeFilter === "All" || a.part === activeFilter;
    const q             = search.toLowerCase();
    const matchesSearch =
      !q ||
      a.number.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q);
    return matchesPart && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <div className="font-sans bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* ── Hero Header ── */}
        <section className="
          bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df]
          border-b border-[#ede8df]
          px-5 sm:px-8 md:px-12 lg:px-16
          py-10 sm:py-12 md:py-16
        ">
          <div className="max-w-4xl mx-auto">

            <p className="text-[11px] font-bold text-[#c48232] tracking-[1.5px] uppercase mb-3">
              Library
            </p>

            <h1 className="font-extrabold text-[#1a1208] font-serif leading-tight mb-4
              text-3xl sm:text-4xl md:text-5xl">
              Every Article. Clearly explained.
            </h1>

            <p className="text-sm sm:text-base text-[#7a6a50] leading-relaxed max-w-lg mb-7">
              Filter by part of the Constitution or search by Article number, name or topic.
            </p>

            {/* Search — icon on right */}
            <div className="
              flex items-center gap-3 bg-white border border-[#ede8df] rounded-xl
              px-4 py-2.5 max-w-sm sm:max-w-md
              shadow-[0_2px_8px_rgba(0,0,0,0.05)]
              focus-within:border-[#c48232] focus-within:shadow-[0_0_0_3px_rgba(196,130,50,0.12)]
              transition-all duration-200
            ">
              <input
                type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Article 21, Right to Education..."
                className="flex-1 border-none outline-none bg-transparent
                  text-sm text-[#1a1208] placeholder:text-[#b0a08a] font-sans"
              />
              <button aria-label="Search"
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                  text-[#9e8c73] hover:bg-[#fdf3e3] hover:text-[#c48232]
                  active:scale-95 transition-all duration-150">
                <SearchIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mt-5">
              {filterTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium border
                    transition-all duration-150
                    ${activeFilter === tab
                      ? "border-[#c48232] bg-[#fdf3e3] text-[#c48232] font-bold"
                      : "border-[#ede8df] bg-white text-[#7a6a50] hover:border-[#c48232]/50 hover:text-[#c48232]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Articles Grid ── */}
        <main className="
          max-w-6xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-12
          py-10 sm:py-12
        ">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#9e8c73] text-base">
              No articles found. Try a different search or filter.
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard
                  key={article.number}
                  article={article}
                  bookmarked={bookmarks.has(article.number)}
                  onBookmark={() => toggleBookmark(article.number)}
                  onReadArticle={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          )}

          {/* ── Quiz CTA — linked to /quiz ── */}
          <div className="flex justify-center mt-14 mb-4">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2
                bg-transparent border border-[#ede8df] rounded-xl
                px-7 py-3 text-sm font-semibold text-[#4a3c28]
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

      {/* ── Sliding Detail Panel ── */}
      <DetailPanel
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
}