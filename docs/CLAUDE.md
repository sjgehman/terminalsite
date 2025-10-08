# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive terminal-style portfolio website built with Next.js and Supabase. The site simulates a command-line interface where users can execute commands to view content stored in markdown files and display random images.

**Key Technologies:**
- Frontend: Next.js 15 (React) with TypeScript and Tailwind CSS
- Backend: Supabase (PostgreSQL database)
- Deployment: Vercel
- Package Manager: npm

## Current Implementation Status

### ✅ Completed Features

**Core Terminal:**
- Terminal.tsx - Main component with command processing and history
- Input.tsx - Command input with arrow key history navigation
- Output.tsx - Renders command output
- ThemeSwitcher.tsx - UI controls for theme/color selection

**Theme System:**
- ThemeContext.tsx - React context for theme state
- Dark/Light mode with system preference detection
- 5 accent colors: orange (default), green, cyan, purple, pink
- Claude-inspired warm color palette for light mode

**Commands:**
- `help` - Displays available commands
- `clear` - Clears terminal history
- `about` - Loads content from `content/about.md`
- `resume` - Loads content from `content/resume.md`
- `contact` - Loads content from `content/contact.md`
- `cat` - Displays random image from `public/cats/` folder

**Content System:**
- Markdown files in `content/` directory
- API route at `/api/content/[slug]` for serving content
- MarkdownContent.tsx - Renders markdown with clickable links
- HelpContent.tsx - Dynamic help menu
- Auto-linkification of URLs in markdown

**Image Display:**
- API route at `/api/cats` for random image selection
- CatImage.tsx - Displays images with loading animation
- Supports .jpg, .jpeg, .png, .gif, .webp formats

### 🚧 Placeholder/Future Features

**Projects & Blog** (commented out in code):
- Commands exist but are disabled
- To enable: Uncomment lines in Terminal.tsx and HelpContent.tsx
- Will need implementation for data fetching

**Supabase Integration:**
- Database schema designed but not yet used
- Tables: `projects`, `blog_posts`
- RLS policies defined in migration files

## File Structure

```
terminalsite/
├── app/
│   ├── api/
│   │   ├── cats/route.ts          # Random image API
│   │   └── content/[slug]/route.ts # Content loading API
│   ├── layout.tsx                  # Root layout with ThemeProvider
│   └── page.tsx                    # Main page with Terminal
├── components/
│   ├── CatImage.tsx               # Image display component
│   ├── HelpContent.tsx            # Help command output
│   ├── Input.tsx                  # Command input with history
│   ├── MarkdownContent.tsx        # Markdown renderer with links
│   ├── Output.tsx                 # Command output renderer
│   ├── Terminal.tsx               # Main terminal component
│   ├── ThemeSwitcher.tsx          # Theme/color controls
│   └── ThemeWrapper.tsx           # Applies dark class to DOM
├── content/                        # Editable markdown files
│   ├── about.md
│   ├── contact.md
│   └── resume.md
├── context/
│   └── ThemeContext.tsx           # Theme state management
├── lib/
│   ├── content.ts                 # File reading utilities
│   └── supabase.ts                # Supabase client
└── public/
    └── cats/                      # Random images folder
```

## Development Guidelines

### Adding New Commands

1. Add case to switch statement in `Terminal.tsx` `processCommand()`
2. Create component for dynamic output (if needed for theme reactivity)
3. Add to help menu in `HelpContent.tsx`
4. Create API route if fetching data

### Editing Content

- All content files are in `content/` directory
- Markdown format with automatic URL linking
- Headers (`#`, `##`, `###`) are styled with accent color
- Changes are hot-reloaded in development

### Theme Colors

**Light Mode:**
- Background: `#f5f5f0` (warm cream)
- Text: `#2c2c2c` (near black)
- Header: `#e8e8e0` (warm beige)
- Borders: `#d4d4c8` (soft tan)

**Dark Mode:**
- Background: `#000000` (black)
- Text: `#ffffff` (white)
- Header: `#1f2937` (gray-800)
- Borders: `#374151` (gray-700)

**Header:** Consistent dark gray (`bg-gray-800`) in both themes

### Component Patterns

**Reactive Components:**
- Components that display accent colors must be separate components
- Use `useTheme()` hook to get current `accentColor`
- Apply `accentColorClasses[accentColor]` for dynamic colors
- Examples: HelpContent, MarkdownContent

**Why:** React stores command output in state. If colors are hardcoded, they won't update when user changes theme.

## Environment Variables

`.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Build & Deployment

- Build: `npm run build`
- Dev: `npm run dev`
- Linting enforced (no unused variables, proper escaping)
- Deployed to Vercel with automatic deployments from main branch

## Known Patterns

- All markdown headers styled with accent color
- URLs auto-detected and made clickable
- Placeholder text adapts to theme
- System theme detected on first load
- Command history navigable with arrow keys
- Images load with animation, auto-sized to terminal width

## Future Enhancements

- Projects command with Supabase integration
- Blog command with markdown posts
- Edge Functions for external API integration (Google Maps, IMDb)
- Separate blog post pages at `/blog/[slug]`
- API caching table for third-party data
