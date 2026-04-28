"use client";

import React, { useEffect , useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check
} from 'lucide-react';

type Part = {
  id: string;
  partNumber: string;
  title: string;
  range: string;
  articles: number;
  description: string;
};


export default function PartsPage() {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: true, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

const [parts, setParts] = useState<Part[]>([]);

  // --- States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: '', title: '', range: '', description: '', articles: 0
  });

  useEffect(() => {
  fetch("/api/admin/parts")
    .then(res => res.json())
    .then(data => {
      const fixedData = data.map((item: any) => ({
        ...item,
        description: item.description || ""
      }));
      setParts(fixedData);
    });
}, []);

  // --- Handlers ---

  const handleOpenModal = (index: number | null = null) => {
    if (index !== null) {
      setFormData({
  id: parts[index].partNumber,
  title: parts[index].title,
  range: parts[index].range,
  description: parts[index].description || "",
  articles: parts[index].articles
});
      setEditingIndex(index);
    } else {
      setFormData({ id: '', title: '', range: '', description: '', articles: 0 });
      setEditingIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  // NEW: Smart function to calculate articles from the text string
  const calculateArticlesFromRange = (rangeText: string) => {
    // Look for a pattern like "12 - 35" or "12-35" or "12 – 35"
    const rangeMatch = rangeText.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      return Math.abs(end - start) + 1; // Example: 35 - 12 + 1 = 24
    }
    
    // Look for a single number pattern like "Article 51A"
    const singleMatch = rangeText.match(/(\d+)/);
    if (singleMatch) {
      return 1;
    }
    
    // Default to 0 if no numbers are typed
    return 0;
  };

const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  const autoCalculatedArticles = calculateArticlesFromRange(formData.range);

  const finalData = {
    partNumber: formData.id,
    title: formData.title,
    range: formData.range,
    description: formData.description,
    articles: autoCalculatedArticles,
  };

  if (editingIndex !== null) {
    // ✅ UPDATE
    const part = parts[editingIndex];

    await fetch(`/api/admin/parts/${part.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  } else {
    // ✅ CREATE
    await fetch("/api/admin/parts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  }

  // 🔄 Reload data
  const res = await fetch("/api/admin/parts");
  const data = await res.json();

  const fixedData = data.map((item: any) => ({
    ...item,
    description: item.description || "",
  }));

  setParts(fixedData);

  handleCloseModal();
};

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
  };

const confirmDelete = async () => {
  if (deleteIndex !== null) {
    const part = parts[deleteIndex];

await fetch(`/api/admin/parts/${part.id}`, {
  method: "DELETE",
});

    const res = await fetch("/api/admin/parts");
    const data = await res.json();
    setParts(data);

    setDeleteIndex(null);
  }
};

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      
      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[60] bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toastMessage}</span>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Parts</h2>
              <p className="text-sm text-gray-500">Manage the chapters of the Constitution. Articles are filed under a Part.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              New Part
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Part</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Range</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Articles</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parts.map((part, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">{part.partNumber}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{part.title}</td>
                      <td className="px-6 py-5 text-sm text-gray-500">{part.range}</td>
                      <td className="px-6 py-5 text-sm text-gray-500">{part.articles}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-4">
                          <button 
                            onClick={() => handleOpenModal(index)}
                            className="text-gray-500 hover:text-gray-900 transition-colors" 
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(index)}
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

        </div>
      </main>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    {editingIndex !== null ? 'Edit Part' : 'New Part'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingIndex !== null ? 'Modify existing chapter details.' : 'Add a new chapter of the Constitution.'}
                  </p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Part number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Part III" 
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Article range</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Articles 12 – 35" 
                      value={formData.range}
                      onChange={(e) => setFormData({...formData, range: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Fundamental Rights" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Short summary of this Part." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
                  >
                    {editingIndex !== null ? 'Save Changes' : 'Create Part'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Part?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will remove the chapter from the platform. Articles linked to it will become unfiled. This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteIndex(null)}
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