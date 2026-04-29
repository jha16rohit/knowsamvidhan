"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, List, FileText, AlignLeft, Book,
  CalendarDays, History, GraduationCap, Users, BarChart3,
  Settings, AlertCircle, TrendingUp, Clock, BookOpen, ShieldAlert,
  Bell, ShieldCheck, LogOut,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  name: string;
  icon: React.ElementType;
  active: boolean;
  href: string;
  badge?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin-xyz');
  };

  // Simulated open alerts count for the prototype
  const openCount = 4;

  const navItems: NavItem[] = [
    { name: 'Dashboard',     icon: LayoutDashboard, active: true,  href: '/ad-dashboard'  },
    { name: 'Parts',         icon: List,            active: false, href: '/parts'         },
    { name: 'Articles',      icon: FileText,        active: false, href: '/articles'      },
    { name: 'Clauses',       icon: AlignLeft,       active: false, href: '/clauses'       },
    { name: 'Preamble',      icon: Book,            active: false, href: '/preamble'      },
    { name: 'Schedules',     icon: CalendarDays,    active: false, href: '/schedules'     },
    { name: 'Amendments',    icon: History,         active: false, href: '/amendments'    },
    { name: 'Quizzes',       icon: GraduationCap,   active: false, href: '/quizzes'       },
    { name: 'Users',         icon: Users,           active: false, href: '/users'         },
    { name: 'Analytics',     icon: BarChart3,       active: false, href: '/analytics'     },
    { name: 'Alerts',        icon: Bell,            active: false, href: '/alerts', badge: openCount },
    { name: 'Activity Logs', icon: ShieldCheck,     active: false, href: '/activity-logs' },
    { name: 'Settings',      icon: Settings,        active: false, href: '/settings'      },
  ];

  const chartBars = [15, 45, 25, 35, 75, 25, 40, 85, 45, 60, 25, 45, 35, 70];
  const days = ['W1·M', 'T', 'W', 'T', 'F', 'S', 'S', 'W2·M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f18] text-gray-300 flex flex-col shrink-0 min-h-screen">

        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#c19d60] rounded-full flex items-center justify-center">
            <BookOpen className="text-[#c19d60] w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm tracking-wide">KnowSamvidhan</h1>
            <p className="text-[6px] tracking-[0.25em] text-gray-400 mt-0.5">CONSTITUTION · LEARN · MASTER</p>
          </div>
        </div>

        {/* Navigation */}
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
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-[#f59e0b]' : 'text-gray-500'}`} />
                {item.name}
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-[#ef4444] text-white flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 min-w-5 h-5">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full text-left mt-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>

        {/* Bottom Warning Widget */}
        <div className="p-4 m-4 bg-[#141b2d] rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-[10px] font-bold tracking-wider uppercase">Admin</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">
            You&apos;re managing live content.<br />Edit with care.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">

          {/* Page Title */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Overview</p>
            <h2 className="text-3xl font-serif text-gray-900 mb-1">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">Platform health at a glance — users, content and engagement.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Total Users</p>
                <Users className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">12,840</h3>
                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.2%
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Articles</p>
                <BookOpen className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">395</h3>
                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +3
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Amendments</p>
                <Clock className="w-5 h-5 text-gray-800" />
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">106</h3>
                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +1
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Quizzes</p>
                <GraduationCap className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">248</h3>
                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12
                </span>
              </div>
            </div>
          </div>

          {/* Chart & Pending Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-serif font-bold text-gray-900">Daily active users</h3>
                <span className="px-3 py-1 bg-orange-50 text-[#d97706] text-[10px] font-bold rounded-full border border-orange-100">
                  Last 14 days
                </span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 px-2">
                {chartBars.map((height, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-3 group h-full justify-end">
                    <div
                      className="w-full bg-linear-to-t from-[#f97316] to-[#fbbf24] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center px-2 mt-4">
                {days.map((day, i) => (
                  <span key={i} className="text-[9px] font-bold text-gray-400 w-full text-center">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Pending updates</h3>
              <div className="space-y-3 flex-1">
                {[
                  'Review AI explanation for Article 32',
                  'Approve new 105th amendment entry',
                  '5 user reports awaiting triage',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer">
                    <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">Most read articles</h3>
              <div className="space-y-4">
                {[
                  { label: 'Article 21', sub: 'Right to life',           count: '8,420' },
                  { label: 'Article 14', sub: 'Equality before law',     count: '6,210' },
                  { label: 'Article 19', sub: 'Six freedoms',            count: '5,870' },
                  { label: 'Article 32', sub: 'Constitutional remedies', count: '4,310' },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`flex justify-between items-center ${i < arr.length - 1 ? 'pb-3 border-b border-gray-50' : ''}`}>
                    <span className="text-sm text-gray-800 font-medium">
                      {row.label} <span className="text-gray-400 font-normal ml-1">— {row.sub}</span>
                    </span>
                    <span className="text-sm font-bold text-[#d97706]">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">Top quizzes</h3>
              <div className="space-y-4">
                {[
                  { label: 'Fundamental Rights', sub: 'Basic',    count: '3,120' },
                  { label: 'Amendments timeline', sub: 'Moderate', count: '2,480' },
                  { label: 'Landmark cases',      sub: 'Advanced', count: '1,740' },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`flex justify-between items-center ${i < arr.length - 1 ? 'pb-3 border-b border-gray-50' : ''}`}>
                    <span className="text-sm text-gray-800 font-medium">
                      {row.label} <span className="text-gray-400 font-normal ml-1">— {row.sub}</span>
                    </span>
                    <span className="text-sm font-bold text-[#10b981]">{row.count}</span>
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