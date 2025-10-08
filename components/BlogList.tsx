'use client';

import Link from 'next/link';
import { useTheme, accentColorClasses } from '@/context/ThemeContext';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const { theme, accentColor } = useTheme();
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-[#2c2c2c]';
  const secondaryText = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  if (posts.length === 0) {
    return <p className={secondaryText}>No blog posts yet.</p>;
  }

  return (
    <div className="space-y-3">
      <p className={`${accentColorClasses[accentColor]} font-bold`}>Recent Blog Posts:</p>
      {posts.slice(0, 5).map((post, index) => (
        <div key={post.slug} className="ml-4 space-y-1">
          <div className="flex items-start gap-2">
            <span className={secondaryText}>{index + 1}.</span>
            <div className="flex-1 break-words">
              <Link
                href={`/blog/${post.slug}`}
                className={`${accentColorClasses[accentColor]} underline hover:opacity-80`}
                target="_blank"
              >
                {post.title}
              </Link>
              <span className={`${secondaryText} text-sm ml-2`}>({post.date})</span>
            </div>
          </div>
          {post.tags && (
            <div className={`${secondaryText} text-sm ml-6`}>{post.tags}</div>
          )}
        </div>
      ))}
      {posts.length > 5 && (
        <p className={`${secondaryText} ml-4 mt-2`}>
          ... and {posts.length - 5} more
        </p>
      )}
      <p className={`${textColor} mt-4`}>
        Visit{' '}
        <Link
          href="/blog"
          className={`${accentColorClasses[accentColor]} underline`}
          target="_blank"
        >
          /blog
        </Link>
        {' '}to see all posts
      </p>
    </div>
  );
}
