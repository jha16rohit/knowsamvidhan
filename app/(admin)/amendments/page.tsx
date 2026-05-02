"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, List, FileText, AlignLeft, Book,
  CalendarDays, History, GraduationCap, Users, BarChart3,
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check, Loader2,
  BookMarked, Lightbulb, Bell, ShieldCheck,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Amendment {
  id: string;
  number: string;
  year: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relatedArticles: string;
}

interface FormData {
  number: string;
  year: string;
  title: string;
  summary: string;
  whyItMatters: string;
  relatedArticles: string;
}

interface NavItem {
  name: string;
  icon: React.ElementType;
  active: boolean;
  href: string;
  badge?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPTY_FORM: FormData = {
  number: '', year: '', title: '', summary: '', whyItMatters: '', relatedArticles: '',
};

const API = '/api/admin/amendments';

// ─── Component ────────────────────────────────────────────────────────────────

export default function AmendmentsPage() {
  // Simulated open alerts count for the prototype
  const openCount = 4;

  const navItems: NavItem[] = [
    { name: 'Dashboard',     icon: LayoutDashboard, active: false, href: '/ad-dashboard'  },
    { name: 'Parts',         icon: List,            active: false, href: '/parts'         },
    { name: 'Articles',      icon: FileText,        active: false, href: '/articles'      },
    { name: 'Clauses',       icon: AlignLeft,       active: false, href: '/clauses'       },
    { name: 'Preamble',      icon: Book,            active: false, href: '/preamble'      },
    { name: 'Schedules',     icon: CalendarDays,    active: false, href: '/schedules'     },
    { name: 'Amendments',    icon: History,         active: true,  href: '/amendments'    },
    { name: 'Quizzes',       icon: GraduationCap,   active: false, href: '/quizzes'       },
    { name: 'Users',         icon: Users,           active: false, href: '/users'         },
    { name: 'Analytics',     icon: BarChart3,       active: false, href: '/analytics'     },
    { name: 'Alerts',        icon: Bell,            active: false, href: '/alerts', badge: openCount },
    { name: 'Activity Logs', icon: ShieldCheck,     active: false, href: '/activity-logs' },
    { name: 'Settings',      icon: Settings,        active: false, href: '/settings'      },
  ];

  // ─── State ──────────────────────────────────────────────────────────────────

  const [amendments,   setAmendments]   = useState<Amendment[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [editingId,    setEditingId]    = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Amendment | null>(null);
  const [toast,        setToast]        = useState<string | null>(null);
  const [formData,     setFormData]     = useState<FormData>(EMPTY_FORM);

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchAmendments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setAmendments(data.amendments);
    } catch (err) {
      showToast('Error loading amendments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAmendments(); }, [fetchAmendments]);

  // ─── Toast ───────────────────────────────────────────────────────────────────

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Modal helpers ───────────────────────────────────────────────────────────

  const openCreateModal = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (a: Amendment) => {
    setFormData({
      number:          a.number,
      year:            a.year,
      title:           a.title,
      summary:         a.summary,
      whyItMatters:    a.whyItMatters,
      relatedArticles: a.relatedArticles,
    });
    setEditingId(a.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // ─── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        const res = await fetch(`${API}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Update failed');
        setAmendments((prev) => prev.map((a) => (a.id === editingId ? data.amendment : a)));
        showToast(`Updated ${data.amendment.number} Amendment`);
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Create failed');
        setAmendments((prev) => [data.amendment, ...prev]);
        showToast(`Created ${data.amendment.number} Amendment`);
      }
      closeModal();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  // ─── Delete ──────────────────────────────────────────────────────────────────

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API}/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setAmendments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      showToast(`Deleted ${deleteTarget.number} Amendment`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-60 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toast}</span>
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
                  ? 'bg-[#1e2638] text-[#f59e0b]'
                  : 'hover:bg-[#1e2638]/50 hover:text-white text-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-[#f59e0b]' : 'text-gray-500'}`} />
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
            You&apos;re managing live content.<br />Edit with care.
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
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage Amendments</h2>
              <p className="text-sm text-gray-500">Curate the timeline of constitutional amendments.</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New Amendment
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-3" />
              <span className="text-sm">Loading amendments…</span>
            </div>
          ) : amendments.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <History className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No amendments yet</h3>
              <p className="text-sm text-gray-500">Click &quot;New Amendment&quot; to create one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {amendments.map((amendment) => (
                <div
                  key={amendment.id}
                  /* ↓ overflow-hidden + min-w-0 prevent any child from blowing out the card */
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:border-gray-300 transition-colors overflow-hidden min-w-0"
                >
                  {/* Top row — year badge + actions */}
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider shrink-0">
                      {amendment.year}
                    </span>
                    <div className="flex items-center gap-4 shrink-0">
                      <button
                        onClick={() => openEditModal(amendment)}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(amendment)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title + summary */}
                  <div className="min-w-0">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 wrap-break-words">
                      {amendment.number} — {amendment.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed wrap-break-words">{amendment.summary}</p>
                  </div>

                  {/* Why it matters */}
                  {amendment.whyItMatters && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 min-w-0">
                      <Lightbulb className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-widest text-[#f59e0b] uppercase mb-1">Why it matters</p>
                        <p className="text-sm text-amber-900 leading-relaxed wrap-break-words">{amendment.whyItMatters}</p>
                      </div>
                    </div>
                  )}

                  {/* Related articles */}
                  {amendment.relatedArticles && (
                    <div className="flex gap-3 items-start min-w-0">
                      <BookMarked className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">Related Articles</p>
                        <div className="flex flex-wrap gap-1.5">
                          {amendment.relatedArticles.split(',').map((a, i) => (
                            <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold tracking-wide break-all">
                              {a.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">

            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId ? 'Edit Amendment' : 'New Amendment'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId ? 'Update amendment details.' : 'Add a new amendment to the timeline.'}
                </p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <form id="amendment-form" onSubmit={handleSave} className="space-y-5">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 42nd"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Year</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1976"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The 'Mini-Constitution'"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Summary</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description of this amendment."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Why it matters</label>
                  <textarea
                    rows={3}
                    placeholder="Why is this amendment significant?"
                    value={formData.whyItMatters}
                    onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Related articles</label>
                  <input
                    type="text"
                    placeholder="Comma-separated, e.g. article-21, article-19"
                    value={formData.relatedArticles}
                    onChange={(e) => setFormData({ ...formData, relatedArticles: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="amendment-form"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? 'Save Changes' : 'Create Amendment'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Amendment?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-2">
              You&apos;re about to delete{' '}
              <span className="font-semibold text-gray-800 wrap-break-words">
                {deleteTarget.number} — {deleteTarget.title}
              </span>.
            </p>
            <p className="text-[13px] text-gray-400 mb-8">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e11d48] hover:bg-[#be123c] transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}