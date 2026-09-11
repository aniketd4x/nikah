import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SwipeCardStack } from '../components/cards/SwipeCardStack';
import { TrustSection } from '../components/home/TrustSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { QuranVerse } from '../components/home/QuranVerse';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  EyeOff, 
  Users, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2,
  ChevronRight,
  Flame,
  HelpCircle
} from 'lucide-react';
import { triggerHaptic } from '../styles/designTokens';

export const LandingScreen: React.FC = () => {
  const { navigateTo, profiles, isLoggedIn, sendInterest, toggleFavorite, passProfile, addToast } = useApp();

  const trustChips = [
    { label: '100% ID & Selfie Verified', icon: ShieldCheck },
    { label: 'Photo Privacy & Modesty Blur', icon: EyeOff },
    { label: 'Wali & Guardian Oversight', icon: Users },
    { label: 'Halal Fiqh & Sunnah Compliant', icon: CheckCircle2 },
    { label: 'Separate Accommodation Standards', icon: Sparkles }
  ];

  const handleSuperLike = (id: string) => {
    sendInterest(id);
    addToast('Super Interest Sent! ★', 'Your proposal was prioritized with instant notification.', 'success');
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20 select-none">
      {/* FULL-VIEWPORT HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-6 sm:pt-10 overflow-hidden">
        {/* Soft Animated Islamic Gradient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-tr from-emerald-300/30 via-gold-200/30 to-cream-100 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-4 py-1.5 rounded-full border border-emerald-200/80 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Premier Muslim Matrimonial Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-emerald-950 tracking-tight leading-[1.12]">
                Find Someone Worth <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Building a Life With.</span>
              </h1>

              <p className="text-sm sm:text-base text-charcoal-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                A dignified, privacy-first Muslim matrimonial platform built for blessed and lasting marriages.
              </p>

              {/* Two Main CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    triggerHaptic(15);
                    navigateTo(isLoggedIn ? 'discover' : 'register');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-900 text-gold-300 font-serif font-bold text-sm shadow-floating hover:shadow-card-hover border border-gold-400/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>{isLoggedIn ? 'Explore Matches' : 'Create Free Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    triggerHaptic(10);
                    const el = document.getElementById('how-it-works-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/90 hover:bg-cream-100 text-charcoal-800 font-bold text-xs border border-cream-300 shadow-soft active:scale-95 transition-all"
                >
                  How It Works
                </button>
              </div>

              {/* Verified stats mini pill */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-charcoal-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>3,200+ Active Proposals</span>
                </span>
                <span>•</span>
                <span>25+ Countries</span>
                <span>•</span>
                <span>100% Halal Verified</span>
              </div>
            </div>

            {/* Right: Interactive Swipe Card Stack */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <SwipeCardStack
                profiles={profiles}
                onPass={(id) => passProfile(id)}
                onSendInterest={(id) => sendInterest(id)}
                onSave={(id) => toggleFavorite(id)}
                onSuperLike={handleSuperLike}
              />
            </div>
          </div>
        </div>

        {/* Auto-scrolling horizontal strip of trust chips */}
        <div className="mt-8 border-y border-cream-300 bg-white/80 backdrop-blur-md py-3 overflow-x-auto no-scrollbar touch-pan-x">
          <div className="flex items-center justify-around gap-6 min-w-max px-4">
            {trustChips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <Icon className="w-4 h-4 text-emerald-700" />
                  <span>{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* SECTION 1: TRUST & SAFETY PILLARS WITH BOTTOM SHEETS */}
        <TrustSection />

        {/* SECTION 2: HOW IT WORKS ROADMAP */}
        <div id="how-it-works-section">
          <HowItWorks />
        </div>

        {/* SECTION 3: QURANIC BLESSING VERSE */}
        <QuranVerse />

        {/* SECTION 4: REAL SUCCESS STORIES */}
        <TestimonialsSection />

        {/* SECTION 5: ISLAMIC GUIDANCE CALLOUT */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300">
              Pre-Marital Deen Guide
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
              50 Sacred Questions Before Nikah
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl leading-relaxed">
              Explore scholarly checklists on financial justice, living accommodation, spiritual compatibility, and family boundaries.
            </p>
          </div>

          <button
            onClick={() => {
              triggerHaptic(10);
              navigateTo('islamic-guidance');
            }}
            className="px-6 py-3 rounded-full bg-emerald-900 hover:bg-emerald-800 text-gold-300 font-bold text-xs shadow-md border border-gold-400/40 shrink-0 active:scale-95 transition-transform"
          >
            Read Islamic Guidance
          </button>
        </section>
      </div>
    </div>
  );
};
