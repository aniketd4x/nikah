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
import { triggerHaptic } from '../styles/designTokens';

export const DashboardScreen: React.FC = () => {
  const { 
    currentUser, 
    filteredProfiles, 
    navigateTo, 
    profileCompletionPercentage,
    setIsVerificationModalOpen,
    setIsUpgradeModalOpen,
    currentPlan,
    unreadNotificationsCount,
    setFilterState
  } = useApp();

  // Top recommended profiles (strictly opposite gender, excluding self)
  const recommendedProfiles = filteredProfiles.slice(0, 6);
  const onlineSingles = filteredProfiles.filter((p) => p.online || p.compatibilityScore > 85);
  const dailyPick = filteredProfiles[0];

  const quickFilters = [
    { label: '🌟 2nd Wife (Polygyny)', action: () => setFilterState((p) => ({ ...p, maritalStatus: 'Married (Seeking 2nd Wife)' })) },
    { label: '🩺 Doctors', action: () => setFilterState((p) => ({ ...p, profession: 'Doctor' })) },
    { label: '💻 Software Engineers', action: () => setFilterState((p) => ({ ...p, profession: 'Software' })) },
    { label: '🇦🇪 UAE / Dubai', action: () => setFilterState((p) => ({ ...p, country: 'United Arab Emirates' })) },
    { label: '🇬🇧 London / UK', action: () => setFilterState((p) => ({ ...p, country: 'United Kingdom' })) },
    { label: '🤲 Strict 5x Salah', action: () => setFilterState((p) => ({ ...p, religiousPractice: 'Always' })) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12 select-none">
      {/* ACTIVE SINGLES STORY BUBBLES */}
      <div className="bg-white rounded-[2rem] p-3.5 sm:p-4.5 border border-cream-300 shadow-app-card">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">Active Verified Singles</span>
          </div>
          <button 
            onClick={() => {
              triggerHaptic(8);
              navigateTo('discover');
            }} 
            className="text-[11px] font-bold text-gold-800 hover:text-gold-900 active:scale-95 transition-transform"
          >
            View All
          </button>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1 px-1">
          {/* My Story Tile */}
          <div 
            onClick={() => {
              triggerHaptic(8);
              navigateTo('my-profile');
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-cream-300 to-cream-400 group-hover:from-emerald-700 group-hover:to-gold-500 transition-all">
              <img src={currentUser.photo} alt="My Profile" className="w-full h-full rounded-full object-cover border-2 border-white" />
              <div className="absolute bottom-0 right-0 bg-emerald-800 text-white rounded-full p-0.5 border border-white">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-950 truncate max-w-[60px]">My Bio</span>
          </div>

          {/* Active singles */}
          {onlineSingles.map((single) => (
            <div
              key={single.id}
              onClick={() => {
                triggerHaptic(8);
                navigateTo('profile-details', single.id);
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-gold-400 via-emerald-700 to-gold-500 shadow-sm group-hover:scale-105 transition-all">
                <img src={single.photo} alt={single.name} className="w-full h-full rounded-full object-cover border-2 border-white" />
                {single.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-charcoal-800 truncate max-w-[60px]">{single.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {quickFilters.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              triggerHaptic(8);
              chip.action();
              navigateTo('search-results');
            }}
            className="text-xs bg-white border border-cream-300 text-charcoal-800 hover:border-emerald-800 hover:bg-cream-50 px-4 py-2 rounded-full font-bold shadow-sm shrink-0 whitespace-nowrap active:scale-95 transition-all cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* GREETING & HERO HEADER */}
      <div className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-cream-50 rounded-[2rem] p-5 sm:p-8 shadow-app-float border border-gold-500/30 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-500/30">
              Assalamu Alaikum
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-cream-200 max-w-lg leading-relaxed">
              Find compatible partners for honorable, blessed matrimonial unions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="gold"
              size="md"
              className="flex-1 sm:flex-none"
              leftIcon={<Compass className="w-4 h-4" />}
              onClick={() => navigateTo('discover')}
            >
              Start Discovery
            </Button>
            <Button
              variant="outline"
              size="md"
              className="flex-1 sm:flex-none text-white border-white/40 hover:bg-white/10"
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
        <div className="bg-white rounded-[2rem] p-5 border border-cream-300 shadow-app-card flex flex-col justify-between space-y-4">
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
        <div className="bg-white rounded-[2rem] p-5 border border-cream-300 shadow-app-card flex flex-col justify-between space-y-4">
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
        <div className="bg-gradient-to-br from-cream-100 to-cream-200 rounded-[2rem] p-5 border border-gold-400/40 shadow-app-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif font-bold text-sm text-emerald-950">Membership Status</h3>
              <span className="text-[10px] font-bold text-gold-900 bg-gold-300 px-2.5 py-0.5 rounded-full uppercase">
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
        <div className="bg-gradient-to-br from-emerald-50 via-white to-gold-50/30 rounded-[2rem] p-5 sm:p-8 border-2 border-gold-400/40 shadow-app-card">
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
            onClick={() => {
              triggerHaptic(8);
              navigateTo('search-results');
            }}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 active:scale-95 transition-transform"
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
      <div className="bg-emerald-900 text-cream-50 rounded-[2rem] p-6 sm:p-8 shadow-app-float flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-500/30">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-950 px-3 py-1 rounded-full text-gold-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Islamic Pre-Marital Guidance</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            50 Questions to Discuss Respectfully Before Nikah
          </h3>
          <p className="text-xs text-cream-200 max-w-xl leading-relaxed">
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

