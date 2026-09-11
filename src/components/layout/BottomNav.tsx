import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  Heart, 
  MessageCircle, 
  User 
} from 'lucide-react';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    isLoggedIn, 
    unreadMessagesCount,
    currentUser
  } = useApp();

  if (!isLoggedIn) return null;

  const navItems = [
    { label: 'Home', screen: 'dashboard' as ScreenType, icon: Home },
    { label: 'Discover', screen: 'discover' as ScreenType, icon: Compass },
    { label: 'Matches', screen: 'matches' as ScreenType, icon: Heart },
    { 
      label: 'Messages', 
      screen: 'messages' as ScreenType, 
      icon: MessageCircle, 
      badge: unreadMessagesCount 
    },
    { label: 'Profile', screen: 'my-profile' as ScreenType, icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-cream-300 md:hidden shadow-[0_-8px_25px_rgba(12,78,43,0.08)] pb-[max(env(safe-area-inset-bottom),8px)]">
      <div className="flex items-center justify-around h-16 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.screen)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 active:scale-90 ${
                isActive
                  ? 'text-emerald-900 font-extrabold'
                  : 'text-charcoal-400 hover:text-emerald-800'
              }`}
              aria-label={item.label}
            >
              {/* Active Pill Indicator with subtle gold glow */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-emerald-800 to-gold-500 rounded-full shadow-sm animate-in fade-in zoom-in-75 duration-200" />
              )}

              <div className="relative p-1">
                {item.label === 'Profile' ? (
                  <div className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    isActive ? 'border-emerald-800 ring-2 ring-gold-400/40 shadow-sm scale-105' : 'border-cream-300'
                  }`}>
                    <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 text-emerald-900 shadow-inner' : ''}`}>
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.6px] scale-110 text-emerald-900' : 'stroke-[1.8px]'}`} />
                  </div>
                )}

                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] tracking-tight mt-0.5 transition-colors ${isActive ? 'text-emerald-950 font-bold' : 'text-charcoal-500 font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
