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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-cream-300 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb- safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.screen)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive
                  ? 'text-emerald-900 font-bold scale-105'
                  : 'text-charcoal-400 hover:text-emerald-800'
              }`}
              aria-label={item.label}
            >
              {/* Active Pill Indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-emerald-800 rounded-full animate-in fade-in" />
              )}

              <div className="relative p-1">
                {item.label === 'Profile' ? (
                  <div className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all ${
                    isActive ? 'border-emerald-800 shadow-sm' : 'border-cream-300'
                  }`}>
                    <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px] scale-110 text-emerald-900' : 'stroke-[1.8px]'}`} />
                )}

                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute top-0 right-0 bg-gold-500 text-emerald-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'text-emerald-900 font-bold' : 'text-charcoal-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
