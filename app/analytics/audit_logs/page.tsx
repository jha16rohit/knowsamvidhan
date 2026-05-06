"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  ShieldCheck, Check, Bell, Bot,
  TrendingUp, TrendingDown, Clock, Zap,
  Database, Lock, FileText, Server, Globe, CheckCircle2, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Severity   = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type AlertStatus = "open" | "acked" | "dismissed";
type TabKey     = "open" | "acked" | "dismissed" | "all";

interface Alert {
  id: string;
  status: AlertStatus;
  severity: Severity;
  title: string;
  desc: string;
  service: string;
  serviceIcon: LucideIcon;
  time: string;
}

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
  icon: LucideIcon;
}

interface CategoryBarItem {
  label: string;
  count: number;
  total: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const frequencyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  total:    Math.floor(8 + Math.sin(i * 0.6) * 5 + Math.random() * 6),
  critical: Math.floor(1 + Math.sin(i * 0.8) * 1.5 + Math.random() * 2),
}));

const openedResolvedData = Array.from({ length: 30 }, (_, i) => ({
  day:      `${i + 1}`,
  opened:   Math.floor(4 + Math.random() * 8),
  resolved: Math.floor(3 + Math.random() * 7),
}));

const categoryData: CategoryBarItem[] = [
  { label: "Authentication",      count: 84, total: 160, color: "#FF9800" },
  { label: "Content Moderation",  count: 57, total: 160, color: "#EF5350" },
  { label: "Bot Detection",       count: 43, total: 160, color: "#FFCA28" },
  { label: "API Abuse",           count: 28, total: 160, color: "#66BB6A" },
  { label: "Data Integrity",      count: 19, total: 160, color: "#90A4AE" },
];

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["0","2","4","6","8","10","12","14","16","18","20","22"];
const heatmapData: number[][] = DAYS.map(() =>
  HOURS.map(() => Math.floor(Math.random() * 12))
);

