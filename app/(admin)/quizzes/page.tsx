"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2, X, Check
} from 'lucide-react';

export default function QuizzesPage() {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false, href: '/ad-dashboard' },
    { name: 'Parts', icon: List, active: false, href: '/parts' },
    { name: 'Articles', icon: FileText, active: false, href: '/articles' },
    { name: 'Clauses', icon: AlignLeft, active: false, href: '/clauses' },
    { name: 'Preamble', icon: Book, active: false, href: '/preamble' },
    { name: 'Schedules', icon: CalendarDays, active: false, href: '/schedules' },
    { name: 'Amendments', icon: History, active: false, href: '/amendments' },
    { name: 'Quizzes', icon: GraduationCap, active: true, href: '/quizzes' }, // Active!
    { name: 'Users', icon: Users, active: false, href: '/users' },
    { name: 'Analytics', icon: BarChart3, active: false, href: '/analytics' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  const availableArticles = [
    'None',
    'Article 14 — Equality before law',
    'Article 15 — Prohibition of discrimination',
    'Article 19 — Six freedoms',
    'Article 21 — Right to life and personal liberty',
    'Article 32 — Right to constitutional remedies',
  ];

  // Upgraded data structure to support the 4 options and radio button logic
  const [quizzes, setQuizzes] = useState([
    { 
      uid: 'q1',
      number: 'Q1',
      level: 'Basic', 
      linkedArticle: 'Article 14 — Equality before law',
      question: 'Which Article guarantees the Right to Equality before the law?', 
      options: ['Article 14', 'Article 15', 'Article 19', 'Article 21'],
      correctOptionIndex: 0, // Points to 'Article 14'
      explanation: 'Article 14 guarantees equality before law and equal protection of laws.'
    },
    { 
      uid: 'q2',
      number: 'Q2',
      level: 'Basic', 
      linkedArticle: 'Article 32 — Right to constitutional remedies',
      question: 'The Right to Constitutional Remedies is mentioned in which Article?', 
      options: ['Article 30', 'Article 32', 'Article 226', 'Article 14'],
      correctOptionIndex: 1,
      explanation: 'Article 32 — called the soul of the Constitution by Dr. B. R. Ambedkar.'
    },
    { 
      uid: 'q3',
      number: 'Q3',
      level: 'Basic', 
      linkedArticle: 'None',
      question: "Which amendment is known as the 'Mini-Constitution'?", 
      options: ['42nd', '44th', '1st', '73rd'],
      correctOptionIndex: 0,
      explanation: 'The 42nd Amendment of 1976 made the most extensive changes ever.'
    }
  ]);

  // --- States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    level: 'Basic',
    linkedArticle: 'None',
    question: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: ''
  });

  // --- Handlers ---
  const handleOpenModal = (uid: string | null = null) => {
    if (uid !== null) {
      const quizToEdit = quizzes.find(q => q.uid === uid);
      if (quizToEdit) {
        setFormData({
          level: quizToEdit.level,
          linkedArticle: quizToEdit.linkedArticle,
          question: quizToEdit.question,
          options: [...quizToEdit.options],
          correctOptionIndex: quizToEdit.correctOptionIndex,
          explanation: quizToEdit.explanation
        });
        setEditingId(uid);
      }
    } else {
      setFormData({
        level: 'Basic',
        linkedArticle: 'None',
        question: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        explanation: ''
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update existing
      setQuizzes(quizzes.map(q => q.uid === editingId ? { ...formData, uid: editingId, number: q.number } : q));
      showToast(`Updated question`);
    } else {
      // Create new (auto-generates the Q number based on array length)
      const newQuiz = { 
        ...formData, 
        uid: Date.now().toString(),
        number: `Q${quizzes.length + 1}` 
      };
      setQuizzes([...quizzes, newQuiz]); // Appends to the end
      showToast(`Created new question`);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (uid: string) => {
    setDeleteId(uid);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setQuizzes(quizzes.filter(q => q.uid !== deleteId));
      showToast(`Deleted question`);
      setDeleteId(null); 
      // Note: In a real app, you might want to recalculate the 'Q#' for all remaining items here.
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
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage quizzes</h2>
              <p className="text-sm text-gray-500">Add multiple-choice questions across Basic, Moderate and Advanced levels.</p>
            </div>
            
            <button 
              onClick={() => handleOpenModal(null)}
              className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              New question
            </button>
          </div>

          {quizzes.length === 0 ? (
            <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-24 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">No questions found</h3>
              <p className="text-sm text-gray-500">Click "New question" to create one.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.uid} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-3 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 border rounded-full text-xs font-bold ${
                        quiz.level === 'Basic' ? 'bg-orange-50/50 text-[#f59e0b] border-[#f59e0b]/30' :
                        quiz.level === 'Moderate' ? 'bg-blue-50/50 text-blue-600 border-blue-600/30' :
                        'bg-purple-50/50 text-purple-600 border-purple-600/30'
                      }`}>
                        {quiz.level}
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        {quiz.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleOpenModal(quiz.uid)}
                        className="text-gray-400 hover:text-gray-900 transition-colors" 
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(quiz.uid)}
                        className="text-red-400 hover:text-red-600 transition-colors" 
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {quiz.question}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Correct: <span className="text-[#10b981] font-medium">{quiz.options[quiz.correctOptionIndex]}</span> · {quiz.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:px-8 md:pt-8 md:pb-4 border-b border-gray-100 flex justify-between items-start flex-shrink-0">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {editingId !== null ? 'Edit question' : 'New question'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Pick a level, write the question and four options, and mark the correct answer.
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <form id="quiz-form" onSubmit={handleSave} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Level</label>
                    <select 
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-[#f59e0b] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/50 text-sm text-gray-800 shadow-sm appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                    >
                      <option>Basic</option>
                      <option>Moderate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Linked article (optional)</label>
                    <select 
                      value={formData.linkedArticle}
                      onChange={(e) => setFormData({...formData, linkedArticle: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                    >
                      {availableArticles.map(art => (
                        <option key={art} value={art}>{art}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Question</label>
                  <textarea 
                    required
                    rows={2}
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Options & correct answer</label>
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="correctOption" 
                          checked={formData.correctOptionIndex === index}
                          onChange={() => setFormData({...formData, correctOptionIndex: index})}
                          className="w-5 h-5 text-[#0f172a] focus:ring-[#0f172a] border-gray-300 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          required
                          placeholder={`Option ${index + 1}`}
                          value={formData.options[index]}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-1 text-sm shadow-sm transition-colors ${
                            formData.correctOptionIndex === index 
                              ? 'border-[#0f172a] focus:ring-[#0f172a] text-[#0f172a] font-medium' 
                              : 'border-gray-200 focus:border-[#f59e0b] focus:ring-[#f59e0b] text-gray-800'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Explanation</label>
                  <textarea 
                    required
                    rows={2}
                    value={formData.explanation}
                    onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] text-sm text-gray-800 shadow-sm resize-y"
                  />
                </div>

              </form>
            </div>

            <div className="p-6 md:px-8 md:py-5 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50 rounded-b-2xl">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="quiz-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-[#f59e0b] hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                {editingId !== null ? 'Save Changes' : 'Create question'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Delete this Question?
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              This will permanently remove the question from the quiz bank. This action cannot be undone.
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