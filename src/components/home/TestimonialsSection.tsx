import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { SuccessStory } from '../../types';
import { CheckCircle2, Heart, Sparkles, MapPin, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await api.fetchStories();
      setStories(data);
    };
    load();
  }, []);

  return (
    <section className="space-y-6 select-none">
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300">
          Blessed Unions
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
          Polygamy Matrimony Success Stories
        </h2>
        <p className="text-xs text-charcoal-600">
          Real families united through shared Deen, transparency, and mutual respect.
        </p>
      </div>

      {/* Grid on Desktop, Horizontal Scroll on Mobile */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 px-1">
        {stories.slice(0, 3).map((story) => (
          <div
            key={story.id}
            className="min-w-[280px] sm:min-w-0 flex-1 bg-white rounded-3xl p-5 border border-cream-300 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Photo & Verified Check */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-cream-200">
                <img src={story.image} alt={story.names} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                
                {/* Verified Marriage Badge */}
                <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-md text-gold-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-gold-400/40 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-gold-400" />
                  <span>Verified Marriage</span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h4 className="font-serif font-bold text-base">{story.names}</h4>
                  <p className="text-[11px] text-cream-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span>{story.city}, {story.country}</span>
                  </p>
                </div>
              </div>

              {/* Time to Nikah Chip & Structure Badge */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bg-gold-50 text-gold-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold-200">
                  {story.duration}
                </span>
                {story.badge && (
                  <span className="bg-emerald-50 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {story.badge}
                  </span>
                )}
              </div>

              {/* Quote */}
              <p className="text-xs text-charcoal-700 italic leading-relaxed line-clamp-3">
                "{story.shortQuote}"
              </p>
            </div>

            <div className="pt-2 border-t border-cream-200 text-[10px] text-charcoal-500 font-semibold flex items-center justify-between">
              <span>Nikah Date: {story.weddingDate}</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
