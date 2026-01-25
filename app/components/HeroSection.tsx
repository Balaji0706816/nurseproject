'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Mail,
  FileText,
} from 'lucide-react';
import SoftBackgroundSection from './SoftBackgroundSection';
import Feature from './feature';
import HeroCarousel from './HeroCarousel'; // ✅ add this

interface HeroSectionProps {
  onLoginClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden text-slate-900 selection:bg-blue-50 selection:text-blue-900">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 35%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 55% at 50% 0%, black 35%, transparent 100%)',
          }}
        />

        {/* Ambient glows */}
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute right-[8%] top-[18%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[140px]" />

        {/* Beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="beam beam-1">
            <div className="h-[110px] w-full -rotate-45 translate-y-[52vh] bg-gradient-to-r from-transparent via-blue-200/40 to-transparent blur-xl" />
          </div>
          <div className="beam beam-2">
            <div className="h-[90px] w-full -rotate-45 translate-y-[60vh] bg-gradient-to-r from-transparent via-teal-200/35 to-transparent blur-xl" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        {/* Two-column hero */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy */}
          <div className="animate-fadeUp motion-reduce:animate-none flex flex-col items-center text-center sm:items-start sm:text-left">
            <h1 className="text-2xl tracking-tight sm:text-4xl lg:text-5xl">
              Emotional support tailored for{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                type 2 Diabetes care.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Welcome to <span className="font-semibold text-slate-900">AIDES-T2D</span>. Connect
              with Stampley, your AI companion, to complete daily check-ins, track
              progress, and receive personalized, supportive insights.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <button
                onClick={onLoginClick}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              >
                <span className="relative z-10">Log In to Dashboard</span>
                <ArrowRight className="relative z-10 h-4 w-4 text-white/90 transition group-hover:translate-x-0.5" />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition duration-1000 group-hover:translate-x-full" />
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              >
                <span className="flex items-center gap-2">
                  How it works <ChevronRight className="h-4 w-4 opacity-80 text-white" />
                </span>
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-2 text-xs text-slate-500 sm:grid-cols-3">
              <div className="inline-flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck className="h-4 w-4" />
                <span>Encrypted in transit</span>
              </div>
              <div className="inline-flex items-center gap-2 justify-center sm:justify-start">
                <Lock className="h-4 w-4" />
                <span>Account protected</span>
              </div>
              <div className="inline-flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="h-4 w-4" />
                <span>Research protocol</span>
              </div>
            </div>

            {/* Utility links */}
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 sm:justify-start">
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

          {/* Right: carousel (replaces dashboard preview card) */}
          <HeroCarousel
            slides={[
              {
                imageSrc: '/images/diabetic2.jpg',
                imageAlt: 'Enroll and access portal',
                eyebrow: 'Step 1',
                title: 'Enroll & access the portal',
                description:
                  'Sign in securely using your study enrollment information to access your private portal.',
              },
              {
                imageSrc: '/images/diabetic3.jpg',
                imageAlt: 'Complete daily reflections',
                eyebrow: 'Step 2',
                title: 'Complete daily check-ins',
                description:
                  'Reflect on mood and distress in a few minutes each day — quick, simple, and supportive.',
              },
              {
                imageSrc: '/images/diabetic4.jpg',
                imageAlt: 'Guidance and progress summaries',
                eyebrow: 'Step 3',
                title: 'Guidance & progress summaries',
                description:
                  'Receive clinically aligned suggestions and review trends over time in your dashboard.',
              },
            ]}
            autoMs={4500}
          />
        </div>
      </div>

      <Feature />

      <SoftBackgroundSection>
        <div className="mx-auto max-w-7xl">
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
                <h3 className="text-lg font-semibold text-slate-900">Enroll & access the portal</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  Participants sign in using their study enrollment information to securely
                  access the AIDES-T2D portal. Accounts are private and limited to study use.
                </p>
                <Link
                  href="/how-it-works/enrollment"
                  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  <span className="text-orange-500">SEE HOW ENROLLMENT WORKS</span>
                  <span className="inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
              <div className="relative h-80 w-full">
                <Image src="/images/diabetic3.jpg" alt="Daily health check-in" fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 font-semibold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Complete daily reflections</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  Each day, participants briefly reflect on mood, distress, and experiences
                  related to managing type 2 diabetes. Most check-ins take only a few minutes.
                </p>
                <Link
                  href="/how-it-works/enrollment"
                  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  <span className="text-orange-500">SEE HOW DAILY CHECK-INS WORK</span>
                  <span className="inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">
                    →
                  </span>
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
                <h3 className="text-lg font-semibold text-slate-900">Guidance & progress summaries</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  Participants receive gentle, clinically-aligned coping suggestions and can
                  review summaries that highlight trends and engagement over time.
                </p>
                <Link
                  href="/how-it-works/enrollment"
                  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  <span className="text-orange-500">SEE HOW GUIDANCE WORKS</span>
                  <span className="inline-block text-orange-500 transition-transform duration-200 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 max-w-3xl rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-600 shadow-sm backdrop-blur">
            <p>
              <span className="font-semibold text-slate-800">Privacy note:</span>{' '}
              AIDES-T2D is a university-led research study. Responses are stored securely,
              access is restricted, and participation follows approved research protocols.
            </p>
          </div>
        </div>
      </SoftBackgroundSection>

      {/* Global CSS */}
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
