// "use client";

// function AshokaChakra({
//   size = 400,
//   opacity = 1,
//   reverse = false,
//   duration = 70,
// }: {
//   size?: number;
//   opacity?: number;
//   reverse?: boolean;
//   duration?: number;
// }) {
//   const cx = 200, cy = 200;
//   const totalSpokes = 24;

//   const rings = [
//     { r: 192, sw: 10,  op: 1 },
//     { r: 180, sw: 2,   op: 0.5 },
//     { r: 166, sw: 6,   op: 0.9 },
//     { r: 154, sw: 1.5, op: 0.4 },
//   ];

//   const spokes = Array.from({ length: totalSpokes }, (_, i) => {
//     const angle = (i * 360) / totalSpokes;
//     const rad   = (angle * Math.PI) / 180;
//     const perp  = rad + Math.PI / 2;
//     const s = 28, e = 153;
//     return {
//       bx1: cx + s * Math.cos(rad) + 3.4 * Math.cos(perp),
//       by1: cy + s * Math.sin(rad) + 3.4 * Math.sin(perp),
//       bx2: cx + s * Math.cos(rad) - 3.4 * Math.cos(perp),
//       by2: cy + s * Math.sin(rad) - 3.4 * Math.sin(perp),
//       tx1: cx + e * Math.cos(rad) + 1.1 * Math.cos(perp),
//       ty1: cy + e * Math.sin(rad) + 1.1 * Math.sin(perp),
//       tx2: cx + e * Math.cos(rad) - 1.1 * Math.cos(perp),
//       ty2: cy + e * Math.sin(rad) - 1.1 * Math.sin(perp),
//       kx:  cx + 172 * Math.cos(rad),
//       ky:  cy + 172 * Math.sin(rad),
//     };
//   });

//   const petals = Array.from({ length: totalSpokes }, (_, i) => {
//     const angle = (i * 360) / totalSpokes + 360 / totalSpokes / 2;
//     const rad   = (angle * Math.PI) / 180;
//     return { px: cx + 120 * Math.cos(rad), py: cy + 120 * Math.sin(rad), angle };
//   });

//   return (
//     <svg
//       viewBox="0 0 400 400"
//       width={size}
//       height={size}
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//       style={{
//         opacity,
//         animation: `${reverse ? "chakraCCW" : "chakraCW"} ${duration}s linear infinite`,
//         display: "block",
//       }}
//     >
//       {rings.map((r, i) => (
//         <circle key={i} cx={cx} cy={cy} r={r.r} fill="none" stroke="#6b4a0e" strokeWidth={r.sw} opacity={r.op} />
//       ))}
//       {spokes.map((s, i) => (
//         <g key={i}>
//           <path
//             d={`M ${s.bx1} ${s.by1} L ${s.tx1} ${s.ty1} L ${s.tx2} ${s.ty2} L ${s.bx2} ${s.by2} Z`}
//             fill="#6b4a0e" opacity="0.9"
//           />
//           <circle cx={s.kx} cy={s.ky} r="8" fill="#6b4a0e" opacity="0.95" />
//         </g>
//       ))}
//       {petals.map((p, i) => (
//         <ellipse
//           key={i} cx={p.px} cy={p.py} rx="10" ry="4.2"
//           fill="#6b4a0e" opacity="0.75"
//           transform={`rotate(${p.angle + 90}, ${p.px}, ${p.py})`}
//         />
//       ))}
//       <circle cx={cx} cy={cy} r="30" fill="none" stroke="#6b4a0e" strokeWidth="10" opacity="0.95" />
//       <circle cx={cx} cy={cy} r="16" fill="#6b4a0e" opacity="0.85" />
//     </svg>
//   );
// }

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">

//       {/* ── KEYFRAMES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
//         @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
//         @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
//         .live-dot { animation: livePulse 1.8s ease-in-out infinite; }
//         @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//         .float-card { animation: floatUp 5s ease-in-out infinite; }
//       `}</style>

//       {/* ── BG CHAKRA — top right (large) ── */}
//       <div className="absolute -top-16 -right-40 pointer-events-none z-0 opacity-[0.08]">
//         <AshokaChakra size={700} duration={100} />
//       </div>

//       {/* ── BG CHAKRA — bottom left (small) ── */}
//       <div className="absolute -bottom-32 -left-32 pointer-events-none z-0 opacity-[0.06]">
//         <AshokaChakra size={500} duration={70} reverse />
//       </div>

//       {/* ── BG CHAKRA — mid left (tiny accent) ── */}
//       <div className="absolute top-1/2 -translate-y-1/2 -left-20 pointer-events-none z-0 opacity-[0.04]">
//         <AshokaChakra size={280} duration={50} />
//       </div>

//       {/* ── Hindi watermark ── */}
//       <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none -rotate-0">
//         {[
//           "सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
//           "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र",
//         ].map((line, i) => (
//           <span
//             key={i}
//             className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none"
//             style={{ color: "rgba(90,58,8,0.04)" }}
//           >
//             {line}
//           </span>
//         ))}
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

//           {/* ════ LEFT COLUMN ════ */}
//           <div className="w-full lg:flex-1 lg:max-w-[600px]">

//             {/* Headline */}
//             <h1 className="mb-6 leading-[1.05] tracking-tight">
//               <span className="block font-['Playfair_Display'] text-[3rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.5rem] font-black text-neutral-900">
//                 Learn the
//               </span>
//               <span className="relative block font-['Playfair_Display'] text-[3rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.5rem] font-black text-neutral-900">
//                 Constitution of India
//                 {/* Highlight underline */}
//                 <span className="absolute left-0 bottom-2 w-full h-[13px] rounded-sm -z-10" style={{ background: "rgba(251,191,36,0.32)" }} />
//               </span>
//               <span className="flex flex-wrap items-baseline gap-2 mt-1">
//                 {/* <em className="font-['Playfair_Display'] italic font-normal text-neutral-400 text-[2.4rem] sm:text-[2.8rem] lg:text-[3.2rem]">
//                   the
//                 </em> */}
//                 <span className="font-['Playfair_Display'] font-black text-orange-500 text-[2.7rem] sm:text-[3.2rem] lg:text-[3.6rem]">
//                  the Smart  Way
//                 </span>
//                 {/* <span className="font-['Playfair_Display'] font-black text-amber-600 text-[2.7rem] sm:text-[3.2rem] lg:text-[3.6rem]">
//                   Way.
//                 </span> */}
//               </span>
//             </h1>

//             {/* Sub-text */}
//             <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-[490px] font-['DM_Sans']">
//               Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
//               <strong className="text-neutral-800 font-semibold">KnowSamvidhan</strong>
//               {" "}— built for students, citizens, and aspirants.
//             </p>

//             {/* Search bar */}
//             <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
//               <svg className="text-neutral-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search any Article, Amendment, or ask AI..."
//                 className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0"
//               />
//               <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">
//                 ⌘ K
//               </kbd>
//             </div>

//             {/* Quick access tags */}
//             <div className="flex flex-wrap items-center gap-2 mb-9">
//               <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">
//                 Quick Access:
//               </span>
//               {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
//                 <button
//                   key={tag}
//                   className="bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-3 mb-11">
//               <button className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//                 </svg>
//                 Try AI Chat →
//               </button>
//               <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                   <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
//                 </svg>
//                 Browse Parts
//               </button>
//             </div>

//             {/* Stats row */}
//             <div className="flex flex-wrap gap-6 sm:gap-8">
//               {[
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
//                   ), bold: "100%", text: "Source-cited answers" },
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
//                   ), bold: "42,000+", text: "Learners onboard" },
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
//                   ), bold: "395", text: "Articles · 12 Schedules" },
//               ].map((s) => (
//                 <div key={s.bold} className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']">
//                   <span className="text-amber-600">{s.icon}</span>
//                   <strong className="text-neutral-900 font-semibold">{s.bold}</strong>
//                   <span>{s.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//             </div>
//           </div>

//     </section>
//   );
// }
// "use client";

// import { useState, useEffect, MouseEvent } from "react";

// function AshokaChakra({
//   size = 400,
//   opacity = 1,
//   reverse = false,
//   duration = 70,
// }: {
//   size?: number;
//   opacity?: number;
//   reverse?: boolean;
//   duration?: number;
// }) {
//   const cx = 200, cy = 200;
//   const totalSpokes = 24;

//   const rings = [
//     { r: 192, sw: 10,  op: 1 },
//     { r: 180, sw: 2,   op: 0.5 },
//     { r: 166, sw: 6,   op: 0.9 },
//     { r: 154, sw: 1.5, op: 0.4 },
//   ];

//   const spokes = Array.from({ length: totalSpokes }, (_, i) => {
//     const angle = (i * 360) / totalSpokes;
//     const rad   = (angle * Math.PI) / 180;
//     const perp  = rad + Math.PI / 2;
//     const s = 28, e = 153;
//     return {
//       bx1: cx + s * Math.cos(rad) + 3.4 * Math.cos(perp),
//       by1: cy + s * Math.sin(rad) + 3.4 * Math.sin(perp),
//       bx2: cx + s * Math.cos(rad) - 3.4 * Math.cos(perp),
//       by2: cy + s * Math.sin(rad) - 3.4 * Math.sin(perp),
//       tx1: cx + e * Math.cos(rad) + 1.1 * Math.cos(perp),
//       ty1: cy + e * Math.sin(rad) + 1.1 * Math.sin(perp),
//       tx2: cx + e * Math.cos(rad) - 1.1 * Math.cos(perp),
//       ty2: cy + e * Math.sin(rad) - 1.1 * Math.sin(perp),
//       kx:  cx + 172 * Math.cos(rad),
//       ky:  cy + 172 * Math.sin(rad),
//     };
//   });

//   const petals = Array.from({ length: totalSpokes }, (_, i) => {
//     const angle = (i * 360) / totalSpokes + 360 / totalSpokes / 2;
//     const rad   = (angle * Math.PI) / 180;
//     return { px: cx + 120 * Math.cos(rad), py: cy + 120 * Math.sin(rad), angle };
//   });

//   return (
//     <svg
//       viewBox="0 0 400 400"
//       width={size}
//       height={size}
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//       style={{
//         opacity,
//         animation: `${reverse ? "chakraCCW" : "chakraCW"} ${duration}s linear infinite`,
//         display: "block",
//       }}
//     >
//       {rings.map((r, i) => (
//         <circle key={i} cx={cx} cy={cy} r={r.r} fill="none" stroke="#6b4a0e" strokeWidth={r.sw} opacity={r.op} />
//       ))}
//       {spokes.map((s, i) => (
//         <g key={i}>
//           <path
//             d={`M ${s.bx1} ${s.by1} L ${s.tx1} ${s.ty1} L ${s.tx2} ${s.ty2} L ${s.bx2} ${s.by2} Z`}
//             fill="#6b4a0e" opacity="0.9"
//           />
//           <circle cx={s.kx} cy={s.ky} r="8" fill="#6b4a0e" opacity="0.95" />
//         </g>
//       ))}
//       {petals.map((p, i) => (
//         <ellipse
//           key={i} cx={p.px} cy={p.py} rx="10" ry="4.2"
//           fill="#6b4a0e" opacity="0.75"
//           transform={`rotate(${p.angle + 90}, ${p.px}, ${p.py})`}
//         />
//       ))}
//       <circle cx={cx} cy={cy} r="30" fill="none" stroke="#6b4a0e" strokeWidth="10" opacity="0.95" />
//       <circle cx={cx} cy={cy} r="16" fill="#6b4a0e" opacity="0.85" />
//     </svg>
//   );
// }

