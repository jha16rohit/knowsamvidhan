"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  List,
  FileText,
  AlignLeft,
  Book,
  CalendarDays,
  History,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  ShieldAlert,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  X,
  Check,
  Bell,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const ARTICLES_PER_PAGE = 10;

export default function ArticlesPage() {
  const openCount = 4;

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      active: false,
      href: "/ad-dashboard",
    },
    { name: "Parts", icon: List, active: false, href: "/parts" },
    { name: "Articles", icon: FileText, active: true, href: "/articles" },
    { name: "Clauses", icon: AlignLeft, active: false, href: "/clauses" },
    { name: "Preamble", icon: Book, active: false, href: "/preamble" },
    {
      name: "Schedules",
      icon: CalendarDays,
      active: false,
      href: "/schedules",
    },
    { name: "Amendments", icon: History, active: false, href: "/amendments" },
    { name: "Quizzes", icon: GraduationCap, active: false, href: "/quizzes" },
    { name: "Users", icon: Users, active: false, href: "/users" },
    { name: "Analytics", icon: BarChart3, active: false, href: "/analytics" },
    {
      name: "Alerts",
      icon: Bell,
      active: false,
      href: "/alerts",
      badge: openCount,
    },
    {
      name: "Activity Logs",
      icon: ShieldCheck,
      active: false,
      href: "/activity-logs",
    },
    { name: "Settings", icon: Settings, active: false, href: "/settings" },
  ];

  type Article = {
    id: string;
  
    articleNumber: string;
  
    title: string;
  
    shortSummary?: string;
    officialText?: string;
    simpleExplanation?: string;
    example?: string;
    tags?: string;
  
    featured: boolean;
  
    partId: string;
  
    part?: {
      id: string;
      partNumber: string;
      title?: string;
    };
  };

  const [availableParts, setAvailableParts] = useState<
    { id: string; partNumber: string; label: string }[]
  >([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    part: "",
    id: "",
    title: "",
    shortSummary: "",
    officialText: "",
    simpleExplanation: "",
    example: "",
    tags: "",
    featured: false,
  });

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const partDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
      if (
        partDropdownRef.current &&
        !partDropdownRef.current.contains(e.target as Node)
      ) {
        setIsPartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 350);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPartFilter]);

  useEffect(() => {
    fetch("/api/admin/parts")
      .then((res) => res.json())
      .then((data: { id: string; partNumber: string; title: string }[]) => {
        const formatted = data.map((item) => ({
          id: item.id,
          partNumber: item.partNumber,
          label: `${item.partNumber} — ${item.title}`,
        }));
        setAvailableParts(formatted);
      });
  }, []);

  useEffect(() => {
    if (availableParts.length > 0 && !formData.part) {
      setFormData((prev) => ({
        ...prev,
        part: availableParts[0].id,
      }));
    }
  }, [availableParts, formData.part]);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ARTICLES_PER_PAGE),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedPartFilter !== "all" && { partId: selectedPartFilter }),
      });
      const res = await fetch(`/api/admin/articles?${params.toString()}`);
      const data = await res.json();
      setArticles(data.articles ?? data);
      setTotalCount(data.total ?? data.length ?? 0);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedPartFilter]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ARTICLES_PER_PAGE));

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getPartLabel = (partId: string) => {
    const found = availableParts.find((p) => p.id === partId);
    return found ? found.label : partId;
  };

  const getPartNumber = (article: Article) => {
    return article.part?.partNumber ?? "";
  };

  const handleOpenModal = (id: string | null = null) => {
    if (id !== null) {
      const articleToEdit = articles.find((a) => a.id === id);
      if (articleToEdit) {
        setFormData({
          id: articleToEdit.articleNumber,
          title: articleToEdit.title,
          part: articleToEdit.partId,
          shortSummary: articleToEdit.shortSummary ?? "",
          officialText: articleToEdit.officialText ?? "",
          simpleExplanation: articleToEdit.simpleExplanation ?? "",
          example: articleToEdit.example ?? "",
          tags: articleToEdit.tags ?? "",
          featured: articleToEdit.featured,
        });
        setEditingId(id);
      }
    } else {
      setFormData({
        part: availableParts[0]?.id ?? "",
        id: "",
        title: "",
        shortSummary: "",
        officialText: "",
        simpleExplanation: "",
        example: "",
        tags: "",
        featured: false,
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsPartDropdownOpen(false);
    setIsFilterDropdownOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      articleNumber: formData.id,
      title: formData.title,
      shortSummary: formData.shortSummary,
      officialText: formData.officialText,
      simpleExplanation: formData.simpleExplanation,
      example: formData.example,
      tags: formData.tags,
      featured: formData.featured,
      partId: formData.part,
    };

    try {
      if (editingId) {
        await fetch(`/api/admin/articles/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showToast("Article updated successfully.");
      } else {
        await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        showToast("Article created successfully.");
      }
      handleCloseModal();
      await fetchArticles();
    } catch (err) {
      console.error("Save failed:", err);
      showToast("Something went wrong. Please try again.");
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentValue }),
      });
      await fetchArticles();
    } catch (error) {
      console.error("Error updating featured:", error);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/articles/${deleteId}`, { method: "DELETE" });
      showToast("Article deleted.");
      setDeleteId(null);
      if (articles.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        await fetchArticles();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-60 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f18] text-gray-300 flex flex-col shrink-0 min-h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#c19d60] rounded-full flex items-center justify-center">
            <BookOpen className="text-[#c19d60] w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm tracking-wide">
              KnowSamvidhan
            </h1>
            <p className="text-[6px] tracking-[0.25em] text-gray-400 mt-0.5">
              CONSTITUTION · LEARN · MASTER
            </p>
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
                <item.icon
                  className={`w-4 h-4 ${item.active ? "text-[#f59e0b]" : "text-gray-500"}`}
                />
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

        <div className="p-4 m-4 bg-[#141b2d] rounded-xl border border-gray-800 relative">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-[10px] font-bold tracking-wider uppercase">
              Admin
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">
            You&apos;re managing live content.
            <br />
            Edit with care.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">
                Content
              </p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">
                Manage articles
              </h2>
              <p className="text-sm text-gray-500">
                Add, edit and curate constitutional articles.
              </p>
            </div>
            <button
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New article
            </button>
          </div>

          {/* Search + Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by article number or title…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div ref={filterDropdownRef} className="relative shrink-0">
              <div
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl cursor-pointer shadow-sm transition min-w-45 justify-between ${
                  isFilterDropdownOpen
                    ? "border-[#f59e0b]"
                    : "border-gray-200 hover:border-[#f59e0b]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800 truncate max-w-40">
                    {selectedPartFilter === "all"
                      ? "All Parts"
                      : (availableParts.find((p) => p.id === selectedPartFilter)
                          ?.label ?? "All Parts")}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isFilterDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {isFilterDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full min-w-55 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  <div
                    onClick={() => {
                      setSelectedPartFilter("all");
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                      selectedPartFilter === "all"
                        ? "bg-[#f59e0b]/10 text-[#f59e0b] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    All Parts
                    {selectedPartFilter === "all" && (
                      <Check className="w-4 h-4 text-[#f59e0b]" />
                    )}
                  </div>

                  {availableParts.map((part) => (
                    <div
                      key={part.id}
                      onClick={() => {
                        setSelectedPartFilter(part.id);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                        selectedPartFilter === part.id
                          ? "bg-[#f59e0b]/10 text-[#f59e0b] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {part.label}
                      {selectedPartFilter === part.id && (
                        <Check className="w-4 h-4 text-[#f59e0b]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="text-sm text-gray-400 whitespace-nowrap self-center">
              {totalCount} article{totalCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="w-full bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-24 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading articles…</p>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Book className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                No articles found
              </h3>
              <p className="text-sm text-gray-500">
                Try a different search term or filter.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-200">
                    <thead>
                      <tr className="border-b border-gray-200 bg-white">
                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                          Article
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                          Title
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                          Part
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                          Featured
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {articles.map((article) => (
                        <tr
                          key={article.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-5 text-sm font-medium text-gray-900">
                            {article.articleNumber}
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-600">
                            {article.title}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className="px-3 py-1 bg-white border border-[#f59e0b]/30 text-[#f59e0b] rounded-full text-xs font-semibold truncate max-w-50 inline-block"
                              title={article.part?.title}
                            >
                              {getPartNumber(article)}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <button
                              onClick={() =>
                                toggleFeatured(article.id, article.featured)
                              }
                              aria-label="Toggle Featured"
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  article.featured
                                    ? "fill-[#f59e0b] text-[#f59e0b]"
                                    : "text-gray-300 hover:text-gray-400"
                                }`}
                              />
                            </button>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-4">
                              <button
                                onClick={() => handleOpenModal(article.id)}
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                                aria-label="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(article.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Page{" "}
                    <span className="font-semibold text-gray-800">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-800">
                      {totalPages}
                    </span>
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - currentPage) <= 1,
                      )
                      .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                          acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === "..." ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 text-gray-400 text-sm"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === p
                                ? "bg-[#f59e0b] text-gray-900 font-bold"
                                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {p}
                          </button>
                        ),
                      )}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODAL: Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? "Edit article" : "New article"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId !== null
                    ? "Update article details and content."
                    : "Select the Part this article belongs to, then fill in the details."}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-800 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <form
                id="article-form"
                onSubmit={handleSave}
                className="space-y-6"
              >
                {/* Part selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Part
                  </label>
                  <div ref={partDropdownRef} className="relative">
                    <div
                      onClick={() => setIsPartDropdownOpen(!isPartDropdownOpen)}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl flex items-center justify-between cursor-pointer shadow-sm hover:border-[#ea580c] transition"
                    >
                      <span className="text-sm text-gray-800">
                        {getPartLabel(formData.part) || "Select a Part…"}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform ${isPartDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isPartDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {availableParts.map((partOption) => (
                          <div
                            key={partOption.id}
                            onClick={() => {
                              setFormData({ ...formData, part: partOption.id });
                              setIsPartDropdownOpen(false);
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                              formData.part === partOption.id
                                ? "bg-[#f59e0b]/10 text-[#f59e0b] font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {partOption.label}
                            {formData.part === partOption.id && (
                              <Check className="w-4 h-4 text-[#f59e0b]" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Article number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Article 21"
                      value={formData.id}
                      onChange={(e) =>
                        setFormData({ ...formData, id: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Right to life and personal liberty"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Short summary
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortSummary}
                    onChange={(e) =>
                      setFormData({ ...formData, shortSummary: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Official text
                  </label>
                  <textarea
                    rows={3}
                    value={formData.officialText}
                    onChange={(e) =>
                      setFormData({ ...formData, officialText: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Simple explanation
                  </label>
                  <textarea
                    rows={3}
                    value={formData.simpleExplanation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        simpleExplanation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Example
                  </label>
                  <textarea
                    rows={2}
                    value={formData.example}
                    onChange={(e) =>
                      setFormData({ ...formData, example: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Comma-separated, e.g. Liberty, Privacy"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-transparent select-none mb-2 hidden md:block">
                      Toggle
                    </label>
                    <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center bg-gray-50/50 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Featured
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Show on home page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            featured: !formData.featured,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.featured ? "bg-[#f59e0b]" : "bg-gray-200"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.featured ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="article-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? "Save Changes" : "Create article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Delete confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this article?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently remove the article from the platform. Any
              clauses attached to it will become orphaned. This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
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
