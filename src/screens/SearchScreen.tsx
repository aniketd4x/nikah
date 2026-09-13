import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterPanel } from '../components/search/FilterPanel';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Search, Sparkles, MapPin, Briefcase, GraduationCap, ArrowRight, SlidersHorizontal } from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const { navigateTo, filterState, setFilterState, filteredProfiles } = useApp();

  const quickFilterChips = [
    { label: 'Software & Tech Leads', action: () => setFilterState((p) => ({ ...p, profession: 'Software', keyword: '' })) },
    { label: 'Doctors & Healthcare', action: () => setFilterState((p) => ({ ...p, profession: 'Doctor', keyword: '' })) },
    { label: 'United Arab Emirates (Dubai)', action: () => setFilterState((p) => ({ ...p, country: 'United Arab Emirates', keyword: '' })) },
    { label: 'United Kingdom (London)', action: () => setFilterState((p) => ({ ...p, country: 'United Kingdom', keyword: '' })) },
    { label: 'Postgraduates & Ph.D.', action: () => setFilterState((p) => ({ ...p, education: 'Postgraduate', keyword: '' })) },
    { label: 'Strictly 5x Daily Salah', action: () => setFilterState((p) => ({ ...p, religiousPractice: 'Always', keyword: '' })) }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('search-results');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-600" />
          Islamic Compatibility Search
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
          Find Your Ideal Partner
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
          Filter by religious practice, education, profession, location, and family lifestyle.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center shadow-card hover:shadow-card-hover rounded-[2rem] bg-white/95 backdrop-blur-md p-2 border border-cream-300 transition-all duration-300">
          <div className="pl-4 text-emerald-800">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={filterState.keyword || ''}
            onChange={(e) => setFilterState((p) => ({ ...p, keyword: e.target.value }))}
            placeholder="Search by keyword, degree, city (e.g. 'Software Mumbai', 'Doctor Dubai', 'Urdu London')..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-charcoal-800 placeholder:text-charcoal-400"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Search ({filteredProfiles.length})
          </Button>
        </form>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-[11px] font-semibold text-charcoal-500 mr-1">Popular Filters:</span>
          {quickFilterChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                chip.action();
                navigateTo('search-results');
              }}
              className="text-xs bg-white/90 hover:bg-emerald-50 text-charcoal-700 hover:text-emerald-950 px-3.5 py-1.5 rounded-full border border-cream-300 shadow-sm active:scale-95 transition-all"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Grid / Filter Sections */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card">
        <FilterPanel onApply={() => navigateTo('search-results')} />
        <div className="pt-6 border-t border-cream-200 text-center">
          <Button
            variant="gold"
            size="lg"
            className="w-full sm:w-auto min-w-[240px]"
            onClick={() => navigateTo('search-results')}
          >
            Show Matching Profiles ({filteredProfiles.length})
          </Button>
        </div>
      </div>
    </div>
  );
};
