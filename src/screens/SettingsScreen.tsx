import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Settings, 
  Bell, 
  Lock, 
  Globe, 
  ShieldCheck, 
  LogOut, 
  Trash2, 
  ArrowLeft,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { navigateTo, logout, addToast } = useApp();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSave = () => {
    addToast('Settings Saved', 'Your account preferences have been saved.', 'success');
  };

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

        <Button variant="gold" size="md" onClick={handleSave}>
          Save Settings
        </Button>
      </div>

      <div>
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
          Account Center
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Manage notifications, security, language, and subscription configurations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-soft space-y-6">
        {/* Notifications Group */}
        <div className="space-y-4 pb-6 border-b border-cream-200">
          <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-800" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-cream-100">
              <div>
                <span className="text-xs font-bold text-charcoal-800 block">Email Notifications</span>
                <span className="text-[11px] text-charcoal-500">Receive weekly match digests and urgent interest alerts.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-cream-100">
              <div>
                <span className="text-xs font-bold text-charcoal-800 block">SMS / WhatsApp Verification Alerts</span>
                <span className="text-[11px] text-charcoal-500">Get instant SMS for mutual match connections.</span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4 h-4 text-emerald-800 focus:ring-emerald-700 accent-emerald-800"
              />
            </label>
          </div>
        </div>

        {/* Language & Regional */}
        <div className="space-y-4 pb-6 border-b border-cream-200">
          <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-800" />
            <span>Language & Localization</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-charcoal-700 block mb-1">Display Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50"
              >
                <option value="English">English</option>
                <option value="Arabic">العربية (Arabic)</option>
                <option value="Urdu">اردو (Urdu)</option>
                <option value="French">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Deactivation / Sign Out */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-base text-rose-950 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-700" />
            <span>Account Management</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
            <div>
              <h4 className="text-xs font-bold text-rose-950">Temporarily Hide / Deactivate Profile</h4>
              <p className="text-[11px] text-charcoal-600">Hide your profile when engaged or taking a break from matchmaking.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-rose-700 border-rose-300 hover:bg-rose-100 shrink-0"
              onClick={() => addToast('Profile Paused', 'Your profile is now hidden from discovery.', 'info')}
            >
              Pause Profile
            </Button>
          </div>

          <div className="pt-2">
            <Button
              variant="danger"
              size="md"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={logout}
            >
              Sign Out from Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
