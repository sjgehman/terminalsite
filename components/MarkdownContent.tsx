'use client';

import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const { accentColor } = useTheme();

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
    <div className="space-y-2 break-words overflow-wrap-anywhere">
      {lines.map((line: string, index: number) => {
        // Handle markdown headers
        if (line.startsWith('# ')) {
          return <p key={index} className={`${accentColorClasses[accentColor]} font-bold text-lg break-words`}>{line.slice(2)}</p>;
        } else if (line.startsWith('## ')) {
          return <p key={index} className="font-bold mt-4 break-words">{line.slice(3)}</p>;
        } else if (line.startsWith('### ')) {
          return <p key={index} className="font-semibold mt-2 break-words">{line.slice(4)}</p>;
        }
        return <p key={index} className="break-words">{linkifyText(line)}</p>;
      })}
    </div>
  );
}
