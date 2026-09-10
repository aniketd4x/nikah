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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
          Saved Shortlist
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1">
          Your Favorite Profiles
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Easily revisit and connect with profiles you have bookmarked for family review.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-cream-300">
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
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                isActive
                  ? 'border-emerald-900 text-emerald-950 bg-white rounded-t-2xl shadow-sm'
                  : 'border-transparent text-charcoal-500 hover:text-emerald-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-emerald-900 text-white' : 'bg-cream-200 text-charcoal-700'
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
