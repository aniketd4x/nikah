import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { SuccessStory } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sparkles, Star, MapPin, Heart, ArrowRight } from 'lucide-react';

export const SuccessStoriesScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      const data = await api.fetchStories();
      setStories(data);
    };
    load();
  }, []);

  const filteredStories = selectedCountry === 'all'
    ? stories
    : stories.filter((s) => s.country.toLowerCase().includes(selectedCountry.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-10 pb-28 md:pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          Al-hamdulillah
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
          Nikah Success Stories
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
          Read real stories of Muslim couples who met through Polygamy Matrimony and began their blessed journey.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-cream-200 shadow-sm">
                <img src={story.image} alt={story.names} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-emerald-950/85 text-gold-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30 shadow-sm">
                  Married {story.weddingDate}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-gold-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-2xl text-emerald-950">{story.names}</h3>
                <p className="text-xs text-charcoal-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>{story.city}, {story.country} • {story.duration}</span>
                </p>
              </div>

              <blockquote className="text-xs sm:text-sm font-serif italic text-emerald-900 bg-cream-50/70 p-3.5 rounded-2xl border border-cream-200">
                "{story.shortQuote}"
              </blockquote>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                {story.story}
              </p>
            </div>

            <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-xs text-emerald-900 font-semibold">
              <span>Verified Polygamy Matrimony Couple</span>
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-cream-50 rounded-[2rem] p-8 text-center space-y-4 max-w-3xl mx-auto border border-gold-500/30 shadow-card">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">Your Story Could Be Next, Insha'Allah</h3>
        <p className="text-xs sm:text-sm text-cream-200 max-w-md mx-auto leading-relaxed">
          Create your profile today and connect with thousands of verified practicing singles ready for Nikah.
        </p>
        <Button variant="gold" size="lg" onClick={() => navigateTo('register')}>
          Find Your Spouse Today
        </Button>
      </div>
    </div>
  );
};
