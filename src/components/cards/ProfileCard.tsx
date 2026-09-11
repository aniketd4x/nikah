import React, { useState } from 'react';
import { Profile } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  MessageCircle, 
  BookOpen,
  Eye,
  Info,
  Home,
  Check
} from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  variant?: 'grid' | 'compact' | 'featured' | 'horizontal' | 'discovery';
  onPass?: () => void;
  onSendInterest?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  variant = 'grid',
  onPass,
  onSendInterest
}) => {
  const { 
    navigateTo, 
    favorites, 
    toggleFavorite, 
    sendInterest, 
    interests, 
    startChatWithProfile,
    privacySettings 
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const isFav = favorites.includes(profile.id);
  const sentInterest = interests.find((i) => i.profileId === profile.id && i.type === 'sent');
  const isBlur = profile.blurPhotoByDefault && privacySettings.photoVisibility !== 'public';
  const photos = profile.galleryPhotos?.length ? profile.galleryPhotos : [profile.photo];

  const handleCardClick = () => {
    navigateTo('profile-details', profile.id);
  };

  /* ---------------- COMPACT VARIANT ---------------- */
  if (variant === 'compact') {
    return (
      <div 
        onClick={handleCardClick}
        className="group relative bg-white rounded-3xl p-3.5 border border-cream-300 shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer flex items-center gap-3.5 active:scale-[0.99]"
      >
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-emerald-900/10">
          <img 
            src={profile.photo} 
            alt={profile.name} 
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isBlur ? 'blur-md' : ''}`}
          />
          {profile.online && (
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif font-bold text-sm text-emerald-950 truncate">{profile.name}, {profile.age}</h4>
            {profile.verified.photo && <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />}
          </div>
          <p className="text-xs text-charcoal-500 truncate mt-0.5">{profile.profession}</p>
          <p className="text-[11px] text-charcoal-400 truncate flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
            {profile.city}, {profile.country}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 font-bold text-[11px] px-2 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-2.5 h-2.5 text-gold-600" />
            {profile.compatibilityScore}%
          </span>
        </div>
      </div>
    );
  }

  /* ---------------- HORIZONTAL VARIANT ---------------- */
  if (variant === 'horizontal') {
    return (
      <div className="bg-white rounded-3xl p-5 border border-cream-300 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col md:flex-row gap-5">
        <div 
          onClick={handleCardClick}
          className="relative w-full md:w-56 h-60 md:h-auto rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
        >
          <img 
            src={profile.photo} 
            alt={profile.name} 
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <Badge variant="match" size="sm">
              {profile.compatibilityScore}% Match
            </Badge>
            {profile.verified.photo && (
              <Badge variant="verified" size="sm">
                Verified
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h3 
                  onClick={handleCardClick}
                  className="text-xl font-serif font-bold text-emerald-950 hover:text-emerald-700 cursor-pointer transition-colors"
                >
                  {profile.name}, {profile.age}
                </h3>
                <p className="text-xs text-charcoal-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>{profile.city}, {profile.country}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-800">{profile.maritalStatus}</span>
                  <span>•</span>
                  <span>{profile.height}</span>
                </p>
              </div>

              <button
                onClick={() => toggleFavorite(profile.id)}
                className={`p-2.5 rounded-full border transition-all ${
                  isFav
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                    : 'bg-cream-100 border-cream-300 text-charcoal-400 hover:text-rose-600'
                }`}
                aria-label="Save"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 text-xs text-charcoal-700 bg-cream-50 p-3 rounded-2xl border border-cream-200">
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span className="truncate">{profile.profession}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span className="truncate">{profile.degree}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                <span className="truncate">{profile.religion.sect}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">{profile.religion.prayerFrequency}</span>
              </div>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
              "{profile.aboutMe}"
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-3 border-t border-cream-200">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCardClick}
              className="flex-1"
            >
              View Full Profile
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => (onSendInterest ? onSendInterest() : sendInterest(profile.id))}
              disabled={Boolean(sentInterest)}
              className="flex-1"
              leftIcon={<Heart className="w-3.5 h-3.5" />}
            >
              {sentInterest ? 'Interest Sent' : 'Send Interest'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- FEATURED VARIANT ---------------- */
  if (variant === 'featured') {
    return (
      <div className="relative bg-gradient-to-b from-white to-cream-50 rounded-3xl p-5 border-2 border-gold-400/40 shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-sm">
          Featured Match
        </div>

        <div className="relative h-64 rounded-2xl overflow-hidden mb-4 cursor-pointer group" onClick={handleCardClick}>
          <img 
            src={photos[activePhotoIdx] || profile.photo} 
            alt={profile.name} 
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge variant="match" size="sm">
              {profile.compatibilityScore}% Compatibility
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl font-serif font-bold">{profile.name}, {profile.age}</h3>
              {profile.verified.photo && <ShieldCheck className="w-5 h-5 text-gold-400" />}
            </div>
            <p className="text-xs text-cream-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {profile.city}, {profile.country}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-charcoal-500">Marital Status:</span>
            <span className="font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md">{profile.maritalStatus}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-charcoal-500">Profession:</span>
            <span className="font-semibold text-emerald-950">{profile.profession}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-charcoal-500">Education:</span>
            <span className="font-semibold text-emerald-950">{profile.degree}</span>
          </div>
        </div>

        {/* Why this match highlight */}
        <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 mb-4">
          <p className="text-[11px] font-bold text-emerald-950 mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-600" />
            Why this match?
          </p>
          <p className="text-[11px] text-charcoal-600 leading-snug">
            {profile.matchReasons[0]} & {profile.matchReasons[1]}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" fullWidth onClick={handleCardClick}>
            View Profile
          </Button>
          <Button 
            variant="gold" 
            size="sm" 
            fullWidth 
            onClick={() => sendInterest(profile.id)}
            disabled={Boolean(sentInterest)}
          >
            {sentInterest ? 'Sent' : 'Connect'}
          </Button>
        </div>
      </div>
    );
  }

  /* ---------------- DEFAULT GRID VARIANT (Optimized for Mobile Touch) ---------------- */
  return (
    <div className="group bg-white rounded-3xl border border-cream-300/90 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Media Area */}
      <div className="relative h-68 sm:h-76 w-full overflow-hidden bg-cream-200 cursor-pointer" onClick={handleCardClick}>
        <img
          src={photos[activePhotoIdx] || profile.photo}
          alt={profile.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isBlur ? 'blur-md' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 max-w-[75%]">
          <Badge variant="match" size="sm">
            {profile.compatibilityScore}% Match
          </Badge>
          {profile.verified.photo && (
            <Badge variant="verified" size="sm">
              Verified
            </Badge>
          )}
          {profile.maritalStatus.includes('2nd') && (
            <span className="bg-gold-500 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              Seeking 2nd Wife
            </span>
          )}
        </div>

        {/* Favorite Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(profile.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-75 z-10 shadow-md ${
            isFav
              ? 'bg-rose-500 text-white'
              : 'bg-black/35 hover:bg-black/60 text-white'
          }`}
          aria-label="Save profile"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Multi-Photo Dots */}
        {photos.length > 1 && (
          <div className="absolute top-14 right-3.5 flex flex-col gap-1 z-10" onClick={(e) => e.stopPropagation()}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activePhotoIdx === i ? 'bg-gold-400 w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Online Status & Bottom Overlay */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-xl text-white tracking-tight">
              {profile.name}, {profile.age}
            </h3>
            {profile.online && (
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white shrink-0 animate-pulse" />
            )}
          </div>
          <p className="text-xs text-cream-200 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{profile.city}, {profile.country}</span>
            <span>•</span>
            <span className="text-gold-300 font-semibold">{profile.maritalStatus}</span>
          </p>
        </div>
      </div>

      {/* Profile Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-2">
          {/* Key tags */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="bg-cream-100 text-charcoal-700 px-2.5 py-1 rounded-xl font-medium border border-cream-200 truncate max-w-[130px]">
              {profile.profession}
            </span>
            <span className="bg-cream-100 text-charcoal-700 px-2.5 py-1 rounded-xl font-medium border border-cream-200">
              {profile.degree.split(' ')[0]}
            </span>
            <span className="bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-xl font-medium border border-emerald-200">
              {profile.religion.prayerFrequency.split(' ')[0]} Salah
            </span>
          </div>

          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
            {profile.aboutMe}
          </p>

          {/* Why this match mini banner */}
          <div className="bg-cream-50 rounded-2xl p-2.5 border border-cream-200 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-charcoal-600 line-clamp-1">
              <span className="font-semibold text-emerald-950">Why match: </span>
              {profile.matchReasons[0]}
            </div>
          </div>
        </div>

        {/* Action Buttons (Large Touch Targets for Mobile) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cream-200">
          <Button
            variant="outline"
            size="md"
            onClick={handleCardClick}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Details
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => (onSendInterest ? onSendInterest() : sendInterest(profile.id))}
            disabled={Boolean(sentInterest)}
            leftIcon={<Heart className="w-4 h-4" />}
          >
            {sentInterest ? 'Interest Sent' : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  );
};
