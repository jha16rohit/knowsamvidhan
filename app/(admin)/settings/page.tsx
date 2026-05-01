"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen,
  Bell, ShieldCheck
} from 'lucide-react';

export default function SettingsPage() {
  // Simulated open alerts count for the prototype
  const openCount = 4;

  // Navigation links (Settings is now active)
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
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: true, href: '/settings' }, // Active!
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
            You're managing live content.<br />Edit with care.
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Configuration</p>
            <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Site settings</h2>
            <p className="text-sm text-gray-500">Branding, homepage copy and theme.</p>
          </div>

          <div className="flex flex-col gap-6 max-w-full">
            
            {/* Top Row: Branding & Homepage Copy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Branding Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                <h3 className="text-xl font-serif font-bold text-gray-900">Branding</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Site name</label>
                  <input 
                    type="text" 
                    defaultValue="KnowSamvidhan"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-xs text-gray-400 font-medium">
                      Logo
                    </div>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-200">
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Homepage Copy Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                <h3 className="text-xl font-serif font-bold text-gray-900">Homepage copy</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Hero heading</label>
                  <input 
                    type="text" 
                    defaultValue="Learn the Constitution of India the Smart Way"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Subtitle</label>
                  <textarea 
                    rows={3}
                    defaultValue="Search articles, ask AI doubts, practice quizzes, and master amendments with KnowSamvidhan."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Theme Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Theme</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Primary Color */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3">Primary</label>
                  <div className="flex items-center gap-3 w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#0F172A] shrink-0"></div>
                    <input 
                      type="text" 
                      defaultValue="#0F172A"
                      className="w-full focus:outline-none text-sm text-gray-800 uppercase font-medium"
                    />
                  </div>
                </div>

                {/* Saffron Color */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3">Saffron</label>
                  <div className="flex items-center gap-3 w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#F59E0B] shrink-0"></div>
                    <input 
                      type="text" 
                      defaultValue="#F59E0B"
                      className="w-full focus:outline-none text-sm text-gray-800 uppercase font-medium"
                    />
                  </div>
                </div>

                {/* Green Color */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3">Green</label>
                  <div className="flex items-center gap-3 w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] shrink-0"></div>
                    <input 
                      type="text" 
                      defaultValue="#10B981"
                      className="w-full focus:outline-none text-sm text-gray-800 uppercase font-medium"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-8 py-3.5 rounded-xl font-bold transition-colors shadow-sm">
                Save settings
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}