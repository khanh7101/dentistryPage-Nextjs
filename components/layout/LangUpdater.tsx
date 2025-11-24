'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

/**
 * Client component để update lang attribute của html tag
 * Vì root layout là server component và không thể dynamic lang
 */
export default function LangUpdater() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

