import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [identifier, setIdentifier] = useState('ahmed.khan@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 600);
  };

  const handleDemoLogin = (type: 'groom' | 'bride') => {
    if (type === 'groom') {
      setIdentifier('ahmed.khan@example.com');
    } else {
      setIdentifier('ayesha.khan@example.com');
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 pb-28 md:pb-12">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block cursor-pointer" onClick={() => navigateTo('landing')}>
            <Logo size="lg" variant="emerald" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 pt-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-charcoal-500">
            Sign in to continue your blessed journey to Nikah.
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="bg-cream-100/80 p-3.5 rounded-2xl border border-cream-200/80 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block text-center">
            Instant Demo Account Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('groom')}
              className="py-2 px-2.5 rounded-xl bg-white text-emerald-950 text-xs font-semibold border border-cream-300 hover:border-emerald-700 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ahmed (Groom)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('bride')}
              className="py-2 px-2.5 rounded-xl bg-white text-emerald-950 text-xs font-semibold border border-cream-300 hover:border-emerald-700 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Ayesha (Bride)</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-charcoal-700">
              Mobile Number or Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="e.g. ahmed.khan@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-cream-300 bg-cream-50/60 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-charcoal-700">Password</label>
              <button
                type="button"
                onClick={() => alert('Demo prototype: Use any password or click Demo fill above.')}
                className="text-emerald-800 hover:underline text-[11px] font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-cream-300 bg-cream-50/60 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Dashboard
          </Button>

          {/* Fast Single-Sign-On */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-charcoal-400">
              or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleDemoLogin('groom')}
            className="w-full py-3 px-4 rounded-2xl border border-cream-300 bg-white hover:bg-cream-50 text-xs font-semibold text-charcoal-700 flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-charcoal-500">
            Don't have an account yet?{' '}
            <button
              onClick={() => navigateTo('register')}
              className="font-bold text-emerald-900 hover:underline"
            >
              Create Free Profile
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
