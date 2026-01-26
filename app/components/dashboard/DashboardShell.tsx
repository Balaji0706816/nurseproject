"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import SourcesPanel from "@/app/components/dashboard/SourcesPanel";
import StudioPanel from "@/app/components/dashboard/StudioPanel";
import type { SourceItem } from "@/app/components/dashboard/types";

import { MoreHorizontal, SlidersHorizontal } from "lucide-react";

// Center modes
import TextChat from "@/app/components/dashboard/TextChat";
import VoiceBot from "@/app/components/dashboard/VoiceBot";

// Pull latest check-in
import { getLastCheckIn } from "@/app/lib/store";

type Mode = "text" | "voice";
type MobileTab = "sources" | "stampley" | "studio";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type LastCheckIn = {
  distress: number;
  mood: number;
  energy: number;
  createdAt?: string;
} | null;

/** -----------------------------
 * Presentational wrapper
 * - Responsive height (no fixed 740px)
 * - Works inside flex/grid with min-h-0
 * ----------------------------- */
function PanelCard({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="min-h-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
        </div>
        <div className="shrink-0">{right}</div>
      </header>

      {/* critical: min-h-0 so inner scroll regions can work */}
      <div className="min-h-0 flex flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">{children}</div>
    </section>
  );
}

/** -----------------------------
 * Center Panel (mode switch)
 * ----------------------------- */
function StampleyCenterPanel({ sourcesCount }: { sourcesCount: number }) {
  const [mode, setMode] = useState<Mode>("text");

  return (
    <PanelCard
      title="Stampley"
      subtitle="Switch between Text Chat and Voice Bot"
      right={
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setMode("text")}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                mode === "text" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
              )}
            >
              Text
            </button>
            <button
              type="button"
              onClick={() => setMode("voice")}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                mode === "voice" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
              )}
            >
              Voice
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            aria-label="Filters"
            title="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            aria-label="More"
            title="More"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Mode: <span className="font-semibold text-slate-700">{mode === "text" ? "Text Chat" : "Voice Bot"}</span>
        </span>
        <span>
          Sources: <span className="font-semibold text-slate-700">{sourcesCount}</span>
        </span>
      </div>

      {/* Fill remaining height and allow internal scroll */}
      <div className="min-h-0 flex flex-1 flex-col">
        {mode === "text" ? <TextChat endpoint="/api/chat" /> : <VoiceBot endpoint="/api/voice" />}
      </div>
    </PanelCard>
  );
}

/** -----------------------------
 * Mobile tab switcher (Google Notes vibe)
 * ----------------------------- */
function MobileTabs({
  tab,
  setTab,
}: {
  tab: MobileTab;
  setTab: (t: MobileTab) => void;
}) {
  return (
    <div className="md:hidden sticky top-0 z-30 bg-slate-50/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm">
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: "sources", label: "Sources" },
              { id: "stampley", label: "Stampley" },
              { id: "studio", label: "Studio" },
            ].map((x) => {
              const active = tab === (x.id as MobileTab);
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setTab(x.id as MobileTab)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30",
                    active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {x.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** -----------------------------
 * DashboardShell (Responsive like Google Notes)
 * ----------------------------- */
export default function DashboardShell() {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const sourcesCount = useMemo(() => sources.length, [sources]);

  // Desktop collapses
  const [sourcesCollapsed, setSourcesCollapsed] = useState(false);
  const [studioCollapsed, setStudioCollapsed] = useState(false);

  // Mobile: tabbed single-panel view
  const [mobileTab, setMobileTab] = useState<MobileTab>("stampley");

  // Latest check-in
  const [lastCheckIn, setLastCheckIn] = useState<LastCheckIn>(() => (getLastCheckIn?.() ?? null) as LastCheckIn);

  const addMockSource = useCallback(() => {
    const next: SourceItem = {
      id: crypto.randomUUID(),
      title: `Untitled source ${sources.length + 1}`,
      kind: "other",
    };
    setSources((prev) => [next, ...prev]);
  }, [sources.length]);

  const removeSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Close/normalize desktop collapse states when going to phone
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) {
        // on mobile we rely on tabs, keep panels expanded to avoid weird UI
        setSourcesCollapsed(false);
        setStudioCollapsed(false);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /**
   * Desktop grid cols
   * - lg: 3 columns, with collapsible rails (56px)
   * - md: 2 columns (center + right) to stay readable
   */
  const desktopCols =
    sourcesCollapsed && studioCollapsed
      ? "lg:grid-cols-[56px_minmax(0,1fr)_56px]"
      : sourcesCollapsed && !studioCollapsed
      ? "lg:grid-cols-[56px_minmax(0,1fr)_minmax(280px,360px)]"
      : !sourcesCollapsed && studioCollapsed
      ? "lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_56px]"
      : "lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_minmax(280px,360px)]";

  return (
    <div className="min-h-dvh w-full bg-slate-50">
      {/* Mobile tabs (sticky) */}
      <MobileTabs tab={mobileTab} setTab={setMobileTab} />

      {/* Outer padding */}
      <div className="mx-auto max-w-[1600px] px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6">
        {/* GRID:
            - Mobile: 1 column (tab decides what shows)
            - md: 2 columns (center + studio) like Notes "main + detail"
            - lg: 3 columns
        */}
        <div className={cn("grid min-h-[calc(100dvh-96px)] gap-4 md:min-h-[calc(100dvh-48px)]", "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]", desktopCols)}>
          {/* LEFT (Desktop only) */}
          <div className={cn("min-w-0", "hidden lg:block")}>
            <SourcesPanel
              sources={sources}
              onAddSource={addMockSource}
              onRemoveSource={removeSource}
              collapsed={sourcesCollapsed}
              onCollapsedChange={setSourcesCollapsed}
            />
          </div>

          {/* CENTER (Always on md+, mobile depends on tab) */}
          <div className={cn("min-w-0", mobileTab === "stampley" ? "block" : "hidden md:block")}>
            <StampleyCenterPanel sourcesCount={sourcesCount} />
          </div>

          {/* RIGHT (md+ always visible, mobile depends on tab) */}
          <div className={cn("min-w-0", mobileTab === "studio" ? "block" : "hidden md:block")}>
            <StudioPanel
              collapsed={studioCollapsed}
              onCollapsedChange={setStudioCollapsed}
              onOpenCheckIn={() => {
                /* hook your modal here if needed */
              }}
              lastCheckIn={lastCheckIn}
            />
          </div>

          {/* MOBILE SOURCES (only on phone tab) */}
          <div className={cn("min-w-0 lg:hidden", mobileTab === "sources" ? "block" : "hidden")}>
            <SourcesPanel
              sources={sources}
              onAddSource={addMockSource}
              onRemoveSource={removeSource}
              collapsed={false}
              onCollapsedChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
