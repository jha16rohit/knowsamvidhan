"use client";

import React, {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "@/components/admin_sidebar";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type Part = {
  id: string;
  partNumber: string;
  title: string;
  range: string;
  articles: number;
  description: string;
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function PartsPage() {

  // ─────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────

  const [parts, setParts] =
    useState<Part[]>([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [deleteIndex, setDeleteIndex] =
    useState<number | null>(null);

  const [toastMessage] =
    useState<string | null>(null);

  const [formData, setFormData] =
    useState({
      id: "",
      title: "",
      range: "",
      description: "",
      articles: 0,
    });

  // ─────────────────────────────────────────
  // FETCH DATA
  // ─────────────────────────────────────────

  useEffect(() => {

    fetch("/api/admin/parts")
      .then((res) => res.json())
      .then((data) => {

        const fixedData = data.map(
          (item: Part) => ({
            ...item,
            description:
              item.description || "",
          })
        );

        setParts(fixedData);
      });

  }, []);

  // ─────────────────────────────────────────
  // MODAL HANDLERS
  // ─────────────────────────────────────────

  const handleOpenModal = (
    index: number | null = null
  ) => {

    if (index !== null) {

      setFormData({
        id: parts[index].partNumber,
        title: parts[index].title,
        range: parts[index].range,
        description:
          parts[index].description || "",
        articles: parts[index].articles,
      });

      setEditingIndex(index);

    } else {

      setFormData({
        id: "",
        title: "",
        range: "",
        description: "",
        articles: 0,
      });

      setEditingIndex(null);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {

    setIsModalOpen(false);

    setEditingIndex(null);
  };

  // ─────────────────────────────────────────
  // ARTICLE CALCULATOR
  // ─────────────────────────────────────────

  const calculateArticlesFromRange = (
    rangeText: string
  ) => {

    const rangeMatch =
      rangeText.match(
        /(\d+)\s*[-–]\s*(\d+)/
      );

    if (rangeMatch) {

      const start =
        parseInt(rangeMatch[1], 10);

      const end =
        parseInt(rangeMatch[2], 10);

      return Math.abs(end - start) + 1;
    }

    const singleMatch =
      rangeText.match(/(\d+)/);

    if (singleMatch) {
      return 1;
    }

    return 0;
  };

  // ─────────────────────────────────────────
  // SAVE
  // ─────────────────────────────────────────

  const handleSave = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const autoCalculatedArticles =
      calculateArticlesFromRange(
        formData.range
      );

    const finalData = {
      partNumber: formData.id,
      title: formData.title,
      range: formData.range,
      description:
        formData.description,
      articles:
        autoCalculatedArticles,
    };

    // UPDATE
    if (editingIndex !== null) {

      const part =
        parts[editingIndex];

      await fetch(
        `/api/admin/parts/${part.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            finalData
          ),
        }
      );

    }

    // CREATE
    else {

      await fetch(
        "/api/admin/parts",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            finalData
          ),
        }
      );
    }

    // RELOAD
    const res = await fetch(
      "/api/admin/parts"
    );

    const data = await res.json();

    const fixedData = data.map(
      (item: Part) => ({
        ...item,
        description:
          item.description || "",
      })
    );

    setParts(fixedData);

    handleCloseModal();
  };

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  const handleDeleteClick = (
    index: number
  ) => {

    setDeleteIndex(index);
  };

  const confirmDelete = async () => {

    if (deleteIndex !== null) {

      const part =
        parts[deleteIndex];

      await fetch(
        `/api/admin/parts/${part.id}`,
        {
          method: "DELETE",
        }
      );

      const res = await fetch(
        "/api/admin/parts"
      );

      const data =
        await res.json();

      setParts(data);

      setDeleteIndex(null);
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans relative">

      {/* FIXED SIDEBAR */}
      <AdminSidebar />

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">

          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">

            <Check
              className="w-4 h-4 text-white"
              strokeWidth={3}
            />

          </div>

          <span className="text-sm font-bold text-gray-900">

            {toastMessage}

          </span>

        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="ml-80 min-h-screen overflow-y-auto">

        <div className="p-8 lg:p-10">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

            <div>

              <h2 className="text-5xl font-serif text-gray-900 mb-3 font-bold">
                Parts
              </h2>

              <p className="text-sm text-gray-500">
                Manage the chapters of the Constitution.
              </p>

            </div>

            <button
              onClick={() =>
                handleOpenModal(null)
              }
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >

              <Plus className="w-5 h-5" />

              New Part

            </button>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse">

                <thead>

                  <tr className="border-b border-gray-200 bg-white">

                    <th className="px-8 py-5 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      Part
                    </th>

                    <th className="px-8 py-5 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      Title
                    </th>

                    <th className="px-8 py-5 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      Range
                    </th>

                    <th className="px-8 py-5 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      Articles
                    </th>

                    <th className="px-8 py-5 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {parts.map(
                    (part, index) => (

                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >

                        <td className="px-8 py-6 text-sm font-semibold text-gray-900">

                          {part.partNumber}

                        </td>

                        <td className="px-8 py-6 text-sm text-gray-700">

                          {part.title}

                        </td>

                        <td className="px-8 py-6 text-sm text-gray-500">

                          {part.range}

                        </td>

                        <td className="px-8 py-6 text-sm text-gray-500">

                          {part.articles}

                        </td>

                        <td className="px-8 py-6">

                          <div className="flex items-center justify-end gap-5">

                            <button
                              onClick={() =>
                                handleOpenModal(index)
                              }
                              className="text-gray-400 hover:text-gray-900 transition-colors"
                            >

                              <Pencil className="w-4 h-4" />

                            </button>

                            <button
                              onClick={() =>
                                handleDeleteClick(index)
                              }
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >

                              <Trash2 className="w-4 h-4" />

                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

            <div className="p-8">

              {/* TOP */}
              <div className="flex justify-between items-start mb-8">

                <div>

                  <h3 className="text-3xl font-serif font-bold text-gray-900">

                    {editingIndex !== null
                      ? "Edit Part"
                      : "New Part"}

                  </h3>

                  <p className="text-sm text-gray-500 mt-2">

                    {editingIndex !== null
                      ? "Modify existing chapter details."
                      : "Add a new constitutional chapter."}

                  </p>

                </div>

                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                >

                  <X className="w-5 h-5" />

                </button>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSave}
                className="space-y-5"
              >

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    required
                    placeholder="Part Number"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        id: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Article Range"
                    value={formData.range}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        range: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                  />

                </div>

                <input
                  type="text"
                  required
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                />

                <textarea
                  rows={4}
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description:
                        e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50"
                />

                <div className="flex justify-end gap-3 pt-4">

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#ea580c] text-white font-semibold transition-colors"
                  >

                    {editingIndex !== null
                      ? "Save Changes"
                      : "Create Part"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {deleteIndex !== null && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Delete this Part?
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed mb-8">

              This action cannot be undone.

            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setDeleteIndex(null)
                }
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
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