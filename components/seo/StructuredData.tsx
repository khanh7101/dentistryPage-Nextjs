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
  // Use environment variable or fallback for SSR
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passiondental.vn';

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

