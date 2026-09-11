import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SwipeCardStack } from '../components/cards/SwipeCardStack';
import { ProfileCard } from '../components/cards/ProfileCard';
import { Button } from '../components/common/Button';
import { 
  Sparkles, 
  SlidersHorizontal, 
  LayoutGrid, 
  Layers, 
  RotateCcw,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { triggerHaptic } from '../styles/designTokens';

export const DiscoverScreen: React.FC = () => {
  const { 
    filteredProfiles, 
    sendInterest, 
    toggleFavorite, 
    passProfile, 
    passes, 
    navigateTo,
    addToast,
    setFilterState
  } = useApp();

  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

  // Available profiles (excluding passed)
  const availableProfiles = filteredProfiles.filter((p) => !passes.includes(p.id));

  const handleSuperLike = (id: string) => {
    sendInterest(id);
    addToast('Super Interest Sent! ★', 'Your proposal was prioritized at the top of their inbox.', 'success');
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
      {/* Top Header & View Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-2.5 py-0.5 rounded-full border border-gold-300">
            Halal Discovery Mode
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mt-1">
            Discover Compatible Singles
          </h1>
        </div>

        {/* View Mode Toggle (Stack vs Grid) on Desktop */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-cream-200 p-1 rounded-2xl border border-cream-300">
            <button
              onClick={() => {
                triggerHaptic(10);
                setViewMode('stack');
              }}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'stack' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="Swipe Card Stack View"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                triggerHaptic(10);
                setViewMode('grid');
              }}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-950 shadow-sm font-bold' : 'text-charcoal-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => navigateTo('search')}
            className="p-2 rounded-2xl bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100 shadow-soft"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
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
            className="text-xs bg-white border border-cream-300 text-charcoal-700 hover:border-emerald-800 hover:bg-cream-50 px-3 py-1 rounded-full font-semibold shadow-soft shrink-0 whitespace-nowrap active:scale-95 transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'stack' ? (
        <div className="py-2 flex justify-center items-center">
          <SwipeCardStack
            profiles={availableProfiles}
            onPass={(id) => passProfile(id)}
            onSendInterest={(id) => sendInterest(id)}
            onSave={(id) => toggleFavorite(id)}
            onSuperLike={handleSuperLike}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProfiles.map((p) => (
            <ProfileCard key={p.id} profile={p} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
