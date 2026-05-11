"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  RefreshCw,
  Shield,
  ShieldAlert,
} from "lucide-react";

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

export default function BreachReportsPage() {
  const [data, setData] = useState<AnyRecord>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/security/breach-reports", { cache: "no-store" });
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
                <AlertTriangle size={22} />
              </span>
              <div>
                <h1 className="text-3xl font-black text-amber-400">Breach Reports & Incidents</h1>
                <p className="mt-1 text-sm text-zinc-300">Security investigation, root cause analysis and recovery workflow tracking.</p>
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
              <MetricCard label="Open incidents" value={kpis.openIncidents || 0} detail="security cases" icon={AlertTriangle} tone="red" />
              <MetricCard label="MTTR" value={kpis.mttr || "0h"} detail="30d" icon={RefreshCw} />
              <MetricCard label="Resolved YTD" value={kpis.resolvedYtd || 0} detail="closed alerts" icon={Shield} tone="green" />
              <MetricCard label="Audit pass rate" value={`${kpis.auditPassRate || 0}%`} detail="control health" icon={ShieldAlert} />
            </div>

            <div className="space-y-4">
              {(data.incidents || []).map((incident: AnyRecord) => (
                <Panel key={incident.id} title={incident.title} subtitle={`${incident.id} • ${formatTime(incident.openedAt)}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${severityColor(incident.severity)}`}>{incident.severity}</span>
                      <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-black text-zinc-300">{incident.status}</span>
                      {(incident.services || []).map((service: string) => (
                        <span key={service} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">{service}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${incident.recoveryPercent || 0}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400">{incident.recoveryPercent || 0}%</span>
                    </div>
                  </div>
                </Panel>
              ))}
              {(!data.incidents || data.incidents.length === 0) && (
                <p className="text-center text-zinc-500 py-8">No incidents recorded</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}