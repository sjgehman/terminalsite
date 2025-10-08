# Terminal Portfolio

An interactive terminal-style portfolio website built with Next.js. Experience my portfolio through a command-line interface with dynamic content loading, theme customization, and a standalone blog.

## ✨ Features

- **🖥️ Interactive Terminal Interface**: Command-line experience in your browser
- **🎨 Theme Customization**: Toggle between light/dark modes and choose from 5 accent colors
- **📝 Markdown Content**: Easy-to-edit content files for About, Resume, Contact, and Projects
- **📰 Standalone Blog**: Full-featured blog with filtering, sorting, and individual post pages
- **🔗 Clickable Links**: Automatic URL detection and linking
- **🐱 Image Display**: Random image viewer with the `cat` command
- **📱 Fully Responsive**: Works seamlessly on mobile and desktop
- **⚡ Fast & Lightweight**: Built with Next.js 15 and Turbopack
- **♿ Accessible**: ARIA labels and keyboard navigation support

## 🎯 Terminal Commands

Type these commands in the terminal:

- `help` - Show available commands
- `clear` - Clear the terminal screen
- `about` - Learn about me
- `resume` - View my experience and skills
- `contact` - Get my contact information
- `cat` - Display a cat picture

## 📰 Blog

Access the blog directly at `/blog` to read articles with:
- **Filtering**: Filter posts by tags
- **Sorting**: Sort by newest or oldest first
- **Dark/Light Mode**: Shared theme with the terminal
- **Individual Posts**: Each post has its own page with full markdown rendering

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown) & [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/)
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sjgehman/terminalsite.git
   cd terminalsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customizing Content

All content is stored in markdown files in the `content/` directory:

### Terminal Content
- `content/about.md` - Your bio and introduction
- `content/resume.md` - Your experience, education, and skills
- `content/contact.md` - Contact information and links
- `content/projects.md` - List of projects with descriptions and links (commented out in terminal by default)

### Blog Posts
Blog posts are stored in `content/blog/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "March 10, 2025"
tags: "#tag1 #tag2 #tag3"
---

# Your Post Title

Your content here...
```

### Adding Images

1. **Cat Images**: Add to `public/cats/` folder (formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`)
2. **Blog Images**: Reference from `public/` or use external URLs in markdown

## 🎨 Theme Customization

The terminal supports:
- **Dark/Light Mode**: Click the sun/moon icon in the header
- **Accent Colors**: Choose from orange, green, cyan, purple, or pink
- **System Preference**: Automatically matches your OS theme on first load

## 🏗️ Project Structure

```
terminalsite/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── blog/         # Blog posts API
│   │   ├── cats/         # Cat images API
│   │   └── content/      # Content files API
│   ├── blog/             # Blog pages
│   │   ├── [slug]/       # Individual blog posts
│   │   └── page.tsx      # Blog listing
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Terminal home page
├── components/            # React components
│   ├── Terminal.tsx       # Main terminal component
│   ├── BlogListClient.tsx # Blog listing with filters
│   ├── BlogPostClient.tsx # Individual blog post
│   ├── Input.tsx          # Command input
│   ├── Output.tsx         # Command output
│   ├── ThemeSwitcher.tsx  # Theme controls
│   └── ...
├── content/               # Markdown content files
│   ├── blog/             # Blog post markdown files
│   ├── about.md          # About page
│   ├── contact.md        # Contact page
│   ├── projects.md       # Projects page
│   └── resume.md         # Resume page
├── context/               # React context (theme)
├── lib/                   # Utility functions
├── public/                # Static assets
│   └── cats/             # Random cat images
└── docs/                  # Documentation
```

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs via [Issues](https://github.com/sjgehman/terminalsite/issues)
- Suggest features
- Fork and adapt for your own portfolio!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👤 Author

**Sam Gehman**
- Email: samuel.gehman@kellogg.northwestern.edu
- GitHub: [@sjgehman](https://github.com/sjgehman)
- LinkedIn: [sgehman](https://www.linkedin.com/in/sgehman/)

## 🙏 Acknowledgments

- Built with guidance from [Claude Code](https://claude.ai/code)
- Terminal design inspired by classic Unix terminals
- Color palette inspired by Claude's interface

## 🔮 Future Features (Currently Commented Out)

The following features are built but commented out pending real content:
- **Terminal Blog Command**: Display recent blog posts in the terminal
- **Terminal Projects Command**: Show projects list in the terminal

To enable these features, uncomment the relevant sections in:
- `components/Terminal.tsx` (command handlers)
- `components/HelpContent.tsx` (help menu)

---

Made with ❤️ using Next.js
