import Link from "next/link";
import { User, Mail, Lock, ShieldCheck, FileText, LockKeyhole } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      
      {/* ================= LEFT SIDE: SIGN UP FORM ================= */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">

          <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-black text-sm mb-6 transition-colors font-medium group">
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
            Back to login
          </Link>
          
          {/* Header */}
          <div className="mb-10">
            {/* Icon Wrapper - Matching Login Page Style */}
            <div className="h-12 w-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center mb-6">
              <User className="h-6 w-6 text-black" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Join the Study
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your account to start tracking your progress.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" action="#">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                Full Name
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
                Create Password
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-900">
                Confirm Password
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ShieldCheck className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Terms & Consent */}
            <div className="flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 cursor-pointer text-black focus:ring-black transition-colors"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="consent" className="font-medium text-slate-900">
                  I agree to the Study Consent Form
                </label>
                <p className="text-slate-500">
                  I understand that my data will be used for research purposes as outlined in the enrollment packet.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black cursor-pointer hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98] transition-all duration-200"
              >
                Create Account
              </button>
            </div>
            
            {/* Link to Login */}
            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Log in here
              </Link>
            </p>

          </form>
        </div>
      </div>

      {/* ================= RIGHT SIDE: PRIVACY & SECURITY PANEL ================= */}
      <div className="hidden lg:flex relative w-0 flex-1 bg-slate-900 border-l border-slate-800 text-white items-center justify-center">
        
        {/* Background Pattern & Blobs */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 mb-20 ml-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="flex flex-col justify-center px-12 py-12 z-10 w-full max-w-2xl">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Your Privacy is Our Priority
            </h3>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              We understand that your health data is personal. The AIDES-T2D portal is built with strict security measures to protect your information.
            </p>
            
            <ul className="space-y-8">
              <li className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1 p-2 bg-blue-500/10 rounded-lg ring-1 ring-white/10">
                  <LockKeyhole className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">Encrypted Data</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    All your reflections and health logs are encrypted both in transit and at rest.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1 p-2 bg-blue-500/10 rounded-lg ring-1 ring-white/10">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">Research Confidentiality</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    Your identity is kept confidential and is only accessible to authorized study personnel.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1 p-2 bg-blue-500/10 rounded-lg ring-1 ring-white/10">
                  <ShieldCheck className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">HIPAA Compliant</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    We adhere to strict standards for handling protected health information.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}