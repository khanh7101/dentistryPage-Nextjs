import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { bookingImage } from '@/lib/utils/assetMaps';
import FormBooking from '@/components/forms/FormBooking/FormBooking';
import { SITE_CONFIG } from '@/lib/config/constants';
import { PageProps } from '@/lib/types/common';
import { StructuredData } from '@/components/seo/StructuredData';

// SEO cho trang Booking
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.booking',
    path: '/booking',
  });
}

export default async function Booking({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });

  return (
    <>
      <StructuredData
        locale={locale}
        type="MedicalBusiness"
        pageType="ContactPage"
        title={t('title')}
        description={t('desc')}
      />
      <div className="container">
      {/* ===== Banner ===== */}
      <section className="full-bleed">
        <Image
          src={bookingImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-wide prose-content">
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('title')}</div>
          </div>
          <p className="text-center max-w-[800px] mx-auto">{t('desc')}</p>
        </section>

        <section className="section grid md:grid-cols-2 md:items-center gap-8 lg:gap-12">
          {/* Left: Poster */}
          <Image
            src={bookingImage(t('doc'))}
            alt="Đặt lịch tư vấn cùng Bác sĩ Thanh Tùng"
            width={800}
            height={1000}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />

          {/* Right: Form */}
          <div>
            <header className="mb-4 space-y-1 md:mb-5 leading-tight">
              <h3 className="text-4xl font-normal">{t('title1')}</h3>
              <h3 className="text-3xl font-semibold" style={{ color: 'var(--color-brand)' }}>
                {t('title2')}
              </h3>
              <p>{t('desc1')}</p>
            </header>
            <FormBooking />
          </div>
        </section>
      </main>

      {/* ===== Google Map ===== */}
      <section className="full-bleed">
        <div className="h-[420px] md:h-[520px] lg:h-[560px]">
          <iframe
            title="Passion Dental Clinic Location"
            className="inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={SITE_CONFIG.googleMaps.embedUrl}
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
    </>
  );
}
