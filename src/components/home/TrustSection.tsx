import React, { useState } from 'react';
import { ShieldCheck, EyeOff, Users, Award, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { BottomSheet } from '../common/BottomSheet';
import { triggerHaptic } from '../../styles/designTokens';

interface Pillar {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.FC<{ className?: string }>;
  fullTitle: string;
  fullDesc: string[];
  badgeText: string;
}

export const TrustSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);

  const pillars: Pillar[] = [
    {
      id: 'id-verified',
      title: '100% ID & Selfie Verified',
      shortDesc: 'Every member undergoes live photo verification and identity review.',
      icon: ShieldCheck,
      fullTitle: 'Authentic & Verified Identity',
      fullDesc: [
        'Our dedicated trust and safety team validates official government IDs alongside live selfie checks.',
        'Zero tolerance for fake profiles, bots, commercial spam, or impersonation.',
        'Verified profiles display the official Polygamy Matrimony Shield Badge with priority matching.'
      ],
      badgeText: 'Verified Member Security'
    },
    {
      id: 'photo-privacy',
      title: 'Photo Privacy & Blur Controls',
      shortDesc: 'Keep your photos blurred to the public and reveal only upon mutual interest.',
      icon: EyeOff,
      fullTitle: 'Modesty & High Privacy First',
      fullDesc: [
        'You have full autonomy over your portrait visibility. Blur your images automatically for casual browsers.',
        'Grant photo access exclusively to members who pass your initial compatibility criteria.',
        'Watermarked media protection prevents unauthorized screenshots or sharing.'
      ],
      badgeText: 'Halal Modesty Guarantee'
    },
    {
      id: 'wali-friendly',
      title: 'Wali & Family Involvement',
      shortDesc: 'Invite your guardian or Wali to supervise conversations and verify proposals.',
      icon: Users,
      fullTitle: 'Guardian (Wali) Oversight Mode',
      fullDesc: [
        'Seamlessly link your Wali or parents directly to your conversations and inquiries.',
        'Respectful Islamic etiquette guidelines maintained across all chat threads.',
        'Direct family-to-family meetings and bio-data document exchange facilitated with dignity.'
      ],
      badgeText: 'Sunnah-Aligned Practice'
    },
    {
      id: 'halal-standards',
      title: 'Halal Principles & Strict Fiqh',
      shortDesc: 'Dedicated Islamic matrimonial structure for honorable polygynous marriages.',
      icon: Award,
      fullTitle: 'Spiritual Justice & Transparency',
      fullDesc: [
        'Clear declarations on separate accommodation, financial maintenance, and family knowledge.',
        'Pre-marital discussion checklists verified by Islamic scholars.',
        'Transparent matrimonial expectations ensuring equity, kindness, and adherence to Islamic law.'
      ],
      badgeText: 'Equitable Matrimonial Standard'
    }
  ];

  return (
    <section className="space-y-6 select-none">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300">
          Trust & Safety
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
          Built on Sacred Trust & Dignity
        </h2>
        <p className="text-xs text-charcoal-600">
          Every feature is engineered to protect your privacy, honor your values, and involve family.
        </p>
      </div>

      {/* Swipeable Chips on Mobile / 2x2 Grid on Desktop */}
      <div className="flex md:grid md:grid-cols-2 gap-3.5 overflow-x-auto no-scrollbar pb-2 md:pb-0 px-1">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={() => {
                triggerHaptic(10);
                setActivePillar(pillar);
              }}
              className="min-w-[260px] sm:min-w-0 flex-1 bg-white hover:bg-emerald-50/60 p-4 sm:p-5 rounded-3xl border border-cream-300 shadow-soft hover:shadow-card hover:border-emerald-800/40 transition-all cursor-pointer flex items-start gap-3.5 active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-gold-300 flex items-center justify-center shrink-0 border border-emerald-300/60 transition-colors shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-emerald-950 truncate group-hover:text-emerald-900">
                    {pillar.title}
                  </h3>
                  <span className="text-[10px] text-gold-700 font-bold bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200 shrink-0">
                    Tap to view
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2">
                  {pillar.shortDesc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-Up Bottom Sheet for Selected Pillar */}
      <BottomSheet
        isOpen={Boolean(activePillar)}
        onClose={() => setActivePillar(null)}
        title={activePillar?.fullTitle}
        subtitle={activePillar?.badgeText}
      >
        {activePillar && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-3 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 text-gold-300 flex items-center justify-center shrink-0">
                <activePillar.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">{activePillar.title}</h4>
                <span className="text-[10px] text-emerald-800 font-semibold">✓ Verified by Polygamy Matrimony Council</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {activePillar.fullDesc.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => setActivePillar(null)}
                className="w-full py-2.5 rounded-full bg-emerald-900 text-gold-300 text-xs font-bold shadow-md active:scale-95 transition-transform"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </section>
  );
};
