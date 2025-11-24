'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-loaded version of AllCarouselProps for better code splitting
 */
export default dynamic(() => import('./AllCarouselProps'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-pulse text-slate-400">Loading...</div>
    </div>
  ),
  ssr: true,
});

