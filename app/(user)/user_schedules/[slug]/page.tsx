"use client";

import FooterSection from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Share2, Tag, ChevronDown, ChevronUp } from "lucide-react";

interface TagDetail { tag: string; detail: string; }

interface Schedule {
  id: string;
  shortId: string;
  schedule: string;
  slug: string;
  title: string;
  description: string;
  topics: string[];
  tagDetails: TagDetail[];
}

function TagAccordion({ index, tag, detail }: { index: number; tag: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-amber-300 shadow-sm shadow-amber-100" : "border-stone-200"}`}>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${open ? "bg-amber-50" : "bg-white hover:bg-stone-50"}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-teal-600 font-bold text-sm tabular-nums w-6">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-stone-800 text-[15px]">{tag}</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-white border-t border-stone-100">
          <p className="text-[14px] text-stone-600 leading-relaxed">{detail}</p>
        </div>
      )}
    </div>
  );
}

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch(`/api/schedules/${slug}`).then((r) => r.json()),
      fetch("/api/schedules").then((r) => r.json()),
    ]).then(([detail, all]) => {
      setSchedule(detail.error ? null : detail);
      setAllSchedules(all);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-stone-50 pt-16 px-8 py-16 animate-pulse">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="h-8 bg-stone-200 rounded-xl w-1/3" />
            <div className="h-12 bg-stone-200 rounded-xl w-2/3" />
            <div className="h-48 bg-stone-200 rounded-2xl mt-8" />
          </div>
        </div>
      </>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900 mb-2">Schedule not found</p>
          <Link href="/user_schedules" className="text-amber-600 underline text-sm">← Back to schedules</Link>
        </div>
      </div>
    );
  }

  const otherSchedules = allSchedules.filter((s) => s.slug !== slug).slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 text-stone-900 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/60 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-14">
            <button onClick={() => router.push("/user_schedules")}
              className="inline-flex items-center gap-1.5 text-stone-500 text-sm hover:text-stone-800 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to schedules
            </button>

            <p className="text-[11px] font-bold text-amber-600 tracking-[0.15em] uppercase mb-3">
              {schedule.schedule} · {schedule.shortId.toUpperCase()}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-teal-200">
                <span className="text-white font-extrabold text-xl font-serif">{schedule.shortId}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
                {schedule.title}
              </h1>
            </div>

            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              {schedule.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {schedule.topics.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 border border-amber-200 bg-amber-50 text-amber-700 text-[12px] font-medium rounded-full px-3 py-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="inline-flex items-center gap-1.5 border border-stone-200 bg-white text-stone-600 text-[13px] font-medium rounded-lg px-3.5 py-2 hover:bg-stone-50 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="inline-flex items-center gap-1.5 border border-stone-200 bg-white text-stone-600 text-[13px] font-medium rounded-lg px-3.5 py-2 hover:bg-stone-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mb-3">Overview</h2>
                <p className="text-stone-600 text-[15px] leading-relaxed">{schedule.description}</p>
              </div>

              <div className="border-t border-stone-100 mb-10" />

              {schedule.tagDetails.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mb-1">Topics covered</h2>
                  <p className="text-stone-400 text-sm mb-6">
                    {schedule.tagDetails.length} topic{schedule.tagDetails.length !== 1 ? "s" : ""} — click to expand
                  </p>
                  <div className="flex flex-col gap-3">
                    {schedule.tagDetails.map((td, i) => (
                      <TagAccordion key={td.tag} index={i} tag={td.tag} detail={td.detail} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-5">
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-4">Schedule</p>
                <span className="text-4xl font-extrabold text-stone-900 font-serif leading-none">{schedule.shortId}</span>
                <p className="text-stone-400 text-sm mt-1 mb-5">{schedule.schedule}</p>
                <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-sm">
                  <span className="text-stone-400">Topics</span>
                  <span className="font-bold text-stone-800">{schedule.tagDetails.length}</span>
                </div>
              </div>

              {otherSchedules.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-4">Other Schedules</p>
                  <div className="flex flex-col divide-y divide-stone-100">
                    {otherSchedules.map((s) => (
                      <Link key={s.slug} href={`/user_schedules/${s.slug}`} className="py-3 group first:pt-0 last:pb-0">
                        <p className="text-[13px] font-semibold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
                          {s.schedule}
                        </p>
                        <p className="text-[12px] text-stone-400 mt-0.5 leading-snug">{s.title}</p>
                      </Link>
                    ))}
                  </div>
                  <Link href="/user_schedules"
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-amber-600 text-[13px] font-semibold hover:text-amber-700 transition-colors border border-amber-200 rounded-lg py-2.5 hover:bg-amber-50"
                  >
                    View all schedules
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}