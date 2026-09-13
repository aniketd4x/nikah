import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MatchCard } from '../components/cards/MatchCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Heart, Sparkles, Compass, Users } from 'lucide-react';

export const MatchesScreen: React.FC = () => {
  const { filteredProfiles, interests, navigateTo } = useApp();
  const [activeSection, setActiveSection] = useState<'all' | 'mutual' | 'recommended'>('all');

  // Mutual matches (accepted interests)
  const acceptedProfileIds = interests
    .filter((i) => i.status === 'accepted')
    .map((i) => i.profileId);
  const mutualMatches = filteredProfiles.filter((p) => acceptedProfileIds.includes(p.id));

  // New matches (first 4 opposite-gender profiles)
  const newMatches = filteredProfiles.slice(0, 4);

  // High compatibility recommendations (score >= 93%)
  const recommendedMatches = filteredProfiles.filter((p) => p.compatibilityScore >= 92);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* Native Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
            <Sparkles className="w-3 h-3 text-gold-600" />
            Halal Connections
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
            Your Matches & Compatibility
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
            Profiles with high spiritual, educational, and lifestyle alignment.
          </p>
        </div>

        {/* Native Segmented Filter Pill Control */}
        <div className="flex items-center gap-1 bg-cream-200/70 p-1.5 rounded-2xl border border-cream-300/80 shadow-inner backdrop-blur-sm self-start sm:self-auto overflow-x-auto max-w-full no-scrollbar">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              activeSection === 'all'
                ? 'bg-emerald-950 text-gold-300 shadow-sm font-bold'
                : 'text-charcoal-600 hover:text-emerald-950'
            }`}
          >
            All Matches
          </button>
          <button
            onClick={() => setActiveSection('mutual')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              activeSection === 'mutual'
                ? 'bg-emerald-950 text-gold-300 shadow-sm font-bold'
                : 'text-charcoal-600 hover:text-emerald-950'
            }`}
          >
            Mutual ({mutualMatches.length})
          </button>
          <button
            onClick={() => setActiveSection('recommended')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              activeSection === 'recommended'
                ? 'bg-emerald-950 text-gold-300 shadow-sm font-bold'
                : 'text-charcoal-600 hover:text-emerald-950'
            }`}
          >
            92%+ Compatible
          </button>
        </div>
      </div>

      {/* SECTION 1: Mutual Interests (Connected) */}
      {(activeSection === 'all' || activeSection === 'mutual') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-100/90 text-gold-800 flex items-center justify-center font-bold shadow-sm border border-gold-200">
              <Sparkles className="w-4 h-4 text-gold-600" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-emerald-950">Mutual Interests (Connected)</h2>
              <p className="text-xs text-charcoal-500">Both profiles accepted connection requests. You can converse respectfully.</p>
            </div>
          </div>

          {mutualMatches.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 text-center border border-cream-300/80 shadow-soft text-xs text-charcoal-500 space-y-2">
              <Sparkles className="w-8 h-8 text-gold-400 mx-auto opacity-70" />
              <p className="max-w-md mx-auto">No mutual matches yet. As you accept interests or receive approvals, they will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mutualMatches.map((profile) => (
                <MatchCard key={profile.id} profile={profile} matchType="mutual" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Top Recommended Matches */}
      {(activeSection === 'all' || activeSection === 'recommended') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center font-bold shadow-sm border border-emerald-200">
              <Heart className="w-4 h-4 text-emerald-700 fill-emerald-700/20" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-emerald-950">Highly Compatible Matches (92%+)</h2>
              <p className="text-xs text-charcoal-500">Profiles with highest synergy across prayer routine, background, and relocation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedMatches.map((profile) => (
              <MatchCard key={profile.id} profile={profile} matchType="recommended" />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: New Matches */}
      {activeSection === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cream-200/90 text-charcoal-700 flex items-center justify-center font-bold shadow-sm border border-cream-300">
                <Compass className="w-4 h-4 text-emerald-800" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-emerald-950">Recently Joined Verified Members</h2>
                <p className="text-xs text-charcoal-500">New verified profiles registered in the last 7 days.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigateTo('discover')}>
              Discover More
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newMatches.map((profile) => (
              <MatchCard key={profile.id} profile={profile} matchType="new" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