// export default function Hero() {
//   const rotatingWords = ["the Smart Way"]; // "Simply", "Smartly", "Effectively"
//   const [wordIndex, setWordIndex] = useState(0);
//   const [Animation, setAnimation] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWordIndex((prev) => (prev + 1) % rotatingWords.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [rotatingWords.length]);

//   function handleWordClick(event: MouseEvent<HTMLButtonElement>): void {
//     setAnimation(true);
//     setTimeout(() => setAnimation(false), 300);
//   }

//   return (
//     <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">

//       {/* ── KEYFRAMES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
//         @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
//         @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
//         .live-dot { animation: livePulse 1.8s ease-in-out infinite; }
//         @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//         .float-card { animation: floatUp 5s ease-in-out infinite; }
//       `}</style>

//       {/* ── BG CHAKRA — top right (large) ── */}
//       <div className="absolute -top-16 -right-40 pointer-events-none z-0 opacity-[0.08]">
//         <AshokaChakra size={700} duration={100} />
//       </div>

//       {/* ── BG CHAKRA — bottom left (small) ── */}
//       <div className="absolute -bottom-32 -left-32 pointer-events-none z-0 opacity-[0.06]">
//         <AshokaChakra size={500} duration={70} reverse />
//       </div>

//       {/* ── BG CHAKRA — mid left (tiny accent) ── */}
//       <div className="absolute top-1/2 -translate-y-1/2 -left-20 pointer-events-none z-0 opacity-[0.04]">
//         <AshokaChakra size={280} duration={50} />
//       </div>

//       {/* ── Hindi watermark ── */}
//       <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none -rotate-0">
//         {[
//           "सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
//           "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र",
//         ].map((line, i) => (
//           <span
//             key={i}
//             className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none"
//             style={{ color: "rgba(90,58,8,0.04)" }}
//           >
//             {line}
//           </span>
//         ))}
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

//           {/* ════ LEFT COLUMN ════ */}
//           <div className="w-full lg:flex-1 lg:max-w-[680px]">

//             <div>
//             <h1
//               className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-175"
//               style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
//             >
//               Learn the<br />
//               Constitution of India,{" "}
//               <button
//                 onClick={handleWordClick}
//                 className="inline-block px-4 py-1 rounded-lg text-white cursor-pointer transition-all duration-300 select-none"
//                 style={{
//                   background: "linear-gradient(90deg, #f97316, #ea580c)",
//                   opacity: Animation ? 0 : 1,
//                   transform: Animation ? "translateY(8px)" : "translateY(0)",
//                   transition: "opacity 0.3s, transform 0.3s",
//                   border: "none",
//                   fontFamily: "'Georgia', serif",
//                   fontSize: "inherit",
//                   fontWeight: "inherit",
//                 }}
//               >
//                 {rotatingWords[wordIndex]}
//               </button>
//             </h1>
//           </div>

//             {/* Sub-text */}
//             <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-[490px] font-['DM_Sans']">
//               Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
//               <strong className="text-neutral-800 font-semibold">KnowSamvidhan</strong>
//               {" "}— built for students, citizens, and aspirants.
//             </p>

//             {/* Search bar */}
//             <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
//               <svg className="text-neutral-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search any Article, Amendment, or ask AI..."
//                 className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0"
//               />
//               <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">
//                 ⌘ K
//               </kbd>
//             </div>

//             {/* Quick access tags */}
//             <div className="flex flex-wrap items-center gap-2 mb-9">
//               <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">
//                 Quick Access:
//               </span>
//               {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
//                 <button
//                   key={tag}
//                   className="bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-3 mb-11">
//               <button className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//                 </svg>
//                 Try AI Chat →
//               </button>
//               <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                   <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
//                 </svg>
//                 Browse Parts
//               </button>
//             </div>

//             {/* Stats row */}
//             <div className="flex flex-wrap gap-6 sm:gap-8">
//               {[
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
//                   ), bold: "100%", text: "Source-cited answers" },
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
//                   ), bold: "42,000+", text: "Learners onboard" },
//                 { icon: (
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
//                   ), bold: "395", text: "Articles · 12 Schedules" },
//               ].map((s) => (
//                 <div key={s.bold} className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']">
//                   <span className="text-amber-600">{s.icon}</span>
//                   <strong className="text-neutral-900 font-semibold">{s.bold}</strong>
//                   <span>{s.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ════ RIGHT COLUMN — Constitution Book Image ════ */}
//           <div className="w-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-end">
//             <div className="relative">

//               {/* Warm radial glow behind image */}
//               <div
//                 className="absolute -inset-8 -z-10 blur-3xl rounded-full"
//                 style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)" }}
//               />

//               {/* Soft shadow plate */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10"
//                 style={{ background: "rgba(120,80,10,0.18)" }}
//               />

//               {/* The book image */}
//               <img
//                 src="image/con.png"
//                 alt="Constitution of India"
//                 className="float-card relative z-10 w-[300px] sm:w-[360px] lg:w-[400px] xl:w-[440px] object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.28)]"
//                 style={{ borderRadius: "10px" }}
//               />

//               {/* Satyamev Jayate label under book */}
//               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
//                 <span className="text-[0.75rem] font-['DM_Sans'] text-neutral-400 tracking-[0.18em] uppercase">
//                   सत्यमेव जयते
//                 </span>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useEffect, MouseEvent } from "react";

// export default function Hero() {
//   const rotatingWords = ["the Smart Way", "Simply", "Smartly", "Effectively"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [Animation, setAnimation] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWordIndex((prev) => (prev + 1) % rotatingWords.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [rotatingWords.length]);

//   function handleWordClick(event: MouseEvent<HTMLButtonElement>): void {
//     setAnimation(true);
//     setTimeout(() => setAnimation(false), 300);
//   }

//   return (
//     <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">
//       {/* ── KEYFRAMES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
//         @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
//         @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
//         .live-dot { animation: livePulse 1.8s ease-in-out infinite; }
//         @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//         .float-card { animation: floatUp 5s ease-in-out infinite; }
//         .chakra-cw  { animation: chakraCW  100s linear infinite; display: block; }
//         .chakra-ccw { animation: chakraCCW  70s linear infinite; display: block; }
//         .chakra-sm  { animation: chakraCW   50s linear infinite; display: block; }
//       `}</style>

//       {/* ── BG CHAKRA — top right (large) ── */}
//       <div className="absolute  -right-80 pointer-events-none z-0 opacity-[0.08]">
//         <img
//           src="image/ashoka.png"
//           alt=""
//           aria-hidden="true"
//           className="chakra-cw"
//           width={900}
//           height={900}
//         />
//       </div>

//       {/* ── BG CHAKRA — bottom left (small) ── */}
//       <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
//         <img
//           src="image/ashoka.png"
//           alt=""
//           aria-hidden="true"
//           className="chakra-ccw"
//           width={700}
//           height={500}
//         />
//       </div>

//       {/* ── BG CHAKRA — mid left (tiny accent) ── */}
//       <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
//         <img
//           src="image/ashoka.png"
//           alt=""
//           aria-hidden="true"
//           className="chakra-sm"
//           width={480}
//           height={280}
//         />
//       </div>

//       {/* ── Hindi watermark ── */}
//       <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none rotate-0">
//         {[
//           "सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
//           "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र",
//         ].map((line, i) => (
//           <span
//             key={i}
//             className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none"
//             style={{ color: "rgba(90,58,8,0.04)" }}
//           >
//             {line}
//           </span>
//         ))}
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
//           {/* ════ LEFT COLUMN ════ */}
//           <div className="w-full lg:flex-1 lg:max-w-170">
//             {/* <div>
//             <h1
//               className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-175"
//               style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
//             >
//               Learn the<br />
//               Constitution of India,{" "}
//               <button
//                 onClick={handleWordClick}
//                 className="inline-block px-4 py-1 rounded-lg text-white cursor-pointer transition-all duration-300 select-none"
//                 style={{
//                   background: "linear-gradient(90deg, #f97316, #ea580c)",
//                   opacity: Animation ? 0 : 1,
//                   transform: Animation ? "translateY(8px)" : "translateY(0)",
//                   transition: "opacity 0.3s, transform 0.3s",
//                   border: "none",
//                   fontFamily: "'Georgia', serif",
//                   fontSize: "inherit",
//                   fontWeight: "inherit",
//                 }}
//               >
//                 {rotatingWords[wordIndex]}
//               </button>
//             </h1>
//           </div> */}
//             <div className="max-w-7xl w-full">
//               <h1
//                 className="text-[56px] lg:text-[72px] font-bold leading-[1.1] text-gray-900"
//                 style={{
//                   fontFamily: "'Georgia', serif",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Learn the <br /> Constitution of India,
//                 <br />{" "}
//                 <span className="inline-block mt-2">
//                   <button
//                     onClick={handleWordClick}
//                     className="px-5 py-2 rounded-xl text-orange-400 transition-all duration-300"
//                     style={{
//                       opacity: Animation ? 0 : 1,
//                       transform: Animation
//                         ? "translateY(10px)"
//                         : "translateY(0)",
//                       border: "none",
//                       fontFamily: "'Georgia', serif",
//                       fontSize: "inherit",
//                       fontWeight: "inherit",
//                     }}
//                   >
//                     {rotatingWords[wordIndex]}
//                   </button>
//                 </span>
//               </h1>
//             </div>

//             {/* Sub-text */}
//             <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-122.5 font-['DM_Sans']">
//               Search articles, ask AI doubts, practice quizzes, and master
//               amendments with{" "}
//               <strong className="text-neutral-800 font-semibold">
//                 KnowSamvidhan
//               </strong>{" "}
//               — built for students, citizens, and aspirants.
//             </p>

//             {/* Search bar */}
//             <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
//               <svg
//                 className="text-neutral-400 shrink-0"
//                 width="17"
//                 height="17"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.2"
//               >
//                 <circle cx="11" cy="11" r="8" />
//                 <path d="m21 21-4.35-4.35" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search any Article, Amendment, or ask AI..."
//                 className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0"
//               />
//               <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">
//                 ⌘ K
//               </kbd>
//             </div>

