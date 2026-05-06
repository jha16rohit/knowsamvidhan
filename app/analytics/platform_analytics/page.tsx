"use client";
import React, { useState } from 'react';
import AdminSidebar from "@/components/admin_sidebar";
import {
  Users, UserPlus, LogIn, Eye, MessageSquare, ExternalLink,
  TrendingUp, TrendingDown, Bot, BookOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  sub?: string;
  action?: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface CardShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

// Plain interface avoids the broken TooltipProps<number,string>.payload issue in Recharts types
interface DonutTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const retentionData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  DAU: Math.floor(2800 + Math.sin(i * 0.4) * 600 + Math.random() * 200),
  MAU: Math.floor(18000 + i * 120 + Math.random() * 400),
}));

const trafficData: { name: string; value: number }[] = [
  { name: 'Organic',  value: 42 },
  { name: 'Direct',   value: 28 },
  { name: 'Referral', value: 14 },
  { name: 'Social',   value: 11 },
  { name: 'Email',    value: 5  },
];

const TRAFFIC_COLORS = ['#FF9800', '#FFA726', '#FFB74D', '#FFCC80', '#FFE0B2'];

const chatbotData = [
  { category: 'Constitution', resolved: 340, unresolved: 42 },
  { category: 'Preamble',     resolved: 210, unresolved: 18 },
  { category: 'Articles',     resolved: 480, unresolved: 67 },
  { category: 'Amendments',   resolved: 175, unresolved: 30 },
  { category: 'DPSP',         resolved: 130, unresolved: 25 },
  { category: 'FR',           resolved: 290, unresolved: 35 },
];

const quizData = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  quizzes:  Math.floor(180 + Math.random() * 120),
  avgScore: Math.floor(62  + Math.random() * 20),
}));

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, change, positive, sub, action }: StatCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
        <Icon size={18} className="text-[#FF9800]" />
      </div>
      {action && (
        <button className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#FF9800] uppercase hover:underline">
          {action} <ExternalLink size={10} />
        </button>
      )}
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
    {change !== undefined && (
      <div className={`flex items-center gap-1 text-[11px] font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        <span>{change} vs yesterday</span>
      </div>
    )}
  </div>
);

const SectionLabel = ({ children }: SectionLabelProps) => (
  <p className="text-[10px] font-bold tracking-widest text-[#FF9800] uppercase mb-1">{children}</p>
);

const CardShell = ({ title, subtitle, children, className = '' }: CardShellProps) => (
  <div className={`bg-white rounded-2xl border border-gray-200 p-6 flex flex-col ${className}`}>
    <div className="mb-5">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// Uses DonutTooltipProps (not Recharts' TooltipProps) to avoid the missing 'payload' type error
const DonutTooltip = ({ active, payload }: DonutTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow text-xs font-semibold text-gray-700">
        {payload[0].name}:{' '}
        <span className="text-[#FF9800]">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex bg-[#F5F5F5] font-sans">

      {/* ── SIDEBAR ── */}
      <AdminSidebar />

      {/* ── MAIN ── */}
      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-8 lg:px-10 space-y-8">

          {/* Header */}
          <div>
            <SectionLabel>Insights</SectionLabel>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Analytics</h2>
              <span className="text-[11px] text-gray-400 font-medium">Last updated: just now</span>
            </div>
          </div>

          {/* ── ROW 1: Executive Summary ── */}
          <section>
            <SectionLabel>Executive Summary</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
              <StatCard icon={Users}         label="Total Registered Users" value="1,24,830" sub="Cumulative all time" />
              <StatCard icon={UserPlus}      label="New Users Today"        value="384"       change="+18.2%" positive={true} />
              <StatCard icon={LogIn}         label="Active Logins Today"    value="3,420"     change="+12.0%" positive={true} />
              <StatCard icon={Eye}           label="Anonymous Visitors"     value="9,610"     sub="Guests not logged in" change="-3.4%" positive={false} />
              <StatCard icon={MessageSquare} label="Total Feedbacks"        value="6,204"     action="View All" />
            </div>
          </section>

          {/* ── ROW 2: Traffic & Retention ── */}
          <section>
            <SectionLabel>Traffic &amp; Engagement</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">

              {/* Donut Chart – Traffic Sources */}
              <CardShell title="Traffic Sources" subtitle="Distribution by acquisition channel">
                <div className="flex items-center justify-center gap-6 flex-1">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={88}
                        paddingAngle={3}
                        dataKey="value"
                        onMouseEnter={(_: unknown, index: number) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                        strokeWidth={0}
                      >
                        {trafficData.map((_, i) => (
                          <Cell
                            key={i}
                            fill={TRAFFIC_COLORS[i]}
                            opacity={activeIndex === null || activeIndex === i ? 1 : 0.5}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<DonutTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex flex-col gap-2.5">
                    {trafficData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: TRAFFIC_COLORS[i] }} />
                        <span className="text-xs text-gray-600 font-medium w-16">{item.name}</span>
                        <span className="text-xs font-bold text-gray-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardShell>

              {/* Area Chart – Retention DAU/MAU */}
              <CardShell title="User Retention" subtitle="DAU & MAU trend — last 30 days">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={retentionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF9800" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#FF9800" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB74D" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#FFB74D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#aaa' }} interval={4} />
                    <YAxis tick={{ fontSize: 9, fill: '#aaa' }} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 10, border: '1px solid #eee' }}
                      labelStyle={{ fontWeight: 700, color: '#555' }}
                    />
                    <Area type="monotone" dataKey="MAU" stroke="#FFB74D" strokeWidth={1.5} fill="url(#mauGrad)" dot={false} />
                    <Area type="monotone" dataKey="DAU" stroke="#FF9800" strokeWidth={2}   fill="url(#dauGrad)" dot={false} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardShell>
            </div>
          </section>

          {/* ── ROW 3: Feature Analytics ── */}
          <section>
            <SectionLabel>Feature-Specific Analytics</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">

              {/* Stacked Horizontal Bar – Chatbot Performance */}
              <CardShell title="AI Chatbot Performance" subtitle="Resolved vs Unresolved queries by category">
                <div className="flex items-center gap-2 mb-4">
                  <Bot size={14} className="text-[#FF9800]" />
                  <span className="text-[11px] text-gray-500 font-medium">Total queries this month</span>
                  <span className="ml-auto text-sm font-bold text-gray-900">1,837</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart layout="vertical" data={chatbotData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }} barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 9, fill: '#aaa' }} />
                    <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: '#666' }} width={72} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10, border: '1px solid #eee' }} />
                    <Bar dataKey="resolved"   stackId="a" fill="#FF9800" name="Resolved"   radius={[0, 0, 0, 0]} />
                    <Bar dataKey="unresolved" stackId="a" fill="#FFE0B2" name="Unresolved" radius={[0, 4, 4, 0]} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </CardShell>

              {/* Grouped Bar – Quiz Engagement */}
              <CardShell title="Quiz Engagement" subtitle="Quizzes taken & average score — last 14 days">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={14} className="text-[#FF9800]" />
                  <span className="text-[11px] text-gray-500 font-medium">Avg score this period</span>
                  <span className="ml-auto text-sm font-bold text-gray-900">71.4%</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={quizData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barSize={8} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#aaa' }} />
                    <YAxis tick={{ fontSize: 9, fill: '#aaa' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10, border: '1px solid #eee' }} />
                    <Bar dataKey="quizzes"  fill="#FF9800" name="Quizzes Taken" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="avgScore" fill="#FFE0B2" name="Avg Score (%)" radius={[3, 3, 0, 0]} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </CardShell>

            </div>
          </section>

          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}