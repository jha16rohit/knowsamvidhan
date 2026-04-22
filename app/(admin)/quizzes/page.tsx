import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, List, FileText, AlignLeft, Book, 
  CalendarDays, History, GraduationCap, Users, BarChart3, 
  Settings, ShieldAlert, BookOpen, Plus, Pencil, Trash2
} from 'lucide-react';

export default function QuizzesPage() {
  // Navigation links (Quizzes is now active)
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

  // Mock data matching your screenshot perfectly
  const quizzesData = [
    { 
      level: 'Basic', 
      number: 'Q1', 
      question: 'Which Article guarantees the Right to Equality before the law?', 
      correctAnswer: 'Article 14',
      explanation: 'Article 14 guarantees equality before law and equal protection of laws.'
    },
    { 
      level: 'Basic', 
      number: 'Q2', 
      question: 'The Right to Constitutional Remedies is mentioned in which Article?', 
      correctAnswer: 'Article 32',
      explanation: 'Article 32 — called the soul of the Constitution by Dr. B. R. Ambedkar.'
    },
    { 
      level: 'Basic', 
      number: 'Q3', 
      question: "Which amendment is known as the 'Mini-Constitution'?", 
      correctAnswer: '42nd',
      explanation: 'The 42nd Amendment of 1976 made the most extensive changes ever.'
    },
    { 
      level: 'Basic', 
      number: 'Q4', 
      question: 'Directive Principles of State Policy are inspired by which country?', 
      correctAnswer: 'Ireland',
      explanation: 'Borrowed from the Constitution of Ireland.'
    },
    { 
      level: 'Basic', 
      number: 'Q5', 
      question: 'Article 21A guarantees free and compulsory education up to what age?', 
      correctAnswer: '6 to 14 years',
      explanation: 'Inserted by the 86th Amendment in 2002.'
    },
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Content</p>
              <h2 className="text-4xl font-serif text-gray-900 mb-2 font-bold">Manage quizzes</h2>
              <p className="text-sm text-gray-500">Add multiple-choice questions across Basic, Moderate and Advanced levels.</p>
            </div>
            
            <button className="bg-[#f59e0b] hover:bg-[#ea580c] text-gray-900 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm self-start md:self-auto mt-2 md:mt-0">
              <Plus className="w-5 h-5" />
              New question
            </button>
          </div>

          {/* Quiz Cards Stack */}
          <div className="flex flex-col gap-5">
            {quizzesData.map((quiz, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-3 hover:border-gray-300 transition-colors"
              >
                {/* Card Top: Badge, Number & Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-orange-50/50 text-[#f59e0b] border border-[#f59e0b]/30 rounded-full text-xs font-bold">
                      {quiz.level}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {quiz.number}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Middle: Question */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {quiz.question}
                  </h3>
                </div>

                {/* Card Bottom: Answer & Explanation */}
                <div>
                  <p className="text-sm text-gray-500">
                    Correct: <span className="text-[#10b981] font-medium">{quiz.correctAnswer}</span> · {quiz.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}