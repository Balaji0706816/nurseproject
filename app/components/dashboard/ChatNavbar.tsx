// components/stampley/ChatNavbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Info, Settings, MoreHorizontal, ShieldCheck } from "lucide-react";
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

function scoreTone(score: number) {
  if (score <= 3) {
    return {
      pill: "border-emerald-200/70 bg-emerald-50/80 text-emerald-800",
      dot: "bg-emerald-500",
      label: "Low",
    };
  }
  if (score <= 6) {
    return {
      pill: "border-amber-200/70 bg-amber-50/80 text-amber-800",
      dot: "bg-amber-500",
      label: "Moderate",
    };
  }
  return {
    pill: "border-rose-200/70 bg-rose-50/80 text-rose-800",
    dot: "bg-rose-500",
    label: "High",
  };
}

function Pill({
  className,
  children,
  title,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        "backdrop-blur supports-[backdrop-filter]:bg-white/60",
        className
      )}
    >
      {children}
    </span>
  );
}

function IconBtn({
  onClick,
  label,
  children,
  className,
}: {
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border",
        "border-slate-200/70 bg-white/70 text-slate-700",
        "shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        "hover:bg-slate-50 hover:text-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "transition",
        className
      )}
    >
      {children}
    </button>
  );
}

function ActionBtn({
  onClick,
  label,
  icon,
}: {
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border px-3",
        "border-slate-200/70 bg-white/70 text-slate-700",
        "shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        "hover:bg-slate-50 hover:text-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "transition"
      )}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

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
  backHref?: string;
  className?: string;
}) {
  const router = useRouter();

  const score = meta?.distressScore;
  const scoreUI = typeof score === "number" ? scoreTone(score) : null;

  const dayPill =
    meta?.day != null ? (
      <Pill className="border-slate-200/70 bg-white/70 text-slate-700" title="Study day">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Day <span className="tabular-nums">{meta.day}</span>
      </Pill>
    ) : null;

  const domainPill =
    meta?.domain ? (
      <Pill
        className="hidden sm:inline-flex border-slate-200/70 bg-white/70 text-slate-700"
        title="Weekly focus domain"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        {meta.domain}
      </Pill>
    ) : null;

  const scorePill =
    scoreUI && typeof score === "number" ? (
      <Pill
        className={cn("border", scoreUI.pill)}
        title={`Distress score: ${score}/10`}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", scoreUI.dot)} />
        Distress <span className="tabular-nums">{score}</span>
        <span className="text-slate-500/70">•</span>
        {scoreUI.label}
      </Pill>
    ) : null;

  const flagPills =
    meta?.missedDay || meta?.endOfWeek ? (
      <div className="hidden md:flex items-center gap-2">
        {meta?.missedDay ? (
          <Pill className="border-slate-200/70 bg-slate-50/80 text-slate-700" title="Participant missed a day">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Missed day
          </Pill>
        ) : null}
        {meta?.endOfWeek ? (
          <Pill className="border-slate-200/70 bg-slate-50/80 text-slate-700" title="End of week">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            End of week
          </Pill>
        ) : null}
      </div>
    ) : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full",
        "border-b border-slate-200/70",
        "bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/65",
        className
      )}
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-2">
          {backHref ? (
            <Link
              href={backHref}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border",
                "border-slate-200/70 bg-white/70 text-slate-700",
                "shadow-[0_1px_0_rgba(15,23,42,0.04)]",
                "hover:bg-slate-50 hover:text-slate-900",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                "transition"
              )}
              aria-label="Back"
              title="Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <IconBtn
              label="Back"
              onClick={() => router.back()}
              className="hover:shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </IconBtn>
          )}

          <div className="min-w-0">
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src="/images/stampley_logo.webp"
                alt="Stampley"
                width={140}
                height={44}
                className="h-10 w-auto"
                priority
              />
              <span className="sr-only">{title}</span>
            </Link>

            {/* optional subtitle (kept clean + modern) */}
           
          </div>
        </div>

        {/* Middle pills */}
        <div className="hidden md:flex items-center gap-2">
          {dayPill}
          {domainPill}
          {scorePill}
          {flagPills}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ActionBtn onClick={onOpenInfo} label="Info" icon={<Info className="h-4 w-4" />} />
          <ActionBtn onClick={onOpenSettings} label="Settings" icon={<Settings className="h-4 w-4" />} />

          {/* Mobile icons */}
          <div className="sm:hidden flex items-center gap-2">
            <IconBtn label="Info" onClick={onOpenInfo}>
              <Info className="h-4 w-4" />
            </IconBtn>
            <IconBtn label="Settings" onClick={onOpenSettings}>
              <Settings className="h-4 w-4" />
            </IconBtn>
          </div>

          <IconBtn label="More">
            <MoreHorizontal className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      {/* Mobile pills row */}
      {(meta?.day != null || meta?.domain || typeof meta?.distressScore === "number") && (
        <div className="md:hidden border-t border-slate-100/70 bg-white/60">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-3 py-2 sm:px-6">
            {dayPill}
            {/* show domain on mobile too */}
            {meta?.domain ? (
              <Pill className="border-slate-200/70 bg-white/70 text-slate-700">{meta.domain}</Pill>
            ) : null}
            {scorePill}
            {meta?.missedDay ? (
              <Pill className="border-slate-200/70 bg-slate-50/80 text-slate-700">Missed day</Pill>
            ) : null}
            {meta?.endOfWeek ? (
              <Pill className="border-slate-200/70 bg-slate-50/80 text-slate-700">End of week</Pill>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
