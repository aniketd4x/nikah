import React from 'react';
import { Profile } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Heart, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Crown 
} from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

interface MatrimonialProfileCardProps {
  profile: Profile;
  onSendInterest: (id: string) => void;
  onSave: (id: string) => void;
  onViewDetails: (id: string) => void;
  isSaved?: boolean;
}

export const MatrimonialProfileCard: React.FC<MatrimonialProfileCardProps> = ({
  profile,
  onSendInterest,
  onSave,
  onViewDetails,
  isSaved = false
}) => {
  const isVerified = Boolean(profile.verified?.identity || profile.verified?.reviewed);

  return (
    <div className="bg-white rounded-[2rem] border border-cream-300 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Profile Image & Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-cream-200">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            {isVerified ? (
              <span className="bg-emerald-900/90 backdrop-blur-md text-gold-300 text-[11px] font-bold px-3 py-1 rounded-full border border-gold-400/40 flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Sharia Verified</span>
              </span>
            ) : (
              <span className="bg-slate-900/80 backdrop-blur-md text-cream-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                ID on File
              </span>
            )}

            {profile.isVip && (
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Crown className="w-3 h-3" />
                <span>VIP</span>
              </span>
            )}
          </div>

          {/* Bottom Card Summary */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif font-bold text-xl leading-tight">
                {profile.name}, {profile.age}
              </h3>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                profile.gender === 'female' ? 'bg-rose-950/80 text-rose-200 border border-rose-700/60' : 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/60'
              }`}>
                {profile.gender === 'female' ? 'Muslimah' : 'Brother'}
              </span>
            </div>

            <p className="text-xs text-cream-200 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{profile.city}, {profile.country}</span>
            </p>
          </div>
        </div>

        {/* Profile Attributes & Tags */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Key tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-emerald-50 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200/80 flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-emerald-700" />
              <span>{profile.profession}</span>
            </span>

            <span className="bg-gold-50 text-gold-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gold-200">
              {profile.religion.sect}
            </span>

            <span className="bg-cream-100 text-charcoal-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-cream-300">
              {profile.maritalStatus}
            </span>
          </div>

          {/* Polygyny & Structure Banner */}
          <div className="p-2.5 rounded-2xl bg-cream-50 border border-cream-200/80 text-[11px] text-charcoal-700 flex items-center justify-between">
            <span className="text-gold-700 font-bold">Marriage Intention:</span>
            <span className="font-semibold text-emerald-950 text-right truncate ml-2">
              {profile.polygynyInfo?.marriageType || 'First Marriage'}
            </span>
          </div>

          {/* About snippet */}
          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed italic">
            "{profile.aboutMe}"
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 border-t border-cream-100 flex items-center gap-2">
        <button
          onClick={() => {
            triggerHaptic(10);
            onViewDetails(profile.id);
          }}
          className="flex-1 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-800" />
          <span>Full Profile</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic(10);
            onSave(profile.id);
          }}
          className={`p-2.5 rounded-2xl border transition-colors ${
            isSaved
              ? 'bg-rose-50 text-rose-600 border-rose-200'
              : 'bg-white text-charcoal-500 border-cream-300 hover:text-rose-600 hover:border-rose-200'
          }`}
          title="Save Profile"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={() => {
            triggerHaptic(15);
            onSendInterest(profile.id);
          }}
          className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-gold-300 font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Express Interest</span>
        </button>
      </div>
    </div>
  );
};
