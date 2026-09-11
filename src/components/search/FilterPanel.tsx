import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterPanelProps {
  isMobile?: boolean;
  onApply?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isMobile = false, onApply }) => {
  const { filterState, setFilterState, resetFilters, appliedFiltersCount } = useApp();

  const handleGenderChange = (gender: 'all' | 'female' | 'male') => {
    setFilterState((prev) => ({ ...prev, gender }));
  };

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

  return (
    <div className="space-y-6 text-charcoal-800">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-cream-300">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
          <h3 className="font-serif font-bold text-base text-emerald-950">Refine Matches</h3>
          {appliedFiltersCount > 0 && (
            <span className="bg-emerald-900 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {appliedFiltersCount} Active
            </span>
          )}
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-charcoal-500 hover:text-emerald-900 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Looking For (Gender) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block">
          Looking For
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'female', label: 'Bride' },
            { id: 'male', label: 'Groom' },
            { id: 'all', label: 'All' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleGenderChange(item.id as any)}
              className={`py-2 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                filterState.gender === item.id
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                  : 'bg-cream-100 text-charcoal-700 border-cream-300 hover:bg-cream-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-charcoal-600">Age Range</span>
          <span className="font-bold text-emerald-900 bg-cream-200 px-2 py-0.5 rounded-lg">
            {filterState.ageRange[0]} - {filterState.ageRange[1]} yrs
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] text-charcoal-500 block mb-1">Min Age</span>
            <input
              type="range"
              min="18"
              max="50"
              value={filterState.ageRange[0]}
              onChange={(e) => handleAgeChange(0, parseInt(e.target.value))}
              className="w-full accent-emerald-900"
            />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-500 block mb-1">Max Age</span>
            <input
              type="range"
              min="18"
              max="50"
              value={filterState.ageRange[1]}
              onChange={(e) => handleAgeChange(1, parseInt(e.target.value))}
              className="w-full accent-emerald-900"
            />
          </div>
        </div>
      </div>

      {/* Location (Country & City) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block">
          Location
        </label>
        <div>
          <select
            value={filterState.country}
            onChange={(e) => setFilterState((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block">
          Marital Status & Polygamy
        </label>
        <select
          value={filterState.maritalStatus}
          onChange={(e) => setFilterState((prev) => ({ ...prev, maritalStatus: e.target.value }))}
          className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block">
          Religious Commitment
        </label>
        <div>
          <select
            value={filterState.religiousPractice}
            onChange={(e) => setFilterState((prev) => ({ ...prev, religiousPractice: e.target.value }))}
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block">
          Education & Career
        </label>
        <div>
          <select
            value={filterState.education}
            onChange={(e) => setFilterState((prev) => ({ ...prev, education: e.target.value }))}
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
            className="w-full text-xs p-2.5 rounded-2xl border border-cream-300 bg-cream-50 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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
      <div className="space-y-2.5 pt-3 border-t border-cream-300">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-cream-100">
          <span className="text-xs font-semibold text-charcoal-700">Verified Profiles Only</span>
          <input
            type="checkbox"
            checked={filterState.verifiedOnly}
            onChange={(e) => setFilterState((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
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
