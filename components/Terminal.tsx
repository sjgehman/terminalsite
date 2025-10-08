'use client';

import { useState, useRef, useEffect } from 'react';
import Input, { InputHandle } from './Input';
import Output from './Output';
import ThemeSwitcher from './ThemeSwitcher';
import MarkdownContent from './MarkdownContent';
import HelpContent from './HelpContent';
import CatImage from './CatImage';
import { useTheme, accentColorClasses } from '@/context/ThemeContext';

export interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputHandle>(null);
  const { theme, accentColor } = useTheme();

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle clicks on terminal area to focus input
  const handleTerminalClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on interactive elements
    const target = e.target as HTMLElement;
    const isInteractive = target.tagName === 'A' ||
                         target.tagName === 'BUTTON' ||
                         target.tagName === 'INPUT' ||
                         target.closest('button') !== null ||
                         target.closest('a') !== null;

    if (!isInteractive) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = async (command: string) => {
    // Add command to history
    setCommandHistory((prev) => [...prev, command]);

    // Process command and get output
    const output = await processCommand(command);

    // Add to display history
    const newOutput: CommandOutput = {
      id: Date.now().toString(),
      command,
      output,
      timestamp: new Date(),
    };

    setHistory((prev) => [...prev, newOutput]);
  };

  const processCommand = async (command: string): Promise<React.ReactNode> => {
    const trimmedCommand = command.trim().toLowerCase();
    const cmd = trimmedCommand.split(' ')[0];

    switch (cmd) {
      case 'help':
        return <HelpContent />;

      case 'clear':
        setHistory([]);
        return null;

      case 'about':
      case 'resume':
      case 'contact':
        try {
          const response = await fetch(`/api/content/${cmd}`);
          const data = await response.json();

          if (response.ok) {
            return <MarkdownContent content={data.content} />;
          } else {
            return <p className="text-red-400">Failed to load content</p>;
          }
        } catch {
          return <p className="text-red-400">Error loading content</p>;
        }

      case 'cat':
        try {
          const response = await fetch('/api/cats');
          const data = await response.json();

          if (response.ok) {
            return <CatImage imagePath={data.image} />;
          } else {
            return <p className="text-red-400">No cat images found. Add images to /public/cats/ folder!</p>;
          }
        } catch {
          return <p className="text-red-400">Error loading cat image</p>;
        }

      // TODO: Uncomment when ready to add projects functionality
      // case 'projects':
      //   return <p className="text-yellow-400">Loading projects...</p>;

      // TODO: Uncomment when ready to add blog functionality
      // case 'blog':
      //   return <p className="text-yellow-400">Loading blog posts...</p>;

      case '':
        return null;

      default:
        return (
          <p className="text-red-400">
            Command not found: {command}. Type &apos;help&apos; for available commands.
          </p>
        );
    }
  };

  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-[#f5f5f0]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#2c2c2c]';
  const headerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-[#d4d4c8]';
  const secondaryText = theme === 'dark' ? 'text-gray-400' : 'text-gray-400';

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-950' : 'bg-[#e8e8e0]'} flex items-center justify-center md:p-4`}>
      <div className={`w-full h-screen md:h-[85vh] md:max-h-[700px] md:max-w-4xl ${bgColor} ${textColor} font-mono flex flex-col md:rounded-lg md:shadow-2xl overflow-hidden border ${borderColor}`}>
        {/* Terminal Header */}
        <div className={`${headerBg} px-4 py-2.5 flex items-center justify-between border-b ${borderColor} flex-shrink-0`}>
          <span className={`${secondaryText} text-sm font-semibold`}>sam@code:~</span>
          <ThemeSwitcher />
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0 cursor-text"
          onClick={handleTerminalClick}
        >
          {/* Welcome message */}
          <div className="mb-4">
            <p className={accentColorClasses[accentColor]}>Welcome to Sam&apos;s Website</p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-[#4c4c4c]'}>Type &apos;help&apos; to see available commands</p>
          </div>

          {/* Command history */}
          {history.map((item) => (
            <Output key={item.id} command={item.command} output={item.output} />
          ))}
        </div>

        {/* Terminal Input */}
        <Input ref={inputRef} onSubmit={handleCommand} commandHistory={commandHistory} />
      </div>
    </div>
  );
}
