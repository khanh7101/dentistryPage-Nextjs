// lib/utils/seo.ts
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_CONFIG } from '@/lib/config/constants';
import { Locale } from '@/lib/types/common';

type GenerateSEOMetadataParams = {
  locale: Locale;
  namespace: string; // ví dụ: 'seo.home', 'seo.about'
  path?: string; // đường dẫn cho canonical URL
  image?: string; // Optional OG image URL
};

/**
 * Get base URL for the site
 * Note: This runs on server-side, so we use env variable
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://passiondental.vn';
}

/**
 * Helper function để generate metadata cho tất cả các pages
 * Sử dụng namespace trong messages để lấy title, description
 */
export async function generateSEOMetadata({
  locale,
  namespace,
  path,
  image,
}: GenerateSEOMetadataParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const baseUrl = getBaseUrl();

  // Tự động tạo canonical URL từ path hoặc namespace
  const canonicalPath = path || namespace.replace('seo.', '/');
  const fullUrl = `${baseUrl}/${locale}${canonicalPath}`;

  // Default OG image if not provided
  const ogImage = image || `${baseUrl}/images/brand/logo.png`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: fullUrl,
      languages: {
        vi: `${baseUrl}/vi${canonicalPath}`,
        en: `${baseUrl}/en${canonicalPath}`,
      },
    },
    // Open Graph (cho Facebook, LinkedIn, etc.)
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Additional metadata
    metadataBase: new URL(baseUrl),
  };
}

