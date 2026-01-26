// src/app/(dashboard)/dashboard/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
    >
      {label}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="md:sticky md:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="px-2 py-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dashboard
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  AIDES-T2D
                </div>
              </div>

              <div className="mt-2 grid gap-1">
                <SidebarLink href="/dashboard" label="Overview" />
                <SidebarLink href="/dashboard/checkins" label="Daily Check-ins" />
                <SidebarLink href="/dashboard/progress" label="Progress" />
                <SidebarLink href="/dashboard/skills" label="Coping Skills" />
                <SidebarLink href="/dashboard/settings" label="Settings" />
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                <div className="font-semibold text-slate-900">Tip</div>
                <div className="mt-1">
                  Keep entries brief — consistency matters more than length.
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
