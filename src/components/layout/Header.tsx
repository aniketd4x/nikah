import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  Bell, 
  MessageCircle, 
  Heart, 
  Search, 
  Sparkles, 
  User, 
  LogOut, 
  ShieldCheck, 
  Crown, 
  Settings, 
  BookOpen, 
  Menu, 
  X,
  Compass,
  CheckCircle2,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    isLoggedIn,
    currentUser,
    logout,
    unreadNotificationsCount,
    unreadMessagesCount,
    setIsUpgradeModalOpen,
    setIsVerificationModalOpen,
    profileCompletionPercentage,
    currentPlan,
    setIsMobileFilterOpen
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSubScreen = [
    'profile-details', 
    'search-results', 
    'edit-profile', 
    'verification', 
    'preferences', 
    'privacy-safety', 
    'subscription', 
    'islamic-guidance', 
    'help-support', 
    'settings'
  ].includes(currentScreen);

  const getSubScreenTitle = () => {
    switch (currentScreen) {
      case 'profile-details': return 'Profile Details';
      case 'search-results': return 'Matched Profiles';
      case 'edit-profile': return 'Edit Profile';
      case 'verification': return 'Verification';
      case 'preferences': return 'Partner Preferences';
      case 'privacy-safety': return 'Privacy & Safety';
      case 'subscription': return 'Membership Plans';
      case 'islamic-guidance': return 'Islamic Guidance';
      case 'help-support': return 'Help & Support';
      case 'settings': return 'Account Settings';
      default: return 'Polygamy Matrimony';
    }
  };

  const navLinks = [
    { label: 'Discover', screen: 'discover' as const, icon: <Compass className="w-4 h-4" /> },
    { label: 'Matches', screen: 'matches' as const, icon: <Heart className="w-4 h-4" /> },
    { label: 'Search', screen: 'search' as const, icon: <Search className="w-4 h-4" /> },
    { label: 'Messages', screen: 'messages' as const, icon: <MessageCircle className="w-4 h-4" />, badge: unreadMessagesCount },
    { label: 'Guidance', screen: 'islamic-guidance' as const, icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-sm transition-all select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-3">
        {/* Left: Back Button on Sub-screens OR Brand Logo */}
        <div className="flex items-center gap-2">
          {isLoggedIn && isSubScreen ? (
            <button
              onClick={() => navigateTo('dashboard')}
              className="flex items-center gap-1.5 p-2 -ml-1.5 rounded-full text-emerald-950 hover:bg-cream-200 active:scale-90 transition-all font-semibold text-xs"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="hidden sm:inline font-bold">{getSubScreenTitle()}</span>
            </button>
          ) : (
            <div onClick={() => navigateTo(isLoggedIn ? 'dashboard' : 'landing')} className="cursor-pointer">
              <Logo size="md" variant="emerald" />
            </div>
          )}
        </div>

        {/* Desktop Nav Links (App Bar navigation) */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.screen;
              return (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.screen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-emerald-900 text-gold-300 shadow-sm'
                      : 'text-charcoal-700 hover:text-emerald-950 hover:bg-cream-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {Boolean(link.badge && link.badge > 0) && (
                    <span className="bg-gold-500 text-emerald-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {isLoggedIn ? (
            <>
              {/* Upgrade VIP Badge */}
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-50 to-gold-100 text-gold-900 border border-gold-400/60 text-xs font-bold shadow-sm hover:scale-105 transition-transform"
              >
                <Crown className="w-3.5 h-3.5 text-gold-600" />
                <span>{currentPlan}</span>
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => navigateTo('notifications')}
                className={`relative p-2.5 rounded-2xl border transition-all ${
                  currentScreen === 'notifications'
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-cream-100 text-charcoal-700 hover:text-emerald-900 hover:bg-cream-200 border-cream-300'
                }`}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-emerald-950 font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar & Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl hover:bg-cream-100 border border-transparent hover:border-cream-300 transition-all"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-700 shadow-sm">
                    <img
                      src={currentUser.photo}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden md:flex flex-col text-left leading-none">
                    <span className="text-xs font-bold text-emerald-950">{currentUser.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-charcoal-500">{profileCompletionPercentage}% complete</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-floating border border-cream-300/80 py-2 z-50 animate-in fade-in zoom-in-95">
                    {/* User Summary */}
                    <div className="px-4 py-3 border-b border-cream-200">
                      <p className="text-xs font-bold text-emerald-950">{currentUser.name}</p>
                      <p className="text-[11px] text-charcoal-500">{currentUser.profession} • {currentUser.city}</p>
                      <div className="mt-2.5">
                        <div className="flex justify-between text-[10px] font-semibold mb-1">
                          <span className="text-charcoal-600">Profile Strength</span>
                          <span className="text-emerald-800">{profileCompletionPercentage}%</span>
                        </div>
                        <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-700 rounded-full"
                            style={{ width: `${profileCompletionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('my-profile');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <User className="w-4 h-4 text-emerald-800" />
                        <span>My Profile Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('edit-profile');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                        <span>Edit Profile & Photos</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsVerificationModalOpen(true);
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Trust & Verification</span>
                        </div>
                        <Badge variant="verified" size="sm">Active</Badge>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('preferences');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <Heart className="w-4 h-4 text-emerald-800" />
                        <span>Partner Preferences</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('privacy-safety');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-800" />
                        <span>Privacy & Safety</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('settings');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <Settings className="w-4 h-4 text-emerald-800" />
                        <span>Account Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateTo('subscription');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-medium text-charcoal-700 hover:bg-cream-100 flex items-center gap-2.5"
                      >
                        <Crown className="w-4 h-4 text-gold-600" />
                        <span>Subscription Plans</span>
                      </button>
                    </div>

                    <div className="border-t border-cream-200 pt-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Landing state auth buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateTo('login')}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigateTo('register')}
              >
                Create Free Profile
              </Button>
            </>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 rounded-2xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 border border-cream-300"
            aria-label="Toggle navigation"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown Sheet */}
      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {isLoggedIn ? (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      navigateTo(link.screen);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold text-left border ${
                      currentScreen === link.screen
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'bg-cream-50 text-charcoal-700 border-cream-300'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-cream-200 space-y-1.5">
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    navigateTo('my-profile');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-charcoal-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-emerald-800" />
                  <span>My Profile & Completion</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsUpgradeModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-gold-700 flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 text-gold-600" />
                  <span>Upgrade Membership ({currentPlan})</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Button variant="primary" fullWidth onClick={() => { setIsMobileNavOpen(false); navigateTo('register'); }}>
                Create Free Profile
              </Button>
              <Button variant="secondary" fullWidth onClick={() => { setIsMobileNavOpen(false); navigateTo('login'); }}>
                Log In to Account
              </Button>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => { setIsMobileNavOpen(false); navigateTo('islamic-guidance'); }}
                  className="p-2.5 rounded-xl bg-cream-100 text-xs font-medium text-center text-charcoal-700"
                >
                  Islamic Guidance
                </button>
                <button
                  onClick={() => { setIsMobileNavOpen(false); navigateTo('success-stories'); }}
                  className="p-2.5 rounded-xl bg-cream-100 text-xs font-medium text-center text-charcoal-700"
                >
                  Success Stories
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
