'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
};

export default function HeroCarousel({
  slides,
  autoMs = 4500,
}: {
  slides: Slide[];
  autoMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const startX = useRef<number | null>(null);

  const total = slides.length;

  const go = (next: number) => {
    const normalized = (next + total) % total;
    setIndex(normalized);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay
  useEffect(() => {
    if (isHovering || total <= 1) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % total), autoMs);
    return () => window.clearInterval(t);
  }, [isHovering, total, autoMs]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const slide = slides[index];

  const progressPct = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  return (
    <div
      className="w-full animate-fadeUp motion-reduce:animate-none lg:justify-self-end"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden  border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
        {/* Image */}
        <div
          className="relative aspect-[16/11] w-full sm:aspect-[16/10]"
          onTouchStart={(e) => {
            startX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const x0 = startX.current;
            const x1 = e.changedTouches[0]?.clientX ?? null;
            startX.current = null;

            if (x0 == null || x1 == null) return;
            const dx = x1 - x0;
            if (Math.abs(dx) < 40) return; // swipe threshold
            if (dx < 0) next();
            else prev();
          }}
        >
          <Image src={slide.imageSrc} alt={slide.imageAlt} fill className="object-cover" priority />

          {/* readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Top row (eyebrow + dots) */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
            <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
              {slide.eyebrow ?? 'Preview'}
            </div>

            {/* dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={[
                    'h-2 w-2 rounded-full transition',
                    i === index ? 'bg-white' : 'bg-white/35 hover:bg-white/60',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
            <div className="max-w-[46ch]">
              <h3 className="font-authority text-lg font-semibold text-white sm:text-xl">
                {slide.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {slide.description}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-white/20 via-white/5 to-white/20 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-200 shadow-[0_0_8px_1px_rgba(59,130,246,0.30)] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Prev/Next (big tap targets) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom “caption bar” (optional, keeps it institutional) */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Slide {index + 1} of {total}
            </div>
            <div className="truncate text-sm font-semibold text-slate-900">{slide.title}</div>
          </div>

          <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600">
            Study Portal
          </span>
        </div>
      </div>
    </div>
  );
}
