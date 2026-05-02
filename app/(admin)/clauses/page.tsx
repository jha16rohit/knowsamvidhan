"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2,
  Search, X, Check, Filter, ChevronLeft, ChevronRight,
  Bell, ShieldCheck
} from 'lucide-react';

const CLAUSES_PER_PAGE = 10;

type ArticleOption = {
  id: string;
  articleNumber: string;
  title: string;
  label: string;
};

type Clause = {
  id: string;
  clauseNumber: string;
  title: string;
  text?: string;
  officialText?: string;
  simpleExplanation?: string;
  example?: string;
  tags?: string;
  featured: boolean;
  articleId: string;
  article?: {
    id: string;
    articleNumber: string;
    title?: string;
  };
};

type FormDataType = {
  articleId: string;
  clauseNumber: string;
  title: string;
  text: string;
  officialText: string;
  simpleExplanation: string;
  example: string;
  tags: string;
  featured: boolean;
};

export default function ClausesPage() {
  const openCount = 4;

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: true, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount },
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────
  const [availableArticles, setAvailableArticles] = useState<ArticleOption[]>([]);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedArticleFilter, setSelectedArticleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isArticleDropdownOpen, setIsArticleDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    articleId: "",
    clauseNumber: "",
    title: "",
    text: "",
    officialText: "",
    simpleExplanation: "",
    example: "",
    tags: "",
    featured: false,
  });

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const articleDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // ─── Click outside to close dropdowns ────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (articleDropdownRef.current && !articleDropdownRef.current.contains(e.target as Node)) {
        setIsArticleDropdownOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Debounce search ──────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 350);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [searchQuery]);

  useEffect(() => { setCurrentPage(1); }, [selectedArticleFilter]);

  // ─── Fetch articles for dropdown (once) ──────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/articles?limit=200')
      .then((res) => res.json())
      .then((data) => {
        const list = data.articles ?? data;
        const formatted = list.map((item: ArticleOption) => ({
          id: item.id,
          articleNumber: item.articleNumber,
          title: item.title,
          label: `${item.articleNumber} — ${item.title}`,
        }));
        setAvailableArticles(formatted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (availableArticles.length > 0 && !formData.articleId) {
      setFormData((prev) => ({ ...prev, articleId: availableArticles[0].id }));
    }
  }, [availableArticles, formData.articleId]);

  // ─── Fetch clauses (server-side: search + filter + pagination) ────────────
  const fetchClauses = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(CLAUSES_PER_PAGE),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedArticleFilter !== 'all' && { articleId: selectedArticleFilter }),
      });
      const res = await fetch(`/api/admin/clauses?${params.toString()}`);
      const data = await res.json();
      setClauses(data.clauses ?? data);
      setTotalCount(data.total ?? data.length ?? 0);
    } catch (err) {
      console.error('Failed to fetch clauses:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedArticleFilter]);

  useEffect(() => { fetchClauses(); }, [fetchClauses]);

  const totalPages = Math.max(1, Math.ceil(totalCount / CLAUSES_PER_PAGE));

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getArticleLabel = (articleId: string) => {
    const found = availableArticles.find((a) => a.id === articleId);
    return found ? found.label : '';
  };

  const getFilterLabel = () => {
    if (selectedArticleFilter === 'all') return 'All Articles';
    const found = availableArticles.find((a) => a.id === selectedArticleFilter);
    return found ? found.label : 'All Articles';
  };

  const groupedClauses = clauses.reduce((acc: Record<string, Clause[]>, clause: Clause) => {
    const key = clause.articleId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(clause);
    return acc;
  }, {});

  // ─── Modal ────────────────────────────────────────────────────────────────
  const handleOpenModal = (id: string | null = null) => {
    if (id !== null) {
      const toEdit = clauses.find((c) => c.id === id);
  
      if (toEdit) {
        setFormData({
          articleId: toEdit.articleId,
  
          clauseNumber: toEdit.clauseNumber,
  
          title: toEdit.title,
  
          text: toEdit.text ?? "",
  
          officialText: toEdit.officialText ?? "",
  
          simpleExplanation: toEdit.simpleExplanation ?? "",
  
          example: toEdit.example ?? "",
  
          tags: toEdit.tags ?? "",
  
          featured: toEdit.featured,
        });
  
        setEditingId(id);
      }
    } else {
      setFormData({
        articleId: availableArticles[0]?.id ?? "",
  
        clauseNumber: "",
  
        title: "",
  
        text: "",
  
        officialText: "",
  
        simpleExplanation: "",
  
        example: "",
  
        tags: "",
  
        featured: false,
      });
  
      setEditingId(null);
    }
  
    setIsArticleDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsArticleDropdownOpen(false);
    setIsFilterDropdownOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      articleId: formData.articleId,
      clauseNumber: formData.clauseNumber,
      text: formData.text,
    };
    try {
      if (editingId) {
        await fetch(`/api/admin/clauses/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        showToast('Clause updated successfully.');
      } else {
        await fetch('/api/admin/clauses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        showToast('Clause created successfully.');
      }
      handleCloseModal();
      await fetchClauses();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Something went wrong. Please try again.');
    }
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDeleteClick = (id: string) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/clauses/${deleteId}`, { method: 'DELETE' });
      showToast('Clause deleted.');
      setDeleteId(null);
      if (clauses.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        await fetchClauses();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-60 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toastMessage}</span>
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage clauses</h2>
              <p className="text-sm text-gray-500">Sub-clauses inside articles. Pick an article to add or edit clauses.</p>
            </div>
            <button
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New clause
            </button>
          </div>

          {/* ── Search + Filter row ── */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by clause number or text…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter dropdown */}
            <div ref={filterDropdownRef} className="relative shrink-0">
              <div
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl cursor-pointer shadow-sm transition min-w-50 justify-between ${
                  isFilterDropdownOpen ? 'border-[#f59e0b]' : 'border-gray-200 hover:border-[#f59e0b]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800 truncate `max-w-[160px]`">{getFilterLabel()}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {isFilterDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full min-w-65 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  <div
                    onClick={() => { setSelectedArticleFilter('all'); setIsFilterDropdownOpen(false); }}
                    className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                      selectedArticleFilter === 'all'
                        ? 'bg-[#f59e0b]/10 text-[#f59e0b] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Articles
                    {selectedArticleFilter === 'all' && <Check className="w-4 h-4 text-[#f59e0b]" />}
                  </div>
                  {availableArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => { setSelectedArticleFilter(article.id); setIsFilterDropdownOpen(false); }}
                      className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                        selectedArticleFilter === article.id
                          ? 'bg-[#f59e0b]/10 text-[#f59e0b] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate pr-2">{article.label}</span>
                      {selectedArticleFilter === article.id && <Check className="w-4 h-4 text-[#f59e0b] shrink-0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Count */}
            <span className="text-sm text-gray-400 whitespace-nowrap self-center">
              {totalCount} clause{totalCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* ── Content ── */}
          {isLoading ? (
            <div className="w-full bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-24 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading clauses…</p>
              </div>
            </div>
          ) : clauses.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <AlignLeft className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No clauses found</h3>
              <p className="text-sm text-gray-500">Try a different search or filter, or click &quot;New clause&quot;.</p>
            </div>
          ) : (
            <>
              {/* Grouped by article */}
              {Object.entries(groupedClauses).map(([articleId, articleClauses]) => {
                const articleMeta = (articleClauses as Clause[])[0]?.article;
                const artNumber = articleMeta?.articleNumber ?? '';
                const artTitle = articleMeta?.title ?? '';

                return (
                  <div key={articleId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    {/* Group header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <p className="text-[#f59e0b] text-[10px] font-bold tracking-widest uppercase mb-1">{artNumber}</p>
                        <h3 className="text-lg font-semibold text-gray-900">{artTitle}</h3>
                      </div>
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {articleClauses.length} {articleClauses.length === 1 ? 'clause' : 'clauses'}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100 bg-white">
                            <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-28">Clause</th>
                            <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Text</th>
                            <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right w-32">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {(articleClauses as Clause[]).map((clause) => (
                            <tr key={clause.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-5 text-sm font-semibold text-gray-900 align-top pt-5">{clause.clauseNumber}</td>
                              <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed pr-10">{clause.text}</td>
                              <td className="px-6 py-5 align-top pt-5">
                                <div className="flex items-center justify-end gap-4">
                                  <button
                                    onClick={() => handleOpenModal(clause.id)}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                    aria-label="Edit"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(clause.id)}
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
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Page <span className="font-semibold text-gray-800">{currentPage}</span> of{' '}
                    <span className="font-semibold text-gray-800">{totalPages}</span>
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
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === p
                                ? 'bg-[#f59e0b] text-gray-900 font-bold'
                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

      {/* ═══ MODAL: Create / Edit ═══ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-in fade-in zoom-in-95 duration-200">

            {/* Modal header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? 'Edit clause' : 'New clause'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId !== null
                    ? 'Update the clause details.'
                    : 'Select the parent article, then fill in the clause details.'}
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <form id="clause-form" onSubmit={handleSave} className="space-y-5">

                {/* Article selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Article</label>
                  <div ref={articleDropdownRef} className="relative">
                    <div
                      onClick={() => setIsArticleDropdownOpen(!isArticleDropdownOpen)}
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer shadow-sm transition ${
                        isArticleDropdownOpen ? 'border-[#f59e0b]' : 'border-[#f59e0b] hover:border-[#ea580c]'
                      }`}
                    >
                      <span className="text-sm text-gray-800 truncate pr-2">
                        {getArticleLabel(formData.articleId) || 'Select an article…'}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isArticleDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isArticleDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {availableArticles.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-400">Loading articles…</div>
                        ) : (
                          availableArticles.map((article) => (
                            <div
                              key={article.id}
                              onClick={() => {
                                setFormData({ ...formData, articleId: article.id });
                                setIsArticleDropdownOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer transition flex items-center justify-between ${
                                formData.articleId === article.id
                                  ? 'bg-[#f59e0b]/10 text-[#f59e0b] font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <span className="truncate pr-2">{article.label}</span>
                              {formData.articleId === article.id && (
                                <Check className="w-4 h-4 text-[#f59e0b] shrink-0" />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Clause number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Clause number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. (1) or (a)"
                    value={formData.clauseNumber}
                    onChange={(e) => setFormData({ ...formData, clauseNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                {/* Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Text</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Enter the official clause text…"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

              </form>
            </div>

            {/* Modal footer */}
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
                form="clause-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? 'Save Changes' : 'Create clause'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ═══ MODAL: Delete confirm ═══ */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Delete this clause?</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently remove the clause from the platform. This action cannot be undone.
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