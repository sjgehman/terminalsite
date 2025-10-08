import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogListClient from '@/components/BlogListClient';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string;
  excerpt: string;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract first paragraph as excerpt
    const excerpt = content
      .split('\n')
      .find(line => line.trim().length > 0 && !line.startsWith('#'))
      ?.substring(0, 150) || '';

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || 'No date',
      tags: data.tags || '',
      excerpt
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogListClient posts={posts} />;
}
