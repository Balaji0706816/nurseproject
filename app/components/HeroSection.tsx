'use client';

import React from 'react';
import Image from "next/image";
import {
  ArrowRight,
  Lock,
  Activity,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Mail,
  FileText,
} from 'lucide-react';
import SoftBackgroundSection from './SoftBackgroundSection'
import Link from 'next/link';
import Feature from './feature';
// import ThreeStepInfoStrip from './ThreeStepInfoStrip';
interface HeroSectionProps {
  onLoginClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  return (
    <section className="relative w-full  min-h-screen overflow-hidden  text-slate-900 selection:bg-blue-50 selection:text-blue-900 ">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.35] "
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 35%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 35%, transparent 100%)',
          }}
        />

        {/* Ambient glows */}
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] " />
        <div className="absolute left-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[120px] " />
        <div className="absolute right-[8%] top-[18%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[140px] " />

        {/* Beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="beam beam-1">
            <div className="h-[110px] w-full -rotate-45 translate-y-[52vh] bg-gradient-to-r from-transparent via-blue-200/40 to-transparent blur-xl " />
          </div>
          <div className="beam beam-2">
            <div className="h-[90px] w-full -rotate-45 translate-y-[60vh] bg-gradient-to-r from-transparent via-teal-200/35 to-transparent blur-xl " />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        {/* Top badge */}
        {/* <div className="mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur-md ">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600 ">
            Secure Study Portal
          </span>
          <span className="mx-1 h-3 w-px bg-slate-300/70 dark:bg-white/15" />
          <span className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
            v1.0 <ChevronRight size={12} className="ml-0.5 opacity-80" />
          </span>
        </div> */}

        {/* Two-column hero */}
        <div className="grid  items-center gap-5 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy */}
          <div className="animate-fadeUp motion-reduce:animate-none flex flex-col items-center text-center sm:items-start sm:text-left">
            <h1 className="text-2xl tracking-tight sm:text-4xl lg:text-5xl">
              <span className="block">
                <span className="block">
                  Emotional support tailored for{' '}
                  <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                    type 2 Diabetes care.
                  </span>
                 
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Welcome to <span className="font-semibold text-slate-900">AIDES-T2D</span>. Connect with
              Stampley, your AI companion, to complete daily check-ins, track progress, and receive personalized,
              supportive insights.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-row items-center gap-3 sm:flex-row sm:items-center sm:justify-start">
              <button
                onClick={onLoginClick}
                className="group relative cursor-pointer inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-medium text-white  transition hover:-translate-y-0.5  focus:outline-none focus:ring-2 focus:ring-slate-400/40"
              >
                <span className="relative z-10">Log In to Dashboard</span>
                <ArrowRight className="relative z-10 h-4 w-4 text-slate-300 transition group-hover:text-white" />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition duration-1000 group-hover:translate-x-full" />
              </button>

              <a href="/"
                className="bg-teal-600 text-white flex justify-center items-center px-8 py-3 rounded-full hover:bg-teal-700 cursor-pointer"
              >
               <span className="relative z-10 text-white flex items-center justify-center gap-2">How it works {''} <ChevronRight className="h-4 w-4 opacity-70 text-white" /></span>
              
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid w-full max-w-xl justify-center grid-cols-3 gap-2 text-xs text-slate-500 sm:grid-cols-3 ">
              <div className="inline-flex items-center gap-2 justify-start">
                <ShieldCheck className="h-4 w-4" />
                <span>Encrypted in transit</span>
              </div>
              <div className="inline-flex items-center gap-2 justify-start">
                <Lock className="h-4 w-4" />
                <span>Account protected</span>
              </div>
              <div className="inline-flex items-center gap-2 justify-start">
                <CheckCircle2 className="h-4 w-4" />
                <span>Research protocol</span>
              </div>
            </div>

            {/* Utility links */}
            <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-slate-600">
              <a className="inline-flex items-center gap-2 hover:text-slate-900" href="#support">
                <Mail className="h-4 w-4 opacity-70" />
                Contact study team
              </a>
              <a className="inline-flex items-center gap-2 hover:text-slate-900" href="#privacy">
                <FileText className="h-4 w-4 opacity-70" />
                Privacy & data use
              </a>
            </div>
          </div>

          {/* Right: product preview */}
          <div className="w-full animate-fadeUp motion-reduce:animate-none lg:justify-self-end">
            <div className="relative rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-md ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 ">
                    Dashboard preview
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 ">Today’s check-in</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 ">
                  Study ID •••• 2041
                </span>
              </div>

              {/* Mini status row */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 ">
                  <p className="text-xs text-slate-500 ">Mood</p>
                  <p className="mt-1 text-sm font-semibold">Calm</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 ">
                  <p className="text-xs text-slate-500 ">Stress</p>
                  <p className="mt-1 text-sm font-semibold">2 / 10</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 ">
                  <p className="text-xs text-slate-500 ">Energy</p>
                  <p className="mt-1 text-sm font-semibold">6 / 10</p>
                </div>
              </div>

              {/* Check-in card */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 ">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 ">Reflection</p>
                  <span className="text-xs text-slate-500 ">~1 min</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-11/12 rounded-full bg-slate-200/70 " />
                  <div className="h-3 w-10/12 rounded-full bg-slate-200/60 " />
                  <div className="h-3 w-8/12 rounded-full bg-slate-200/50 " />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-200/70 ">
                    <div className="h-full w-[62%] rounded-full bg-orange-500 " />
                  </div>
                  <span className="text-xs font-medium text-slate-600 ">62%</span>
                </div>

                <div className="flex justify-center">
                  <button
                    className="mt-4 inline-flex w-1/2 items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-slate-300/40"
                    type="button"
                    onClick={onLoginClick}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tiny chart */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4 ">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 ">Weekly trend</p>
                  <p className="text-xs text-slate-500 ">Stress ↓</p>
                </div>
                <svg viewBox="0 0 300 80" className="h-16 w-full">
                  <path
                    d="M10 55 C40 20, 70 70, 100 40 C130 10, 160 60, 190 35 C220 15, 250 50, 290 25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-orange-500/70 /70"
                  />
                  <path
                    d="M10 55 C40 20, 70 70, 100 40 C130 10, 160 60, 190 35 C220 15, 250 50, 290 25 L290 80 L10 80 Z"
                    fill="currentColor"
                    className="text-teal-500/20 /20"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

{/* <ThreeStepInfoStrip /> */}


        {/* Bento Features */}
        {/* <Feature /> */}

        {/* Footer */}
        {/* <div
          id="support"
          className="mt-16 border-t border-slate-200/60 pt-8 text-center "
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 ">
            University of Massachusetts Boston • PCRG Research Study
          </p>
          <p id="privacy" className="mt-2 text-xs text-slate-500 ">
            For help accessing your account, contact the study team.
          </p>
        </div> */}



      </div>
      <Feature />
     

    

<SoftBackgroundSection>
  <div className="mx-auto max-w-7xl">
    {/* Header */}
    {/* <div className="max-w-2xl">
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
        Study workflow
      </span>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        How the AIDES-T2D study works
      </h2>

      <p className="mt-3 text-base leading-relaxed text-slate-600">
        AIDES-T2D fits naturally into your daily routine. Participants complete brief
        reflections, receive supportive guidance, and review progress over time — all
        within a secure university research portal.
      </p>
    </div> */}

    {/* Steps (3 cards) */}
    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Step 1 */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
        <div className="relative h-80 w-full">
          <Image
            src="/images/diabetic2.jpg"
            alt="Secure login and enrollment"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 font-semibold">
            1
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Enroll & access the portal
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Participants sign in using their study enrollment information to securely
            access the AIDES-T2D portal. Accounts are private and limited to study use.
          </p>

          <Link
  href="/how-it-works/enrollment"
  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
>
<span className="text-orange-500">SEE HOW ENROLLMENT WORKS</span> <span className=" inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>

</Link>


        </div>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
        <div className="relative h-80 w-full">
          <Image
            src="/images/diabetic3.jpg"
            alt="Daily health check-in"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 font-semibold">
            2
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Complete daily reflections
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Each day, participants briefly reflect on mood, distress, and experiences
            related to managing type 2 diabetes. Most check-ins take only a few minutes.
          </p>

          <Link
  href="/how-it-works/enrollment"
  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
>
<span className="text-orange-500">SEE HOW DAILY CHECK-INS WORK</span> <span className=" inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>

</Link>

       
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
        <div className="relative h-80 w-full">
          <Image
            src="/images/diabetic4.jpg"
            alt="Supportive guidance and progress summaries"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 font-semibold">
            3
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            Guidance & progress summaries
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            Participants receive gentle, clinically-aligned coping suggestions and can
            review summaries that highlight trends and engagement over time.
          </p>
          <Link
  href="/how-it-works/enrollment"
  className="group mt-5 text-orange-500 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
>

<span className="text-orange-500">SEE HOW GUIDANCE WORKS</span> <span className=" inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>

</Link>


        </div>
      </div>
    </div>

    {/* Trust footer */}
    <div className="mt-14 max-w-3xl rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-600 shadow-sm backdrop-blur">
      <p>
        <span className="font-semibold text-slate-800">Privacy note:</span>{" "}
        AIDES-T2D is a university-led research study. Responses are stored securely,
        access is restricted, and participation follows approved research protocols.
      </p>
    </div>
  </div>
</SoftBackgroundSection>




      {/* CSS (no dangerouslySetInnerHTML) */}
      <style jsx global>{`
        @keyframes beam-slide {
          0% {
            transform: translate(-100%, -100%);
            opacity: 0;
          }
          20% {
            opacity: 0.55;
          }
          80% {
            opacity: 0.55;
          }
          100% {
            transform: translate(100%, 100%);
            opacity: 0;
          }
        }
        .beam {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          animation: beam-slide 9s linear infinite;
        }
        .beam-2 {
          animation-delay: 2.2s;
        }

        @keyframes fadeUp {
          0% {
            transform: translateY(14px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeUp {
          animation: fadeUp 700ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .beam {
            animation: none !important;
          }
          .animate-fadeUp {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
