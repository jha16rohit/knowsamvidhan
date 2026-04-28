"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, List, FileText, AlignLeft, Book,
  CalendarDays, History, GraduationCap, Users, BarChart3,
  Settings, ShieldAlert, BookOpen, Save, Plus, Trash2, Check, Loader2
} from 'lucide-react';

export default function PreamblePage() {
  const navItems = [
    { name: 'Dashboard',  icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts',      icon: List,            active: false, href: '/parts'        },
    { name: 'Articles',   icon: FileText,        active: false, href: '/articles'     },
    { name: 'Clauses',    icon: AlignLeft,       active: false, href: '/clauses'      },
    { name: 'Preamble',   icon: Book,            active: true,  href: '/preamble'     },
    { name: 'Schedules',  icon: CalendarDays,    active: false, href: '/schedules'    },
    { name: 'Amendments', icon: History,         active: false, href: '/amendments'   },
    { name: 'Quizzes',    icon: GraduationCap,   active: false, href: '/quizzes'      },
    { name: 'Users',      icon: Users,           active: false, href: '/users'        },
    { name: 'Analytics',  icon: BarChart3,       active: false, href: '/analytics'    },
    { name: 'Settings',   icon: Settings,        active: false, href: '/settings'     },
  ];

  // ─── State ───────────────────────────────────────────────────────────────
  const [officialText,      setOfficialText]      = useState('');
  const [simpleExplanation, setSimpleExplanation] = useState('');
  const [whyItMatters,      setWhyItMatters]      = useState('');
  const [keywords, setKeywords] = useState<{ word: string; definition: string }[]>([]);

  const [isLoading, setIsLoading]   = useState(true);
  const [isSaving,  setIsSaving]    = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType,    setToastType]    = useState<'success' | 'error'>('success');

  // ─── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/preamble')
      .then((res) => res.json())
      .then((data) => {
        setOfficialText(data.officialText      ?? '');
        setSimpleExplanation(data.simpleExplanation ?? '');
        setWhyItMatters(data.whyItMatters      ?? '');
        // keywords stored as JSON string in DB: "[{word,definition},...]"
        try {
          const parsed = typeof data.keywords === 'string'
            ? JSON.parse(data.keywords)
            : data.keywords ?? [];
          setKeywords(parsed);
        } catch {
          setKeywords([]);
        }
      })
      .catch(() => showToast('Failed to load preamble data.', 'error'))
      .finally(() => setIsLoading(false));
  }, []);

  // ─── Toast helper ─────────────────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ─── Save ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/preamble', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officialText,
          simpleExplanation,
          whyItMatters,
          keywords: JSON.stringify(keywords),
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      showToast('Preamble saved successfully.');
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Keyword helpers ─────────────────────────────────────────────────────
  const updateKeyword = (index: number, field: 'word' | 'definition', value: string) => {
    setKeywords((prev) => prev.map((kw, i) => i === index ? { ...kw, [field]: value } : kw));
  };

  const addKeyword = () => {
    setKeywords((prev) => [...prev, { word: '', definition: '' }]);
  };

  const removeKeyword = (index: number) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[60] bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${toastType === 'error' ? 'bg-red-500' : 'bg-[#1a1a1a]'}`}>
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f18] text-gray-300 flex flex-col flex-shrink-0 min-h-screen">
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-[#1e2638] text-[#f59e0b]'
                  : 'hover:bg-[#1e2638]/50 hover:text-white text-gray-400'
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.active ? 'text-[#f59e0b]' : 'text-gray-500'}`} />
              {item.name}
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
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Preamble content</h2>
              <p className="text-sm text-gray-500">Edit the foundational Preamble page shown to learners.</p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="bg-[#f59e0b] hover:bg-[#ea580c] disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0"
            >
              {isSaving
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Save className="w-5 h-5" />
              }
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </div>

          {/* Loading skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4 animate-pulse">
                  {[8, 5, 4].map((rows) => (
                    <div key={rows} className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-1/4" />
                      <div className="h-4 bg-gray-100 rounded w-full" style={{ height: `${rows * 12}px` }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* ── Left: Text fields ── */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Official text</label>
                  <textarea
                    rows={8}
                    value={officialText}
                    onChange={(e) => setOfficialText(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Simple explanation</label>
                  <textarea
                    rows={5}
                    value={simpleExplanation}
                    onChange={(e) => setSimpleExplanation(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Why it matters</label>
                  <textarea
                    rows={4}
                    value={whyItMatters}
                    onChange={(e) => setWhyItMatters(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  />
                </div>
              </div>

              {/* ── Right: Keywords ── */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-serif font-bold text-gray-900">Keywords</h3>
                  <span className="text-xs text-gray-400 font-medium">{keywords.length} word{keywords.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Header labels */}
                {keywords.length > 0 && (
                  <div className="flex gap-3 mb-2 px-1">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-1/3">Word</span>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase flex-1">Definition</span>
                  </div>
                )}

                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
                  {keywords.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Book className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">No keywords yet. Click "Add keyword" to start.</p>
                    </div>
                  ) : (
                    keywords.map((kw, index) => (
                      <div key={index} className="flex gap-2.5 items-center group">
                        <input
                          type="text"
                          placeholder="Word"
                          value={kw.word}
                          onChange={(e) => updateKeyword(index, 'word', e.target.value)}
                          className="w-1/3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                        />
                        <input
                          type="text"
                          placeholder="Definition"
                          value={kw.definition}
                          onChange={(e) => updateKeyword(index, 'definition', e.target.value)}
                          className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-600 shadow-sm"
                        />
                        <button
                          onClick={() => removeKeyword(index)}
                          className="p-1.5 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                          aria-label="Remove keyword"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <button
                  onClick={addKeyword}
                  className="w-full mt-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add keyword
                </button>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}