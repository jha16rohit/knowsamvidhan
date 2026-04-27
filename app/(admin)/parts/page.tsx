import React from 'react';
import Link from 'next/link'; // 1. Import the Next.js Link component
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2
} from 'lucide-react';

export default function PartsPage() {
  // 2. Added 'href' paths to the navigation array
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

  const partsData = [
    { id: 'Part I', title: 'The Union and its Territory', range: 'Articles 1 – 4', articles: 1 },
    { id: 'Part II', title: 'Citizenship', range: 'Articles 5 – 11', articles: 1 },
    { id: 'Part III', title: 'Fundamental Rights', range: 'Articles 12 – 35', articles: 5 },
    { id: 'Part IV', title: 'Directive Principles of State Policy', range: 'Articles 36 – 51', articles: 1 },
    { id: 'Part IV-A', title: 'Fundamental Duties', range: 'Article 51A', articles: 1 },
    { id: 'Part V', title: 'The Union', range: 'Articles 52 – 151', articles: 0 },
    { id: 'Part VI', title: 'The States', range: 'Articles 152 – 237', articles: 0 },
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
          {/* 3. Replaced <a> tag with <Link> and used item.href */}
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
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto">
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
                  {partsData.map((part, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">{part.id}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{part.title}</td>
                      <td className="px-6 py-5 text-sm text-gray-500">{part.range}</td>
                      <td className="px-6 py-5 text-sm text-gray-500">{part.articles}</td>
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