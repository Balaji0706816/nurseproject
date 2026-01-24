import React from "react";
import { BookOpen, CalendarDays, BarChart3 } from "lucide-react";

type Item = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const ITEMS: Item[] = [
  {
    title: "ENROLL & GET STARTED",
    description:
      "Access the AIDES-T2D portal using your study enrollment information and review what to expect during participation.",
    Icon: BookOpen,
  },
  {
    title: "COMPLETE DAILY CHECK-INS",
    description:
      "Share brief reflections on mood, stress, and daily experiences related to managing type 2 diabetes.",
    Icon: CalendarDays,
  },
  {
    title: "REVIEW INSIGHTS OVER TIME",
    description:
      "View summaries and trends from your check-ins to better understand patterns and areas of support.",
    Icon: BarChart3,
  },
];

export default function ThreeStepInfoStrip() {
  return (
    <section className="relative w-screen ">
      {/* Bottom → up merge into white */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/75 to-transparent" />
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {ITEMS.map((item, idx) => (
            <div key={item.title} className="relative px-6 py-6 text-center">
              {/* Vertical divider (desktop only) */}
              {idx !== 0 && (
                <div className="pointer-events-none absolute left-0 top-8 hidden h-[calc(100%-4rem)] w-px bg-slate-300 md:block" />
              )}

              <p className="text-sm font-semibold tracking-[0.18em] text-slate-700">
                {item.title}
              </p>

              <div className="mt-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center">
                  <item.Icon className="h-10 w-10 text-orange-500" />
                </div>
              </div>

              <p className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
