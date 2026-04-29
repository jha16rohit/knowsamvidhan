"use client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/Footer";

import { useState } from "react";
import { Mic } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const relatedArticles = [
  { number: "ARTICLE 14", title: "Equality before law" },
  { number: "ARTICLE 21", title: "Right to life and personal liberty" },
  { number: "ARTICLE 32", title: "Right to constitutional remedies" },
];

// ─── Components ────────────────────────────────────────────────────────────────

function KeywordCard({ word, meaning }: { word: string; meaning: string }) {
  return (
    <div className="bg-white border border-[#ede8df] rounded-xl p-4 hover:bg-[#fffbf5] hover:shadow-md transition">
      <div className="font-bold text-[15px] text-[#1a1208] mb-1 font-serif">
        {word}
      </div>
      <div className="text-[13px] text-[#7a6a50] leading-relaxed">
        {meaning}
      </div>
    </div>
  );
}

function RelatedArticleCard({ number, title }: { number: string; title: string }) {
  return (
    <div className="bg-white border border-[#ede8df] rounded-xl p-4 cursor-pointer hover:shadow-md transition">
      <div className="text-[10px] font-bold text-[#c48232] tracking-widest uppercase mb-1">
        {number}
      </div>
      <div className="text-sm font-semibold text-[#1a1208]">{title}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PreamblePage() {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <Navbar />

      <div className="bg-[#faf7f2] min-h-screen text-[#1a1208] pt-16">

        {/* Hero */}
        <section className="bg-linear-to-br from-[#f5f3ef] to-[#ede8df] border-b border-[#ede8df] px-12 pt-12">
          <div className="max-w-215 mx-auto grid grid-cols-[1fr_320px] gap-12 items-end">

            {/* Left */}
            <div className="pb-12">
              <span className="inline-flex items-center gap-1 bg-[#fdf3e3] border border-[#e8d4a0] rounded-full px-3 py-1 text-xs font-bold text-[#c48232] mb-5">
                🌟 Foundational
              </span>

              <h1 className="text-5xl font-extrabold font-serif mb-3">
                The Preamble
              </h1>

              <p className="text-sm text-[#7a6a50] mb-7">
                The soul of the Constitution — a single sentence that defines who we are as a nation.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition flex items-center gap-1 ${
                    bookmarked
                      ? "bg-[#fdf3e3] text-[#c48232] border-[#ede8df]"
                      : "bg-white text-[#4a3c28] border-[#ede8df]"
                  }`}
                >
                  🔖 {bookmarked ? "Bookmarked" : "Bookmark"}
                </button>

                <button className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ede8df] bg-white text-[#4a3c28] flex items-center gap-1">
                  ↗ Share
                </button>

                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#c48232] text-white flex items-center gap-1">
                  ✦ Ask AI
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="relative bg-white border border-[#ede8df] rounded-t-2xl p-8 shadow-md flex flex-col items-center">

              {/* 🎤 FIXED MIC */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white p-2 rounded-full shadow-md">
                <Mic size={18} />
              </div>

              <div className="relative w-40 h-36 text-center">

                <div className="absolute top-9 left-1/2 -translate-x-1/2 w-28 h-20 bg-linear-to-br from-[#f5e6c8] to-[#e8d4a0] rounded flex items-center justify-center text-xs text-[#8b6914] font-serif font-semibold shadow">
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
        <main className="max-w-170 mx-auto px-6 py-12">

          <div className="bg-white border border-[#ede8df] rounded-xl p-7 mb-5 shadow-sm">
            <div className="text-[10px] font-bold tracking-widest text-[#c48232] uppercase mb-4">
              Official Text
            </div>

            <p className="text-[15px] leading-loose font-serif">
             WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:

JUSTICE, social, economic and political;
LIBERTY of thought, expression, belief, faith and worship;
EQUALITY of status and of opportunity;
and to promote among them all

FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;

IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
            </p>
          </div>

          <div className="bg-white border border-[#ede8df] rounded-xl p-7 mb-10 shadow-sm">
            <div className="text-[10px] font-bold tracking-widest text-[#c48232] uppercase mb-4">
              Simple Explanation
            </div>

            <p className="text-sm text-[#4a3c28] leading-relaxed">
              The Preamble is the soul and identity card of the Indian Constitution...
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-extrabold font-serif mb-1">
              Important keywords
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {keywords.map((k) => (
                <KeywordCard key={k.word} {...k} />
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
