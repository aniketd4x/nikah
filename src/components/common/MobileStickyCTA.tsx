import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';

export const MobileStickyCTA: React.FC = () => {
  const { isLoggedIn, navigateTo, currentScreen } = useApp();
  const isNavVisible = useScrollVisibility();

  // Hide when user is logged in or on auth screens
  if (isLoggedIn || currentScreen === 'login' || currentScreen === 'register') {
    return null;
  }

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-cream-300 p-3 pb-[max(env(safe-area-inset-bottom),12px)] shadow-[0_-8px_25px_rgba(0,0,0,0.08)] select-none transition-transform duration-300 ease-in-out ${
      isNavVisible ? 'translate-y-0' : 'translate-y-[120%] pointer-events-none'
    }`}>
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <p className="text-[11px] font-extrabold text-emerald-950 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Join 50,000+ Muslims
          </p>
          <p className="text-[10px] text-charcoal-500">Halal, Verified & Dignified</p>
        </div>

        <button
          onClick={() => {
            triggerHaptic(15);
            navigateTo('register');
          }}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-950 to-emerald-800 text-gold-300 font-bold text-xs shadow-md border border-gold-400/40 flex items-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>Create Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
