import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { GuidanceArticle } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const IslamicGuidanceScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [articles, setArticles] = useState<GuidanceArticle[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('guide-istikhara');

  useEffect(() => {
    const load = async () => {
      const data = await api.fetchGuidance();
      setArticles(data);
      if (data.length > 0 && !selectedArticleId) {
        setSelectedArticleId(data[0].id);
      }
    };
    load();
  }, []);

  const activeArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-gold-600" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-emerald-800" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-800" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-800" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-gold-600" />
          Sacred Knowledge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
          Islamic Marriage Guidance
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
          Sunnah principles, Istikhara guidance, pre-marital questions, and family involvement.
        </p>
      </div>

      {/* Two Column Knowledge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Article Selector List */}
        <div className="lg:col-span-4 space-y-3">
          {articles.map((article) => {
            const isSelected = activeArticle && article.id === activeArticle.id;
            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`p-4 rounded-[1.75rem] border cursor-pointer transition-all active:scale-95 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-card ring-2 ring-gold-400/20'
                    : 'bg-white/95 text-charcoal-800 border-cream-300/80 hover:bg-cream-100/60 shadow-soft'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                    isSelected ? 'bg-emerald-900 border-gold-500/40 text-gold-400' : 'bg-cream-100 border-cream-200 text-emerald-800'
                  }`}
                >
                  {getIcon(article.iconName || 'BookOpen')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-gold-300' : 'text-emerald-800'
                      }`}
                    >
                      {article.category}
                    </span>
                    <span
                      className={`text-[10px] flex items-center gap-1 ${
                        isSelected ? 'text-cream-300' : 'text-charcoal-400'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Article View */}
        {activeArticle && (
          <div className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-10 border border-cream-300/80 shadow-card space-y-6">
            <div className="space-y-3 border-b border-cream-200 pb-6">
              <div className="flex items-center gap-2">
                <Badge variant="emerald" size="sm">{activeArticle.category}</Badge>
                <span className="text-xs text-charcoal-400">• {activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 leading-tight tracking-tight">
                {activeArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed italic bg-cream-50/70 p-3.5 rounded-2xl border border-cream-200">
                {activeArticle.summary}
              </p>
            </div>

            {/* Article Body Content */}
            <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {(Array.isArray(activeArticle.content) ? activeArticle.content : String(activeArticle.content || '').split('\n\n')).map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Islamic Takeaways Box */}
            <div className="bg-emerald-50/80 rounded-[1.75rem] p-6 border border-emerald-200/80 space-y-3 shadow-sm">
              <h4 className="font-serif font-bold text-sm text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Core Sunnah Takeaways</span>
              </h4>
              <div className="space-y-2">
                {(activeArticle.keyTakeaways || ['Seek Allah’s guidance through Istikhara prayer.', 'Prioritize piety, character, and honest communication.']).map((takeaway, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <span className="text-gold-600 font-bold">•</span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
