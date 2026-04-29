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




"use client";

import { useState, useEffect, MouseEvent } from "react";

export default function Hero() {
  const rotatingWords = ["the Smart Way", "Simply", "Smartly", "Effectively"];
  const [wordIndex, setWordIndex] = useState(0);
  const [Animation, setAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  function handleWordClick(event: MouseEvent<HTMLButtonElement>): void {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 300);
  }

  return (
    <>
      <section className="relative min-h-screen bg-[#f4ead8] flex items-center overflow-hidden">
        {/* ── KEYFRAMES ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
          @keyframes chakraCW  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
          @keyframes chakraCCW { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
          @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
          .live-dot { animation: livePulse 1.8s ease-in-out infinite; }
          @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          .float-card { animation: floatUp 5s ease-in-out infinite; }
          .chakra-cw  { animation: chakraCW  100s linear infinite; display: block; }
          .chakra-ccw { animation: chakraCCW  70s linear infinite; display: block; }
          .chakra-sm  { animation: chakraCW   50s linear infinite; display: block; }
        `}</style>

        {/* ── BG CHAKRA — top right (large) ── */}
        <div className="absolute -right-80 pointer-events-none z-0 opacity-[0.08]">
          <img
            src="image/ashoka.png"
            alt=""
            aria-hidden="true"
            className="chakra-cw"
            width={900}
            height={900}
          />
        </div>

        {/* ── BG CHAKRA — bottom left (small) ── */}
        <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
          <img
            src="image/ashoka.png"
            alt=""
            aria-hidden="true"
            className="chakra-ccw"
            width={700}
            height={500}
          />
        </div>

        {/* ── BG CHAKRA — mid left (tiny accent) ── */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
          <img
            src="image/ashoka.png"
            alt=""
            aria-hidden="true"
            className="chakra-sm"
            width={480}
            height={280}
          />
        </div>

        {/* ── Hindi watermark ── */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-10 pointer-events-none overflow-hidden select-none rotate-0">
          {[
            "सत्यमेव जयते · राष्ट्र · संविधान · न्याय · स्वतंत्रता · समानता · भारत · गणतंत्र",
            "कानूनी · पंथ · राजनीति · मूल अधिकार · नागरिक · धर्मनिरपेक्ष · संसद · लोकतंत्र",
          ].map((line, i) => (
            <span
              key={i}
              className="text-[3rem] md:text-[3.5rem] font-black whitespace-nowrap tracking-widest leading-none"
              style={{ color: "rgba(90,58,8,0.04)" }}
            >
              {line}
            </span>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
            {/* ════ LEFT COLUMN ════ */}
            <div className="w-full lg:flex-1 lg:max-w-170">
              <div className="max-w-7xl w-full">
                <h1
                  className="text-[56px] lg:text-[72px] font-bold leading-[1.1] text-gray-900"
                  style={{
                    fontFamily: "'Georgia', serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Learn the <br /> Constitution of India,
                  <br />
                  <span className="inline-block mt-2">
                    <button
                      onClick={handleWordClick}
                      className="px-5 py-2 rounded-xl text-orange-400 transition-all duration-300"
                      style={{
                        opacity: Animation ? 0 : 1,
                        transform: Animation ? "translateY(10px)" : "translateY(0)",
                        border: "none",
                        fontFamily: "'Georgia', serif",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                      }}
                    >
                      {rotatingWords[wordIndex]}
                    </button>
                  </span>
                </h1>
              </div>

              {/* Sub-text */}
              <p className="text-[0.97rem] sm:text-[1.02rem] text-neutral-500 leading-[1.78] mb-8 max-w-122.5 font-['DM_Sans']">
                Search articles, ask AI doubts, practice quizzes, and master
                amendments with{" "}
                <strong className="text-neutral-800 font-semibold">
                  KnowSamvidhan
                </strong>{" "}
                — built for students, citizens, and aspirants.
              </p>

              {/* Search bar */}
              <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
                <svg
                  className="text-neutral-400 shrink-0"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search any Article, Amendment, or ask AI..."
                  className="flex-1 bg-transparent outline-none text-[0.94rem] text-neutral-700 placeholder-neutral-400 font-['DM_Sans'] min-w-0"
                />
                <kbd className="hidden sm:inline shrink-0 text-[0.67rem] text-neutral-400 bg-[#ede5d0] border border-[#ddd0b0] rounded-lg px-2.5 py-1 font-mono tracking-wide">
                  ⌘ K
                </kbd>
              </div>

              {/* Quick access tags */}
              <div className="flex flex-wrap items-center gap-2 mb-9">
                <span className="text-[0.67rem] font-bold text-neutral-400 tracking-[0.14em] uppercase font-['DM_Sans']">
                  Quick Access:
                </span>
                {[
                  "Preamble",
                  "Fundamental Rights",
                  "Directive Principles",
                  "Recent Amendments",
                  "Schedules",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="bg-white/75 border border-[#ddd0b0] rounded-full px-3.5 py-1.5 text-[0.8rem] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 font-['DM_Sans'] cursor-pointer active:scale-95"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-11">
                <button className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.97] text-white rounded-2xl px-7 py-4 text-[0.94rem] font-semibold shadow-[0_8px_28px_rgba(180,105,0,0.32)] hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Try AI Chat →
                </button>
                <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  Browse Parts
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 sm:gap-8">
                {[
                  {
                    icon: (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ),
                    bold: "100%",
                    text: "Source-cited answers",
                  },
                  {
                    icon: (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                    bold: "42,000+",
                    text: "Learners onboard",
                  },
                  {
                    icon: (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    ),
                    bold: "395",
                    text: "Articles · 12 Schedules",
                  },
                ].map((s) => (
                  <div
                    key={s.bold}
                    className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']"
                  >
                    <span className="text-amber-600">{s.icon}</span>
                    <strong className="text-neutral-900 font-semibold">
                      {s.bold}
                    </strong>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ════ RIGHT COLUMN — Constitution Book Image ════ */}
            <div className="w-full lg:w-auto lg:shrink-0 flex  justify-center lg:justify-end">
              <div className="relative">
                {/* Warm radial glow behind image */}
                <div
                  className="absolute -inset-8 -z-10 blur-3xl rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)",
                  }}
                />

                {/* Soft shadow plate */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10"
                  style={{ background: "rgba(120,80,10,0.18)" }}
                />

                {/* The book image */}
                <img
                  src="image/book.png"
                  alt="Constitution of India"
                  className="float-card relative z-10 w-75 sm:w-90 lg:w-100 xl:w-110 object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.28)]"
                  style={{ borderRadius: "20px" }}
                />

                {/* Satyamev Jayate label under book */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[0.75rem] font-['DM_Sans'] text-neutral-400 tracking-[0.18em] uppercase">
                    सत्यमेव जयते
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ddddd */}

      <section className="max-w-4xl mx-auto px-6 pt-10 pb-4">
        <div className="relative bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-10 flex items-center gap-10 overflow-hidden">
          {/* Glow circles */}
          <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-yellow-300 opacity-10 pointer-events-none"></div>
          <div className="absolute -bottom-20 left-28 w-72 h-72 rounded-full bg-orange-300 opacity-10 pointer-events-none"></div>

          {/* Book illustration */}
          <div className="shrink-0 w-44 relative z-10">
            <svg
              className="book-shadow"
              style={{ transform: "rotate(-4deg)" }}
              width="160"
              height="150"
              viewBox="0 0 160 150"
              fill="none"
            >
              <rect x="20" y="20" width="120" height="110" rx="6" fill="#f5e6c8" />
              <rect
                x="20"
                y="20"
                width="120"
                height="110"
                rx="6"
                stroke="#c9a96e"
                strokeWidth="1.5"
              />
              <rect x="20" y="20" width="14" height="110" rx="4" fill="#c9a96e" />
              <rect
                x="20"
                y="20"
                width="14"
                height="110"
                rx="4"
                stroke="#a07c45"
                strokeWidth="1"
              />
              <path
                d="M34 28 Q80 22 146 28 L146 122 Q80 128 34 122 Z"
                fill="#fdf8f0"
                stroke="#e8d5b0"
                strokeWidth="1"
              />
              <rect x="50" y="45" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="56" width="65" height="4" rx="2" fill="#b8975a" opacity="0.35" />
              <rect x="50" y="67" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="78" width="55" height="4" rx="2" fill="#b8975a" opacity="0.3" />
              <rect x="50" y="89" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <rect x="50" y="100" width="70" height="4" rx="2" fill="#b8975a" opacity="0.35" />
              <rect x="50" y="111" width="78" height="4" rx="2" fill="#b8975a" opacity="0.4" />
              <path
                d="M80 128 Q74 136 68 142"
                stroke="#e53e3e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M80 128 Q86 136 92 142"
                stroke="#e53e3e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="80" cy="128" r="4" fill="#e53e3e" />

              {/* Ashoka Chakra */}
              <circle cx="60" cy="16" r="13" fill="none" stroke="#f97316" strokeWidth="1.8" />
              <circle cx="60" cy="16" r="3.5" fill="#f97316" opacity="0.7" />
              <line x1="60" y1="4" x2="60" y2="28" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
              <line x1="48" y1="16" x2="72" y2="16" stroke="#f97316" strokeWidth="0.9" opacity="0.8" />
              <line
                x1="51.5"
                y1="7.5"
                x2="68.5"
                y2="24.5"
                stroke="#f97316"
                strokeWidth="0.9"
                opacity="0.8"
              />
              <line
                x1="68.5"
                y1="7.5"
                x2="51.5"
                y2="24.5"
                stroke="#f97316"
                strokeWidth="0.9"
                opacity="0.8"
              />
              <line x1="48" y1="11" x2="72" y2="21" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
              <line x1="72" y1="11" x2="48" y2="21" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
              <line x1="55" y1="4" x2="65" y2="28" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
              <line x1="65" y1="4" x2="55" y2="28" stroke="#f97316" strokeWidth="0.7" opacity="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold text-orange-700 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
              Foundational
            </div>

            <h1 className="text-3xl font-bold text-stone-900 mb-3 leading-tight tracking-tight">
              Begin with the Preamble
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed mb-4 font-sans font-normal">
              A single sentence that defines who we are as a nation. Read the
              official text alongside a clear, modern explanation of Justice,
              Liberty, Equality and Fraternity.
            </p>

            <blockquote className="text-sm italic text-stone-700 border-l-[3px] border-amber-400 pl-4 mb-6 leading-relaxed font-serif">
              "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute
              India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and
              to secure to all its citizens: JUSTICE, social, eco…"
            </blockquote>

            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-150">
              Read the Preamble
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SECTION 2 — BROWSE BY PARTS
      ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Chapters
            </p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
              Browse by Parts
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              The Constitution is organised into Parts. Pick a chapter to start.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            All Parts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Part I */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part I
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              The Union and its Territory
            </h3>
            <p className="text-xs text-stone-400 mb-3">Articles 1 – 4</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Defines India as a Union of States and provides for admission,
              formation and alteration of States.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Part II */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part II
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              Citizenship
            </h3>
            <p className="text-xs text-stone-400 mb-3">Articles 5 – 11</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Lays down who is a citizen of India at the commencement of the
              Constitution and…
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Part III */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part III
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              Fundamental Rights
            </h3>
            <p className="text-xs text-stone-400 mb-3">Articles 12 – 35</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              The cornerstone of individual liberty — equality, freedom, life,
              religion and constitutional remedies.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Part IV */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part IV
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              Directive Principles of State Policy
            </h3>
            <p className="text-xs text-stone-400 mb-3">Articles 36 – 51</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Non-justiciable guidelines for the State to build a just social
              and economic order.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Part IV-A */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part IV-A
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              Fundamental Duties
            </h3>
            <p className="text-xs text-stone-400 mb-3">Article 51A</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Eleven moral duties of every Indian citizen, added by the 42nd
              Amendment.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Part V */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5h12M4 10h8M4 15h10"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Part V
            </p>
            <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
              The Union
            </h3>
            <p className="text-xs text-stone-400 mb-3">Articles 52 – 151</p>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Structure of the Union government — President, Parliament, Supreme
              Court and the CAG.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Explore
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SECTION 3 — FEATURED ARTICLES
      ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Featured
            </p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
              Articles to start with
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Article 14 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
              Fundamental Rights
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">Article 14</h3>
            <p className="text-sm font-medium text-stone-600 mb-3">
              Equality before law
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mb-5">
              The State shall not deny to any person equality before the law or
              the equal protection of the laws.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Read article
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Article 19 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
              Fundamental Rights
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">Article 19</h3>
            <p className="text-sm font-medium text-stone-600 mb-3">
              Six freedoms
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mb-5">
              Guarantees six fundamental freedoms including speech, assembly,
              and movement.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Read article
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Article 21 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 text-xs font-semibold text-teal-700 mb-4">
              Fundamental Rights
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">Article 21</h3>
            <p className="text-sm font-medium text-stone-600 mb-3">
              Right to life and personal liberty
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mb-5">
              No person shall be deprived of life or personal liberty except
              according to procedure established by law.
            </p>
            <a
              href="#"
              className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              Read article
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SECTION 4 — IMPORTANT AMENDMENTS
      ════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
              Timeline
            </p>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
              Important amendments
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            See timeline
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* 1st Amendment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-semibold text-stone-400">1951</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
              1st Amendment
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Added the Ninth Schedule to protect land reform laws and modified
              Articles 15 and 19.
            </p>
          </div>

          {/* 42nd Amendment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-semibold text-stone-400">1976</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
              42nd Amendment
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Added the words Socialist, Secular and Integrity to the Preamble;
              introduced Fundamental Duties.
            </p>
          </div>

          {/* 44th Amendment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-xs font-semibold text-stone-400">1978</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
              44th Amendment
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Reversed many of the 42nd Amendment's changes; right to property
              removed from…
            </p>
          </div>

          {/* 73rd Amendment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-100 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-xs font-semibold text-stone-400">1992</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
              73rd Amendment
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Constitutional status to Panchayats; created a three-tier system
              of local self-government.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
