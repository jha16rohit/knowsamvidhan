"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Shield,
  Fingerprint,
  Activity,
  TrendingDown,
  Clock,
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
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
  { time: "00:00", count: 8, blocked: 7 },
  { time: "04:00", count: 5, blocked: 5 },
  { time: "08:00", count: 23, blocked: 21 },
  { time: "12:00", count: 45, blocked: 40 },
  { time: "16:00", count: 67, blocked: 59 },
  { time: "20:00", count: 42, blocked: 37 },
  { time: "24:00", count: 18, blocked: 16 },
];

const attackMethods = [
  { name: "Cookie Theft", value: 38, color: "#ef4444" },
  { name: "Session Fixation", value: 25, color: "#f97316" },
  { name: "MITM", value: 20, color: "#eab308" },
  { name: "XSS Stealer", value: 12, color: "#3b82f6" },
  { name: "URL Hijack", value: 5, color: "#22c55e" },
];

const recentIncidents = [
  { id: 1, sessionId: "sess_8f3a2b1c", user: "admin@company.org", method: "Cookie Theft", device: "Chrome / Windows", location: "Mumbai, IN", blocked: true, time: "3 min ago" },
  { id: 2, sessionId: "sess_7d9c4e2f", user: "john.doe@example.com", method: "MITM", device: "Safari / macOS", location: "Delhi, IN", blocked: true, time: "11 min ago" },
  { id: 3, sessionId: "sess_6a8b3d1e", user: "user123@webmail.com", method: "Session Fixation", device: "Firefox / Linux", location: "Unknown", blocked: true, time: "19 min ago" },
  { id: 4, sessionId: "sess_5f7c2e9a", user: "test@corporate.net", method: "XSS Stealer", device: "Chrome / Android", location: "Bangalore, IN", blocked: false, time: "27 min ago" },
  { id: 5, sessionId: "sess_4e9d1b8c", user: "support@startup.io", method: "Cookie Theft", device: "Edge / Windows", location: "Chennai, IN", blocked: true, time: "34 min ago" },
];

const compromisedSessions = [
  { sessionId: "sess_5f7c2e9a", user: "user123@webmail.com", created: "2 hours ago", lastActive: "27 min ago", ip: "192.168.1.45" },
  { sessionId: "sess_2a3b4c5d", user: "marketing@corp.org", created: "5 hours ago", lastActive: "1 hour ago", ip: "10.0.0.23" },
  { sessionId: "sess_9e8f7a6b", user: "editor@news.com", created: "1 day ago", lastActive: "3 hours ago", ip: "172.16.0.99" },
];

export default function SessionHijackingPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans">
      <AdminSidebar />
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Fingerprint className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Session Hijacking</h1>
                <p className="text-sm text-zinc-400">Session Token Compromise Analysis</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              Session hijacking attacks steal or forge session tokens to take over user sessions, allowing 
              attackers to impersonate legitimate users and access their accounts.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg border border-purple-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-purple-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Total Attempts</p>
                  <p className="mt-2 text-3xl font-black text-white">208</p>
                  <p className="mt-1 text-xs text-purple-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> +5% from yesterday
                  </p>
                </div>
                <Fingerprint className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="rounded-lg border border-purple-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-purple-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Blocked</p>
                  <p className="mt-2 text-3xl font-black text-white">185</p>
                  <p className="mt-1 text-xs text-emerald-400">88.9% success rate</p>
                </div>
                <Ban className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-red-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Active Compromises</p>
                  <p className="mt-2 text-3xl font-black text-white">3</p>
                  <p className="mt-1 text-xs text-red-400">Requires immediate action</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="rounded-lg border border-purple-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-purple-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Devices Targeted</p>
                  <p className="mt-2 text-3xl font-black text-white">5</p>
                  <p className="mt-1 text-xs text-zinc-400">Unique device types</p>
                </div>
                <Monitor className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-2 rounded-xl border border-purple-500/20 bg-[#0d1117] p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Attack Timeline</h3>
                  <p className="text-xs text-zinc-500">Session hijacking attempts over last 24 hours</p>
                </div>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        timeRange === range
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
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
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="count" stroke="#a855f7" fill="url(#colorTotal)" strokeWidth={2} name="Total" />
                    <Area type="monotone" dataKey="blocked" stroke="#22c55e" fill="url(#colorBlocked)" strokeWidth={2} name="Blocked" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attack Methods Pie */}
            <div className="rounded-xl border border-purple-500/20 bg-[#0d1117] p-5">
              <div className="mb-6">
                <h3 className="text-base font-bold text-white">Attack Methods</h3>
                <p className="text-xs text-zinc-500">Technique distribution</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attackMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attackMethods.map((entry, index) => (
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
                {attackMethods.map((method) => (
                  <div key={method.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: method.color }} />
                      <span className="text-zinc-400">{method.name}</span>
                    </div>
                    <span className="text-white font-medium">{method.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Incidents */}
            <div className="rounded-xl border border-purple-500/20 bg-[#0d1117] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Incidents</h3>
                  <p className="text-xs text-zinc-500">Live session attack feed</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium border border-purple-500/30">
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
                      <div className={`p-1.5 rounded-lg ${incident.blocked ? "bg-emerald-500/20" : "bg-purple-500/20"}`}>
                        {incident.blocked ? (
                          <Shield className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{incident.sessionId}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{incident.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-purple-400">{incident.method}</span>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {incident.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compromised Sessions */}
            <div className="rounded-xl border border-red-500/20 bg-[#0d1117] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">Compromised Sessions</h3>
                <p className="text-xs text-zinc-500">Active sessions requiring termination</p>
              </div>
              <div className="space-y-3">
                {compromisedSessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-red-500/30 bg-red-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-red-500/20">
                        <Fingerprint className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{session.sessionId}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{session.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-red-400">{session.ip}</p>
                      <p className="text-xs text-zinc-500 mt-1">{session.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Terminate All Compromised Sessions
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}