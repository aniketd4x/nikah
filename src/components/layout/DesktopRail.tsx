import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  Heart, 
  MessageCircle, 
  User, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  SlidersHorizontal,
  Bell,
  Crown,
  LogOut,
  Settings
} from 'lucide-react';
import { ScreenType } from '../../types';
import { Logo } from '../common/Logo';
import { triggerHaptic } from '../../styles/designTokens';

export const DesktopRail: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    isLoggedIn, 
    unreadMessagesCount,
    unreadNotificationsCount,
    currentUser,
    currentPlan,
    setIsUpgradeModalOpen,
    setIsVerificationModalOpen,
    logout
  } = useApp();

  if (!isLoggedIn) return null;

  const primaryTabs: { label: string; screen: ScreenType; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { label: 'Home', screen: 'dashboard', icon: Home },
    { label: 'Discover', screen: 'discover', icon: Compass },
    { label: 'Matches', screen: 'matches', icon: Heart },
    { label: 'Chats', screen: 'messages', icon: MessageCircle, badge: unreadMessagesCount },
    { label: 'Profile', screen: 'my-profile', icon: User },
  ];

  const secondaryTabs: { label: string; screen: ScreenType; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Guidance', screen: 'islamic-guidance', icon: BookOpen },
    { label: 'Search', screen: 'search', icon: SlidersHorizontal },
    { label: 'Stories', screen: 'success-stories', icon: Sparkles },
    { label: 'Settings', screen: 'settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-white border-r border-cream-300 h-screen sticky top-0 p-4 select-none z-40 shadow-soft">
      {/* Top: Brand Logo */}
      <div className="space-y-6">
        <div 
          onClick={() => navigateTo('dashboard')} 
          className="cursor-pointer px-3 pt-2"
        >
          <Logo size="md" variant="emerald" />
        </div>

        {/* Primary App Navigation Tabs */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-charcoal-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.screen;

            return (
              <button
                key={tab.label}
                onClick={() => {
                  triggerHaptic(10);
                  navigateTo(tab.screen);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-gold-300 shadow-card'
                    : 'text-charcoal-700 hover:bg-cream-100 hover:text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-gold-400 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span>{tab.label}</span>
                </div>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="bg-gold-500 text-emerald-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <nav className="space-y-1 pt-3 border-t border-cream-200">
          <p className="px-3 text-[10px] font-bold text-charcoal-400 uppercase tracking-wider mb-2">
            Explore & Deen
          </p>
          {secondaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.screen;

            return (
              <button
                key={tab.label}
                onClick={() => {
                  triggerHaptic(10);
                  navigateTo(tab.screen);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-950 font-bold'
                    : 'text-charcoal-600 hover:bg-cream-100 hover:text-emerald-950'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-800" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & VIP Card */}
      <div className="space-y-3 pt-4 border-t border-cream-200">
        {/* VIP Upgrade Pill */}
        <div 
          onClick={() => setIsUpgradeModalOpen(true)}
          className="bg-gradient-to-br from-gold-50 to-cream-100 p-3 rounded-2xl border border-gold-400/50 cursor-pointer hover:shadow-sm transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-700">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-950">{currentPlan} Member</p>
              <p className="text-[10px] text-charcoal-500">Tap to upgrade VIP</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-gold-800 bg-gold-300/80 px-2 py-0.5 rounded-full">
            VIP
          </span>
        </div>

        {/* User Mini Profile */}
        <div 
          onClick={() => navigateTo('my-profile')}
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-cream-100 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-800 shrink-0">
              <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-emerald-950 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-charcoal-500 truncate">{currentUser.city}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              logout();
            }}
            className="p-1.5 text-charcoal-400 hover:text-rose-600 rounded-xl hover:bg-rose-50"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
