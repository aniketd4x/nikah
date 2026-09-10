import React from 'react';
import { Profile } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MessageCircle, Heart, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface MatchCardProps {
  profile: Profile;
  matchType?: 'mutual' | 'recommended' | 'new';
}

export const MatchCard: React.FC<MatchCardProps> = ({
  profile,
  matchType = 'recommended'
}) => {
  const { navigateTo, startChatWithProfile, toggleFavorite, favorites, sendInterest, interests } = useApp();
  const isFav = favorites.includes(profile.id);
  const hasSent = interests.some((i) => i.profileId === profile.id && i.type === 'sent');

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-cream-300 shadow-soft hover:shadow-card transition-all flex flex-col justify-between">
      <div>
        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-3.5 cursor-pointer group" onClick={() => navigateTo('profile-details', profile.id)}>
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-1.5">
            <Badge variant="match" size="sm">
              {profile.compatibilityScore}% Compatibility
            </Badge>
            {profile.verified.photo && <Badge variant="verified" size="sm">Verified</Badge>}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(profile.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${
              isFav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-serif font-bold text-lg">{profile.name}, {profile.age}</h3>
            <p className="text-xs text-cream-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-400" />
              {profile.city}, {profile.country}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          <p className="text-xs font-semibold text-emerald-950">{profile.profession}</p>
          <p className="text-[11px] text-charcoal-500">{profile.degree} • {profile.religion.sect}</p>
          <div className="bg-cream-100 rounded-xl p-2 text-[11px] text-charcoal-600 mt-2">
            <span className="font-semibold text-emerald-900">Why matched: </span>
            {profile.matchReasons[0]}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-cream-200">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => navigateTo('profile-details', profile.id)}
        >
          View
        </Button>
        {matchType === 'mutual' ? (
          <Button
            variant="gold"
            size="sm"
            fullWidth
            leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
            onClick={() => startChatWithProfile(profile.id)}
          >
            Chat
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            disabled={hasSent}
            onClick={() => sendInterest(profile.id)}
          >
            {hasSent ? 'Sent' : 'Connect'}
          </Button>
        )}
      </div>
    </div>
  );
};
