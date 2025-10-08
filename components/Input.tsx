'use client';

import { useState, KeyboardEvent, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface InputProps {
  onSubmit: (command: string) => void;
  commandHistory: string[];
}

export interface InputHandle {
  focus: () => void;
}

// List of valid commands for auto-execution
const VALID_COMMANDS = ['help', 'clear', 'about', 'resume', 'contact', 'cat', 'projects', 'blog'];

const Input = forwardRef<InputHandle, InputProps>(({ onSubmit, commandHistory }, ref) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { theme, accentColor } = useTheme();
  const autoExecuteTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const handleSubmit = () => {
    if (input.trim()) {
      // Clear any pending auto-execution
      if (autoExecuteTimer.current) {
        clearTimeout(autoExecuteTimer.current);
        autoExecuteTimer.current = null;
      }
      onSubmit(input);
      setInput('');
      setHistoryIndex(-1);

      // Keep input focused after submission
      // Note: Removed blur() to keep cursor active
    }
  };

  // Auto-execute valid commands after user stops typing
  useEffect(() => {
    // Clear existing timer
    if (autoExecuteTimer.current) {
      clearTimeout(autoExecuteTimer.current);
    }

    const trimmedInput = input.trim().toLowerCase();
    const cmd = trimmedInput.split(' ')[0];

    // Check if the input matches a valid command
    if (VALID_COMMANDS.includes(cmd)) {
      // Set a timer to auto-execute after 800ms of no typing
      autoExecuteTimer.current = setTimeout(() => {
        handleSubmit();
      }, 800);
    }

    // Cleanup timer on unmount
    return () => {
      if (autoExecuteTimer.current) {
        clearTimeout(autoExecuteTimer.current);
      }
    };
  }, [input]);

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
    <div className="flex items-center gap-2 py-1">
      <span className={accentColorClasses[accentColor]}>$</span>
      <input
        ref={inputRef}
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
});

Input.displayName = 'Input';

export default Input;
