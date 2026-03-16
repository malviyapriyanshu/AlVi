export const designTokens = {
  colors: {
    dark: {
      backgroundPrimary: '#020617', // slate-950
      backgroundSecondary: '#0f172a', // slate-900
      panelBackground: 'rgba(15, 23, 42, 0.9)',
      cardBackground: 'rgba(30, 41, 59, 0.4)', // slate-800
      borderColor: 'rgba(255, 255, 255, 0.12)',
      textPrimary: '#f8fafc', // slate-50
      textSecondary: '#cbd5e1', // slate-300 (Higher contrast than slate-400)
      textMuted: '#94a3b8', // slate-400
      accentPrimary: '#818cf8', // indigo-400 (Better contrast in dark mode)
      accentGlow: 'rgba(129, 140, 248, 0.15)',
      success: '#34d399', // emerald-400
      warning: '#fbbf24', // amber-400
      danger: '#f87171', // red-400
      shadow: 'rgba(0, 0, 0, 0.5)',
      ring: '#6366f1',
    },
    light: {
      backgroundPrimary: '#f8fafc', // slate-50
      backgroundSecondary: '#ffffff',
      panelBackground: 'rgba(255, 255, 255, 0.95)',
      cardBackground: 'rgba(241, 245, 249, 0.8)', // slate-100
      borderColor: 'rgba(0, 0, 0, 0.1)',
      textPrimary: '#0f172a', // slate-900
      textSecondary: '#475569', // slate-600 (Higher contrast than slate-500)
      textMuted: '#64748b', // slate-500
      accentPrimary: '#4f46e5', // indigo-600
      accentGlow: 'rgba(79, 70, 229, 0.1)',
      success: '#059669', // emerald-600
      warning: '#d97706', // amber-600
      danger: '#dc2626', // red-600
      shadow: 'rgba(0, 0, 0, 0.08)',
      ring: '#4f46e5',
    },
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    '2xl': '3rem', // 48px
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  fonts: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  }
};
