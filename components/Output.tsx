'use client';

import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface OutputProps {
  command: string;
  output: React.ReactNode;
}

export default function Output({ command, output }: OutputProps) {
  const { theme, accentColor } = useTheme();

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#2c2c2c]';
  const secondaryText = theme === 'dark' ? 'text-gray-300' : 'text-[#3c3c3c]';

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className={accentColorClasses[accentColor]}>$</span>
        <span className={textColor}>{command}</span>
      </div>
      {output && <div className={`ml-4 ${secondaryText}`}>{output}</div>}
    </div>
  );
}
