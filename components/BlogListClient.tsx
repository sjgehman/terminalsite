'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import BlogHeader from './BlogHeader';
import { useTheme } from '@/context/ThemeContext';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string;
  excerpt: string;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const { theme } = useTheme();
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        // Split tags by spaces and clean them
        post.tags.split(/\s+/).forEach(tag => {
          const cleanTag = tag.trim();
          if (cleanTag) tagSet.add(cleanTag);
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = posts.filter(post =>
        post.tags && post.tags.includes(selectedTag)
      );
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [posts, selectedTag, sortOrder]);

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-[#e8e8e0] text-[#2c2c2c]'}`}>
      <div className="max-w-4xl mx-auto">
        <BlogHeader backLink="/" backText="← Back to Terminal" />

        <h1 className="text-4xl font-bold mb-8 font-mono">Blog Posts</h1>

        {/* Filters and Sort Controls */}
        <div className="mb-8 flex flex-wrap gap-4 items-center pb-4 border-b border-gray-300 dark:border-gray-700">
          {/* Sort Order */}
          <div className="flex items-center gap-2">
            <label className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Sort:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className={`font-mono text-sm px-3 py-1 rounded border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-[#2c2c2c]'
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2">
              <label className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Tag:
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className={`font-mono text-sm px-3 py-1 rounded border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-[#2c2c2c]'
                }`}
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          )}

          {/* Results count */}
          <div className={`text-sm font-mono ml-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'post' : 'posts'}
          </div>
        </div>

        {filteredAndSortedPosts.length === 0 ? (
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {posts.length === 0 ? 'No blog posts yet.' : 'No posts match the selected filters.'}
          </p>
        ) : (
          <div className="space-y-8">
            {filteredAndSortedPosts.map(post => (
              <article key={post.slug} className={`border-b pb-6 ${theme === 'dark' ? 'border-gray-700' : 'border-[#d4d4c8]'}`}>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-2 hover:underline font-mono">
                    {post.title}
                  </h2>
                </Link>
                <div className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>{post.date}</span>
                  {post.tags && <span className="ml-4">{post.tags}</span>}
                </div>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#4c4c4c]'}>{post.excerpt}...</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`hover:underline text-sm mt-2 inline-block ${theme === 'dark' ? 'text-gray-400' : 'text-[#4c4c4c]'}`}
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
