"use client";

import { useEffect, useState, useCallback } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  MessageSquare,
  Eye,
  Star,
  RotateCcw,
  Search,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  ChevronDown,
  Globe,
  EyeOff,
} from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  showOnSite: boolean;
}

const ratingLabel: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

const ratingConfig: Record<number, { text: string; bg: string; border: string }> = {
  1: { text: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  2: { text: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  3: { text: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
  4: { text: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
  5: { text: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={rating >= star ? "#f97316" : "none"}
          stroke={rating >= star ? "#f97316" : "#e5d5c0"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

type FilterType = "all" | "shown";
type SortType = "newest" | "oldest" | "highest" | "lowest";

const avatarHues = [16, 38, 200, 142, 260, 330, 190, 56];

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [search, setSearch] = useState("");

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback", { credentials: "include" });
      if (!res.ok) throw new Error("Unauthorized or server error");
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Toggle showOnSite: true = visible on site, false = not visible
  const handleToggle = async (id: string, currentValue: boolean) => {
  setToggling(id);
  const newValue = !currentValue;

  try {
    const res = await fetch(`/api/admin/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ showOnSite: newValue }),
    });

    const data = await res.json();
    console.log("PATCH RESPONSE:", data); // 🔍 debug

    if (!res.ok) {
      throw new Error(data.error || "Failed to update");
    }

    // ✅ Always sync with DB instead of guessing
    await fetchFeedbacks();

  } catch (error) {
    console.error("Toggle error:", error);
    // fallback reload
    await fetchFeedbacks();
  } finally {
    setToggling(null);
  }
};

  const handleDeleteAll = async () => {
    const hiddenIds = feedbacks.filter((f) => !f.showOnSite).map((f) => f.id);
    if (hiddenIds.length === 0) return;
    if (!confirm(`Delete ${hiddenIds.length} not-shown feedback entries? This cannot be undone.`)) return;
    try {
      await fetch("/api/admin/feedback/hidden", {
        method: "DELETE",
        credentials: "include",
      });
      setFeedbacks((prev) => prev.filter((f) => f.showOnSite));
    } catch {
      // silently fail
    }
  };

  const processed = feedbacks
    .filter((f) => {
      if (filter === "shown") return f.showOnSite;
      return true;
    })
    .filter((f) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (f.name || "").toLowerCase().includes(q) ||
        (f.comment || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return 0;
    });

  const totalShown = feedbacks.filter((f) => f.showOnSite).length;
  const totalNotShown = feedbacks.filter((f) => !f.showOnSite).length;
  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
      : "—";

  const stats = [
    { label: "Total Reviews", value: feedbacks.length.toString(), icon: <MessageSquare size={15} strokeWidth={2} />, color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
    { label: "Shown on Site", value: totalShown.toString(), icon: <Globe size={15} strokeWidth={2} />, color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
    { label: "Not Shown", value: totalNotShown.toString(), icon: <EyeOff size={15} strokeWidth={2} />, color: "#64748b", bg: "#f8fafc", border: "#e2e8f0" },
    { label: "Avg Rating", value: avgRating, icon: <Star size={15} strokeWidth={2} />, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  ];

  return (
    <div className="min-h-screen font-sans relative" style={{ background: "linear-gradient(135deg, #faf7f2 0%, #f5efe6 50%, #faf7f2 100%)" }}>
      <AdminSidebar />

      <main className="ml-80 min-h-screen">
        {/* Sticky Header */}
        <header
          className="sticky top-0 z-30 border-b"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(245,215,175,0.4)",
            boxShadow: "0 1px 0 rgba(245,215,175,0.3), 0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <div className="px-10 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
              >
                <MessageSquare size={14} stroke="white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900 tracking-tight leading-none" style={{ fontFamily: "'Georgia', serif" }}>
                  Feedback Manager
                </p>
                <p className="text-[10px] text-stone-400 font-medium mt-0.5">KnowSamvidhan · Admin</p>
              </div>
            </div>
            <button
              onClick={fetchFeedbacks}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#ea580c",
              }}
            >
              <RotateCcw size={12} strokeWidth={2.5} />
              Refresh
            </button>
          </div>
        </header>

        <div className="px-10 py-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-6 py-5 flex items-center gap-4 transition-all"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(245,215,175,0.5)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 leading-none" style={{ fontFamily: "'Georgia', serif" }}>
                    {s.value}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div
            className="rounded-2xl px-5 py-4 mb-6 flex flex-wrap items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(245,215,175,0.5)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Search */}
            <div
              className="flex items-center gap-2 flex-1 min-w-[220px] rounded-xl px-3.5 py-2.5"
              style={{ background: "rgba(248,244,238,0.8)", border: "1px solid rgba(235,220,195,0.6)" }}
            >
              <Search size={13} stroke="#9ca3af" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search by name or comment…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-stone-700 placeholder-stone-400 w-full"
              />
            </div>

            {/* Filter tabs — only "All" and "Shown on Site" */}
            <div
              className="flex items-center gap-1 rounded-xl p-1"
              style={{ background: "rgba(248,244,238,0.8)", border: "1px solid rgba(235,220,195,0.6)" }}
            >
              {([
                { key: "all", label: "All" },
                { key: "shown", label: "Shown on Site" },
              ] as { key: FilterType; label: string }[]).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
                  style={
                    filter === f.key
                      ? { background: "white", color: "#ea580c", border: "1px solid rgba(235,220,195,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }
                      : { color: "#9ca3af" }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="appearance-none rounded-xl pl-3 pr-8 py-2.5 text-xs font-bold text-stone-600 outline-none cursor-pointer transition-colors"
                style={{ background: "rgba(248,244,238,0.8)", border: "1px solid rgba(235,220,195,0.6)" }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>

            {/* Bulk actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => {
                  feedbacks
                    .filter((f) => !f.showOnSite)
                    .forEach((f) => handleToggle(f.id, false));
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{ color: "#059669", background: "rgba(236,253,245,0.8)", border: "1px solid #a7f3d0" }}
              >
                <CheckCircle2 size={13} strokeWidth={2} />
                Show All on Site
              </button>
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{ color: "#dc2626", background: "rgba(254,242,242,0.8)", border: "1px solid #fecaca" }}
              >
                <Trash2 size={13} strokeWidth={2} />
                Delete Not-Shown
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 animate-pulse"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(245,215,175,0.4)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-stone-100" />
                    <div className="flex-1">
                      <div className="h-3 w-24 bg-stone-100 rounded-full mb-2" />
                      <div className="h-2.5 w-16 bg-stone-50 rounded-full" />
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-stone-50 rounded-full mb-2" />
                  <div className="h-2.5 w-3/4 bg-stone-50 rounded-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ background: "rgba(254,242,242,0.7)", border: "1px solid #fecaca" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
                <AlertTriangle size={20} stroke="#dc2626" strokeWidth={2} />
              </div>
              <div className="text-sm font-bold text-red-700 mb-2">{error}</div>
              <button onClick={fetchFeedbacks} className="text-xs text-red-500 underline">Try again</button>
            </div>
          ) : processed.length === 0 ? (
            <div
              className="rounded-2xl p-20 text-center"
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(245,215,175,0.4)" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(248,244,238,0.8)", border: "1px solid rgba(235,220,195,0.5)" }}>
                <Inbox size={22} stroke="#9ca3af" strokeWidth={1.5} />
              </div>
              <div className="text-base font-bold text-stone-700 mb-1" style={{ fontFamily: "'Georgia', serif" }}>No feedback found</div>
              <div className="text-sm text-stone-400">
                {search ? "Try a different search term." : "No entries match this filter."}
              </div>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400 mb-4">
                Showing {processed.length} of {feedbacks.length} entries
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {processed.map((f, idx) => {
                  const rc = ratingConfig[f.rating] || ratingConfig[3];
                  const hue = avatarHues[idx % avatarHues.length];
                  return (
                    <div
                      key={f.id}
                      className="rounded-2xl flex flex-col gap-4 p-6 transition-all duration-200"
                      style={{
                        background: f.showOnSite
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.45)",
                        backdropFilter: "blur(12px)",
                        border: f.showOnSite
                          ? "1px solid rgba(245,215,175,0.6)"
                          : "1px dashed rgba(200,190,175,0.5)",
                        boxShadow: f.showOnSite
                          ? "0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)"
                          : "none",
                        opacity: f.showOnSite ? 1 : 0.6,
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
                            style={{ background: `hsl(${hue}, 60%, 52%)` }}
                          >
                            {(f.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-stone-900 truncate leading-tight">
                              {f.name || "Anonymous"}
                            </div>
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              {new Date(f.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Status pill */}
                        <div
                          className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                          style={
                            f.showOnSite
                              ? { background: "rgba(236,253,245,0.9)", color: "#059669", border: "1px solid #a7f3d0" }
                              : { background: "rgba(248,244,238,0.9)", color: "#9ca3af", border: "1px solid rgba(220,210,195,0.6)" }
                          }
                        >
                          {f.showOnSite ? (
                            <><Globe size={9} strokeWidth={2} /> LIVE</>
                          ) : (
                            <><EyeOff size={9} strokeWidth={2} /> NOT SHOWN</>
                          )}
                        </div>
                      </div>

                      {/* Rating badge */}
                      <div className="flex items-center gap-2">
                        <StarDisplay rating={f.rating} />
                        <span
                          className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                          style={{ color: rc.text, background: rc.bg, border: `1px solid ${rc.border}` }}
                        >
                          {ratingLabel[f.rating] || ""}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-stone-500 leading-relaxed flex-1 line-clamp-3">
                        {f.comment || <span className="italic text-stone-300">No comment provided.</span>}
                      </p>

                      {/* Footer */}
                      <div
                        className="flex items-center justify-between pt-3"
                        style={{ borderTop: "1px solid rgba(240,230,215,0.6)" }}
                      >
                        <span className="text-[10px] text-stone-300 font-mono">
                          #{f.id.slice(0, 8)}
                        </span>

                        {/* THE KEY BUTTON: "Show on Site" if not shown, "Remove from Site" if shown */}
                        <button
                          onClick={() => handleToggle(f.id, f.showOnSite)}
                          disabled={toggling === f.id}
                          className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-40"
                          style={
                            f.showOnSite
                              ? { color: "#64748b", background: "rgba(248,244,238,0.8)", border: "1px solid rgba(220,210,195,0.6)" }
                              : { color: "#ea580c", background: "rgba(255,247,237,0.9)", border: "1px solid #fed7aa" }
                          }
                        >
                          {toggling === f.id ? (
                            "…"
                          ) : f.showOnSite ? (
                            <><EyeOff size={11} strokeWidth={2} /> Remove from Site</>
                          ) : (
                            <><Globe size={11} strokeWidth={2} /> Show on Site</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}