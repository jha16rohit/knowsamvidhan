"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          {/* Circle Logo */}
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <img  src="/image/logo.png"/>
            {/* <span className="text-sm font-bold text-orange-500" >K</span> */}
           

          </div>

          {/* Text */}
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Know<span className="text-orange-500">Samvidhan</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-gray-500">
              CONSTITUTION · LEARN · MASTER
            </p>
          </div>
        </div>

        {/* CENTER: Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 font-medium">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/preamble" className="hover:text-black">Preamble</Link>
          <Link href="/parts" className="hover:text-black">Parts</Link>
          <Link href="/articles" className="hover:text-black">Articles</Link>
          <Link href="/schedules" className="hover:text-black">Schedules</Link>
          <Link href="/amendments" className="hover:text-black">Amendments</Link>
          <Link href="/quiz" className="hover:text-black">Quiz</Link>
          
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex items-center gap-3">
          <button className="text-sm border px-3 py-1 rounded-full whitespace-nowrap hover:bg-gray-100">
            Log in
          </button>

          <button className="text-sm bg-orange-500 text-white px-4 py-1.5 whitespace-nowrap  rounded-full hover:bg-orange-600">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}