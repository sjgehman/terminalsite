'use client';

import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const { accentColor, theme } = useTheme();

  const lines = content.split('\n').filter((line: string) => line.trim());

  // Function to detect and linkify URLs
  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`${accentColorClasses[accentColor]} underline hover:opacity-80 transition-opacity`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2">
      {lines.map((line: string, index: number) => {
        // Handle markdown headers
        if (line.startsWith('# ')) {
          return <p key={index} className={`${accentColorClasses[accentColor]} font-bold text-lg`}>{line.slice(2)}</p>;
        } else if (line.startsWith('## ')) {
          return <p key={index} className="font-bold mt-4">{line.slice(3)}</p>;
        } else if (line.startsWith('### ')) {
          return <p key={index} className="font-semibold mt-2">{line.slice(4)}</p>;
        }
        return <p key={index}>{linkifyText(line)}</p>;
      })}
    </div>
  );
}
