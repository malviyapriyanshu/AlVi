import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('alvi-theme') as Theme) || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('alvi-theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const currentResolved = theme === 'system' 
        ? (mediaQuery.matches ? 'dark' : 'light') 
        : theme;
      
      setResolvedTheme(currentResolved);

      const themeVars = currentResolved === 'dark' ? darkTheme : lightTheme;
      
      // Remove previous classes
      root.classList.remove('light', 'dark');
      root.classList.add(currentResolved);

      // Apply CSS variables
      Object.entries(themeVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };

    applyTheme();

    // Listen for system changes
    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
