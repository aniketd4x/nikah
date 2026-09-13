import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

interface FilterPanelProps {
  isMobile?: boolean;
  onApply?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isMobile = false, onApply }) => {
  const { currentUser, filterState, setFilterState, resetFilters, appliedFiltersCount } = useApp();

  const handleAgeChange = (index: 0 | 1, value: number) => {
    setFilterState((prev) => {
      const nextRange: [number, number] = [...prev.ageRange];
      nextRange[index] = value;
      if (nextRange[0] > nextRange[1]) {
        if (index === 0) nextRange[1] = value;
        else nextRange[0] = value;
      }
      return { ...prev, ageRange: nextRange };
    });
  };

  const handleReset = () => {
    triggerHaptic(10);
    resetFilters();
  };

  return (
    <div className="space-y-6 text-charcoal-800">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3.5 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
          <h3 className="font-serif font-bold text-base text-emerald-950">Refine Matches</h3>
          {appliedFiltersCount > 0 && (
            <span className="bg-emerald-900 text-gold-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {appliedFiltersCount} Active
            </span>
          )}
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-charcoal-500 hover:text-emerald-950 flex items-center gap-1.5 font-semibold transition-colors active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Looking For (Gender - Locked to Opposite Gender for Islamic Compliance) */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Looking For
        </label>
        <div className="p-3 rounded-2xl bg-cream-50 border border-cream-300 flex items-center justify-between shadow-sm">
          <span className="text-xs font-bold text-emerald-950">
            {currentUser.gender === 'female' ? '🤵 Groom (Brother)' : '🧕 Bride (Muslimah)'}
          </span>
          <span className="text-[10px] font-bold text-gold-800 bg-gold-100 px-2.5 py-0.5 rounded-full border border-gold-300 shadow-sm">
            Halal Verified
          </span>
        </div>
      </div>

      {/* Age Range Slider */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Age Range</span>
          <span className="font-bold text-emerald-950 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-xl">
            {filterState.ageRange[0]} - {filterState.ageRange[1]} yrs
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-2xl border border-cream-200 shadow-sm">
          <div>
            <span className="text-[10px] text-charcoal-500 font-semibold block mb-1">Min Age</span>
            <input
              type="range"
              min="18"
              max="50"
              value={filterState.ageRange[0]}
              onChange={(e) => handleAgeChange(0, parseInt(e.target.value))}
              className="w-full accent-emerald-900 cursor-pointer"
            />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-500 font-semibold block mb-1">Max Age</span>
            <input
              type="range"
              min="18"
              max="50"
              value={filterState.ageRange[1]}
              onChange={(e) => handleAgeChange(1, parseInt(e.target.value))}
              className="w-full accent-emerald-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Location (Country & City) */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Location
        </label>
        <div>
          <select
            value={filterState.country}
            onChange={(e) => setFilterState((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">All Countries</option>
            <option value="India">India</option>
            <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
            <option value="United Kingdom">United Kingdom (UK)</option>
            <option value="United States">United States (USA)</option>
            <option value="Canada">Canada</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Qatar">Qatar</option>
          </select>
        </div>

        <div>
          <select
            value={filterState.city}
            onChange={(e) => setFilterState((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Kochi">Kochi</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="London">London</option>
            <option value="Toronto">Toronto</option>
            <option value="New York">New York</option>
            <option value="Doha">Doha</option>
            <option value="Riyadh">Riyadh</option>
          </select>
        </div>
      </div>

      {/* Marital Status & Polygyny */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Marital Status & Polygamy
        </label>
        <select
          value={filterState.maritalStatus}
          onChange={(e) => setFilterState((prev) => ({ ...prev, maritalStatus: e.target.value }))}
          className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
        >
          <option value="">Any Status</option>
          <option value="Never Married">Never Married (Single)</option>
          <option value="Married (Seeking 2nd Wife)">Married (Seeking 2nd Wife)</option>
          <option value="Married (Seeking 3rd Wife)">Married (Seeking 3rd Wife)</option>
          <option value="Married (Seeking 4th Wife)">Married (Seeking 4th Wife)</option>
          <option value="Open to Polygyny (Co-Wife)">Open to Polygyny (Co-Wife)</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>

      {/* Religious Practice & Sect */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Religious Commitment
        </label>
        <div>
          <select
            value={filterState.religiousPractice}
            onChange={(e) => setFilterState((prev) => ({ ...prev, religiousPractice: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">Any Prayer Frequency</option>
            <option value="Always">Always (5 times daily)</option>
            <option value="Usually">Usually</option>
            <option value="Sometimes">Sometimes</option>
          </select>
        </div>

        <div>
          <select
            value={filterState.sect}
            onChange={(e) => setFilterState((prev) => ({ ...prev, sect: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">Any Islamic Sect / School</option>
            <option value="Sunni">Sunni</option>
            <option value="Hanafi">Sunni (Hanafi)</option>
            <option value="Shafi">Sunni (Shafi)</option>
          </select>
        </div>
      </div>

      {/* Education & Profession */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Education & Career
        </label>
        <div>
          <select
            value={filterState.education}
            onChange={(e) => setFilterState((prev) => ({ ...prev, education: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">Any Education</option>
            <option value="Doctorate">Doctorate (PhD / MD)</option>
            <option value="Postgraduate">Postgraduate (Masters / MBA)</option>
            <option value="Bachelors">Bachelors Degree</option>
          </select>
        </div>

        <div>
          <select
            value={filterState.profession}
            onChange={(e) => setFilterState((prev) => ({ ...prev, profession: e.target.value }))}
            className="w-full text-xs p-3 rounded-2xl border border-cream-300 bg-white font-medium text-charcoal-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none shadow-sm"
          >
            <option value="">Any Profession</option>
            <option value="Software">Software / Tech</option>
            <option value="Doctor">Medicine / Healthcare</option>
            <option value="Engineer">Engineering</option>
            <option value="Accountant">Finance / CA / Banking</option>
            <option value="Law">Law & Legal</option>
            <option value="Design">Design / UX / Creative</option>
          </select>
        </div>
      </div>

      {/* Trust & Verified Toggles */}
      <div className="space-y-2.5 pt-3.5 border-t border-cream-200">
        <label className="flex items-center justify-between cursor-pointer p-3 rounded-2xl hover:bg-cream-50 bg-white border border-cream-200 shadow-sm transition-colors">
          <span className="text-xs font-bold text-emerald-950">Verified Profiles Only</span>
          <input
            type="checkbox"
            checked={filterState.verifiedOnly}
            onChange={(e) => setFilterState((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800 cursor-pointer"
          />
        </label>
      </div>

      {/* Apply Button (especially on mobile) */}
      {isMobile && onApply && (
        <div className="pt-4">
          <Button variant="primary" size="lg" fullWidth onClick={onApply}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
};

