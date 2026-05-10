"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  ShieldCheck,
  Check,
  Bell,
  Bot,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Database,
  Lock,
  FileText,
  Server,
  Globe,
  CheckCircle2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type AlertStatus = "OPEN" | "ACKED" | "DISMISSED";
type TabKey = "OPEN" | "ACKED" | "DISMISSED" | "ALL";

interface Alert {
  id: string;
  status: AlertStatus;
  severity: Severity;
  title: string;
  description: string;
  serviceName: string;
  serviceIcon: string | null;
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

interface SeverityStyle {
  badge: string;
  dot: string;
}

interface FrequencyData {
  hour: string;
  total: number;
  critical: number;
}

interface OpenedResolved {
  day: string;
  opened: number;
  resolved: number;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
];

const iconMap: Record<string, LucideIcon> = {
  Lock,
  Database,
  Bot,
  FileText,
  Globe,
};

const heatColor = (v: number): string => {
  const t = v / 12;
  if (t < 0.15) return "#F5F5F5";
  if (t < 0.35) return "#FFE0B2";
  if (t < 0.6) return "#FFB74D";
  if (t < 0.8) return "#FF9800";
  return "#E65100";
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold tracking-widest text-[#FF9800] uppercase mb-3">
    {children}
  </p>
);

const KpiCard = ({
  label,
  value,
  trend,
  positive,
  icon: Icon,
}: KpiCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-5">
      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
        <Icon size={18} className="text-[#FF9800]" />
      </div>

      <span
        className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
          positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        }`}
      >
        {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}

        {trend}
      </span>
    </div>

    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
      {label}
    </p>

    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
  </div>
);

const CategoryBar = ({ label, count, total, color }: CategoryBarItem) => {
  const pct = Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 font-medium w-40 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-gray-900 w-8 text-right">
        {count}
      </span>
    </div>
  );
};

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow text-xs font-semibold text-gray-700 space-y-1">
      <p className="text-gray-400 text-[10px] font-bold">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("OPEN");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [frequencyData, setFrequencyData] = useState<FrequencyData[]>([]);
  const [openedResolvedData, setOpenedResolvedData] = useState<
    OpenedResolved[]
  >([]);
  const [categoryData, setCategoryData] = useState<CategoryBarItem[]>([]);
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [severityStyles, setSeverityStyles] = useState<
    Record<Severity, SeverityStyle>
  >({
    CRITICAL: { badge: "bg-red-600 text-white", dot: "bg-red-600" },
    HIGH: {
      badge: "bg-red-50 text-red-600 border border-red-200",
      dot: "bg-red-400",
    },
    MEDIUM: {
      badge: "bg-orange-50 text-orange-600 border border-orange-200",
      dot: "bg-orange-400",
    },
    LOW: {
      badge: "bg-gray-100 text-gray-600 border border-gray-200",
      dot: "bg-gray-400",
    },
  });
  const [kpis, setKpis] = useState({
    totalAlerts: 0,
    resolvedRate: "0%",
    mttr: "0 min",
    escalations: 0,
  });

  const fetchData = useCallback(
    async (tab: TabKey = activeTab) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/alert_logs?tab=${tab}`);
        const data = await res.json();

