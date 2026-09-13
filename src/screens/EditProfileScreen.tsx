import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Save, 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Users, 
  Heart, 
  Camera, 
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const EditProfileScreen: React.FC = () => {
  const { currentUser, updateCurrentUser, navigateTo, addToast } = useApp();

  const [form, setForm] = useState({ ...currentUser });
  const [openSection, setOpenSection] = useState<string>('basic');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser(form);
    navigateTo('my-profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Top Header */}
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
          Save All Changes
        </Button>
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <User className="w-3 h-3 text-gold-600" />
          Profile Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
          Edit Profile Details
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
          Keep your information up to date to find compatible suitors.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* SECTION 1: Basic Information */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('basic')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-emerald-800" />
              <span>1. Basic Personal Information</span>
            </div>
            {openSection === 'basic' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'basic' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Age</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Marital Status</label>
                  <select
                    value={form.maritalStatus}
                    onChange={(e) => setForm({ ...form, maritalStatus: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: About Me */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('about')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <span>2. About Myself & Values</span>
            </div>
            {openSection === 'about' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'about' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Bio / Personal Description
                </label>
                <textarea
                  rows={5}
                  value={form.aboutMe}
                  onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
                  className="w-full p-3.5 text-xs leading-relaxed rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Education & Career */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('career')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-emerald-800" />
              <span>3. Education & Career</span>
            </div>
            {openSection === 'career' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'career' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Degree / Qualification</label>
                  <input
                    type="text"
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Profession</label>
                  <input
                    type="text"
                    value={form.profession}
                    onChange={(e) => setForm({ ...form, profession: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: Religion & Islamic Practice */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('religion')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <span>4. Religious Practice</span>
            </div>
            {openSection === 'religion' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'religion' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Sect</label>
                  <input
                    type="text"
                    value={form.religion.sect}
                    onChange={(e) => setForm({ ...form, religion: { ...form.religion, sect: e.target.value } })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Prayer Frequency</label>
                  <select
                    value={form.religion.prayerFrequency}
                    onChange={(e) => setForm({ ...form, religion: { ...form.religion, prayerFrequency: e.target.value as any } })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Always (5 times daily)">Always (5 times daily)</option>
                    <option value="Usually">Usually</option>
                    <option value="Sometimes">Sometimes</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Family & Lifestyle */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('family')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-800" />
              <span>5. Family & Lifestyle</span>
            </div>
            {openSection === 'family' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'family' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Family Type</label>
                  <select
                    value={form.familyType}
                    onChange={(e) => setForm({ ...form, familyType: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Nuclear">Nuclear</option>
                    <option value="Joint">Joint</option>
                    <option value="Extended">Extended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Family Values</label>
                  <select
                    value={form.familyValues}
                    onChange={(e) => setForm({ ...form, familyValues: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Moderate">Moderate</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Liberal">Liberal</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: Partner Preferences */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('preferences')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-600" />
              <span>6. Partner Preferences</span>
            </div>
            {openSection === 'preferences' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'preferences' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">What are you looking for?</label>
                <textarea
                  rows={3}
                  value={form.lookingForSummary}
                  onChange={(e) => setForm({ ...form, lookingForSummary: e.target.value })}
                  className="w-full p-3.5 text-xs leading-relaxed rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Bar */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
