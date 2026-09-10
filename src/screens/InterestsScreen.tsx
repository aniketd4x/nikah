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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
          Connection Requests
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1">
          Interests & Requests
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Manage matrimonial invitations received and sent to verified members.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-cream-300">
        {[
          { id: 'received', label: 'Received', icon: <Inbox className="w-4 h-4" />, count: tabCounts.received },
          { id: 'sent', label: 'Sent', icon: <Send className="w-4 h-4" />, count: tabCounts.sent },
          { id: 'accepted', label: 'Accepted Matches', icon: <CheckCircle2 className="w-4 h-4" />, count: tabCounts.accepted },
          { id: 'declined', label: 'Declined', icon: <XCircle className="w-4 h-4" />, count: tabCounts.declined }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-emerald-900 text-emerald-950 bg-white rounded-t-2xl shadow-sm'
                  : 'border-transparent text-charcoal-500 hover:text-emerald-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-emerald-900 text-white' : 'bg-cream-200 text-charcoal-700'
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
