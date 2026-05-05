"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Search, Bell,
  ShieldCheck, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react';

export default function ActivityLogsPage() {
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
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount },
    { name: 'Activity Logs', icon: ShieldCheck, active: true, href: '/activity-logs' }, // New Active Tab!
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data matching your screenshots
  const initialLogs = [
    { id: 1, status: 'ok', timestamp: 'Apr 28 20:52:10', action: 'VIEW_EVENT', path: '/events/tech-fest-2025', details: 'student61872+3@tempmail.io' },
    { id: 2, status: 'error', timestamp: 'Apr 28 20:43:10', action: 'SQL_PROBE', path: '/api/login', details: 'ishaan.sharma@college.in — Blocked by security rules' },
    { id: 3, status: 'warning', timestamp: 'Apr 28 20:38:10', action: 'RATE_LIMITED', path: '/api/search', details: 'scanner@xyz123.io' },
    { id: 4, status: 'error', timestamp: 'Apr 28 20:36:10', action: 'FAILED_LOGIN', path: '/auth/login', details: 'mia.rao@eclearnix.edu — Blocked by security rules' },
    { id: 5, status: 'ok', timestamp: 'Apr 28 19:21:10', action: 'PAYMENT', path: '/pay/checkout', details: 'student61872+3@tempmail.io' },
    { id: 6, status: 'ok', timestamp: 'Apr 28 19:15:10', action: 'API_CALL', path: '/api/users', details: 'noah.khan@gmail.com' },
    { id: 7, status: 'ok', timestamp: 'Apr 28 18:56:10', action: 'PASSWORD_RESET', path: '/auth/reset', details: 'liam.mehta@college.in' },
    { id: 8, status: 'ok', timestamp: 'Apr 28 18:53:10', action: 'UPDATE_PROFILE', path: '/profile', details: 'ishaan.bose@outlook.com' },
    { id: 9, status: 'warning', timestamp: 'Apr 28 18:06:10', action: 'RATE_LIMITED', path: '/api/search', details: 'rahul.verma@gmail.com' },
    { id: 10, status: 'ok', timestamp: 'Apr 28 16:47:10', action: 'PASSWORD_RESET', path: '/auth/reset', details: 'kabir.khan@college.in' },
    { id: 11, status: 'ok', timestamp: 'Apr 28 16:27:10', action: 'ENROLL_COURSE', path: '/courses/ml-101', details: 'liam.mehta@college.in' },
    { id: 12, status: 'ok', timestamp: 'Apr 28 16:24:10', action: 'UPDATE_PROFILE', path: '/profile', details: 'mia.reddy@gmail.com' },
    { id: 13, status: 'warning', timestamp: 'Apr 28 15:59:10', action: 'RATE_LIMITED', path: '/api/search', details: 'kabir.reddy@gmail.com' },
    { id: 14, status: 'warning', timestamp: 'Apr 28 14:01:10', action: 'RATE_LIMITED', path: '/api/search', details: 'tara.sharma@college.in' },
    { id: 15, status: 'error', timestamp: 'Apr 28 13:57:10', action: 'SQL_PROBE', path: '/api/login', details: 'ishaan.bose@outlook.com — Blocked by security rules' },
    { id: 16, status: 'error', timestamp: 'Apr 28 13:41:10', action: 'SQL_PROBE', path: '/api/login', details: 'kabir.verma@outlook.com — Blocked by security rules' },
    { id: 17, status: 'error', timestamp: 'Apr 28 13:40:10', action: 'FAILED_LOGIN', path: '/auth/login', details: 'sneha.k@college.in — Blocked by security rules' },
  ];

  type FilterType = 'All' | 'Ok' | 'Warning' | 'Error';

  // States for interactive filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  // Filter Logic: Combines Search input AND Tab selections
  const filteredLogs = initialLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilter = 
      activeFilter === 'All' || 
      (activeFilter === 'Ok' && log.status === 'ok') ||
      (activeFilter === 'Warning' && log.status === 'warning') ||
      (activeFilter === 'Error' && log.status === 'error');

    return matchesSearch && matchesFilter;
  });

  // Helpers for Icon and Text Rendering
  const getStatusIcon = (status: string) => {
    if (status === 'ok') return <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981]" />;
    if (status === 'warning') return <AlertTriangle className="w-4.5 h-4.5 text-[#d97706]" />;
    return <XCircle className="w-4.5 h-4.5 text-[#ef4444]" />;
  };

  const getStatusBg = (status: string) => {
    if (status === 'ok') return 'bg-[#10b981]/10';
    if (status === 'warning') return 'bg-[#f59e0b]/10';
    return 'bg-[#ef4444]/10';
  };

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

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2 custom-scrollbar">
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

        <div className="p-4 m-4 bg-[#141b2d] rounded-xl border border-gray-800 relative shrink-0">
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
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-indigo-600 text-[11px] font-bold tracking-widest uppercase mb-2">Audit Trail</p>
            <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Activity Logs</h2>
            <p className="text-sm text-gray-500">Full record of platform actions — searchable, exportable, retained for 90 days.</p>
          </div>

          {/* Controls: Search and Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            
            {/* Search Bar */}
            <div className="relative w-full md:max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search action, resource, user..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm text-gray-800 shadow-sm"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm shrink-0 w-full md:w-auto overflow-x-auto">
              {['All', 'Ok', 'Warning', 'Error'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as FilterType)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Logs List Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-225">
                <tbody className="divide-y divide-gray-100">
                  
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                        No logs found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                        
                        {/* Status Icon */}
                        <td className="pl-6 py-4 w-12">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusBg(log.status)}`}>
                            {getStatusIcon(log.status)}
                          </div>
                        </td>

                        {/* Timestamp */}
                        <td className="px-4 py-4 w-48 text-[13px] font-mono text-gray-600">
                          {log.timestamp}
                        </td>

                        {/* Action Type */}
                        <td className={`px-4 py-4 w-48 text-[13px] font-bold tracking-wider ${
                          log.status === 'error' ? 'text-[#ef4444]' : 'text-gray-900'
                        }`}>
                          {log.action}
                        </td>

                        {/* Path/Resource */}
                        <td className="px-4 py-4 w-56 text-[13px] font-mono text-indigo-600">
                          {log.path}
                        </td>

                        {/* Details/User */}
                        <td className="pr-6 py-4 text-[13.5px] text-gray-600 font-mono tracking-tight">
                          {log.details}
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}