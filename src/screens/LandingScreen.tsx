import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProfileCard } from '../components/cards/ProfileCard';
import { SUCCESS_STORIES, ISLAMIC_GUIDANCE_ARTICLES } from '../data/mockData';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Lock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Compass, 
  MessageCircle,
  HelpCircle,
  EyeOff
} from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { navigateTo, profiles, isLoggedIn } = useApp();
  const featuredProfiles = profiles.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-tr from-emerald-200/40 via-gold-200/30 to-cream-100 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 px-4 py-1.5 rounded-full border border-emerald-200/80 text-xs font-bold shadow-sm animate-in fade-in duration-500">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>The Premier Halal Matrimonial Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-emerald-950 tracking-tight leading-[1.15]">
                Find Someone Worth <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Building a Life With.</span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A trusted Muslim matrimonial platform designed to help you find a compatible partner for Nikah with privacy, family blessing, and spiritual alignment.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigateTo(isLoggedIn ? 'discover' : 'register')}
                >
                  Find Your Match
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigateTo('register')}
                >
                  Create Free Profile
                </Button>
              </div>

              {/* Trust bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 text-xs text-charcoal-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% ID Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4 text-emerald-700" />
                  <span>Photo Privacy Controls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Family & Wali Friendly</span>
                </div>
              </div>
            </div>

            {/* Right Visual with Floating Profile Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-floating border-4 border-white bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                  alt="Muslim Matrimony Couple"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/10" />

                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <span className="text-xs font-serif italic text-gold-200">"And He placed between you affection and mercy"</span>
                  <p className="text-sm font-bold mt-1">Heavenly Nikah Connections</p>
                </div>
              </div>

              {/* Floating Profile Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-floating border border-cream-300 max-w-[200px] animate-in slide-in-from-left duration-700 hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-700">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Sarah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-emerald-950 truncate">Sarah, 27</h4>
                    <p className="text-[10px] text-charcoal-500">Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-200 text-[10px]">
                  <Badge variant="verified" size="sm">Verified</Badge>
                  <span className="font-bold text-emerald-900">94% Match</span>
                </div>
              </div>

              {/* Floating Profile Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-floating border border-cream-300 max-w-[210px] animate-in slide-in-from-right duration-700 hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-700">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      alt="Zayd"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-emerald-950 truncate">Dr. Zayd, 29</h4>
                    <p className="text-[10px] text-charcoal-500">London, UK</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-200 text-[10px]">
                  <span className="text-charcoal-600 font-medium">Cardiologist</span>
                  <span className="font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">92% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-emerald-950 text-cream-50 py-12 border-y border-gold-500/20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 font-serif">50K+</p>
              <p className="text-xs sm:text-sm text-cream-200">Active Profiles</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 font-serif">12K+</p>
              <p className="text-xs sm:text-sm text-cream-200">Successful Connections</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 font-serif">25+</p>
              <p className="text-xs sm:text-sm text-cream-200">Countries Worldwide</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 font-serif">95%</p>
              <p className="text-xs sm:text-sm text-cream-200">Verified Profiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="gold" size="md">Simple & Respectful Journey</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 mt-3">
            How Heavenly Nikah Works
          </h2>
          <p className="text-sm text-charcoal-600 mt-2">
            A purposeful, 4-step path guided by Islamic etiquette and modern compatibility matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Create Your Profile',
              desc: 'Share your background, values, prayer routines, and what matters most in your future spouse.',
              icon: <Sparkles className="w-5 h-5 text-gold-600" />
            },
            {
              num: '02',
              title: 'Discover Matches',
              desc: 'Browse verified profiles filtered by sect, education, lifestyle, and location compatibility.',
              icon: <Compass className="w-5 h-5 text-gold-600" />
            },
            {
              num: '03',
              title: 'Connect Respectfully',
              desc: 'Express interest and exchange dignified messages with mutual approval and optional Wali mode.',
              icon: <MessageCircle className="w-5 h-5 text-gold-600" />
            },
            {
              num: '04',
              title: 'Take the Next Step',
              desc: 'Involve families, consult through Istikhara, and proceed with Barakah toward your sacred Nikah.',
              icon: <Heart className="w-5 h-5 text-gold-600" />
            }
          ].map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft hover:shadow-card transition-all relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-serif font-black text-emerald-900/30 group-hover:text-gold-500 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-cream-100 flex items-center justify-center border border-cream-200">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-base font-serif font-bold text-emerald-950 mb-2">{step.title}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROFILES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="emerald" size="md">Featured Members</Badge>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-2">
              Recently Verified Profiles
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Practicing Muslim professionals seeking serious marriage commitments.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigateTo('search')}
          >
            Explore All Profiles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProfiles.map((p) => (
            <ProfileCard key={p.id} profile={p} variant="grid" />
          ))}
        </div>
      </section>

      {/* TRUST & PRIVACY SECTION */}
      <section className="bg-cream-200/60 py-16 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="gold" size="md">Uncompromising Trust</Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                Built Around Islamic Dignity & Safety
              </h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                We understand that matrimonial search requires utmost privacy and safety. Heavenly Nikah provides robust controls so you always remain in full charge of your journey.
              </p>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigateTo('privacy-safety')}
                >
                  Learn About Our Safety Controls
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Multi-Tier Verification',
                  desc: 'Every member undergoes mobile, email, and live selfie photo matching before receiving a badge.',
                  icon: <ShieldCheck className="w-5 h-5 text-emerald-800" />
                },
                {
                  title: 'Photo Privacy Controls',
                  desc: 'Keep photos blurred, visible only to approved matches, or public based on your comfort.',
                  icon: <EyeOff className="w-5 h-5 text-emerald-800" />
                },
                {
                  title: 'Secure & Halal Messaging',
                  desc: 'Zero spam. Respectful communication prompts, anti-harassment filters, and easy blocking.',
                  icon: <Lock className="w-5 h-5 text-emerald-800" />
                },
                {
                  title: 'Wali & Family Friendly',
                  desc: 'Parents and guardians can be linked to review profiles and participate in communications.',
                  icon: <Users className="w-5 h-5 text-emerald-800" />
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-cream-300 shadow-soft space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-200">
                    {item.icon}
                  </div>
                  <h4 className="font-serif font-bold text-emerald-950 text-sm">{item.title}</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="gold" size="md">Blessed Beginnings</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 mt-2">
            Real Couples. Real Nikah.
          </h2>
          <p className="text-sm text-charcoal-600 mt-2">
            Read inspiring stories of couples who found their life partner on Heavenly Nikah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUCCESS_STORIES.slice(0, 2).map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft flex flex-col sm:flex-row gap-5 items-center"
            >
              <div className="relative w-full sm:w-44 h-48 rounded-2xl overflow-hidden shrink-0">
                <img src={story.image} alt={story.names} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-emerald-950/80 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {story.duration}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h4 className="font-serif font-bold text-lg text-emerald-950">{story.names}</h4>
                <p className="text-xs text-charcoal-500">{story.city} • Married {story.weddingDate}</p>
                <p className="text-xs text-charcoal-700 italic leading-relaxed">"{story.shortQuote}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTo('success-stories')}
          >
            Read All Stories
          </Button>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 text-cream-50 p-8 sm:p-14 text-center overflow-hidden border border-gold-500/30 shadow-floating">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="font-arabic text-xl text-gold-300">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Your Nikah Journey Starts Here
            </h2>
            <p className="text-sm sm:text-base text-cream-200 leading-relaxed">
              Join thousands of practicing Muslims taking the first step toward marriage with faith, dignity, and confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={() => navigateTo('register')}
              >
                Create Free Profile Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
                onClick={() => navigateTo('login')}
              >
                Sign In to Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
