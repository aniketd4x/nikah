import React from 'react';
import { triggerHaptic } from '../../styles/designTokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[34px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[50px] font-bold',
    xl: 'text-lg px-8 py-4 gap-3 min-h-[56px] font-bold shadow-md',
    icon: 'p-2.5 rounded-2xl aspect-square min-w-[40px] min-h-[40px]'
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-cream-50 focus:ring-emerald-700 shadow-app-card border border-emerald-700/30',
    secondary: 'bg-white hover:bg-cream-100 text-emerald-950 focus:ring-emerald-200 border border-cream-300 shadow-sm',
    outline: 'bg-transparent border border-emerald-900/40 text-emerald-950 hover:bg-emerald-50 focus:ring-emerald-700',
    gold: 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-bold shadow-gold-500/25 focus:ring-gold-500 border border-gold-400/50',
    ghost: 'bg-transparent hover:bg-emerald-50 text-charcoal-700 hover:text-emerald-950 focus:ring-emerald-200 shadow-none',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 focus:ring-rose-500'
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerHaptic(8);
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