//             {/* Quick access tags */}
//             <div className="flex flex-wrap items-center gap-2 mb-9">
//               <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">
//                 Quick Access:
//               </span>
//               {[
//                 "Preamble",
//                 "Fundamental Rights",
//                 "Directive Principles",
//                 "Recent Amendments",
//                 "Schedules",
//               ].map((tag) => (
//                 <button
//                   key={tag}
//                   className="bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-3 mb-11">
//               <button className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg
//                   width="15"
//                   height="15"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.2"
//                 >
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                 </svg>
//                 Try AI Chat →
//               </button>
//               <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                 <svg
//                   width="15"
//                   height="15"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.2"
//                 >
//                   <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                   <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                 </svg>
//                 Browse Parts
//               </button>
//             </div>

//             {/* Stats row */}
//             <div className="flex flex-wrap gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: (
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                     </svg>
//                   ),
//                   bold: "100%",
//                   text: "Source-cited answers",
//                 },
//                 {
//                   icon: (
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                       <circle cx="9" cy="7" r="4" />
//                       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//                       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                     </svg>
//                   ),
//                   bold: "42,000+",
//                   text: "Learners onboard",
//                 },
//                 {
//                   icon: (
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                       <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                     </svg>
//                   ),
//                   bold: "395",
//                   text: "Articles · 12 Schedules",
//                 },
//               ].map((s) => (
//                 <div
//                   key={s.bold}
//                   className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']"
//                 >
//                   <span className="text-amber-600">{s.icon}</span>
//                   <strong className="text-neutral-900 font-semibold">
//                     {s.bold}
//                   </strong>
//                   <span>{s.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ════ RIGHT COLUMN — Constitution Book Image ════ */}
//           <div className="w-full lg:w-auto lg:shrink-0 flex  justify-center lg:justify-end">
//             <div className="relative">
//               {/* Warm radial glow behind image */}
//               <div
//                 className="absolute -inset-8 -z-10 blur-3xl rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)",
//                 }}
//               />

//               {/* Soft shadow plate */}
//               <div
//                 className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10"
//                 style={{ background: "rgba(120,80,10,0.18)" }}
//               />

//               {/* The book image */}
//               <img
//                 src="image/book.png"
//                 alt="Constitution of India"
//                 className="float-card relative z-10 w-75 sm:w-90 lg:w-100 xl:w-110 object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.28)]"
//                 style={{ borderRadius: "20px" }}
//               />

//               {/* Satyamev Jayate label under book */}
//               <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
//                 <span className="text-[0.75rem] font-['DM_Sans'] text-neutral-400 tracking-[0.18em] uppercase">
//                   सत्यमेव जयते
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
   



// //ddddd

//   <section class="max-w-4xl mx-auto px-6 pt-10 pb-4">
//     <div class="relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-10 flex items-center gap-10 overflow-hidden">

//       <!-- Glow circles -->
//       <div class="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-yellow-300 opacity-10 pointer-events-none"></div>
//       <div class="absolute -bottom-20 left-28 w-72 h-72 rounded-full bg-orange-300 opacity-10 pointer-events-none"></div>

//       <!-- Book illustration -->
//       <div class="flex-shrink-0 w-44 relative z-10">
//         <svg class="book-shadow" style="transform:rotate(-4deg)" width="160" height="150" viewBox="0 0 160 150" fill="none">
//           <rect x="20" y="20" width="120" height="110" rx="6" fill="#f5e6c8"/>
//           <rect x="20" y="20" width="120" height="110" rx="6" stroke="#c9a96e" stroke-width="1.5"/>
//           <rect x="20" y="20" width="14" height="110" rx="4" fill="#c9a96e"/>
//           <rect x="20" y="20" width="14" height="110" rx="4" stroke="#a07c45" stroke-width="1"/>
//           <path d="M34 28 Q80 22 146 28 L146 122 Q80 128 34 122 Z" fill="#fdf8f0" stroke="#e8d5b0" stroke-width="1"/>
//           <rect x="50" y="45" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4"/>
//           <rect x="50" y="56" width="65" height="4" rx="2" fill="#b8975a" opacity="0.35"/>
//           <rect x="50" y="67" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4"/>
//           <rect x="50" y="78" width="55" height="4" rx="2" fill="#b8975a" opacity="0.3"/>
//           <rect x="50" y="89" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4"/>
//           <rect x="50" y="100" width="70" height="4" rx="2" fill="#b8975a" opacity="0.35"/>
//           <rect x="50" y="111" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4"/>
//           <path d="M80 128 Q74 136 68 142" stroke="#e53e3e" stroke-width="3" stroke-linecap="round"/>
//           <path d="M80 128 Q86 136 92 142" stroke="#e53e3e" stroke-width="3" stroke-linecap="round"/>
//           <circle cx="80" cy="128" r="4" fill="#e53e3e"/>
//           <!-- Ashoka Chakra -->
//           <circle cx="60" cy="16" r="13" fill="none" stroke="#f97316" stroke-width="1.8"/>
//           <circle cx="60" cy="16" r="3.5" fill="#f97316" opacity="0.7"/>
//           <line x1="60" y1="4" x2="60" y2="28" stroke="#f97316" stroke-width="0.9" opacity="0.8"/>
//           <line x1="48" y1="16" x2="72" y2="16" stroke="#f97316" stroke-width="0.9" opacity="0.8"/>
//           <line x1="51.5" y1="7.5" x2="68.5" y2="24.5" stroke="#f97316" stroke-width="0.9" opacity="0.8"/>
//           <line x1="68.5" y1="7.5" x2="51.5" y2="24.5" stroke="#f97316" stroke-width="0.9" opacity="0.8"/>
//           <line x1="48" y1="11" x2="72" y2="21" stroke="#f97316" stroke-width="0.7" opacity="0.5"/>
//           <line x1="72" y1="11" x2="48" y2="21" stroke="#f97316" stroke-width="0.7" opacity="0.5"/>
//           <line x1="55" y1="4" x2="65" y2="28" stroke="#f97316" stroke-width="0.7" opacity="0.5"/>
//           <line x1="65" y1="4" x2="55" y2="28" stroke="#f97316" stroke-width="0.7" opacity="0.5"/>
//         </svg>
//       </div>

//       <!-- Content -->
//       <div class="relative z-10 flex-1 min-w-0">
//         <!-- Badge -->
//         <div class="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold text-orange-700 mb-4">
//           <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
//           Foundational
//         </div>

//         <h1 class="text-3xl font-bold text-stone-900 mb-3 leading-tight tracking-tight">
//           Begin with the Preamble
//         </h1>

//         <p class="text-sm text-stone-600 leading-relaxed mb-4 font-sans font-normal">
//           A single sentence that defines who we are as a nation. Read the official text alongside a clear,
//           modern explanation of Justice, Liberty, Equality and Fraternity.
//         </p>

//         <blockquote class="text-sm italic text-stone-700 border-l-[3px] border-amber-400 pl-4 mb-6 leading-relaxed font-serif">
//           "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a
//           SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
//           JUSTICE, social, eco…"
//         </blockquote>

//         <button class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-150">
//           Read the Preamble
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//             <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>
//         </button>
//       </div>
//     </div>
//   </section>


//   <!-- ════════════════════════════════════════════
//        SECTION 2 — BROWSE BY PARTS
//   ════════════════════════════════════════════ -->
//   <section class="max-w-4xl mx-auto px-6 pt-14 pb-4">

//     <div class="flex items-end justify-between mb-6">
//       <div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Chapters</p>
//         <h2 class="text-3xl font-bold text-stone-900 leading-tight">Browse by Parts</h2>
//         <p class="text-sm text-stone-500 mt-1">The Constitution is organised into Parts. Pick a chapter to start.</p>
//       </div>
//       <a href="#" class="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap">
//         All Parts
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//       </a>
//     </div>

//     <div class="grid grid-cols-3 gap-4">

//       <!-- Part I -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part I</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">The Union and its Territory</h3>
//         <p class="text-xs text-stone-400 mb-3">Articles 1 – 4</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">Defines India as a Union of States and provides for admission, formation and alteration of States.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Part II -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part II</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">Citizenship</h3>
//         <p class="text-xs text-stone-400 mb-3">Articles 5 – 11</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">Lays down who is a citizen of India at the commencement of the Constitution and…</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Part III -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part III</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">Fundamental Rights</h3>
//         <p class="text-xs text-stone-400 mb-3">Articles 12 – 35</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">The cornerstone of individual liberty — equality, freedom, life, religion and constitutional remedies.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Part IV -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part IV</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">Directive Principles of State Policy</h3>
//         <p class="text-xs text-stone-400 mb-3">Articles 36 – 51</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">Non-justiciable guidelines for the State to build a just social and economic order.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Part IV-A -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part IV-A</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">Fundamental Duties</h3>
//         <p class="text-xs text-stone-400 mb-3">Article 51A</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">Eleven moral duties of every Indian citizen, added by the 42nd Amendment.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Part V -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//         <div class="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>
//         </div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Part V</p>
//         <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">The Union</h3>
//         <p class="text-xs text-stone-400 mb-3">Articles 52 – 151</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-4">Structure of the Union government — President, Parliament, Supreme Court and the CAG.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Explore
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//     </div>
//   </section>


//   <!-- ════════════════════════════════════════════
//        SECTION 3 — FEATURED ARTICLES
//   ════════════════════════════════════════════ -->
//   <section class="max-w-4xl mx-auto px-6 pt-16 pb-4">

//     <div class="flex items-end justify-between mb-6">
//       <div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Featured</p>
//         <h2 class="text-3xl font-bold text-stone-900 leading-tight">Articles to start with</h2>
//       </div>
//       <a href="#" class="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap">
//         View all
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//       </a>
//     </div>

//     <div class="grid grid-cols-3 gap-4">

//       <!-- Article 14 -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//           Fundamental Rights
//         </div>
//         <h3 class="text-xl font-bold text-stone-900 mb-1">Article 14</h3>
//         <p class="text-sm font-medium text-stone-600 mb-3">Equality before law</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-5">The State shall not deny to any person equality before the law or the equal protection of the laws.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Read article
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Article 19 -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//           Fundamental Rights
//         </div>
//         <h3 class="text-xl font-bold text-stone-900 mb-1">Article 19</h3>
//         <p class="text-sm font-medium text-stone-600 mb-3">Six freedoms</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-5">Guarantees six fundamental freedoms including speech, assembly, and movement.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Read article
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//       <!-- Article 21 -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//           Fundamental Rights
//         </div>
//         <h3 class="text-xl font-bold text-stone-900 mb-1">Article 21</h3>
//         <p class="text-sm font-medium text-stone-600 mb-3">Right to life and personal liberty</p>
//         <p class="text-xs text-stone-500 leading-relaxed mb-5">No person shall be deprived of life or personal liberty except according to procedure established by law.</p>
//         <a href="#" class="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
//           Read article
//           <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </a>
//       </div>

//     </div>
//   </section>


