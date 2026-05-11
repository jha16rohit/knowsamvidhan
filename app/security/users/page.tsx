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
import { ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

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

export default function UsersPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/users", { cache: "no-store" });
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
                <Shield size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Security User Risk</h1>
                <p className="mt-1 text-sm text-zinc-300">Account trust, active devices, masked PII and user-level risk posture.</p>
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
              <MetricCard label="Total users" value={kpis.totalUsers || 0} detail="registered" icon={UserX} />
              <MetricCard label="High risk users" value={kpis.highRiskUsers || 0} detail="risk >= 70" icon={AlertTriangle} tone="red" />
              <MetricCard label="Active sessions" value={kpis.activeSessions || 0} detail="current" icon={Lock} />
              <MetricCard label="Blocked users" value={kpis.blockedUsers || 0} detail="security ban" icon={Ban} tone="red" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Panel title="Risk distribution" subtitle="by user count">
                <div className="h-72">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={data.riskDistribution || []} dataKey="value" innerRadius={72} outerRadius={105} paddingAngle={4}>
                        {(data.riskDistribution || []).map((entry: AnyRecord) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#090d13", border: "1px solid #78350f" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel title="Top risky users" subtitle="by risk score">
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {(data.riskyUsers || []).map((user: AnyRecord, i: number) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
                      <div>
                        <p className="text-sm text-zinc-100">{user.email}</p>
                        <p className="text-xs text-zinc-500">Score: {user.riskScore}</p>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                        user.riskScore >= 70 ? "border-red-500/40 bg-red-500/15 text-red-300" :
                        user.riskScore >= 40 ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" :
                        "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      }`}>
                        {user.riskScore}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <Panel title="User Risk Table" subtitle="all users by risk score">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-400">
                    <tr>
                      <th className="pb-3 font-black uppercase tracking-wider">Email</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Risk Score</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Trust Score</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Devices</th>
                      <th className="pb-3 font-black uppercase tracking-wider">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-100">
                    {(data.users || []).map((user: AnyRecord, i: number) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                            user.riskScore >= 70 ? "border-red-500/40 bg-red-500/15 text-red-300" :
                            user.riskScore >= 40 ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300" :
                            "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                          }`}>
                            {user.riskScore}
                          </span>
                        </td>
                        <td className="py-3">{user.trustScore}</td>
                        <td className="py-3">{user.deviceCount || 0}</td>
                        <td className="py-3">{user.lastActive}</td>
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