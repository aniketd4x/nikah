import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Camera, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Lock
} from 'lucide-react';

export const VerificationScreen: React.FC = () => {
  const { currentUser, setIsVerificationModalOpen, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-24 md:pb-12">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
          Trust & Authenticity
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
          Build Trust With a Verified Profile
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Profiles with verified badges receive significantly more serious family inquiries and higher visibility.
        </p>
      </div>

      {/* Verification Level Overview Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-cream-50 rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-900 px-3 py-1 rounded-full text-gold-300 text-xs font-bold border border-gold-500/30">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Current Status: 100% Verified</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Verified Matrimonial Crown</h2>
          <p className="text-xs sm:text-sm text-cream-200 max-w-lg">
            Your phone, email, and live selfie photo have been reviewed and approved by the Polygamy Matrimony verification team.
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={() => setIsVerificationModalOpen(true)}
        >
          Retake Verification Check
        </Button>
      </div>

      {/* 4 Verification Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* 1. Mobile */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <h3 className="font-serif font-bold text-base text-emerald-950">Mobile & OTP Authentication</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Your phone number is confirmed via secure one-time SMS passcodes to prevent duplicate accounts.
          </p>
        </div>

        {/* 2. Email */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <h3 className="font-serif font-bold text-base text-emerald-950">Email Verification</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Primary email address confirmed for critical notifications and respectful interest alerts.
          </p>
        </div>

        {/* 3. Photo Liveness */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-gold-100 text-gold-900 flex items-center justify-center">
              <Camera className="w-5 h-5 text-gold-700" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <h3 className="font-serif font-bold text-base text-emerald-950">Selfie Liveness Photo Match</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Biometric facial check ensuring the profile photo accurately represents the real person.
          </p>
        </div>

        {/* 4. Identity & Background Review */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved
            </span>
          </div>
          <h3 className="font-serif font-bold text-base text-emerald-950">Manual Review & Screening</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Our trust team checks all bio descriptions and partner criteria against Islamic guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