const initialAlerts: Alert[] = [
  {
    id: "al1", status: "open", severity: "CRITICAL",
    title: "Impossible travel detected",
    desc: "Logins from Mumbai and Moscow within 6 minutes — geographically impossible.",
    service: "Auth Gateway", serviceIcon: Lock, time: "27 min ago",
  },
  {
    id: "al2", status: "open", severity: "HIGH",
    title: "Brute-force attempt",
    desc: "47 failed login attempts in 30 minutes from rotating IPs.",
    service: "Auth Gateway", serviceIcon: Lock, time: "1 hr ago",
  },
  {
    id: "al3", status: "open", severity: "HIGH",
    title: "Burst signup pattern",
    desc: "8 accounts created in 60 seconds from IP 41.203.77.4 (disposable domain).",
    service: "PostgreSQL", serviceIcon: Database, time: "1 hr ago",
  },
  {
    id: "al4", status: "open", severity: "MEDIUM",
    title: "6 likely bot accounts",
    desc: "Disposable email domains + headless browser fingerprints flagged for review.",
    service: "Bot Detector", serviceIcon: Bot, time: "2 hr ago",
  },
  {
    id: "al5", status: "open", severity: "LOW",
    title: "Unusual content flag volume",
    desc: "Content moderation queue 3× above daily average — spike under investigation.",
    service: "Content API", serviceIcon: FileText, time: "3 hr ago",
  },
  {
    id: "al6", status: "acked", severity: "HIGH",
    title: "Multiple password resets",
    desc: "5 password reset requests for admin accounts within 10 minutes.",
    service: "Auth Gateway", serviceIcon: Lock, time: "4 hr ago",
  },
  {
    id: "al7", status: "dismissed", severity: "MEDIUM",
    title: "Suspicious API volume",
    desc: "High rate of read requests from a single API token — false positive confirmed.",
    service: "API Gateway", serviceIcon: Globe, time: "1 day ago",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const SEVERITY_STYLES: Record<Severity, { badge: string; dot: string }> = {
  CRITICAL: { badge: "bg-red-600 text-white",                                    dot: "bg-red-600"    },
  HIGH:     { badge: "bg-red-50 text-red-600 border border-red-200",             dot: "bg-red-400"    },
  MEDIUM:   { badge: "bg-orange-50 text-orange-600 border border-orange-200",    dot: "bg-orange-400" },
  LOW:      { badge: "bg-gray-100 text-gray-600 border border-gray-200",         dot: "bg-gray-400"   },
};

const heatColor = (v: number): string => {
  const t = v / 12;
  if (t < 0.15) return "#F5F5F5";
  if (t < 0.35) return "#FFE0B2";
  if (t < 0.60) return "#FFB74D";
  if (t < 0.80) return "#FF9800";
  return "#E65100";
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold tracking-widest text-[#FF9800] uppercase mb-3">{children}</p>
);

const KpiCard = ({ label, value, trend, positive, icon: Icon }: KpiCardProps) => (
  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
        <Icon size={18} className="text-[#FF9800]" />
      </div>
      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
        positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
      }`}>
        {positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
        {trend}
      </span>
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
    </div>
  </div>
);

const CategoryBar = ({ label, count, total, color }: CategoryBarItem) => {
  const pct = Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 font-medium w-40 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold text-gray-900 w-8 text-right">{count}</span>
    </div>
  );
};

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow text-xs font-semibold text-gray-700 space-y-1">
      <p className="text-gray-400 text-[10px] font-bold">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [activeTab, setActiveTab] = useState<TabKey>("open");
  const [toast, setToast] = useState<string | null>(null);

  const counts: Record<TabKey, number> = {
    open:      alerts.filter(a => a.status === "open").length,
    acked:     alerts.filter(a => a.status === "acked").length,
    dismissed: alerts.filter(a => a.status === "dismissed").length,
    all:       alerts.length,
  };

  const displayed = alerts.filter(a =>
    activeTab === "all" ? true : a.status === activeTab
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const ack = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "acked" as AlertStatus } : a));
    showToast("Alert acknowledged");
  };

  const dismiss = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "dismissed" as AlertStatus } : a));
    showToast("Alert dismissed");
  };

  const resolvedRate = Math.round(
    (alerts.filter(a => a.status !== "open").length / alerts.length) * 100
  );

  const TABS: { key: TabKey; label: string }[] = [
    { key: "open",      label: "Open"         },
    { key: "acked",     label: "Acknowledged" },
    { key: "dismissed", label: "Dismissed"    },
    { key: "all",       label: "All"          },
  ];

  return (
    <div className="min-h-screen flex bg-[#F5F5F5] font-sans relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toast}</span>
        </div>
      )}

      <AdminSidebar />

      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-8 lg:px-10 space-y-8">

          {/* Header */}
          <div>
            <SectionLabel>Threat Intelligence</SectionLabel>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Alerts &amp; Live Monitoring</h2>
                <p className="text-sm text-gray-400 mt-1">AI-flagged events with real-time frequency analysis.</p>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Last updated: just now</span>
            </div>
          </div>

          {/* ── ROW 1: KPI Cards ── */}
          <section>
            <SectionLabel>Key Metrics</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KpiCard icon={Bell}        label="Total Alerts"  value={String(alerts.length)} trend="+6% MoM" positive={false} />
              <KpiCard icon={ShieldCheck} label="Resolved Rate" value={`${resolvedRate}%`}    trend="+4% MoM" positive={true}  />
              <KpiCard icon={Clock}       label="MTTR"          value="14 min"                trend="-2 min"  positive={true}  />
              <KpiCard icon={Zap}         label="Escalations"   value="3"                     trend="-1 MoM"  positive={true}  />
            </div>
          </section>

          {/* ── ROW 2: Frequency Chart + Category Breakdown ── */}
          <section>
            <SectionLabel>Live Monitoring &amp; Trends</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Area Chart */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">Alert Frequency (24h)</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Total volume vs. critical incidents</p>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={frequencyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#FF9800" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#FF9800" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour"     tick={{ fontSize: 9, fill: "#aaa" }} interval={3} />
                    <YAxis                    tick={{ fontSize: 9, fill: "#aaa" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="total"    stroke="#FF9800" strokeWidth={2}   fill="url(#totalGrad)" dot={false} name="Total"    />
                    <Area type="monotone" dataKey="critical" stroke="#EF5350" strokeWidth={1.5} fill="none"            dot={false} name="Critical" />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">Category Breakdown</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Alert distribution by type</p>
                </div>
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  {categoryData.map((c, i) => <CategoryBar key={i} {...c} />)}
                </div>
              </div>
            </div>
          </section>

          {/* ── ROW 3: Opened vs Resolved + Heatmap ── */}
          <section>
            <SectionLabel>Historical Analysis</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Clustered Bar */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">Opened vs Resolved</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">30-day daily comparison</p>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={openedResolvedData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barSize={6} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day"      tick={{ fontSize: 9, fill: "#aaa" }} interval={4} />
                    <YAxis                    tick={{ fontSize: 9, fill: "#aaa" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="opened"   fill="#FF9800" name="Opened"   radius={[2, 2, 0, 0]} />
                    <Bar dataKey="resolved" fill="#66BB6A" name="Resolved" radius={[2, 2, 0, 0]} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Heatmap */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900">Frequency Heatmap</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Day × Hour alert density</p>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  {/* Hour labels */}
                  <div className="flex gap-1 pl-8 mb-0.5">
                    {HOURS.map(h => (
                      <div key={h} className="flex-1 text-center text-[8px] text-gray-400 font-medium">{h}</div>
                    ))}
                  </div>
                  {DAYS.map((day, di) => (
                    <div key={day} className="flex items-center gap-1">
                      <span className="w-7 text-[9px] text-gray-400 font-medium shrink-0">{day}</span>
                      {heatmapData[di].map((val, hi) => (
                        <div
                          key={hi}
                          className="flex-1 rounded-sm hover:scale-110 transition-transform cursor-default"
                          style={{ backgroundColor: heatColor(val), aspectRatio: "1", minHeight: "16px" }}
                          title={`${day} ${HOURS[hi]}:00 — ${val} alerts`}
                        />
                      ))}
                    </div>
                  ))}
                  {/* Scale */}
                  <div className="flex items-center gap-1.5 mt-2 justify-end">
                    <span className="text-[9px] text-gray-400">Low</span>
                    {["#F5F5F5","#FFE0B2","#FFB74D","#FF9800","#E65100"].map(c => (
                      <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
                    ))}
                    <span className="text-[9px] text-gray-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ROW 4: Live Alert Feed ── */}
          <section>
            <SectionLabel>Live Alert Feed</SectionLabel>

            {/* Tab Bar */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full p-1.5 w-max mb-5 shadow-sm">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab.key
                      ? "bg-[#FF9800] text-white shadow"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label} ({counts[tab.key]})
                </button>
              ))}
            </div>

            {/* Feed Cards */}
            <div className="flex flex-col gap-3">
              {displayed.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-14 flex flex-col items-center justify-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  <p className="text-sm font-bold text-gray-700">All clear here</p>
                  <p className="text-xs text-gray-400">No alerts in this category</p>
                </div>
              ) : (
                displayed.map(alert => {
                  const SvcIcon = alert.serviceIcon;
                  const sev = SEVERITY_STYLES[alert.severity];
                  const isOpen = alert.status === "open";
                  return (
                    <div
                      key={alert.id}
                      className={`bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col md:flex-row md:items-center gap-5 transition-all ${
                        !isOpen ? "opacity-60" : "hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Icon + Text */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                            <SvcIcon size={20} className="text-gray-500" />
                          </div>
                          {isOpen && (
                            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${sev.dot}`} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-[14px] font-bold text-gray-900 leading-snug">{alert.title}</h3>
                            {isOpen && (
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${sev.badge}`}>
                                {alert.severity}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-1">{alert.desc}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                              <Server size={9} /> {alert.service}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-[10px] text-gray-400 font-medium">{alert.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-2">
                        {alert.status === "open" && (
                          <>
                            <button
                              onClick={() => ack(alert.id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 text-[#FF9800] border border-orange-200 text-xs font-bold rounded-xl hover:bg-orange-100 transition-colors"
                            >
                              <CheckCircle2 size={13} /> Ack
                            </button>
                            <button
                              onClick={() => dismiss(alert.id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors"
                            >
                              <X size={13} /> Dismiss
                            </button>
                          </>
                        )}
                        {alert.status === "acked" && (
                          <span className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 text-[#FF9800] text-xs font-bold rounded-xl border border-orange-200">
                            <CheckCircle2 size={13} /> Acknowledged
                          </span>
                        )}
                        {alert.status === "dismissed" && (
                          <span className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl border border-gray-200">
                            <X size={13} /> Dismissed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}