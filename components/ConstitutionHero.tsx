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

"use client";

import { useState, useEffect, MouseEvent } from "react";

export default function Hero() {
  const rotatingWords = ["the Smart Way","Simply","Smartly","Effectively"];  
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
      <div className="absolute  -right-80 pointer-events-none z-0 opacity-[0.08]">
        <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-cw" width={900} height={900} />
      </div>

      {/* ── BG CHAKRA — bottom left (small) ── */}
      <div className="absolute -bottom-52 -left-52 pointer-events-none z-0 opacity-[0.06]">
        <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-ccw" width={700} height={500} />
      </div>

      {/* ── BG CHAKRA — mid left (tiny accent) ── */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 pointer-events-none z-0 opacity-[0.04]">
        <img src="image/ashoka.png" alt="" aria-hidden="true" className="chakra-sm" width={480} height={280} />
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

            

            {/* <div>
            <h1
              className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 max-w-175"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
            >
              Learn the<br />
              Constitution of India,{" "}
              <button
                onClick={handleWordClick}
                className="inline-block px-4 py-1 rounded-lg text-white cursor-pointer transition-all duration-300 select-none"
                style={{
                  background: "linear-gradient(90deg, #f97316, #ea580c)",
                  opacity: Animation ? 0 : 1,
                  transform: Animation ? "translateY(8px)" : "translateY(0)",
                  transition: "opacity 0.3s, transform 0.3s",
                  border: "none",
                  fontFamily: "'Georgia', serif",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {rotatingWords[wordIndex]}
              </button>
            </h1>
          </div> */}
          <div className="max-w-7xl w-full">

  <h1
    className="text-[56px] lg:text-[72px] font-bold leading-[1.1] text-gray-900"
    style={{
      fontFamily: "'Georgia', serif",
      letterSpacing: "-0.02em",
    }}
  >
    Learn the <br/> Constitution of India,<br/>{" "}

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
              Search articles, ask AI doubts, practice quizzes, and master amendments with{" "}
              <strong className="text-neutral-800 font-semibold">KnowSamvidhan</strong>
              {" "}— built for students, citizens, and aspirants.
            </p>

            {/* Search bar */}
            <div className="flex items-center bg-white/90 backdrop-blur-sm border border-[#ddd0b0] rounded-2xl px-4 py-3.5 gap-3 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_6px_32px_rgba(0,0,0,0.1)]">
              <svg className="text-neutral-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
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
              {["Preamble", "Fundamental Rights", "Directive Principles", "Recent Amendments", "Schedules"].map((tag) => (
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Try AI Chat →
              </button>
              <button className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm text-neutral-800 border border-[#ddd0b0] hover:border-neutral-700 hover:bg-white active:scale-[0.97] rounded-2xl px-7 py-4 text-[0.94rem] font-semibold hover:-translate-y-0.5 transition-all duration-200 font-['DM_Sans']">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Browse Parts
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {[
                { icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ), bold: "100%", text: "Source-cited answers" },
                { icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  ), bold: "42,000+", text: "Learners onboard" },
                { icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  ), bold: "395", text: "Articles · 12 Schedules" },
              ].map((s) => (
                <div key={s.bold} className="flex items-center gap-2 text-[0.82rem] text-neutral-500 font-['DM_Sans']">
                  <span className="text-amber-600">{s.icon}</span>
                  <strong className="text-neutral-900 font-semibold">{s.bold}</strong>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT COLUMN — Constitution Book Image ════ */}
          <div className="w-full lg:w-auto lg:shrink-0 flex mt-95  justify-center lg:justify-end">
            <div className="relative">

              {/* Warm radial glow behind image */}
              <div
                className="absolute -inset-8 -z-10 blur-3xl rounded-full"
                style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.22) 0%, rgba(244,186,100,0.12) 40%, transparent 70%)" }}
              />

              {/* Soft shadow plate */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-8 blur-2xl rounded-full -z-10"
                style={{ background: "rgba(120,80,10,0.18)" }}
              />

              {/* The book image */}
              <img
                src="image/con.png"
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
  );
}