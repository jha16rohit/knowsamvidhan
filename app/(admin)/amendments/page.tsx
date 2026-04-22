import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2
} from 'lucide-react';

export default function AmendmentsPage() {
  // Navigation links (Amendments is now active)
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: true, href: '/amendments' }, // Active!
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data matching your screenshot perfectly
  const amendmentsData = [
    { 
      year: '1951', 
      title: '1st — First Amendment', 
      description: 'Added the Ninth Schedule to protect land reform laws and modified Articles 15 and 19.' 
    },
    { 
      year: '1976', 
      title: "42nd — The 'Mini-Constitution'", 
      description: 'Added the words Socialist, Secular and Integrity to the Preamble; introduced Fundamental Duties.' 
    },
    { 
      year: '1978', 
      title: '44th — Restoration of Rights', 
      description: "Reversed many of the 42nd Amendment's changes; right to property removed from Fundamental Rights." 
    },
    { 
      year: '1992', 
      title: '73rd — Panchayati Raj', 
      description: 'Constitutional status to Panchayats; created a three-tier system of local self-government.' 
    },
    { 
      year: '2002', 
      title: '86th — Right to Education', 
      description: 'Made elementary education a fundamental right under Article 21A.' 
    },
    { 
      year: '2016', 
      title: '101st — Goods and Services Tax', 
      description: 'Introduced GST, replacing a web of indirect taxes with a unified national tax.' 
    },
    { 
      year: '2019', 
      title: '103rd — EWS Reservation', 
      description: '10% reservation in education and employment for Economically Weaker Sections among general category.' 
    },
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage amendments</h2>
              <p className="text-sm text-gray-500">Curate the timeline of constitutional amendments.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0">
              <Plus className="w-5 h-5" />
              New amendment
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {amendmentsData.map((amendment, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 hover:border-gray-300 transition-colors"
              >
                {/* Card Top: Year Pill & Actions */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider">
                    {amendment.year}
                  </span>
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content: Title & Description */}
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {amendment.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {amendment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}