import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'gold' | 'cream' | 'charcoal' | 'verified' | 'match' | 'outline' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  }[size];

  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80',
    gold: 'bg-gold-50 text-gold-800 border border-gold-300 font-semibold',
    cream: 'bg-cream-200 text-charcoal-700 border border-cream-300',
    charcoal: 'bg-charcoal-100 text-charcoal-800 border border-charcoal-200',
    verified: 'bg-emerald-900 text-gold-300 border border-emerald-700/60 shadow-sm',
    match: 'bg-gradient-to-r from-emerald-900 to-emerald-800 text-gold-300 border border-gold-500/40 font-semibold shadow-sm',
    outline: 'bg-white/80 text-charcoal-700 border border-charcoal-200 backdrop-blur-sm',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200'
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full tracking-wide transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : variant === 'verified' ? (
        <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
      ) : variant === 'match' ? (
        <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
      ) : null}
      {children}
    </span>
  );
};
