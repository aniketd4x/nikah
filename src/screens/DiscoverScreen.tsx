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
  Users, 
  Search 
} from 'lucide-react';
import { triggerHaptic } from '../styles/designTokens';

export const DiscoverScreen: React.FC = () => {
  const { 
    filteredProfiles, 
    filterState,
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
    triggerHaptic(12);
    sendInterest(id);
    addToast('Interest Expressed', 'Your profile interest has been sent respectfully to this member.', 'success');
  };

  const handleViewDetails = (id: string) => {
    triggerHaptic(8);
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
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 pb-28 md:pb-12 select-none">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-[2rem] border border-cream-300 shadow-app-card">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-gold-800 uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full border border-gold-300 inline-flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
            Verified Match Discovery
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mt-1">
            Discover Compatible Matches
          </h1>
        </div>

        {/* Live Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-emerald-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterState.keyword || ''}
            onChange={(e) => setFilterState((p) => ({ ...p, keyword: e.target.value }))}
            placeholder="Search name, city, career..."
            className="w-full bg-cream-50 border border-cream-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-sm"
          />
        </div>

        {/* Layout & Filter Toggle */}
        <div className="flex items-center gap-2 justify-end">
          <div className="hidden sm:flex items-center bg-cream-100 p-1 rounded-2xl border border-cream-200">
            <button
              onClick={() => {
                triggerHaptic(8);
                setViewLayout('grid');
              }}
              className={`p-2 rounded-xl transition-all active:scale-90 ${
                viewLayout === 'grid' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                triggerHaptic(8);
                setViewLayout('list');
              }}
              className={`p-2 rounded-xl transition-all active:scale-90 ${
                viewLayout === 'list' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              triggerHaptic(8);
              navigateTo('search');
            }}
            className="p-2.5 px-4 rounded-2xl bg-white border border-cream-300 text-charcoal-800 hover:bg-cream-100 shadow-sm flex items-center gap-2 text-xs font-bold active:scale-95 transition-all cursor-pointer"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Rail */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
        {quickFilterChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              triggerHaptic(8);
              chip.action();
            }}
            className="text-xs bg-white border border-cream-300 text-charcoal-800 hover:border-emerald-800 hover:bg-cream-50 px-4 py-2 rounded-full font-bold shadow-sm shrink-0 whitespace-nowrap active:scale-95 transition-all cursor-pointer"
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
              onSave={(id) => {
                triggerHaptic(10);
                toggleFavorite(id);
              }}
              onViewDetails={handleViewDetails}
              isSaved={favorites.includes(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-[2rem] border border-cream-300 p-8 shadow-app-card">
          <Users className="w-12 h-12 text-cream-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-emerald-950">No Profiles Match Criteria</h3>
          <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Try resetting your filters or adjusting your age and location preferences.
          </p>
          <button
            onClick={() => {
              triggerHaptic(10);
              setFilterState((prev) => ({ ...prev, maritalStatus: '', profession: '', country: '', religiousPractice: '' }));
            }}
            className="mt-4 px-5 py-2.5 rounded-2xl bg-emerald-950 text-gold-300 font-bold text-xs shadow-sm active:scale-95 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

