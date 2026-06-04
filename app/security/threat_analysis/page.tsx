"use client";

import React, { useCallback, useEffect, useState } from "react";

import AdminSidebar from "@/components/admin_sidebar";
import ThreatMap from "@/components/ThreatMap";
import {
  useThreatAnalysis,
  type ThreatAnalysisData,
} from "@/hooks/useSecurityStream";

import {
  Bot,
  KeyRound,
  Laptop,
  Radar,
  RefreshCw,
  Shield,
  Siren,
  Zap,
  AlertTriangle,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const severityColor = (severity?: string) => {
  switch ((severity || "").toLowerCase()) {
    case "critical":
      return "text-red-300 border-red-500/40 bg-red-500/15";
    case "high":
      return "text-orange-300 border-orange-500/40 bg-orange-500/15";
    case "medium":
      return "text-yellow-300 border-yellow-500/40 bg-yellow-500/15";
    default:
      return "text-emerald-300 border-emerald-500/40 bg-emerald-500/15";
  }
};

interface MetricCardProps {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ComponentType<{ size: number }>;
  isSecure: boolean;
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  isSecure,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        isSecure
          ? "border-emerald-500/20 bg-emerald-500/4 shadow-[0_0_35px_rgba(16,185,129,0.08)]"
          : "border-amber-500/20 bg-amber-500/3 shadow-[0_0_35px_rgba(245,158,11,0.08)]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            {label}
          </p>

          <h2
            className={`mt-5 text-4xl font-black ${
              isSecure ? "text-emerald-400" : "text-zinc-100"
            }`}
          >
            {value}
          </h2>

          <p
            className={`mt-2 text-xs ${
              isSecure ? "text-emerald-400/70" : "text-zinc-500"
            }`}
          >
            {detail}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3 ${
            isSecure
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-amber-500/20 bg-amber-500/10 text-amber-400"
          }`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

interface PanelProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isSecure: boolean;
}

function Panel({ title, subtitle, children, isSecure }: PanelProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        isSecure
          ? "border-emerald-500/20 bg-[#0d1117]"
          : "border-amber-500/20 bg-[#0d1117]"
      }`}
    >
      <div className="mb-5">
        <h3 className="text-base font-bold text-zinc-100">{title}</h3>

        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

export default function ThreatAnalysisPage() {
  const { data: streamData, isConnected } = useThreatAnalysis();
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<ThreatAnalysisData | null>(null);

  const data: ThreatAnalysisData = streamData || apiData || {
    status: "secure",
    isSecure: true,
    kpis: {
      activeThreats: 0,
      critical: 0,
      high: 0,
      medium: 0,
      suspiciousLogins: 0,
      botAttacks: 0,
      apiAbuse: 0,
      trafficSpikes: 0,
      geoAnomalies: 0,
      failedOtps: 0,
      badIpScore: 0,
      deviceMismatch: 0,
      aiConfidence: 100,
      trustedDevices: 0,
      untrustedDevices: 0,
      pendingReview: 0,
      openIncidents: 0,
      criticalIncidents: 0,
    },
    chartData: [],
    severityDistribution: [],
    liveFeed: [],
    heatmap: [],
    registry: [],
    anomaly: { confidence: 0, signals: [] },
    deviceTrust: { total: 0, trusted: 0, untrusted: 0, pending: 0, devices: [] },
    incidents: [],
    settings: [],
  };

  const isSecure = data?.isSecure === true;

  const kpis = data?.kpis ?? {
    activeThreats: 0,
    critical: 0,
    high: 0,
    medium: 0,
    suspiciousLogins: 0,
    botAttacks: 0,
    apiAbuse: 0,
    trafficSpikes: 0,
    geoAnomalies: 0,
    failedOtps: 0,
    badIpScore: 0,
    deviceMismatch: 0,
    aiConfidence: 100,
    trustedDevices: 0,
    untrustedDevices: 0,
    pendingReview: 0,
    openIncidents: 0,
    criticalIncidents: 0,
  };
  const chartData = data?.chartData || [];
  const severity = data?.severityDistribution || [];

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/security/threat-analysis", { cache: "no-store" });
      const json = await res.json();
      if (json && json.kpis) {
        setApiData(json);
      }
    } catch (e) {
      console.error("Failed to load threat data", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [load]);

  const failedColor = isSecure ? "#10b981" : "#f59e0b";

  const criticalColor = isSecure ? "#06b6d4" : "#ef4444";

  return (
    <>
      <AdminSidebar />

      <main className="min-h-screen overflow-hidden bg-[#06080b] text-zinc-100">
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${
                isSecure ? "rgba(16,185,129,0.04)" : "rgba(245,158,11,0.05)"
              } 1px, transparent 1px),
              linear-gradient(
                90deg,
                ${
                  isSecure ? "rgba(16,185,129,0.04)" : "rgba(245,158,11,0.05)"
                } 1px,
                transparent 1px
              )
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <section className="relative ml-72 p-6">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-xl border p-3 ${
                  isSecure
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                }`}
              >
                {isSecure ? (
                  <Shield size={22} />
                ) : (
                  <Radar size={22} className="animate-pulse" />
                )}
              </div>

              <div>
                <h1
                  className={`text-3xl font-black ${
                    isSecure ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  Security Operations Center
                </h1>

                <p className="mt-1 text-sm text-zinc-400">
                  {isSecure
                    ? "All systems operational and continuously monitored."
                    : "Real-time cyber threat monitoring and attack intelligence."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <span
                  className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                />
                <span className="text-xs text-zinc-400">
                  {isConnected ? "Live" : "Connecting..."}
                </span>
              </div>

              <button
                onClick={load}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold ${
                  isSecure
                    ? "bg-emerald-500 text-black"
                    : "bg-amber-400 text-black"
                }`}
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </header>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <MetricCard
                label="Active threats"
                value={kpis.activeThreats || 0}
                detail={`${kpis.critical || 0} critical`}
                icon={Siren}
                isSecure={isSecure}
              />

              <MetricCard
                label="Suspicious logins"
                value={kpis.suspiciousLogins || 0}
                detail="last 5 min"
                icon={KeyRound}
                isSecure={isSecure}
              />

              <MetricCard
                label="Bot attacks"
                value={kpis.botAttacks || 0}
                detail="auto mitigated"
                icon={Bot}
                isSecure={isSecure}
              />

              <MetricCard
                label="API abuse"
                value={kpis.apiAbuse || 0}
                detail="rate limited"
                icon={Zap}
                isSecure={isSecure}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.2fr]">
              <Panel
                title="Live Threat Feed"
                subtitle="Realtime threat telemetry"
                isSecure={isSecure}
              >
                <div className="max-h-85 space-y-3 overflow-y-auto pr-2">
                  {(data.liveFeed || []).map((item, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${severityColor(
                            item.severity,
                          )}`}
                        >
                          {item.severity}
                        </span>

                        <span className="text-sm text-zinc-300">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs text-zinc-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel
                title="Geo Threat Intelligence"
                subtitle="Realtime geographic threat mapping"
                isSecure={isSecure}
              >
                <ThreatMap data={data.heatmap || []} isSecure={isSecure} />
              </Panel>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
              <Panel
                title="Threat Trend Analytics"
                subtitle="24h realtime telemetry"
                isSecure={isSecure}
              >
                <div className="h-80">
                  <ResponsiveContainer>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="failedGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={failedColor}
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor={failedColor}
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="criticalGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={criticalColor}
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor={criticalColor}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <XAxis dataKey="hour" stroke="#71717a" fontSize={11} />

                      <YAxis stroke="#71717a" fontSize={11} />

                      <Tooltip
                        contentStyle={{
                          background: "#090d13",
                          border: `1px solid ${
                            isSecure ? "#10b98133" : "#f59e0b33"
                          }`,
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="failed"
                        stroke={failedColor}
                        fill="url(#failedGradient)"
                        strokeWidth={2}
                      />

                      <Area
                        type="monotone"
                        dataKey="critical"
                        stroke={criticalColor}
                        fill="url(#criticalGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <Panel
                title="Severity Distribution"
                subtitle="Incident classification"
                isSecure={isSecure}
              >
                <div className="h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={severity}
                        dataKey="value"
                        innerRadius={75}
                        outerRadius={105}
                        paddingAngle={5}
                      >
                        {severity.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          background: "#090d13",
                          border: `1px solid ${
                            isSecure ? "#10b98133" : "#f59e0b33"
                          }`,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <Panel
              title="Threat Registry"
              subtitle="Realtime detection signatures"
              isSecure={isSecure}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-500">
                    <tr>
                      <th className="pb-4 font-black uppercase tracking-wider">
                        Type
                      </th>

                      <th className="pb-4 font-black uppercase tracking-wider">
                        Severity
                      </th>

                      <th className="pb-4 font-black uppercase tracking-wider">
                        Source IP
                      </th>

                      <th className="pb-4 font-black uppercase tracking-wider">
                        Location
                      </th>

                      <th className="pb-4 font-black uppercase tracking-wider">
                        Last Seen
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {(data.registry || []).map((row, i: number) => (
                      <tr
                        key={i}
                        className="border-b border-zinc-800/50 hover:bg-zinc-800/20"
                      >
                        <td className="py-4 font-mono text-xs text-zinc-300">
                          {row.type}
                        </td>

                        <td className="py-4">
                          <span
                            className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${severityColor(
                              row.severity,
                            )}`}
                          >
                            {row.severity}
                          </span>
                        </td>

                        <td className="py-4 font-mono text-xs text-zinc-400">
                          {row.ip}
                        </td>

                        <td className="py-4 text-zinc-300">{row.country}</td>

                        <td className="py-4 text-zinc-500">{row.lastSeen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Panel
                title="Device Trust"
                subtitle="Device security status"
                isSecure={isSecure}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                      <Laptop className="mx-auto mb-2 h-6 w-6 text-emerald-400" />
                      <p className="text-2xl font-black text-emerald-400">{data.deviceTrust?.trusted || 0}</p>
                      <p className="text-xs text-zinc-500">Trusted</p>
                    </div>
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                      <Laptop className="mx-auto mb-2 h-6 w-6 text-amber-400" />
                      <p className="text-2xl font-black text-amber-400">{data.deviceTrust?.pending || 0}</p>
                      <p className="text-xs text-zinc-500">Pending</p>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
                      <Laptop className="mx-auto mb-2 h-6 w-6 text-red-400" />
                      <p className="text-2xl font-black text-red-400">{data.deviceTrust?.untrusted || 0}</p>
                      <p className="text-xs text-zinc-500">Untrusted</p>
                    </div>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {(data.deviceTrust?.devices || []).slice(0, 5).map((device) => (
                      <div key={device.id} className="flex items-center justify-between border-b border-zinc-800/50 py-2">
                        <div>
                          <p className="text-xs text-zinc-300 font-mono">{device.deviceId?.slice(0, 16)}...</p>
                          <p className="text-xs text-zinc-500">{device.country || "Unknown"}</p>
                        </div>
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                          device.trustScore >= 70 ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" :
                          device.trustScore >= 30 ? "border-amber-500/40 bg-amber-500/15 text-amber-300" :
                          "border-red-500/40 bg-red-500/15 text-red-300"
                        }`}>
                          {device.trustScore}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>

              <Panel
                title="Security Incidents"
                subtitle="Active breach reports"
                isSecure={isSecure}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
                      <AlertTriangle className="mx-auto mb-1 h-5 w-5 text-red-400" />
                      <p className="text-xl font-black text-red-400">{data.kpis.openIncidents || 0}</p>
                      <p className="text-xs text-zinc-500">Open</p>
                    </div>
                    <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 text-center">
                      <Siren className="mx-auto mb-1 h-5 w-5 text-orange-400" />
                      <p className="text-xl font-black text-orange-400">{data.kpis.criticalIncidents || 0}</p>
                      <p className="text-xs text-zinc-500">Critical</p>
                    </div>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {(data.incidents || []).slice(0, 5).map((incident) => (
                      <div key={incident.id} className="flex items-center justify-between border-b border-zinc-800/50 py-2">
                        <div>
                          <p className="text-sm text-zinc-300">{incident.title}</p>
                          <p className="text-xs text-zinc-500">{incident.incidentNumber}</p>
                        </div>
                        <div className="text-right">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${severityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                          <p className="text-xs text-zinc-500 mt-1">{incident.recoveryPercent}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
