"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  imageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function ChevronPromoCard({
  imageSrc = "/images/nclex.jpg",
  imageAlt = "Promo image",
  eyebrow = "AIDES-T2D",
  title = "AIDES-T2D: A SUPPORTIVE STUDY PORTAL",
  description = "Daily check-ins and clinically-aligned guidance to help participants reflect, track patterns, and practice coping micro-skills over time.",
  ctaText = "LEARN MORE ABOUT THE STUDY",
  ctaHref = "/about",
}: Props) {
  return (
    <section className="w-screen bg-[#146B86] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Left image block */}
          <div className="relative h-[180px] w-full overflow-hidden rounded-none bg-slate-200 shadow-[0_18px_40px_rgba(2,6,23,0.20)] sm:h-[340px] md:h-[380px] md:w-[62%]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right card (overlapping) */}
          <div className="relative mt-[-36px] w-full rounded-none bg-white shadow-[0_18px_40px_rgba(2,6,23,0.22)] sm:mt-[-44px] md:absolute md:right-0 md:top-1/2 md:mt-0 md:w-[56%] md:-translate-y-1/2">
            <div className="relative flex min-h-[220px]">
              {/* Orange chevron divider */}
              <div className="relative hidden w-[190px] shrink-0 md:block">
                {/* White wedge */}
                <div className="absolute inset-y-0 left-0 w-[74px] bg-white" />
                {/* Orange chevron */}
                <div
                  className="absolute inset-y-0 left-[70px] w-[120px] bg-[#F3703A]"
                  style={{
                    clipPath: "polygon(0 0, 100% 50%, 0 100%, 22% 100%, 100% 50%, 22% 0)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 px-6 py-10 sm:px-10">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                  {eyebrow}
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
                  {title}
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                  {description}
                </p>

                <div className="mt-7">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#D4551C] hover:text-[#B94818]"
                  >
                    {ctaText}
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for overlap on desktop */}
          <div className="hidden md:block" style={{ height: 36 }} />
        </div>
      </div>
    </section>
  );
}
