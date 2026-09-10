import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  Heart, 
  X, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Info, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const DiscoverScreen: React.FC = () => {
  const { 
    filteredProfiles, 
    sendInterest, 
    interests, 
    toggleFavorite, 
    favorites, 
    passProfile, 
    passes, 
    navigateTo,
    privacySettings 
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullPeek, setShowFullPeek] = useState(false);

  // Available profiles (excluding passed)
  const availableProfiles = filteredProfiles.filter((p) => !passes.includes(p.id));
  const currentProfile = availableProfiles[currentIndex] || availableProfiles[0];

  const handleNext = () => {
    if (currentIndex < availableProfiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePass = () => {
    if (currentProfile) {
      passProfile(currentProfile.id);
      if (currentIndex >= availableProfiles.length - 1) {
        setCurrentIndex(0);
      }
    }
  };

  const handleInterest = () => {
    if (currentProfile) {
      sendInterest(currentProfile.id);
      handleNext();
    }
  };

  if (!currentProfile || availableProfiles.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto border border-emerald-300">
          <Sparkles className="w-8 h-8 text-gold-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-emerald-950">You've Discovered All Matches!</h3>
        <p className="text-xs text-charcoal-600 leading-relaxed">
          You have reviewed all available profiles for your current search criteria. Try adjusting your filter preferences or check back soon for new registrations.
        </p>
        <div className="pt-2">
          <Button variant="primary" onClick={() => navigateTo('search')}>
            Adjust Search Filters
          </Button>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(currentProfile.id);
  const hasSent = interests.some((i) => i.profileId === currentProfile.id && i.type === 'sent');
  const isBlur = currentProfile.blurPhotoByDefault && privacySettings.photoVisibility !== 'public';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-6 pb-24 md:pb-12">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
            Halal Discovery Mode
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mt-1">
            Discover Compatible Singles
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-charcoal-500 font-medium">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{availableProfiles.length}</span>
        </div>
      </div>

      {/* DISCOVERY PROFILE CARD CONTAINER */}
      <div className="relative bg-white rounded-[2.5rem] border border-cream-300 shadow-floating overflow-hidden transition-all duration-300">
        {/* Main Photo Gallery & Overlay */}
        <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-cream-200 group">
          <img
            src={currentProfile.photo}
            alt={currentProfile.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex flex-wrap gap-2">
              <Badge variant="match" size="md">
                {currentProfile.compatibilityScore}% Compatibility
              </Badge>
              {currentProfile.verified.photo && (
                <Badge variant="verified" size="md">
                  100% Verified
                </Badge>
              )}
            </div>

            {/* Save Heart */}
            <button
              onClick={() => toggleFavorite(currentProfile.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              aria-label="Save profile"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Card Identity Info */}
          <div className="absolute bottom-5 left-5 right-5 text-white z-10 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                {currentProfile.online && (
                  <span className="w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shrink-0 animate-pulse" />
                )}
              </div>

              <button
                onClick={() => setShowFullPeek(!showFullPeek)}
                className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showFullPeek ? 'Hide' : 'Quick Details'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-cream-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{currentProfile.city}, {currentProfile.country}</span>
              <span>•</span>
              <span>{currentProfile.maritalStatus}</span>
              <span>•</span>
              <span>{currentProfile.height}</span>
            </p>
          </div>
        </div>

        {/* Quick Details / Summary Section */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Quick Badges Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-700 bg-cream-50 p-3.5 rounded-2xl border border-cream-200">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-800 shrink-0" />
              <span className="truncate font-medium">{currentProfile.profession}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-800 shrink-0" />
              <span className="truncate font-medium">{currentProfile.degree}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold-600 shrink-0" />
              <span className="truncate font-medium">{currentProfile.religion.sect}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="truncate font-medium">{currentProfile.religion.prayerFrequency.split(' ')[0]} Salah</span>
            </div>
          </div>

          {/* About preview */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">About Me</h4>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              "{currentProfile.aboutMe}"
            </p>
          </div>

          {/* Why Match Section */}
          <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Why This Match?</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentProfile.matchReasons.map((reason, i) => (
                <span
                  key={i}
                  className="bg-white/90 text-emerald-900 text-[11px] font-medium px-2.5 py-1 rounded-xl border border-emerald-200 shadow-sm"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Expanded peek info if clicked */}
          {showFullPeek && (
            <div className="space-y-3 pt-3 border-t border-cream-200 animate-in fade-in">
              <div className="text-xs space-y-1">
                <span className="font-bold text-emerald-950">Partner Expectations:</span>
                <p className="text-charcoal-600">{currentProfile.lookingForSummary}</p>
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-emerald-950">Family Background:</span>
                <p className="text-charcoal-600">{currentProfile.familyType} Family, {currentProfile.familyValues} Values</p>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS (Pass, View Profile, Send Interest) */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-cream-200">
            {/* Pass */}
            <button
              onClick={handlePass}
              className="w-14 h-14 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-500 hover:text-charcoal-900 flex items-center justify-center border border-cream-300 shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
              aria-label="Pass profile"
            >
              <X className="w-6 h-6" />
            </button>

            {/* View Full Profile */}
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => navigateTo('profile-details', currentProfile.id)}
            >
              View Full Profile
            </Button>

            {/* Send Interest */}
            <button
              onClick={handleInterest}
              disabled={hasSent}
              className="h-14 px-6 rounded-full bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-800 hover:to-emerald-700 text-gold-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-gold-500/40 shadow-card hover:scale-105 active:scale-95 transition-all shrink-0 disabled:opacity-50"
              aria-label="Send interest"
            >
              <Heart className="w-5 h-5 fill-gold-400 text-gold-400" />
              <span>{hasSent ? 'Interest Sent' : 'Send Interest'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PREV / NEXT NAVIGATION CONTROLS */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2.5 rounded-full bg-white border border-cream-300 text-charcoal-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold text-charcoal-600">
          Profile {currentIndex + 1} of {availableProfiles.length}
        </span>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-white border border-cream-300 text-charcoal-600 hover:bg-cream-100 shadow-sm transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
