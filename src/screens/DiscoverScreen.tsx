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

  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = currentProfile?.galleryPhotos?.length ? currentProfile.galleryPhotos : [currentProfile.photo];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6 pb-28 md:pb-12 select-none">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-2.5 py-1 rounded-full border border-gold-300">
            Halal Discovery
          </span>
          <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            {currentProfile.maritalStatus}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-charcoal-500 font-bold bg-white px-3 py-1 rounded-full border border-cream-300 shadow-soft">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{availableProfiles.length}</span>
        </div>
      </div>

      {/* DISCOVERY PROFILE CARD CONTAINER */}
      <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-cream-300 shadow-floating overflow-hidden transition-all duration-300">
        {/* Main Photo Gallery & Overlay */}
        <div className="relative h-[400px] sm:h-[460px] w-full overflow-hidden bg-cream-200 group">
          {/* Story Progress Indicators */}
          {photos.length > 1 && (
            <div className="absolute top-2.5 left-4 right-4 z-20 flex items-center gap-1.5">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-black/40 backdrop-blur-sm"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      idx === photoIndex ? 'bg-gold-400' : idx < photoIndex ? 'bg-white' : 'bg-transparent'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Photo */}
          <img
            src={photos[photoIndex] || currentProfile.photo}
            alt={currentProfile.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
          />

          {/* Left / Right Tap Zones for Instant Photo Swapping */}
          <div className="absolute inset-0 z-10 flex">
            <div onClick={handlePrevPhoto} className="w-1/2 h-full cursor-pointer" />
            <div onClick={handleNextPhoto} className="w-1/2 h-full cursor-pointer" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex flex-wrap gap-1.5 max-w-[80%]">
              <Badge variant="match" size="sm">
                {currentProfile.compatibilityScore}% Match
              </Badge>
              {currentProfile.verified.photo && (
                <Badge variant="verified" size="sm">
                  Verified
                </Badge>
              )}
              {currentProfile.polygynyInfo && (
                <span className="bg-emerald-950/90 backdrop-blur-md text-gold-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold-500/40 shadow-sm">
                  {currentProfile.polygynyInfo.structure || 'Polygyny'}
                </span>
              )}
            </div>

            {/* Save Heart */}
            <button
              onClick={() => toggleFavorite(currentProfile.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 ${
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
          <div className="absolute bottom-4 left-4 right-4 text-white z-20 space-y-1.5 pointer-events-auto">
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
                className="text-xs bg-white/25 hover:bg-white/35 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-colors active:scale-95"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showFullPeek ? 'Hide' : 'Quick Details'}</span>
              </button>
            </div>

            <p className="text-xs text-cream-200 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{currentProfile.city}, {currentProfile.country}</span>
              <span>•</span>
              <span>{currentProfile.profession}</span>
              <span>•</span>
              <span>{currentProfile.height}</span>
            </p>
          </div>
        </div>

        {/* Quick Details / Summary Section */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Quick Badges Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-700 bg-cream-50 p-3 rounded-2xl border border-cream-200">
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
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">About Character</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed line-clamp-2">
              "{currentProfile.aboutMe}"
            </p>
          </div>

          {/* Expanded peek info if clicked */}
          {showFullPeek && (
            <div className="space-y-3 pt-3 border-t border-cream-200 animate-in fade-in">
              <div className="text-xs space-y-1 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
                <span className="font-bold text-emerald-950 block">Partner Expectations:</span>
                <p className="text-charcoal-600">{currentProfile.lookingForSummary}</p>
              </div>
              <div className="text-xs space-y-1 bg-cream-100 p-3 rounded-2xl border border-cream-200">
                <span className="font-bold text-emerald-950 block">Family & Values:</span>
                <p className="text-charcoal-600">{currentProfile.familyType} Family, {currentProfile.familyValues} Values</p>
              </div>
            </div>
          )}

          {/* FLOATING ACTION DOCK */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 pt-2">
            {/* Rewind */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-cream-100 text-charcoal-500 border border-cream-300 flex items-center justify-center shadow-soft active:scale-90 transition-all disabled:opacity-40"
              title="Previous Match"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Pass */}
            <button
              onClick={handlePass}
              className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shadow-md active:scale-90 hover:bg-rose-100 transition-all"
              title="Pass Profile"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* View Full Profile */}
            <button
              onClick={() => navigateTo('profile-details', currentProfile.id)}
              className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-center shadow-soft active:scale-90 hover:bg-emerald-100 transition-all"
              title="View Full Profile Details"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Send Interest */}
            <button
              onClick={handleInterest}
              disabled={hasSent}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-900 text-gold-300 border-2 border-gold-400 flex items-center justify-center shadow-floating active:scale-90 hover:scale-105 transition-all disabled:opacity-50"
              title={hasSent ? 'Interest Sent' : 'Send Interest Request'}
            >
              <Heart className="w-7 h-7 fill-gold-400 text-gold-400 stroke-[1.5]" />
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
