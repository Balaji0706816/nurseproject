"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import SourcesPanel from "@/app/components/dashboard/SourcesPanel";
import StudioPanel from "@/app/components/dashboard/StudioPanel";
import type { SourceItem } from "@/app/components/dashboard/types";

import { MoreHorizontal, SlidersHorizontal, PanelLeft, PanelRight, X } from "lucide-react";

// Center modes
import TextChat from "@/app/components/dashboard/TextChat";
import VoiceBot from "@/app/components/dashboard/VoiceBot";

// Pull latest check-in
import { getLastCheckIn } from "@/app/lib/store";

type Mode = "text" | "voice";

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
 * ----------------------------- */
function PanelCard({
  title,
  subtitle,
  children,
  right,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "min-h-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <div className="text-lg text-slate-900">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
        </div>
        <div className="shrink-0">{right}</div>
      </header>

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

      <div className="min-h-0 flex flex-1 flex-col">
        {mode === "text" ? <TextChat endpoint="/api/chat" /> : <VoiceBot endpoint="/api/voice" />}
      </div>
    </PanelCard>
  );
}

/** -----------------------------
 * iOS-style Drawer (no libs)
 * side: "left" | "right"
 * ----------------------------- */
function Drawer({
  open,
  side,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  side: "left" | "right";
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] md:hidden transition",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close drawer"
        className={cn(
          "absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 h-full w-[min(92vw,420px)] bg-white shadow-2xl transition-transform",
          side === "left" ? "left-0" : "right-0",
          open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-y-auto p-4">{children}</div>
      </aside>
    </div>
  );
}

/** -----------------------------
 * DashboardShell (Responsive)
 * - Mobile: center + drawers (Sources/Studio)
 * - md: 2 columns (center + studio)
 * - lg: 3 columns (sources + center + studio)
 * ----------------------------- */
export default function DashboardShell() {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const sourcesCount = useMemo(() => sources.length, [sources]);

  // Desktop collapses
  const [sourcesCollapsed, setSourcesCollapsed] = useState(false);
  const [studioCollapsed, setStudioCollapsed] = useState(false);

  // Mobile drawers
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

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

  // Lock body scroll when any drawer open (iOS)
  useEffect(() => {
    const open = sourcesOpen || studioOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sourcesOpen, studioOpen]);

  // Close drawers on escape
  useEffect(() => {
    if (!(sourcesOpen || studioOpen)) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSourcesOpen(false);
        setStudioOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sourcesOpen, studioOpen]);

  // Desktop grid cols (lg only)
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
      {/* Mobile glass topbar (Google Notes vibe) */}
      <div className="md:hidden sticky top-0 ">
        <div className="mx-auto max-w-[1600px] px-4 pt-3">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl border border-white/50",
              "bg-white/55 backdrop-blur-2xl",
              "shadow-[0_12px_30px_rgba(2,6,23,0.10)]"
            )}
            style={{
              // iOS-like subtle glass highlight
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            <button
              type="button"
              onClick={() => setSourcesOpen(true)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-slate-700 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              aria-label="Open sources"
            >
              <PanelLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 py-2 text-center">
              <div className="truncate text-sm font-semibold text-slate-900">Dashboard</div>
              <div className="truncate text-[11px] font-medium text-slate-500">Stampley • Sources • Studio</div>
            </div>

            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-slate-700 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              aria-label="Open studio"
            >
              <PanelRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content padding */}
      <div className="mx-auto max-w-[1600px] px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6">
        {/* Layout:
            - Mobile: center only (drawers open for others)
            - md: center + studio (2 columns)
            - lg: sources + center + studio (3 columns)
        */}
        <div
          className={cn(
            "grid gap-4",
            "min-h-[calc(100dvh-110px)] md:min-h-[calc(100dvh-48px)]",
            "grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]",
            desktopCols
          )}
        >
          {/* Left (lg only) */}
          <div className="hidden min-w-0 lg:block">
            <SourcesPanel
              sources={sources}
              onAddSource={addMockSource}
              onRemoveSource={removeSource}
              collapsed={sourcesCollapsed}
              onCollapsedChange={setSourcesCollapsed}
            />
          </div>

          {/* Center (always visible) */}
          <div className="min-w-0">
            <StampleyCenterPanel sourcesCount={sourcesCount} />
          </div>

          {/* Right (md+ visible) */}
          <div className="hidden min-w-0 md:block">
            <StudioPanel
              collapsed={studioCollapsed}
              onCollapsedChange={setStudioCollapsed}
              onOpenCheckIn={() => {
                // hook your modal here
                // setCheckInOpen(true)
              }}
              lastCheckIn={lastCheckIn}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawers */}
      <Drawer
        open={sourcesOpen}
        side="left"
        title="Sources"
        subtitle="Notes, uploads, references"
        onClose={() => setSourcesOpen(false)}
      >
        <SourcesPanel
          sources={sources}
          onAddSource={addMockSource}
          onRemoveSource={removeSource}
          collapsed={false}
          onCollapsedChange={() => {}}
        />
      </Drawer>

      <Drawer
        open={studioOpen}
        side="right"
        title="Studio"
        subtitle="Trends, check-ins, summaries"
        onClose={() => setStudioOpen(false)}
      >
        <StudioPanel
          collapsed={false}
          onCollapsedChange={() => {}}
          onOpenCheckIn={() => {
            // hook your modal here
          }}
          lastCheckIn={lastCheckIn}
        />
      </Drawer>
    </div>
  );
}