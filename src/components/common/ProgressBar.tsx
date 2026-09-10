import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'emerald' | 'gold';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  showText = true,
  size = 'md',
  variant = 'emerald'
}) => {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  const fillClass = {
    emerald: 'bg-gradient-to-r from-emerald-800 to-emerald-600',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-400'
  }[variant];

  return (
    <div className="w-full">
      {(label || showText) && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          {label && <span className="font-medium text-charcoal-700">{label}</span>}
          {showText && <span className="font-bold text-emerald-900">{clamped}% Complete</span>}
        </div>
      )}
      <div className={`w-full bg-cream-200 rounded-full overflow-hidden ${heightClass} p-0.5 border border-cream-300/60`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-700 ease-out ${fillClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
