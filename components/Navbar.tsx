"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/user_preamble", label: "Preamble", icon: "📜" },
  { href: "/user_parts", label: "Parts", icon: "⊞" },
  { href: "/user_articles", label: "Articles", icon: "§" },
  { href: "/user_schedules", label: "Schedules", icon: "≡" },
  { href: "/user_amendments", label: "Amendments", icon: "↻" },
  { href: "/user_quiz", label: "Quiz", icon: "✦" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredLink(label);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredLink(null), 120);
  };

  return (
    <>
      {/* ══ SCROLL PROGRESS LINE ══ */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "bg-white/[0.82] shadow-[0_8px_40px_rgba(0,0,0,0.08),0_1px_0_rgba(249,115,22,0.12)] backdrop-blur-2xl"
            : "bg-white/60 backdrop-blur-xl"
        }`}
      >
        {/* ── Subtle noise texture overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Bottom border gradient ── */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-40"}`}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.3) 20%, rgba(251,191,36,0.5) 50%, rgba(249,115,22,0.3) 80%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-[58px]" : "h-[68px]"
            }`}
          >
            {/* ══ LOGO ══ */}
            <Link href="/" className="group relative flex shrink-0 items-center gap-3 no-underline">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-orange-500/10 scale-110 transition-transform duration-300 group-hover:scale-125 group-hover:bg-orange-500/15" />
                <div className="absolute inset-0 rounded-full border border-orange-500/20 scale-[1.18] transition-all duration-500 group-hover:scale-[1.35] group-hover:border-orange-500/30" />
                <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-full border border-orange-500/30 bg-white shadow-[0_2px_12px_rgba(249,115,22,0.15)] transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)]">
                  <Image
                    src="/image/logo.png"
                    alt="KnowSamvidhan Logo"
                    width={40}
                    height={40}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-0">
                  <span className="text-[15px] sm:text-[17px] font-black tracking-tight text-gray-900 [font-family:'Playfair_Display',serif]">
                    Know
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-black tracking-tight text-orange-500 transition-colors duration-300 [font-family:'Playfair_Display',serif] group-hover:text-orange-600">
                    Samvidhan
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                  <div className="h-px w-3 bg-orange-500/40" />
                  <span className="text-[8px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
                    CONSTITUTION · LEARN · MASTER
                  </span>
                  <div className="h-px w-3 bg-orange-500/40" />
                </div>
              </div>
            </Link>

            {/* ══ DESKTOP NAV (lg+) ══ */}
            <div className="hidden items-center lg:flex">
              <div className="relative flex items-center rounded-2xl border border-gray-200/60 bg-gray-50/80 px-1.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.04)]">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                      className={`relative rounded-xl px-3 py-1.5 text-[13px] font-semibold no-underline transition-all duration-200 ${
                        active ? "text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_4px_12px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]" />
                      )}
                      {!active && hoveredLink === link.label && (
                        <span className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ══ DESKTOP BUTTONS (md+) ══ */}
            <div className="hidden items-center gap-2.5 md:flex">
              <Link
                href="/user_login"
                className="group relative overflow-hidden whitespace-nowrap rounded-xl border border-gray-200 bg-white/80 px-4 py-1.5 text-[13px] font-semibold text-gray-700 no-underline shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(249,115,22,0.12)] hover:text-orange-600"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-orange-500/[0.06] to-transparent transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative">Log in</span>
              </Link>

              <Link
                href="/signup"
                className="group relative overflow-hidden whitespace-nowrap rounded-xl px-5 py-1.5 text-[13px] font-bold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 shadow-[0_4px_16px_rgba(249,115,22,0.4)]" />
                <span className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
                <span className="relative flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Sign Up
                </span>
              </Link>
            </div>

            {/* ══ HAMBURGER (below md) ══ */}
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200/80 bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(249,115,22,0.15)] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="flex h-[16px] w-[18px] flex-col justify-between">
                <span
                  className={`block h-[1.5px] rounded-full bg-gray-800 transition-all duration-300 origin-left ${
                    isOpen ? "rotate-[38deg] translate-x-[1px] bg-orange-500" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] rounded-full bg-gray-800 transition-all duration-200 ${
                    isOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] rounded-full bg-gray-800 transition-all duration-300 origin-left ${
                    isOpen ? "-rotate-[38deg] translate-x-[1px] bg-orange-500" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* ══ TABLET NAV STRIP (md → lg) ══ */}
        <div className="hidden border-t border-gray-100/60 md:block lg:hidden">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex items-center gap-0.5 overflow-x-auto py-2 scrollbar-none">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group shrink-0 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold no-underline transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[0_3px_10px_rgba(249,115,22,0.3)]"
                        : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <span
                      className={`text-[11px] transition-transform duration-200 group-hover:scale-110 ${
                        active ? "opacity-80" : "opacity-50"
                      }`}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ══ BACKDROP ══ */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isOpen
            ? "bg-black/30 backdrop-blur-[2px] pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ══ MOBILE DRAWER ══ */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-[min(88vw,340px)] flex-col overflow-hidden bg-white shadow-[−20px_0_60px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer ambient glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-orange-500/[0.03] to-transparent" />

        {/* ── Drawer Header ── */}
        <div className="relative flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-400" />

          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 no-underline">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500/10 scale-125" />
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-orange-500/25 bg-white shadow-[0_2px_10px_rgba(249,115,22,0.15)]">
                <Image src="/image/logo.png" alt="Logo" width={36} height={36} className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <div className="text-[15px] font-black text-gray-900 [font-family:'Playfair_Display',serif]">
                Know<span className="text-orange-500">Samvidhan</span>
              </div>
              <div className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">Constitution · Learn</div>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-50 hover:text-orange-500"
            aria-label="Close"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Nav Links ── */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-2 text-[9.5px] font-bold uppercase tracking-[2.5px] text-gray-400">
            Navigate
          </p>

          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-[14px] font-semibold no-underline transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-orange-500/10 to-amber-500/5 text-orange-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={{ transitionDelay: isOpen ? `${i * 35}ms` : "0ms" }}
                >
                  <span
                    className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-amber-400 to-orange-600 transition-all duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[14px] transition-all duration-200 ${
                      active
                        ? "bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]"
                        : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500"
                    }`}
                  >
                    {link.icon}
                  </span>

                  <span className="flex-1">{link.label}</span>

                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 transition-all duration-200 ${
                      active
                        ? "text-orange-500 translate-x-0.5"
                        : "text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5"
                    }`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ── Auth Section ── */}
        <div className="relative border-t border-gray-100 px-4 pt-4 pb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-400">Account</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/user_login"
              onClick={() => setIsOpen(false)}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-gray-200 bg-white py-3 text-[13.5px] font-semibold text-gray-700 no-underline transition-all duration-200 hover:border-orange-500/30 hover:text-orange-600 hover:shadow-[0_4px_16px_rgba(249,115,22,0.1)]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl py-3 text-[13.5px] font-bold text-white no-underline transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 shadow-[0_6px_20px_rgba(249,115,22,0.4)]" />
              <span className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              <span className="relative">Create Account</span>
            </Link>
          </div>

          <p className="mt-4 text-center text-[10px] text-gray-400 tracking-wide">
            Made with <span className="text-orange-500">♥</span> in India 🇮🇳
          </p>
        </div>
      </div>
    </>
  );
}