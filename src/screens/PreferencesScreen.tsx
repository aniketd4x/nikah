import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Heart, Save, ArrowLeft, MapPin, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

export const PreferencesScreen: React.FC = () => {
  const { currentUser, updateCurrentUser, navigateTo, addToast } = useApp();

  const [partnerPrefs, setPartnerPrefs] = useState({ ...currentUser.partnerPreferences });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({ partnerPreferences: partnerPrefs });
    addToast('Preferences Saved', 'Your matching criteria have been updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('my-profile')}
          className="flex items-center gap-2 text-xs font-bold text-emerald-950 hover:text-emerald-700 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cream-300 shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <Button
          variant="gold"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Save Preferences
        </Button>
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-gold-600" />
          Partner Matching Criteria
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
          Partner Preferences
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
          We use these parameters to compute compatibility scores for recommended profiles.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Age & Height */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-soft space-y-4">
          <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-800" />
            <span>Age & Physical Criteria</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">
                Partner Age Range ({partnerPrefs.ageRange[0]} - {partnerPrefs.ageRange[1]} years)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="18"
                  max="60"
                  value={partnerPrefs.ageRange[0]}
                  onChange={(e) => setPartnerPrefs({ ...partnerPrefs, ageRange: [Number(e.target.value), partnerPrefs.ageRange[1]] })}
                  className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
                />
                <span className="text-xs text-charcoal-500 font-bold">to</span>
                <input
                  type="number"
                  min="18"
                  max="60"
                  value={partnerPrefs.ageRange[1]}
                  onChange={(e) => setPartnerPrefs({ ...partnerPrefs, ageRange: [partnerPrefs.ageRange[0], Number(e.target.value)] })}
                  className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Preferred Height Range</label>
              <input
                type="text"
                value={partnerPrefs.heightRange}
                onChange={(e) => setPartnerPrefs({ ...partnerPrefs, heightRange: e.target.value })}
                placeholder={'e.g. 5\' 2" to 5\' 8"'}
                className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Location & Relocation */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-soft space-y-4">
          <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>Location & Relocation</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-charcoal-700">Relocation Willingness</label>
            <select
              value={partnerPrefs.relocation}
              onChange={(e) => setPartnerPrefs({ ...partnerPrefs, relocation: e.target.value as any })}
              className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
            >
              <option value="Open to discussion">Open to discussion</option>
              <option value="Willing to relocate">Willing to relocate internationally / to other cities</option>
              <option value="Not willing to relocate">Prefer to stay in current city / region</option>
            </select>
          </div>
        </div>

        {/* Religious Commitment */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-soft space-y-4">
          <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Religious & Character Expectations</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-charcoal-700">Salah & Religious Observance Expectation</label>
            <input
              type="text"
              value={partnerPrefs.religiousCommitment}
              onChange={(e) => setPartnerPrefs({ ...partnerPrefs, religiousCommitment: e.target.value })}
              placeholder="e.g. Regular in 5 prayers, honest halal livelihood, modest attire"
              className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="gold" size="lg" leftIcon={<Save className="w-4 h-4" />}>
            Save Partner Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
