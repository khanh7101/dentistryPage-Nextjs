'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-loaded version of CustomerImagesCarousel for better code splitting
 */
export default dynamic(() => import('./CustomerImagesCarousel'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="animate-pulse text-slate-400">Loading carousel...</div>
    </div>
  ),
  ssr: true,
});

