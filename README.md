# Terminal Portfolio

An interactive terminal-style portfolio website built with Next.js and Supabase. Experience my portfolio through a command-line interface with dynamic content loading and theme customization.

## ✨ Features

- **🖥️ Interactive Terminal Interface**: Command-line experience in your browser
- **🎨 Theme Customization**: Toggle between light/dark modes and choose from 5 accent colors
- **📝 Markdown Content**: Easy-to-edit content files for About, Resume, and Contact
- **🔗 Clickable Links**: Automatic URL detection and linking
- **🐱 Image Display**: Random image viewer with the `cat` command
- **📱 Fully Responsive**: Works seamlessly on mobile and desktop
- **⚡ Fast & Lightweight**: Built with Next.js and Turbopack
- **♿ Accessible**: ARIA labels and keyboard navigation support

## 🎯 Available Commands

Type these commands in the terminal:

- `help` - Show available commands
- `clear` - Clear the terminal screen
- `about` - Learn about me
- `resume` - View my experience and skills
- `contact` - Get my contact information
- `cat` - Display a cat picture

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Storage, Edge Functions)
- **Deployment**: [Vercel](https://vercel.com/)
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database features)

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

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customizing Content

All content is stored in markdown files in the `content/` directory:

- `content/about.md` - Your bio and introduction
- `content/resume.md` - Your experience, education, and skills
- `content/contact.md` - Contact information and links

Simply edit these files to update your portfolio content!

### Adding Cat Images

1. Add images to `public/cats/` folder
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
3. The `cat` command will randomly display one

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
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Terminal.tsx       # Main terminal component
│   ├── Input.tsx          # Command input
│   ├── Output.tsx         # Command output
│   ├── ThemeSwitcher.tsx  # Theme controls
│   └── ...
├── content/               # Markdown content files
├── context/               # React context (theme)
├── lib/                   # Utility functions
├── public/                # Static assets
│   └── cats/             # Random images
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

---

Made with ❤️ using Next.js and Supabase
