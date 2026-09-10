/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d2',
          300: '#86efb0',
          400: '#4ade85',
          500: '#22c563',
          600: '#16a34e',
          700: '#158040',
          800: '#116536',
          900: '#0c4e2b',
          950: '#052e18',
        },
        gold: {
          50: '#fdfbf2',
          100: '#f9f4df',
          200: '#f3e6b7',
          300: '#ebd385',
          400: '#e1bd52',
          500: '#c59b27',
          600: '#aa7e1e',
          700: '#855e19',
          800: '#6d4c1a',
          900: '#5c3f19',
          DEFAULT: '#C59B27',
          light: '#DFB752',
          dark: '#9A7416',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F2',
          200: '#F4EFE6',
          300: '#EAE1D3',
          400: '#DBD0BE',
          DEFAULT: '#FAF8F2',
        },
        charcoal: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#6C757D',
          500: '#495057',
          600: '#343A40',
          700: '#212529',
          800: '#1A1D20',
          900: '#111315',
          DEFAULT: '#1B2420',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        arabic: ['"Amiri"', 'serif']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 10px 25px -5px rgba(12, 78, 43, 0.06), 0 8px 10px -6px rgba(12, 78, 43, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(12, 78, 43, 0.12), 0 10px 15px -5px rgba(12, 78, 43, 0.06)',
        'floating': '0 25px 50px -12px rgba(12, 78, 43, 0.25)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
