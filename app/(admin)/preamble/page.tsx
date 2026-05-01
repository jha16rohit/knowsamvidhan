"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, List, FileText, AlignLeft, Book,
  CalendarDays, History, GraduationCap, Users, BarChart3,
  Settings, ShieldAlert, BookOpen, Save, Plus, Trash2,
  Check, Loader2, Bell, ShieldCheck, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  name: string;
  icon: React.ElementType;
  active: boolean;
  href: string;
  badge?: number;
}

interface Keyword      { word: string; meaning: string; icon: string }
interface Timeline     { year: string; event: string }
interface QuickFact    { label: string; value: string }
interface LandmarkCase { year: string; name: string; description: string }
interface Note         { type: "amendment" | "did-you-know"; text: string }

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { name: "Dashboard",     icon: LayoutDashboard, active: false, href: "/ad-dashboard"  },
  { name: "Parts",         icon: List,            active: false, href: "/parts"         },
  { name: "Articles",      icon: FileText,        active: false, href: "/articles"      },
  { name: "Clauses",       icon: AlignLeft,       active: false, href: "/clauses"       },
  { name: "Preamble",      icon: Book,            active: true,  href: "/preamble"      },
  { name: "Schedules",     icon: CalendarDays,    active: false, href: "/schedules"     },
  { name: "Amendments",    icon: History,         active: false, href: "/amendments"    },
  { name: "Quizzes",       icon: GraduationCap,   active: false, href: "/quizzes"       },
  { name: "Users",         icon: Users,           active: false, href: "/users"         },
  { name: "Analytics",     icon: BarChart3,       active: false, href: "/analytics"     },
  { name: "Alerts",        icon: Bell,            active: false, href: "/alerts", badge: 0 },
  { name: "Activity Logs", icon: ShieldCheck,     active: false, href: "/activity-logs" },
  { name: "Settings",      icon: Settings,        active: false, href: "/settings"      },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  title, subtitle, children, defaultOpen = true,
}: {
  title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <p className="font-semibold text-gray-900 text-sm">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-700 mb-1.5 mt-4 first:mt-0">{children}</label>;
}

function TextArea({
  rows = 4, value, onChange, placeholder,
}: {
  rows?: number; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
    />
  );
}

