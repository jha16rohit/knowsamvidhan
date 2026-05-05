"use client";

import React from "react";
import {
  AlertCircle,
  TrendingUp,
  Clock,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";
import AdminSidebar from "@/components/admin_sidebar";

export default function AdminDashboardPage() {
  const chartBars = [15, 45, 25, 35, 75, 25, 40, 85, 45, 60, 25, 45, 35, 70];

  const days = [
    "W1·M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
    "W2·M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">

      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <p className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-2">
              Overview
            </p>

            <h2 className="text-3xl font-serif text-gray-900 mb-1">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Platform health at a glance — users, content and engagement.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  Total Users
                </p>

                <Users className="w-5 h-5 text-[#10b981]" />
              </div>

              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">
                  12,840
                </h3>

                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.2%
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  Articles
                </p>

                <BookOpen className="w-5 h-5 text-[#f59e0b]" />
              </div>

              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">
                  395
                </h3>

                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +3
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  Amendments
                </p>

                <Clock className="w-5 h-5 text-gray-800" />
              </div>

              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">
                  106
                </h3>

                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +1
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  Quizzes
                </p>

                <GraduationCap className="w-5 h-5 text-[#10b981]" />
              </div>

              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-serif text-gray-900 font-bold">
                  248
                </h3>

                <span className="px-2 py-1 bg-green-50/80 text-green-600 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12
                </span>
              </div>
            </div>
          </div>

          {/* Chart & Pending Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Daily active users
                </h3>

                <span className="px-3 py-1 bg-orange-50 text-[#d97706] text-[10px] font-bold rounded-full border border-orange-100">
                  Last 14 days
                </span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 px-2">
                {chartBars.map((height, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 gap-3 group h-full justify-end"
                  >
                    <div
                      className="w-full bg-linear-to-t from-[#f97316] to-[#fbbf24] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center px-2 mt-4">
                {days.map((day, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-bold text-gray-400 w-full text-center"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Pending Updates */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 flex flex-col">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-6">
                Pending updates
              </h3>

              <div className="space-y-3 flex-1">
                {[
                  "Review AI explanation for Article 32",
                  "Approve new 105th amendment entry",
                  "5 user reports awaiting triage",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0" />

                    <span className="text-sm text-gray-700 font-medium">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Read */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">
                Most read articles
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "Article 21",
                    sub: "Right to life",
                    count: "8,420",
                  },
                  {
                    label: "Article 14",
                    sub: "Equality before law",
                    count: "6,210",
                  },
                  {
                    label: "Article 19",
                    sub: "Six freedoms",
                    count: "5,870",
                  },
                  {
                    label: "Article 32",
                    sub: "Constitutional remedies",
                    count: "4,310",
                  },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex justify-between items-center ${
                      i < arr.length - 1 ? "pb-3 border-b border-gray-50" : ""
                    }`}
                  >
                    <span className="text-sm text-gray-800 font-medium">
                      {row.label}

                      <span className="text-gray-400 font-normal ml-1">
                        — {row.sub}
                      </span>
                    </span>

                    <span className="text-sm font-bold text-[#d97706]">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Quizzes */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">
                Top quizzes
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "Fundamental Rights",
                    sub: "Basic",
                    count: "3,120",
                  },
                  {
                    label: "Amendments timeline",
                    sub: "Moderate",
                    count: "2,480",
                  },
                  {
                    label: "Landmark cases",
                    sub: "Advanced",
                    count: "1,740",
                  },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex justify-between items-center ${
                      i < arr.length - 1 ? "pb-3 border-b border-gray-50" : ""
                    }`}
                  >
                    <span className="text-sm text-gray-800 font-medium">
                      {row.label}

                      <span className="text-gray-400 font-normal ml-1">
                        — {row.sub}
                      </span>
                    </span>

                    <span className="text-sm font-bold text-[#10b981]">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
