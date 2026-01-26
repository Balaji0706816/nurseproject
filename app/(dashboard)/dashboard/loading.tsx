// src/app/(dashboard)/dashboard/loading.tsx
export default function DashboardLoading() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-72 animate-pulse rounded-lg bg-slate-200" />
        </div>
  
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
            />
          ))}
        </div>
  
        <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }
  