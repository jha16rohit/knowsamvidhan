"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check
} from 'lucide-react';

export default function AmendmentsPage() {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: true, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  const [amendments, setAmendments] = useState([
    { uid: 'a1', year: '1951', number: '1st', title: 'First Amendment', summary: 'Added the Ninth Schedule to protect land reform laws and modified Articles 15 and 19.', whyItMatters: '', relatedArticles: '' },
    { uid: 'a2', year: '1976', number: '42nd', title: "The 'Mini-Constitution'", summary: 'Added the words Socialist, Secular and Integrity to the Preamble; introduced Fundamental Duties.', whyItMatters: '', relatedArticles: '' },
    { uid: 'a3', year: '1978', number: '44th', title: 'Restoration of Rights', summary: "Reversed many of the 42nd Amendment's changes; right to property removed from Fundamental Rights.", whyItMatters: '', relatedArticles: '' },
    { uid: 'a4', year: '1992', number: '73rd', title: 'Panchayati Raj', summary: 'Constitutional status to Panchayats; created a three-tier system of local self-government.', whyItMatters: '', relatedArticles: '' },
    { uid: 'a5', year: '2002', number: '86th', title: 'Right to Education', summary: 'Made elementary education a fundamental right under Article 21A.', whyItMatters: '', relatedArticles: '' },
    { uid: 'a6', year: '2016', number: '101st', title: 'Goods and Services Tax', summary: 'Introduced GST, replacing a web of indirect taxes with a unified national tax.', whyItMatters: '', relatedArticles: '' },
    { uid: 'a7', year: '2019', number: '103rd', title: 'EWS Reservation', summary: '10% reservation in education and employment for Economically Weaker Sections among general category.', whyItMatters: '', relatedArticles: '' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    number: '', year: '', title: '', summary: '', whyItMatters: '', relatedArticles: ''
  });

  const handleOpenModal = (uid: string | null = null) => {
    if (uid !== null) {
      const amendmentToEdit = amendments.find(a => a.uid === uid);
      if (amendmentToEdit) {
        setFormData(amendmentToEdit);
        setEditingId(uid);
      }
    } else {
      setFormData({ number: '', year: '', title: '', summary: '', whyItMatters: '', relatedArticles: '' });
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
      setAmendments(amendments.map(a => a.uid === editingId ? { ...formData, uid: editingId } : a));
      showToast(`Updated ${formData.number} Amendment`);
    } else {
      const newAmendment = { ...formData, uid: Date.now().toString() };
      setAmendments([newAmendment, ...amendments]);
      showToast(`Created ${formData.number} Amendment`);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (uid: string) => {
    setDeleteId(uid);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      const itemToDelete = amendments.find(a => a.uid === deleteId);
      setAmendments(amendments.filter(a => a.uid !== deleteId));
      if (itemToDelete) showToast(`Deleted ${itemToDelete.number} Amendment`);
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
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage amendments</h2>
              <p className="text-sm text-gray-500">Curate the timeline of constitutional amendments.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New amendment
            </button>
          </div>

          {amendments.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <History className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No amendments found</h3>
              <p className="text-sm text-gray-500">Click "New amendment" to create one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {amendments.map((amendment) => (
                <div 
                  key={amendment.uid} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider">
                      {amendment.year}
                    </span>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleOpenModal(amendment.uid)}
                        className="text-gray-400 hover:text-gray-900 transition-colors" 
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(amendment.uid)}
                        className="text-red-400 hover:text-red-600 transition-colors" 
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                      {amendment.number} — {amendment.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {amendment.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          
          {/* CHANGED FROM max-w-2xl TO max-w-lg HERE */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start flex-shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? 'Edit amendment' : 'New amendment'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Add a new amendment to the timeline.
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <form id="amendment-form" onSubmit={handleSave} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 42nd" 
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Year</label>
                    <input 
                      type="text" 
                      required
                      placeholder="2026" 
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Summary</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Why it matters</label>
                  <textarea 
                    rows={3}
                    value={formData.whyItMatters}
                    onChange={(e) => setFormData({...formData, whyItMatters: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Related articles</label>
                  <input 
                    type="text" 
                    placeholder="Comma-separated slugs, e.g. article-21, article-19" 
                    value={formData.relatedArticles}
                    onChange={(e) => setFormData({...formData, relatedArticles: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50 rounded-b-2xl">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="amendment-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? 'Save Changes' : 'Create amendment'}
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
              Delete this Amendment?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently remove the amendment from the timeline. This action cannot be undone.
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