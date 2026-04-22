import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2
} from 'lucide-react';

export default function SchedulesPage() {
  // Navigation links (Schedules is now active)
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: true, href: '/schedules' }, // Active!
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data matching your screenshot perfectly
  const schedulesData = [
    { id: '1st', schedule: 'First Schedule', title: 'States and Union Territories', topics: ['States', 'Union Territories', 'Territory'] },
    { id: '2nd', schedule: 'Second Schedule', title: 'Salaries and Allowances', topics: ['President', 'Governor', 'Judges'] },
    { id: '3rd', schedule: 'Third Schedule', title: 'Forms of Oaths and Affirmations', topics: ['Oaths', 'Constitutional Officers'] },
    { id: '4th', schedule: 'Fourth Schedule', title: 'Allocation of Rajya Sabha Seats', topics: ['Rajya Sabha', 'Federalism'] },
    { id: '5th', schedule: 'Fifth Schedule', title: 'Scheduled Areas and Tribes', topics: ['Tribal Areas', 'Administration'] },
    { id: '6th', schedule: 'Sixth Schedule', title: 'Tribal Areas of the North-East', topics: ['North-East', 'Autonomy'] },
    { id: '7th', schedule: 'Seventh Schedule', title: 'Union, State and Concurrent Lists', topics: ['Federalism', 'Lists', 'Powers'] },
    { id: '8th', schedule: 'Eighth Schedule', title: 'Recognised Languages', topics: ['Languages', 'Culture'] },
    { id: '9th', schedule: 'Ninth Schedule', title: 'Validation of Land Reform Laws', topics: ['Land Reform', 'Judicial Review'] },
    { id: '10th', schedule: 'Tenth Schedule', title: 'Anti-Defection Law', topics: ['Anti-Defection', 'Politics'] },
    { id: '11th', schedule: 'Eleventh Schedule', title: 'Powers of Panchayats', topics: ['Panchayats', 'Local Government'] },
    { id: '12th', schedule: 'Twelfth Schedule', title: 'Powers of Municipalities', topics: ['Municipalities', 'Urban Government'] },
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
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Schedules</h2>
              <p className="text-sm text-gray-500">Twelve Schedules of the Constitution — lists, forms and tables.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto">
              <Plus className="w-5 h-5" />
              New Schedule
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-250">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-16">#</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-48">Schedule</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Topics</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {schedulesData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.schedule}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {row.topics.map((topic, tIndex) => (
                            <span 
                              key={tIndex} 
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold tracking-wide"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
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