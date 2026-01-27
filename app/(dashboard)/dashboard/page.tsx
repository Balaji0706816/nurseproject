
import ChatNavbar from "@/app/components/dashboard/ChatNavbar2";
// src/app/(dashboard)/dashboard/page.tsx
export default function DashboardPage() {
    return (
      <div className="">
        <ChatNavbar/>
       <div className="space-y-6">
       <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Overview
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Your daily check-ins and progress at a glance.
            </p>
          </div>
  
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            Study ID •••• 2041
          </div>
        </header>
  
        {/* Stats */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Mood", value: "Calm" },
            { label: "Stress", value: "2 / 10" },
            { label: "Energy", value: "6 / 10" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {s.label}
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {s.value}
              </div>
            </div>
          ))}
        </section>
  
        {/* Placeholder content */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-semibold text-slate-900">
            Weekly trend
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Connect your real data later — this is just the dashboard shell.
          </p>
  
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[62%] rounded-full bg-teal-600" />
          </div>
  
          <div className="mt-2 text-xs font-medium text-slate-600">62%</div>
        </section>
       </div>
      </div>
    );
  }
  