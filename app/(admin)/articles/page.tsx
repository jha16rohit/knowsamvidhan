import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, Search, Star
} from 'lucide-react';

export default function ArticlesPage() {
  // Navigation links - ALL hrefs are now fixed!
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: true, href: '/articles' }, // Active!
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' }, // Fixed from '#'
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' }, // Fixed from '#'
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' }, // Fixed from '#'
    { name: 'Amendments', icon: History, active: false, href: '/amendments' }, // Fixed from '#'
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' }, // Fixed from '#'
    { name: 'Users', icon: Users, active: false, href: '/users' }, // Fixed from '#'
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' }, // Fixed from '#'
    { name: 'Settings', icon: Settings, active: false, href: '/settings' }, // Fixed from '#'
  ];

  // Mock data
  const articlesData = [
    { id: 'Article 14', title: 'Equality before law', part: 'Part III', featured: true },
    { id: 'Article 15', title: 'Prohibition of discrimination', part: 'Part III', featured: false },
    { id: 'Article 19', title: 'Six freedoms', part: 'Part III', featured: true },
    { id: 'Article 21', title: 'Right to life and personal liberty', part: 'Part III', featured: true },
    { id: 'Article 32', title: 'Right to constitutional remedies', part: 'Part III', featured: false },
    { id: 'Article 44', title: 'Uniform Civil Code', part: 'Part IV', featured: false },
    { id: 'Article 1', title: 'Name and territory of the Union', part: 'Part I', featured: false },
    { id: 'Article 5', title: 'Citizenship at the commencement of the Constitution', part: 'Part II', featured: false },
    { id: 'Article 51A', title: 'Fundamental Duties', part: 'Part IV-A', featured: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      
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

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage articles</h2>
              <p className="text-sm text-gray-500">Add, edit and curate constitutional articles.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-4 md:mt-0">
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
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-200">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Article</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Part</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Featured</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {articlesData.map((article, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">{article.id}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{article.title}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-white border border-[#f59e0b]/30 text-[#f59e0b] rounded-full text-xs font-semibold">
                          {article.part}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button aria-label="Toggle Featured">
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
                          <button className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete">
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

    </div>
  );
}