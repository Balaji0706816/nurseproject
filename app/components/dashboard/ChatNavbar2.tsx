// components/stampley/ChatNavbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Info,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type ChatMeta = {
  domain: string;
  day: number;
  distressScore: number;
  missedDay?: boolean;
  endOfWeek?: boolean;
};

export default function ChatNavbar({
  title = "Stampley",
  subtitle = "Private check-in chat",
  meta,
  onOpenInfo,
  onOpenSettings,
  backHref,
  className,
}: {
  title?: string;
  subtitle?: string;
  meta?: ChatMeta;
  onOpenInfo?: () => void;
  onOpenSettings?: () => void;
  backHref?: string; // if not provided -> router.back()
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const score = meta?.distressScore;
  const scoreLabel =
    typeof score === "number"
      ? score <= 3
        ? "Low"
        : score <= 6
        ? "Moderate"
        : "High"
      : undefined;

  const scorePill = (() => {
    if (typeof score !== "number") return null;
    const base =
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold";
    if (score <= 3)
      return (
        <span className={cn(base, "border-emerald-200 bg-emerald-50 text-emerald-700")}>
          Distress: {score} • {scoreLabel}
        </span>
      );
    if (score <= 6)
      return (
        <span className={cn(base, "border-amber-200 bg-amber-50 text-amber-700")}>
          Distress: {score} • {scoreLabel}
        </span>
      );
    return (
      <span className={cn(base, "border-rose-200 bg-rose-50 text-rose-700")}>
        Distress: {score} • {scoreLabel}
      </span>
    );
  })();

  const dayPill =
    meta?.day != null ? (
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
        Day {meta.day}
      </span>
    ) : null;

  const domainPill =
    meta?.domain ? (
      <span className="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
        {meta.domain}
      </span>
    ) : null;

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-full items-center justify-between gap-3 px-6 py-2.5 sm:px-">
        {/* Left: Back + Title */}
        <div className="flex min-w-0 items-center gap-2">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label="Back"
              title="Back"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/dashboard/playground')}
              className="inline-flex cursor-pointer h-10 w-10 hover:text-white  items-center justify-center rounded-xl border border-transparent hover:border-yellow-500 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label="Back"
              title="Back"
            >
              <ChevronRight className="h-5 w-5  hover:scale-110 transition-all duration-300  cursor-pointer"  />
            </button>
          )}

          <Link href="/" className="min-w-0">
            <Image src="/images/stampley_logo.webp" alt="Stampley Logo" width={170} height={170} />
            {/* <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-slate-900">
                {title}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Private
              </span>
            </div> */}
            {/* <div className="truncate text-[11px] text-slate-500">{subtitle}</div> */}
          </Link>
        </div>

        {/* Middle: context pills */}
        <div className="hidden md:flex items-center gap-2">
          {dayPill}
          {domainPill}
          {scorePill}
          {meta?.missedDay ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              Missed day
            </span>
          ) : null}
          {meta?.endOfWeek ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              End of week
            </span>
          ) : null}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenInfo}
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <Info className="h-4 w-4" />
            Info
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>

          {/* Mobile compact */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenInfo}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label="Info"
              title="Info"
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Optional overflow (placeholder) */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            aria-label="More"
            title="More"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile pills row */}
      {(meta?.day != null || meta?.domain || typeof meta?.distressScore === "number") && (
        <div className="md:hidden border-t border-slate-100 bg-white/70">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-2 overflow-x-auto px-3 py-2 sm:px-4">
            {dayPill}
            {domainPill}
            {scorePill}
          </div>
        </div>
      )}
    </div>
  );
}
