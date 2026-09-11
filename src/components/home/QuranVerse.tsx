import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const QuranVerse: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-[2rem] p-6 sm:p-10 border border-gold-500/40 shadow-card overflow-hidden text-center space-y-5 select-none">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Quranic Callout */}
      <div className="inline-flex items-center gap-2 bg-emerald-900/90 text-gold-300 px-4 py-1.5 rounded-full border border-gold-500/40 text-xs font-bold shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        <span>Surah Ar-Rum • Verse 21</span>
      </div>

      {/* Large Arabic Calligraphy */}
      <div className="py-2">
        <p className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-gold-200 leading-loose tracking-wide dir-rtl" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>
      </div>

      {/* English Translation */}
      <p className="font-serif italic text-sm sm:text-base text-cream-200 max-w-2xl mx-auto leading-relaxed">
        "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
      </p>

      {/* Divider */}
      <div className="flex items-center justify-center gap-2 pt-1 text-gold-400">
        <span className="w-10 h-0.5 bg-gold-500/40" />
        <Heart className="w-4 h-4 fill-gold-400" />
        <span className="w-10 h-0.5 bg-gold-500/40" />
      </div>
    </section>
  );
};
