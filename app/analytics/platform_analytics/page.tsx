import React from 'react';
import AdminSidebar from "@/components/admin_sidebar";

export default function AnalyticsPage() {
  // Mock data for the stat cards
  const stats = [
    { label: 'DAU', value: '3,420', change: '+12%' },
    { label: 'QUIZ COMPLETION', value: '78%', change: '+4%' },
    { label: 'RETENTION (7D)', value: '62%', change: '+1.8%' },
    { label: 'AVG SESSION', value: '8m 12s', change: '+22s' },
  ];

  // Mock data for AI Questions
  const aiQuestions = [
    'Difference between Fundamental Rights and DPSP?',
    'Explain Article 21 with examples',
    'Which country inspired the Preamble?',
    'What is the basic structure doctrine?',
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <AdminSidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">Insights</p>
            <h2 className="text-4xl font-serif text-gray-900 font-bold">Analytics</h2>
          </div>

          {/* Top Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-4">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  {stat.label}
                </p>
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-serif text-gray-900 font-bold leading-none">
                    {stat.value}
                  </h3>
                  <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 rounded-full text-[10px] font-bold tracking-wider">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid: Chart & Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Engagement Trend Chart */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-87.5">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-8">Engagement trend</h3>
              
              {/* Custom SVG Wave Chart */}
              <div className="flex-1 w-full relative mt-auto">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-48 absolute bottom-0">
                  <defs>
                    <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* The filled gradient area */}
                  <path 
                    d="M0,30 C20,10 40,40 60,20 C80,0 90,10 100,10 L100,40 L0,40 Z" 
                    fill="url(#waveGradient)" 
                  />
                  
                  {/* The solid orange line */}
                  <path 
                    d="M0,30 C20,10 40,40 60,20 C80,0 90,10 100,10" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="0.8" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Most Asked AI Questions */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">Most asked AI questions</h3>
              
              <div className="space-y-4">
                {aiQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-orange-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-50 text-[#d97706] flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {question}
                    </span>
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