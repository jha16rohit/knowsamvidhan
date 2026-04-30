"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, ShieldCheck, BookOpen, Check, Bell, Activity, Bot
} from 'lucide-react';

export default function AlertsPage() {
  // 1. Define state and data first so we can calculate the counts
  const [alerts, setAlerts] = useState([
    { 
      id: 'al1', 
      status: 'open',
      iconType: 'critical-activity', 
      severity: 'CRITICAL', 
      title: 'Impossible travel detected', 
      desc: 'Logins from Mumbai and Moscow within 6 minutes — geographically impossible.', 
      meta: 'rahul.verma@gmail.com • 27 minutes ago' 
    },
    { 
      id: 'al2', 
      status: 'open',
      iconType: 'high-shield', 
      severity: 'HIGH', 
      title: 'Brute-force attempt', 
      desc: '47 failed login attempts in 30 minutes from rotating IPs.', 
      meta: 'sneha.k@college.in • about 1 hour ago' 
    },
    { 
      id: 'al3', 
      status: 'open',
      iconType: 'high-bot', 
      severity: 'HIGH', 
      title: 'Burst signup pattern', 
      desc: '8 accounts created in 60 seconds from IP 41.203.77.4 (disposable domain).', 
      meta: '• about 1 hour ago' 
    },
    { 
      id: 'al4', 
      status: 'open',
      iconType: 'med-bot', 
      severity: 'MEDIUM', 
      title: '6 likely bot accounts', 
      desc: 'Disposable email domains + headless browser fingerprints flagged for review.', 
      meta: '• about 1 hour ago' 
    },
    { 
      id: 'al5', 
      status: 'resolved',
      iconType: 'high-shield', 
      severity: 'HIGH', 
      title: 'Multiple password resets', 
      desc: '5 password reset requests for admin accounts within 10 minutes.', 
      meta: 'admin.ops@example.com • 2 hours ago' 
    },
    { 
      id: 'al6', 
      status: 'resolved',
      iconType: 'med-bot', 
      severity: 'MEDIUM', 
      title: 'Suspicious API volume', 
      desc: 'High rate of read requests from a single token.', 
      meta: 'dev.team@example.com • 1 day ago' 
    },
  ]);

  const [activeTab, setActiveTab] = useState<'open' | 'resolved' | 'all'>('open');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 2. Calculate the counts dynamically based on the state
  const openCount = alerts.filter(a => a.status === 'open').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;
  const allCount = alerts.length;

  // 3. Define the Navigation, passing the openCount to the Alerts tab!
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
    { name: 'Alerts', icon: Bell, active: true, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Filtered List based on active tab
  const displayedAlerts = alerts.filter(alert => {
    if (activeTab === 'all') return true;
    return alert.status === activeTab;
  });

  // Action: Resolve an alert
  const handleResolve = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ));
    showToast("Alert resolved successfully");
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to render the correct icon
  const renderIcon = (type: string) => {
    switch(type) {
      case 'critical-activity':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-700">
            <Activity className="w-6 h-6 text-white" />
          </div>
        );
      case 'high-shield':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
        );
      case 'high-bot':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
            <Bot className="w-6 h-6 text-red-500" />
          </div>
        );
      case 'med-bot':
        return (
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
            <Bot className="w-6 h-6 text-orange-500" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
            <Bell className="w-6 h-6 text-gray-500" />
          </div>
        );
    }
  };

  // Helper to render the correct badge style
  const renderBadge = (severity: string) => {
    if (severity === 'CRITICAL') {
      return <span className="px-2.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold tracking-wider uppercase ml-3">CRITICAL</span>;
    }
    if (severity === 'HIGH') {
      return <span className="px-2.5 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-[10px] font-bold tracking-wider uppercase ml-3">HIGH</span>;
    }
    if (severity === 'MEDIUM') {
      return <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-full text-[10px] font-bold tracking-wider uppercase ml-3">MEDIUM</span>;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      
      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-60 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toastMessage}</span>
        </div>
      )}

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
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.active ? 'text-[#f59e0b]' : 'text-gray-500'}`} />
                {item.name}
              </div>
              
              {/* Dynamic Notification Badge rendering right here! */}
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
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-indigo-600 text-[11px] font-bold tracking-widest uppercase mb-2">Threat Intelligence</p>
            <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Security Alerts</h2>
            <p className="text-sm text-gray-500">AI-flagged events requiring review. Resolve once investigated.</p>
          </div>

          {/* Segmented Control / Tabs */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1.5 w-max mb-6 shadow-sm">
            <button 
              onClick={() => setActiveTab('open')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'open' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Open ({openCount})
            </button>
            <button 
              onClick={() => setActiveTab('resolved')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'resolved' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              All ({allCount})
            </button>
          </div>

          {/* Alerts List */}
          <div className="flex flex-col gap-4 max-w-7xl">
            {displayedAlerts.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
                <p className="text-gray-900 font-semibold">No alerts here</p>
                <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
              </div>
            ) : (
              displayedAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`bg-white p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                    alert.status === 'resolved' ? 'border-gray-200 opacity-60' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    {renderIcon(alert.iconType)}
                    
                    {/* Text Content */}
                    <div>
                      <div className="flex items-center mb-1.5">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          {alert.title}
                        </h3>
                        {/* Only show severity badge if it's still open */}
                        {alert.status === 'open' && renderBadge(alert.severity)}
                      </div>
                      
                      <p className="text-[13px] text-gray-600 mb-2 leading-relaxed">
                        {alert.desc}
                      </p>
                      
                      <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                        {alert.meta}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 flex items-center md:self-center">
                    {alert.status === 'open' ? (
                      <button 
                        onClick={() => handleResolve(alert.id)}
                        className="px-5 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="px-4 py-1.5 bg-gray-50 text-gray-500 text-sm font-semibold rounded-xl border border-transparent flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

    </div>
  );
}