import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { ShieldCheck, ArrowRight, User, MapPin, Mail, Phone, Lock, Heart } from 'lucide-react';

export const RegisterScreen: React.FC = () => {
  const { registerUser, navigateTo } = useApp();
  const [lookingFor, setLookingFor] = useState<'bride' | 'groom'>('bride');
  const [name, setName] = useState('');
  const [age, setAge] = useState('26');
  const [location, setLocation] = useState('Mumbai, India');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      lookingFor,
      name: name || (lookingFor === 'bride' ? 'Ahmed Farooq' : 'Ayesha Siddiqui'),
      age: parseInt(age) || 26,
      location,
      email,
      mobile
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-card space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block" onClick={() => navigateTo('landing')}>
            <Logo size="lg" variant="emerald" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 pt-2">
            Begin Your Sacred Journey
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Create your free profile and discover compatible Muslim singles worldwide.
          </p>
        </div>

        {/* Looking For Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-600 block text-center">
            I am looking for
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => setLookingFor('bride')}
              className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                lookingFor === 'bride'
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-800/20'
                  : 'bg-cream-100 text-charcoal-700 border-cream-300 hover:bg-cream-200'
              }`}
            >
              <Heart className="w-4 h-4 text-gold-400" />
              <span>A Bride (Female)</span>
            </button>

            <button
              type="button"
              onClick={() => setLookingFor('groom')}
              className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                lookingFor === 'groom'
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-800/20'
                  : 'bg-cream-100 text-charcoal-700 border-cream-300 hover:bg-cream-200'
              }`}
            >
              <Heart className="w-4 h-4 text-gold-400" />
              <span>A Groom (Male)</span>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">First & Last Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ahmed Khan"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Age</label>
              <input
                type="number"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">City & Country</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai, India or Dubai, UAE"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Mobile Number (with Country Code)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Terms Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-600">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="w-4 h-4 mt-0.5 rounded text-emerald-800 focus:ring-emerald-700 accent-emerald-800 shrink-0"
              />
              <span>
                I agree to the <a href="#terms" className="text-emerald-900 font-semibold underline">Terms & Conditions</a> and <a href="#privacy" className="text-emerald-900 font-semibold underline">Privacy Policy</a>. I certify that I am registering for genuine Nikah intentions.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Profile & Continue Onboarding
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-charcoal-500">
            Already registered on Heavenly Nikah?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="font-bold text-emerald-900 hover:underline"
            >
              Sign In Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
