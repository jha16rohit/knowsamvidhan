"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check
} from 'lucide-react';

export default function SchedulesPage() {
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

  // Moving mock data into State. Added 'description' to match the new form.
  const [schedules, setSchedules] = useState([
    { id: '1st', schedule: 'First Schedule', title: 'States and Union Territories', description: '', topics: ['States', 'Union Territories', 'Territory'] },
    { id: '2nd', schedule: 'Second Schedule', title: 'Salaries and Allowances', description: '', topics: ['President', 'Governor', 'Judges'] },
    { id: '3rd', schedule: 'Third Schedule', title: 'Forms of Oaths and Affirmations', description: '', topics: ['Oaths', 'Constitutional Officers'] },
    { id: '4th', schedule: 'Fourth Schedule', title: 'Allocation of Rajya Sabha Seats', description: '', topics: ['Rajya Sabha', 'Federalism'] },
    { id: '5th', schedule: 'Fifth Schedule', title: 'Scheduled Areas and Tribes', description: '', topics: ['Tribal Areas', 'Administration'] },
    { id: '6th', schedule: 'Sixth Schedule', title: 'Tribal Areas of the North-East', description: '', topics: ['North-East', 'Autonomy'] },
    { id: '7th', schedule: 'Seventh Schedule', title: 'Union, State and Concurrent Lists', description: '', topics: ['Federalism', 'Lists', 'Powers'] },
    { id: '8th', schedule: 'Eighth Schedule', title: 'Recognised Languages', description: '', topics: ['Languages', 'Culture'] },
    { id: '9th', schedule: 'Ninth Schedule', title: 'Validation of Land Reform Laws', description: '', topics: ['Land Reform', 'Judicial Review'] },
    { id: '10th', schedule: 'Tenth Schedule', title: 'Anti-Defection Law', description: '', topics: ['Anti-Defection', 'Politics'] },
    { id: '11th', schedule: 'Eleventh Schedule', title: 'Powers of Panchayats', description: '', topics: ['Panchayats', 'Local Government'] },
    { id: '12th', schedule: 'Twelfth Schedule', title: 'Powers of Municipalities', description: '', topics: ['Municipalities', 'Urban Government'] },
  ]);

  // --- States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notice 'topicsStr' - we use a string for the input box, and convert it to an array on save
  const [formData, setFormData] = useState({
    id: '', schedule: '', title: '', description: '', topicsStr: ''
  });

  // --- Handlers ---
  const handleOpenModal = (index: number | null = null) => {
    if (index !== null) {
      const sched = schedules[index];
      setFormData({
        ...sched,
        topicsStr: sched.topics.join(', ') // Convert array back to comma-separated string for the form
      });
      setEditingIndex(index);
    } else {
      setFormData({ id: '', schedule: '', title: '', description: '', topicsStr: '' });
      setEditingIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process the comma-separated string into an array of clean strings
    const processedTopics = formData.topicsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const finalData = {
      id: formData.id,
      schedule: formData.schedule,
      title: formData.title,
      description: formData.description,
      topics: processedTopics
    };

    if (editingIndex !== null) {
      const updatedSchedules = [...schedules];
      updatedSchedules[editingIndex] = finalData;
      setSchedules(updatedSchedules);
      showToast(`Updated ${finalData.schedule}`);
    } else {
      setSchedules([...schedules, finalData]);
      showToast(`Created ${finalData.schedule}`);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const deletedName = schedules[deleteIndex].schedule;
      setSchedules(schedules.filter((_, index) => index !== deleteIndex));
      setDeleteIndex(null); 
      showToast(`Deleted ${deletedName}`);
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
        <div className="fixed bottom-8 right-8 z-[60] bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Schedules</h2>
              <p className="text-sm text-gray-500">Twelve Schedules of the Constitution — lists, forms and tables.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto"
            >
              <Plus className="w-5 h-5" />
              New Schedule
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-16">#</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase w-48">Schedule</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Topics</th>
                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schedules.map((row, index) => (
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
                          <button 
                            onClick={() => handleOpenModal(index)}
                            className="text-gray-500 hover:text-gray-900 transition-colors" 
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(index)}
                            className="text-red-500 hover:text-red-700 transition-colors" 
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

        </div>
      </main>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8 pb-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    {editingIndex !== null ? 'Edit Schedule' : 'New Schedule'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingIndex !== null ? 'Update schedule details.' : 'Add a new schedule entry.'}
                  </p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form id="schedule-form" onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Short number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 7th" 
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Schedule</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Seventh Schedule" 
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Union, State and Concurrent Lists" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Short summary of this Schedule." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Topics</label>
                  <input 
                    type="text" 
                    placeholder="Comma-separated, e.g. Federalism, Lists" 
                    value={formData.topicsStr}
                    onChange={(e) => setFormData({...formData, topicsStr: e.target.value})}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 md:p-8 mt-2 flex justify-end gap-3 flex-shrink-0">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="schedule-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingIndex !== null ? 'Save Changes' : 'Create Schedule'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Schedule?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will remove the schedule from the platform. This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteIndex(null)}
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