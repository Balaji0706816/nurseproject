"use client";

import React, { useId } from "react";
import {
  Plus,
  Search,
  Globe,
  Sparkles,
  FileText,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from "lucide-react";
import type { SourceItem } from "@/app/components/dashboard/types";

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
    <section className=" rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="min-w-0">
          <div className="text-lg  text-black">{title}</div>
          {subtitle ? (
            <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div>
          ) : null}
        </div>
        {right}
      </header>
      <div className="px-4 pb-4 pt-4">{children}</div>
    </section>
  );
}

export default function SourcesPanel({
  sources,
  onAddSource,
  onRemoveSource,
  collapsed,
  onCollapsedChange,
}: {
  sources: SourceItem[];
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}) {
  const regionId = useId();

  return (
    <div
      className={[
        "w-full min-w-0",
        "transition-[width] duration-300 ease-out",
        collapsed ? "h-full" : "md:h-[800px] h-[740px]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col gap-4  ">
        <PanelCard
        
          title={collapsed ? "" : "Sources"}
          subtitle={collapsed ? undefined : "Add documents and links for context"}
          right={
            <div className={collapsed ? "flex justify-center w-full" : undefined}>
             
             <button
                type="button"
                onClick={() => onCollapsedChange(!collapsed)}
                className=" text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)]  focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label={collapsed ? "Expand Sources panel" : "Collapse Sources panel"}
                aria-expanded={!collapsed}
                aria-controls={regionId}
                title={collapsed ? "Expand" : "Collapse"}
              >
                {collapsed ? (
                 <div className="p-2  cursor-pointer hover:scale-105 transition-all duration-300 -translate-x-3 flex items-center justify-center">
                   <PanelLeftOpen className="h-5 w-5 " />
                 </div>
                ) : (
                  <div className=" md:block hidden  p-2  cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center  traslate-x-[-20px]"> <PanelLeftClose className="h-5 w-5 " /></div>
                )}  
              </button>
            </div>
          }

     
        >
          {/* Collapsible content region */}
          <div
            id={regionId}
            className={[
              "transition-[opacity,max-height] duration-300 ease-out",
              collapsed ? "max-h-0 opacity-0 overflow-hidden" : "max-h-[2000px] opacity-100",
            ].join(" ")}
            aria-hidden={collapsed}
          >
            {/* Add sources */}
            <button
              type="button"
              onClick={onAddSource}
              className="w-full  cursor-pointer px-4 py-3 text-sm font-semibold  text-black"
            >
              <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add sources
              </span>
            </button>

            {/* Deep research promo */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-slate-700" />
                Try Deep Research
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Generate an in-depth report and discover new sources.
              </p>
            </div>

            {/* Search web */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Search className="h-4 w-4" />
                Search the web for new sources
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                >
                  <Globe className="h-4 w-4 text-slate-700" />
                  Web
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                >
                  Fast Research
                </button>

                <button
                  type="button"
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  aria-label="Go"
                  title="Go"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 h-px w-full bg-slate-100" />

            {/* Saved sources list */}
            {sources.length === 0 ? (
              <div className="pt-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                  <FileText className="h-5 w-5 text-slate-700" />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-800">
                  Saved sources will appear here
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                  Add PDFs, websites, text, videos, or audio files. You can also import from Google Drive.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {sources.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-slate-500">{s.kind}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveSource(s.id)}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                      aria-label="Remove source"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rail UI when collapsed */}
          {collapsed && (
            <div className="flex flex-col items-center gap-3 py-2">
              <button
                type="button"
                onClick={onAddSource}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                aria-label="Add source"
                title="Add source"
              >
                <Plus className="h-4 w-4" />
              </button>

              <div className="h-px w-full bg-slate-100" />

              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                <FileText className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          )}
        </PanelCard>
      </div>
    </div>
  );
}