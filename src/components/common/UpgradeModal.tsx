import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';
import { Check, Crown, ShieldCheck, Sparkles, Lock, Star } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../data/mockData';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, currentPlan, upgradePlan } = useApp();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 'premium' | 'premium-plus'>('premium');

  return (
    <Modal
      isOpen={isUpgradeModalOpen}
      onClose={() => setIsUpgradeModalOpen(false)}
      maxWidth="3xl"
    >
      <div className="py-2">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 bg-gold-100 text-gold-900 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-gold-300">
            <Crown className="w-3.5 h-3.5 text-gold-600" />
            <span>Blessed Premium Membership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
            Accelerate Your Journey to Nikah
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Unlock unlimited verified communication, Wali-assisted introductions, and priority discovery.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center mt-5">
            <div className="bg-cream-200 p-1 rounded-2xl flex items-center border border-cream-300">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-emerald-950'
                }`}
              >
                Annual (Save 35%)
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-emerald-950'
                }`}
              >
                Monthly Billing
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isCurrent = currentPlan.toLowerCase().replace(' ', '-') === plan.id;
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id as any)}
                className={`relative rounded-3xl p-5 cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'border-gold-500 bg-white shadow-floating ring-2 ring-gold-400/20'
                    : 'border-cream-300/80 bg-cream-50 hover:border-emerald-700/40 hover:bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif font-bold text-lg text-emerald-950">{plan.name}</h4>
                    {plan.id === 'premium-plus' && <Crown className="w-4 h-4 text-gold-500" />}
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">{price}</span>
                    <span className="text-xs text-charcoal-500 ml-1">/ month</span>
                  </div>

                  <p className="text-[11px] text-charcoal-500 mb-4 leading-relaxed">{plan.description}</p>

                  <div className="space-y-2 border-t border-cream-200 pt-3 mb-4">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-3.5 h-3.5 text-charcoal-300 text-center shrink-0 mt-0.5">—</span>
                        )}
                        <span className={f.included ? 'text-charcoal-700' : 'text-charcoal-400 line-through text-[11px]'}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant={isSelected ? (plan.id === 'premium-plus' ? 'gold' : 'primary') : 'secondary'}
                  size="sm"
                  fullWidth
                  disabled={isCurrent}
                  onClick={(e) => {
                    e.stopPropagation();
                    const targetPlan = plan.id === 'free' ? 'Free' : plan.id === 'premium' ? 'Premium' : 'Premium Plus';
                    upgradePlan(targetPlan);
                  }}
                >
                  {isCurrent ? 'Current Plan' : isSelected ? 'Choose This Plan' : 'Select'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Halal & Privacy Guarantee Box */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-gold-400 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-emerald-950">100% Shariah-Compliant Guarantee</h5>
              <p className="text-[11px] text-charcoal-600">Cancel anytime. Strict verification and zero hidden subscriptions.</p>
            </div>
          </div>
          <Badge variant="verified" size="sm">
            Demo Checkout (Instant Unlock)
          </Badge>
        </div>
      </div>
    </Modal>
  );
};
