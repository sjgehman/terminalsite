import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Store shuffled deck and current index in memory
// In production, this resets when the serverless function cold starts
let imageDeck: string[] = [];
let currentIndex = 0;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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

    // Initialize or reset the deck when empty or when file list changes
    if (imageDeck.length === 0 || currentIndex >= imageDeck.length) {
      imageDeck = shuffleArray(imageFiles);
      currentIndex = 0;
    }

    // Get next image from the shuffled deck
    const selectedImage = imageDeck[currentIndex];
    currentIndex++;

    // Add cache-busting timestamp to ensure fresh images
    const cacheBuster = Date.now();

    return NextResponse.json(
      { image: `/cats/${selectedImage}?t=${cacheBuster}` },
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
