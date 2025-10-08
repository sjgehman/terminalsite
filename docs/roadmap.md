# Terminal Portfolio - Roadmap

## Project Status

### ✅ Phase 1: Core Terminal (COMPLETE)

**Terminal Interface:**
- [x] Interactive command-line interface
- [x] Command history with arrow key navigation
- [x] Auto-scrolling output display
- [x] Responsive layout (mobile full-screen, desktop centered)
- [x] Modern header design without Apple-style buttons

**Theme System:**
- [x] Dark/Light mode toggle with animated SVG icons
- [x] System preference detection on load
- [x] 5 accent colors (orange, green, cyan, purple, pink)
- [x] Claude-inspired warm color palette for light mode
- [x] Consistent dark header across both themes
- [x] Dropdown color selector
- [x] Dynamic accent color updates for all content

**Commands:**
- [x] `help` - Show available commands
- [x] `clear` - Clear terminal screen
- [x] `about` - Display bio from markdown
- [x] `resume` - Display resume from markdown
- [x] `contact` - Display contact info from markdown
- [x] `cat` - Display random image

**Content System:**
- [x] Markdown files for easy content editing
- [x] API routes for content serving
- [x] Auto-linkification of URLs
- [x] Markdown header styling with accent colors
- [x] Reactive components for theme changes

**Image Display:**
- [x] Random image selection from folder
- [x] Loading animation
- [x] Responsive image sizing
- [x] Support for multiple formats (.jpg, .png, .gif, .webp)

**Technical:**
- [x] Next.js 15 with TypeScript
- [x] Tailwind CSS styling
- [x] Supabase client setup
- [x] Vercel deployment
- [x] Linting and build optimization
- [x] Custom favicon with `</>` icon

### 🚧 Phase 2: Database Integration (PLANNED)

**Supabase Setup:**
- [x] Database schema created (`projects`, `blog_posts`)
- [x] RLS policies configured
- [ ] Seed data for projects
- [ ] Seed data for blog posts

**Projects Command:**
- [ ] Fetch projects from Supabase
- [ ] Display project list with technologies
- [ ] Show project details (description, links)
- [ ] Filter/search functionality

**Blog Command:**
- [ ] Fetch published blog posts
- [ ] Display post list
- [ ] Show individual post content
- [ ] Separate blog page at `/blog/[slug]`

### 📋 Phase 3: Advanced Features (FUTURE)

**External API Integration:**
- [ ] Supabase Edge Functions setup
- [ ] Google Maps API for locations
- [ ] IMDb API for watched movies
- [ ] API caching table
- [ ] Loading states for API calls

**Enhanced Content:**
- [ ] Downloadable resume PDF
- [ ] Project images/screenshots
- [ ] Blog post images
- [ ] Code syntax highlighting in blog

**User Experience:**
- [ ] Command autocomplete
- [ ] Tab completion
- [ ] Custom prompts
- [ ] ASCII art welcome message
- [ ] Easter eggs

**Analytics & SEO:**
- [ ] Command usage tracking
- [ ] SEO optimization
- [ ] Open Graph tags
- [ ] Sitemap generation

## Tech Stack

**Current:**
- Next.js 15 (React, TypeScript)
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (hosting)

**Future Additions:**
- Supabase Edge Functions (Deno)
- External APIs (Google Maps, IMDb)

## Architecture Decisions

### Why Markdown Files?
- Easy to edit without touching code
- Version controlled
- Fast to load
- No database needed for static content

### Why Separate Components for Output?
- React stores command history in state
- Hardcoded colors won't update when theme changes
- Components re-render with current theme context

### Why API Routes for Content?
- Server-side file reading
- Consistent error handling
- Easy to extend with database later

### Why Supabase?
- PostgreSQL database
- Row Level Security built-in
- Edge Functions for API proxying
- Storage for images/assets
- Real-time capabilities for future

## Design Philosophy

**Terminal-First:**
- Commands are the primary navigation
- Keyboard-friendly experience
- Classic Unix terminal feel

**Mobile-Responsive:**
- Full-screen on mobile
- Touch-friendly controls
- Readable on all screen sizes

**Accessible:**
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- High contrast modes

**Content-Editable:**
- Non-technical users can update content
- Markdown is human-readable
- No code changes needed

## Development Priorities

1. **Content Quality** - Well-written, informative markdown files
2. **Performance** - Fast loading, optimized images
3. **User Experience** - Intuitive commands, helpful errors
4. **Maintainability** - Clean code, good documentation
5. **Extensibility** - Easy to add new commands/features

## Known Issues & Limitations

- Projects and Blog commands are placeholders (commented out)
- No database content yet (only markdown files)
- Cat command requires manual image uploads
- No command history persistence (resets on refresh)

## Future Considerations

- PWA support for offline access
- Command aliases (e.g., `ls` for `help`)
- Multi-language support
- Custom command creation via UI
- Export terminal session to text file
