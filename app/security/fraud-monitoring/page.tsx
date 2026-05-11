"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Bot,
  Fingerprint,
  Globe2,
  KeyRound,
  Lock,
  Radar,
  RefreshCw,
  Shield,
  ShieldAlert,
  Siren,
  UserX,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AnyRecord = Record<string, any>;

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "amber",
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon: typeof Shield;
  tone?: "amber" | "red" | "green";
}) {
  const toneClass =
    tone === "red"
      ? "from-red-500/20 to-transparent text-red-300"
      : tone === "green"
        ? "from-emerald-500/20 to-transparent text-emerald-300"
        : "from-amber-500/20 to-transparent text-amber-300";

  return (
    <div className={`rounded-lg border border-amber-500/20 bg-[#0d1117] p-5 shadow-[0_0_35px_rgba(245,158,11,0.08)] bg-linear-to-br ${toneClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </p>
          <p className="mt-5 text-3xl font-black text-zinc-100">{value}</p>
          {detail ? <p className="mt-1 text-xs font-semibold text-zinc-400">{detail}</p> : null}
        </div>
        <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400">
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-100">{title}</h3>
          <p className="text-xs font-medium text-zinc-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ProfilesTable({ rows }: { rows: AnyRecord[] }) {
  return (
    <Panel title="Risk Profiles" subtitle="high risk users">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="pb-3 font-black uppercase tracking-wider">User</th>
              <th className="pb-3 font-black uppercase tracking-wider">Risk Score</th>
              <th className="pb-3 font-black uppercase tracking-wider">Trust Score</th>
              <th className="pb-3 font-black uppercase tracking-wider">Decision</th>
              <th className="pb-3 font-black uppercase tracking-wider">Signals</th>
            </tr>
          </thead>
          <tbody className="text-zinc-100">
            {(rows || []).map((row, i) => (
              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                <td className="py-3">{row.email}</td>
                <td className="py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                    row.riskScore >= 70 ? "border-red-500/40 bg-red-500/15 text-red-300" :
                    row.riskScore >= 40 ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" :
                    "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  }`}>
                    {row.riskScore}
                  </span>
                </td>
                <td className="py-3">{row.trustScore}</td>
                <td className="py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                    row.decision === "BLOCK" ? "border-red-500/40 bg-red-500/15 text-red-300" :
                    row.decision === "OTP" ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" :
                    "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  }`}>
                    {row.decision}
                  </span>
                </td>
                <td className="py-3 text-xs text-zinc-400">{row.signals?.join(", ") || "none"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ListPanel({ title, rows }: { title: string; rows: string[] }) {
  return (
    <Panel title={title} subtitle="recent activity">
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {rows.map((row, i) => (
          <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300">
            {row}
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-zinc-500 text-center py-4">No data</p>
        )}
      </div>
    </Panel>
  );
}

export default function FraudMonitoringPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/fraud-monitoring", { cache: "no-store" });
      const payload = await response.json();
      setData(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, [load]);

  const kpis = data.kpis || {};

  return (
    <>
      <AdminSidebar />
      <main className="min-h-screen bg-[#06080b] text-zinc-100">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(251,146,60,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.06)_1px,transparent_1px)]" />
        <section className="relative ml-72 p-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-amber-400">
                <Fingerprint size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Fraud Monitoring</h1>
                <p className="mt-1 text-sm text-zinc-300">Behavioral risk profiling, takeover detection and abuse prevention.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-black text-black shadow-[0_0_25px_rgba(249,115,22,0.25)]"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh live data
            </button>
          </header>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <MetricCard label="Fraud risk index" value={`${kpis.fraudRiskIndex || 0} / 100`} detail="live blend" icon={ShieldAlert} />
              <MetricCard label="Fake accounts blocked" value={kpis.fakeAccountsBlocked || 0} detail="status blocked" icon={UserX} />
              <MetricCard label="Account takeovers" value={kpis.accountTakeovers || 0} detail="alert correlated" icon={Lock} tone="red" />
              <MetricCard label="Bot traffic" value={`${kpis.botTraffic || 0}%`} detail="API share" icon={Bot} />
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <Panel title="Behavioral anomaly score" subtitle="14d">
                <div className="h-72">
                  <ResponsiveContainer>
                    <AreaChart data={data.anomalySeries || []}>
                      <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} />
                      <YAxis stroke="#a1a1aa" fontSize={11} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Area type="monotone" dataKey="score" stroke="#f59e0b" fill="#f59e0b33" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Fraud type distribution" subtitle="live counters">
                <div className="h-72">
                  <ResponsiveContainer>
                    <BarChart data={data.distribution || []} layout="vertical">
                      <XAxis type="number" stroke="#a1a1aa" fontSize={11} />
                      <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={11} width={95} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Bar dataKey="value" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>
            <ProfilesTable rows={data.profiles || []} />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <ListPanel title="Suspicious edits timeline" rows={(data.suspiciousEdits || []).map((row: AnyRecord) => `${row.title} • ${row.actor}`)} />
              <ListPanel title="Session/device anomalies" rows={(data.deviceAnomalies || []).map((row: AnyRecord) => `${row.label}: ${row.value} cases • ${row.detail}`)} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}