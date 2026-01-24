import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Full-width soft section
 * - Design originates on the LEFT
 * - TOP merges seamlessly into white (hero-safe)
 * - RIGHT fades to white for readability
 */
export default function FullWidthSoftSection({
  children,
  className = "",
}: Props) {
  return (
    <section className={`relative w-screen overflow-hidden  ${className}`}>
      {/* TOP → DOWN merge into white (MOST IMPORTANT) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-white via-white/85 to-transparent" />

      {/* LEFT → RIGHT soft fade */}
      {/* <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-sky-50/80 via-sky-50/40 to-white" /> */}

      {/* LEFT background shapes */}
      {/* <div className="pointer-events-none absolute -left-[28rem] -top-[26rem] z-0 h-[62rem] w-[62rem] rounded-full bg-sky-100/60" /> */}

      <div className="pointer-events-none absolute -left-[10rem] -top-[14rem] z-0 h-[42rem] w-[42rem] rounded-full bg-sky-50/80" />

      <div className="pointer-events-none absolute -left-[34rem] -bottom-[38rem] z-0 h-[74rem] w-[74rem] rounded-full bg-teal-50/100" />

      {/* Ambient soft glow */}
      {/* <div className="pointer-events-none absolute left-[10rem] top-[16rem] z-0 h-[24rem] w-[24rem] rounded-full bg-sky-100/35 blur-3xl" /> */}

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
