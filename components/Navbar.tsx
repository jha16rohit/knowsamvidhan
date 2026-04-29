// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
    
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50 ">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* LEFT: Logo */}
//         <div className="flex items-center gap-3">
//           {/* Circle Logo */}
//           <div className="w-10 h-10 rounded-full border flex items-center justify-center">
//             <img  src="/image/logo.png"/>
//             {/* <span className="text-sm font-bold text-orange-500" >K</span> */}
           

//           </div>

//           {/* Text */}
//           <div>
//             <h1 className="text-xl font-semibold tracking-tight">
//               Know<span className="text-orange-500">Samvidhan</span>
//             </h1>
//             <p className="text-[10px] tracking-[0.3em] text-gray-500">
//               CONSTITUTION · LEARN · MASTER
//             </p>
//           </div>
//         </div>

//         {/* CENTER: Nav Links */}
//         <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 font-medium">
//           <Link href="/" className="hover:text-black">Home</Link>
//           <Link href="/preamble" className="hover:text-black">Preamble</Link>
//           <Link href="/parts" className="hover:text-black">Parts</Link>
//           <Link href="/articles" className="hover:text-black">Articles</Link>
//           <Link href="/schedules" className="hover:text-black">Schedules</Link>
//           <Link href="/amendments" className="hover:text-black">Amendments</Link>
//           <Link href="/quiz" className="hover:text-black">Quiz</Link>
          
//         </div>

//         {/* RIGHT: Buttons */}
//         <div className="flex items-center gap-3">
//           <button className="text-sm border px-3 py-1 rounded-full whitespace-nowrap hover:bg-gray-100">
//             Log in
//           </button>

//           <button className="text-sm bg-orange-500 text-white px-4 py-1.5 whitespace-nowrap  rounded-full hover:bg-orange-600">
//             Get started
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/preamble", label: "Preamble" },
  { href: "/parts", label: "Parts" },
  { href: "/articles", label: "Articles" },
  { href: "/schedules", label: "Schedules" },
  { href: "/amendments", label: "Amendments" },
  { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-gray-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white">
            <img
              src="/image/logo.png"
              alt="KnowSamvidhan logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-xl">
              Know<span className="text-orange-500">Samvidhan</span>
            </h1>
            <p className="hidden text-[9px] tracking-[0.25em] text-gray-500 sm:block lg:text-[10px]">
              CONSTITUTION · LEARN · MASTER
            </p>
          </div>
        </Link>

        {/* Desktop / Laptop Links */}
        <div className="hidden items-center gap-4 text-sm font-medium text-gray-700 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100">
            Log in
          </button>

          <button className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white hover:bg-orange-600">
            Get started
          </button>
        </div>

        {/* Mobile / iPad Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="text-xl leading-none">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile / iPad Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-full border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100">
              Log in
            </button>

            <button className="rounded-full bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
