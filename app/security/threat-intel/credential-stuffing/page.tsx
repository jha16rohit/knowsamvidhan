"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Shield,
  KeyRound,
  Users,
  Activity,
  TrendingDown,
  Clock,
  Lock,
  UserX,
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
  { time: "00:00", count: 45, blocked: 44 },
  { time: "04:00", count: 32, blocked: 31 },
  { time: "08:00", count: 128, blocked: 124 },
  { time: "12:00", count: 267, blocked: 258 },
  { time: "16:00", count: 312, blocked: 298 },
  { time: "20:00", count: 198, blocked: 189 },
  { time: "24:00", count: 87, blocked: 83 },
];

const attackOrigins = [
  { name: "VPN Exit Nodes", value: 42, color: "#ef4444" },
  { name: "Proxy Networks", value: 28, color: "#f97316" },
  { name: "Datacenter IPs", value: 18, color: "#eab308" },
  { name: "Residential Proxies", value: 8, color: "#22c55e" },
  { name: "Other", value: 4, color: "#3b82f6" },
];

const recentIncidents = [
  { id: 1, source: "103.45.67.89", email: "john.doe@example.com", target: "/api/login", status: "blocked", attempts: 45, time: "2 min ago" },
  { id: 2, source: "185.220.101.45", email: "admin@company.org", target: "/api/login", status: "blocked", attempts: 128, time: "7 min ago" },
  { id: 3, source: "45.33.32.156", email: "user123@webmail.com", target: "/api/auth", status: "success", attempts: 234, time: "14 min ago" },
  { id: 4, source: "198.51.100.23", email: "test@corporate.net", target: "/api/login", status: "blocked", attempts: 67, time: "21 min ago" },
  { id: 5, source: "172.16.0.99", email: "support@startup.io", target: "/api/reset", status: "blocked", attempts: 89, time: "28 min ago" },
];

const topTargetedAccounts = [
  { email: "admin@company.org", attempts: 156, lastAttempt: "7 min ago", compromised: false },
  { email: "john.doe@example.com", attempts: 124, lastAttempt: "2 min ago", compromised: false },
  { email: "user123@webmail.com", attempts: 234, lastAttempt: "14 min ago", compromised: true },
  { email: "test@corporate.net", attempts: 98, lastAttempt: "21 min ago", compromised: false },
  { email: "support@startup.io", attempts: 87, lastAttempt: "28 min ago", compromised: false },
];

export default function CredentialStuffingPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans">
      <AdminSidebar />
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                <KeyRound className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Credential Stuffing</h1>
                <p className="text-sm text-zinc-400">Account Takeover Threat Analysis</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              Credential stuffing uses stolen username/password pairs from data breaches to attempt automated 
              login across multiple sites, exploiting users who reuse passwords.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg border border-amber-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-amber-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Total Attempts</p>
                  <p className="mt-2 text-3xl font-black text-white">1,069</p>
                  <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> +15% from yesterday
                  </p>
                </div>
                <KeyRound className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-amber-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Blocked</p>
                  <p className="mt-2 text-3xl font-black text-white">1,027</p>
                  <p className="mt-1 text-xs text-emerald-400">96.1% success rate</p>
                </div>
                <Ban className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-red-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Successful Breaches</p>
                  <p className="mt-2 text-3xl font-black text-white">42</p>
                  <p className="mt-1 text-xs text-red-400">Requires password reset</p>
                </div>
                <UserX className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="rounded-lg border border-orange-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-orange-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Unique IPs</p>
                  <p className="mt-2 text-3xl font-black text-white">156</p>
                  <p className="mt-1 text-xs text-zinc-400">Attack sources</p>
                </div>
                <Users className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-2 rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Attack Timeline</h3>
                  <p className="text-xs text-zinc-500">Login attempts over last 24 hours</p>
                </div>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        timeRange === range
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
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
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="url(#colorTotal)" strokeWidth={2} name="Total" />
                    <Area type="monotone" dataKey="blocked" stroke="#22c55e" fill="url(#colorBlocked)" strokeWidth={2} name="Blocked" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attack Origins Pie */}
            <div className="rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
              <div className="mb-6">
                <h3 className="text-base font-bold text-white">Attack Origins</h3>
                <p className="text-xs text-zinc-500">Network source distribution</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attackOrigins}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attackOrigins.map((entry, index) => (
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
                {attackOrigins.map((type) => (
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
            <div className="rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Incidents</h3>
                  <p className="text-xs text-zinc-500">Login attempt feed</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium border border-amber-500/30">
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
                      <div className={`p-1.5 rounded-lg ${incident.status === "blocked" ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                        {incident.status === "blocked" ? (
                          <Shield className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{incident.email}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{incident.attempts} attempts • {incident.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        incident.status === "blocked" 
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}>
                        {incident.status === "blocked" ? "Blocked" : "Breached"}
                      </span>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {incident.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Targeted Accounts */}
            <div className="rounded-xl border border-amber-500/20 bg-[#0d1117] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">Top Targeted Accounts</h3>
                <p className="text-xs text-zinc-500">Most attempted logins</p>
              </div>
              <div className="space-y-3">
                {topTargetedAccounts.map((account, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      account.compromised ? "border-red-500/30 bg-red-500/10" : "border-zinc-800 bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${account.compromised ? "bg-red-500/20" : "bg-zinc-800"}`}>
                        {account.compromised ? (
                          <Lock className="w-4 h-4 text-red-400" />
                        ) : (
                          <UserX className="w-4 h-4 text-zinc-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{account.email}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{account.attempts.toLocaleString()} attempts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {account.compromised ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          Compromised
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Safe
                        </span>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">{account.lastAttempt}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-colors">
                Force Password Reset
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}