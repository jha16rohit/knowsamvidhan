import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen,
  Bell, ShieldCheck
} from 'lucide-react';

export default function AnalyticsPage() {
  // Simulated open alerts count for the prototype
  const openCount = 4;
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: true, href: '/analytics' }, // Active!
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data for the stat cards
  const stats = [
    { label: 'DAU', value: '3,420', change: '+12%' },
    { label: 'QUIZ COMPLETION', value: '78%', change: '+4%' },
    { label: 'RETENTION (7D)', value: '62%', change: '+1.8%' },
    { label: 'AVG SESSION', value: '8m 12s', change: '+22s' },
  ];

  // Mock data for AI Questions
  const aiQuestions = [
    'Difference between Fundamental Rights and DPSP?',
    'Explain Article 21 with examples',
    'Which country inspired the Preamble?',
    'What is the basic structure doctrine?',
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
            You&apos;re managing live content.<br />Edit with care.
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Insights</p>
            <h2 className="text-4xl font-serif text-gray-900 font-bold">Analytics</h2>
          </div>

          {/* Top Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-4">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  {stat.label}
                </p>
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-serif text-gray-900 font-bold leading-none">
                    {stat.value}
                  </h3>
                  <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid: Chart & Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Engagement Trend Chart */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-87.5">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-8">Engagement trend</h3>
              
              {/* Custom SVG Wave Chart */}
              <div className="flex-1 w-full relative mt-auto">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-48 absolute bottom-0">
                  <defs>
                    <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* The filled gradient area */}
                  <path 
                    d="M0,30 C20,10 40,40 60,20 C80,0 90,10 100,10 L100,40 L0,40 Z" 
                    fill="url(#waveGradient)" 
                  />
                  
                  {/* The solid orange line */}
                  <path 
                    d="M0,30 C20,10 40,40 60,20 C80,0 90,10 100,10" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="0.8" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Most Asked AI Questions */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Most asked AI questions</h3>
              
              <div className="space-y-4">
                {aiQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-orange-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-50 text-[#d97706] flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {question}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}