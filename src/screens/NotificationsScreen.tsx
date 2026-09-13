import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationCard } from '../components/cards/NotificationCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Bell, CheckCheck, Sparkles, Heart, Eye, ShieldCheck } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markAllNotificationsRead, unreadNotificationsCount, navigateTo } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'interests' | 'matches' | 'views'>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'interests') return notif.type === 'interest';
    if (filter === 'matches') return notif.type === 'match';
    if (filter === 'views') return notif.type === 'view';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
            <Bell className="w-3.5 h-3.5 text-gold-600" />
            Activity Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
            Keep track of profile views, received interests, and verification updates.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<CheckCheck className="w-4 h-4" />}
            onClick={markAllNotificationsRead}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar bg-cream-200/70 p-1.5 rounded-2xl border border-cream-300/80 shadow-inner backdrop-blur-sm self-start">
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'unread', label: `Unread (${unreadNotificationsCount})` },
          { id: 'interests', label: 'Interests & Requests' },
          { id: 'matches', label: 'Mutual Matches' },
          { id: 'views', label: 'Profile Views' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              filter === item.id
                ? 'bg-emerald-950 text-gold-300 shadow-sm ring-1 ring-gold-400/20'
                : 'text-charcoal-600 hover:text-emerald-950 hover:bg-white/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-8 h-8 text-emerald-800" />}
          title="All Caught Up!"
          description="You don't have any new notifications in this category. Explore more profiles to generate activity."
          actionText="Discover Matches"
          onAction={() => navigateTo('discover')}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>
      )}
    </div>
  );
};
