"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, Search, Star, X, Check,
  Bell, ShieldCheck
} from 'lucide-react';

export default function ArticlesPage() {
  // Simulated open alerts count to match the rest of the dashboard
  const openCount = 4;

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: true, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // 1. This simulates fetching the parts from your database!
  const availableParts = [
    { id: 'Part I', title: 'The Union and its Territory' },
    { id: 'Part II', title: 'Citizenship' },
    { id: 'Part III', title: 'Fundamental Rights' },
    { id: 'Part IV', title: 'Directive Principles of State Policy' },
    { id: 'Part IV-A', title: 'Fundamental Duties' },
    { id: 'Part V', title: 'The Union' },
    { id: 'Part VI', title: 'The States' },
  ];

  const [articles, setArticles] = useState([
    { id: 'Article 14', title: 'Equality before law', part: 'Part III — Fundamental Rights', featured: true, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Equality, Law' },
    { id: 'Article 15', title: 'Prohibition of discrimination', part: 'Part III — Fundamental Rights', featured: false, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Discrimination, Rights' },
    { id: 'Article 19', title: 'Six freedoms', part: 'Part III — Fundamental Rights', featured: true, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Freedom, Speech' },
    { id: 'Article 21', title: 'Right to life and personal liberty', part: 'Part III — Fundamental Rights', featured: true, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Life, Liberty' },
    { id: 'Article 32', title: 'Right to constitutional remedies', part: 'Part III — Fundamental Rights', featured: false, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Remedies, SC' },
    { id: 'Article 44', title: 'Uniform Civil Code', part: 'Part IV — Directive Principles of State Policy', featured: false, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'UCC, Civil' },
    { id: 'Article 1', title: 'Name and territory of the Union', part: 'Part I — The Union and its Territory', featured: false, shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: 'Territory, Union' },
  ]);

  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    part: `${availableParts[0].id} — ${availableParts[0].title}`, // Dynamically sets default to first part
    id: '',
    title: '',
    shortSummary: '',
    officialText: '',
    simpleExplanation: '',
    example: '',
    tags: '',
    featured: false
  });

  // --- Search Logic ---
  const filteredArticles = articles.filter(article => 
    article.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Handlers ---
  const handleOpenModal = (id: string | null = null) => {
    if (id !== null) {
      const articleToEdit = articles.find(a => a.id === id);
      if (articleToEdit) {
        setFormData(articleToEdit);
        setEditingId(id);
      }
    } else {
      setFormData({
        part: `${availableParts[0].id} — ${availableParts[0].title}`,
        id: '', title: '', shortSummary: '', officialText: '', simpleExplanation: '', example: '', tags: '', featured: false
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setArticles(articles.map(a => a.id === editingId ? formData : a));
      showToast(`Updated ${formData.id}`);
    } else {
      setArticles([formData, ...articles]);
      showToast(`Created ${formData.id}`);
    }
    handleCloseModal();
  };

  const toggleFeatured = (id: string) => {
    setArticles(articles.map(a => 
      a.id === id ? { ...a, featured: !a.featured } : a
    ));
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setArticles(articles.filter(a => a.id !== deleteId));
      showToast(`Deleted ${deleteId}`);
      setDeleteId(null); 
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      
      {/* Toast Notification */}
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
              {/* Left side: Icon and Name */}
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-[#f59e0b]' : 'text-gray-500'}`} />
                {item.name}
              </div>
              
              {/* Right side: Dynamic Notification Badge */}
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
            <span className="text-[#f59e0b] text-[10px] font-bold tracking-wider uppercase">Admin</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">
            You're managing live content.<br />Edit with care.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage articles</h2>
              <p className="text-sm text-gray-500">Add, edit and curate constitutional articles.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New article
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
            />
          </div>

          {/* Empty State vs Table */}
          {filteredArticles.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Book className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No articles found</h3>
              <p className="text-sm text-gray-500">Try a different search term.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white">
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Article</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Part</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Featured</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm font-medium text-gray-900">{article.id}</td>
                        <td className="px-6 py-5 text-sm text-gray-600">{article.title}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-white border border-[#f59e0b]/30 text-[#f59e0b] rounded-full text-xs font-semibold truncate max-w-50 inline-block" title={article.part}>
                            {article.part.split('—')[0].trim()}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button 
                            onClick={() => toggleFeatured(article.id)}
                            aria-label="Toggle Featured"
                          >
                            <Star 
                              className={`w-5 h-5 transition-colors ${
                                article.featured 
                                  ? 'fill-[#f59e0b] text-[#f59e0b]' 
                                  : 'text-gray-300 hover:text-gray-400'
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
          )}

        </div>
      </main>

      {/* ================= EDIT / CREATE ARTICLE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? 'Edit article' : 'New article'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId !== null ? 'Update article details and content.' : 'First select the Part this article belongs to, then fill in the details.'}
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <form id="article-form" onSubmit={handleSave} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Part</label>
                  <select 
                    value={formData.part}
                    onChange={(e) => setFormData({...formData, part: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value="" disabled>Select a Part...</option>
                    {availableParts.map((partOption) => (
                      <option 
                        key={partOption.id} 
                        value={`${partOption.id} — ${partOption.title}`}
                      >
                        {partOption.id} — {partOption.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Article number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Article 21" 
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Right to life and personal liberty" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Short summary</label>
                  <textarea 
                    rows={2}
                    value={formData.shortSummary}
                    onChange={(e) => setFormData({...formData, shortSummary: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Official text</label>
                  <textarea 
                    rows={3}
                    value={formData.officialText}
                    onChange={(e) => setFormData({...formData, officialText: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Simple explanation</label>
                  <textarea 
                    rows={3}
                    value={formData.simpleExplanation}
                    onChange={(e) => setFormData({...formData, simpleExplanation: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Example</label>
                  <textarea 
                    rows={2}
                    value={formData.example}
                    onChange={(e) => setFormData({...formData, example: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Tags</label>
                    <input 
                      type="text" 
                      placeholder="Comma-separated, e.g. Liberty, Privacy" 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-transparent select-none mb-2 hidden md:block">Toggle</label>
                    <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center bg-gray-50/50 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Featured</p>
                        <p className="text-xs text-gray-500 mt-0.5">Show on home page.</p>
                      </div>
                      
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, featured: !formData.featured})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.featured ? 'bg-[#f59e0b]' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.featured ? 'translate-x-6' : 'translate-x-1'}`} />
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
                {editingId !== null ? 'Save Changes' : 'Create article'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Article?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will remove {deleteId} from the platform. Any clauses attached to it will also be orphaned. This action cannot be undone.
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