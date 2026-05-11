"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  Bot,
  Fingerprint,
  RefreshCw,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

type AnyRecord = Record<string, any>;

function MetricCard({ label, value, detail, icon: Icon, tone = "amber" }: {
  label: string; value: string | number; detail?: string; icon: typeof Shield; tone?: "amber" | "red" | "green";
}) {
  const toneClass = tone === "red" ? "from-red-500/20 to-transparent text-red-300" :
    tone === "green" ? "from-emerald-500/20 to-transparent text-emerald-300" : "from-amber-500/20 to-transparent text-amber-300";
  return (
    <div className={`rounded-lg border border-amber-500/20 bg-[#0d1117] p-5 shadow-[0_0_35px_rgba(245,158,11,0.08)] bg-linear-to-br ${toneClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">{label}</p>
          <p className="mt-5 text-3xl font-black text-zinc-100">{value}</p>
          {detail && <p className="mt-1 text-xs font-semibold text-zinc-400">{detail}</p>}
        </div>
        <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400"><Icon size={18} /></span>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
      <div className="mb-4"><h3 className="text-base font-bold text-zinc-100">{title}</h3><p className="text-xs font-medium text-zinc-500">{subtitle}</p></div>
      {children}
    </div>
  );
}

const formatTime = (value?: string | null) => !value ? "never" : new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value));

export default function BehavioralProfilesPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/security/behavioral-profiles", { cache: "no-store" }); setData(await res.json()); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); const t = window.setInterval(load, 5000); return () => window.clearInterval(t); }, [load]);

  const kpis = data.kpis || {};

  return (
    <>
      <AdminSidebar />
      <main className="min-h-screen bg-[#06080b] text-zinc-100">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(251,146,60,0.06)_1px,transparent_1px),linear_gradient(90deg,rgba(251,146,60,0.06)_1px,transparent_1px)]" />
        <section className="relative ml-72 p-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-amber-400"><Fingerprint size={22} /></span>
              <div><h1 className="text-3xl font-black text-amber-400">Behavioral Profiles</h1><p className="mt-1 text-sm text-zinc-300">User behavior anomaly detection, bot classification and risk scoring.</p></div>
            </div>
            <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-black text-black"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />Refresh</button>
          </header>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <MetricCard label="Total profiles" value={kpis.totalProfiles || 0} detail="behavioral records" icon={Fingerprint} />
              <MetricCard label="High risk" value={kpis.highRisk || 0} detail="anomaly >= 70" icon={AlertTriangle} tone="red" />
              <MetricCard label="Bot detection" value={kpis.botDetection || 0} detail="classified as bot" icon={Bot} tone="red" />
              <MetricCard label="Human traffic" value={kpis.humanTraffic || 0} detail="legitimate users" icon={Shield} tone="green" />
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <Panel title="Anomaly score trend" subtitle="7d"><div className="h-72"><ResponsiveContainer><AreaChart data={data.anomalyTrend || []}><XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} /><YAxis stroke="#a1a1aa" fontSize={11} /><Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} /><Area type="monotone" dataKey="score" stroke="#f59e0b" fill="#f59e0b33" strokeWidth={3} /></AreaChart></ResponsiveContainer></div></Panel>
              <Panel title="Classification" subtitle="live"><div className="h-72"><ResponsiveContainer><PieChart><Pie data={data.distribution || []} dataKey="value" innerRadius={72} outerRadius={105} paddingAngle={4}>{(data.distribution || []).map((e: AnyRecord) => <Cell key={e.name} fill={e.color} />)}</Pie><Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} /></PieChart></ResponsiveContainer></div></Panel>
            </div>
            <Panel title="Behavioral profiles" subtitle="top 50 by anomaly">
              <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-zinc-800 text-zinc-400"><tr><th className="pb-3 font-black uppercase">User</th><th className="pb-3 font-black uppercase">Anomaly</th><th className="pb-3 font-black uppercase">Class</th><th className="pb-3 font-black uppercase">Samples</th><th className="pb-3 font-black uppercase">Last Seen</th></tr></thead><tbody className="text-zinc-100">{(data.profiles || []).map((p: AnyRecord) => (<tr key={p.id} className="border-b border-zinc-800/50"><td className="py-3">{p.email}</td><td className="py-3"><span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${p.anomalyScore >= 70 ? "border-red-500/40 bg-red-500/15 text-red-300" : p.anomalyScore >= 40 ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"}`}>{p.anomalyScore}</span></td><td className="py-3"><span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${p.classification === "bot" ? "border-red-500/40 bg-red-500/15 text-red-300" : p.classification === "review" ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"}`}>{p.classification}</span></td><td className="py-3">{p.sampleCount}</td><td className="py-3">{formatTime(p.lastObservedAt)}</td></tr>))}</tbody></table></div>
            </Panel>
          </div>
        </section>
      </main>
    </>
  );
}