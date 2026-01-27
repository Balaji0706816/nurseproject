// components/stampley/ChatMiniFooter.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Info, LifeBuoy } from "lucide-react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function ChatMiniFooter({
  className,
  leftText = "Stampley • Private check-in",
  onOpenInfo,
  helpHref = "/dashboard2/resources",
  // If your scroll container is NOT window (e.g., a div with overflow-y-auto),
  // pass a ref to it and the footer will react to that scrolling instead.
  scrollContainerRef,
}: {
  className?: string;
  leftText?: string;
  onOpenInfo?: () => void;
  helpHref?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollContainerRef?.current ?? window;

    const getY = () => {
      if (el === window) return window.scrollY || 0;
      return (el as HTMLElement).scrollTop || 0;
    };

    lastY.current = getY();

    const onScroll = () => {
      if (raf.current) return;

      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;

        const y = getY();
        const delta = y - lastY.current;

        // Always show near the bottom (nice "ChatGPT" feel)
        const nearBottom = (() => {
          if (el === window) {
            const doc = document.documentElement;
            return doc.scrollHeight - (window.scrollY + window.innerHeight) < 120;
          }
          const h = el as HTMLElement;
          return h.scrollHeight - (h.scrollTop + h.clientHeight) < 120;
        })();

        // Hide on scroll down, show on scroll up (with small threshold)
        if (nearBottom) {
          setVisible(true);
        } else if (delta > 6) {
          setVisible(false);
        } else if (delta < -6) {
          setVisible(true);
        }

        lastY.current = y;
      });
    };

    // Attach
    if (el === window) window.addEventListener("scroll", onScroll, { passive: true });
    else (el as HTMLElement).addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      if (el === window) window.removeEventListener("scroll", onScroll);
      else (el as HTMLElement).removeEventListener("scroll", onScroll);
    };
  }, [scrollContainerRef]);

  return (
    <div className={cn("pointer-events-none sticky bottom-0 z-30", className)}>
      <footer
        className={cn(
          "pointer-events-auto mx-auto w-full max-w-3xl px-3 pb-3 sm:px-4",
          "transition-all duration-200 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
        aria-hidden={!visible}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            "rounded-2xl border border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75",
            "px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          )}
        >
          {/* Left */}
          <div className="flex min-w-0 items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Private
            </span>
            <span className="truncate">{leftText}</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenInfo}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <Info className="h-3.5 w-3.5" />
              Info
            </button>

            <Link
              href={helpHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <LifeBuoy className="h-3.5 w-3.5" />
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
