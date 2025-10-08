import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const catsDirectory = path.join(process.cwd(), 'public', 'cats');

    // Read all files in the cats directory
    const files = fs.readdirSync(catsDirectory);

    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: 'No cat images found' }, { status: 404 });
    }

    // Select a random image
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    return NextResponse.json({ image: `/cats/${randomImage}` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load cat images' }, { status: 500 });
  }
}
