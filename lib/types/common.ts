/**
 * Common type definitions
 */

export type Locale = 'vi' | 'en';

export type ImageGroup =
  | 'favoriteService'
  | 'customReview'
  | 'home'
  | 'brand'
  | 'about'
  | 'diary'
  | 'booking'
  | 'service'
  | 'general'
  | 'porcelain'
  | 'orthodontic'
  | 'implant';

export interface SEOConfig {
  locale: Locale;
  namespace: string;
  path?: string;
}

export interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

