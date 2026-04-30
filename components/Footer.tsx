"use client";

export default function FooterSection() {
  return (
    <>
      
      { <footer className="bg-slate-900 px-12 py-14">
        <div className="max-w-240 mx-auto">

          {/* Top */}
          <div className="grid grid-cols-3 gap-12 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  🏛️
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-[16px]">
                    Know<span className="text-orange-500">Samvidhan</span>
                  </div>
                  <div className="text-[9px] tracking-[2px] text-slate-500 uppercase">
                    Constitution · Learn · Master
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-slate-500 leading-7 mt-4 mb-6 max-w-70">
                KnowSamvidhan is a modern learning platform for the Constitution
                of India — articles, amendments, AI doubt-solving and quizzes,
                designed for students and curious citizens.
              </p>

              <div className="flex gap-3">
                {["𝕏", "in", "◉", "✉"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <div className="text-[11px] font-bold tracking-[1.5px] text-slate-100 uppercase mb-5">
                Explore
              </div>

              {["Articles", "Amendments", "Quizzes", "AI Chat"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-[14px] text-slate-500 mb-3 hover:text-orange-500"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Account */}
            <div>
              <div className="text-[11px] font-bold tracking-[1.5px] text-slate-100 uppercase mb-5">
                Account
              </div>

              {["Login", "Sign up", "Profile", "Bookmarks"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-[14px] text-slate-500 mb-3 hover:text-orange-500"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-800 pt-6 flex justify-between items-center text-[12px] text-slate-600">
            <span>© 2026 KnowSamvidhan. Educational content. Not legal advice.</span>
            <span>Crafted with care · Designed in India</span>
          </div>
        </div>
      </footer>
       }  
     </>
            
 );
}