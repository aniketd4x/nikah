import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MatchCard } from '../components/cards/MatchCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Heart, Sparkles, Compass, Users } from 'lucide-react';

export const MatchesScreen: React.FC = () => {
  const { profiles, interests, navigateTo } = useApp();
  const [activeSection, setActiveSection] = useState<'all' | 'mutual' | 'recommended'>('all');

  // Mutual matches (accepted interests)
  const acceptedProfileIds = interests
    .filter((i) => i.status === 'accepted')
    .map((i) => i.profileId);
  const mutualMatches = profiles.filter((p) => acceptedProfileIds.includes(p.id));

  // New matches (first 4 profiles)
  const newMatches = profiles.slice(0, 4);

  // High compatibility recommendations (score >= 93%)
  const recommendedMatches = profiles.filter((p) => p.compatibilityScore >= 92);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-24 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
            Halal Connections
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1">
            Your Matches & Compatibility
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Profiles with high spiritual, educational, and lifestyle alignment.
          </p>
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center gap-2 bg-cream-100 p-1 rounded-2xl border border-cream-300">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'all' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
            }`}
          >
            All Matches
          </button>
          <button
            onClick={() => setActiveSection('mutual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'mutual' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
            }`}
          >
            Mutual ({mutualMatches.length})
          </button>
          <button
            onClick={() => setActiveSection('recommended')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'recommended' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
            }`}
          >
            92%+ Compatible
          </button>
        </div>
      </div>

      {/* SECTION 1: Mutual Interests (Connected) */}
      {(activeSection === 'all' || activeSection === 'mutual') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-gold-600" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-emerald-950">Mutual Interests (Connected)</h2>
              <p className="text-xs text-charcoal-500">Both profiles accepted connection requests. You can converse respectfully.</p>
            </div>
          </div>

          {mutualMatches.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center border border-cream-300 text-xs text-charcoal-500">
              No mutual matches yet. As you accept interests or receive approvals, they will appear here.
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-emerald-700" />
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cream-200 text-charcoal-700 flex items-center justify-center font-bold">
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
