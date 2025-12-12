// lib/utils/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/lib/config/constants";
import { Locale } from "@/lib/types/common";

type GenerateSEOMetadataParams = {
  locale: Locale;
  namespace: string; // e.g. 'seo.home' or 'seo.services'
  path?: string; // canonical path like '/services'
  image?: string; // optional OG image (relative or absolute)
};

function getBaseUrl(): string {
  const productionUrl = "https://www.passiondental.com.vn";
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl;
  }
  return productionUrl;
}

function normalizePath(p: string): string {
  if (!p) return "/";
  let out = p.trim();
  if (!out.startsWith("/")) out = `/${out}`;
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

function resolveImageUrl(baseUrl: string, image?: string) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  const imgPath = image.startsWith("/") ? image : `/${image}`;
  return new URL(imgPath, baseUrl).href;
}

export async function generateSEOMetadata({
  locale,
  namespace,
  path,
  image,
}: GenerateSEOMetadataParams): Promise<Metadata> {
  // safe get translations; if missing, fallback to empty function
  const t = await getTranslations({ locale, namespace }).catch(() => (k: string) => "");
  const baseUrl = getBaseUrl();

  const namespacePart = namespace.replace(/^seo\./, "");
  const derivedPath =
    namespacePart === "" || namespacePart === "home" ? "/" : `/${namespacePart.replace(/\./g, "/")}`;
  const canonicalPath = normalizePath(path ?? derivedPath);

  const fullUrl = new URL(`/${locale}${canonicalPath}`, baseUrl).href;

  const defaultOg = "/images/brand/logo.png";
  const ogImage = resolveImageUrl(baseUrl, image ?? defaultOg) ?? new URL(defaultOg, baseUrl).href;

  const title = SITE_CONFIG.name;
  const description = SITE_CONFIG.description;

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
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: fullUrl,
      siteName: SITE_CONFIG?.name ?? "Passion Dental Clinic",
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
      card: "summary_large_image",
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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
