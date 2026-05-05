"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Schedule {
  id: string;
  shortId: string;
  schedule: string;
  slug: string;
  title: string;
  description: string;
  topics: string[];
}

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <div className="group bg-white border border-[#e6bc82] rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/10 hover:-translate-y-0.5">
      <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
        <span className="text-amber-700 font-extrabold text-sm font-serif leading-none tracking-tight">
          {schedule.shortId}
        </span>
      </div>

      <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-1.5">
        {schedule.schedule}
      </p>

      <h3 className="font-bold text-[17px] text-stone-900 font-serif leading-snug mb-2.5">
        {schedule.title}
      </h3>

      <p className="text-[13px] text-stone-500 leading-relaxed mb-5 flex-1">
        {schedule.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {schedule.topics.map((tag) => (
          <span key={tag}
            className="bg-stone-100 border border-stone-200 text-stone-500 text-[11px] font-medium rounded-md px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link href={`/user_schedules/${schedule.slug}`}
        className="inline-flex items-center gap-1.5 text-amber-600 text-[13px] font-semibold hover:text-amber-700 transition-colors group/link"
      >
        Explore Schedule
        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/schedules")
      .then((r) => r.json())
      .then((data) => { setSchedules(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="font-sans bg-stone-50 min-h-screen text-stone-900 pt-16">
        <section className="`bg-gradient-to-br from-[#f5f3ef] via-[#f0ece4] to-[#ede8df] border-b border-stone-200 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="max-w-368 mx-auto">
            <p className="text-[11px] font-bold text-amber-600 tracking-[0.15em] uppercase mb-3">Reference</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-tight mb-4">
              Schedules of the Constitution
            </h1>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl">
              The Schedules contain detailed lists, forms and tables that supplement the Articles.{" "}
              <span className="text-amber-600 font-semibold">Click any card</span> to explore in depth.
            </p>
          </div>
        </section>

        <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 pb-20">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-[#e6bc82] rounded-2xl p-6 h-56 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {schedules.map((s) => <ScheduleCard key={s.id} schedule={s} />)}
            </div>
          )}
        </main>

        <FooterSection />
      </div>
    </>
  );
}