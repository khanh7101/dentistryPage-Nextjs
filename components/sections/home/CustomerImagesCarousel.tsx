'use client';

import {useTranslations} from 'next-intl';
import AllCarouselProps from '@/components/AllCarouselProps.lazy';
import {customReviewImage} from '@/lib/utils/assetMaps';
import {useViewport} from '@/lib/utils/useViewport';

export default function CustomerImagesCarousel() {
  const t = useTranslations('home');
  const {width} = useViewport();

  const getPageSize = () => {
    if (width >= 1400) return 4; // lg and up
    if (width >= 768) return 3; // sm to md
    return 2; // below sm
  };

  return (
    <AllCarouselProps
      pageSize={getPageSize()}
      aspectClass="aspect-square"
      source={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) =>
        customReviewImage(`${n}.jpg`)
      )}
    />
  );
}

