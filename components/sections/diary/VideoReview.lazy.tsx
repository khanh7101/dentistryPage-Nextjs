'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-loaded version of VideoReview for better code splitting
 */
export default dynamic(() => import('./VideoReview'), {
  loading: () => (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-5 max-w-4xl mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="aspect-[9/16] bg-slate-200 animate-pulse rounded-xl"
        />
      ))}
    </div>
  ),
  ssr: false, // VideoReview uses iframe, can skip SSR
});

