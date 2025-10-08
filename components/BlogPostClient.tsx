'use client';

import BlogHeader from './BlogHeader';
import MarkdownContent from './MarkdownContent';
import { useTheme } from '@/context/ThemeContext';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string;
  content: string;
}

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-[#e8e8e0] text-[#2c2c2c]'}`}>
      <div className="max-w-4xl mx-auto">
        <BlogHeader backLink="/blog" backText="← Back to Blog" />

        <article className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 font-mono">{post.title}</h1>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>{post.date}</span>
              {post.tags && <span className="ml-4">{post.tags}</span>}
            </div>
          </header>

          <MarkdownContent content={post.content} />
        </article>
      </div>
    </div>
  );
}
