"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Save,
  Bell, ShieldCheck
} from 'lucide-react';

export default function PreamblePage() {
  // Simulated open alerts count for the prototype
  const openCount = 4;

  // Navigation links (Preamble is now active)
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: true, href: '/preamble' }, // Active!
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data for the keywords list
  const keywords = [
    { word: 'Justice', definition: 'Social, economic and political fairness for every citizen.' },
    { word: 'Liberty', definition: 'Freedom of thought, expression, belief, faith and worship.' },
    { word: 'Equality', definition: 'Equal status and opportunity, regardless of background.' },
    { word: 'Fraternity', definition: 'A sense of brotherhood that protects dignity and national unity.' },
    { word: 'Sovereign', definition: 'India is independent and free from external control.' },
    { word: 'Socialist', definition: 'Commitment to social and economic equality.' },
    { word: 'Secular', definition: 'The State has no official religion and treats all faiths equally.' },
    { word: 'Democratic', definition: 'Government of, by and for the people through elected representatives.' },
    { word: 'Republic', definition: 'Head of State is elected, not hereditary.' },
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Preamble Content</h2>
              <p className="text-sm text-gray-500">Edit the foundational Preamble page shown to learners.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto">
              <Save className="w-5 h-5" />
              Save changes
            </button>
          </div>

          {/* Two Column Layout for Forms */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Left Column: Text Areas */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6">
              
              {/* Official Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Official text</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  rows={8}
                  defaultValue="WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION."
                />
              </div>

              {/* Simple Explanation */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Simple explanation</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  rows={5}
                  defaultValue="The Preamble is the soul and identity card of the Indian Constitution. It declares the source of authority (the people), the nature of the State (sovereign, socialist, secular, democratic, republican), the objectives (justice, liberty, equality, fraternity), and the date of adoption."
                />
              </div>

              {/* Why it matters */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Why it matters</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-700 shadow-sm resize-y"
                  rows={4}
                  defaultValue="Though not enforceable in court, the Preamble guides the interpretation of the Constitution. The Supreme Court has held that the Preamble is part of the Constitution and reflects its basic structure."
                />
              </div>

            </div>

            {/* Right Column: Keywords */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Keywords</h3>
              
              <div className="flex-1 space-y-3">
                {keywords.map((kw, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      defaultValue={kw.word}
                      className="w-full sm:w-1/3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                    <input 
                      type="text" 
                      defaultValue={kw.definition}
                      className="w-full sm:w-2/3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-600 shadow-sm"
                    />
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center gap-2">
                Add keyword
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}