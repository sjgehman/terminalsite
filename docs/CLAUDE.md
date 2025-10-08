# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive terminal-style portfolio website built with Next.js. The site simulates a command-line interface where users can execute commands to view content stored in markdown files, display random images, and access a standalone blog with filtering and sorting.

**Key Technologies:**
- Frontend: Next.js 15 (React) with TypeScript and Tailwind CSS v4
- Markdown: react-markdown and gray-matter
- Analytics: Vercel Analytics
- Deployment: Vercel
- Package Manager: npm

**Note:** Supabase was removed - all content is now markdown-based

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

**Terminal Commands (Active):**
- `help` - Displays available commands
- `clear` - Clears terminal history
- `about` - Loads content from `content/about.md`
- `resume` - Loads content from `content/resume.md`
- `contact` - Loads content from `content/contact.md`
- `cat` - Displays random image from `public/cats/` folder

**Terminal Commands (Commented Out - Ready to Enable):**
- `blog` - Shows recent blog posts with links to standalone blog
- `projects` - Loads content from `content/projects.md`

**Content System:**
- Markdown files in `content/` directory
- API route at `/api/content/[slug]` for serving about/resume/contact/projects
- API route at `/api/blog` for fetching blog post metadata
- MarkdownContent.tsx - Renders markdown with clickable links, word-breaking for long URLs
- HelpContent.tsx - Dynamic help menu
- Auto-linkification of URLs in markdown

**Blog System:**
- Standalone blog at `/blog` with listing page
- Individual posts at `/blog/[slug]`
- Filtering by tags, sorting by date (newest/oldest)
- Shared theme context with terminal
- BlogListClient.tsx - Blog listing with filters
- BlogPostClient.tsx - Individual post view
- Blog posts stored in `content/blog/*.md` with frontmatter

**Image Display:**
- API route at `/api/cats` for random image selection
- CatImage.tsx - Displays images with loading animation
- Supports .jpg, .jpeg, .png, .gif, .webp formats

### 🚧 Future Features (Commented Out)

**Terminal Commands Awaiting Content:**
- `blog` command - Built and ready, commented out until real blog posts exist
- `projects` command - Built and ready, commented out until real projects exist
- To enable: Uncomment in `components/Terminal.tsx` and `components/HelpContent.tsx`

**Why Commented Out:**
- Waiting for real content to replace placeholder posts
- All functionality is complete and tested
- Can be enabled by uncommenting ~10 lines of code

## File Structure

```
terminalsite/
├── app/
│   ├── api/
│   │   ├── blog/route.ts           # Blog posts API
│   │   ├── cats/route.ts           # Random image API
│   │   └── content/[slug]/route.ts # Content loading API
│   ├── blog/
│   │   ├── [slug]/page.tsx        # Individual blog post page
│   │   ├── layout.tsx             # Blog layout with theme
│   │   └── page.tsx               # Blog listing page
│   ├── layout.tsx                  # Root layout with ThemeProvider
│   └── page.tsx                    # Main page with Terminal
├── components/
│   ├── BlogHeader.tsx             # Blog page header with theme switcher
│   ├── BlogList.tsx               # Blog list for terminal (commented out)
│   ├── BlogListClient.tsx         # Blog listing with filters/sort
│   ├── BlogPostClient.tsx         # Individual blog post view
│   ├── CatImage.tsx               # Image display component
│   ├── HelpContent.tsx            # Help command output
│   ├── Input.tsx                  # Command input with history
│   ├── MarkdownContent.tsx        # Markdown renderer with links
│   ├── Output.tsx                 # Command output renderer
│   ├── Terminal.tsx               # Main terminal component
│   ├── ThemeSwitcher.tsx          # Theme/color controls
│   └── ThemeWrapper.tsx           # Applies dark class to DOM
├── content/                        # Editable markdown files
│   ├── blog/                      # Blog posts with frontmatter
│   │   ├── building-my-portfolio.md
│   │   ├── first-blog-post.md
│   │   └── learning-typescript.md
│   ├── about.md
│   ├── contact.md
│   ├── projects.md
│   └── resume.md
├── context/
│   └── ThemeContext.tsx           # Theme state management
├── lib/
│   └── content.ts                 # File reading utilities
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

`.env.local` is currently empty - no environment variables required.

Previously used for Supabase (now removed).

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

## Enabling Commented Features

To enable blog and projects commands in the terminal:

1. **Terminal.tsx**: Uncomment the blog and projects case blocks (lines ~133-160)
2. **HelpContent.tsx**: Uncomment the blog and projects help lines (lines ~17-18)
3. Test with `blog` and `projects` commands

## Future Enhancements

- Edge Functions for external API integration (Google Maps, IMDb, etc.)
- Project detail pages at `/projects/[slug]`
- Search functionality for blog posts
- RSS feed for blog
- Blog post series/categories
