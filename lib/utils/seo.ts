// lib/utils/seo.ts
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_CONFIG } from '@/lib/config/constants';
import { Locale } from '@/lib/types/common';

type GenerateSEOMetadataParams = {
  locale: Locale;
  namespace: string; // ví dụ: 'seo.home', 'seo.about'
  path?: string; // đường dẫn cho canonical URL (ví dụ '/services')
  image?: string; // Optional OG image URL (relative hoặc absolute)
};

/** Production base URL — vẫn sử dụng env nếu set, fallback về production domain */
function getBaseUrl(): string {
  const productionUrl = 'https://www.passiondental.com.vn'; // sửa nếu cần https://www.passiondental.vn
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl;
  }
  return productionUrl;
}

/** Ensure a path starts with a single leading slash and has no trailing slash (except root) */
function normalizePath(p: string): string {
  if (!p) return '/';
  let out = p.trim();
  if (!out.startsWith('/')) out = `/${out}`;
  // remove trailing slash except if it's root
  if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}

/** Convert possible relative image path to absolute URL */
function resolveImageUrl(baseUrl: string, image?: string) {
  if (!image) return undefined;
  // If image already absolute, keep it
  if (/^https?:\/\//i.test(image)) return image;
  // Normalize potential leading slash
  const imgPath = image.startsWith('/') ? image : `/${image}`;
  return new URL(imgPath, baseUrl).href;
}

/**
 * Generate metadata used by Next.js (Metadata type)
 */
export async function generateSEOMetadata({
  locale,
  namespace,
  path,
  image,
}: GenerateSEOMetadataParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace }).catch(() => (key: string) => '');
  const baseUrl = getBaseUrl();

  // build canonical path:
  // if path provided use đó, else convert namespace 'seo.home' -> '/home' (hoặc '/' nếu namespace là 'seo')
  const namespacePart = namespace.replace(/^seo\./, '');
  const derivedPath =
    namespacePart === '' || namespacePart === 'home' ? '/' : `/${namespacePart.replace(/\./g, '/')}`;
  const canonicalPath = normalizePath(path ?? derivedPath);

  // fullUrl for this locale, e.g. https://passiondental.vn/vi/... hoặc /en/...
  const fullUrl = new URL(`/${locale}${canonicalPath}`, baseUrl).href;

  // default OG image (nên đặt file vào public/images/og/og-image.jpg)
  const defaultOg = '/images/og/og-image.jpg';
  const ogImage = resolveImageUrl(baseUrl, image ?? defaultOg) ?? new URL(defaultOg, baseUrl).href;

  // translations with safe fallback
  // getTranslations returns a function t(key) -> string
  const title = (typeof t === 'function' ? t('title') : '') || 'Nha khoa Passion Đà Nẵng - Passion Dental Clinic';
  const description =
    (typeof t === 'function' ? t('description') : '') ||
    'Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.';

  // alternate language URLs (use canonicalPath without locale)
  const canonicalUrl = new URL(`/${locale}${canonicalPath}`, baseUrl).href;
  const viUrl = new URL(`/vi${canonicalPath}`, baseUrl).href;
  const enUrl = new URL(`/en${canonicalPath}`, baseUrl).href;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: viUrl,
        en: enUrl,
      },
    },

    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      url: fullUrl,
      siteName: SITE_CONFIG?.name ?? 'Passion Dental Clinic',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

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
  };
}