function Input({
  value, onChange, placeholder, className = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm ${className}`}
    />
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center gap-2"
    >
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPreamblePage() {

  const [officialText,      setOfficialText]      = useState("");
  const [simpleExplanation, setSimpleExplanation] = useState("");
  const [whyItMatters,      setWhyItMatters]      = useState("");
  const [keywords,          setKeywords]          = useState<Keyword[]>([]);
  const [timeline,          setTimeline]          = useState<Timeline[]>([]);
  const [quickFacts,        setQuickFacts]        = useState<QuickFact[]>([]);
  const [landmarkCases,     setLandmarkCases]     = useState<LandmarkCase[]>([]);
  const [notes,             setNotes]             = useState<Note[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving,  setIsSaving]  = useState(false);
  const [toast,     setToast]     = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const parse = <T,>(raw: unknown, fallback: T): T => {
    if (!raw) return fallback;
    if (typeof raw !== "string") return raw as T;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch("/api/admin/preamble")
      .then((r) => r.json())
      .then((d) => {
        setOfficialText(d.officialText           ?? "");
        setSimpleExplanation(d.simpleExplanation ?? "");
        setWhyItMatters(d.whyItMatters           ?? "");
        setKeywords(parse(d.keywords,      []));
        setTimeline(parse(d.timeline,      []));
        setQuickFacts(parse(d.quickFacts,  []));
        setLandmarkCases(parse(d.landmarkCases, []));
        setNotes(parse(d.notes,            []));
      })
      .catch(() => showToast("Failed to load preamble data.", "error"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/preamble", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          officialText,
          simpleExplanation,
          whyItMatters,
          keywords:      JSON.stringify(keywords),
          timeline:      JSON.stringify(timeline),
          quickFacts:    JSON.stringify(quickFacts),
          landmarkCases: JSON.stringify(landmarkCases),
          notes:         JSON.stringify(notes),
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Preamble saved successfully.");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // ── keyword helpers ──
  const updateKw   = (i: number, f: keyof Keyword, v: string) =>
    setKeywords((p) => p.map((k, idx) => idx === i ? { ...k, [f]: v } : k));
  const addKw    = () => setKeywords((p) => [...p, { word: "", meaning: "", icon: "◆" }]);
  const removeKw = (i: number) => setKeywords((p) => p.filter((_, idx) => idx !== i));

  // ── timeline helpers ──
  const updateTl   = (i: number, f: keyof Timeline, v: string) =>
    setTimeline((p) => p.map((t, idx) => idx === i ? { ...t, [f]: v } : t));
  const addTl    = () => setTimeline((p) => [...p, { year: "", event: "" }]);
  const removeTl = (i: number) => setTimeline((p) => p.filter((_, idx) => idx !== i));

  // ── quickFact helpers ──
  const updateQf   = (i: number, f: keyof QuickFact, v: string) =>
    setQuickFacts((p) => p.map((q, idx) => idx === i ? { ...q, [f]: v } : q));
  const addQf    = () => setQuickFacts((p) => [...p, { label: "", value: "" }]);
  const removeQf = (i: number) => setQuickFacts((p) => p.filter((_, idx) => idx !== i));

  // ── landmark case helpers ──
  const updateLc = (i: number, f: keyof LandmarkCase, v: string) =>
    setLandmarkCases((p) => p.map((lc, idx) => idx === i ? { ...lc, [f]: v } : lc));
  const addLc    = () => setLandmarkCases((p) => [...p, { year: "", name: "", description: "" }]);
  const removeLc = (i: number) => setLandmarkCases((p) => p.filter((_, idx) => idx !== i));

  // ── notes helpers ──
  const updateNote       = (i: number, f: keyof Note, v: string) =>
    setNotes((p) => p.map((n, idx) => idx === i ? { ...n, [f]: v } : n));
  const addAmendmentNote = () => setNotes((p) => [...p, { type: "amendment",    text: "" }]);
  const addDidYouKnow    = () => setNotes((p) => [...p, { type: "did-you-know", text: "" }]);
  const removeNote       = (i: number) => setNotes((p) => p.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${toast.type === "error" ? "bg-red-500" : "bg-[#1a1a1a]"}`}>
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toast.msg}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f18] text-gray-300 flex flex-col shrink-0 min-h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#c19d60] rounded-full flex items-center justify-center">
            <BookOpen className="text-[#c19d60] w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm tracking-wide">KnowSamvidhan</h1>
            <p className="text-[6px] tracking-[0.25em] text-gray-400 mt-0.5">CONSTITUTION · LEARN · MASTER</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#1e2638] text-[#f59e0b]"
                  : "hover:bg-[#1e2638]/50 hover:text-white text-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? "text-[#f59e0b]" : "text-gray-500"}`} />
                {item.name}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-[#ef4444] text-white flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 min-w-5 h-5">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 m-4 bg-[#141b2d] rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-[10px] font-bold tracking-wider uppercase">Admin</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">
            You're managing live content.<br />Edit with care.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Preamble Content</h2>
              <p className="text-sm text-gray-500">Edit all sections of the Preamble page shown to learners.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="bg-[#f59e0b] hover:bg-[#ea580c] disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-1/4 mb-4" />
                  <div className="h-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">

              {/* ── 1. Official Text ── */}
              <Section title="Official Text" subtitle="The full constitutional text of the Preamble">
                <Label>Official Text</Label>
                <TextArea rows={6} value={officialText} onChange={setOfficialText}
                  placeholder="WE, THE PEOPLE OF INDIA…" />
                <Label>Simple Explanation (Plain English)</Label>
                <TextArea rows={4} value={simpleExplanation} onChange={setSimpleExplanation}
                  placeholder="The Preamble is the opening statement…" />
                <Label>Why It Matters</Label>
                <TextArea rows={3} value={whyItMatters} onChange={setWhyItMatters}
                  placeholder="The Preamble sets the tone…" />
              </Section>

              {/* ── 2. Keywords ── */}
              <Section title="Key Terms" subtitle="Words shown in the keyword cards on the user page">
                {keywords.length > 0 && (
                  <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                    <span className="col-span-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Icon</span>
                    <span className="col-span-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Word</span>
                    <span className="col-span-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Meaning</span>
                  </div>
                )}
                <div className="space-y-2">
                  {keywords.map((kw, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center group">
                      <Input className="col-span-2" value={kw.icon}    onChange={(v) => updateKw(i, "icon",    v)} placeholder="◆" />
                      <Input className="col-span-3" value={kw.word}    onChange={(v) => updateKw(i, "word",    v)} placeholder="Word" />
                      <Input className="col-span-6" value={kw.meaning} onChange={(v) => updateKw(i, "meaning", v)} placeholder="Definition…" />
                      <div className="col-span-1 flex justify-center">
                        <RemoveBtn onClick={() => removeKw(i)} />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addKw} label="Add keyword" />
              </Section>

              {/* ── 3. Timeline ── */}
              <Section title="Historical Timeline" subtitle="Events shown in the timeline section">
                {timeline.length > 0 && (
                  <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                    <span className="col-span-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Year</span>
                    <span className="col-span-9 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Event</span>
                  </div>
                )}
                <div className="space-y-2">
                  {timeline.map((t, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center group">
                      <Input className="col-span-2" value={t.year}  onChange={(v) => updateTl(i, "year",  v)} placeholder="1949" />
                      <Input className="col-span-9" value={t.event} onChange={(v) => updateTl(i, "event", v)} placeholder="Event description…" />
                      <div className="col-span-1 flex justify-center">
                        <RemoveBtn onClick={() => removeTl(i)} />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addTl} label="Add timeline event" />
              </Section>

              {/* ── 4. Quick Facts ── */}
              <Section title="Quick Facts" subtitle="Shown in the right sidebar on the user page">
                {quickFacts.length > 0 && (
                  <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                    <span className="col-span-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Label</span>
                    <span className="col-span-7 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Value</span>
                  </div>
                )}
                <div className="space-y-2">
                  {quickFacts.map((qf, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center group">
                      <Input className="col-span-4" value={qf.label} onChange={(v) => updateQf(i, "label", v)} placeholder="Adopted" />
                      <Input className="col-span-7" value={qf.value} onChange={(v) => updateQf(i, "value", v)} placeholder="26 Nov 1949" />
                      <div className="col-span-1 flex justify-center">
                        <RemoveBtn onClick={() => removeQf(i)} />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addQf} label="Add quick fact" />
              </Section>

              {/* ── 5. Landmark Cases (multiple) ── */}
              <Section title="Landmark Cases" subtitle="Add as many cases as needed — shown in the right sidebar">
                <div className="space-y-4">
                  {landmarkCases.map((lc, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 relative group">
                      <div className="absolute top-3 right-3">
                        <RemoveBtn onClick={() => removeLc(i)} />
                      </div>
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-3">
                          <Label>Year</Label>
                          <Input className="w-full" value={lc.year}
                            onChange={(v) => updateLc(i, "year", v)} placeholder="1973" />
                        </div>
                        <div className="col-span-8">
                          <Label>Case Name</Label>
                          <Input className="w-full" value={lc.name}
                            onChange={(v) => updateLc(i, "name", v)} placeholder="Kesavananda Bharati" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <Label>Description</Label>
                        <TextArea rows={2} value={lc.description}
                          onChange={(v) => updateLc(i, "description", v)}
                          placeholder="The Supreme Court held that…" />
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton onClick={addLc} label="Add landmark case" />
              </Section>

              {/* ── 6. Notes (Amendment + Did You Know) ── */}
              <Section
                title="Notes & Did You Know"
                subtitle="Add amendment notes and trivia — both shown in the right sidebar"
              >
                {notes.length > 0 && (
                  <div className="space-y-3 mb-2">
                    {notes.map((note, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 relative group">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Type badge + toggle */}
                          <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-semibold">
                            <button
                              onClick={() => updateNote(i, "type", "amendment")}
                              className={`px-3 py-1.5 transition-colors ${
                                note.type === "amendment"
                                  ? "bg-amber-400 text-amber-900"
                                  : "bg-white text-gray-400 hover:bg-gray-50"
                              }`}
                            >
                              Amendment Note
                            </button>
                            <button
                              onClick={() => updateNote(i, "type", "did-you-know")}
                              className={`px-3 py-1.5 transition-colors ${
                                note.type === "did-you-know"
                                  ? "bg-[#c48232] text-white"
                                  : "bg-white text-gray-400 hover:bg-gray-50"
                              }`}
                            >
                              Did You Know
                            </button>
                          </div>
                          <div className="ml-auto">
                            <RemoveBtn onClick={() => removeNote(i)} />
                          </div>
                        </div>
                        <TextArea
                          rows={2}
                          value={note.text}
                          onChange={(v) => updateNote(i, "text", v)}
                          placeholder={
                            note.type === "amendment"
                              ? "The words Socialist, Secular and Integrity were inserted by…"
                              : "The Preamble was the very last part of the Constitution to be finalised…"
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={addAmendmentNote}
                    className="flex-1 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Amendment Note
                  </button>
                  <button
                    onClick={addDidYouKnow}
                    className="flex-1 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Did You Know
                  </button>
                </div>
              </Section>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}