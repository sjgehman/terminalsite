'use client';

import { useState, KeyboardEvent } from 'react';
import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface InputProps {
  onSubmit: (command: string) => void;
  commandHistory: string[];
}

export default function Input({ onSubmit, commandHistory }: InputProps) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { theme, accentColor } = useTheme();

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-[#d4d4c8]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#2c2c2c]';
  const placeholderColor = theme === 'dark' ? 'placeholder:text-gray-600' : 'placeholder:text-[#8c8c8c]';

  return (
    <div className={`border-t ${borderColor} p-4 flex items-center gap-2`}>
      <span className={accentColorClasses[accentColor]}>$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 bg-transparent outline-none ${textColor} ${placeholderColor}`}
        placeholder="Type a command here... (try 'help')"
        autoFocus
        spellCheck={false}
      />
    </div>
  );
}
