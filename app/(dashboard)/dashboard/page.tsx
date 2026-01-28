// src/app/(dashboard)/dashboard/page.tsx
"use client";

import * as React from "react";
import ChatNavbar from "@/app/components/dashboard/ChatNavbar2";
import SideNav from "@/app/components/dashboard/SideNav";
import { ArrowUpRight, CalendarCheck2, TrendingUp } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
};

function StatCard({ s }: { s: Stat }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {s.label}
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {s.value}
          </div>
          {s.sub ? <div className="mt-1 text-sm text-slate-600">{s.sub}</div> : null}
        </div>

        <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
          {s.icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">Updated today</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
          Details <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-200/30 blur-2xl opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}

function Panel({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function DashboardPage() {
  const [collapsed, setCollapsed] = React.useState(false);

  const stats: Stat[] = [
    { label: "Mood", value: "Calm", sub: "Steady today", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Stress", value: "2 / 10", sub: "Low distress", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Energy", value: "6 / 10", sub: "Moderate", icon: <TrendingUp className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
         <ChatNavbar />
      <div className="flex">
        {/* ✅ Reused Sidebar */}
        <SideNav collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

        {/* Main content column */}
        <div className="min-w-0 flex-1">
         

          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-6">
            {/* Header */}
            {/* <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Overview
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Your daily check-ins and progress at a glance.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Study ID •••• 2041
              </div>
            </header> */}

            {/* Grid */}
            <div className="mt-6 space-y-6">
              {/* Stats */}
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <StatCard key={s.label} s={s} />
                ))}
              </section>

              {/* Panels */}
              <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <Panel
                    title="Weekly trend"
                    subtitle="A quick summary of your week so far. Connect real data later — this is the dashboard shell."
                    right={
                      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <CalendarCheck2 className="h-4 w-4" />
                        This week
                      </div>
                    }
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-slate-900">
                          Consistency score
                        </div>
                        <div className="text-sm font-semibold tabular-nums text-slate-900">
                          62%
                        </div>
                      </div>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-[62%] rounded-full bg-slate-900" />
                      </div>

                      <div className="mt-2 text-xs text-slate-600">
                        Based on recent check-ins and completion.
                      </div>
                    </div>
                  </Panel>

                  <Panel title="Recent activity" subtitle="Your latest check-ins (mock for now).">
                    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                      {[
                        { day: "Today", note: "Check-in completed", status: "Complete" },
                        { day: "Yesterday", note: "Check-in completed", status: "Complete" },
                        { day: "2 days ago", note: "No check-in", status: "Missed" },
                      ].map((row) => (
                        <div key={row.day} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{row.day}</div>
                            <div className="text-sm text-slate-600">{row.note}</div>
                          </div>

                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                              row.status === "Complete"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-800",
                            ].join(" ")}
                          >
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>

                <div className="space-y-6">
                  <Panel title="Next recommended step" subtitle="Small actions compound over time.">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">
                        Keep it simple today
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        Aim for one stabilizing action: hydration + a steady meal + a 2-minute reset.
                      </p>

                      <button
                        type="button"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                      >
                        Start today’s check-in
                      </button>

                      <button
                        type="button"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                      >
                        View insights
                      </button>
                    </div>
                  </Panel>

                  <Panel title="Privacy" subtitle="Designed for research-grade handling.">
                    <div className="text-sm text-slate-600">
                      Your check-ins are private and used for patterns—not judgment.
                    </div>
                  </Panel>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
