'use client';

import { useTheme, accentColors, accentColorClasses } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';

export default function ThemeSwitcher() {
  const { theme, accentColor, toggleTheme, setAccentColor } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = theme === 'dark';
  const dropdownBg = isDark ? 'bg-gray-700' : 'bg-white';
  const borderColor = isDark ? 'border-gray-600' : 'border-gray-300';
  const textColor = isDark ? 'text-gray-200' : 'text-gray-800';
  const hoverBg = isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100';

  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle - Modern Animated Icon */}
      <button
        onClick={toggleTheme}
        className="p-1.5 hover:bg-gray-700 rounded-lg transition-all duration-200 group"
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-label="Toggle theme"
      >
        <svg
          className="w-5 h-5 text-gray-300 group-hover:text-gray-100 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isDark ? (
            // Sun icon
            <g className="animate-in fade-in duration-200">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </g>
          ) : (
            // Moon icon
            <path
              className="animate-in fade-in duration-200"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            />
          )}
        </svg>
      </button>

      {/* Color Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-2.5 py-1.5 hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center gap-2"
          title="Change accent color"
        >
          <span className={`${accentColorClasses[accentColor]} text-lg`}>●</span>
          <span className="hidden sm:inline capitalize text-gray-300 text-xs">{accentColor}</span>
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            className={`absolute right-0 mt-2 ${dropdownBg} rounded-lg shadow-lg border ${borderColor} py-1 z-10 min-w-[130px]`}
          >
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setAccentColor(color);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs ${hoverBg} transition-colors flex items-center gap-2 ${textColor}`}
              >
                <span className={`${accentColorClasses[color]} text-base`}>●</span>
                <span className="capitalize">{color}</span>
                {color === accentColor && <span className="ml-auto text-green-500">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
