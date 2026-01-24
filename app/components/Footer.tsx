'use client';

import React from 'react';
import { 
  Activity, // Replaced 'Command' with 'Activity' for medical context
  ArrowRight, 
  Mail, 
  Linkedin, 
  Globe, 
  ShieldCheck, 
  Lock,
  HeartPulse
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#F8FAFC] pt-24 pb-12 px-6 font-sans relative overflow-hidden text-slate-600">
      
      {/* --- Fading Top Border --- */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      {/* Background Decor - Adjusted to Blue/Teal for Medical Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- 1. THE "BENTO" TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          
          {/* Left Card: Main Participant CTA */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-white/60 p-10 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Your partner in daily health.
              </h2>
              <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
                A secure space to track your well-being, uncover patterns, and connect with Stampley for emotional support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-900 hover:bg-black text-white text-lg font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Participant Login <ArrowRight size={18} />
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg font-medium py-3 px-8 rounded-full transition-all hover:border-slate-300">
                  Contact Study Team
                </button>
              </div>
            </div>

            {/* Decorative Background Icon (Medical Theme) */}
            <Activity className="absolute -bottom-10 -right-10 text-slate-100 rotate-[-12deg]" size={240} strokeWidth={0.5} />
          </div>

          {/* Right Card: Security & Trust */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             
             {/* Status Card - Security Focus */}
             <div className="bg-teal-600/20 text-white p-8 rounded-[40px] shadow-xl flex-grow flex flex-col justify-between relative overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500 to-blue-600 opacity-20 blur-2xl rounded-full"></div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    <span className="text-orange-500 text-sm font-semibold tracking-wide uppercase">System Secure</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-1 text-black">Clinical Grade Security</h3>
                  <p className="text-black text-sm">HIPAA-compliant data encryption.</p>
                </div>

                <div className="mt-8 flex gap-4 opacity-50 text-black">
                   <ShieldCheck size={28} className="text-black" />
                   <Lock size={28} />
                </div>
             </div>

             {/* Participant Quote */}
             <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-sm clip-star" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
                  ))}
                </div>
                <p className="text-slate-800 font-medium text-lg leading-snug">
                  "Stampley helps me process the stress of managing diabetes without feeling judged."
                </p>
             </div>
          </div>
        </div>


        {/* --- 2. THE LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-slate-200 pt-16 mb-16">
          
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 text-slate-900">
                  <Image src="/images/logo.png" alt="AIDES-T2D" width={150} height={150} />
               
               {/* <span className="font-bold text-xl tracking-tight">AIDES-T2D</span> */}
            </div>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              An AI-supported intervention for Distress in Type 2 Diabetes. 
              Conducted by the PCRG Lab at UMass Boston.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all" aria-label="Lab Website"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-700 transition-all" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="mailto:pcrg@umb.edu" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Study Resources</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Study Protocol</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">How Stampley Works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Crisis Resources</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Research Team</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About PCRG</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">UMass Boston</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Publications</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Investigators</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Ethics & Privacy</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">IRB Approval</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Informed Consent</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Data Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* --- 3. BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-xs text-slate-400">
           <p>© 2026 University of Massachusetts Boston. All rights reserved.</p>
           <p className="mt-2 md:mt-0">IRB Protocol #2024-001</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;