//   <!-- ════════════════════════════════════════════
//        SECTION 4 — IMPORTANT AMENDMENTS
//   ════════════════════════════════════════════ -->
//   <section class="max-w-4xl mx-auto px-6 pt-16 pb-14">

//     <div class="flex items-end justify-between mb-6">
//       <div>
//         <p class="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Timeline</p>
//         <h2 class="text-3xl font-bold text-stone-900 leading-tight">Important amendments</h2>
//       </div>
//       <a href="#" class="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap">
//         See timeline
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
//       </a>
//     </div>

//     <div class="grid grid-cols-4 gap-4">

//       <!-- 1st Amendment -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="flex items-center gap-1.5 mb-3">
//           <div class="w-2 h-2 rounded-full bg-green-500"></div>
//           <span class="text-xs font-semibold text-stone-400">1951</span>
//         </div>
//         <h3 class="text-base font-bold text-stone-900 mb-2 leading-snug">1st Amendment</h3>
//         <p class="text-xs text-stone-500 leading-relaxed">Added the Ninth Schedule to protect land reform laws and modified Articles 15 and 19.</p>
//       </div>

//       <!-- 42nd Amendment -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="flex items-center gap-1.5 mb-3">
//           <div class="w-2 h-2 rounded-full bg-blue-500"></div>
//           <span class="text-xs font-semibold text-stone-400">1976</span>
//         </div>
//         <h3 class="text-base font-bold text-stone-900 mb-2 leading-snug">42nd Amendment</h3>
//         <p class="text-xs text-stone-500 leading-relaxed">Added the words Socialist, Secular and Integrity to the Preamble; introduced Fundamental Duties.</p>
//       </div>

//       <!-- 44th Amendment -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="flex items-center gap-1.5 mb-3">
//           <div class="w-2 h-2 rounded-full bg-purple-500"></div>
//           <span class="text-xs font-semibold text-stone-400">1978</span>
//         </div>
//         <h3 class="text-base font-bold text-stone-900 mb-2 leading-snug">44th Amendment</h3>
//         <p class="text-xs text-stone-500 leading-relaxed">Reversed many of the 42nd Amendment's changes; right to property removed from…</p>
//       </div>

//       <!-- 73rd Amendment -->
//       <div class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//         <div class="flex items-center gap-1.5 mb-3">
//           <div class="w-2 h-2 rounded-full bg-orange-500"></div>
//           <span class="text-xs font-semibold text-stone-400">1992</span>
//         </div>
//         <h3 class="text-base font-bold text-stone-900 mb-2 leading-snug">73rd Amendment</h3>
//         <p class="text-xs text-stone-500 leading-relaxed">Constitutional status to Panchayats; created a three-tier system of local self-government.</p>
//       </div>

//     </div>
//   </section>
  

// }






// "use client";

// import { useState, useEffect, MouseEvent } from "react";

// export default function Hero() {
//   const rotatingWords = ["the Smart Way", "Simply", "Smartly", "Effectively"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [Animation, setAnimation] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWordIndex((prev) => (prev + 1) % rotatingWords.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [rotatingWords.length]);

//   function handleWordClick(event: MouseEvent<HTMLButtonElement>): void {
//     setAnimation(true);
//     setTimeout(() => setAnimation(false), 300);
//   }

//   return (
//     <>
//       <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">
//         {/* ── KEYFRAMES ── */}
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
//           @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
//           @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
//           @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
//           .live-dot { animation: livePulse 1.8s ease-in-out infinite; }
//           @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//           .float-card { animation: floatUp 5s ease-in-out infinite; }
//           .chakra-cw  { animation: chakraCW  100s linear infinite; display: block; }
//           .chakra-ccw { animation: chakraCCW  70s linear infinite; display: block; }
//           .chakra-sm  { animation: chakraCW   50s linear infinite; display: block; }
//         `}</style>

//         {/* ── BG CHAKRA — top right (large) ── */}
//         <div className="absolute -right-80 pointer-events-none z-0 opacity-[0.08]">
//           <img
//             src="image/ashoka.png"
//             alt=""
//             aria-hidden="true"
//             className="chakra-cw"
//             width={900}
//             height={900}
//           />
//         </div>

//         {/* ── BG CHAKRA — bottom left (small) ── */}
//         <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
//           <img
//             src="image/ashoka.png"
//             alt=""
//             aria-hidden="true"
//             className="chakra-ccw"
//             width={700}
//             height={500}
//           />
//         </div>

//         {/* ── BG CHAKRA — mid left (tiny accent) ── */}
//         <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
//           <img
//             src="image/ashoka.png"
//             alt=""
//             aria-hidden="true"
//             className="chakra-sm"
//             width={480}
//             height={280}
//           />
//         </div>

//         {/* ── Hindi watermark ── */}
//         <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none rotate-0">
//           {[
//             "सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
//             "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र",
//           ].map((line, i) => (
//             <span
//               key={i}
//               className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none"
//               style={{ color: "rgba(90,58,8,0.04)" }}
//             >
//               {line}
//             </span>
//           ))}
//         </div>

//         {/* ── MAIN CONTENT ── */}
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
//           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
//             {/* ════ LEFT COLUMN ════ */}
//             <div className="w-full lg:flex-1 lg:max-w-170">
//               <div className="max-w-7xl w-full">
//                 <h1
//                   className="text-[56px] lg:text-[72px] font-bold leading-[1.1] text-gray-900"
//                   style={{
//                     fontFamily: "'Georgia', serif",
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   Learn the <br /> Constitution of India,
//                   <br />
//                   <span className="inline-block mt-2">
//                     <button
//                       onClick={handleWordClick}
//                       className="px-5 py-2 rounded-xl text-orange-400 transition-all duration-300"
//                       style={{
//                         opacity: Animation ? 0 : 1,
//                         transform: Animation ? "translateY(10px)" : "translateY(0)",
//                         border: "none",
//                         fontFamily: "'Georgia', serif",
//                         fontSize: "inherit",
//                         fontWeight: "inherit",
//                       }}
//                     >
//                       {rotatingWords[wordIndex]}
//                     </button>
//                   </span>
//                 </h1>
//               </div>

//               {/* Sub-text */}
//               <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-122.5 font-['DM_Sans']">
//                 Search articles, ask AI doubts, practice quizzes, and master
//                 amendments with{" "}
//                 <strong className="text-neutral-800 font-semibold">
//                   KnowSamvidhan
//                 </strong>{" "}
//                 — built for students, citizens, and aspirants.
//               </p>

//               {/* Search bar */}
//               <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
//                 <svg
//                   className="text-neutral-400 shrink-0"
//                   width="17"
//                   height="17"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.2"
//                 >
//                   <circle cx="11" cy="11" r="8" />
//                   <path d="m21 21-4.35-4.35" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search any Article, Amendment, or ask AI..."
//                   className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0"
//                 />
//                 <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">
//                   ⌘ K
//                 </kbd>
//               </div>

//               {/* Quick access tags */}
//               <div className="flex flex-wrap items-center gap-2 mb-9">
//                 <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">
//                   Quick Access:
//                 </span>
//                 {[
//                   "Preamble",
//                   "Fundamental Rights",
//                   "Directive Principles",
//                   "Recent Amendments",
//                   "Schedules",
//                 ].map((tag) => (
//                   <button
//                     key={tag}
//                     className="bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-wrap gap-3 mb-11">
//                 <button className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.2"
//                   >
//                     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                   </svg>
//                   Try AI Chat →
//                 </button>
//                 <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.2"
//                   >
//                     <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                     <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                   </svg>
//                   Browse Parts
//                 </button>
//               </div>

//               {/* Stats row */}
//               <div className="flex flex-wrap gap-6 sm:gap-8">
//                 {[
//                   {
//                     icon: (
//                       <svg
//                         width="15"
//                         height="15"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                       </svg>
//                     ),
//                     bold: "100%",
//                     text: "Source-cited answers",
//                   },
//                   {
//                     icon: (
//                       <svg
//                         width="15"
//                         height="15"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                         <circle cx="9" cy="7" r="4" />
//                         <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//                         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                       </svg>
//                     ),
//                     bold: "42,000+",
//                     text: "Learners onboard",
//                   },
//                   {
//                     icon: (
//                       <svg
//                         width="15"
//                         height="15"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                         <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                       </svg>
//                     ),
//                     bold: "395",
//                     text: "Articles · 12 Schedules",
//                   },
//                 ].map((s) => (
//                   <div
//                     key={s.bold}
//                     className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']"
//                   >
//                     <span className="text-amber-600">{s.icon}</span>
//                     <strong className="text-neutral-900 font-semibold">
//                       {s.bold}
//                     </strong>
//                     <span>{s.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ════ RIGHT COLUMN — Constitution Book Image ════ */}
//             <div className="w-full lg:w-auto lg:shrink-0 flex  justify-center lg:justify-end">
//               <div className="relative">
//                 {/* Warm radial glow behind image */}
//                 <div
//                   className="absolute -inset-8 -z-10 blur-3xl rounded-full"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)",
//                   }}
//                 />

//                 {/* Soft shadow plate */}
//                 <div
//                   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10"
//                   style={{ background: "rgba(120,80,10,0.18)" }}
//                 />

//                 {/* The book image */}
//                 <img
//                   src="image/book.png"
//                   alt="Constitution of India"
//                   className="float-card relative z-10 w-75 sm:w-90 lg:w-100 xl:w-110 object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.28)]"
//                   style={{ borderRadius: "20px" }}
//                 />

//                 {/* Satyamev Jayate label under book */}
//                 <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
//                   <span className="text-[0.75rem] font-['DM_Sans'] text-neutral-400 tracking-[0.18em] uppercase">
//                     सत्यमेव जयते
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ddddd */}

//       <section className="max-w-4xl mx-auto px-6 pt-10 pb-4">
//         <div className="relative bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-10 flex items-center gap-10 overflow-hidden">
//           {/* Glow circles */}
//           <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-yellow-300 opacity-10 pointer-events-none"></div>
//           <div className="absolute -bottom-20 left-28 w-72 h-72 rounded-full bg-orange-300 opacity-10 pointer-events-none"></div>

