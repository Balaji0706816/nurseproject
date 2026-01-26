// src/app/(dashboard)/dashboard/error.tsx
"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-sm font-semibold text-slate-900">
        Something went wrong
      </div>
      <p className="mt-1 text-sm text-slate-600">
        Please try again. If the problem continues, contact support.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
        >
          Try again
        </button>

        <details className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <summary className="cursor-pointer select-none font-semibold">
            Technical details
          </summary>
          <pre className="mt-2 whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}
