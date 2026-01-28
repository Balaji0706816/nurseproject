// components/dashboard/SideNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  ClipboardList,
  LineChart,
  CalendarDays,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

const NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Daily Check-In", href: "/checkin", icon: <ClipboardList className="h-4 w-4" /> },
  { label: "Chat", href: "/stampley", icon: <MessageSquareText className="h-4 w-4" /> },
  { label: "Insights", href: "/insights", icon: <LineChart className="h-4 w-4" />, badge: "New" },
  { label: "Schedule", href: "/schedule", icon: <CalendarDays className="h-4 w-4" /> },
];

export default function SideNav({
  collapsed,
  onToggle,
  brand = "Stampley",
  subtitle = "Study dashboard",
}: {
  collapsed: boolean;
  onToggle: () => void;
  brand?: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 h-[100dvh] border-r border-slate-200 bg-white z-5",
        "supports-[backdrop-filter]:bg-white/95",
        "transition-[width] duration-200 ease-out",
        collapsed ? "w-[76px]" : "w-[280px]"
      )}
    >
      {/* Top */}
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex items-center justify-between gap-2 px-3 py-3">
          <Link
            href="/dashboard"
            className={cn(
              "group flex min-w-0 items-center gap-2 rounded-2xl px-2 py-2 hover:bg-slate-50",
              collapsed && "justify-center px-0"
            )}
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
              <ShieldCheck className="h-5 w-5" />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  {brand}
                </div>
                <div className="truncate text-xs text-slate-500">{subtitle}</div>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm",
              "hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
              collapsed && "ml-0"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-1 flex-1 overflow-y-auto px-2 pb-2">
          <div className="space-y-1">
            {NAV.map((it) => {
              const active =
                pathname === it.href || (it.href !== "/dashboard" && pathname?.startsWith(it.href));
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-xl border",
                      active
                        ? "border-white/15 bg-white/10 text-white"
                        : "border-slate-200 bg-white text-slate-700 group-hover:bg-slate-50",
                      collapsed && "h-10 w-10 rounded-2xl"
                    )}
                  >
                    {it.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span className="min-w-0 flex-1 truncate">{it.label}</span>
                      {it.badge ? (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-white/15 text-white"
                              : "border border-slate-200 bg-white text-slate-700"
                          )}
                        >
                          {it.badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 px-1">
            <div className={cn("h-px bg-slate-200", collapsed && "mx-2")} />
          </div>

          <div className="mt-3 space-y-1">
            <Link
              href="/settings"
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
                collapsed && "justify-center px-2"
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 group-hover:bg-slate-50">
                <Settings className="h-4 w-4" />
              </span>
              {!collapsed && <span className="truncate">Settings</span>}
            </Link>

            <button
              type="button"
              className={cn(
                "group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
                collapsed && "justify-center px-2"
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 group-hover:bg-slate-50">
                <LogOut className="h-4 w-4" />
              </span>
              {!collapsed && <span className="truncate">Sign out</span>}
            </button>
          </div>
        </nav>

        {/* Bottom (optional) */}
        <div className="border-t border-slate-200 p-3">
          <div
            className={cn(
              "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2",
              collapsed && "px-2"
            )}
          >
            <div className={cn("text-xs text-slate-600", collapsed && "text-center")}>
              {!collapsed ? "Study ID •••• 2041" : "••••"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
 