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
    unreadNotificationsCount,
    currentUser
  } = useApp();

  if (!isLoggedIn) return null;

  const navItems = [
    { label: 'Home', screen: 'dashboard' as ScreenType, icon: Home },
    { label: 'Discover', screen: 'discover' as ScreenType, icon: Compass },
    { label: 'Matches', screen: 'matches' as ScreenType, icon: Heart },
    { 
      label: 'Chat', 
      screen: 'messages' as ScreenType, 
      icon: MessageCircle, 
      badge: unreadMessagesCount 
    },
    { label: 'Profile', screen: 'my-profile' as ScreenType, icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-cream-300 md:hidden shadow-[0_-6px_20px_rgba(0,0,0,0.06)] pb-[max(env(safe-area-inset-bottom),6px)] select-none">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.screen)}
              className="relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 active:scale-90 group focus:outline-none"
              aria-label={item.label}
            >
              {/* Active Pill Indicator */}
              <div className={`relative px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive 
                  ? 'bg-emerald-900 text-gold-300 shadow-sm' 
                  : 'bg-transparent text-charcoal-500 hover:text-emerald-900'
              }`}>
                {item.label === 'Profile' ? (
                  <div className={`w-5 h-5 rounded-full overflow-hidden border transition-all ${
                    isActive ? 'border-gold-400 ring-2 ring-gold-400/40' : 'border-charcoal-400'
                  }`}>
                    <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5px] scale-105 text-gold-300' : 'stroke-[1.8px]'
                  }`} />
                )}

                {/* Badge notification dot/count */}
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-emerald-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[11px] tracking-tight mt-0.5 transition-all ${
                isActive ? 'text-emerald-950 font-extrabold scale-100' : 'text-charcoal-600 font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
