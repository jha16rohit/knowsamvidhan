"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check
} from 'lucide-react';

export default function ClausesPage() {
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
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // 1. This perfectly mirrors the data from your articles/page.tsx file!
  const availableArticles = [
    'Article 1 — Name and territory of the Union',
    'Article 5 — Citizenship at the commencement of the Constitution',
    'Article 14 — Equality before law',
    'Article 15 — Prohibition of discrimination',
    'Article 19 — Six freedoms',
    'Article 21 — Right to life and personal liberty',
    'Article 32 — Right to constitutional remedies',
    'Article 44 — Uniform Civil Code',
    'Article 51A — Fundamental Duties',
  ];

  const [clauses, setClauses] = useState([
    { 
      uid: 'c1',
      articleStr: 'Article 15 — Prohibition of discrimination',
      id: '(1)', 
      text: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.' 
    },
    { 
      uid: 'c2',
      articleStr: 'Article 15 — Prohibition of discrimination',
      id: '(3)', 
      text: 'Nothing in this article shall prevent the State from making any special provision for women and children.' 
    },
    { 
      uid: 'c3',
      articleStr: 'Article 15 — Prohibition of discrimination',
      id: '(4)', 
      text: 'Special provisions for the advancement of socially and educationally backward classes.' 
    },
  ]);

  // --- States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    articleStr: availableArticles[0], // Defaults to the first article
    id: '',
    text: ''
  });

  // --- Grouping Logic ---
  const groupedClauses = clauses.reduce((acc, clause) => {
    if (!acc[clause.articleStr]) {
      acc[clause.articleStr] = [];
    }
    acc[clause.articleStr].push(clause);
    return acc;
  }, {} as Record<string, typeof clauses>);

  // --- Handlers ---
  const handleOpenModal = (uid: string | null = null) => {
    if (uid !== null) {
      const clauseToEdit = clauses.find(c => c.uid === uid);
      if (clauseToEdit) {
        setFormData(clauseToEdit);
        setEditingId(uid);
      }
    } else {
      setFormData({
        articleStr: availableArticles[0],
        id: '',
        text: ''
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
      setClauses(clauses.map(c => c.uid === editingId ? { ...formData, uid: editingId } : c));
      showToast(`Updated Clause ${formData.id}`);
    } else {
      const newClause = { ...formData, uid: Date.now().toString() };
      setClauses([...clauses, newClause]);
      showToast(`Created Clause ${formData.id}`);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (uid: string) => {
    setDeleteId(uid);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      const clauseToDelete = clauses.find(c => c.uid === deleteId);
      setClauses(clauses.filter(c => c.uid !== deleteId));
      if (clauseToDelete) showToast(`Deleted Clause ${clauseToDelete.id}`);
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
        <div className="fixed bottom-8 right-8 z-[60] bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
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
        
        <header className="h-16 flex items-center justify-end px-8 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">View site</a>
            <div className="w-8 h-8 rounded-full bg-[#0a0f18] text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-sm">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Clauses</h2>
              <p className="text-sm text-gray-500">Sub-clauses inside Articles. Pick an Article to add or edit clauses.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New Clause
            </button>
          </div>

          {Object.keys(groupedClauses).length === 0 ? (
             <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <AlignLeft className="w-5 h-5 text-gray-500" />
               </div>
               <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No clauses found</h3>
               <p className="text-sm text-gray-500">Click "New Clause" to add one.</p>
             </div>
          ) : (
            Object.entries(groupedClauses).map(([articleStr, articleClauses]) => {
              const [artId, artTitle] = articleStr.split(' — ');

              return (
                <div key={articleStr} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                  
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                      <p className="text-[#f59e0b] text-[10px] font-bold tracking-widest uppercase mb-1">{artId}</p>
                      <h3 className="text-lg font-semibold text-gray-900">{artTitle}</h3>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {articleClauses.length} {articleClauses.length === 1 ? 'clause' : 'clauses'}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-200">
                      <thead>
                        <tr className="border-b border-gray-100 bg-white">
                          <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-24">Clause</th>
                          <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Text</th>
                          <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {articleClauses.map((clause) => (
                          <tr key={clause.uid} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-5 text-sm font-semibold text-gray-900 align-top pt-6">{clause.id}</td>
                            <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed pr-10">{clause.text}</td>
                            <td className="px-6 py-5 align-top pt-6">
                              <div className="flex items-center justify-end gap-4">
                                <button 
                                  onClick={() => handleOpenModal(clause.uid)}
                                  className="text-gray-500 hover:text-gray-900 transition-colors" 
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClick(clause.uid)}
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
            })
          )}

        </div>
      </main>

      {/* ================= EDIT / CREATE CLAUSE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:p-8 pb-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    {editingId !== null ? 'Edit clause' : 'New clause'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Pick the parent Article and write the clause text.
                  </p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form id="clause-form" onSubmit={handleSave} className="space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Article</label>
                  <select 
                    required
                    value={formData.articleStr}
                    onChange={(e) => setFormData({...formData, articleStr: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value="" disabled>Select an Article...</option>
                    {/* Maps over the available articles defined at the top of the file */}
                    {availableArticles.map((art) => (
                      <option key={art} value={art}>
                        {art}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Clause number</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. (1)" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Text</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 md:px-8 mt-2 flex justify-end gap-3 flex-shrink-0">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
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

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Clause?
            </h3>
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