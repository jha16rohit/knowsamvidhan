import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2
} from 'lucide-react';

export default function ClausesPage() {
  // Navigation links (Clauses is now active)
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: true, href: '/clauses' }, // Active!
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data matching the screenshot
  const clausesData = [
    { 
      id: '(1)', 
      text: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.' 
    },
    { 
      id: '(3)', 
      text: 'Nothing in this article shall prevent the State from making any special provision for women and children.' 
    },
    { 
      id: '(4)', 
      text: 'Special provisions for the advancement of socially and educationally backward classes.' 
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0a0f18] text-gray-300 flex flex-col flex-shrink-0 min-h-screen">
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
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-end px-8 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <a href="/clauses" className="text-sm font-medium text-gray-500 hover:text-gray-900">View site</a>
            <div className="w-8 h-8 rounded-full bg-[#0a0f18] text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Clauses</h2>
              <p className="text-sm text-gray-500">Sub-clauses inside Articles. Pick an Article to add or edit clauses.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0">
              <Plus className="w-5 h-5" />
              New Clause
            </button>
          </div>

          {/* Grouped Card Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Custom Card Header for the Article */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
              <div>
                <p className="text-[#f59e0b] text-[10px] font-bold tracking-widest uppercase mb-1">Article 15</p>
                <h3 className="text-lg font-semibold text-gray-900">Prohibition of discrimination</h3>
              </div>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                3 clauses
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-100 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-24">Clause</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Text</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right w-32">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {clausesData.map((clause, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900 align-top pt-6">{clause.id}</td>
                      <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed pr-10">{clause.text}</td>
                      <td className="px-6 py-5 align-top pt-6">
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