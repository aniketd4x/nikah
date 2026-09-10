import React from 'react';
import { InterestRequest } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ShieldCheck, MapPin, Check, X, MessageCircle, Clock, Eye } from 'lucide-react';

interface InterestCardProps {
  interest: InterestRequest;
}

export const InterestCard: React.FC<InterestCardProps> = ({ interest }) => {
  const { profiles, acceptInterest, declineInterest, cancelSentInterest, navigateTo, startChatWithProfile } = useApp();
  const profile = profiles.find((p) => p.id === interest.profileId);

  if (!profile) return null;

  const isReceived = interest.type === 'received';
  const isAccepted = interest.status === 'accepted';
  const isDeclined = interest.status === 'declined';
  const isPending = interest.status === 'pending';

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-cream-300 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Avatar / Photo */}
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
        onClick={() => navigateTo('profile-details', profile.id)}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {profile.online && (
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3
            onClick={() => navigateTo('profile-details', profile.id)}
            className="font-serif font-bold text-base sm:text-lg text-emerald-950 hover:text-emerald-700 cursor-pointer"
          >
            {profile.name}, {profile.age}
          </h3>
          {profile.verified.photo && <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />}
          <Badge variant="match" size="sm">
            {profile.compatibilityScore}% Match
          </Badge>
          <span className="text-[11px] text-charcoal-400 flex items-center gap-1 ml-auto">
            <Clock className="w-3 h-3" />
            {interest.timestamp}
          </span>
        </div>

        <p className="text-xs text-charcoal-600 mb-1">
          {profile.profession} • {profile.degree}
        </p>

        <p className="text-[11px] text-charcoal-500 flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-gold-600" />
          {profile.city}, {profile.country}
        </p>

        {interest.message && (
          <div className="bg-cream-100 rounded-xl p-2.5 text-xs text-charcoal-700 italic border border-cream-200">
            "{interest.message}"
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200">
        {isReceived && isPending && (
          <>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<Check className="w-3.5 h-3.5" />}
              onClick={() => acceptInterest(interest.id)}
            >
              Accept
            </Button>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              leftIcon={<X className="w-3.5 h-3.5" />}
              onClick={() => declineInterest(interest.id)}
            >
              Decline
            </Button>
          </>
        )}

        {isReceived && isAccepted && (
          <Button
            variant="gold"
            size="sm"
            fullWidth
            leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
            onClick={() => startChatWithProfile(profile.id)}
          >
            Chat Now
          </Button>
        )}

        {!isReceived && isPending && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => cancelSentInterest(interest.id)}
          >
            Cancel Request
          </Button>
        )}

        {!isReceived && isAccepted && (
          <Button
            variant="gold"
            size="sm"
            fullWidth
            leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
            onClick={() => startChatWithProfile(profile.id)}
          >
            Message Match
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={() => navigateTo('profile-details', profile.id)}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};
