import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { serviceImage } from '@/lib/utils/assetMaps';
import FavServices from '@/components/sections/services/FavServices';
import { PageProps } from '@/lib/types/common';

// SEO cho trang Services
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.services',
    path: '/services',
  });
}

export default async function Services({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <div className="container">
      {/* ===== Banner ===== */}
      <section className="full-bleed">
        <Image
          src={serviceImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-wide prose-content">
        {/* INTRO COPY */}
        <section className="section">
          <p>
            {t.rich('service.desc1', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              em: (chunks) => <em className="font-bold" style={{ color: 'var(--color-title)' }}>{chunks}</em>,
            })}
          </p>
          <p>
            {t.rich('service.desc2', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p>
            {t.rich('service.desc3', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p>
            {t.rich('service.desc4', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        {/* FEATURED SERVICES */}
        <section className="section">
          <p className="font-semibold">{t('service.title1')}</p>
          <h2>{t('service.title2')}</h2>
          <div className="prose-content disable">
            <FavServices />
          </div>

          {/* COMMITMENT */}
          <div className="mx-auto mt-10 max-w-4xl text-center text-xl">
            <p className="font-semibold">{t('service.commit.ti1')}</p>
            <p className="mt-2 italic">{t('service.commit.ti2')}</p>
          </div>
        </section>

        {/* REVIEWS - Commented out as in original code */}
        {/* 
        <section className="container mx-auto grid items-start gap-6 px-4 pb-14 md:grid-cols-[1fr_2fr] md:gap-8">
          <div className="sticky top-4 self-start">
            <p className="text-sm font-semibold text-rose-700">Review</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Khách Hàng
            </h3>
            <p className="mt-3 text-slate-600">
              Một số review chân thật của khách hàng đã sử dụng dịch vụ tại
              Passion Dental – Nha khoa Đà Nẵng. Cảm ơn vì sự tin yêu dành cho
              chúng tôi!
            </p>
          </div>
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex snap-x gap-5">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="min-w-[260px] snap-start rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:min-w-[300px]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {r.name}
                      </p>
                      <p className="text-xs text-slate-500">{r.role}</p>
                    </div>
                    <span className="ml-auto text-2xl text-slate-300">"</span>
                  </div>
                  <p className="text-sm text-slate-700">{r.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section> 
        */}
      </main>
    </div>
  );
}
