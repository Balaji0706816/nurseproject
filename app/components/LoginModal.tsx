'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Fingerprint, Loader2, ArrowRight, HelpCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [participantId, setParticipantId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantId) return;

    setIsLoading(true);

    // Simulated Authentication Orchestration
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push('/dashboard');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Subtle decorative header gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {/* Brand/Security Icon */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-teal-50/50">
              <Fingerprint className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Participant Login</h2>
            <p className="text-slate-500 mt-3 font-light text-balance leading-relaxed">
              Enter your unique study identifier to access your private reflection dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="pid" 
                className="block text-sm font-semibold text-slate-700 ml-1"
              >
                Participant ID
              </label>
              <div className="relative group">
                <input
                  id="pid"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g., P-1024-X"
                  value={participantId}
                  onChange={(e) => setParticipantId(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !participantId}
              className={`
                w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all duration-300
                ${isLoading || !participantId 
                  ? 'bg-slate-200 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 active:scale-[0.98]'}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Identity...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Assistance */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-slate-100 pt-8">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-teal-600 transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Forgot your Participant ID?</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center uppercase tracking-widest font-medium">
              AIDES-T2D Secure Gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};