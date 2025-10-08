'use client';

import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function BlogLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
