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
  RefreshCw,
  Shield,
  ShieldAlert,
  Siren,
  UserX,
  Zap,
} from "lucide-react";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

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

const formatTime = (value?: string | null) => {
  if (!value) return "never";
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value));
};

export default function AuthLogsPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/auth-logs", { cache: "no-store" });
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
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(251,146,60,0.06)_1px,transparent_1px),linear_gradient(90deg,rgba(251,146,60,0.06)_1px,transparent_1px)]" />
        <section className="relative ml-72 p-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-amber-400">
                <KeyRound size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Authentication Defense</h1>
                <p className="mt-1 text-sm text-zinc-300">RBA decisions, JTI revocation, device-bound sessions and force logout controls.</p>
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
              <MetricCard label="Total logins" value={kpis.totalLogins || 0} detail="24h" icon={Lock} />
              <MetricCard label="Failed attempts" value={kpis.failedLogins || 0} detail="24h" icon={AlertTriangle} tone="red" />
              <MetricCard label="OTP sent" value={kpis.otpSent || 0} detail="24h" icon={KeyRound} />
              <MetricCard label="Blocked IPs" value={kpis.blockedIps || 0} detail="active blocks" icon={Ban} tone="red" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Panel title="Login attempt timeline" subtitle="24h">
                <div className="h-72">
                  <ResponsiveContainer>
                    <BarChart data={data.loginTimeline || []}>
                      <XAxis dataKey="hour" stroke="#a1a1aa" fontSize={11} />
                      <YAxis stroke="#a1a1aa" fontSize={11} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Bar dataKey="success" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Top blocked IPs" subtitle="by request count">
                <div className="h-72">
                  <ResponsiveContainer>
                    <BarChart data={data.blockedIps || []} layout="vertical">
                      <XAxis type="number" stroke="#a1a1aa" fontSize={11} />
                      <YAxis type="category" dataKey="ip" stroke="#a1a1aa" fontSize={10} width={100} />
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                      <Bar dataKey="count" fill="#ef4444" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <Panel title="Recent Authentication Events" subtitle="real-time log">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-400">
                    <tr>
                      <th className="pb-3 font-black uppercase tracking-wider">User</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Action</th>
                      <th className="pb-3 font-black uppercase tracking-wider">IP Address</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Status</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-100">
                    {(data.events || []).map((event: AnyRecord, i: number) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3">{event.email}</td>
                        <td className="py-3">{event.action}</td>
                        <td className="py-3 font-mono text-xs">{event.ipAddress}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                            event.status === "SUCCESS" ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" :
                            "border-red-500/40 bg-red-500/15 text-red-300"
                          }`}>
                            {event.status}
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