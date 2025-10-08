import { NextResponse } from 'next/server';
import { getAbout, getResume, getContact } from '@/lib/content';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let content: string;

    switch (slug) {
      case 'about':
        content = getAbout();
        break;
      case 'resume':
        content = getResume();
        break;
      case 'contact':
        content = getContact();
        break;
      default:
        return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
