"use client";

import React, { useState, useEffect, useCallback } from "react";

import AdminSidebar from "@/components/admin_sidebar";

import {
  History,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
  BookMarked,
  Lightbulb,
} from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const EMPTY_FORM: FormData = {
  number: "",
  year: "",
  title: "",
  summary: "",
  whyItMatters: "",
  relatedArticles: "",
};

const API = "/api/admin/amendments";

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function AmendmentsPage() {
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────

  const [amendments, setAmendments] = useState<Amendment[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Amendment | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  // ─────────────────────────────────────────
  // FETCH
  // ─────────────────────────────────────────

  const fetchAmendments = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(API);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch amendments");
      }

      setAmendments(data.amendments);
    } catch (err) {
      console.error(err);

      showToast("Error loading amendments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAmendments();
  }, [fetchAmendments]);

  // ─────────────────────────────────────────
  // TOAST
  // ─────────────────────────────────────────

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // ─────────────────────────────────────────
  // MODAL HELPERS
  // ─────────────────────────────────────────

  const openCreateModal = () => {
    setFormData(EMPTY_FORM);

    setEditingId(null);

    setIsModalOpen(true);
  };

  const openEditModal = (amendment: Amendment) => {
    setFormData({
      number: amendment.number,
      year: amendment.year,
      title: amendment.title,
      summary: amendment.summary,
      whyItMatters: amendment.whyItMatters,
      relatedArticles: amendment.relatedArticles,
    });

    setEditingId(amendment.id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setEditingId(null);

    setFormData(EMPTY_FORM);
  };

  // ─────────────────────────────────────────
  // SAVE
  // ─────────────────────────────────────────

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      // UPDATE
      if (editingId) {
        const res = await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Update failed");
        }

        setAmendments((prev) =>
          prev.map((a) => (a.id === editingId ? data.amendment : a)),
        );

        showToast(`Updated ${data.amendment.number} Amendment`);
      }

      // CREATE
      else {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Create failed");
        }

        setAmendments((prev) => [data.amendment, ...prev]);

        showToast(`Created ${data.amendment.number} Amendment`);
      }

      closeModal();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`${API}/${deleteTarget.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      setAmendments((prev) => prev.filter((a) => a.id !== deleteTarget.id));

      showToast(`Deleted ${deleteTarget.number} Amendment`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans relative">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>

          <span className="text-sm font-bold text-gray-900">{toast}</span>
        </div>
      )}

      {/* MAIN */}
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8 lg:p-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">
                Content
              </p>

              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">
                Manage Amendments
              </h2>

              <p className="text-sm text-gray-500">
                Curate the timeline of constitutional amendments.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Amendment
            </button>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-3" />

              <span className="text-sm">Loading amendments...</span>
            </div>
          ) : amendments.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <History className="w-5 h-5 text-gray-400" />
              </div>

              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                No amendments yet
              </h3>

              <p className="text-sm text-gray-500">
                Click &quot;New Amendment&quot; to create one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {amendments.map((amendment) => (
                <div
                  key={amendment.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:border-gray-300 transition-colors overflow-hidden"
                >
                  {/* TOP */}
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider">
                      {amendment.year}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => openEditModal(amendment)}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(amendment)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 wrap-break-word">
                      {amendment.number} — {amendment.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed wrap-break-word">
                      {amendment.summary}
                    </p>
                  </div>

                  {/* WHY */}
                  {amendment.whyItMatters && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                      <Lightbulb className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />

                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-[#f59e0b] uppercase mb-1">
                          Why it matters
                        </p>

                        <p className="text-sm text-amber-900 leading-relaxed wrap-break-word">
                          {amendment.whyItMatters}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* RELATED */}
                  {amendment.relatedArticles && (
                    <div className="flex gap-3 items-start">
                      <BookMarked className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />

                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                          Related Articles
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {amendment.relatedArticles.split(",").map((a, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold tracking-wide"
                            >
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* HEADER */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId ? "Edit Amendment" : "New Amendment"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {editingId
                    ? "Update amendment details."
                    : "Add a new amendment to the timeline."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <form
                id="amendment-form"
                onSubmit={handleSave}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Number
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Year
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Title
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Summary
                  </label>

                  <textarea
                    rows={4}
                    required
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        summary: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                  />
                </div>
              </form>
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="amendment-form"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}

                {editingId ? "Save Changes" : "Create Amendment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Amendment?
            </h3>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              You&apos;re about to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.number} — {deleteTarget.title}
              </span>
              . This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e11d48] hover:bg-[#be123c] transition-colors"
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
