import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SUBSCRIPTION_PLANS } from '../data/matrimonyData';
import { Crown, Check, ShieldCheck, Sparkles, Star, ArrowRight } from 'lucide-react';

export const SubscriptionScreen: React.FC = () => {
  const { currentPlan, upgradePlan, navigateTo } = useApp();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-10 pb-28 md:pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-gold-50/90 text-gold-900 px-3.5 py-1 rounded-full text-xs font-bold border border-gold-300 shadow-sm">
          <Crown className="w-3.5 h-3.5 text-gold-600" />
          <span>Transparent & Shariah Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
          Choose the Perfect Membership for Your Nikah Journey
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
          Unlock unlimited direct messaging, full profile viewer lists, and dedicated matrimonial assistance.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="bg-cream-200/80 p-1.5 rounded-2xl flex items-center border border-cream-300/80 shadow-inner backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                billingCycle === 'annual'
                  ? 'bg-emerald-950 text-gold-300 shadow-sm'
                  : 'text-charcoal-600 hover:text-emerald-950'
              }`}
            >
              Annual Billing (Save 35%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-950 text-gold-300 shadow-sm'
                  : 'text-charcoal-600 hover:text-emerald-950'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentPlan.toLowerCase().replace(' ', '-') === plan.id;
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border-2 transition-all duration-300 active:scale-[0.99] ${
                plan.popular
                  ? 'border-gold-500 bg-white shadow-floating ring-2 ring-gold-400/20'
                  : 'border-cream-300 bg-white/95 backdrop-blur-md shadow-soft hover:shadow-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl text-emerald-950">{plan.name}</h3>
                  {plan.id === 'premium-plus' && <Crown className="w-5 h-5 text-gold-500" />}
                </div>

                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans">{price}</span>
                  <span className="text-xs text-charcoal-500 ml-1.5">/ month</span>
                  {plan.billingNote && (
                    <p className="text-[11px] text-charcoal-400 mt-0.5">{plan.billingNote}</p>
                  )}
                </div>

                <p className="text-xs text-charcoal-600 mb-6 leading-relaxed">{plan.description}</p>

                {/* Features List */}
                <div className="space-y-3 border-t border-cream-200 pt-5 mb-8">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      {f.included ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="w-4 h-4 text-charcoal-300 text-center shrink-0 mt-0.5">—</span>
                      )}
                      <span className={f.included ? 'text-charcoal-700 font-medium' : 'text-charcoal-400 line-through text-[11px]'}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={plan.id === 'premium-plus' ? 'gold' : plan.popular ? 'primary' : 'secondary'}
                size="lg"
                fullWidth
                disabled={isCurrent}
                onClick={() => {
                  const targetPlan = plan.id === 'free' ? 'Free' : plan.id === 'premium' ? 'Premium' : 'Premium Plus';
                  upgradePlan(targetPlan);
                }}
              >
                {isCurrent ? 'Current Active Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Shariah Compliance & FAQ Box */}
      <div className="bg-emerald-950 text-cream-50 rounded-[2rem] p-6 sm:p-10 border border-gold-500/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-gold-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Pure Halal Platform Promise</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            100% Transparent. Zero Hidden Auto-Renewals.
          </h3>
          <p className="text-xs text-cream-200 max-w-xl leading-relaxed">
            All subscriptions on Polygamy Matrimony support manual verification officers and continuous security checks to protect Muslim families.
          </p>
        </div>

        <Badge variant="verified" size="lg">
          Verified Payment Gateway Safe
        </Badge>
      </div>
    </div>
  );
};
