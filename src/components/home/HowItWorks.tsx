import React, { useState } from 'react';
import { UserCheck, SlidersHorizontal, MessageSquareHeart, Users2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Complete your bio, Islamic practice, education, and photo privacy settings in minutes.',
      icon: UserCheck
    },
    {
      step: '02',
      title: 'Set Deen & Values Criteria',
      desc: 'Filter by prayer habits, household accommodation, education, and marital expectations.',
      icon: SlidersHorizontal
    },
    {
      step: '03',
      title: 'Respectful Discovery',
      desc: 'Send interest requests, review mutual compatibility, and receive notifications.',
      icon: MessageSquareHeart
    },
    {
      step: '04',
      title: 'Wali Involvement & Nikah',
      desc: 'Involve parents/guardians, exchange bio-data documents, and complete your blessed union.',
      icon: Users2
    }
  ];

  return (
    <section className="space-y-6 select-none">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300">
          Simple & Halal
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
          How Polygamy Matrimony Works
        </h2>
        <p className="text-xs text-charcoal-600">
          A four-step halal roadmap to discovering your compatible life partner.
        </p>
      </div>

      {/* Desktop 4-Column Timeline with Connected Line */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 relative">
        <div className="absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-gold-400/60 -z-0" />

        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-cream-300 shadow-soft hover:shadow-card transition-all flex flex-col items-center text-center space-y-3 z-10"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-950 to-emerald-800 text-gold-300 font-serif font-bold text-lg flex items-center justify-center border-2 border-gold-400 shadow-md">
                {item.step}
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-emerald-950">{item.title}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile Horizontal Snap Carousel with Dot Indicators */}
      <div className="md:hidden space-y-3">
        <div 
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 pb-1"
          onScroll={(e) => {
            const el = e.currentTarget;
            const stepWidth = el.scrollWidth / steps.length;
            const index = Math.round(el.scrollLeft / stepWidth);
            setActiveStep(Math.min(Math.max(index, 0), steps.length - 1));
          }}
        >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="min-w-[85%] snap-center bg-white rounded-3xl p-5 border border-cream-300 shadow-soft flex flex-col items-center text-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-gold-300 font-serif font-bold text-base flex items-center justify-center border border-gold-400">
                  {item.step}
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-sm text-emerald-950">{item.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 4-Dot Pagination */}
        <div className="flex justify-center items-center gap-1.5 pt-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeStep === i ? 'w-6 bg-emerald-800' : 'w-1.5 bg-cream-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
