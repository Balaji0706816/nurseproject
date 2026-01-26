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

export default function Navbar() {
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

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen, closeMobile]);

  // Close drawer on route change (mobile UX)
  useEffect(() => {
    if (isMobileOpen) closeMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // If resize to desktop while open, close it
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMobile();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeMobile]);

  return (
    <>
      {/* Top Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex h-18 max-w-full sm:max-w-7xl items-center justify-between px-2 sm:px-6 lg:h-20 lg:px-8">
          {/* Brand */}
         {/* Brand */}
<Link
  href="/"
  className="
    relative z-50 flex items-center gap-2
    rounded-xl
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 sm:leading-tight translate-x-[-20px] 
  "
>
  {/* Logo */}
  <Image
    src="/images/glucometer2.png"
    alt="AIDES-T2D Logo"
    width={130}
    height={130}
    className="shrink-0 object-contain"
    priority
  />

  {/* Text */}
  <div className="flex flex-col justify-center leading-tight translate-x-[-30px]  transition-all duration-200">
    <div className="font-authority truncate text-[17px]  tracking-wide text-slate-900 sm:text-[20px]">
      AIDES-T2D
    </div>

    <div className="font-authority hidden text-[11px] tracking-wide text-slate-600 sm:block">
      Digital Health Innovation
    </div>
  </div>
</Link>


          {/* Desktop nav */}
          <div className="hidden md:flex h-full items-center gap-1">
            {items.map((item) => {
              const isActive = activeDesktopSection === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => setActiveDesktopSection(item.label)}
                  onMouseLeave={() => setActiveDesktopSection(null)}
                >
                  <button
                    type="button"
                    className={[
                      'inline-flex items-center gap-1 rounded-full px-4 py-2 text-md  transition',
                      isActive ? 'text-slate-900 cursor-pointer' : 'text-slate-600 hover:text-black cursor-pointer',
                    ].join(' ')}
                    aria-haspopup="menu"
                    aria-expanded={isActive}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition ${isActive ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-4 transition ${
                      isActive ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                    }`}
                  >
                    <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/60 px-3 py-2 text-xs text-slate-600">
                        <span className="">{item.label}</span>
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
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-0.5">
                              <child.icon size={18} className="text-black" />
                            </div>

                            <div className="min-w-0">
                              <div className="text-md  text-slate-900 group-hover:font-semibold">
                                {child.label}
                              </div>
                              <div className="text-xs text-slate-500">{child.description}</div>
                            </div>

                            <ChevronRight className="ml-auto mt-2 h-4 w-4 text-slate-400 opacity-0 transition group-hover:opacity-70" />
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
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="
                inline-flex items-center gap-2 rounded-full border border-white
                bg-white px-5 py-2.5 text-md  text-slate-900 transition
                hover:border-slate-300 hover:bg-slate-50
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30
              "
            >
              <span className="font-authority tracking-wide text-black">Log In</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/help"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              aria-label="Help"
            >
              <HelpCircle size={20} className="text-orange-500" />
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-50 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer + Backdrop */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition ${
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={closeMobile}
          className={`absolute inset-0 h-full w-full bg-slate-900/45 transition-opacity ${
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
            <div className="min-w-0">
              <div className="font-authority text-md  text-slate-900">Menu</div>
              <div className="font-authority text-xs text-slate-500">AIDES-T2D</div>
            </div>

            <button
              type="button"
              onClick={closeMobile}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-50 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-[calc(100%-56px)] overflow-y-auto px-4 py-4">
            {/* Mobile actions */}
            <div className="grid gap-2">
              <Link
                href="/login"
                onClick={closeMobile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-md  text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
              >
                Log In <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/help"
                onClick={closeMobile}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-md  text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
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
                  <div key={section.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(section.label)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-authority text-md  text-slate-900">{section.label}</span>
                      <ChevronDown className={`h-5 w-5 text-slate-500 transition ${open ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`grid transition-all ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="px-2 pb-2">
                          {section.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={closeMobile}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
                            >
                              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
                                <child.icon size={18} />
                              </div>

                              <div className="min-w-0">
                                <div className="text-md  text-slate-900">{child.label}</div>
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
              <div className="flex items-center gap-2  text-slate-900">
                <Lock className="h-4 w-4" />
                Secure Portal
              </div>
              <div className="mt-1">University of Massachusetts Boston</div>
            </div>
          </div>
        </aside>
      </div>

      {/* Spacer under fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
