import React from 'react';
import { NotificationItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, ShieldCheck, Sparkles, MessageCircle, Info } from 'lucide-react';

interface NotificationCardProps {
  notification: NotificationItem;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { markNotificationRead, navigateTo } = useApp();

  const getIcon = () => {
    switch (notification.type) {
      case 'interest':
        return <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />;
      case 'match':
        return <Sparkles className="w-4 h-4 text-gold-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-emerald-700" />;
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-emerald-800" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-emerald-700" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleClick = () => {
    markNotificationRead(notification.id);
    if (notification.profileId) {
      navigateTo('profile-details', notification.profileId);
    } else if (notification.type === 'verification') {
      navigateTo('verification');
    } else if (notification.type === 'interest') {
      navigateTo('interests');
    } else if (notification.type === 'match') {
      navigateTo('matches');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
        notification.read
          ? 'bg-white border-cream-300 opacity-80 hover:opacity-100'
          : 'bg-emerald-50/40 border-emerald-300/80 shadow-soft'
      }`}
    >
      {/* Avatar or Icon */}
      {notification.avatar ? (
        <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-cream-300">
          <img src={notification.avatar} alt="Notification" className="w-full h-full object-cover" />
          <span className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
            {getIcon()}
          </span>
        </div>
      ) : (
        <div className="w-12 h-12 rounded-2xl bg-cream-200 flex items-center justify-center shrink-0 border border-cream-300">
          {getIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <h4 className="text-xs font-bold text-emerald-950 truncate">{notification.title}</h4>
          <span className="text-[10px] text-charcoal-400 shrink-0">{notification.timestamp}</span>
        </div>
        <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2">{notification.body}</p>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 mt-2" />
      )}
    </div>
  );
};
