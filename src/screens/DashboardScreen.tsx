import React from 'react';
import { useApp } from '../context/AppContext';
import { ProfileCard } from '../components/cards/ProfileCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Sparkles, 
  Compass, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  MessageCircle, 
  ArrowRight, 
  Users, 
  Crown,
  Bell,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { 
    currentUser, 
    profiles, 
    navigateTo, 
    profileCompletionPercentage,
    setIsVerificationModalOpen,
    setIsUpgradeModalOpen,
    currentPlan,
    unreadNotificationsCount
  } = useApp();

  // Top recommended profiles (excluding self)
  const recommendedProfiles = profiles.slice(0, 6);
  const dailyPick = profiles[0]; // Ayesha Khan

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-20 md:pb-12">
      {/* GREETING & HERO HEADER */}
      <div className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-cream-50 rounded-3xl p-6 sm:p-8 shadow-card border border-gold-500/30 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-500/30">
              Assalamu Alaikum
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-cream-200 max-w-lg">
              Let's find someone compatible with your values, aspirations, and Deen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="gold"
              size="md"
              leftIcon={<Compass className="w-4 h-4" />}
              onClick={() => navigateTo('discover')}
            >
              Start Discovery
            </Button>
            <Button
              variant="outline"
              size="md"
              className="text-white border-white/40 hover:bg-white/10"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              onClick={() => navigateTo('search')}
            >
              Custom Search
            </Button>
          </div>
        </div>
      </div>

      {/* QUICK STATUS & COMPLETION ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Profile Completion Card */}
        <div className="bg-white rounded-3xl p-5 border border-cream-300 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif font-bold text-sm text-emerald-950">Profile Strength</h3>
              <Badge variant="emerald" size="sm">{profileCompletionPercentage}%</Badge>
            </div>
            <ProgressBar percentage={profileCompletionPercentage} showText={false} size="sm" />
            <p className="text-[11px] text-charcoal-500 mt-2 leading-relaxed">
              Add your university background and additional modest photos to reach 100% and get featured.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => navigateTo('edit-profile')}
          >
            Complete Profile Details
          </Button>
        </div>

        {/* Verification Status Card */}
        <div className="bg-white rounded-3xl p-5 border border-cream-300 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif font-bold text-sm text-emerald-950">Trust & Verification</h3>
              <Badge variant="verified" size="sm">Verified</Badge>
            </div>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Mobile, email, and selfie photo verified. Your profile is trusted by families across 25+ countries.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-700" />}
            onClick={() => setIsVerificationModalOpen(true)}
          >
            Manage Verification
          </Button>
        </div>

        {/* Plan / Upgrade Card */}
        <div className="bg-gradient-to-br from-cream-100 to-cream-200 rounded-3xl p-5 border border-gold-400/40 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif font-bold text-sm text-emerald-950">Membership Status</h3>
              <span className="text-[10px] font-bold text-gold-900 bg-gold-300 px-2 py-0.5 rounded-full uppercase">
                {currentPlan}
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Unlimited direct messaging, Wali introductions, and priority profile discovery active.
            </p>
          </div>
          <Button
            variant="gold"
            size="sm"
            fullWidth
            leftIcon={<Crown className="w-4 h-4" />}
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            Subscription Details
          </Button>
        </div>
      </div>

      {/* TODAY'S TOP PICK HIGHLIGHT */}
      {dailyPick && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-gold-50/30 rounded-3xl p-6 sm:p-8 border-2 border-gold-400/40 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gold-500 text-emerald-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Flame className="w-3 h-3 fill-current" />
              Today's Daily Pick
            </span>
            <span className="text-xs text-charcoal-500">• Handpicked based on your religious & location criteria</span>
          </div>

          <ProfileCard profile={dailyPick} variant="horizontal" />
        </div>
      )}

      {/* RECOMMENDED FOR YOU GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
              Recommended For You
            </h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Top compatible profiles matching your Deen, education, and lifestyle.
            </p>
          </div>

          <button
            onClick={() => navigateTo('search-results')}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProfiles.map((p) => (
            <ProfileCard key={p.id} profile={p} variant="grid" />
          ))}
        </div>
      </div>

      {/* ISLAMIC GUIDANCE TEASER */}
      <div className="bg-emerald-900 text-cream-50 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-500/30">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-950 px-3 py-1 rounded-full text-gold-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Islamic Pre-Marital Guidance</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            50 Questions to Discuss Respectfully Before Nikah
          </h3>
          <p className="text-xs text-cream-200 max-w-xl">
            A comprehensive checklist covering finances, religious growth, living arrangements, and family boundaries in the light of Sunnah.
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          className="shrink-0"
          onClick={() => navigateTo('islamic-guidance')}
        >
          Read Guidance
        </Button>
      </div>
    </div>
  );
};
