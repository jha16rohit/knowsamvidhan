"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import { RefreshCw, Shield, Zap, Ban, Globe2, Lock } from "lucide-react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area, BarChart, Bar } from "recharts";

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

const formatTime = (value?: string | null) => {
  if (!value) return "never";
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value));
};

export default function RateLimitingPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/rate-limiting", { cache: "no-store" });
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
                <Zap size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Rate Limiting</h1>
                <p className="mt-1 text-sm text-zinc-300">Rate limit enforcement, blocked IPs and abuse prevention.</p>
              </div>
            </div>
            <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-black text-black">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </header>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <MetricCard label="Total events" value={kpis.totalEvents || 0} detail="rate limit hits" icon={Zap} />
              <MetricCard label="Blocked" value={kpis.blockedEvents || 0} detail="ip blocked" icon={Ban} tone="red" />
              <MetricCard label="Unique IPs" value={kpis.uniqueIPs || 0} detail="abuse sources" icon={Globe2} />
              <MetricCard label="Active limits" value={kpis.activeRateLimits || 0} detail="currently blocked" icon={Lock} />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <Panel title="Hourly rate limit" subtitle="24h">
                <div className="h-72">
                  <ResponsiveContainer>
                    <AreaChart data={data.hourlyTrend || []}>
                      <XAxis dataKey="hour" stroke="#a1a1aa" fontSize={11} />
                      <YAxis stroke="#a1a1aa" fontSize={11} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="#f59e0b33" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Top endpoints" subtitle="by events">
                <div className="h-72">
                  <ResponsiveContainer>
                    <BarChart data={data.distribution || []} layout="vertical">
                      <XAxis type="number" stroke="#a1a1aa" fontSize={11} />
                      <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={10} width={120} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Bar dataKey="value" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <Panel title="Rate limit events" subtitle="recent">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-400">
                    <tr>
                      <th className="pb-3 font-black uppercase">Key</th>
                      <th className="pb-3 font-black uppercase">IP</th>
                      <th className="pb-3 font-black uppercase">Endpoint</th>
                      <th className="pb-3 font-black uppercase">Attempts</th>
                      <th className="pb-3 font-black uppercase">Delay</th>
                      <th className="pb-3 font-black uppercase">Status</th>
                      <th className="pb-3 font-black uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-100">
                    {(data.events || []).map((event: AnyRecord) => (
                      <tr key={event.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3 font-mono text-xs">{event.key}</td>
                        <td className="py-3 font-mono text-xs">{event.ipAddress || "N/A"}</td>
                        <td className="py-3 font-mono text-xs">{event.endpoint || "N/A"}</td>
                        <td className="py-3">{event.attempts}</td>
                        <td className="py-3">{event.delayMs || 0}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                            event.blockedUntil ? "border-red-500/40 bg-red-500/15 text-red-300" : "border-yellow-500/40 bg-yellow-500/15 text-yellow-300"
                          }`}>
                            {event.blockedUntil ? "Blocked" : "Limited"}
                          </span>
                        </td>
                        <td className="py-3">{formatTime(event.createdAt)}</td>
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