'use client';

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';

interface BlogHeaderProps {
  backLink: string;
  backText: string;
}

export default function BlogHeader({ backLink, backText }: BlogHeaderProps) {
  const { theme } = useTheme();
  const headerBg = 'bg-gray-800';
  const headerBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-600';
  const secondaryText = 'text-gray-400';

  return (
    <div className={`${headerBg} px-4 py-2.5 flex items-center justify-between border-b ${headerBorderColor} mb-8 -mx-8 -mt-8`}>
      <Link
        href={backLink}
        className={`${secondaryText} hover:underline text-sm font-mono`}
      >
        {backText}
      </Link>
      <ThemeSwitcher />
    </div>
  );
}
