import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

export const AdminLoginScreen: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [email, setEmail] = useState('admin@polygamymatrimony.com');
  const [password, setPassword] = useState('Admin@2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    triggerHaptic(15);

    try {
      const res = await api.adminLogin(email, password);
      if (res.success) {
        addToast('Admin Access Granted', 'Welcome to Polygamy Matrimony Sharia Control Panel', 'success');
        navigateTo('admin');
      } else {
        setError(res.error || 'Invalid admin credentials');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1.5 px-3 rounded-full bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Main App</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
          <Database className="w-3.5 h-3.5" />
          <span>srv1641.hstgr.io</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </div>
      </div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-950 border border-emerald-800/80 text-emerald-400 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            Sharia Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure administration for Polygamy Matrimony platform & Hostinger MySQL database.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="admin@polygamymatrimony.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Button */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => {
              setEmail('admin@polygamymatrimony.com');
              setPassword('Admin@2026!');
              setTimeout(() => handleLogin(), 100);
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Demo Admin Login</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center space-y-1 text-[11px] text-slate-500">
          <p>Database: <span className="text-slate-400 font-mono">u872793003_matirmonytaj</span></p>
          <p className="text-[10px]">Protected by End-to-End Sharia Compliance & Role Auth</p>
        </div>
      </div>
    </div>
  );
};
