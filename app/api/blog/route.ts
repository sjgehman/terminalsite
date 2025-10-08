import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');

    if (!fs.existsSync(blogDir)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

    const posts = files.map(filename => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date || 'No date',
        tags: data.tags || '',
      };
    });

    // Sort by date (newest first)
    const sorted = posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json({ posts: sorted });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
