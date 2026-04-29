"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, UserPlus, Search, Pencil, Trash2, Ban, ShieldCheck, X, Check,
  Bell
} from 'lucide-react';

export default function UsersPage() {
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
    { name: 'Users', icon: Users, active: true, href: '/users' }, // Active!
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Alerts', icon: Bell, active: false, href: '/alerts', badge: openCount }, // Badge added here!
    { name: 'Activity Logs', icon: ShieldCheck, active: false, href: '/activity-logs' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  // Upgraded mock data with unique IDs
  const [usersList, setUsersList] = useState([
    { uid: 'u1', initials: 'AS', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'User', status: 'Active', joined: 'Mar 2025' },
    { uid: 'u2', initials: 'PI', name: 'Priya Iyer', email: 'priya@example.com', role: 'User', status: 'Active', joined: 'Feb 2025' },
    { uid: 'u3', initials: 'RM', name: 'Rohan Mehta', email: 'rohan@example.com', role: 'Admin', status: 'Active', joined: 'Jan 2025' },
    { uid: 'u4', initials: 'SR', name: 'Saanvi Rao', email: 'saanvi@example.com', role: 'User', status: 'Blocked', joined: 'Apr 2025' },
    { uid: 'u5', initials: 'KS', name: 'Kabir Singh', email: 'kabir@example.com', role: 'User', status: 'Active', joined: 'May 2025' },
  ]);

  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', role: 'User'
  });

  // --- Search Logic ---
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Helpers ---
  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getCurrentMonthYear = () => {
    const date = new Date();
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  // --- Handlers ---
  const handleOpenModal = (uid: string | null = null) => {
    if (uid !== null) {
      const userToEdit = usersList.find(u => u.uid === uid);
      if (userToEdit) {
        setFormData({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role });
        setEditingId(uid);
      }
    } else {
      setFormData({ name: '', email: '', role: 'User' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update existing user
      setUsersList(usersList.map(u => 
        u.uid === editingId 
          ? { ...u, ...formData, initials: getInitials(formData.name) } 
          : u
      ));
      showToast(`Updated user ${formData.name}`);
    } else {
      // Create new user
      const newUser = { 
        uid: Date.now().toString(),
        initials: getInitials(formData.name),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'Active', // Defaults to Active
        joined: getCurrentMonthYear()
      };
      setUsersList([newUser, ...usersList]);
      showToast(`Invited ${formData.name}`);
    }
    handleCloseModal();
  };

  const toggleStatus = (uid: string) => {
    setUsersList(usersList.map(u => {
      if (u.uid === uid) {
        const newStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        showToast(`User ${newStatus.toLowerCase()}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleDeleteClick = (uid: string) => {
    setDeleteId(uid);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      const userToDelete = usersList.find(u => u.uid === deleteId);
      setUsersList(usersList.filter(u => u.uid !== deleteId));
      if (userToDelete) showToast(`Deleted ${userToDelete.name}`);
      setDeleteId(null); 
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
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
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">People</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage users</h2>
              <p className="text-sm text-gray-500">Invite teammates, manage roles and moderate accounts.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <UserPlus className="w-5 h-5" />
              Invite user
            </button>
          </div>

          {/* Search Bar - Controlled by State */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
            />
          </div>

          {/* Conditional Rendering: Empty State vs Table */}
          {filteredUsers.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No users found</h3>
              <p className="text-sm text-gray-500">Try a different search term.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-225">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white">
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">User</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.uid} className="hover:bg-gray-50/50 transition-colors">
                        
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

                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            user.role === 'Admin' 
                              ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            user.status === 'Active'
                              ? 'bg-green-50/50 text-[#10b981] border-[#10b981]/30'
                              : 'bg-red-50/50 text-red-500 border-red-500/30'
                          }`}>
                            {user.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.joined}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-4">
                            <button 
                              onClick={() => handleOpenModal(user.uid)}
                              className="text-gray-400 hover:text-gray-900 transition-colors" 
                              aria-label="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            
                            {/* Block / Unblock Toggle */}
                            {user.status === 'Active' ? (
                              <button 
                                onClick={() => toggleStatus(user.uid)}
                                className="text-red-400 hover:text-red-600 transition-colors" 
                                aria-label="Block"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            ) : (
                              <button 
                                onClick={() => toggleStatus(user.uid)}
                                className="text-[#10b981] hover:text-green-600 transition-colors" 
                                aria-label="Unblock"
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </button>
                            )}

                            <button 
                              onClick={() => handleDeleteClick(user.uid)}
                              className="text-red-400 hover:text-red-600 transition-colors" 
                              aria-label="Delete"
                            >
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
          )}

        </div>
      </main>

      {/* ================= INVITE / EDIT USER MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? 'Edit user' : 'Invite user'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId !== null ? 'Update teammate details and permissions.' : 'Send an invite to a new teammate.'}
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <form id="user-form" onSubmit={handleSave} className="space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Full name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rohan Mehta" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="rohan@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Role</label>
                  <select 
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>

              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50 rounded-b-2xl">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="user-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? 'Save changes' : 'Send invite'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this User?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently delete the user's account and remove their access to the platform. This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e11d48] hover:bg-[#be123c] transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}