import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'emerald';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'emerald',
  showSubtitle = true
}) => {
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', title: 'text-lg md:text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-14 h-14', title: 'text-3xl md:text-4xl', sub: 'text-sm' }
  }[size];

  const textColor = {
    light: 'text-white',
    dark: 'text-charcoal-DEFAULT',
    emerald: 'text-emerald-900'
  }[variant];

  const subColor = {
    light: 'text-gold-300',
    dark: 'text-emerald-700',
    emerald: 'text-gold-600'
  }[variant];

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      {/* Emblem: Crescent with Star and Heart Geometry */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 p-2 shadow-md border border-gold-500/30 group-hover:border-gold-400 transition-all duration-300 ${sizeClasses.icon}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-gold-400 drop-shadow-sm"
        >
          {/* Crescent */}
          <path
            d="M23 16C23 21.5228 18.5228 26 13 26C10.2285 26 7.7285 24.8715 5.92871 23.0518C8.8475 23.6705 12.0003 22.8466 14.3137 20.5332C17.4379 17.409 17.4379 12.3437 14.3137 9.21954C12.0003 6.90614 8.8475 6.08225 5.92871 6.70094C7.7285 4.88125 10.2285 3.75275 13 3.75275C18.5228 3.75275 23 8.2299 23 13.7528V16Z"
            fill="currentColor"
            opacity="0.95"
          />
          {/* Subtle Heart-sparkle node */}
          <path
            d="M21.5 8C21.5 6.61929 22.6193 5.5 24 5.5C25.3807 5.5 26.5 6.61929 26.5 8C26.5 10.5 24 12.5 24 12.5C24 12.5 21.5 10.5 21.5 8Z"
            fill="#DFB752"
          />
          {/* Islamic Star */}
          <polygon
            points="24,3 24.8,4.6 26.5,4.9 25.2,6.1 25.6,7.8 24,6.9 22.4,7.8 22.8,6.1 21.5,4.9 23.2,4.6"
            fill="#FAF8F2"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="flex flex-col tracking-tight leading-none">
        <span className={`font-serif font-bold tracking-wider uppercase ${textColor} ${sizeClasses.title}`}>
          HEAVENLY
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`font-sans font-semibold tracking-widest text-[11px] uppercase ${subColor}`}>
            NIKAH
          </span>
          {showSubtitle && (
            <>
              <span className="w-1 h-1 rounded-full bg-gold-400 opacity-60"></span>
              <span className="text-[9px] uppercase tracking-wider text-charcoal-400 font-medium">
                Matrimonial
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
