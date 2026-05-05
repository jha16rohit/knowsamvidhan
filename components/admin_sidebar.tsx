"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  AlignLeft,
  BarChart3,
  Bell,
  BookOpen,
  Bug,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Database,
  FileText,
  Gavel,
  GraduationCap,
  History,
  Landmark,
  LayoutDashboard,
  Lock,
  LogOut,
  ScrollText,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Users,
  MessageCircle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface SidebarItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: SidebarItem[];
}


// ─────────────────────────────────────────────
// SIDEBAR ITEMS
// ─────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/ad-dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Constitutional Parts",
    icon: Landmark,

    children: [
      {
        title: "Parts",
        href: "/parts",
        icon: ScrollText,
      },

      {
        title: "Preamble",
        href: "/preamble",
        icon: BookOpen,
      },

      {
        title: "Articles",
        href: "/articles",
        icon: FileText,
      },

      {
        title: "Clauses",
        href: "/clauses",
        icon: AlignLeft,
      },

      {
        title: "Schedules",
        href: "/schedules",
        icon: CalendarDays,
      },

      {
        title: "Amendments",
        href: "/amendments",
        icon: History,
      },

      {
        title: "Quizzes",
        href: "/quizzes",
        icon: GraduationCap,
      },
       {
        title: "Feedbacks Analytics",
        href: "/feedback",
        icon: MessageCircle,
      },
    ],
  },

  {
    title: "Security",
    icon: ShieldAlert,

    children: [
      {
        title: "Threat Detection",
        href: "/security/threat-detection",
        icon: Siren,
      },

      {
        title: "Security Alerts",
        href: "/security/alerts",
        icon: Bell,
      },

      {
        title: "Fraud Monitoring",
        href: "/security/fraud-monitoring",
        icon: ShieldCheck,
      },

      {
        title: "Breach Reports",
        href: "/security/breach-reports",
        icon: Bug,
      },

      {
        title: "Authentication Logs",
        href: "/security/auth-logs",
        icon: Lock,
      },

      {
        title: "User Activity",
        href: "/security/users",
        icon: Activity,
      },
    ],
  },

  {
    title: "Analytics Dashboard",
    icon: BarChart3,

    children: [
      {
        title: "Platform Analytics",
        href: "/analytics/platform_analytics",
        icon: BarChart3,
      },

      {
        title: "Alert Logs",
        href: "/analytics/alert_logs",
        icon: Bell,
      },

      {
        title: "Audit Logs",
        href: "/analytics/audit-logs",
        icon: ClipboardList,
      },

      {
        title: "Database Monitoring",
        href: "/analytics/database",
        icon: Database,
      },

      {
        title: "Users Analytics",
        href: "/analytics/user_analytics",
        icon: Users,
      },
     
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      window.location.replace("/admin-xyz");
    }
  };

  const defaultOpenMenus = useMemo(() => {
    const open: string[] = [];
    sidebarItems.forEach((item) => {
      if (
        item.children?.some((child) => pathname.startsWith(child.href || ""))
      ) {
        open.push(item.title);
      }
    });
    return open;
  }, [pathname]);

  const [openMenus, setOpenMenus] = useState<string[]>(defaultOpenMenus);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((i) => i !== menu) : [...prev, menu],
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 w-72 h-screen bg-[#0b1220] border-r border-gray-800 flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-4">
        <div className="shrink-0 p-1.5 rounded-xl">
          <Image
            src="/image/logo.png"
            alt="KnowSamvidhan Logo"
            width={40}
            height={40}
            className="rounded-lg object-contain"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-white leading-none tracking-tight">
            Know<span className="text-orange-500">Samvidhan</span>
          </h1>
          <p className="text-[9px] tracking-[0.25em] uppercase text-gray-500 font-bold mt-1.5">
            Admin Control Panel
          </p>
        </div>
      </div>

      {/* NAVIGATION SECTION */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {sidebarItems.map((item) => {
          const isOpen = openMenus.includes(item.title);

          if (!item.children) {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-[#172033]"
                }`}
              >
                <Icon className="w-5 h-5" />

                {item.title}
              </Link>
            );
          }

          const ParentIcon = item.icon;
          const hasActiveChild = item.children.some((child) =>
            pathname.startsWith(child.href || ""),
          );

          return (
            <div
              key={item.title}
              className={`rounded-2xl overflow-hidden border transition-all ${
                hasActiveChild
                  ? "border-orange-500/30 bg-[#121c30]"
                  : "border-gray-800 bg-[#111827]/50"
              }`}
            >
              {/* Parent Button */}
              <button
                onClick={() => toggleMenu(item.title)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#172033] transition-all"
              >
                <div className="flex items-center gap-3">
                  <ParentIcon
                    className={`w-5 h-5 ${
                      hasActiveChild ? "text-orange-400" : "text-gray-400"
                    }`}
                  />

                  <span
                    className={`text-sm font-semibold ${
                      hasActiveChild ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Child Routes */}
              {isOpen && (
                <div className="px-2 pb-3 space-y-1">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;

                    const isChildActive = pathname === child.href;

                    return (
                      <Link
                        key={child.title}
                        href={child.href!}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 ${
                          isChildActive
                            ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            : "text-gray-400 hover:text-white hover:bg-[#1b2740]"
                        }`}
                      >
                        <ChildIcon className="w-4 h-4" />

                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* USER & LOGOUT SECTION */}
      <div className="p-4 bg-[#080d16] border-t border-gray-800">
        {/* ADMINISTRATION BLOCK */}
        <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-[#121826] border border-gray-700 shadow-inner mb-3">
          {/* AVATAR */}
          <div className="w-11 h-11 rounded-2xl bg-lineara-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0">
            AD
          </div>

          {/* INFO */}
          <div>
            <p className="text-sm font-bold text-white">Administrator</p>

            <p className="text-[11px] text-orange-400 uppercase tracking-wider font-semibold mt-0.5">
              Admin Control Panel
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 transition-all border border-gray-700 shadow-inner hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />

          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
