'use client';

import { useTheme, accentColorClasses } from '@/context/ThemeContext';

export default function HelpContent() {
  const { accentColor } = useTheme();

  return (
    <div className="space-y-1">
      <p className={accentColorClasses[accentColor]}>Available commands:</p>
      <p className="ml-4">help - Show this help message</p>
      <p className="ml-4">clear - Clear the terminal</p>
      <p className="ml-4">about - Learn about me</p>
      <p className="ml-4">resume - View my resume</p>
      <p className="ml-4">contact - Get in touch</p>
      <p className="ml-4">cat - Cat</p>
      {/* <p className="ml-4">blog - Read my blog posts</p> */}
      {/* <p className="ml-4">projects - View my projects</p> */}
    </div>
  );
}
