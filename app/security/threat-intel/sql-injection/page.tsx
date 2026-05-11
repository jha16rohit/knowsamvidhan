"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Shield,
  Bug,
  Server,
  Globe,
  Activity,
  TrendingDown,
  Clock,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const incidentData = [
  { time: "00:00", count: 12, blocked: 11 },
  { time: "04:00", count: 8, blocked: 8 },
  { time: "08:00", count: 45, blocked: 42 },
  { time: "12:00", count: 78, blocked: 74 },
  { time: "16:00", count: 156, blocked: 148 },
  { time: "20:00", count: 89, blocked: 85 },
  { time: "24:00", count: 34, blocked: 32 },
];

const attackTypes = [
  { name: "UNION SELECT", value: 35, color: "#ef4444" },
  { name: "OR '1'='1'", value: 28, color: "#f97316" },
  { name: "DROP TABLE", value: 18, color: "#eab308" },
  { name: "COMMENT INJECT", value: 12, color: "#22c55e" },
  { name: "STACKED QUERY", value: 7, color: "#3b82f6" },
];

const recentIncidents = [
  { id: 1, source: "192.168.1.105", payload: "admin' OR '1'='1", target: "/api/login", blocked: true, time: "2 min ago" },
  { id: 2, source: "45.33.32.156", payload: "UNION SELECT * FROM users", target: "/api/search", blocked: true, time: "8 min ago" },
  { id: 3, source: "203.0.113.42", payload: "' DROP TABLE sessions--", target: "/api/auth", blocked: true, time: "15 min ago" },
  { id: 4, source: "198.51.100.23", payload: "1; DELETE FROM orders", target: "/api/orders", blocked: true, time: "22 min ago" },
  { id: 5, source: "172.16.0.99", payload: "/**/UNION/**/SELECT/**/password", target: "/api/users", blocked: false, time: "31 min ago" },
];

const vulnerableEndpoints = [
  { endpoint: "/api/login", risk: "Critical", attempts: 1247, lastAttack: "2 min ago" },
  { endpoint: "/api/search", risk: "High", attempts: 892, lastAttack: "8 min ago" },
  { endpoint: "/api/users", risk: "High", attempts: 654, lastAttack: "15 min ago" },
  { endpoint: "/api/orders", risk: "Medium", attempts: 321, lastAttack: "22 min ago" },
];

export default function SQLInjectionPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans">
      <AdminSidebar />
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                <Bug className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SQL Injection</h1>
                <p className="text-sm text-zinc-400">Threat Intelligence Analysis</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              SQL injection attacks attempt to inject malicious SQL code into queries to manipulate databases, 
              extract data, or destroy entire tables.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg border border-red-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-red-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Total Attempts</p>
                  <p className="mt-2 text-3xl font-black text-white">422</p>
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> +12% from yesterday
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-red-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Blocked</p>
                  <p className="mt-2 text-3xl font-black text-white">398</p>
                  <p className="mt-1 text-xs text-emerald-400">94.3% success rate</p>
                </div>
                <Ban className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="rounded-lg border border-orange-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-orange-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Unique Payloads</p>
                  <p className="mt-2 text-3xl font-black text-white">156</p>
                  <p className="mt-1 text-xs text-zinc-400">Active variants</p>
                </div>
                <Bug className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-amber-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Vulnerable Endpoints</p>
                  <p className="mt-2 text-3xl font-black text-white">4</p>
                  <p className="mt-1 text-xs text-amber-400">Requires attention</p>
                </div>
                <Server className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-2 rounded-xl border border-red-500/20 bg-[#0d1117] p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Attack Timeline</h3>
                  <p className="text-xs text-zinc-500">Attempts over last 24 hours</p>
                </div>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        timeRange === range
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={incidentData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#52525b" fontSize={11} />
                    <YAxis stroke="#52525b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                      labelStyle={{ color: "#a1a1aa" }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#ef4444" fill="url(#colorTotal)" strokeWidth={2} name="Total" />
                    <Area type="monotone" dataKey="blocked" stroke="#22c55e" fill="url(#colorBlocked)" strokeWidth={2} name="Blocked" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attack Types Pie */}
            <div className="rounded-xl border border-red-500/20 bg-[#0d1117] p-5">
              <div className="mb-6">
                <h3 className="text-base font-bold text-white">Attack Vectors</h3>
                <p className="text-xs text-zinc-500">Distribution by type</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attackTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attackTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {attackTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-zinc-400">{type.name}</span>
                    </div>
                    <span className="text-white font-medium">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Incidents */}
            <div className="rounded-xl border border-red-500/20 bg-[#0d1117] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Incidents</h3>
                  <p className="text-xs text-zinc-500">Live attack feed</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/30">
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${incident.blocked ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                        {incident.blocked ? (
                          <Shield className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{incident.source}</p>
                        <p className="text-xs text-red-400 truncate max-w-48">{incident.payload}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">{incident.target}</p>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {incident.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vulnerable Endpoints */}
            <div className="rounded-xl border border-red-500/20 bg-[#0d1117] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">Vulnerable Endpoints</h3>
                <p className="text-xs text-zinc-500">Requires immediate attention</p>
              </div>
              <div className="space-y-3">
                {vulnerableEndpoints.map((endpoint, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-zinc-500" />
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{endpoint.endpoint}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{endpoint.attempts.toLocaleString()} attempts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        endpoint.risk === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                        endpoint.risk === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {endpoint.risk}
                      </span>
                      <p className="text-xs text-zinc-500 mt-1">{endpoint.lastAttack}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
                View All Vulnerabilities
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}