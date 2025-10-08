'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CatImageProps {
  imagePath: string;
}

export default function CatImage({ imagePath }: CatImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="my-4">
      {!loaded && <p className="text-gray-400 animate-pulse">Loading cat image...</p>}
      <div className="relative max-w-md">
        <Image
          src={imagePath}
          alt="Random cat"
          width={500}
          height={500}
          className={`rounded-lg border-2 border-gray-700 transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
          unoptimized
        />
      </div>
    </div>
  );
}
