"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  showOnSite: boolean;
}

const StarDisplay = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={rating >= star ? "#f97316" : "none"}
        stroke={rating >= star ? "#f97316" : "rgba(249,115,22,0.2)"}
        strokeWidth="1.5"
        className={rating >= star ? "drop-shadow-[0_0_3px_rgba(249,115,22,0.4)]" : ""}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ratingLabel: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/feedback/public");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setTestimonials(data.feedbacks || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="max-w-full mx-auto px-6 sm:px-8 pt-16 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-4 w-24 rounded-full bg-orange-100 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-white border border-[#f1cf9e] p-6 animate-pulse">
              <div className="h-3 w-20 bg-orange-50 rounded-full mb-4" />
              <div className="h-4 w-3/4 bg-stone-100 rounded-full mb-3" />
              <div className="h-3 w-full bg-stone-50 rounded-full mb-2" />
              <div className="h-3 w-2/3 bg-stone-50 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) return null;

  return (
    <section className="max-w-full  px-6 sm:px-8 pt-16 pb-4">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500 mb-2 font-['DM_Sans']">
            Community
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            What Learners Say
          </h2>
          <p className="text-sm text-stone-400 mt-1.5 font-['DM_Sans']">
            Real voices from citizens learning their Constitution.
          </p>
        </div>

        {/* Average rating badge */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#f1cf9e] px-5 py-3 shadow-sm">
          <div>
            <div
              className="text-3xl font-black text-stone-900 leading-none"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {(
                testimonials.reduce((acc, t) => acc + t.rating, 0) /
                testimonials.length
              ).toFixed(1)}
            </div>
            <div className="text-[10px] text-stone-400 font-['DM_Sans'] mt-0.5">
              out of 5
            </div>
          </div>
          <div>
            <StarDisplay
              rating={Math.round(
                testimonials.reduce((acc, t) => acc + t.rating, 0) /
                  testimonials.length
              )}
              size={16}
            />
            <div className="text-[10px] text-stone-400 font-['DM_Sans'] mt-1">
              {testimonials.length} review{testimonials.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, idx) => (
          <div
            key={t.id}
            className="group relative bg-white rounded-2xl border border-[#f1cf9e] p-6 flex flex-col gap-4 hover:border-[#c48232] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200"
          >
            {/* Top: rating + label */}
            <div className="flex items-center justify-between">
              <StarDisplay rating={t.rating} />
              <span
                className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full font-['DM_Sans']"
                style={{
                  background: "#fff7ed",
                  color: "#f97316",
                  border: "1px solid #fed7aa",
                }}
              >
                {ratingLabel[t.rating] || ""}
              </span>
            </div>

            {/* Quote mark */}
            <div
              className="absolute top-5 right-6 text-6xl leading-none font-serif text-orange-100 select-none pointer-events-none group-hover:text-orange-200 transition-colors duration-200"
              aria-hidden="true"
            >
              "
            </div>

            {/* Comment */}
            <p className="text-sm text-stone-600 leading-relaxed font-['DM_Sans'] flex-1 line-clamp-4">
              {t.comment || "No comment provided."}
            </p>

            {/* Divider */}
            <div className="h-px bg-stone-100" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{
                  background: `hsl(${(idx * 47 + 20) % 360}, 70%, 55%)`,
                }}
              >
                {(t.name || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-800 font-['DM_Sans']">
                  {t.name || "Anonymous"}
                </div>
                <div className="text-[11px] text-stone-400 font-['DM_Sans']">
                  {new Date(t.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}