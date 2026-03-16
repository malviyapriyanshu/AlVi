export const designTokens = {
  colors: {
    dark: {
      backgroundPrimary: '#020617', // slate-950
      backgroundSecondary: '#0f172a', // slate-900
      panelBackground: 'rgba(15, 23, 42, 0.8)',
      cardBackground: 'rgba(30, 41, 59, 0.4)', // slate-800
      borderColor: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#f8fafc', // slate-50
      textSecondary: '#94a3b8', // slate-400
      accentPrimary: '#6366f1', // indigo-500
      accentGlow: 'rgba(99, 102, 241, 0.15)',
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      danger: '#ef4444', // red-500
      shadow: 'rgba(0, 0, 0, 0.4)',
    },
    light: {
      backgroundPrimary: '#f8fafc', // slate-50
      backgroundSecondary: '#ffffff',
      panelBackground: 'rgba(255, 255, 255, 0.8)',
      cardBackground: 'rgba(241, 245, 249, 0.6)', // slate-100
      borderColor: 'rgba(0, 0, 0, 0.08)',
      textPrimary: '#0f172a', // slate-900
      textSecondary: '#64748b', // slate-500
      accentPrimary: '#4f46e5', // indigo-600
      accentGlow: 'rgba(79, 70, 229, 0.1)',
      success: '#059669', // emerald-600
      warning: '#d97706', // amber-600
      danger: '#dc2626', // red-600
      shadow: 'rgba(0, 0, 0, 0.05)',
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
