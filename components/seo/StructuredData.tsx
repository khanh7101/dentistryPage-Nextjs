import { SITE_CONFIG } from '@/lib/config/constants';
import { Locale } from '@/lib/types/common';

interface StructuredDataProps {
  locale: Locale;
  type?: 'Organization' | 'LocalBusiness' | 'MedicalBusiness';
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'Service';
  title?: string;
  description?: string;
  url?: string;
}

/**
 * Component to render JSON-LD structured data for SEO
 */
export function StructuredData({
  locale,
  type = 'LocalBusiness',
  pageType = 'WebPage',
  title,
  description,
  url,
}: StructuredDataProps) {
  // Always use production URL for structured data to avoid SEO issues
  // Never use localhost URLs in production metadata
  function getBaseUrl(): string {
    const productionUrl = 'https://passiondental.vn';
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    // Only use env URL if it's a production URL (not localhost)
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl;
    }
    
    return productionUrl;
  }
  
  const baseUrl = getBaseUrl();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: SITE_CONFIG.name,
    description: description || SITE_CONFIG.name,
    url: baseUrl,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: SITE_CONFIG.businessHours.open,
      closes: SITE_CONFIG.businessHours.close,
    },
    ...(type === 'MedicalBusiness' && {
      medicalSpecialty: 'Dentistry',
      areaServed: {
        '@type': 'City',
        name: 'Da Nang',
      },
    }),
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title || SITE_CONFIG.name,
    description: description,
    url: url || baseUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {(title || description) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webpageSchema),
          }}
        />
      )}
    </>
  );
}

