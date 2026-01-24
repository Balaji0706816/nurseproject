import Link from "next/link";
import { Mail, Lock, Phone, CheckCircle2, HelpCircle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
   
      {/* ================= LEFT SIDE: LOGIN FORM & HELP ================= */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-black text-sm mb-6 transition-colors font-medium group">
            <svg
              className="h-5 w-5 text-slate-400 group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          {/* Header */}
          <div className="mb-10">
            {/* Logo Wrapper */}
            <div className="h-12 w-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center mb-6">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Logging In
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Welcome back to the AIDES-T2D Study Portal.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" action="#">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                Email address
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                  placeholder="name@example.com"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Use the same email you provided during enrollment.
              </p>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link 
                    href="/forgot-password" 
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Enter the password sent to you in your welcome email.
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black  px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black/80 cursor-pointer hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98] transition-all duration-200"
              >
                Log In
              </button>
            </div>
            
            {/* === SIGN UP LINK === */}
            <p className="mt-4 text-center text-sm text-slate-600">
              Not enrolled yet?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Sign up for the study
              </Link>
            </p>

          </form>

          {/* Support Section */}
          <div className="mt-10 border-t border-slate-200 pt-10">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-slate-500" />
              Need Help?
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              If you have trouble logging in or accessing your dashboard, please contact our study team.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a href="mailto:pcrg@umb.edu" className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors group">
                <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-blue-50 transition-colors">
                  <Mail className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <span className="font-medium">pcrg@umb.edu</span>
              </a>
              <a href="tel:6172874067" className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors group">
                <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-blue-50 transition-colors">
                  <Phone className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <span className="font-medium">617 287 4067</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: INFO PANEL ================= */}
      <div className="hidden lg:flex relative w-0 flex-1 bg-slate-50 border-l border-slate-200 items-center justify-center">
        
        {/* Decorative background effects */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 mb-20 mr-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none mix-blend-multiply"></div>

        <div className="flex flex-col justify-center px-12 py-12 z-10 w-full max-w-2xl">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
              Your Daily Companion
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Once logged in, you’ll see your Dashboard where you can access your personalized study tools:
            </p>
            
            <ul className="space-y-8">
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 mt-1 p-1 bg-white rounded-full shadow-sm ring-1 ring-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">Start your daily check-in</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Reflect on your mood and health with quick, easy prompts.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 mt-1 p-1 bg-white rounded-full shadow-sm ring-1 ring-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">View your weekly focus domain</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    Stay on track with Emotional, Regimen, Interpersonal, or Physician-related goals.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 mt-1 p-1 bg-white rounded-full shadow-sm ring-1 ring-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">Review your progress</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Visualize your journey with simple, easy-to-read summaries.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 mt-1 p-1 bg-white rounded-full shadow-sm ring-1 ring-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">Get support</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Access brief coping tips and supportive messages whenever you need them.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}