// components/seo/StructuredData.tsx
import { SITE_CONFIG } from "@/lib/config/constants";
import { Locale } from "@/lib/types/common";

interface StructuredDataProps {
  locale: Locale;
  type?: "LocalBusiness" | "MedicalBusiness" | "Organization";
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "Service";
  title?: string;
  description?: string;
  url?: string;
}

export function StructuredData({
  locale,
  type = "LocalBusiness",
  pageType = "WebPage",
  title,
  description,
  url,
}: StructuredDataProps) {
  function getBaseUrl(): string {
    const productionUrl = "https://www.passiondental.com.vn";
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
      return envUrl;
    }
    return productionUrl;
  }

  const baseUrl = getBaseUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name: SITE_CONFIG.name,
    description:
      description ||
      "Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.",
    url: baseUrl,
    logo: `${baseUrl}/images/brand/logo.png`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
    },
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title || SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
    url: url || baseUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
  };

  return (
    <>
      {/* Organization/LocalBusiness info (useful on pages too) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Page-level WebPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
    </>
  );
}
