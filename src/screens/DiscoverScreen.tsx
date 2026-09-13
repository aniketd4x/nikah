import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MatrimonialProfileCard } from '../components/cards/MatrimonialProfileCard';
import { 
  Sparkles, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw,
  CheckCircle2,
  Filter,
  Users
} from 'lucide-react';
import { triggerHaptic } from '../styles/designTokens';

export const DiscoverScreen: React.FC = () => {
  const { 
    filteredProfiles, 
    sendInterest, 
    toggleFavorite, 
    favorites,
    navigateTo,
    setSelectedProfileId,
    addToast,
    setFilterState
  } = useApp();

  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  const handleSendInterest = (id: string) => {
    sendInterest(id);
    addToast('Interest Expressed', 'Your profile interest has been sent respectfully to this member.', 'success');
  };

  const handleViewDetails = (id: string) => {
    setSelectedProfileId(id);
    navigateTo('profile-details');
  };

  const quickFilterChips = [
    { label: '🌟 2nd Wife (Polygyny)', action: () => setFilterState((p) => ({ ...p, maritalStatus: 'Married (Seeking 2nd Wife)' })) },
    { label: '🩺 Doctors', action: () => setFilterState((p) => ({ ...p, profession: 'Doctor' })) },
    { label: '💻 Software / Tech', action: () => setFilterState((p) => ({ ...p, profession: 'Software' })) },
    { label: '🇦🇪 UAE (Dubai)', action: () => setFilterState((p) => ({ ...p, country: 'United Arab Emirates' })) },
    { label: '🇬🇧 UK (London)', action: () => setFilterState((p) => ({ ...p, country: 'United Kingdom' })) },
    { label: '🤲 Strict 5x Salah', action: () => setFilterState((p) => ({ ...p, religiousPractice: 'Always' })) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 pb-28 md:pb-12 select-none">
      {/* Top Header & Layout Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-2.5 py-0.5 rounded-full border border-gold-300 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-gold-600" />
            Verified Match Discovery
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mt-1">
            Discover Compatible Matches
          </h1>
          <p className="text-xs text-charcoal-500">
            {filteredProfiles.length} verified matrimonial profiles currently available
          </p>
        </div>

        {/* Layout & Filter Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-cream-200 p-1 rounded-2xl border border-cream-300">
            <button
              onClick={() => {
                triggerHaptic(10);
                setViewLayout('grid');
              }}
              className={`p-1.5 rounded-xl transition-all ${
                viewLayout === 'grid' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                triggerHaptic(10);
                setViewLayout('list');
              }}
              className={`p-1.5 rounded-xl transition-all ${
                viewLayout === 'list' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => navigateTo('search')}
            className="p-2 rounded-2xl bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100 shadow-soft flex items-center gap-1.5 text-xs font-bold"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Rail */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
        {quickFilterChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              triggerHaptic(10);
              chip.action();
            }}
            className="text-xs bg-white border border-cream-300 text-charcoal-700 hover:border-emerald-800 hover:bg-cream-50 px-3 py-1.5 rounded-full font-semibold shadow-soft shrink-0 whitespace-nowrap active:scale-95 transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length > 0 ? (
        <div className={`grid gap-5 sm:gap-6 ${
          viewLayout === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {filteredProfiles.map((p) => (
            <MatrimonialProfileCard
              key={p.id}
              profile={p}
              onSendInterest={handleSendInterest}
              onSave={(id) => toggleFavorite(id)}
              onViewDetails={handleViewDetails}
              isSaved={favorites.includes(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-300 p-8 shadow-soft">
          <Users className="w-12 h-12 text-cream-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-emerald-950">No Profiles Match Criteria</h3>
          <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
            Try resetting your filters or adjusting your age and location preferences.
          </p>
          <button
            onClick={() => setFilterState((prev) => ({ ...prev, maritalStatus: '', profession: '', country: '', religiousPractice: '' }))}
            className="mt-4 px-4 py-2 rounded-2xl bg-emerald-950 text-gold-300 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
