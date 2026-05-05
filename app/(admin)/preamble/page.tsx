"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";

import {
  Save,
  Plus,
  Trash2,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Keyword {
  word: string;
  meaning: string;
  icon: string;
}

interface Timeline {
  year: string;
  event: string;
}

interface QuickFact {
  label: string;
  value: string;
}

interface LandmarkCase {
  year: string;
  name: string;
  description: string;
}

interface Note {
  type: "amendment" | "did-you-know";
  text: string;
}

function Section({
  title,
  subtitle,
  children,
  defaultOpen = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
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

          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5 mt-4 first:mt-0">
      {children}
    </label>
  );
}

function TextArea({
  rows = 4,
  value,
  onChange,
  placeholder,
}: {
  rows?: number;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
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
      <Plus className="w-4 h-4" />
      {label}
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

export default function AdminPreamblePage() {
  const [officialText, setOfficialText] = useState("");

  const [simpleExplanation, setSimpleExplanation] = useState("");

  const [whyItMatters, setWhyItMatters] = useState("");

  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const [timeline, setTimeline] = useState<Timeline[]>([]);

  const [quickFacts, setQuickFacts] = useState<QuickFact[]>([]);

  const [landmarkCases, setLandmarkCases] = useState<LandmarkCase[]>([]);

  const [notes, setNotes] = useState<Note[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const parse = <T,>(raw: unknown, fallback: T): T => {
    if (!raw) return fallback;

    if (typeof raw !== "string") {
      return raw as T;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    fetch("/api/admin/preamble")
      .then((r) => r.json())
      .then((d) => {
        setOfficialText(d.officialText ?? "");
        setSimpleExplanation(d.simpleExplanation ?? "");
        setWhyItMatters(d.whyItMatters ?? "");

        setKeywords(parse(d.keywords, []));

        setTimeline(parse(d.timeline, []));

        setQuickFacts(parse(d.quickFacts, []));

        setLandmarkCases(parse(d.landmarkCases, []));

        setNotes(parse(d.notes, []));
      })
      .catch(() => showToast("Failed to load preamble data.", "error"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/preamble", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          officialText,
          simpleExplanation,
          whyItMatters,
          keywords: JSON.stringify(keywords),
          timeline: JSON.stringify(timeline),
          quickFacts: JSON.stringify(quickFacts),
          landmarkCases: JSON.stringify(landmarkCases),
          notes: JSON.stringify(notes),
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      showToast("Preamble saved successfully.");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateKw = (i: number, f: keyof Keyword, v: string) =>
    setKeywords((p) => p.map((k, idx) => (idx === i ? { ...k, [f]: v } : k)));

  const addKw = () =>
    setKeywords((p) => [
      ...p,
      {
        word: "",
        meaning: "",
        icon: "◆",
      },
    ]);

  const removeKw = (i: number) =>
    setKeywords((p) => p.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans relative">
      <AdminSidebar />

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === "error" ? "bg-red-500" : "bg-[#1a1a1a]"
            }`}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>

          <span className="text-sm font-bold text-gray-900">{toast.msg}</span>
        </div>
      )}

      <main className="ml-80 min-h-screen overflow-y-auto">
        <div className="p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">
                Content
              </p>

              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">
                Preamble Content
              </h2>

              <p className="text-sm text-gray-500">
                Edit all sections of the Preamble page.
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="bg-[#f59e0b] hover:bg-[#ea580c] disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}

              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-100 rounded w-1/4 mb-4" />

                  <div className="h-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Section
                title="Official Text"
                subtitle="The constitutional preamble text"
              >
                <Label>Official Text</Label>

                <TextArea
                  rows={6}
                  value={officialText}
                  onChange={setOfficialText}
                  placeholder="WE, THE PEOPLE OF INDIA..."
                />

                <Label>Simple Explanation</Label>

                <TextArea
                  rows={4}
                  value={simpleExplanation}
                  onChange={setSimpleExplanation}
                  placeholder="The Preamble is the opening statement..."
                />

                <Label>Why It Matters</Label>

                <TextArea
                  rows={3}
                  value={whyItMatters}
                  onChange={setWhyItMatters}
                  placeholder="The Preamble sets the tone..."
                />
              </Section>

              <Section
                title="Key Terms"
                subtitle="Keyword cards shown to learners"
              >
                <div className="space-y-2">
                  {keywords.map((kw, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-2 items-center"
                    >
                      <Input
                        className="col-span-2"
                        value={kw.icon}
                        onChange={(v) => updateKw(i, "icon", v)}
                        placeholder="◆"
                      />

                      <Input
                        className="col-span-3"
                        value={kw.word}
                        onChange={(v) => updateKw(i, "word", v)}
                        placeholder="Word"
                      />

                      <Input
                        className="col-span-6"
                        value={kw.meaning}
                        onChange={(v) => updateKw(i, "meaning", v)}
                        placeholder="Definition..."
                      />

                      <div className="col-span-1 flex justify-center">
                        <RemoveBtn onClick={() => removeKw(i)} />
                      </div>
                    </div>
                  ))}
                </div>

                <AddButton onClick={addKw} label="Add Keyword" />
              </Section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
