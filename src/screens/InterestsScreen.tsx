import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InterestCard } from '../components/cards/InterestCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart, Inbox, Send, CheckCircle2, XCircle } from 'lucide-react';

export const InterestsScreen: React.FC = () => {
  const { interests, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'accepted' | 'declined'>('received');

  const receivedRequests = interests.filter((i) => i.type === 'received' && i.status === 'pending');
  const sentRequests = interests.filter((i) => i.type === 'sent' && i.status === 'pending');
  const acceptedRequests = interests.filter((i) => i.status === 'accepted');
  const declinedRequests = interests.filter((i) => i.status === 'declined');

  const currentList = {
    received: receivedRequests,
    sent: sentRequests,
    accepted: acceptedRequests,
    declined: declinedRequests
  }[activeTab];

  const tabCounts = {
    received: receivedRequests.length,
    sent: sentRequests.length,
    accepted: acceptedRequests.length,
    declined: declinedRequests.length
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <Heart className="w-3 h-3 text-gold-600" />
          Connection Requests
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
          Interests & Requests
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
          Manage matrimonial invitations received and sent to verified members.
        </p>
      </div>

      {/* Modern Native App Segmented Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar bg-cream-200/70 p-1.5 rounded-2xl border border-cream-300/80 shadow-inner backdrop-blur-sm">
        {[
          { id: 'received', label: 'Received', icon: <Inbox className="w-3.5 h-3.5" />, count: tabCounts.received },
          { id: 'sent', label: 'Sent', icon: <Send className="w-3.5 h-3.5" />, count: tabCounts.sent },
          { id: 'accepted', label: 'Accepted Matches', icon: <CheckCircle2 className="w-3.5 h-3.5" />, count: tabCounts.accepted },
          { id: 'declined', label: 'Declined', icon: <XCircle className="w-3.5 h-3.5" />, count: tabCounts.declined }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold whitespace-nowrap rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-emerald-950 text-gold-300 shadow-sm ring-1 ring-gold-400/20'
                  : 'text-charcoal-600 hover:text-emerald-950 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-gold-500 text-emerald-950' : 'bg-cream-300 text-charcoal-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-emerald-800" />}
          title={`No ${activeTab} interests`}
          description={
            activeTab === 'received'
              ? 'You have responded to all pending interest requests. Discover new profiles to send connections!'
              : activeTab === 'sent'
              ? 'You haven\'t sent any pending interests. Browse verified matches and connect.'
              : activeTab === 'accepted'
              ? 'When both you and another member accept an interest, they will appear here as mutual matches.'
              : 'No declined requests.'
          }
          actionText="Discover Compatible Matches"
          onAction={() => navigateTo('discover')}
        />
      ) : (
        <div className="space-y-4">
          {currentList.map((interest) => (
            <InterestCard key={interest.id} interest={interest} />
          ))}
        </div>
      )}
    </div>
  );
};
