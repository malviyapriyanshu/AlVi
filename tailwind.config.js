/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe',
          300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1',
          600: '#4f46e5', 700: '#4338ca', 800: '#3730a3',
          900: '#312e81', DEFAULT: '#6366f1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'sm':    '0 1px 2px 0 rgba(0,0,0,0.05)',
        'card':  '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'viz':   '0 4px 24px 0 rgba(0,0,0,0.08), 0 1px 3px 0 rgba(0,0,0,0.06)',
        'bar-glow-indigo': '0 0 16px 3px rgba(99,102,241,0.35)',
        'bar-glow-amber':  '0 0 12px 2px rgba(245,158,11,0.35)',
        'bar-glow-red':    '0 0 12px 2px rgba(239,68,68,0.35)',
        'bar-glow-green':  '0 0 12px 2px rgba(16,185,129,0.30)',
        'btn-indigo':      '0 4px 14px 0 rgba(99,102,241,0.30)',
        'premium':         '0 20px 60px -10px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in':   'fadeIn 0.25s ease-out both',
        'slide-up':  'slideUp 0.3s ease-out both',
        'bar-glow':  'glowPulse 1.4s ease-in-out infinite',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0)' },
          '50%':     { boxShadow: '0 0 18px 4px rgba(99,102,241,0.25)' },
        },
      },
    },
  },
  plugins: [],
}
