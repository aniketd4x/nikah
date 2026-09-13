import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ShieldCheck, Heart, Lock, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../../types';

export const Footer: React.FC = () => {
  const { navigateTo, currentScreen, isLoggedIn } = useApp();

  // In-app experience should feel like a native app without website footer clutter
  if (isLoggedIn && currentScreen !== 'landing') {
    return null;
  }

  return (
    <footer className="bg-emerald-950 text-cream-100 border-t border-gold-500/20 pt-16 pb-24 md:pb-16 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => navigateTo('landing')}>
              <Logo size="lg" variant="light" />
            </div>
            <p className="text-xs sm:text-sm text-cream-300 leading-relaxed max-w-sm">
              A trusted, halal Muslim matrimonial platform built to help you find a compatible life partner for Nikah with dignity, high privacy, and family involvement.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1.5 rounded-full border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>100% Halal Certified Platform</span>
              </div>
            </div>
          </div>

          {/* Matrimonial Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-serif">
              Explore Matches
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300">
              <li>
                <button onClick={() => navigateTo('discover')} className="hover:text-gold-300 transition-colors">
                  Discover Compatible Profiles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-gold-300 transition-colors">
                  Advanced Filters & Search
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('matches')} className="hover:text-gold-300 transition-colors">
                  Mutual Matches
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('interests')} className="hover:text-gold-300 transition-colors">
                  Interests & Requests
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('favorites')} className="hover:text-gold-300 transition-colors">
                  Saved Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Islamic Knowledge & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-serif">
              Deen & Guidance
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300">
              <li>
                <button onClick={() => navigateTo('islamic-guidance')} className="hover:text-gold-300 transition-colors">
                  Salat al-Istikhara Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('islamic-guidance')} className="hover:text-gold-300 transition-colors">
                  50 Pre-Nikah Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('islamic-guidance')} className="hover:text-gold-300 transition-colors">
                  Involving the Wali (Guardian)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('success-stories')} className="hover:text-gold-300 transition-colors">
                  Nikah Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('verification')} className="hover:text-gold-300 transition-colors">
                  Profile Verification Process
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy, Safety & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-serif">
              Privacy & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300">
              <li>
                <button onClick={() => navigateTo('privacy-safety')} className="hover:text-gold-300 transition-colors">
                  Photo Privacy Controls
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy-safety')} className="hover:text-gold-300 transition-colors">
                  Safety & Guardian Mode
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('subscription')} className="hover:text-gold-300 transition-colors">
                  Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help-support')} className="hover:text-gold-300 transition-colors">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('settings')} className="hover:text-gold-300 transition-colors">
                  Account Settings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-login')} className="text-gold-400 font-semibold hover:text-gold-300 transition-colors flex items-center gap-1">
                  <span>Sharia Admin Portal</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quranic Quote Bar */}
        <div className="border-t border-emerald-900 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p className="font-serif italic text-gold-200/90 text-center md:text-left">
            "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts." — Surah Ar-Rum (30:21)
          </p>
          <div className="flex items-center gap-4 text-cream-400 text-xs">
            <span>polygamymatrimony.com</span>
            <span>•</span>
            <span>© 2026 Polygamy Matrimony</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
