"use client";

import React, { useMemo, useState } from "react";
import SourcesPanel from "@/app/components/dashboard/SourcesPanel";
import StudioPanel from "@/app/components/dashboard/StudioPanel";  
import type { SourceItem } from "@/app/components/dashboard/types";

import { MoreHorizontal, SlidersHorizontal } from "lucide-react";

// ✅ Reusable center modes
import TextChat from "@/app/components/dashboard/TextChat";
import VoiceBot from "@/app/components/dashboard/VoiceBot";

// ✅ Your check-in modal content
// import CheckInModalContent from "./checkin"; // ✅ adjust path if needed

// ✅ Pull latest check-in after submit (updates StudioPanel graph)
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
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="h-[740px] min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div> : null}
        </div>

        <div className="shrink-0">{right}</div>
      </header>

      <div className="flex h-[calc(100%-52px)] flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">{children}</div>
    </section>
  );
}

/** -----------------------------
 * Center Panel (mode switch in header)
 * ----------------------------- */
function StampleyCenterPanel({ sourcesCount }: { sourcesCount: number }) {
  const [mode, setMode] = useState<Mode>("text");

  return (
    <PanelCard
      title="Stampley"
      subtitle="Same panel — switch between Text Chat and Voice Bot"
      right={
        <div className="flex items-center gap-2">
          {/* Mode switch in header */}
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

          {/* Header actions */}
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
      {/* tiny status row */}
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Mode: <span className="font-semibold text-slate-700">{mode === "text" ? "Text Chat" : "Voice Bot"}</span>
        </span>
        <span>
          Sources: <span className="font-semibold text-slate-700">{sourcesCount}</span>
        </span>
      </div>

      {/* Same space (reused components) */}
      <div className="flex flex-1 min-h-0 flex-col">
        {mode === "text" ? <TextChat endpoint="/api/chat" /> : <VoiceBot endpoint="/api/voice" />}
      </div>
    </PanelCard>
  );
}

/** -----------------------------
 * Simple modal shell (no external libs)
 * ----------------------------- */
function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <button type="button" aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">{title}</div>
              <div className="mt-0.5 text-xs text-slate-500">Quick, honest, low pressure</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Close
            </button>
          </div>

          <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** -----------------------------
 * DashboardShell
 * ----------------------------- */
export default function DashboardShell() {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const sourcesCount = useMemo(() => sources.length, [sources]);

  // Collapses so grid can reflow
  const [sourcesCollapsed, setSourcesCollapsed] = useState(false);
  const [studioCollapsed, setStudioCollapsed] = useState(false);

  // ✅ Check-in modal state
  const [checkInOpen, setCheckInOpen] = useState(false);

  // ✅ Latest check-in in state (StudioPanel graph reads THIS → auto-updates)
  const [lastCheckIn, setLastCheckIn] = useState<LastCheckIn>(() => (getLastCheckIn?.() ?? null) as LastCheckIn);

  function addMockSource() {
    const next: SourceItem = {
      id: crypto.randomUUID(),
      title: `Untitled source ${sources.length + 1}`,
      kind: "other",
    };
    setSources((prev) => [next, ...prev]);
  }

  function removeSource(id: string) {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }

  // ✅ Called after submit in CheckInModalContent
  function handleCheckInDone() {
    setLastCheckIn((getLastCheckIn?.() ?? null) as LastCheckIn); // ✅ refresh graph data
    setCheckInOpen(false); // ✅ close modal
  }

  /**
   * FIXES:
   * - Use minmax(0, 1fr) for center so it can shrink without overflow.
   * - Use minmax(280px, 360px) for side panels so they can shrink a bit.
   * - Keep rails at 56px.
   */
  const gridCols =
    sourcesCollapsed && studioCollapsed
      ? "lg:grid-cols-[56px_minmax(0,1fr)_56px]"
      : sourcesCollapsed && !studioCollapsed
      ? "lg:grid-cols-[56px_minmax(0,1fr)_minmax(280px,360px)]"
      : !sourcesCollapsed && studioCollapsed
      ? "lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_56px]"
      : "lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_minmax(280px,360px)]";

  return (
    <div className="h-screen max-w-full mx-auto overflow-hidden">
      <div className={`grid h-full w-full gap-4 p-4 ${gridCols}`}>
        {/* Left */}
        <div className="min-w-0">
          <SourcesPanel
            sources={sources}
            onAddSource={addMockSource}
            onRemoveSource={removeSource}
            collapsed={sourcesCollapsed}
            onCollapsedChange={setSourcesCollapsed}
          />
        </div>

        {/* Center */}
        <div className="min-w-0">
          <StampleyCenterPanel sourcesCount={sourcesCount} />
        </div>

        {/* Right */}
        <div className="min-w-0">
          <StudioPanel
            collapsed={studioCollapsed}
            onCollapsedChange={setStudioCollapsed}
            onOpenCheckIn={() => setCheckInOpen(true)}
            lastCheckIn={lastCheckIn} // ✅ NEW: drives the radar graph
          />
        </div>
      </div>

      {/* ✅ Check-in modal (opens from StudioPanel button) */}
      {/* <Modal open={checkInOpen} title="Daily Check-In" onClose={() => setCheckInOpen(false)}>
        <CheckInModalContent onDone={handleCheckInDone} />
      </Modal> */}
    </div>
  );
}
