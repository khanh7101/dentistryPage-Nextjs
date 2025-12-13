'use client';

import {useTranslations} from 'next-intl';
import {useState, useEffect} from 'react';
import AllCarouselProps from '@/components/AllCarouselProps.lazy';
import {customReviewImage} from '@/lib/utils/assetMaps';
import {useViewport} from '@/lib/utils/useViewport';

export default function CustomerImagesCarousel() {
  const t = useTranslations('home');
  const {width} = useViewport();
  const [pageSize, setPageSize] = useState(3); // Default to 3 for consistent SSR

  useEffect(() => {
    // Only update after hydration to avoid mismatch
    if (width >= 1400) {
      setPageSize(4); // lg and up
    } else if (width >= 768) {
      setPageSize(3); // sm to md
    } else {
      setPageSize(2); // below sm
    }
  }, [width]);

  return (
    <AllCarouselProps
      pageSize={pageSize}
      aspectClass="aspect-square"
      source={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) =>
        customReviewImage(`${n}.jpg`)
      )}
    />
  );
}

