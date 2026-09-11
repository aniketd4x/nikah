import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Profile } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  Heart, 
  X, 
  Bookmark, 
  Star, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Info, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

interface SwipeCardStackProps {
  profiles: Profile[];
  onPass: (id: string) => void;
  onSendInterest: (id: string) => void;
  onSave: (id: string) => void;
  onSuperLike: (id: string) => void;
}

export const SwipeCardStack: React.FC<SwipeCardStackProps> = ({
  profiles,
  onPass,
  onSendInterest,
  onSave,
  onSuperLike
}) => {
  const { navigateTo, privacySettings, favorites } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showNextSheet, setShowNextSheet] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacityLike = useTransform(x, [20, 120], [0, 1]);
  const opacityPass = useTransform(x, [-20, -120], [0, 1]);
  const opacitySave = useTransform(y, [-20, -100], [0, 1]);

  if (!currentProfile || currentIndex >= profiles.length) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-cream-300 shadow-card max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto border border-emerald-300">
          <Sparkles className="w-8 h-8 text-gold-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-emerald-950">All Profiles Reviewed!</h3>
        <p className="text-xs text-charcoal-600 leading-relaxed">
          You've explored all compatible profiles for your current filters. Check back soon or refine your preferences.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-950 to-emerald-900 text-gold-300 text-xs font-bold shadow-md hover:scale-105 transition-all"
        >
          Review Again
        </button>
      </div>
    );
  }

  const photos = currentProfile.galleryPhotos?.length ? currentProfile.galleryPhotos : [currentProfile.photo];
  const isBlur = currentProfile.blurPhotoByDefault && privacySettings.photoVisibility !== 'public';
  const isSaved = favorites.includes(currentProfile.id);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      triggerHaptic(15);
      setExitDirection('right');
      onSendInterest(currentProfile.id);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setPhotoIdx(0);
        setExitDirection(null);
      }, 200);
    } else if (info.offset.x < -threshold) {
      triggerHaptic(10);
      setExitDirection('left');
      onPass(currentProfile.id);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setPhotoIdx(0);
        setExitDirection(null);
      }, 200);
    } else if (info.offset.y < -threshold) {
      triggerHaptic(10);
      setExitDirection('up');
      onSave(currentProfile.id);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setPhotoIdx(0);
        setExitDirection(null);
      }, 200);
    }
  };

  const swipeCard = (dir: 'left' | 'right' | 'up') => {
    triggerHaptic(15);
    setExitDirection(dir);
    if (dir === 'right') onSendInterest(currentProfile.id);
    else if (dir === 'left') onPass(currentProfile.id);
    else if (dir === 'up') onSave(currentProfile.id);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setPhotoIdx(0);
      setExitDirection(null);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto select-none">
      {/* Background card peek (Next profile) */}
      {nextProfile && (
        <div className="absolute inset-0 bg-white rounded-3xl border border-cream-300 shadow-soft scale-95 translate-y-3 opacity-60 pointer-events-none overflow-hidden">
          <img src={nextProfile.photo} alt={nextProfile.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Active Swipe Card */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x, y, rotate }}
        animate={
          exitDirection === 'right'
            ? { x: 400, opacity: 0 }
            : exitDirection === 'left'
            ? { x: -400, opacity: 0 }
            : exitDirection === 'up'
            ? { y: -400, opacity: 0 }
            : { x: 0, y: 0, opacity: 1 }
        }
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-3xl border border-cream-300 shadow-floating overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Swipe visual stamps */}
        <motion.div
          style={{ opacity: opacityLike }}
          className="absolute top-8 left-8 z-30 pointer-events-none border-4 border-emerald-500 bg-emerald-500/20 backdrop-blur-md text-emerald-400 font-extrabold text-2xl px-4 py-1.5 rounded-2xl uppercase tracking-widest rotate-[-15deg]"
        >
          INTEREST ❤️
        </motion.div>

        <motion.div
          style={{ opacity: opacityPass }}
          className="absolute top-8 right-8 z-30 pointer-events-none border-4 border-rose-500 bg-rose-500/20 backdrop-blur-md text-rose-400 font-extrabold text-2xl px-4 py-1.5 rounded-2xl uppercase tracking-widest rotate-[15deg]"
        >
          PASS ✕
        </motion.div>

        <motion.div
          style={{ opacity: opacitySave }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none border-4 border-gold-400 bg-gold-500/20 backdrop-blur-md text-gold-300 font-extrabold text-xl px-4 py-1 rounded-2xl uppercase tracking-widest"
        >
          SAVED 🔖
        </motion.div>

        {/* Top Media & Story Dots */}
        <div className="relative h-[400px] sm:h-[460px] w-full bg-cream-200 overflow-hidden">
          {/* Story bars */}
          {photos.length > 1 && (
            <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5 pointer-events-none">
              {photos.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-black/40 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className={`h-full transition-all ${idx === photoIdx ? 'bg-gold-400' : idx < photoIdx ? 'bg-white' : 'bg-transparent'}`} />
                </div>
              ))}
            </div>
          )}

          <img
            src={photos[photoIdx] || currentProfile.photo}
            alt={currentProfile.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
          />

          {/* Left/Right Tap zones */}
          <div className="absolute inset-0 z-10 flex">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setPhotoIdx((p) => (p > 0 ? p - 1 : photos.length - 1));
              }} 
              className="w-1/2 h-full cursor-pointer" 
            />
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setPhotoIdx((p) => (p < photos.length - 1 ? p + 1 : 0));
              }} 
              className="w-1/2 h-full cursor-pointer" 
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent pointer-events-none" />

          {/* Badges on photo */}
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex flex-wrap gap-1.5 max-w-[80%]">
              <span className="bg-emerald-950/80 backdrop-blur-md text-gold-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-gold-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-400" />
                {currentProfile.compatibilityScore}% Match
              </span>
              {currentProfile.verified.photo && (
                <span className="bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Bottom Card Identity Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-20 space-y-1 pointer-events-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                {currentProfile.online && (
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBioModal(!showBioModal);
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full active:scale-90 transition-transform"
                aria-label="View Bio Details"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-cream-200 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>{currentProfile.city}, {currentProfile.country}</span>
              <span>•</span>
              <span className="font-semibold text-gold-300">{currentProfile.maritalStatus}</span>
            </p>
          </div>
        </div>

        {/* Card Body Chips */}
        <div className="p-4 space-y-3 bg-white">
          <div className="flex flex-wrap gap-1.5 text-xs text-charcoal-700">
            <span className="bg-cream-100 px-2.5 py-1 rounded-xl font-medium border border-cream-200 flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-emerald-800" />
              {currentProfile.profession}
            </span>
            <span className="bg-cream-100 px-2.5 py-1 rounded-xl font-medium border border-cream-200 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-emerald-800" />
              {currentProfile.degree}
            </span>
            <span className="bg-emerald-50 text-emerald-950 px-2.5 py-1 rounded-xl font-semibold border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              {currentProfile.religion.prayerFrequency.split(' ')[0]} Salah
            </span>
          </div>

          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
            "{currentProfile.aboutMe}"
          </p>

          {/* Polygyny info highlight if available */}
          {currentProfile.polygynyInfo && (
            <div className="bg-emerald-950 text-gold-200 p-2.5 rounded-2xl text-[11px] flex items-center justify-between border border-gold-500/30">
              <span className="font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                {currentProfile.polygynyInfo.structure || 'Polygyny Structure'}
              </span>
              <span className="text-[10px] text-cream-300">
                {currentProfile.polygynyInfo.separateAccommodation ? 'Separate Home' : 'Co-living arranged'}
              </span>
            </div>
          )}

          {/* Quick Details Drawer if expanded */}
          {showBioModal && (
            <div className="pt-2 border-t border-cream-200 text-xs space-y-2 animate-in fade-in">
              <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                <span className="font-bold text-emerald-950 block">Expectations:</span>
                <p className="text-charcoal-600 mt-0.5">{currentProfile.lookingForSummary}</p>
              </div>
              <button
                onClick={() => navigateTo('profile-details', currentProfile.id)}
                className="w-full text-center py-1.5 text-emerald-900 font-bold hover:underline"
              >
                Open Full Verified Bio & Documents →
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* 4 NATIVE FLOATING ACTION BUTTONS */}
      <div className="flex items-center justify-center gap-4 pt-4">
        {/* Pass Button (X) */}
        <button
          onClick={() => swipeCard('left')}
          className="w-14 h-14 rounded-full bg-white text-rose-600 border border-cream-300 shadow-md flex items-center justify-center active:scale-90 hover:bg-rose-50 hover:border-rose-200 transition-all"
          title="Pass Profile (Swipe Left)"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Save / Bookmark Button */}
        <button
          onClick={() => swipeCard('up')}
          className="w-12 h-12 rounded-full bg-white text-gold-600 border border-cream-300 shadow-soft flex items-center justify-center active:scale-90 hover:bg-gold-50 transition-all"
          title="Save for Later (Swipe Up)"
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Super Interest (Star) */}
        <button
          onClick={() => {
            onSuperLike(currentProfile.id);
            swipeCard('right');
          }}
          className="w-12 h-12 rounded-full bg-white text-emerald-800 border border-cream-300 shadow-soft flex items-center justify-center active:scale-90 hover:bg-emerald-50 transition-all"
          title="Super Interest"
        >
          <Star className="w-5 h-5 text-gold-500 fill-gold-400" />
        </button>

        {/* Express Interest (Heart) */}
        <button
          onClick={() => swipeCard('right')}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-900 text-gold-300 border-2 border-gold-400 shadow-floating flex items-center justify-center active:scale-90 hover:scale-105 transition-all"
          title="Express Interest (Swipe Right)"
        >
          <Heart className="w-7 h-7 fill-gold-400 text-gold-400" />
        </button>
      </div>

      {/* PEEKING BOTTOM SHEET PREVIEW */}
      <div className="mt-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-cream-300 shadow-soft flex items-center justify-between cursor-pointer hover:bg-white transition-all"
        onClick={() => setShowNextSheet(!showNextSheet)}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
          <Sparkles className="w-4 h-4 text-gold-600" />
          <span>Next in Queue: {profiles.length - currentIndex - 1} Compatible Singles</span>
        </div>
        <ChevronUp className={`w-4 h-4 text-charcoal-400 transition-transform ${showNextSheet ? 'rotate-180' : ''}`} />
      </div>

      {showNextSheet && (
        <div className="mt-2 p-3 bg-cream-50 rounded-2xl border border-cream-300 space-y-2 animate-in slide-in-from-bottom duration-200">
          <div className="grid grid-cols-4 gap-2">
            {profiles.slice(currentIndex + 1, currentIndex + 5).map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigateTo('profile-details', p.id)}
                className="cursor-pointer group flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cream-300 group-hover:border-emerald-800 transition-all">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-semibold text-charcoal-800 truncate max-w-[56px]">{p.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
