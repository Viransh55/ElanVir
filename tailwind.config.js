/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d', // Deep Emerald
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937', // Charcoal
          900: '#111827',
        },
        accent: {
          50: '#fffdf7',
          100: '#fffbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309', // Gold
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          50: '#fefefe',
          100: '#fafaf9', // Beige
          200: '#f5f5f4',
          300: '#e7e5e4',
          400: '#d6d3d1',
          500: '#a8a29e',
          600: '#78716c',
          700: '#57534e',
          800: '#44403c',
          900: '#292524',
        },
        success: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'luxury': '0 10px 40px -12px rgba(0, 0, 0, 0.12)',
        'card': '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};