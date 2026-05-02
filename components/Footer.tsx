"use client";

import Link from "next/link";
import Image  from "next/image";
import { useEffect, useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const exploreLinks = [
  {
    label: "preamble", href: "/user_preamble",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    label: "Parts", href: "/user_parts",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    label: "Articles", href: "/user_articles",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    label: "Schedules", href: "/user_schedules",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    label: "Amendments", href: "/user_amendments",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    label: "Quizzes", href: "/user_quiz",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    label: "AI Chat", href: "/user_chat",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  
  
];

const accountLinks = [
  {
    label: "Login", href: "/user_login",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>,
  },
  {
    label: "Sign up", href: "/signup",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  },
  {
    label: "Profile", href: "/profile",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    label: "Bookmarks", href: "/user_bookmarks",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  },
];

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/search?q=%23ConstitutionOfIndia",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/search/results/content/?keywords=Indian%20Constitution",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  
  {
    label: "Instagram",
    href: "https://www.instagram.com/explore/tags/constitutionofindia/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  
  {
    label: "Email",
    href: "mailto:hello@knowsamvidhan.in",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const stats = [
  { value: "395",  label: "Articles"   },
  { value: "12",   label: "Schedules"  },
  { value: "106+", label: "Amendments" },
  { value: "42K+", label: "Learners"   },
];

const quickInfo = [
  { label: "Adopted",   value: "26 Nov 1949" },
  { label: "In effect", value: "26 Jan 1950"  },
  { label: "Parts",     value: "22 Parts"     },
];

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

/* ─── Shared input class ─────────────────────────────────────────────────────── */
const inputCls =
  "w-full rounded-[10px] border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-slate-200 placeholder-gray-600 outline-none transition-all duration-200 focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]";

/* ─── Section heading ────────────────────────────────────────────────────────── */
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 sm:mb-5">
      <span className="text-[10px] font-bold uppercase tracking-[2px] text-orange-500/70">{label}</span>
      <div className="flex-1 h-px bg-linear-to-r from-orange-500/20 to-transparent" />
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export default function FooterSection() {
  const [rating, setRating]           = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment]         = useState("");
  const [name, setName]               = useState("");
  const [submitted, setSubmitted]     = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        setIsRegisteredUser(response.ok);
      } catch {
        if (!controller.signal.aborted) {
          setIsRegisteredUser(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setAuthChecked(true);
        }
      }
    };

    checkAuth();

    return () => controller.abort();
  }, []);

  const handleSubmit = async () => {
    setFeedbackNotice("");

    if (!authChecked || !isRegisteredUser) {
      setFeedbackNotice("User must login first");
      return;
    }

    if (rating === 0) {
      setFeedbackNotice("Select a star to submit");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rating, name, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedbackNotice(data?.error || "Could not save feedback");
        return;
      }

      setSubmitted(true);
    } catch {
      setFeedbackNotice("Could not save feedback");
    } finally {
      setSubmitting(false);
    }
  };
  const activeStars  = hoverRating || rating;

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0f]">

      {/* ── Ambient glow blobs ── */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-75 w-75 sm:h-100 sm:w-100 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.07)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.05)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-50 w-[90vw] sm:w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.03)_0%,transparent_70%)]" />

      {/* ── Grid texture ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[60px_60px]" />

      {/* ── Ashoka watermark — hidden on small screens ── */}
      <div className="pointer-events-none select-none absolute bottom-16 right-7.5 opacity-[0.025] hidden md:block">
        <Image src="/image/ashoka.png" alt="" width={280} height={280} aria-hidden="true" />
      </div>

      {/* ── Top glow divider ── */}
      <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(249,115,22,0.4)_30%,rgba(251,191,36,0.6)_50%,rgba(249,115,22,0.4)_70%,transparent_100%)]" />

      {/* ══════════════════════════════════════════ MAIN ══════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">

        {/* ── Stats bar ── */}
        <div className="mb-10 sm:mb-12 lg:mb-14 flex overflow-hidden rounded-xl sm:rounded-2xl border border-orange-500/15 bg-orange-500/3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 px-1 py-3 sm:px-2 sm:py-4 text-center transition-colors duration-200 hover:bg-orange-500/6 ${
                i < stats.length - 1 ? "border-r border-orange-500/10" : ""
              }`}
            >
              <div className="bg-linear-to-br from-orange-500 to-amber-400 bg-clip-text text-[18px] xs:text-[20px] sm:text-[22px] font-black leading-none text-transparent font-['Playfair_Display',serif]">
                {s.value}
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[1px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Responsive grid ──
            Mobile (default):       1 col, stacked
            Mini tablet (480px+):   2 cols: [brand] [explore+account]
            Tablet (768px+):        2 cols: [brand] [explore | account | quickinfo]  
            Desktop (1024px+):      4 cols: brand | explore | account+quickinfo | feedback
        ── */}
        <div className="mb-10 sm:mb-12 lg:mb-14 grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:grid-cols-[1.6fr_1fr_1fr_1.8fr] min-[480px]:gap-x-8 min-[480px]:gap-y-8">

          {/* ── Brand column — always full-width on mobile, first col elsewhere ── */}
          <div className="col-span-1 min-[480px]:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="mb-4 sm:mb-5 flex items-center gap-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full border border-orange-500/40 bg-white">
                <Image src="/image/logo.png" alt="KnowSamvidhan logo" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-100">
                  Know<span className="text-orange-500">Samvidhan</span>
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[2px] text-gray-600">
                  Constitution · Learn · Master
                </div>
              </div>
            </div>

            <p className="mb-5 sm:mb-6 max-w-full sm:max-w-85 lg:max-w-75 text-[13px] leading-[1.85] text-gray-500">
              A modern platform to master the Constitution of India — articles, amendments, AI doubt-solving
              and quizzes, built for students and curious citizens.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/8 bg-white/4 text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/12 hover:text-orange-500 hover:shadow-[0_8px_20px_rgba(249,115,22,0.2)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore ── */}
          <div className="col-span-1">
            <SectionHeading label="Explore" />
            <div className="flex flex-col gap-0.5">
              {exploreLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 border-b border-transparent py-1.25 text-[13px] text-gray-500 transition-all duration-200 hover:border-orange-500/30 hover:text-orange-500 no-underline"
                >
                  <span className="opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Account + Quick Info ── */}
          <div className="col-span-1">
            <SectionHeading label="Account" />
            <div className="mb-6 sm:mb-8 flex flex-col gap-0.5">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 border-b border-transparent py-1.25 text-[13px] text-gray-500 transition-all duration-200 hover:border-orange-500/30 hover:text-orange-500 no-underline"
                >
                  <span className="opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>

            <SectionHeading label="Quick Info" />
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {quickInfo.map((info) => (
                <div key={info.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-600">{info.label}</span>
                  <span className="text-[12px] font-semibold text-orange-500">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Feedback / Rating form — full width on mobile & mini tablet, full width on md, last col on lg ── */}
          <div className="col-span-1 min-[480px]:col-span-2 md:col-span-3 lg:col-span-1">
            <SectionHeading label="Rate & Review" />

            {/* Card */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[20px] border border-orange-500/18 bg-linear-to-br from-orange-500/6 to-[#0a0a0f]/80 p-5 sm:p-6 lg:p-8">
              {/* top shimmer */}
              <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />
              {/* corner glow */}
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)]" />

              {submitted ? (
                /* ── Success ── */
                <div className="flex flex-col items-center justify-center gap-3 py-4 sm:py-6 text-center">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-orange-500/30 bg-linear-to-br from-orange-500/20 to-amber-400/10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-slate-100 font-['Playfair_Display',serif]">
                    Thank you!
                  </div>
                  <p className="max-w-55 text-[13px] leading-relaxed text-gray-500">
                    Your feedback helps us build a better platform for every Indian citizen.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setRating(0); setComment(""); setName(""); setFeedbackNotice(""); }}
                    className="mt-1 cursor-pointer border-none bg-transparent text-[12px] text-orange-500 underline underline-offset-[3px]"
                  >
                    Submit another →
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div>
                    <div className="mb-1 text-[15px] sm:text-[17px] font-bold text-slate-100 font-['Playfair_Display',serif]">
                      How&apos;s your experience?
                    </div>
                    <p className="text-[12px] leading-[1.55] text-gray-500">
                      Share feedback — it means a lot to our team.
                    </p>
                  </div>

                  {/* Stars */}
                  <div>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400">
                      Your Rating
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          aria-label={`Rate ${star} stars`}
                          className="cursor-pointer border-none bg-transparent p-0.5 transition-transform duration-150 hover:scale-125"
                        >
                          <svg
                            width="24" height="24" viewBox="0 0 24 24"
                            fill={activeStars >= star ? "#f97316" : "none"}
                            stroke={activeStars >= star ? "#f97316" : "rgba(255,255,255,0.15)"}
                            strokeWidth="1.5"
                            className={activeStars >= star ? "drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]" : ""}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-1 self-center text-[12px] font-semibold text-orange-500">
                          {ratingLabels[rating]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400">
                      Your Name{" "}
                      <span className="normal-case font-normal text-gray-600">(optional)</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400">
                      Your Comment
                    </div>
                    <textarea
                      placeholder="What do you love? What can we improve?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <button
                      onClick={handleSubmit}
                      aria-disabled={submitting || !authChecked || !isRegisteredUser || rating === 0}
                      className={`inline-flex items-center gap-2 rounded-[10px] bg-linear-to-br from-orange-500 to-orange-600 px-4 sm:px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all duration-200 ${
                        submitting || !authChecked || !isRegisteredUser || rating === 0
                          ? "cursor-not-allowed opacity-40"
                          : "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.45)]"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      {submitting ? "Saving..." : "Send Feedback"}
                    </button>
                    <span className={`text-[11px] ${feedbackNotice ? "text-orange-500" : "text-gray-600"}`}>
                      {feedbackNotice || (rating === 0 ? "Select a star to submit" : !isRegisteredUser ? "Login required" : "")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>{/* end grid */}

        {/* ══════════════════════════════════════════ BOTTOM BAR ════════════════ */}
        <div className="flex flex-col gap-3 border-t border-white/5 py-5 text-xs text-gray-600 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

          <div className="flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:gap-x-4 min-[480px]:gap-y-2">
            <span className="text-[11px] sm:text-xs">© 2026 KnowSamvidhan. Educational content. Not legal advice.</span>

            <span className="hidden min-[480px]:inline text-gray-700/40">|</span>

            {/* Quantum Quills badge */}
            <a
              href="#"
              aria-label="Made by Quantum Quills"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/8 px-3 py-1 text-[11px] text-gray-400 no-underline transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/[0.14] hover:text-orange-500"
            >
              {/* Animated heart */}
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="#f97316"
                className="animate-pulse"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {/* Quill icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
              </svg>
              Made with love by{" "}
              <span className="font-semibold text-orange-500">Quantum Quills</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-gray-700/50">●</span>
            <span className="text-[11px] sm:text-xs">Crafted with care · Designed in India 🇮🇳</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
