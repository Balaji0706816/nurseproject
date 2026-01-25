'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowRight,
  BarChart,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  Heart,
  HelpCircle,
  Lock,
  Menu,
  MessageCircle,
  Phone,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from 'lucide-react';

type NavChild = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type NavItem = {
  label: string;
  href?: string;
  children: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'My Journey',
    children: [
      { label: 'Daily Check-in', description: 'Log your distress, mood, and reflection.', icon: Calendar, href: '#' },
      { label: 'Progress Summaries', description: 'Review weekly engagement trends and insights.', icon: BarChart, href: '#' },
      { label: 'My Coping Skills', description: 'Access your saved micro-skills and tips.', icon: Smile, href: '#' },
    ],
  },
  {
    label: 'Focus Domains',
    children: [
      { label: 'Emotional Burden', description: 'Support for overwhelm, stress, and burnout.', icon: Heart, href: '#' },
      { label: 'Regimen Distress', description: 'Help with diet, medications, and routines.', icon: Activity, href: '#' },
      { label: 'Interpersonal', description: 'Navigate support, relationships, and conflict.', icon: Users, href: '#' },
      { label: 'Physician-related', description: 'Improve communication with your care team.', icon: Stethoscope, href: '#' },
    ],
  },
  {
    label: 'Study Support',
    children: [
      { label: 'About Stampley', description: 'Learn how the AI support companion works.', icon: MessageCircle, href: '#' },
      { label: 'Contact Team', description: 'Email pcrg@umb.edu or call the study team.', icon: Phone, href: '#' },
      { label: 'Resources', description: 'Study documents and diabetes guides.', icon: FileText, href: '#' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const [activeDesktopSection, setActiveDesktopSection] = useState<string | null>(null);

  const pathname = usePathname();
  const items = useMemo(() => NAV_ITEMS, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setActiveMobileSection(null);
  }, []);

  const toggleMobileSection = useCallback((label: string) => {
    setActiveMobileSection((current) => (current === label ? null : label));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    if (isMobileOpen) closeMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMobile();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMobile]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
          >
            <Image
              src="/images/glucometer2.png"
              alt="AIDES-T2D Logo"
              width={140  }
              height={140}
              className="rounded-none"
              priority
            />

            <div className="flex flex-col leading-tight">
              {/* Main Name (Authority font) */}
              <span className="font-authority text-[26px]  tracking-wide text-slate-900">
                AIDES-T2D
              </span>

              {/* Tagline (Authority font) */}
              <span className="font-authority text-[13px] tracking-wide text-slate-600">
                Digital Health Innovation
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 h-full">
            {items.map((item) => {
              const isActive = activeDesktopSection === item.label;

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDesktopSection(item.label)}
                  onMouseLeave={() => setActiveDesktopSection(null)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-md font-medium transition ${
                      isActive ? ' text-black cursor-pointer' : 'text-slate-600 hover:text-slate-900 cursor-pointer'
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={isActive}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${isActive ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-4 transition ${
                      isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                    }`}
                  >
                    <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
                      <div className="rounded-2xl border border-slate-200 bg-white/60 px-3 py-2 text-xs text-slate-600 flex justify-between">
                        <span className="font-semibold">{item.label}</span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4" /> Quick access
                        </span>
                      </div>

                      <div className="mt-2 grid gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="group flex gap-4 rounded-2xl p-3 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
                          >
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm group-hover:-translate-y-0.5 transition">
                              <child.icon size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                                {child.label}
                              </p>
                              <p className="text-xs text-slate-500">{child.description}</p>
                            </div>
                            <ChevronRight className="ml-auto mt-2 h-4 w-4 opacity-0 group-hover:opacity-70 text-slate-400 transition" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
          <Link
  href="/login"
  className="
    group relative inline-flex items-center gap-2
    rounded-full border border-white
    bg-white px-5 py-2.5
    text-md text-slate-900
    transition
    hover:border-slate-300 hover:bg-slate-50
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30
  "
>
  <span className="flex items-center gap-2 font-authority tracking-wide text-slate-700 text-md">
    Log In
    <ArrowRight className="h-4 w-4 text-slate-900" />
  </span>
</Link>


            <Link href="/help" className="p-2 rounded-xl hover:text-slate-900 text-slate-500">
              <span className="text-orange-500 flex items-center justify-center">
                <HelpCircle size={20} />
              </span>
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden rounded-xl p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer + Backdrop */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={closeMobile}
          className={`absolute inset-0 w-full h-full bg-slate-900/40 transition-opacity ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close menu"
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[min(92vw,420px)] bg-white shadow-2xl transition-transform ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="font-authority text-sm font-semibold text-slate-900">Menu</div>
              <span className="font-authority text-xs text-slate-500">AIDES-T2D</span>
            </div>
            <button
              type="button"
              onClick={closeMobile}
              className="rounded-xl p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="h-[calc(100%-56px)] overflow-y-auto px-4 py-4">
            {/* Mobile actions */}
            <div className="grid gap-2">
              <Link
                href="/login"
                onClick={closeMobile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              >
                Log In <ArrowRightIcon />
              </Link>
              <Link
                href="/help"
                onClick={closeMobile}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <HelpCircle size={18} className="text-orange-500" /> Help
              </Link>
            </div>

            <div className="my-4 h-px bg-slate-200" />

            {/* Accordion sections */}
            <div className="grid gap-2">
              {items.map((section) => {
                const open = activeMobileSection === section.label;

                return (
                  <div key={section.label} className="rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(section.label)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-authority text-sm font-semibold text-slate-900">{section.label}</span>
                      <ChevronDown className={`h-8 w-8 text-slate-500 transition ${open ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`grid transition-all ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="px-2 pb-2">
                          {section.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={closeMobile}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50"
                            >
                              <div className="mt-0.5 h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white">
                                <child.icon size={18} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900">{child.label}</div>
                                <div className="text-xs text-slate-500">{child.description}</div>
                              </div>
                              <ChevronRight className="ml-auto mt-2 h-4 w-4 text-slate-300" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Lock className="h-4 w-4" />
                Secure Portal
              </div>
              <div className="mt-1">University of Massachusetts Boston</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="h-16 lg:h-20" />
    </>
  );
};

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Navbar;