//           {/* Book illustration */}
//           <div className="shrink-0 w-44 relative z-10">
//             <svg
//               className="book-shadow"
//               style={{ transform: "rotate(-4deg)" }}
//               width="160"
//               height="150"
//               viewBox="0 0 160 150"
//               fill="none"
//             >
//               <rect x="20" y="20" width="120" height="110" rx="6" fill="#f5e6c8" />
//               <rect
//                 x="20"
//                 y="20"
//                 width="120"
//                 height="110"
//                 rx="6"
//                 stroke="#c9a96e"
//                 strokeWidth="1.5"
//               />
//               <rect x="20" y="20" width="14" height="110" rx="4" fill="#c9a96e" />
//               <rect
//                 x="20"
//                 y="20"
//                 width="14"
//                 height="110"
//                 rx="4"
//                 stroke="#a07c45"
//                 strokeWidth="1"
//               />
//               <path
//                 d="M34 28 Q80 22 146 28 L146 122 Q80 128 34 122 Z"
//                 fill="#fdf8f0"
//                 stroke="#e8d5b0"
//                 strokeWidth="1"
//               />
//               <rect x="50" y="45" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
//               <rect x="50" y="56" width="65" height="4" rx="2" fill="#b8975a" opacity="0.35" />
//               <rect x="50" y="67" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
//               <rect x="50" y="78" width="55" height="4" rx="2" fill="#b8975a" opacity="0.3" />
//               <rect x="50" y="89" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
//               <rect x="50" y="100" width="70" height="4" rx="2" fill="#b8975a" opacity="0.35" />
//               <rect x="50" y="111" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
//               <path
//                 d="M80 128 Q74 136 68 142"
//                 stroke="#e53e3e"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M80 128 Q86 136 92 142"
//                 stroke="#e53e3e"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//               />
//               <circle cx="80" cy="128" r="4" fill="#e53e3e" />

//               {/* Ashoka Chakra */}
//               <circle cx="60" cy="16" r="13" fill="none" stroke="#f97316" strokeWidth="1.8" />
//               <circle cx="60" cy="16" r="3.5" fill="#f97316" opacity="0.7" />
//               <line x1="60" y1="4" x2="60" y2="28" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
//               <line x1="48" y1="16" x2="72" y2="16" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
//               <line
//                 x1="51.5"
//                 y1="7.5"
//                 x2="68.5"
//                 y2="24.5"
//                 stroke="#f97316"
//                 strokeWidth="0.9"
//                 opacity="0.8"
//               />
//               <line
//                 x1="68.5"
//                 y1="7.5"
//                 x2="51.5"
//                 y2="24.5"
//                 stroke="#f97316"
//                 strokeWidth="0.9"
//                 opacity="0.8"
//               />
//               <line x1="48" y1="11" x2="72" y2="21" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
//               <line x1="72" y1="11" x2="48" y2="21" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
//               <line x1="55" y1="4" x2="65" y2="28" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
//               <line x1="65" y1="4" x2="55" y2="28" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
//             </svg>
//           </div>

//           {/* Content */}
//           <div className="relative z-10 flex-1 min-w-0">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold text-orange-700 mb-4">
//               <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
//               Foundational
//             </div>

//             <h1 className="text-3xl font-bold text-stone-900 mb-3 leading-tight tracking-tight">
//               Begin with the Preamble
//             </h1>

//             <p className="text-sm text-stone-600 leading-relaxed mb-4 font-sans font-normal">
//               A single sentence that defines who we are as a nation. Read the
//               official text alongside a clear, modern explanation of Justice,
//               Liberty, Equality and Fraternity.
//             </p>

//             <blockquote className="text-sm italic text-stone-700 border-l-[3px] border-amber-400 pl-4 mb-6 leading-relaxed font-serif">
//               "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute
//               India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and
//               to secure to all its citizens: JUSTICE, social, eco…"
//             </blockquote>

