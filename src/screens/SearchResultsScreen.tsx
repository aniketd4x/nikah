import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProfileCard } from '../components/cards/ProfileCard';
import { FilterPanel } from '../components/search/FilterPanel';
import { BottomSheet } from '../components/common/BottomSheet';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  ArrowUpDown, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';

export const SearchResultsScreen: React.FC = () => {
  const { 
    filteredProfiles, 
    filterState, 
    setFilterState,
    resetFilters, 
    appliedFiltersCount,
    navigateTo 
  } = useApp();

  const [sortBy, setSortBy] = useState<'best_match' | 'newest' | 'active' | 'compatibility'>('best_match');
  const [viewMode, setViewMode] = useState<'grid' | 'horizontal'>('grid');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Sorting logic
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortBy === 'compatibility') {
      return b.compatibilityScore - a.compatibilityScore;
    }
    if (sortBy === 'newest') {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    }
    if (sortBy === 'active') {
      return (b.online ? 1 : 0) - (a.online ? 1 : 0);
    }
    // best_match default
    return b.compatibilityScore - a.compatibilityScore;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
              Matched Profiles
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {sortedProfiles.length} Results
            </span>
          </div>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Verified members matching your religious, cultural, and career criteria.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-emerald-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterState.keyword || ''}
            onChange={(e) => setFilterState((p) => ({ ...p, keyword: e.target.value }))}
            placeholder="Type keyword, city, profession..."
            className="w-full bg-cream-50 border border-cream-300 rounded-2xl pl-10 pr-4 py-2 text-xs text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* Action Controls & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-cream-100 text-charcoal-800 text-xs font-semibold border border-cream-300 hover:bg-cream-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
            <span>Filters ({appliedFiltersCount})</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs bg-cream-50 px-3 py-1.5 rounded-2xl border border-cream-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
            >
              <option value="best_match">Sort: Best Match</option>
              <option value="compatibility">Sort: Most Compatible</option>
              <option value="newest">Sort: Newest First</option>
              <option value="active">Sort: Recently Active</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid vs Horizontal) */}
          <div className="hidden sm:flex items-center bg-cream-100 p-1 rounded-2xl border border-cream-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-950 shadow-sm' : 'text-charcoal-400'
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('horizontal')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'horizontal' ? 'bg-white text-emerald-950 shadow-sm' : 'text-charcoal-400'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Desktop Filter Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Left Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-4 bg-white rounded-3xl p-6 border border-cream-300 shadow-soft sticky top-24">
          <FilterPanel />
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8 space-y-6">
          {sortedProfiles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-cream-300 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-emerald-950">No Profiles Match These Exact Filters</h3>
              <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
                Try loosening your age or city filter criteria to discover more verified members.
              </p>
              <Button variant="primary" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
            >
              {sortedProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  variant={viewMode === 'grid' ? 'grid' : 'horizontal'}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile BottomSheet Filter */}
      <BottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filter Matched Profiles"
        subtitle={`${sortedProfiles.length} profiles currently match`}
      >
        <FilterPanel isMobile onApply={() => setIsFilterSheetOpen(false)} />
      </BottomSheet>
    </div>
  );
};
