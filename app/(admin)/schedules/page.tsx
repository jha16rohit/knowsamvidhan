"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, List, FileText, AlignLeft, Book,
  CalendarDays, History, GraduationCap, Users, BarChart3,
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check, Loader2,
  Bell, ShieldCheck,
} from 'lucide-react';

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

interface FormData {
  shortId: string;
  schedule: string;
  slug: string;
  title: string;
  description: string;
  topicsStr: string;
  tagDetails: TagDetail[];
}

const EMPTY_FORM: FormData = {
  shortId: '', schedule: '', slug: '', title: '',
  description: '', topicsStr: '', tagDetails: [],
};

const API = '/api/admin/schedules';

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function SchedulesPage() {
  const openCount = 4;

  const navItems = [
    { name: 'Dashboard',     icon: LayoutDashboard, active: false, href: '/ad-dashboard'  },
    { name: 'Parts',         icon: List,            active: false, href: '/parts'         },
    { name: 'Articles',      icon: FileText,        active: false, href: '/articles'      },
    { name: 'Clauses',       icon: AlignLeft,       active: false, href: '/clauses'       },
    { name: 'Preamble',      icon: Book,            active: false, href: '/preamble'      },
    { name: 'Schedules',     icon: CalendarDays,    active: true,  href: '/schedules'     },
    { name: 'Amendments',    icon: History,         active: false, href: '/amendments'    },
    { name: 'Quizzes',       icon: GraduationCap,   active: false, href: '/quizzes'       },
    { name: 'Users',         icon: Users,           active: false, href: '/users'         },
    { name: 'Analytics',     icon: BarChart3,       active: false, href: '/analytics'     },
    { name: 'Alerts',        icon: Bell,            active: false, href: '/alerts', badge: openCount },
    { name: 'Activity Logs', icon: ShieldCheck,     active: false, href: '/activity-logs' },
    { name: 'Settings',      icon: Settings,        active: false, href: '/settings'      },
  ];

  const [schedules,    setSchedules]    = useState<Schedule[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [editingId,    setEditingId]    = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Schedule | null>(null);
  const [toast,        setToast]        = useState<string | null>(null);
  const [formData,     setFormData]     = useState<FormData>(EMPTY_FORM);
  const [activeTab,    setActiveTab]    = useState<'basic' | 'topics'>('basic');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setSchedules(data.schedules);
    } catch (err) {
      showToast('Error loading schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSchedules(); }, [fetchSchedules]);

  const openCreateModal = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const openEditModal = (sched: Schedule) => {
    setFormData({
      shortId:     sched.shortId,
      schedule:    sched.schedule,
      slug:        sched.slug,
      title:       sched.title,
      description: sched.description,
      topicsStr:   sched.topics.join(', '),
      tagDetails:  sched.tagDetails,
    });
    setEditingId(sched.id);
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // TagDetails helpers
  const addTagDetail = () =>
    setFormData((f) => ({ ...f, tagDetails: [...f.tagDetails, { tag: '', detail: '' }] }));

  const updateTagDetail = (i: number, field: 'tag' | 'detail', value: string) =>
    setFormData((f) => {
      const updated = [...f.tagDetails];
      updated[i] = { ...updated[i], [field]: value };
      return { ...f, tagDetails: updated };
    });

  const removeTagDetail = (i: number) =>
    setFormData((f) => ({ ...f, tagDetails: f.tagDetails.filter((_, idx) => idx !== i) }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const topics = formData.topicsStr
      .split(',').map((t) => t.trim()).filter((t) => t.length > 0);

    const payload = {
      shortId:     formData.shortId,
      schedule:    formData.schedule,
      slug:        formData.slug || slugify(formData.schedule),
      title:       formData.title,
      description: formData.description,
      topics,
      tagDetails:  formData.tagDetails.filter((td) => td.tag.trim()),
    };

    try {
      if (editingId) {
        const res = await fetch(`${API}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Update failed');
        setSchedules((prev) => prev.map((s) => (s.id === editingId ? data.schedule : s)));
        showToast(`Updated "${data.schedule.schedule}"`);
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Create failed');
        setSchedules((prev) => [...prev, data.schedule]);
        showToast(`Created "${data.schedule.schedule}"`);
      }
      closeModal();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API}/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setSchedules((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      showToast(`Deleted "${deleteTarget.schedule}"`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[70] bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
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
            <Link key={item.name} href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.active ? 'bg-[#1e2638] text-[#f59e0b]' : 'hover:bg-[#1e2638]/50 hover:text-white text-gray-400'
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Schedules</h2>
              <p className="text-sm text-gray-500">Twelve Schedules of the Constitution — lists, forms and tables.</p>
            </div>
            <button onClick={openCreateModal}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              New Schedule
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-24 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
                <span className="text-sm">Loading schedules…</span>
              </div>
            ) : schedules.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <CalendarDays className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">No schedules yet. Click &quot;New Schedule&quot; to add one.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1100px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white">
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-16">#</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-44">Schedule</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-36">Slug</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Topics</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {schedules.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.shortId}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.schedule}</td>
                        <td className="px-6 py-4 text-xs text-gray-400 font-mono">{row.slug}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.title}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {row.topics.map((topic, i) => (
                              <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold tracking-wide">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-4">
                            <button onClick={() => openEditModal(row)} className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteTarget(row)} className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal header */}
            <div className="p-6 md:p-8 pb-0 shrink-0">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    {editingId ? 'Edit Schedule' : 'New Schedule'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingId ? 'Update schedule details.' : 'Add a new schedule entry.'}
                  </p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
                {(['basic', 'topics'] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                      activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'topics' ? `Topics & Details (${formData.tagDetails.length})` : 'Basic Info'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8">
              <form id="schedule-form" onSubmit={handleSave}>
                {activeTab === 'basic' && (
                  <div className="space-y-5 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Short number</label>
                        <input type="text" required placeholder="e.g. 7th"
                          value={formData.shortId}
                          onChange={(e) => setFormData({ ...formData, shortId: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Schedule name</label>
                        <input type="text" required placeholder="e.g. Seventh Schedule"
                          value={formData.schedule}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, schedule: val, slug: slugify(val) });
                          }}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Slug <span className="text-gray-400 font-normal text-xs">(auto-generated, editable)</span>
                      </label>
                      <input type="text" required placeholder="e.g. seventh-schedule"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                      <input type="text" required placeholder="e.g. Union, State and Concurrent Lists"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                      <textarea rows={3} placeholder="Short summary of this Schedule."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Topics <span className="text-gray-400 font-normal text-xs">(comma-separated tag names)</span>
                      </label>
                      <input type="text" placeholder="e.g. Federalism, Lists, Powers"
                        value={formData.topicsStr}
                        onChange={(e) => setFormData({ ...formData, topicsStr: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'topics' && (
                  <div className="space-y-4 pb-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Each topic has a tag name and detailed description shown on the user detail page.
                    </p>
                    {formData.tagDetails.map((td, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Topic {i + 1}</span>
                          <button type="button" onClick={() => removeTagDetail(i)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input type="text" placeholder="Tag name (e.g. Federalism)"
                          value={td.tag}
                          onChange={(e) => updateTagDetail(i, 'tag', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#f59e0b] text-sm text-gray-800"
                        />
                        <textarea rows={3} placeholder="Detailed description shown on the user page…"
                          value={td.detail}
                          onChange={(e) => updateTagDetail(i, 'detail', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#f59e0b] text-sm text-gray-800 resize-y"
                        />
                      </div>
                    ))}
                    <button type="button" onClick={addTagDetail}
                      className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#f59e0b] hover:text-[#c07800] transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add topic
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Modal footer */}
            <div className="p-6 md:p-8 pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={closeModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button type="submit" form="schedule-form" disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? 'Save Changes' : 'Create Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Delete this Schedule?</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-2">
              You&apos;re about to delete <span className="font-semibold text-gray-800">{deleteTarget.schedule}</span>.
            </p>
            <p className="text-[13px] text-gray-400 mb-8">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button onClick={confirmDelete}
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