        if (data.alerts) {
          setAlerts(data.alerts);
        }
        if (data.frequencyData) {
          setFrequencyData(data.frequencyData);
        }
        if (data.openedResolvedData) {
          setOpenedResolvedData(data.openedResolvedData);
        }
        if (data.categoryData) {
          setCategoryData(data.categoryData);
        }
        if (data.heatmapData) {
          setHeatmapData(data.heatmapData);
        }
        if (data.severityStyles) {
          setSeverityStyles(data.severityStyles);
        }
        if (data.kpis) {
          setKpis(data.kpis);
        }
      } catch (error) {
        console.error("Error fetching alert data:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab],
  );

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const counts: Record<TabKey, number> = {
    OPEN: alerts.filter((a) => a.status === "OPEN").length,
    ACKED: alerts.filter((a) => a.status === "ACKED").length,
    DISMISSED: alerts.filter((a) => a.status === "DISMISSED").length,
    ALL: alerts.length,
  };

  const displayed = alerts.filter((a) =>
    activeTab === "ALL" ? true : a.status === activeTab,
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const ack = async (id: string) => {
    try {
      await fetch("/api/alert_logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ack", alertId: id }),
      });
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "ACKED" as AlertStatus } : a,
        ),
      );
      showToast("Alert acknowledged");
    } catch (error) {
      console.error("Error acknowledging alert:", error);
    }
  };

  const dismiss = async (id: string) => {
    try {
      await fetch("/api/alert_logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "dismiss", alertId: id }),
      });
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "DISMISSED" as AlertStatus } : a,
        ),
      );
      showToast("Alert dismissed");
    } catch (error) {
      console.error("Error dismissing alert:", error);
    }
  };

  const TABS: { key: TabKey; label: string }[] = [
    { key: "OPEN", label: "Open" },
    { key: "ACKED", label: "Acknowledged" },
    { key: "DISMISSED", label: "Dismissed" },
    { key: "ALL", label: "All" },
  ];

  const resolvedRate = parseInt(kpis.resolvedRate.replace("%", "")) || 0;

  if (loading && alerts.length === 0) {
    return (
      <div className="min-h-screen flex bg-[#f8fafc] font-sans">
        <AdminSidebar />
        <main className="pl-72 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500">
              Loading alerts...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-white px-5 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-900">{toast}</span>
        </div>
      )}

      <AdminSidebar />

      <main className="pl-72 flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <p className="text-indigo-600 text-[11px] font-bold tracking-widest uppercase mb-2">
              Threat Intelligence
            </p>

            <h2 className="text-[42px] leading-tight font-serif text-gray-900 mb-2 font-bold">
              Alerts & Live Monitoring
            </h2>

            <p className="text-sm text-gray-500">
              AI-flagged events requiring review and monitoring.
            </p>
          </div>

          {/* ── ROW 1: KPI Cards ── */}
          <section className="mb-8">
            <SectionLabel>Key Metrics</SectionLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <KpiCard
                icon={Bell}
                label="Total Alerts"
                value={String(kpis.totalAlerts)}
                trend="+6% MoM"
                positive={false}
              />
              <KpiCard
                icon={ShieldCheck}
                label="Resolved Rate"
                value={kpis.resolvedRate}
                trend={`${resolvedRate >= 80 ? "+" : "-"}4% MoM`}
                positive={resolvedRate >= 80}
              />
              <KpiCard
                icon={Clock}
                label="MTTR"
                value={kpis.mttr}
                trend="-2 min"
                positive={true}
              />
              <KpiCard
                icon={Zap}
                label="Escalations"
                value={String(kpis.escalations)}
                trend="-1 MoM"
                positive={true}
              />
            </div>
          </section>

          {/* ── ROW 2: Frequency Chart + Category Breakdown ── */}
          <section className="mb-8">
            <SectionLabel>Live Monitoring &amp; Trends</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Area Chart */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">
                    Alert Frequency (24h)
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Total volume vs. critical incidents
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart
                    data={frequencyData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="totalGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FF9800"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF9800"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="hour"
                      tick={{ fontSize: 9, fill: "#aaa" }}
                      interval={3}
                    />
                    <YAxis tick={{ fontSize: 9, fill: "#aaa" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#FF9800"
                      strokeWidth={2}
                      fill="url(#totalGrad)"
                      dot={false}
                      name="Total"
                    />
                    <Area
                      type="monotone"
                      dataKey="critical"
                      stroke="#EF5350"
                      strokeWidth={1.5}
                      fill="none"
                      dot={false}
                      name="Critical"
                    />
                    <Legend
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">
                    Category Breakdown
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Alert distribution by type
                  </p>
                </div>
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  {categoryData.map((c, i) => (
                    <CategoryBar key={i} {...c} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ROW 3: Opened vs Resolved + Heatmap ── */}
          <section className="mb-8">
            <SectionLabel>Historical Analysis</SectionLabel>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Clustered Bar */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-900">
                    Opened vs Resolved
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    30-day daily comparison
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={openedResolvedData}
                    margin={{ top: 0, right: 4, left: -20, bottom: 0 }}
                    barSize={6}
                    barGap={2}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 9, fill: "#aaa" }}
                      interval={4}
                    />
                    <YAxis tick={{ fontSize: 9, fill: "#aaa" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar
                      dataKey="opened"
                      fill="#FF9800"
                      name="Opened"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="resolved"
                      fill="#66BB6A"
                      name="Resolved"
                      radius={[2, 2, 0, 0]}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{ fontSize: 10 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Heatmap */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900">
                    Frequency Heatmap
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Day × Hour alert density
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  {/* Hour labels */}
                  <div className="flex gap-1 pl-8 mb-0.5">
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="flex-1 text-center text-[8px] text-gray-400 font-medium"
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                  {DAYS.map((day, di) => (
                    <div key={day} className="flex items-center gap-1">
                      <span className="w-7 text-[9px] text-gray-400 font-medium shrink-0">
                        {day}
                      </span>
                      {(heatmapData[di] || HOURS.map(() => 0)).map(
                        (val, hi) => (
                          <div
                            key={hi}
                            className="flex-1 rounded-sm hover:scale-110 transition-transform cursor-default"
                            style={{
                              backgroundColor: heatColor(val),
                              aspectRatio: "1",
                              minHeight: "16px",
                            }}
                            title={`${day} ${HOURS[hi]}:00 — ${val} alerts`}
                          />
                        ),
                      )}
                    </div>
                  ))}
                  {/* Scale */}
                  <div className="flex items-center gap-1.5 mt-2 justify-end">
                    <span className="text-[9px] text-gray-400">Low</span>
                    {[
                      "#F5F5F5",
                      "#FFE0B2",
                      "#FFB74D",
                      "#FF9800",
                      "#E65100",
                    ].map((c) => (
                      <div
                        key={c}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <span className="text-[9px] text-gray-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ROW 4: Live Alert Feed ── */}
          <section className="mb-8">
            <SectionLabel>Live Alert Feed</SectionLabel>

            {/* Tab Bar */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full p-1.5 w-max mb-5 shadow-sm">
              {TABS.map((tab) => (
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
                <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  <p className="text-sm font-bold text-gray-700">
                    All clear here
                  </p>
                  <p className="text-xs text-gray-400">
                    No alerts in this category
                  </p>
                </div>
              ) : (
                displayed.map((alert) => {
                  const SvcIcon = alert.serviceIcon
                    ? iconMap[alert.serviceIcon] || Server
                    : Server;
                  const sev = severityStyles[alert.severity];
                  const isOpen = alert.status === "OPEN";
                  return (
                    <div
                      key={alert.id}
                      className={`bg-white p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                        !isOpen
                          ? "opacity-60"
                          : "hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Icon + Text */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                            <SvcIcon size={20} className="text-orange-500" />
                          </div>
                          {isOpen && (
                            <span
                              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${sev.dot}`}
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                              {alert.title}
                            </h3>
                            {isOpen && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${sev.badge}`}
                              >
                                {alert.severity}
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-1">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                              <Server size={9} /> {alert.serviceName}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-[10px] text-gray-400 font-medium">
                              {alert.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-2">
                        {alert.status === "OPEN" && (
                          <>
                            <button
                              onClick={() => ack(alert.id)}
                              className="px-5 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                            >
                              <CheckCircle2 size={13} /> Ack
                            </button>
                            <button
                              onClick={() => dismiss(alert.id)}
                              className="px-5 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                            >
                              <X size={13} /> Dismiss
                            </button>
                          </>
                        )}
                        {alert.status === "ACKED" && (
                          <span className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl border border-orange-200">
                            <CheckCircle2 size={13} /> Acknowledged
                          </span>
                        )}
                        {alert.status === "DISMISSED" && (
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
