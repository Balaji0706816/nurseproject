"use client";
import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { LoginModal } from './LoginModal';
import { AppView } from '@/app/types'; 

export default function Herohead() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HERO);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleHeroLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentView(AppView.DASHBOARD);
  };

  return (
    <div className="min-h-screen font-sans">
      {currentView === AppView.HERO && (
        <HeroSection onLoginClick={handleHeroLoginClick} />
      )}
      
      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseModal} 
        />
      )}

     
    </div>
  );
}
