'use client';

import { useState, useRef, useEffect } from 'react';
import Input, { InputHandle } from './Input';
import Output from './Output';
import ThemeSwitcher from './ThemeSwitcher';
import MarkdownContent from './MarkdownContent';
import HelpContent from './HelpContent';
import CatImage from './CatImage';
import BlogList from './BlogList';
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

    // Don't add to display history if command is 'clear' (it already cleared the history)
    if (command.trim().toLowerCase() !== 'clear') {
      // Add to display history
      const newOutput: CommandOutput = {
        id: Date.now().toString(),
        command,
        output,
        timestamp: new Date(),
      };

      setHistory((prev) => [...prev, newOutput]);
    }
  };

  const processCommand = async (command: string): Promise<React.ReactNode> => {
    const trimmedCommand = command.trim().toLowerCase();
    const cmd = trimmedCommand.split(' ')[0];

    // Easter eggs - check full command string for these patterns
    if (trimmedCommand.includes('meaning of life')) {
      return <p className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>42</p>;
    }
    if (trimmedCommand.includes('neo')) {
      return <p className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Follow the white rabbit.</p>;
    }
    if (trimmedCommand.includes('open the pod bay doors')) {
      return <p className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>I&apos;m sorry, Dave. I&apos;m afraid I can&apos;t do that.</p>;
    }
    if (trimmedCommand.includes('rm -rf /') || trimmedCommand.includes('rm -rf/')) {
      return <p className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>Nice try, slick.</p>;
    }

    switch (cmd) {
      case 'help':
        return <HelpContent />;

      case 'clear':
        setHistory([]);
        return null;

      case 'ping':
        return <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#2c2c2c]'}>pong</p>;

      case 'whoami':
        return <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#2c2c2c]'}>You are the user. The one in control.</p>;

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
      //   try {
      //     const response = await fetch(`/api/content/projects`);
      //     const data = await response.json();
      //
      //     if (response.ok) {
      //       return <MarkdownContent content={data.content} />;
      //     } else {
      //       return <p className="text-red-400">Failed to load content</p>;
      //     }
      //   } catch {
      //     return <p className="text-red-400">Error loading content</p>;
      //   }

      // TODO: Uncomment when ready to add blog functionality
      // case 'blog':
      //   try {
      //     const response = await fetch('/api/blog');
      //     const data = await response.json();
      //
      //     if (response.ok) {
      //       return <BlogList posts={data.posts} />;
      //     } else {
      //       return <p className="text-red-400">Failed to load blog posts</p>;
      //     }
      //   } catch {
      //     return <p className="text-red-400">Error loading blog posts</p>;
      //   }

      case 'hello':
      case 'hi':
      case 'hey':
        return (
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#2c2c2c]'}>
            Hello! Please try another command such as &apos;help&apos;.
          </p>
        );

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
  const headerBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-600';
  const secondaryText = theme === 'dark' ? 'text-gray-400' : 'text-gray-400';

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-950' : 'bg-[#e8e8e0]'} md:flex md:items-center md:justify-center md:p-4`}>
      <div className={`w-full h-screen md:h-[85vh] md:max-h-[700px] md:max-w-4xl ${bgColor} ${textColor} font-mono flex flex-col md:rounded-lg md:shadow-2xl overflow-hidden border-0 md:border ${borderColor}`}>
        {/* Terminal Header */}
        <div className={`${headerBg} px-4 py-2.5 flex items-center justify-between border-b ${headerBorderColor} flex-shrink-0`}>
          <span className={`${secondaryText} text-sm font-semibold`}>sam@code:~</span>
          <ThemeSwitcher />
        </div>

        {/* Terminal Content - Output and Input together */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 cursor-text"
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

          {/* Terminal Input - now inline */}
          <Input ref={inputRef} onSubmit={handleCommand} commandHistory={commandHistory} />
        </div>
      </div>
    </div>
  );
}