//             <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-150">
//               Read the Preamble
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M2 7h10M8 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════════
//            SECTION 2 — BROWSE BY PARTS
//       ════════════════════════════════════════════ */}
//       <section className="max-w-4xl mx-auto px-6 pt-14 pb-4">
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Chapters
//             </p>
//             <h2 className="text-3xl font-bold text-stone-900 leading-tight">
//               Browse by Parts
//             </h2>
//             <p className="text-sm text-stone-500 mt-1">
//               The Constitution is organised into Parts. Pick a chapter to start.
//             </p>
//           </div>
//           <a
//             href="#"
//             className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
//           >
//             All Parts
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <path
//                 d="M3 7h8M7 3l4 4-4 4"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </a>
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           {/* Part I */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part I
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               The Union and its Territory
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Articles 1 – 4</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               Defines India as a Union of States and provides for admission,
//               formation and alteration of States.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Part II */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part II
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               Citizenship
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Articles 5 – 11</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               Lays down who is a citizen of India at the commencement of the
//               Constitution and…
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Part III */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part III
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               Fundamental Rights
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Articles 12 – 35</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               The cornerstone of individual liberty — equality, freedom, life,
//               religion and constitutional remedies.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Part IV */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part IV
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               Directive Principles of State Policy
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Articles 36 – 51</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               Non-justiciable guidelines for the State to build a just social
//               and economic order.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Part IV-A */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part IV-A
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               Fundamental Duties
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Article 51A</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               Eleven moral duties of every Indian citizen, added by the 42nd
//               Amendment.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Part V */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
//             <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
//               <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M4 5h12M4 10h8M4 15h10"
//                   stroke="#d97706"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Part V
//             </p>
//             <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
//               The Union
//             </h3>
//             <p className="text-xs text-stone-400 mb-3">Articles 52 – 151</p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-4">
//               Structure of the Union government — President, Parliament, Supreme
//               Court and the CAG.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Explore
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════════
//            SECTION 3 — FEATURED ARTICLES
//       ════════════════════════════════════════════ */}
//       <section className="max-w-4xl mx-auto px-6 pt-16 pb-4">
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Featured
//             </p>
//             <h2 className="text-3xl font-bold text-stone-900 leading-tight">
//               Articles to start with
//             </h2>
//           </div>
//           <a
//             href="#"
//             className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
//           >
//             View all
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <path
//                 d="M3 7h8M7 3l4 4-4 4"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </a>
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           {/* Article 14 */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//               Fundamental Rights
//             </div>
//             <h3 className="text-xl font-bold text-stone-900 mb-1">Article 14</h3>
//             <p className="text-sm font-medium text-stone-600 mb-3">
//               Equality before law
//             </p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-5">
//               The State shall not deny to any person equality before the law or
//               the equal protection of the laws.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Read article
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Article 19 */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//               Fundamental Rights
//             </div>
//             <h3 className="text-xl font-bold text-stone-900 mb-1">Article 19</h3>
//             <p className="text-sm font-medium text-stone-600 mb-3">
//               Six freedoms
//             </p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-5">
//               Guarantees six fundamental freedoms including speech, assembly,
//               and movement.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Read article
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Article 21 */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
//               Fundamental Rights
//             </div>
//             <h3 className="text-xl font-bold text-stone-900 mb-1">Article 21</h3>
//             <p className="text-sm font-medium text-stone-600 mb-3">
//               Right to life and personal liberty
//             </p>
//             <p className="text-xs text-stone-500 leading-relaxed mb-5">
//               No person shall be deprived of life or personal liberty except
//               according to procedure established by law.
//             </p>
//             <a
//               href="#"
//               className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
//             >
//               Read article
//               <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
//                 <path
//                   d="M3 7h8M7 3l4 4-4 4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════════
//            SECTION 4 — IMPORTANT AMENDMENTS
//       ════════════════════════════════════════════ */}
//       <section className="max-w-4xl mx-auto px-6 pt-16 pb-14">
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
//               Timeline
//             </p>
//             <h2 className="text-3xl font-bold text-stone-900 leading-tight">
//               Important amendments
//             </h2>
//           </div>
//           <a
//             href="#"
//             className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
//           >
//             See timeline
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <path
//                 d="M3 7h8M7 3l4 4-4 4"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </a>
//         </div>

//         <div className="grid grid-cols-4 gap-4">
//           {/* 1st Amendment */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="flex items-center gap-1.5 mb-3">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span className="text-xs font-semibold text-stone-400">1951</span>
//             </div>
//             <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
//               1st Amendment
//             </h3>
//             <p className="text-xs text-stone-500 leading-relaxed">
//               Added the Ninth Schedule to protect land reform laws and modified
//               Articles 15 and 19.
//             </p>
//           </div>

//           {/* 42nd Amendment */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="flex items-center gap-1.5 mb-3">
//               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               <span className="text-xs font-semibold text-stone-400">1976</span>
//             </div>
//             <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
//               42nd Amendment
//             </h3>
//             <p className="text-xs text-stone-500 leading-relaxed">
//               Added the words Socialist, Secular and Integrity to the Preamble;
//               introduced Fundamental Duties.
//             </p>
//           </div>

//           {/* 44th Amendment */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="flex items-center gap-1.5 mb-3">
//               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//               <span className="text-xs font-semibold text-stone-400">1978</span>
//             </div>
//             <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
//               44th Amendment
//             </h3>
//             <p className="text-xs text-stone-500 leading-relaxed">
//               Reversed many of the 42nd Amendment's changes; right to property
//               removed from…
//             </p>
//           </div>

//           {/* 73rd Amendment */}
//           <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
//             <div className="flex items-center gap-1.5 mb-3">
//               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//               <span className="text-xs font-semibold text-stone-400">1992</span>
//             </div>
//             <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
//               73rd Amendment
//             </h3>
//             <p className="text-xs text-stone-500 leading-relaxed">
//               Constitutional status to Panchayats; created a three-tier system
//               of local self-government.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }








"use client";

import { useState, useEffect, MouseEvent } from "react";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const preambleDetail = `The Preamble to the Constitution of India is a brief introductory statement that sets out the guiding purpose, principles and philosophy of the Indian Constitution. It was adopted on 26 November 1949 along with the rest of the Constitution and came into effect on 26 January 1950.

The Preamble reads: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION."

Key words: SOVEREIGN — India is free from any external authority. SOCIALIST — equal distribution of wealth and resources. SECULAR — no state religion; all religions are equal. DEMOCRATIC — government by elected representatives. REPUBLIC — head of state is elected, not hereditary. The Supreme Court in Kesavananda Bharati (1973) held the Preamble is part of the Constitution and can be used to interpret ambiguous provisions. The 42nd Amendment (1976) inserted the words "Socialist," "Secular," and "Integrity."`;

const partsData: Record<string, { title: string; articles: string; detail: string }> = {
  "Part I": {
    title: "The Union and its Territory",
    articles: "Articles 1–4",
    detail: "Part I contains four articles that define the basic structure of India as a polity. Article 1 declares India to be a 'Union of States' — the word 'Union' was deliberate, emphasising that the federation is indestructible and states cannot secede. Article 2 empowers Parliament to admit new States or establish new States on such terms and conditions as it thinks fit. Article 3 allows Parliament to form a new State by separation, union or merger of existing States, increase or diminish the area of a State, and alter the name or boundaries of any State — but requires the President to first refer the Bill to the State Legislature concerned for its views. Article 4 allows Amendment of the First and Fourth Schedules by a simple majority. The reorganisation of States on linguistic lines (States Reorganisation Act, 1956) was a major exercise under these provisions.",
  },
  "Part II": {
    title: "Citizenship",
    articles: "Articles 5–11",
    detail: "Part II (Articles 5 to 11) determines who were citizens of India at the commencement of the Constitution. Article 5 — Citizens by domicile and birth. Article 6 — Rights of citizenship of migrants from Pakistan who migrated before July 19, 1948 (if a parent/grandparent was born in India) or after that date (if registered). Article 7 — Migrants to Pakistan after March 1, 1947 are not citizens unless they return under a permit. Article 8 — Overseas Indians: if either parent/grandparent was born in undivided India and the person is registered as a citizen by a diplomatic mission. Article 9 — Voluntary acquisition of citizenship of another country terminates Indian citizenship. Article 10 — Continuance of citizenship rights. Article 11 — Parliament has the power to regulate citizenship by law (Citizenship Act, 1955). Citizenship in India is governed by the principle of single citizenship — there is no separate state citizenship.",
  },
  "Part III": {
    title: "Fundamental Rights",
    articles: "Articles 12–35",
    detail: "Part III (Articles 12 to 35) is the Magna Carta of the Indian Constitution — it guarantees six categories of fundamental rights to all citizens (and some to all persons). Article 12 — Definition of 'State' for Part III. Article 13 — Laws inconsistent with or in derogation of Fundamental Rights are void. Six Rights: (1) Right to Equality (Articles 14–18): Equality before law, non-discrimination, equality of opportunity, abolition of untouchability, abolition of titles. (2) Right to Freedom (Articles 19–22): Six freedoms, protection against ex post facto laws, protection against double jeopardy, self-incrimination, and arbitrary arrest. (3) Right against Exploitation (Articles 23–24): Prohibition of traffic in human beings, forced labour, and child labour. (4) Right to Freedom of Religion (Articles 25–28): Freedom of conscience, religion, religious denominations, and no religious instruction in State-funded institutions. (5) Cultural and Educational Rights (Articles 29–30): Rights of minorities to conserve culture and establish educational institutions. (6) Right to Constitutional Remedies (Article 32): Dr. Ambedkar called this 'the heart and soul of the Constitution' — the right to move the Supreme Court for enforcement of fundamental rights.",
  },
  "Part IV": {
    title: "Directive Principles of State Policy",
    articles: "Articles 36–51",
    detail: "Part IV (Articles 36 to 51) contains the Directive Principles of State Policy (DPSP). Though non-justiciable (cannot be enforced in court), they are fundamental in governance. Dr. B.R. Ambedkar described them as 'novel features' of the Constitution, borrowed from the Irish Constitution. They are divided into: Socialist Principles — Article 38 (social order for welfare), Article 39 (equal pay, right to livelihood, protection of children), Article 41 (right to work, education, public assistance), Article 42 (just and humane conditions of work), Article 43 (living wage for workers), Article 45 (free and compulsory education — now a Fundamental Right), Article 47 (prohibition of intoxicating drinks). Gandhian Principles — Article 40 (village panchayats), Article 43 (cottage industries), Article 46 (promotion of weaker sections), Article 48 (prohibition of cow slaughter). Liberal-Intellectual Principles — Article 44 (Uniform Civil Code), Article 45 (early childhood care), Article 49 (protection of monuments), Article 50 (separation of judiciary from executive), Article 51 (international peace). DPSP vs Fundamental Rights: In Minerva Mills v. Union of India (1980), the Supreme Court held that harmony between Fundamental Rights and DPSP is part of the basic structure of the Constitution.",
  },
  "Part IV-A": {
    title: "Fundamental Duties",
    articles: "Article 51A",
    detail: "Part IV-A was inserted by the Constitution (42nd Amendment) Act, 1976 on the recommendations of the Swaran Singh Committee. It contains a single Article — Article 51A — listing Fundamental Duties of citizens. Originally 10 duties were listed; the 11th duty (duty of parents/guardians to provide opportunity for education to children) was added by the 86th Amendment in 2002. The 11 Fundamental Duties: (a) Abide by the Constitution and respect national flag and anthem; (b) Cherish noble ideals of the freedom struggle; (c) Uphold sovereignty, unity and integrity; (d) Defend the country; (e) Promote harmony and spirit of brotherhood; (f) Preserve the rich cultural heritage; (g) Protect and improve the natural environment; (h) Develop scientific temper and humanism; (i) Safeguard public property; (j) Strive for excellence; (k) Provide opportunity for education for children aged 6–14. The duties are not enforceable by courts but serve as moral obligations. They are inspired by the Constitution of the Soviet Union.",
  },
  "Part V": {
    title: "The Union",
    articles: "Articles 52–151",
    detail: "Part V is the largest Part of the Constitution dealing with the structure of the Union Government. It is divided into five chapters: Chapter I — The Executive: Articles 52–78 deal with the President (Articles 52–62), Vice-President (Articles 63–71), Council of Ministers and Cabinet (Articles 74–75), the Attorney-General (Article 76), and Conduct of Government Business (Articles 77–78). Chapter II — Parliament: Articles 79–122 deal with the Constitution of Parliament (Lok Sabha and Rajya Sabha), their composition, election, qualification, disqualification, sessions, procedures, powers, and privileges. The Parliament makes laws under the Union List and Concurrent List. Chapter III — Legislative Powers of the President: Article 123 (Ordinance power when Parliament is not in session). Chapter IV — The Union Judiciary: Articles 124–147 establish the Supreme Court — its composition, jurisdiction (original, appellate, advisory), powers, and independence. Chapter V — Comptroller and Auditor-General: Articles 148–151 deal with the CAG, who audits the accounts of the Union and States.",
  },
};

const articlesData: Record<string, { title: string; part: string; detail: string }> = {
  "Article 14": {
    title: "Equality before law",
    part: "Fundamental Rights",
    detail: "Article 14 states: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.' It has two components: (1) Equality before Law — a negative concept borrowed from English Common Law, meaning no person is above the law and the State cannot confer special privileges on any individual. (2) Equal Protection of Laws — a positive concept borrowed from the 14th Amendment to the US Constitution, meaning the State must give equal treatment to persons in equal circumstances. The Supreme Court has evolved the 'reasonable classification' doctrine — the State can make a law that classifies people into groups, provided: (a) the classification is founded on an intelligible differentia (a clear distinguishing feature), and (b) the differentia has a rational relation to the object sought to be achieved. In E.P. Royappa v. State of Tamil Nadu (1974), the Court gave a new dimension — 'Equality is a dynamic concept with many aspects and dimensions and it cannot be cribbed, cabined and confined within traditional limits.' Article 14 is part of the 'golden triangle' with Articles 19 and 21. It cannot be suspended even during a National Emergency.",
  },
  "Article 19": {
    title: "Six Freedoms",
    part: "Fundamental Rights",
    detail: "Article 19 originally guaranteed 7 freedoms, now 6 (the right to property was removed by the 44th Amendment, 1978). The six freedoms under Article 19(1): (a) Freedom of speech and expression — includes press freedom, right to information, right to demonstrate peacefully. Subject to restrictions under Article 19(2): sovereignty, integrity, security, friendly relations with foreign states, public order, decency/morality, defamation, contempt of court, incitement to offence. (b) Freedom to assemble peacefully and without arms — subject to public order and sovereignty of India. (c) Freedom to form associations or unions or co-operative societies — subject to public order, morality, sovereignty. (d) Freedom to move freely throughout India — subject to interests of general public or protection of Scheduled Tribes. (e) Freedom to reside and settle in any part of India — same restrictions as (d). (g) Freedom to practise any profession or carry on any occupation, trade or business — subject to any law relating to professional/technical qualifications and State monopoly. Article 19 applies only to citizens (unlike Articles 14 and 21 which apply to all persons). The reasonable restrictions must be in writing through a law — executive action alone cannot restrict these freedoms.",
  },
  "Article 21": {
    title: "Right to Life and Personal Liberty",
    part: "Fundamental Rights",
    detail: "Article 21 states: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' It applies to all persons (citizens and non-citizens alike). Initially interpreted narrowly in A.K. Gopalan v. State of Madras (1950) — 'procedure established by law' meant any procedure prescribed by statute. But in Maneka Gandhi v. Union of India (1978), the Supreme Court reversed this, holding that the procedure must be fair, just, and reasonable — not arbitrary, fanciful, or oppressive. This brought Article 21 closer to 'due process of law.' Today, Article 21 has the widest possible interpretation and includes: Right to livelihood (Olga Tellis, 1985), Right to privacy (Justice K.S. Puttaswamy, 2017 — 9 judge bench), Right to health, Right to education (till 14 — now Article 21A), Right to a speedy trial, Right to free legal aid, Right against solitary confinement, Right to die with dignity, Right to a clean environment, Right to shelter, Right against custodial violence. Article 21 forms the heart of Part III. Even during Emergency (except under Article 359), its core cannot be suspended.",
  },
};

const amendmentsData: Record<string, { year: string; detail: string }> = {
  "1st Amendment": {
    year: "1951",
    detail: "The Constitution (First Amendment) Act, 1951 was enacted primarily in response to a series of judicial decisions that struck down State land reform laws and restrictions on free speech. Key changes: (1) Added the Ninth Schedule (new) — Acts placed in this Schedule are protected from challenge on grounds of violating Fundamental Rights (especially right to property). Originally contained 13 Acts, now contains 284. (2) Modified Article 15 to allow the State to make special provisions for socially and educationally backward classes or for SCs and STs (enabling reservations in education). (3) Modified Article 19(2) to add 'public order', 'friendly relations with foreign states', and 'incitement to offence' as valid grounds for restricting free speech — overcoming the Romesh Thappar and Brij Bhushan judgments. (4) Modified Article 31A to protect laws providing for acquisition of estates from fundamental rights challenge. This Amendment set the precedent for Parliament to 'correct' judicial interpretations through constitutional amendments.",
  },
  "42nd Amendment": {
    year: "1976",
    detail: "The Constitution (42nd Amendment) Act, 1976 — often called the 'Mini Constitution' — was the most comprehensive amendment ever made. Enacted during the Emergency by Indira Gandhi's government. Key changes: (1) Preamble: Added 'Socialist', 'Secular', and 'Integrity' — transforming India into a 'Sovereign Socialist Secular Democratic Republic' and 'unity and integrity' of the nation. (2) Added Part IV-A — Fundamental Duties (Article 51A) with 10 duties. (3) Added three new subjects to Concurrent List: education, forests, and weights and measures. (4) Added Article 31D (later repealed) — protecting laws against anti-national activities. (5) Added Articles 323A and 323B for Administrative Tribunals. (6) Made it harder to challenge constitutional amendments — added clauses to Article 368 declaring amendments immune from judicial review. (7) Extended the term of Lok Sabha and State Assemblies from 5 to 6 years (reversed by 44th Amendment). (8) Curtailed the scope of judicial review significantly. Many of these changes were reversed or diluted by the Constitution (44th Amendment) Act, 1978.",
  },
  "44th Amendment": {
    year: "1978",
    detail: "The Constitution (44th Amendment) Act, 1978 was enacted by the Janata Party government primarily to undo the excesses of the 42nd Amendment. Key changes: (1) Right to Property: Article 19(1)(f) (freedom to acquire, hold and dispose of property) was deleted and Article 31 (right to property) was removed from Fundamental Rights. Property became a legal right under Article 300A — 'No person shall be deprived of his property save by authority of law.' (2) Restored Lok Sabha and Assembly terms to 5 years. (3) Article 352 (National Emergency): Required the Cabinet's written recommendation to the President before proclamation; provided for revocation by a simple majority of Lok Sabha; replaced 'internal disturbance' with 'armed rebellion' as a ground. (4) Restored the power of the Supreme Court to review certain Emergency proclamations. (5) Added Articles 20 and 21 to the list of rights that cannot be suspended even during Emergency under Article 359. (6) Deleted Article 31D (against anti-national activities). This Amendment is seen as restoring the democratic character of the Constitution after the Emergency.",
  },
  "73rd Amendment": {
    year: "1992",
    detail: "The Constitution (73rd Amendment) Act, 1992 — effective from April 24, 1993 — gave constitutional status to Panchayati Raj institutions, fulfilling a Gandhian vision and the directive in Article 40. It inserted Part IX (Articles 243 to 243-O) and the Eleventh Schedule (29 subjects). Key provisions: (1) Mandated a three-tier system: Gram Panchayat (village), Panchayat Samiti/Taluk Panchayat (intermediate), and Zila Parishad (district) — States with population less than 20 lakh can have only two tiers. (2) Direct elections to all seats at all three levels. (3) Reservation of seats for SCs and STs in proportion to their population; not less than 1/3 seats reserved for women. (4) Five-year term; fresh elections to be held before expiry of term; elections within 6 months if dissolved earlier. (5) State Election Commission — independent body to superintend, direct and control elections. (6) State Finance Commission — constituted every 5 years to review financial position of Panchayats. (7) Gram Sabha — body of all registered voters in a village, fundamental to direct democracy. (8) The 29 subjects in Eleventh Schedule may be devolved — but actual devolution remains discretionary for States. This Amendment is considered India's third tier of democratic government.",
  },
};

const quickAccessData: Record<string, string> = {
  Preamble: preambleDetail,
  "Fundamental Rights": articlesData["Article 14"].detail + "\n\n" + "Fundamental Rights (Articles 12–35) are justiciable — enforceable in courts. They represent the basic human freedoms guaranteed to every citizen of India. The six Fundamental Rights are: Right to Equality (14–18), Right to Freedom (19–22), Right against Exploitation (23–24), Right to Freedom of Religion (25–28), Cultural and Educational Rights (29–30), and Right to Constitutional Remedies (32).",
  "Directive Principles": partsData["Part IV"].detail,
  "Recent Amendments": "The Constitution has been amended 106 times since 1950. Recent significant amendments include: (1) Constitution (100th Amendment) Act, 2015 — Implementation of the land boundary agreement with Bangladesh. (2) Constitution (101st Amendment) Act, 2016 — Introduction of Goods and Services Tax (GST); inserted Articles 246A, 269A, 279A; created the GST Council. (3) Constitution (102nd Amendment) Act, 2018 — Constitutional status to the National Commission for Backward Classes; inserted Articles 338B and 342A. (4) Constitution (103rd Amendment) Act, 2019 — 10% reservation for Economically Weaker Sections (EWS) in government jobs and educational institutions; amended Articles 15 and 16. (5) Constitution (104th Amendment) Act, 2020 — Extended reservation for SCs and STs in Lok Sabha and State Assemblies for another 10 years (till 2030); abolished reserved seats for Anglo-Indians. (6) Constitution (105th Amendment) Act, 2021 — Restored power of States and Union Territories to identify OBCs for reservation. (7) Constitution (106th Amendment) Act, 2023 — Reserved one-third seats for women in Lok Sabha, State Assemblies, and Delhi Legislative Assembly (Women's Reservation Bill).",
  Schedules: "The Constitution of India has 12 Schedules that supplement its Articles with lists, forms and tables. Schedule 1: States and UTs. Schedule 2: Salaries of constitutional functionaries. Schedule 3: Forms of oaths. Schedule 4: Rajya Sabha seat allocation. Schedule 5: Scheduled Areas and Tribes (non-NE). Schedule 6: Tribal areas in North-East. Schedule 7: Union, State and Concurrent Lists. Schedule 8: 22 recognised languages. Schedule 9: Laws protected from judicial review. Schedule 10: Anti-defection law. Schedule 11: 29 subjects for Panchayats. Schedule 12: 18 subjects for Municipalities.",
};

// ─── Main Hero Component ───────────────────────────────────────────────────────

export default function Hero() {
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

  const clickableStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    cursor: "pointer", textDecoration: "none", background: "none", border: "none",
    textAlign: "left", padding: 0, width: "100%", ...extra,
  });

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
        @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .live-dot  { animation: livePulse 1.8s ease-in-out infinite; }
        .float-card{ animation: floatUp 5s ease-in-out infinite; }
        .chakra-cw { animation: chakraCW  100s linear infinite; display:block; }
        .chakra-ccw{ animation: chakraCCW  70s linear infinite; display:block; }
        .chakra-sm { animation: chakraCW   50s linear infinite; display:block; }
        .clickable-card { transition: all 0.2s ease; cursor: pointer; }
        .clickable-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(180,90,0,0.12); border-color: #fed7aa !important; }
        .tag-btn:hover { background: #1c1412 !important; color: #fff !important; border-color: #1c1412 !important; }
        * { box-sizing: border-box; }

        /* ── RESPONSIVE ── */
        .hero-grid { display: flex; flex-direction: row; align-items: center; gap: 64px; }
        .hero-book { width: 440px; }
        .hero-h1   { font-size: 72px; }
        .parts-grid  { grid-template-columns: repeat(3,1fr); }
        .articles-grid { grid-template-columns: repeat(3,1fr); }
        .amendments-grid { grid-template-columns: repeat(4,1fr); }

        /* MacBook Pro / Laptop ≤ 1280px */
        @media (max-width:1280px) {
          .hero-h1 { font-size: 60px !important; }
          .hero-book { width: 380px !important; }
          .hero-grid { gap: 48px; }
        }
        /* iPad Pro ≤ 1024px */
        @media (max-width:1024px) {
          .hero-h1 { font-size: 52px !important; }
          .hero-book { width: 320px !important; }
          .hero-grid { gap: 36px; }
          .amendments-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        /* iPad ≤ 900px */
        @media (max-width:900px) {
          .hero-grid { flex-direction: column !important; gap: 32px; }
          .hero-h1 { font-size: 46px !important; }
          .hero-book { width: 280px !important; }
          .parts-grid { grid-template-columns: repeat(2,1fr) !important; }
          .articles-grid { grid-template-columns: repeat(2,1fr) !important; }
          .amendments-grid { grid-template-columns: repeat(2,1fr) !important; }
          .preamble-box { flex-direction: column !important; gap: 24px !important; }
          .preamble-book { width: 100% !important; display: flex; justify-content: center; }
        }
        /* iPad Mini ≤ 768px */
        @media (max-width:768px) {
          .hero-h1 { font-size: 40px !important; }
          .parts-grid { grid-template-columns: repeat(2,1fr) !important; }
          .section-max { padding-left: 16px !important; padding-right: 16px !important; }
        }
        /* Samsung / Large mobile ≤ 640px */
        @media (max-width:640px) {
          .hero-h1 { font-size: 34px !important; }
          .parts-grid { grid-template-columns: 1fr !important; }
          .articles-grid { grid-template-columns: 1fr !important; }
          .amendments-grid { grid-template-columns: 1fr !important; }
          .hero-stats { flex-direction: column !important; gap: 12px !important; }
          .hero-cta { flex-direction: column !important; }
          .hero-cta button { width: 100%; justify-content: center; }
        }
        /* Mobile ≤ 430px */
        @media (max-width:430px) {
          .hero-h1 { font-size: 28px !important; }
          .hero-book { width: 220px !important; }
          .quick-tags { gap: 6px !important; }
        }
        /* iPhone SE ≤ 375px */
        @media (max-width:375px) {
          .hero-h1 { font-size: 25px !important; }
        }
      `}</style>

      {modal && <DetailModal data={modal} onClose={closeModal} />}

      {/* ══════════════════════════════════════════
           HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">
        {/* BG Chakras */}
        <div className="absolute -right-80 pointer-events-none z-0 opacity-[0.08]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-cw" width={900} height={900} />
        </div>
        <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-ccw" width={700} height={500} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
          <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-sm" width={480} height={280} />
        </div>

        {/* Hindi watermark */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none">
          {["सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
            "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र"].map((line, i) => (
            <span key={i} className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none" style={{ color: "rgba(90,58,8,0.04)" }}>{line}</span>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
          <div className="hero-grid">
            {/* ── LEFT COLUMN ── */}
            <div className="w-full lg:flex-1">
              {/* Title */}
              <h1 className="hero-h1 font-bold leading-[1.1] text-gray-900 mb-0" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
                Learn the <br />Constitution of India,
                <br />
                <span className="inline-block mt-2">
                  <button
                    onClick={() => openModal({ title: "Learn the Constitution", badge: "About KnowSamvidhan", content: "KnowSamvidhan is India's premier platform to learn the Constitution of India in a smart, simple and effective way. Whether you are a student preparing for UPSC, a law aspirant, a citizen curious about your rights, or a teacher — KnowSamvidhan has resources for you. Features: AI-powered doubt resolution, searchable Articles and Amendments, interactive quizzes, landmark case summaries, and comprehensive guides on all 22 Parts, 12 Schedules, and 106 Amendments of the Constitution." })}
                    className="px-2 py-1 rounded-xl text-orange-400 transition-all duration-300"
                    style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", border: "none", fontFamily: "'Georgia', serif", fontSize: "inherit", fontWeight: "inherit", cursor: "pointer" }}
                  >
                    {rotatingWords[wordIndex]}
                  </button>
                </span>
              </h1>

              {/* Sub-text */}
              <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-xl font-['DM_Sans'] mt-4">
                Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
                <button onClick={() => openModal({ title: "About KnowSamvidhan", badge: "Platform", content: "KnowSamvidhan is built for students, citizens, and aspirants who want to learn the Constitution of India in a structured, modern, and AI-assisted way. The platform covers all 395 Articles, 12 Schedules, 106 Amendments, landmark Supreme Court judgments, and constitutional history from 1946 to present." })}
                  style={{ fontWeight: 700, color: "#1c1412", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#f97316", textUnderlineOffset: 3 }}>
                  KnowSamvidhan
                </button>{" "}
                — built for students, citizens, and aspirants.
              </p>

              {/* Search bar */}
              <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.10)]" style={{ cursor: "text" }}>
                <svg className="text-neutral-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Search any Article, Amendment, or ask AI..." className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0" />
                <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">⌘ K</kbd>
              </div>

              {/* Quick access tags */}
              <div className="flex flex-wrap items-center gap-2 mb-9 quick-tags">
                <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">Quick Access:</span>
                {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
                  <button key={tag} className="tag-btn bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
                    onClick={() => openModal({ title: tag, badge: "Quick Reference", content: quickAccessData[tag] || "" })}>
                    {tag}
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-11 hero-cta">
                <button onClick={() => openModal({ title: "AI Constitutional Assistant", badge: "AI Feature", content: "The AI Chat feature lets you ask any question about the Indian Constitution and get accurate, source-cited answers. Ask about fundamental rights, constitutional history, landmark judgments, or specific Articles and Amendments. The AI draws on a comprehensive constitutional database and cites specific Articles, Schedule entries, and case law to back its answers. You can ask questions like: 'What is the scope of Article 21?', 'How many times has the Constitution been amended?', 'What is the basic structure doctrine?', 'Explain the 42nd Amendment', or 'What are the grounds for disqualification under the 10th Schedule?'" })}
                  className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Try AI Chat →
                </button>
                <button onClick={() => openModal({ title: "Browse Parts of the Constitution", badge: "Navigation", content: "The Constitution of India is organised into 22 Parts, each dealing with a specific aspect of governance, rights, and state structure. Part I: The Union and its Territory (Articles 1–4). Part II: Citizenship (Articles 5–11). Part III: Fundamental Rights (Articles 12–35). Part IV: Directive Principles (Articles 36–51). Part IV-A: Fundamental Duties (Article 51A). Part V: The Union (Articles 52–151). Part VI: The States (Articles 152–237). Part VII: (Repealed). Part VIII: Union Territories (Articles 239–242). Part IX: Panchayats (Articles 243–243O). Part IX-A: Municipalities (Articles 243P–243ZG). Part X: Scheduled and Tribal Areas. Part XI: Relations between Union and States. Part XII: Finance, Property, Contracts, Suits. Part XIII: Trade and Commerce. Part XIV: Services under Union and States. Part XIV-A: Tribunals. Part XV: Elections. Part XVI: Special provisions for certain classes. Part XVII: Official Language. Part XVIII: Emergency Provisions. Part XIX: Miscellaneous. Part XX: Amendment of the Constitution. Part XXI: Temporary and Transitional Provisions. Part XXII: Short Title, Date of Commencement, and Repeal." })}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                  Browse Parts
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 sm:gap-8 hero-stats">
                {[
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, bold: "100%", text: "Source-cited answers", detail: "Every answer from our AI cites the specific Article, Schedule entry, or Amendment number it draws from — so you always know exactly where the information comes from in the Constitution." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, bold: "42,000+", text: "Learners onboard", detail: "Over 42,000 students, aspirants, lawyers, and citizens use KnowSamvidhan to understand the Indian Constitution. Users span UPSC aspirants, law students, school teachers, and engaged citizens across India." },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>, bold: "395", text: "Articles · 12 Schedules", detail: "The Constitution of India is the world's longest written constitution with 395 Articles (originally; now operative articles are fewer due to omissions and amendments), 12 Schedules, 22 Parts, and 106 Amendments as of 2024. It was drafted by the Constituent Assembly over 2 years 11 months and 18 days, and adopted on 26 November 1949." },
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

            {/* ── RIGHT COLUMN — Book ── */}
            <div className="w-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-end">
              <div className="relative" onClick={() => openModal({ title: "The Constitution of India", badge: "About the Document", content: "The Constitution of India is the supreme law of the land. Drafted by the Constituent Assembly of India, which sat for 166 days spread over 2 years, 11 months and 18 days between December 9, 1946 and November 26, 1949. It was adopted on 26 November 1949 (Constitution Day) and came into effect on 26 January 1950 (Republic Day). The Constitution has a Preamble, 22 Parts, 395 Articles (as originally enacted), 12 Schedules, 5 Appendices, and has been amended 106 times. It is the world's longest written national constitution. The Constituent Assembly had 299 members; Dr. B.R. Ambedkar chaired the Drafting Committee. The original copies are preserved in helium-filled cases in the Library of Parliament. The Constitution establishes India as a Sovereign, Socialist, Secular, Democratic Republic and guarantees its citizens justice, equality, liberty, and fraternity." })} style={{ cursor: "pointer" }}>
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
      <section className="section-max max-w-4xl mx-auto px-6 pt-10 pb-4">
        <div className="preamble-box relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-10 flex items-center gap-10 overflow-hidden clickable-card"
          onClick={() => openModal({ title: "The Preamble to the Constitution of India", badge: "Foundational", content: preambleDetail })}>
          <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-yellow-300 opacity-10 pointer-events-none"></div>
          <div className="absolute -bottom-20 left-28 w-72 h-72 rounded-full bg-orange-300 opacity-10 pointer-events-none"></div>

          {/* Book illustration */}
          <div className="preamble-book shrink-0 w-44 relative z-10">
            <svg style={{ transform: "rotate(-4deg)" }} width="160" height="150" viewBox="0 0 160 150" fill="none">
              <rect x="20" y="20" width="120" height="110" rx="6" fill="#f5e6c8" />
              <rect x="20" y="20" width="120" height="110" rx="6" stroke="#c9a96e" strokeWidth="1.5" />
              <rect x="20" y="20" width="14" height="110" rx="4" fill="#c9a96e" />
              <rect x="20" y="20" width="14" height="110" rx="4" stroke="#a07c45" strokeWidth="1" />
              <path d="M34 28 Q80 22 146 28 L146 122 Q80 128 34 122 Z" fill="#fdf8f0" stroke="#e8d5b0" strokeWidth="1" />
              <rect x="50" y="45" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="56" width="65" height="4" rx="2" fill="#b8975a" opacity="0.35" />
              <rect x="50" y="67" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="78" width="55" height="4" rx="2" fill="#b8975a" opacity="0.3" />
              <rect x="50" y="89" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="100" width="70" height="4" rx="2" fill="#b8975a" opacity="0.35" />
              <rect x="50" y="111" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <path d="M80 128 Q74 136 68 142" stroke="#e53e3e" strokeWidth="3" strokeLinecap="round" />
              <path d="M80 128 Q86 136 92 142" stroke="#e53e3e" strokeWidth="3" strokeLinecap="round" />
              <circle cx="80" cy="128" r="4" fill="#e53e3e" />
              <circle cx="60" cy="16" r="13" fill="none" stroke="#f97316" strokeWidth="1.8" />
              <circle cx="60" cy="16" r="3.5" fill="#f97316" opacity="0.7" />
              <line x1="60" y1="4" x2="60" y2="28" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
              <line x1="48" y1="16" x2="72" y2="16" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
              <line x1="51.5" y1="7.5" x2="68.5" y2="24.5" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
              <line x1="68.5" y1="7.5" x2="51.5" y2="24.5" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
            </svg>
          </div>

          <div className="relative z-10 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold text-orange-700 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
              Foundational
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-3 leading-tight tracking-tight">Begin with the Preamble</h1>
            <p className="text-sm text-stone-600 leading-relaxed mb-4 font-sans font-normal">
              A single sentence that defines who we are as a nation. Read the official text alongside a clear, modern explanation of Justice, Liberty, Equality and Fraternity.
            </p>
            <blockquote className="text-sm italic text-stone-700 border-l-[3px] border-amber-400 pl-4 mb-6 leading-relaxed font-serif">
              "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, eco…"
            </blockquote>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-200">
              Read the Preamble
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           BROWSE BY PARTS
      ══════════════════════════════════════════ */}
      <section className="section-max max-w-4xl mx-auto px-6 pt-14 pb-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Chapters</p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">Browse by Parts</h2>
            <p className="text-sm text-stone-500 mt-1">The Constitution is organised into Parts. Pick a chapter to start.</p>
          </div>
          <button onClick={() => openModal({ title: "All Parts of the Constitution", badge: "Navigation", content: "The Constitution of India has 22 Parts covering all aspects of governance, rights, federalism, and administration. Click any individual Part card below to learn more about its Articles and provisions." })}
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}>
            All Parts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div className="parts-grid grid gap-4">
          {Object.entries(partsData).map(([part, data]) => (
            <div key={part} className="bg-white border border-gray-100 rounded-2xl p-5 clickable-card"
              onClick={() => openModal({ title: `${part}: ${data.title}`, badge: part, content: data.detail })}>
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 5h12M4 10h8M4 15h10" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">{part}</p>
              <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">{data.title}</h3>
              <p className="text-xs text-stone-400 mb-3">{data.articles}</p>
              <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3">{data.detail.slice(0, 120)}…</p>
              <span className="text-xs font-semibold text-orange-500 flex items-center gap-1">
                Explore
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           FEATURED ARTICLES
      ══════════════════════════════════════════ */}
      <section className="section-max max-w-4xl mx-auto px-6 pt-16 pb-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Featured</p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">Articles to start with</h2>
          </div>
          <button onClick={() => openModal({ title: "All Articles", badge: "Reference", content: "The Constitution of India has 395 Articles (as originally enacted, though the operative count differs due to omissions). They cover everything from citizenship to emergency powers, from the structure of Parliament to the rights of minorities. Use the search bar to find any Article by number or keyword." })}
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}>
            View all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div className="articles-grid grid gap-4">
          {Object.entries(articlesData).map(([article, data]) => (
            <div key={article} className="bg-white border border-gray-100 rounded-2xl p-5 clickable-card"
              onClick={() => openModal({ title: `${article}: ${data.title}`, badge: data.part, content: data.detail })}>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">{data.part}</div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">{article}</h3>
              <p className="text-sm font-medium text-stone-600 mb-3">{data.title}</p>
              <p className="text-xs text-stone-500 leading-relaxed mb-5 line-clamp-3">{data.detail.slice(0, 130)}…</p>
              <span className="text-xs font-semibold text-orange-500 flex items-center gap-1">
                Read article
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
           IMPORTANT AMENDMENTS
      ══════════════════════════════════════════ */}
      <section className="section-max max-w-4xl mx-auto px-6 pt-16 pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Timeline</p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">Important amendments</h2>
          </div>
          <button onClick={() => openModal({ title: "All Constitutional Amendments", badge: "Timeline", content: quickAccessData["Recent Amendments"] })}
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
            style={{ background: "none", border: "none", cursor: "pointer" }}>
            See timeline
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div className="amendments-grid grid gap-4">
          {(["1st Amendment", "42nd Amendment", "44th Amendment", "73rd Amendment"] as const).map((amend, i) => {
            const colors = ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
            const data = amendmentsData[amend];
            return (
              <div key={amend} className="bg-white border border-gray-100 rounded-2xl p-5 clickable-card"
                onClick={() => openModal({ title: amend, badge: "Constitutional Amendment", year: data.year, content: data.detail })}>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className={`w-2 h-2 rounded-full ${colors[i]}`}></div>
                  <span className="text-xs font-semibold text-stone-400">{data.year}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{amend}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{data.detail.slice(0, 110)}…</p>
                <span className="text-xs font-semibold text-orange-500 flex items-center gap-1 mt-3">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}