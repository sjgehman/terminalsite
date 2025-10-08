'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type AccentColor = 'green' | 'cyan' | 'purple' | 'pink' | 'orange';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  const [accentColor, setAccentColor] = useState<AccentColor>('orange');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        setTheme,
        setAccentColor,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const accentColorClasses = {
  green: 'text-[#059669] dark:text-green-400',
  cyan: 'text-[#0891b2] dark:text-cyan-400',
  purple: 'text-[#7c3aed] dark:text-purple-400',
  pink: 'text-[#db2777] dark:text-pink-400',
  orange: 'text-[#ea580c] dark:text-orange-400',
};

export const accentColors: AccentColor[] = ['orange', 'green', 'cyan', 'purple', 'pink'];
