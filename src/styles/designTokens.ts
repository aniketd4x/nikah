/**
 * Polygamy Matrimony Design System Tokens
 * Mobile-First Native PWA Aesthetic
 */

export const designTokens = {
  colors: {
    primary: {
      light: '#10b981', // Emerald 500
      DEFAULT: '#059669', // Emerald 600
      dark: '#0c4e2b', // Emerald 900
      deep: '#052e18', // Emerald 950
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    },
    accent: {
      light: '#ebd385',
      DEFAULT: '#d4a574', // Warm Gold
      gold: '#c59b27',
      dark: '#9a7416',
      gradient: 'linear-gradient(135deg, #dfb752 0%, #d4a574 50%, #9a7416 100%)',
    },
    background: {
      cream: '#faf8f3',
      creamLight: '#fdfcf9',
      surface: '#ffffff',
      dark: '#111315',
      darkSurface: '#1a1d20',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#495057',
      muted: '#6b7280',
      light: '#faf8f2',
    },
    border: {
      subtle: '#eae1d3',
      goldSubtle: 'rgba(212, 165, 116, 0.3)',
      emeraldSubtle: 'rgba(5, 150, 105, 0.2)',
    }
  },
  typography: {
    fonts: {
      display: '"Playfair Display", Georgia, serif',
      body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
      arabic: '"Amiri", serif',
    },
    sizes: {
      hero: 'clamp(2rem, 5vw, 3.75rem)',
      h1: 'clamp(1.75rem, 4vw, 2.5rem)',
      h2: 'clamp(1.25rem, 3vw, 1.75rem)',
      body: '0.875rem',
      caption: '0.75rem',
      chip: '0.6875rem',
    }
  },
  radii: {
    pill: '9999px',
    card: '24px',
    sheet: '28px',
    bubble: '18px',
  },
  shadows: {
    ios: '0 4px 20px -2px rgba(12, 78, 43, 0.08)',
    sheet: '0 -10px 40px rgba(0, 0, 0, 0.15)',
    floating: '0 12px 32px -4px rgba(12, 78, 43, 0.16)',
    glow: '0 0 25px rgba(5, 150, 105, 0.35)',
    goldGlow: '0 0 20px rgba(212, 165, 116, 0.3)',
  },
  motion: {
    tap: { scale: 0.96 },
    spring: { type: 'spring', damping: 25, stiffness: 300 },
    sheetSpring: { type: 'spring', damping: 30, stiffness: 350 },
  }
} as const;

export const triggerHaptic = (duration = 10) => {
  if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Ignore if not permitted
    }
  }
};
