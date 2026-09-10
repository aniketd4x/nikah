import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Sparkles, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const { 
    isCelebrationModalOpen, 
    closeCelebrationModal, 
    celebrationPartner, 
    currentUser,
    startChatWithProfile
  } = useApp();

  if (!celebrationPartner) return null;

  return (
    <Modal
      isOpen={isCelebrationModalOpen}
      onClose={closeCelebrationModal}
      maxWidth="md"
    >
      <div className="text-center py-4 px-2">
        {/* Animated Halal Match Emblem */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-900 via-emerald-800 to-gold-500 flex items-center justify-center shadow-floating animate-pulse-slow">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="absolute -top-1 -right-1 bg-gold-400 text-emerald-950 p-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <span className="text-xs font-bold tracking-widest text-gold-600 uppercase bg-gold-50 px-3 py-1 rounded-full border border-gold-300">
          Al-hamdulillah! It's a Mutual Match
        </span>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-3 mb-2">
          You & {celebrationPartner.name}
        </h2>
        <p className="text-sm text-charcoal-600 max-w-sm mx-auto mb-6">
          Both of you expressed interest in each other. You can now engage in respectful, halal dialogue and involve your families.
        </p>

        {/* Dual Avatars with Connector */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
          <div className="text-center">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-emerald-700 shadow-md mx-auto">
              <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-semibold text-emerald-950 mt-2">You</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shadow-sm">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <span className="text-[10px] font-bold text-emerald-800 mt-1">96% Match</span>
          </div>

          <div className="text-center">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-emerald-700 shadow-md mx-auto">
              <img src={celebrationPartner.photo} alt={celebrationPartner.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-semibold text-emerald-950 mt-2">{celebrationPartner.name.split(' ')[0]}</p>
          </div>
        </div>

        {/* Islamic Etiquette Note */}
        <div className="bg-cream-100 rounded-2xl p-3.5 mb-6 text-left border border-cream-300">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Islamic Etiquette Reminder</span>
          </div>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Begin with Salam and maintain transparent, purposeful intentions toward marriage. Guardians can be looped in at any point.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="gold"
            size="lg"
            fullWidth
            leftIcon={<MessageCircle className="w-4 h-4" />}
            onClick={() => {
              closeCelebrationModal();
              startChatWithProfile(celebrationPartner.id);
            }}
          >
            Send First Message
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={closeCelebrationModal}
          >
            Keep Browsing
          </Button>
        </div>
      </div>
    </Modal>
  );
};
