// "use client";

// export default function FooterSection() {
//   return (
//     <>
      
//       { <footer className="bg-slate-900 px-12 py-14">
//         <div className="max-w-240 mx-auto">

//           {/* Top */}
//           <div className="grid grid-cols-3 gap-12 mb-12">

//             {/* Brand */}
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
//                   🏛️
//                 </div>
//                 <div>
//                   <div className="font-bold text-slate-100 text-[16px]">
//                     Know<span className="text-orange-500">Samvidhan</span>
//                   </div>
//                   <div className="text-[9px] tracking-[2px] text-slate-500 uppercase">
//                     Constitution · Learn · Master
//                   </div>
//                 </div>
//               </div>

//               <p className="text-[13px] text-slate-500 leading-7 mt-4 mb-6 max-w-70">
//                 KnowSamvidhan is a modern learning platform for the Constitution
//                 of India — articles, amendments, AI doubt-solving and quizzes,
//                 designed for students and curious citizens.
//               </p>

//               <div className="flex gap-3">
//                 {["𝕏", "in", "◉", "✉"].map((icon, i) => (
//                   <button
//                     key={i}
//                     className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center"
//                   >
//                     {icon}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Explore */}
//             <div>
//               <div className="text-[11px] font-bold tracking-[1.5px] text-slate-100 uppercase mb-5">
//                 Explore
//               </div>

//               {["Articles", "Amendments", "Quizzes", "AI Chat"].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="block text-[14px] text-slate-500 mb-3 hover:text-orange-500"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>

//             {/* Account */}
//             <div>
//               <div className="text-[11px] font-bold tracking-[1.5px] text-slate-100 uppercase mb-5">
//                 Account
//               </div>

//               {["Login", "Sign up", "Profile", "Bookmarks"].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="block text-[14px] text-slate-500 mb-3 hover:text-orange-500"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Bottom */}
//           <div className="border-t border-slate-800 pt-6 flex justify-between items-center text-[12px] text-slate-600">
//             <span>© 2026 KnowSamvidhan. Educational content. Not legal advice.</span>
//             <span>Crafted with care · Designed in India</span>
//           </div>
//         </div>
//       </footer>
//        }  
//      </>
            
//  );
// }
"use client";

import Link from "next/link";

const exploreLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Amendments", href: "/amendments" },
  { label: "Quizzes", href: "/quiz" },
  { label: "AI Chat", href: "/chat" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Profile", href: "/profile" },
  { label: "Bookmarks", href: "/bookmarks" },
];

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Top */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-2 flex items-center gap-3">
               <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white">
            <img
              src="/image/logo.png"
              alt="KnowSamvidhan logo"
              className="h-full w-full object-cover"
            />
          </div>

              <div className="min-w-0">
                <div className="text-base font-bold text-slate-100">
                  Know<span className="text-orange-500">Samvidhan</span>
                </div>
                <div className="text-[9px] uppercase tracking-[2px] text-slate-500">
                  Constitution · Learn · Master
                </div>
              </div>
            </div>

            <p className="mt-4 mb-6 max-w-md text-[13px] leading-7 text-slate-500">
              KnowSamvidhan is a modern learning platform for the Constitution
              of India — articles, amendments, AI doubt-solving and quizzes,
              designed for students and curious citizens.
            </p>

            <div className="flex gap-3">
              {["𝕏", "in", "◉", "✉"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:border-orange-500 hover:text-orange-500"
                  aria-label={`Social link ${icon}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-100">
              Explore
            </div>

            <div className="grid gap-3">
              {exploreLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-500 hover:text-orange-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-100">
              Account
            </div>

            <div className="grid gap-3">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-500 hover:text-orange-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-600 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 KnowSamvidhan. Educational content. Not legal advice.</span>
          <span>Crafted with care · Designed in India</span>
        </div>
      </div>
    </footer>
  );
}
