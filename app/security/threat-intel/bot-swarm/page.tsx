"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin_sidebar";
import {
  AlertTriangle,
  Ban,
  Shield,
  Bot,
  Cpu,
  Globe,
  Activity,
  TrendingDown,
  Clock,
  Server,
  Network,
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
  { time: "00:00", count: 234, blocked: 230 },
  { time: "04:00", count: 189, blocked: 187 },
  { time: "08:00", count: 567, blocked: 558 },
  { time: "12:00", count: 892, blocked: 875 },
  { time: "16:00", count: 1234, blocked: 1208 },
  { time: "20:00", count: 978, blocked: 956 },
  { time: "24:00", count: 456, blocked: 448 },
];

const botCategories = [
  { name: "Scrapers", value: 32, color: "#ef4444" },
  { name: "Crawlers", value: 28, color: "#f97316" },
  { name: "Spammers", value: 18, color: "#eab308" },
  { name: "DDoS Bots", value: 12, color: "#dc2626" },
  { name: "Scanners", value: 10, color: "#22c55e" },
];

const recentIncidents = [
  { id: 1, source: "45.33.32.156", type: "Scraper", target: "/api/products", rate: "45 req/s", blocked: true, time: "2 min ago" },
  { id: 2, source: "185.220.101.45", type: "Crawler", target: "/api/content", rate: "120 req/s", blocked: true, time: "5 min ago" },
  { id: 3, source: "103.45.67.89", type: "Spammer", target: "/api/comments", rate: "89 req/s", blocked: true, time: "12 min ago" },
  { id: 4, source: "198.51.100.23", type: "DDoS Bot", target: "/api/search", rate: "500+ req/s", blocked: true, time: "18 min ago" },
  { id: 5, source: "172.16.0.88", type: "Scanner", target: "/api/admin", rate: "234 req/s", blocked: false, time: "25 min ago" },
];

const topBotNetworks = [
  { network: "Cloudflare", origin: "Global CDN", requests: "45.2K", percentage: 34, risk: "Medium" },
  { network: "AWS Data Center", origin: "US-East", requests: "28.7K", percentage: 22, risk: "Low" },
  { network: "Google Cloud", origin: "US-West", requests: "21.3K", percentage: 16, risk: "Low" },
  { network: "Azure", origin: "EU-West", requests: "18.9K", percentage: 14, risk: "Medium" },
  { network: "Residential ISPs", origin: "Various", requests: "18.2K", percentage: 14, risk: "High" },
];

export default function BotSwarmPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans">
      <AdminSidebar />
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Bot Swarm</h1>
                <p className="text-sm text-zinc-400">Automated Traffic Analysis</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl mt-2">
              Bot swarm analysis detects and monitors automated traffic from scrapers, crawlers, spammers, and 
              malicious bots that attempt to overwhelm servers or extract content.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg border border-cyan-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-cyan-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Total Requests</p>
                  <p className="mt-2 text-3xl font-black text-white">4.55K</p>
                  <p className="mt-1 text-xs text-cyan-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> +22% from yesterday
                  </p>
                </div>
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-cyan-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Blocked</p>
                  <p className="mt-2 text-3xl font-black text-white">4.46K</p>
                  <p className="mt-1 text-xs text-emerald-400">98% success rate</p>
                </div>
                <Ban className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-red-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Peak Rate</p>
                  <p className="mt-2 text-3xl font-black text-white">500+</p>
                  <p className="mt-1 text-xs text-red-400">req/s (DDoS attempt)</p>
                </div>
                <Cpu className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/20 bg-[#0d1117] p-5 bg-linear-to-br from-cyan-500/20 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">Bot Networks</p>
                  <p className="mt-2 text-3xl font-black text-white">156</p>
                  <p className="mt-1 text-xs text-zinc-400">Identified networks</p>
                </div>
                <Network className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-2 rounded-xl border border-cyan-500/20 bg-[#0d1117] p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Traffic Timeline</h3>
                  <p className="text-xs text-zinc-500">Bot requests over last 24 hours</p>
                </div>
                <div className="flex gap-2">
                  {["1h", "6h", "24h", "7d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        timeRange === range
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
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
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="count" stroke="#06b6d4" fill="url(#colorTotal)" strokeWidth={2} name="Total" />
                    <Area type="monotone" dataKey="blocked" stroke="#22c55e" fill="url(#colorBlocked)" strokeWidth={2} name="Blocked" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bot Categories Pie */}
            <div className="rounded-xl border border-cyan-500/20 bg-[#0d1117] p-5">
              <div className="mb-6">
                <h3 className="text-base font-bold text-white">Bot Categories</h3>
                <p className="text-xs text-zinc-500">Type distribution</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={botCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {botCategories.map((entry, index) => (
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
                {botCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-zinc-400">{cat.name}</span>
                    </div>
                    <span className="text-white font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Incidents */}
            <div className="rounded-xl border border-cyan-500/20 bg-[#0d1117] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Recent Incidents</h3>
                  <p className="text-xs text-zinc-500">Live bot traffic feed</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium border border-cyan-500/30">
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
                      <div className={`p-1.5 rounded-lg ${incident.blocked ? "bg-emerald-500/20" : "bg-cyan-500/20"}`}>
                        {incident.blocked ? (
                          <Shield className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Bot className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300 font-mono">{incident.source}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{incident.type} • {incident.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-cyan-400 font-medium">{incident.rate}</span>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {incident.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Bot Networks */}
            <div className="rounded-xl border border-cyan-500/20 bg-[#0d1117] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">Top Bot Networks</h3>
                <p className="text-xs text-zinc-500">Highest traffic sources</p>
              </div>
              <div className="space-y-3">
                {topBotNetworks.map((network, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-cyan-500/20">
                        <Globe className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300">{network.network}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{network.origin}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white font-medium">{network.requests}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        network.risk === "High" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                        network.risk === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                        "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      }`}>
                        {network.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 transition-colors">
                Configure Bot Rules
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}