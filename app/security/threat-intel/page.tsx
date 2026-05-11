"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import { RefreshCw, Shield, Siren, AlertTriangle, Zap } from "lucide-react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

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
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">{label}</p>
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
      <div className="mb-4">
        <h3 className="text-base font-bold text-zinc-100">{title}</h3>
        <p className="text-xs font-medium text-zinc-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

const severityColor = (severity?: string) => {
  switch ((severity || "").toLowerCase()) {
    case "critical": return "text-red-300 border-red-500/40 bg-red-500/15";
    case "high": return "text-orange-300 border-orange-500/40 bg-orange-500/15";
    case "medium": return "text-yellow-300 border-yellow-500/40 bg-yellow-500/15";
    default: return "text-emerald-300 border-emerald-500/40 bg-emerald-500/15";
  }
};

const formatTime = (value?: string | null) => {
  if (!value) return "never";
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value));
};

export default function ThreatIntelPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/threat-intel", { cache: "no-store" });
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
                <Siren size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Threat Intelligence</h1>
                <p className="mt-1 text-sm text-zinc-300">Attack type tracking, threat correlation and IOC feeds.</p>
              </div>
            </div>
            <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-black text-black">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </header>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <MetricCard label="Total threats" value={kpis.totalThreats || 0} detail="tracked" icon={Siren} />
              <MetricCard label="Critical" value={kpis.criticalThreats || 0} detail="severity critical" icon={AlertTriangle} tone="red" />
              <MetricCard label="Mitigated" value={kpis.mitigatedThreats || 0} detail="blocked" icon={Shield} tone="green" />
              <MetricCard label="Active" value={kpis.activeThreats || 0} detail="still active" icon={Zap} />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <Panel title="Threat trend" subtitle="7d">
                <div className="h-72">
                  <ResponsiveContainer>
                    <BarChart data={data.threatTrend || []}>
                      <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} />
                      <YAxis stroke="#a1a1aa" fontSize={11} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Severity" subtitle="active">
                <div className="h-72">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={data.severityDistribution || []} dataKey="value" innerRadius={72} outerRadius={105} paddingAngle={4}>
                        {(data.severityDistribution || []).map((entry: AnyRecord) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <Panel title="Threat feed" subtitle="recent events">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-400">
                    <tr>
                      <th className="pb-3 font-black uppercase">Type</th>
                      <th className="pb-3 font-black uppercase">Severity</th>
                      <th className="pb-3 font-black uppercase">Conf</th>
                      <th className="pb-3 font-black uppercase">IP</th>
                      <th className="pb-3 font-black uppercase">Country</th>
                      <th className="pb-3 font-black uppercase">Endpoint</th>
                      <th className="pb-3 font-black uppercase">Mitigated</th>
                      <th className="pb-3 font-black uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-100">
                    {(data.threats || []).map((threat: AnyRecord) => (
                      <tr key={threat.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3 font-mono text-xs">{threat.type}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${severityColor(threat.severity)}`}>
                            {threat.severity}
                          </span>
                        </td>
                        <td className="py-3">{threat.confidence}%</td>
                        <td className="py-3 font-mono text-xs">{threat.ipAddress || "N/A"}</td>
                        <td className="py-3">{threat.country || "Unknown"}</td>
                        <td className="py-3 font-mono text-xs">{threat.endpoint || "N/A"}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                            threat.mitigated ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" : "border-red-500/40 bg-red-500/15 text-red-300"
                          }`}>
                            {threat.mitigated ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="py-3">{formatTime(threat.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </section>
      </main>
    </>
  );
}