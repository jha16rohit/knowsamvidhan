import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, UserPlus, Search, Pencil, Trash2, Ban, ShieldCheck
} from 'lucide-react';

export default function UsersPage() {
  // Navigation links (Users is now active)
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: false, href: '/quizzes' },
    { name: 'Users', icon: Users, active: true, href: '/users' }, // Active!
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Mock data matching your screenshot perfectly
  const usersData = [
    { initials: 'AS', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'User', status: 'Active', joined: 'Mar 2025' },
    { initials: 'PI', name: 'Priya Iyer', email: 'priya@example.com', role: 'User', status: 'Active', joined: 'Feb 2025' },
    { initials: 'RM', name: 'Rohan Mehta', email: 'rohan@example.com', role: 'Admin', status: 'Active', joined: 'Jan 2025' },
    { initials: 'SR', name: 'Saanvi Rao', email: 'saanvi@example.com', role: 'User', status: 'Blocked', joined: 'Apr 2025' },
    { initials: 'KS', name: 'Kabir Singh', email: 'kabir@example.com', role: 'User', status: 'Active', joined: 'May 2025' },
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">People</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage users</h2>
              <p className="text-sm text-gray-500">Invite teammates, manage roles and moderate accounts.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0">
              <UserPlus className="w-5 h-5" />
              Invite user
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-225">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">User</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {usersData.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      
                      {/* User Info with Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {user.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Dynamic Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user.role === 'Admin' 
                            ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Dynamic Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user.status === 'Active'
                            ? 'bg-green-50/50 text-[#10b981] border-[#10b981]/30'
                            : 'bg-red-50/50 text-red-500 border-red-500/30'
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.joined}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <button className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          
                          {/* Block / Unblock Toggle */}
                          {user.status === 'Active' ? (
                            <button className="text-red-400 hover:text-red-600 transition-colors" aria-label="Block">
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="text-[#10b981] hover:text-green-600 transition-colors" aria-label="Unblock">
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                          )}

                          <button className="text-red-400 hover:text-red-600 transition-colors" aria-label="Delete">
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