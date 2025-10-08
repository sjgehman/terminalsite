import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import convert from 'heic-convert';

export async function GET() {
  try {
    const catsDirectory = path.join(process.cwd(), 'public', 'cats');
    const convertedDirectory = path.join(process.cwd(), 'public', 'cats', 'converted');

    // Ensure converted directory exists
    if (!fs.existsSync(convertedDirectory)) {
      fs.mkdirSync(convertedDirectory, { recursive: true });
    }

    // Read all files in the cats directory
    const files = fs.readdirSync(catsDirectory);

    // Filter for image files including HEIC
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
    });

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: 'No cat images found' }, { status: 404 });
    }

    // Select a random image
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    const ext = path.extname(randomImage).toLowerCase();

    let finalImagePath = randomImage;

    // Convert HEIC to JPG if needed
    if (ext === '.heic') {
      const baseName = path.basename(randomImage, ext);
      const jpgFileName = `${baseName}.jpg`;
      const jpgPath = path.join(convertedDirectory, jpgFileName);

      // Only convert if JPG doesn't exist
      if (!fs.existsSync(jpgPath)) {
        const heicBuffer = fs.readFileSync(path.join(catsDirectory, randomImage));
        const outputBuffer = await convert({
          buffer: heicBuffer,
          format: 'JPEG',
          quality: 0.9,
        });
        fs.writeFileSync(jpgPath, outputBuffer as Buffer);
      }

      finalImagePath = `converted/${jpgFileName}`;
    }

    // Add cache-busting timestamp to ensure fresh images
    const cacheBuster = Date.now();

    return NextResponse.json(
      { image: `/cats/${finalImagePath}?t=${cacheBuster}` },
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
