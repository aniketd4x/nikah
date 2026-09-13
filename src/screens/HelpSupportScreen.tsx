import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Sparkles,
  Send,
  Users
} from 'lucide-react';

export const HelpSupportScreen: React.FC = () => {
  const { addToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: 'How does Polygamy Matrimony ensure Shariah compliance and modesty?',
      a: 'Polygamy Matrimony adheres to Islamic principles by prioritizing serious Nikah intentions over casual dating. We support photo blurring/request mode, chaperoned/Wali communication modes, biometric selfie verification, and proactive moderation against inappropriate dialogue.'
    },
    {
      q: 'How does the Wali (Guardian) involvement feature work?',
      a: 'Sisters and families can add their Wali’s email and mobile number to their profile. When enabled, your Wali can receive copy notifications of connection requests and participate in introductory communications.'
    },
    {
      q: 'Can I keep my profile photos private or blurred?',
      a: 'Yes! In Privacy & Safety settings, you can choose between "Public", "Blurred by default" (revealed only upon your approval), or "Visible on request only".'
    },
    {
      q: 'How are profiles verified on the platform?',
      a: 'We implement a 4-tier verification protocol: 1. Phone number SMS OTP, 2. Email confirmation, 3. Live selfie camera pose matching, and 4. Manual human review of profile text and credentials.'
    },
    {
      q: 'What should I do if a member behaves disrespectfully?',
      a: 'You can immediately click "Report Profile" or "Block Member" on any profile card or message thread. Our trust team investigates all reports within 24 hours and bans non-compliant accounts permanently.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject && ticketMessage) {
      addToast('Ticket Submitted', 'Thank you. Our Matrimonial Support Concierge will reply within 4 hours.', 'success');
      setTicketSubject('');
      setTicketMessage('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
          We Are Here For You
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
          Help & Matrimonial Support
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
          Get answers to common questions regarding verification, Wali features, and account safety.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* FAQS (Left Column) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif font-bold text-xl text-emerald-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-800" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white/95 backdrop-blur-md rounded-2xl border border-cream-300/80 shadow-soft overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-950 hover:bg-cream-50/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" /> : <ChevronDown className="w-4 h-4 text-charcoal-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-charcoal-600 leading-relaxed border-t border-cream-200 bg-cream-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTACT SUPPORT (Right Column) */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50/90 px-2.5 py-0.5 rounded-full border border-gold-200">
              Direct Assistance
            </span>
            <h3 className="font-serif font-bold text-xl text-emerald-950 mt-1.5">
              Contact Concierge Team
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Have a question about profile verification or need guidance with matching?
            </p>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-700">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Verification Assistance or Wali Mode"
                required
                className="w-full p-3 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal-700">Your Message</label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your inquiry..."
                required
                className="w-full p-3.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white leading-relaxed focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send Support Message
            </Button>
          </form>

          <div className="pt-4 border-t border-cream-200 text-center space-y-1 text-xs text-charcoal-600">
            <p className="font-semibold text-emerald-950">Email Support</p>
            <p className="text-charcoal-500">support@polygamymatrimony.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
