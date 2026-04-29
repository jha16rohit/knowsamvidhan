"use client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/Footer";
import { useState } from "react";
import { Mic } from "lucide-react";

const keywords = [
  { word: "Justice", meaning: "Social, economic and political fairness for every citizen." },
  { word: "Liberty", meaning: "Freedom of thought, expression, belief, faith and worship." },
  { word: "Equality", meaning: "Equal status and opportunity, regardless of background." },
  { word: "Fraternity", meaning: "A sense of brotherhood that protects dignity and national unity." },
  { word: "Sovereign", meaning: "India is independent and free from external control." },
  { word: "Socialist", meaning: "Commitment to social and economic equality." },
  { word: "Secular", meaning: "The State has no official religion and treats all faiths equally." },
  { word: "Democratic", meaning: "Government of, by and for the people through elected representatives." },
  { word: "Republic", meaning: "Head of State is elected, not hereditary." },
];

function KeywordCard({ word, meaning }: { word: string; meaning: string }) {
  return (
    <div className="rounded-xl border border-[#ede8df] bg-white p-4 transition hover:bg-[#fffbf5] hover:shadow-md">
      <div className="mb-1 font-serif text-[15px] font-bold text-[#1a1208]">
        {word}
      </div>
      <div className="text-[13px] leading-relaxed text-[#7a6a50]">
        {meaning}
      </div>
    </div>
  );
}

export default function PreamblePage() {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#faf7f2] pt-16 text-[#1a1208] sm:pt-20">
        {/* Hero */}
        <section className="border-b border-[#ede8df] bg-gradient-to-br from-[#f5f3ef] to-[#ede8df] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_280px] md:items-end lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Left */}
            <div className="pb-8 md:pb-12">
              <span className="mb-5 inline-flex items-center gap-1 rounded-full border border-[#e8d4a0] bg-[#fdf3e3] px-3 py-1 text-xs font-bold text-[#c48232]">
                🌟 Foundational
              </span>

              <h1 className="mb-3 font-serif text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                The Preamble
              </h1>

              <p className="mb-7 max-w-2xl text-sm leading-6 text-[#7a6a50] sm:text-base">
                The soul of the Constitution — a single sentence that defines
                who we are as a nation.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    bookmarked
                      ? "border-[#ede8df] bg-[#fdf3e3] text-[#c48232]"
                      : "border-[#ede8df] bg-white text-[#4a3c28]"
                  }`}
                >
                  🔖 {bookmarked ? "Bookmarked" : "Bookmark"}
                </button>

                <button className="flex items-center gap-1 rounded-lg border border-[#ede8df] bg-white px-4 py-2 text-sm font-semibold text-[#4a3c28]">
                  ↗ Share
                </button>

                <button className="flex items-center gap-1 rounded-lg bg-[#c48232] px-4 py-2 text-sm font-semibold text-white">
                  ✦ Ask AI
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="mx-auto flex w-full max-w-xs flex-col items-center rounded-t-2xl border border-[#ede8df] bg-white p-8 shadow-md md:mx-0">
              <div className="relative h-36 w-40 text-center">
                <div className="absolute left-1/2 top-9 flex h-20 w-28 -translate-x-1/2 items-center justify-center rounded bg-gradient-to-br from-[#f5e6c8] to-[#e8d4a0] text-xs font-semibold text-[#8b6914] shadow">
                  संविधान
                  <br />
                  भारत
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg">
                  🎗️
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Official Text */}
          <div className="mb-5 rounded-xl border border-[#ede8df] bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#c48232]">
                Official Text
              </div>

              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:bg-[#c48232]"
                aria-label="Listen to official text"
              >
                <Mic size={16} />
              </button>
            </div>

            <p className="whitespace-pre-line font-serif text-sm leading-loose sm:text-[15px]">
              {`WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:

JUSTICE, social, economic and political;
LIBERTY of thought, expression, belief, faith and worship;
EQUALITY of status and of opportunity;
and to promote among them all

FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;

IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.`}
            </p>
          </div>

          {/* Simple Explanation */}
          <div className="mb-10 rounded-xl border border-[#ede8df] bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#c48232]">
              Simple Explanation
            </div>

            <p className="text-sm leading-relaxed text-[#4a3c28]">
              The Preamble is the soul and identity card of the Indian
              Constitution. It explains the ideals India promises to follow:
              justice, liberty, equality, fraternity, democracy, secularism and
              national unity.
            </p>
          </div>

          {/* Keywords */}
          <div className="mb-10">
            <h2 className="mb-4 font-serif text-2xl font-extrabold sm:text-3xl">
              Important keywords
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {keywords.map((keyword) => (
                <KeywordCard key={keyword.word} {...keyword} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <FooterSection />
    </>
  );
}

// "use client";

// import Navbar from "@/components/Navbar";
// import FooterSection from "@/components/Footer";

// import { useState } from "react";
// import { Mic } from "lucide-react";

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const keywords = [
//   { word: "Justice", meaning: "Social, economic and political fairness for every citizen." },
//   { word: "Liberty", meaning: "Freedom of thought, expression, belief, faith and worship." },
//   { word: "Equality", meaning: "Equal status and opportunity, regardless of background." },
//   { word: "Fraternity", meaning: "A sense of brotherhood that protects dignity and national unity." },
//   { word: "Sovereign", meaning: "India is independent and free from external control." },
//   { word: "Socialist", meaning: "Commitment to social and economic equality." },
//   { word: "Secular", meaning: "The State has no official religion and treats all faiths equally." },
//   { word: "Democratic", meaning: "Government of, by and for the people through elected representatives." },
//   { word: "Republic", meaning: "Head of State is elected, not hereditary." },
// ];

// const relatedArticles = [
//   { number: "ARTICLE 14", title: "Equality before law" },
//   { number: "ARTICLE 21", title: "Right to life and personal liberty" },
//   { number: "ARTICLE 32", title: "Right to constitutional remedies" },
// ];

// // ─── Components ────────────────────────────────────────────────────────────────

// function KeywordCard({ word, meaning }: { word: string; meaning: string }) {
//   return (
//     <div className="bg-white border border-[#ede8df] rounded-xl p-4 hover:bg-[#fffbf5] hover:shadow-md transition">
//       <div className="font-bold text-[15px] text-[#1a1208] mb-1 font-serif">
//         {word}
//       </div>
//       <div className="text-[13px] text-[#7a6a50] leading-relaxed">
//         {meaning}
//       </div>
//     </div>
//   );
// }

// function RelatedArticleCard({ number, title }: { number: string; title: string }) {
//   return (
//     <div className="bg-white border border-[#ede8df] rounded-xl p-4 cursor-pointer hover:shadow-md transition">
//       <div className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-1">
//         {number}
//       </div>
//       <div className="text-sm font-semibold text-[#1a1208]">{title}</div>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function PreamblePage() {
//   const [bookmarked, setBookmarked] = useState(false);

//   return (
//     <>
//       <Navbar />

//       <div className="bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">
//         {/* Hero */}
//         <section className="bg-linear-to-br from-[#f5f3ef] to-[#ede8df] border-b border-[#ede8df] px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 lg:pt-12">
//           <div className="max-w-[86rem] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-end">
//             {/* Left */}
//             <div className="pb-8 lg:pb-12">
//               <span className="inline-flex items-center gap-1 bg-[#fdf3e3] border border-[#e8d4a0] rounded-full px-3 py-1 text-xs font-bold text-[#c48232] mb-5">
//                 🌟 Foundational
//               </span>

//               <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold font-serif mb-3">
//                 The Preamble
//               </h1>

//               <p className="text-sm sm:text-base lg:text-sm text-[#7a6a50] mb-7 max-w-2xl">
//                 The soul of the Constitution — a single sentence that defines who we are as a nation.
//               </p>

//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setBookmarked(!bookmarked)}
//                   className={`px-4 py-2 rounded-lg text-sm font-semibold border transition flex items-center gap-1 ${
//                     bookmarked
//                       ? "bg-[#fdf3e3] text-[#c48232] border-[#ede8df]"
//                       : "bg-white text-[#4a3c28] border-[#ede8df]"
//                   }`}
//                 >
//                   🔖 {bookmarked ? "Bookmarked" : "Bookmark"}
//                 </button>

//                 <button className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ede8df] bg-white text-[#4a3c28] flex items-center gap-1">
//                   ↗ Share
//                 </button>

//                 <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#c48232] text-white flex items-center gap-1">
//                   ✦ Ask AI
//                 </button>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="relative bg-white border border-[#ede8df] rounded-t-2xl p-6 sm:p-8 shadow-md flex flex-col items-center w-full max-w-[320px] mx-auto lg:mx-0">
//               {/* 🎤 FIXED MIC */}
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white p-2 rounded-full shadow-md">
//                 <Mic size={18} />
//               </div>

//               <div className="relative w-40 h-36 text-center">
//                 <div className="absolute top-9 left-1/2 -translate-x-1/2 w-28 h-20 bg-linear-to-br from-[#f5e6c8] to-[#e8d4a0] rounded flex items-center justify-center text-xs text-[#8b6914] font-serif font-semibold shadow">
//                   संविधान
//                   <br />
//                   भारत
//                 </div>

//                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg">
//                   🎗️
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Content */}
//         <main className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
//           <div className="bg-white border border-[#ede8df] rounded-xl p-5 sm:p-7 mb-5 shadow-sm">
//             <div className="text-[10px] font-bold tracking-widest text-[#c48232] uppercase mb-4">
//               Official Text
//             </div>

//             <p className="text-sm sm:text-[15px] leading-loose font-serif">
//               WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:

//               JUSTICE, social, economic and political;
//               LIBERTY of thought, expression, belief, faith and worship;
//               EQUALITY of status and of opportunity;
//               and to promote among them all

//               FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;

//               IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
//             </p>
//           </div>

//           <div className="bg-white border border-[#ede8df] rounded-xl p-5 sm:p-7 mb-10 shadow-sm">
//             <div className="text-[10px] font-bold tracking-widest text-[#c48232] uppercase mb-4">
//               Simple Explanation
//             </div>

//             <p className="text-sm text-[#4a3c28] leading-relaxed">
//               The Preamble is the soul and identity card of the Indian Constitution...
//             </p>
//           </div>

//           <div className="mb-10">
//             <h2 className="text-2xl font-extrabold font-serif mb-4">
//               Important keywords
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//               {keywords.map((k) => (
//                 <KeywordCard key={k.word} {...k} />
//               ))}
//             </div>
//           </div>

//           <div className="mb-10">
//             <h2 className="text-2xl font-extrabold font-serif mb-4">
//               Related articles
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {relatedArticles.map((article) => (
//                 <RelatedArticleCard key={article.number} {...article} />
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>

//       <FooterSection />
//     </>
//   );
// }
