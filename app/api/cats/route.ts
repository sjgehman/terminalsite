import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const catsDirectory = path.join(process.cwd(), 'public', 'cats');

    // Read all files in the cats directory
    const files = fs.readdirSync(catsDirectory);

    // Filter for image files (excluding HEIC - should be pre-converted)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: 'No cat images found' }, { status: 404 });
    }

    // Select a random image
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    // Add cache-busting timestamp to ensure fresh images
    const cacheBuster = Date.now();

    return NextResponse.json(
      { image: `/cats/${randomImage}?t=${cacheBuster}` },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error loading cat images:', error);
    return NextResponse.json({ error: 'Failed to load cat images' }, { status: 500 });
  }
}
