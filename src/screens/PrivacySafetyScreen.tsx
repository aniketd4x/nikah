import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Phone, 
  Users, 
  Ban, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const PrivacySafetyScreen: React.FC = () => {
  const { privacySettings, updatePrivacySettings, navigateTo, blockedProfileIds } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-24 md:pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('my-profile')}
          className="flex items-center gap-2 text-xs font-bold text-emerald-950 hover:text-emerald-700 bg-white px-4 py-2 rounded-2xl border border-cream-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <Badge variant="verified" size="md">
          Islamic Privacy Protected
        </Badge>
      </div>

      <div>
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
          Safety First
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1">
          Privacy & Safety Controls
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Your privacy and modesty are sacred. Configure your visibility, photo access, and guardian mode.
        </p>
      </div>

      {/* Main Privacy Toggles Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-soft space-y-6">
        {/* Photo Privacy */}
        <div className="space-y-3 pb-6 border-b border-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-950">Photo Visibility</h3>
              <p className="text-xs text-charcoal-500">Choose who can view your uploaded photos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { id: 'public', label: 'Visible to All Verified Members', desc: 'Photos visible in search and discovery' },
              { id: 'blur_all', label: 'Blur Photos by Default', desc: 'Photos blurred until you accept a connection' },
              { id: 'requests_only', label: 'Visible on Request Only', desc: 'Members must ask permission to view photos' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updatePrivacySettings({ photoVisibility: opt.id as any })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  privacySettings.photoVisibility === opt.id
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                    : 'border-cream-300 hover:bg-cream-50 text-charcoal-700'
                }`}
              >
                <span className="text-xs font-bold block mb-1">{opt.label}</span>
                <span className="text-[11px] text-charcoal-500 font-normal">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone Visibility */}
        <div className="space-y-3 pb-6 border-b border-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-950">Phone Number Privacy</h3>
              <p className="text-xs text-charcoal-500">Control when your contact number can be revealed.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              { id: 'accepted_only', label: 'Visible to Accepted Matches Only', desc: 'Recommended for serious discussions' },
              { id: 'hidden', label: 'Always Hidden (In-App Messaging Only)', desc: 'Keeps contact completely private' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updatePrivacySettings({ phoneVisibility: opt.id as any })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  privacySettings.phoneVisibility === opt.id
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                    : 'border-cream-300 hover:bg-cream-50 text-charcoal-700'
                }`}
              >
                <span className="text-xs font-bold block mb-1">{opt.label}</span>
                <span className="text-[11px] text-charcoal-500 font-normal">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggles (Online status, direct message, search index) */}
        <div className="space-y-4 pb-6 border-b border-cream-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Show Online Indicator</h4>
              <p className="text-[11px] text-charcoal-500">Display green active status when browsing Heavenly Nikah.</p>
            </div>
            <input
              type="checkbox"
              checked={privacySettings.showOnlineStatus}
              onChange={(e) => updatePrivacySettings({ showOnlineStatus: e.target.checked })}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Display Profile in Public Search</h4>
              <p className="text-[11px] text-charcoal-500">Allow other verified users to discover you via filters.</p>
            </div>
            <input
              type="checkbox"
              checked={privacySettings.showProfileInSearch}
              onChange={(e) => updatePrivacySettings({ showProfileInSearch: e.target.checked })}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-emerald-950">Wali / Guardian Supervision Mode</h4>
              <p className="text-[11px] text-charcoal-500">Automatically include guardian in all connection threads and requests.</p>
            </div>
            <input
              type="checkbox"
              checked={privacySettings.guardianSupervisionMode}
              onChange={(e) => updatePrivacySettings({ guardianSupervisionMode: e.target.checked })}
              className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
            />
          </div>
        </div>

        {/* Blocked Accounts List */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-600" />
            <h4 className="text-xs font-bold text-emerald-950">Blocked Members ({blockedProfileIds.length})</h4>
          </div>
          <p className="text-xs text-charcoal-500">
            {blockedProfileIds.length === 0
              ? 'You have not blocked any members.'
              : `${blockedProfileIds.length} profile(s) blocked from viewing or messaging you.`}
          </p>
        </div>
      </div>
    </div>
  );
};
