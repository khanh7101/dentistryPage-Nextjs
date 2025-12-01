'use client';

import { diaryImage } from '@/lib/utils/assetMaps';
import { ImageWithPreview } from '@/lib/utils/imagePreview';
import { useViewport } from '@/lib/utils/useViewport';

type ResponsivePhotoGridProps = {
  photos: string[];
};

export default function ResponsivePhotoGrid({ photos }: ResponsivePhotoGridProps) {
  const { width } = useViewport();
  const isMobile = width < 768; // md breakpoint

  // Adjust length based on viewport
  const displayPhotos = photos.slice(0, isMobile ? 8 : 9);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
      {displayPhotos.map((file) => {
        // Extract filename without extension for alt text
        const filename = file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        return (
          <div key={file} className="w-full">
            <ImageWithPreview
              src={diaryImage(file)}
              alt={filename || 'Diary photo'}
              previewMode="fit"
              className="aspect-square w-full object-cover shadow-sm cursor-zoom-in"
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}

