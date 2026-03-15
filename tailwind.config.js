/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fb',
          400: '#7695f8',
          500: '#3b68f5',
          600: '#355ddd',
          700: '#2c4eb8',
          800: '#233e93',
          900: '#1d3378',
          DEFAULT: '#6366f1', // Indigo
        },
        slate: {
          850: '#1e293b',
          950: '#020617',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(99, 102, 241, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
