# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive terminal-style portfolio website built with Next.js and Supabase. The site simulates a command-line interface where users can execute commands to view projects, blog posts, visited locations (via Google Maps API), and watched movies (via IMDb API).

**Key Technologies:**
- Frontend: Next.js (React) with Tailwind CSS
- Backend: Supabase (PostgreSQL database, Storage, Edge Functions)
- Deployment: Vercel
- Serverless: Supabase Edge Functions (Deno)

## Database Schema

**Core Tables:**
- `projects`: (id, title, description, repo_url, live_url, technologies)
- `blog_posts`: (id, slug, title, content_markdown, is_published, published_at)
- `api_cache` (optional): (id, source_api, data, expires_at) - For caching external API responses

**Security:**
- Row Level Security (RLS) is mandatory on all tables
- Only SELECT operations allowed publicly; no INSERT/UPDATE/DELETE from client

## Architecture

### Frontend Components
- `Terminal.tsx`: Main stateful component managing command history, API loading states, and theme
- `Input.tsx`: Handles user input and command submission with history navigation
- `Output.tsx`: Renders various output types (text, lists, errors, images, loading states)
- `BlogPage.tsx`: Separate reader-friendly page at `/blog/[slug]`

### Backend - Supabase Edge Functions
Two critical serverless functions act as secure API proxies:

1. **get-locations**:
   - Calls Google Maps API with securely stored key
   - Returns formatted list of visited locations

2. **get-movies**:
   - Calls IMDb API with securely stored key
   - Returns formatted list of watched movies

### State Management
- React Hooks (useState, useContext)
- Global context for theme management
- Terminal component manages command history and API states

## Security Requirements

**Critical:** API keys for Google Maps and IMDb MUST be stored as Supabase Edge Function Secrets, never in frontend code or `.env.local`.

**Frontend Environment Variables** (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Supabase Storage:**
- Public bucket for images and static assets
- Used for commands like `cat` to display images

## Development Setup

1. Initialize Next.js app with Tailwind CSS
2. Configure Supabase project with database tables and storage bucket
3. Set up Edge Functions and add API keys as Supabase Secrets
4. Enable RLS policies on all database tables
5. Test Edge Functions locally using Supabase CLI before deployment

## Key Features to Implement

- Dynamic command parser that calls appropriate data sources
- Loading states for API calls
- Theme customization (light/dark mode, text color)
- Image rendering in terminal output
- Markdown-powered blog with dual display (terminal + traditional web page)
- Mobile-first responsive design

## Programming Guidelines

- **Modularity**: Separate command logic, components, and API functions
- **Error Handling**: Wrap all API/database calls in try/catch, display clear terminal errors
- **DRY Principle**: Abstract Edge Function calling logic into reusable helpers
- **Input Validation**: Gracefully handle unknown commands in the parser
