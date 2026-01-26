"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  PanelRightClose,
  PanelRightOpen,
  ChevronRight,
  StickyNote,
  HeartPulse,
  LineChart,
  CalendarCheck2,
} from "lucide-react";

// import RadarVitalsChart from "./RadarVitalsChart";
// import CalendarModal from "./CalendarModal"; // ✅ NEW: reusable calendar modal

type LastCheckIn = {
  distress: number;
  mood: number;
  energy: number;
  createdAt?: string;
} | null;

/* -------------------- UI -------------------- */

function PanelCard({
  title,
  subtitle,
  children,
  right,
  collapsed,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        collapsed ? "h-full" : "h-[740px]",
      ].join(" ")}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
        </div>
        {right}
      </header>

      <div className="max-h-[calc(100%-52px)] overflow-y-auto px-4 pb-4 pt-4">{children}</div>
    </section>
  );
}

function StudioTile({
  icon: Icon,
  label,
  desc,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  desc?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          <Icon className="h-5 w-5 text-slate-700" />
        </span>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{label}</div>
          {desc ? <div className="mt-0.5 truncate text-xs text-slate-500">{desc}</div> : null}
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

/* -------------------- Panel -------------------- */

export default function StudioPanel({
  collapsed,
  onCollapsedChange,
  onOpenCheckIn,
  lastCheckIn,
}: {
  collapsed: boolean;
  onCollapsedChange: (next: boolean) => void;
  onOpenCheckIn: () => void;
  lastCheckIn: LastCheckIn;
}) {
  const regionId = useId();
  const router = useRouter();

  // ✅ NEW: Calendar modal state (now uses the separate component)
  const [calendarOpen, setCalendarOpen] = useState(false);

  const distress = lastCheckIn?.distress ?? 0;
  const mood = lastCheckIn?.mood ?? 0;
  const energy = lastCheckIn?.energy ?? 0;

  const ACTIONS = [
    {
      key: "checkin",
      icon: CalendarCheck2,
      label: "Daily Check-In",
      desc: "Pick a date (calendar) then open the check-in.",
      onClick: () => setCalendarOpen(true), // ✅ open calendar modal
    },
    {
      key: "insights",
      icon: LineChart,
      label: "Insights",
      desc: "See patterns and steadiness score trends.",
      onClick: () => router.push("/dashboard2/insights"),
    },
    {
      key: "support",
      icon: HeartPulse,
      label: "Support Plan",
      desc: "Personalized next steps and coping ideas.",
      onClick: () => router.push("/dashboard2/support"),
    },
    {
      key: "resources",
      icon: FileText,
      label: "Resources",
      desc: "Study materials, contacts, and help info.",
      onClick: () => router.push("/dashboard2/resources"),
    },
  ] as const;

  return (
    <>
      <div
        className={[
          "transition-[width] duration-300 ease-out",
          collapsed ? "lg:w-14" : "lg:w-[360px]",
          "w-full min-w-0",
        ].join(" ")}
      >
        <PanelCard
          collapsed={collapsed}
          title={collapsed ? "" : "Study Tools"}
          subtitle={collapsed ? undefined : "AIDES-T2D portal shortcuts"}
          right={
            <button
              type="button"
              onClick={() => onCollapsedChange(!collapsed)}
              className="text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label={collapsed ? "Expand panel" : "Collapse panel"}
              aria-expanded={!collapsed}
              aria-controls={regionId}
            >
              {collapsed ? (
                <div className="flex -translate-x-5 items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:scale-105 hover:bg-slate-100">
                  <PanelRightOpen className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:scale-105 hover:bg-slate-100">
                  <PanelRightClose className="h-5 w-5" />
                </div>
              )}
            </button>
          }
        >
          <div
            id={regionId}
            className={[
              "transition-[opacity,max-height] duration-300 ease-out",
              collapsed ? "max-h-0 overflow-hidden opacity-0" : "max-h-[2000px] opacity-100",
            ].join(" ")}
            aria-hidden={collapsed}
          >
            {/* Last check-in card */}
            <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900">Last check-in</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">
                    {lastCheckIn?.createdAt ? new Date(lastCheckIn.createdAt).toLocaleString() : "No data yet"}
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    {/* <RadarVitalsChart distress={distress} mood={mood} energy={energy} /> */}
                  </div>
                </div>
              </div>

              {/* Still opens your check-in modal directly */}
              <button
                type="button"
                onClick={onOpenCheckIn}
                className="mt-3 w-full cursor-pointer rounded-xl border border-slate-200 bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                Update today’s check-in
              </button>
            </div>

            <div className="grid gap-3">
              {ACTIONS.map((a) => (
                <StudioTile key={a.key} icon={a.icon} label={a.label} desc={a.desc} onClick={a.onClick} />
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-slate-100" />

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-xs font-semibold text-slate-800">Your activity stays private.</p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Use the shortcuts to check in, review trends, and access support resources.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/dashboard2/notes")}
                className="mt-6 inline-flex w-1/2 items-center justify-center gap-2 rounded-full border border-slate-200 bg-teal-600 px-2 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <StickyNote className="h-4 w-4" />
                Add note
              </button>
            </div>
          </div>

          {collapsed && (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-2">
              {/* When collapsed, click opens calendar modal */}
              <button
                type="button"
                onClick={() => setCalendarOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label="Daily Check-In"
                title="Daily Check-In"
              >
                <CalendarCheck2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard2/insights")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label="Insights"
                title="Insights"
              >
                <LineChart className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard2/resources")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label="Resources"
                title="Resources"
              >
                <FileText className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-slate-200" />

              <button
                type="button"
                onClick={() => router.push("/dashboard2/notes")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label="Add note"
                title="Add note"
              >
                <StickyNote className="h-4 w-4" />
              </button>
            </div>
          )}
        </PanelCard>
      </div>

      {/* ✅ Calendar Modal (separate reusable component) */}
      {/* <CalendarModal
        open={calendarOpen}
        title="Select a date"
        subtitle="Choose a day to view or update your check-in."
        onClose={() => setCalendarOpen(false)}
        onConfirm={({ iso }) => {
          // Close calendar modal then open your check-in modal.
          // Later you can pass iso upward if you store check-ins per date.
          setCalendarOpen(false);
          onOpenCheckIn();
          // optional: console.log("Selected date:", iso);
        }}
        confirmText={(iso) => `Open check-in for ${iso}`}
      /> */}
      {/* <CalendarModal
  open={calendarOpen}
  onClose={() => setCalendarOpen(false)}
  onConfirm={() => {
    setCalendarOpen(false);
    onOpenCheckIn();
  }}
/> */}

    </>
  );
}
