"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronLeft,
  LifeBuoy
} from "lucide-react";
import { setAuth } from "@/lib/store";  

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const next = useMemo(
    () => params.get("next") || "/dashboard",
    [params]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay for a smoother UX feel
    setTimeout(() => {
        // 🔐 MOCK AUTH
        setAuth({
        isAuthed: true,
        user: { name: email || "Participant" },
        });
        router.replace(next);
    }, 800);
  }

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ================= LEFT SIDE: Form Area ================= */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10 bg-white">
        
        {/* Navigation Back */}
        <div className="absolute top-8 left-8 lg:left-12">
            <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                    <ChevronLeft size={16} className="relative -ml-0.5" />
                </div>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Back to Home
                </span>
            </Link>
        </div>

        <div className="mx-auto w-full max-w-sm lg:w-[420px]">
          
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6">
                <ShieldCheck size={12} />
                <span>Secure Clinical Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Welcome back
            </h1>
            <p className="text-slate-500 text-lg">
              Please enter your details to access the <span className="font-semibold text-slate-700">AIDES-T2D</span> dashboard.
            </p>
          </div>

          {/* ===== FORM ===== */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-xl border-0 py-3.5 pl-11 bg-slate-50 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:bg-white transition-all duration-200 sm:text-sm sm:leading-6 shadow-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-xl border-0 py-3.5 pl-11 bg-slate-50 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:bg-white transition-all duration-200 sm:text-sm sm:leading-6 shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden rounded-xl bg-slate-900 px-3 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2 relative z-10">
                {loading ? (
                    <>Processing Secure Login...</>
                ) : (
                    <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
              {/* Button Gradient Shine */}
              {!loading && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </button>
          </form>

          {/* Footer / Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
            Not enrolled yet? {" "}
              <Link href="/register" className="font-semibold text-slate-900 hover:text-blue-600 hover:underline transition-all">
              
               Sign up for the study
              </Link>
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <LifeBuoy size={14} className="text-slate-400" />
                <span>Support: <a href="mailto:pcrg@umb.edu" className="text-slate-700 font-medium hover:text-blue-600 transition-colors">pcrg@umb.edu</a></span>
            </div>
            <span>v1.0.4 Secure</span>
          </div>

        </div>
      </div>

      {/* ================= RIGHT SIDE: Visual Context ================= */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 overflow-hidden">
        
        {/* Background Patterns (Matching Hero) */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
             <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-teal-100 rounded-full blur-[100px] opacity-60"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-16">
            
            {/* Glass Card */}
            <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-white/80 p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Your Daily Companion
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Log in to continue your journey with Stampley. Consistent tracking helps reveal patterns in your emotional health.
                </p>

                <ul className="space-y-4">
                    {[
                    "Secure, encrypted daily logging",
                    "Personalized emotional insights",
                    "Direct access to study resources",
                    "24/7 Availability"
                    ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{text}</span>
                    </li>
                    ))}
                </ul>
            </div>
            
            {/* Bottom Citation */}
            <div className="mt-12 text-center opacity-60">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    University of Massachusetts Boston
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    Psychosocial adjustment to chronic illness research
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}