"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";

import {
  Shield,
  Database,
  Users,
  Activity,
  KeyRound,
  FilePenLine,
  UserCog,
  ChevronRight,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

// ───────────────── TYPES ─────────────────

type AuditScope =
  | "IAM"
  | "SECURITY"
  | "DATABASE"
  | "CONTENT"
  | "SETTINGS"
  | "SYSTEM";

interface AuditLog {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
  scope: AuditScope;
  severity?: string;
}

interface AuditMetrics {
  totalEvents24h: number;
  adminActions24h: number;
  roleChanges24h: number;
  dbModifications24h: number;
}

interface TopActor {
  name: string;
  value: number;
}

interface ComplianceData {
  enabled: boolean;
  retentionDays: number;
  exportEnabled: boolean;
}

interface AuditApiResponse {
  success: boolean;

  metrics: AuditMetrics;

  logs: AuditLog[];

  topActors: TopActor[];

  compliance: ComplianceData;
}

// ───────────────── STYLES ─────────────────

const scopeStyles: Record<AuditScope, string> = {
  IAM: "bg-orange-50 text-[#FF9800] border border-orange-200",

  SECURITY: "bg-red-50 text-red-500 border border-red-200",

  DATABASE: "bg-amber-50 text-amber-600 border border-amber-200",

  CONTENT: "bg-cyan-50 text-cyan-600 border border-cyan-200",

  SETTINGS: "bg-gray-100 text-gray-600 border border-gray-200",

  SYSTEM: "bg-violet-50 text-violet-600 border border-violet-200",
};

const scopeIcons: Record<AuditScope, LucideIcon> = {
  IAM: Shield,
  SECURITY: KeyRound,
  DATABASE: Database,
  CONTENT: FilePenLine,
  SETTINGS: UserCog,
  SYSTEM: Activity,
};

// ───────────────── COMPONENTS ─────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold tracking-widest text-[#FF9800] uppercase mb-3">
    {children}
  </p>
);

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 blur-3xl opacity-40 rounded-full" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-10">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400">
            {title}
          </p>

          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#FF9800]" />
          </div>
        </div>

        <div>
          <h2 className="text-[42px] leading-none font-semibold tracking-[-0.04em] text-gray-900">
            {value}
          </h2>

          <p className="mt-2 text-[14px] font-medium text-emerald-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

// ───────────────── PAGE ─────────────────

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);

  const [metrics, setMetrics] = useState<AuditMetrics>({
    totalEvents24h: 0,
    adminActions24h: 0,
    roleChanges24h: 0,
    dbModifications24h: 0,
  });

  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [topActors, setTopActors] = useState<TopActor[]>([]);

  const [compliance, setCompliance] = useState<ComplianceData>({
    enabled: false,
    retentionDays: 365,
    exportEnabled: false,
  });

  useEffect(() => {
    async function fetchAuditLogs() {
      try {
        const res = await fetch("/api/admin/audit-logs");

        const data: AuditApiResponse = await res.json();

        if (!data.success) return;

        setMetrics(data.metrics);

        setLogs(data.logs);

        setTopActors(data.topActors);

        setCompliance(data.compliance);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuditLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-[#F5F5F5] font-sans">
        <AdminSidebar />

        <main className="pl-72 flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-400 font-medium">
            Loading audit logs...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F5F5F5] font-sans">
      <AdminSidebar />

      <main className="pl-72 flex-1">
        <div className="px-8 py-8 lg:px-10 space-y-8">
          {/* HEADER */}

          <div>
            <SectionLabel>Threat Intelligence</SectionLabel>

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Audit logs &amp; Activity Trails
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  AI-flagged events with real-time frequency analysis.
                </p>
              </div>

              <span className="text-[11px] text-gray-400 font-medium">
                Last updated: just now
              </span>
            </div>
          </div>

          {/* KPI */}

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Events (24h)"
              value={metrics.totalEvents24h.toLocaleString()}
              subtitle="Live audit volume"
              icon={Activity}
            />

            <StatCard
              title="Admin Actions"
              value={metrics.adminActions24h.toLocaleString()}
              subtitle="privileged operations"
              icon={Shield}
            />

            <StatCard
              title="Role Changes"
              value={metrics.roleChanges24h.toLocaleString()}
              subtitle="permission mutations"
              icon={Users}
            />

            <StatCard
              title="DB Modifications"
              value={metrics.dbModifications24h.toLocaleString()}
              subtitle="schema & data actions"
              icon={Database}
            />
          </section>

          {/* MAIN */}

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* TABLE */}

            <div className="xl:col-span-8 bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden flex flex-col">
              {/* TOP HEADER */}

              <div className="px-8 py-7 border-b border-gray-100 shrink-0">
                <h2 className="text-[18px] font-semibold text-gray-900 tracking-[-0.02em]">
                  Action history
                </h2>
              </div>

              {/* TABLE HEADER */}

              <div className="grid grid-cols-12 px-8 py-4 border-b border-gray-100 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 shrink-0">
                <div className="col-span-2">When</div>

                <div className="col-span-3">Actor</div>

                <div className="col-span-4">Action</div>

                <div className="col-span-2">Target</div>

                <div className="col-span-1">Scope</div>
              </div>

              {/* SCROLLABLE ROWS */}

              <div className="overflow-y-auto max-h-205">
                {logs.map((log) => {
                  const Icon = scopeIcons[log.scope] || Activity;

                  return (
                    <div
                      key={log.id}
                      className="grid grid-cols-12 px-8 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-2 text-sm text-gray-500 font-medium">
                        {log.time}
                      </div>

                      <div className="col-span-3 text-sm text-gray-900 font-semibold truncate pr-4">
                        {log.actor}
                      </div>

                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#FF9800]" />
                        </div>

                        <span className="text-[14px] font-medium text-gray-900">
                          {log.action}
                        </span>
                      </div>

                      <div className="col-span-2 text-[13px] text-gray-500 font-medium font-mono">
                        {log.target}
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                            scopeStyles[log.scope]
                          }`}
                        >
                          {log.scope}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="xl:col-span-4 space-y-6">
              {/* TOP ACTORS */}

              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-7">
                <div className="flex items-center justify-between mb-7">
                  <h3 className="text-[18px] font-semibold text-gray-900 tracking-[-0.02em]">
                    Top Contributors (30d)
                  </h3>

                  <div className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF9800] text-xs font-bold">
                    {topActors.length}
                  </div>
                </div>

                <div className="space-y-6">
                  {topActors.slice(0, 5).map((actor, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-700 font-semibold truncate">
                          {actor.name}
                        </p>

                        <span className="text-[#FF9800] text-sm font-bold">
                          {actor.value}
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FF9800]"
                          style={{
                            width: `${Math.min(actor.value / 10, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPLIANCE */}
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-7">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Compliance
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Retention</span>

                    <span className="text-gray-900 font-semibold">
                      {compliance.retentionDays} days
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">
                      Tamper-evident
                    </span>

                    <div className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-bold">
                      {compliance.enabled ? "Enabled" : "Disabled"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Export</span>

                    <div className="flex items-center gap-1 text-gray-900 font-semibold">
                      {compliance.exportEnabled ? "Available" : "Unavailable"}

                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-6 h-6 text-emerald-600" />
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          Audit integrity verified
                        </p>

                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                          No suspicious log tampering or integrity violations
                          detected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
