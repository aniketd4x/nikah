import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProfileCard } from '../components/cards/ProfileCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart, Sparkles, UserCheck } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const { profiles, favorites, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'online'>('all');

  const favoriteProfiles = profiles.filter((p) => favorites.includes(p.id));
  const onlineFavorites = favoriteProfiles.filter((p) => p.online);
  const recentFavorites = favoriteProfiles.slice(0, 3);

  const currentList = {
    all: favoriteProfiles,
    recent: recentFavorites,
    online: onlineFavorites
  }[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <Heart className="w-3 h-3 text-gold-600 fill-gold-600/30" />
          Saved Shortlist
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
          Your Favorite Profiles
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
          Easily revisit and connect with profiles you have bookmarked for family review.
        </p>
      </div>

      {/* Modern Native App Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar bg-cream-200/70 p-1.5 rounded-2xl border border-cream-300/80 shadow-inner backdrop-blur-sm self-start">
        {[
          { id: 'all', label: 'All Saved', count: favoriteProfiles.length },
          { id: 'recent', label: 'Recently Added', count: recentFavorites.length },
          { id: 'online', label: 'Currently Online', count: onlineFavorites.length }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-emerald-950 text-gold-300 shadow-sm ring-1 ring-gold-400/20'
                  : 'text-charcoal-600 hover:text-emerald-950 hover:bg-white/50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-gold-500 text-emerald-950' : 'bg-cream-300 text-charcoal-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid or Empty */}
      {currentList.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-rose-500" />}
          title="No Favorite Profiles Yet"
          description="Click the heart icon on any profile card to save them to your personal shortlist."
          actionText="Discover Verified Matches"
          onAction={() => navigateTo('discover')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
