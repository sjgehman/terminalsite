1. Project Blueprint: Interactive Terminal Portfolio
Core Objective: To create a unique personal portfolio website that simulates a command-line terminal, showcasing projects and skills by displaying content from a database and integrating with external APIs.

Key Features:

Third-Party API Integration:

Connect to Google Maps to display a list of visited locations.

Connect to an IMDb API/service to display a list of watched movies.

Dynamic Content Modules: Commands like projects, resume, and about will display specific, pre-defined content.

Markdown-Powered Blog: A blog command will list recent posts. Posts are viewable in the terminal and on separate, traditionally-styled web pages.

Asset Display: The ability to render images directly in the terminal output for commands like cat.

Theme Customization: Users can switch between light and dark modes and change the primary text color.

Command Discovery: A help command will provide a user-friendly list of all available commands and their functions.

Target User: Recruiters, hiring managers, fellow developers, and professional contacts who would appreciate a creative, technical, and memorable presentation of your skills and work.

2. Recommended Technology Stack
This stack is purpose-built for a secure, high-performance, and scalable interactive application that relies on third-party data.

Frontend: Next.js (React) - Ideal for its performance and hybrid rendering capabilities. The main application shell will be lightning-fast, and it can seamlessly communicate with our backend functions.

Styling: Tailwind CSS - Its utility-first approach is perfect for crafting the precise, pixel-perfect terminal interface you envision, while ensuring it's fully responsive.

Backend & Database (BaaS): Supabase - This is the heart of your dynamic content and security model.

Database: Supabase Postgres will store your blog posts, project details, and potentially cache data from external APIs to improve performance.

Storage: Supabase Storage will host your images (cat.png) and any other static assets (e.g., a downloadable PDF resume).

Serverless Logic: Supabase Edge Functions (Deno) are now a critical component. They will act as a secure backend proxy to communicate with Google Maps and IMDb, protecting your secret API keys.

Deployment: Vercel - Offers a world-class, zero-configuration deployment experience for Next.js and integrates flawlessly with Supabase.

3. Frontend Architecture & UI/UX Design
Design Philosophy: Mobile-First & Digital Native. The terminal experience must be fluid and functional on any screen size. We'll add loading states to ensure a smooth user experience when fetching data from APIs.

Core Layout:

Full-Screen Terminal: The UI is the terminal. It will consist of a scrollable output history and a persistent input prompt.

UX Consideration: When a command that calls an API (e.g., locations, movies) is run, the UI must immediately display a loading state (e.g., "Fetching data...") to provide feedback to the user while the backend function is working.

Component Strategy: A modular component architecture is key.

Terminal.tsx: The main stateful component managing command history, API loading states, and theme settings.

Input.tsx: Handles user input, command submission, and potentially command history (up/down arrows).

Output.tsx: Renders various output types: plain text, lists, error messages, images, and loading indicators.

BlogPage.tsx: The separate, reader-friendly page for displaying full blog posts, located at /blog/[slug].

State Management: React Hooks (useState, useContext) are perfectly suited. A global context can manage the theme, while the main Terminal component will manage command history and API call statuses (isLoading, error, data).

4. Backend & Supabase Integration Plan
Database Schema: Simple, clean, and effective.

projects (id, title, description, repo_url, live_url, technologies)

blog_posts (id, slug, title, content_markdown, is_published, published_at)

(Optional but Recommended) api_cache (id, source_api, data, expires_at) - A table to store results from Google/IMDb to reduce API calls, improve speed, and avoid rate limits.

Serverless Edge Functions: This is your secure gateway to the outside world.

get-locations:

Triggered by the locations command from the frontend.

Securely uses a Google Maps API key (stored as a secret in Supabase) to fetch your saved location data.

Processes the raw data into a clean list of cities or countries.

Returns the list to the frontend.

get-movies:

Triggered by the movies command.

Securely uses your IMDb-related API key to fetch your watched list.

Formats the data into a readable list.

Returns the list to the frontend.

Data Access & Storage:

The frontend will call the Edge Functions for API data.

For content like blogs and projects, the frontend will query the Supabase database directly using supabase-js, protected by RLS.

Images for commands like cat will be retrieved from a public Supabase Storage bucket.

5. Security & Programming Best Practices
With API keys in play, this section is more critical than ever.

Data Security (Supabase):

Enable Row Level Security (RLS): This is mandatory. Set up read-only policies for your projects and blog_posts tables to prevent any unauthorized modification from the client-side.

Policy: Allow public SELECT operations on all tables, but create no policies for INSERT, UPDATE, or DELETE.

Application Security:

API Key Management: This is your #1 priority. Your Google Maps and IMDb API keys MUST be stored as Secrets within your Supabase project's Edge Functions settings. They must NEVER be placed in your Next.js frontend code or .env.local file.

Environment Variables: Your .env.local file in Next.js should only contain your public Supabase URL and anon key (prefixed with NEXT_PUBLIC_).

Input Validation: Your command parser on the frontend should gracefully handle unknown commands.

API Security: Your Edge Functions are your private API. They are invoked from your trusted frontend application.

Dependency Management: Regularly run npm audit to keep your project's dependencies secure.

Programming Best Practices:

Modularity: Keep your command logic, components, and API-calling functions in separate, well-organized files.

DRY (Don't Repeat Yourself): Abstract the logic for calling your Edge Functions into a reusable helper function on the frontend.

Robust Error Handling: Wrap all API and database calls in try...catch blocks. If an Edge Function or database query fails, display a clear error message in the terminal instead of crashing.

6. Next Steps
Here is your updated, actionable roadmap:

Set up Supabase Project: Create your project, design the database tables (projects, blog_posts), and create a public Storage bucket for your images.

Initialize Next.js App: Run npx create-next-app@latest with Tailwind CSS.

Configure Environment: Create your .env.local file in Next.js and add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

Secure Your API Keys: Obtain your API keys from Google and IMDb. In your Supabase project dashboard, navigate to the Edge Functions section and add these keys as Secrets.

Develop Edge Functions: Write the Deno/TypeScript code for your get-locations and get-movies functions. Test them locally using the Supabase CLI, then deploy them.

Enable RLS: Go to the Supabase dashboard and activate RLS for your tables, adding the secure, read-only policies.

Build the Frontend: Develop the core terminal UI in Next.js. Implement the command parser and write the functions that call your new Supabase Edge Functions to fetch and display the dynamic data.