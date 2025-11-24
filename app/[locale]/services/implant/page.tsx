import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { implantServiceImage } from '@/lib/utils/assetMaps';
import AllCarouselProps from '@/components/AllCarouselProps.lazy';
import { IconCheck } from '@/components/icons/Icons';
import Button from '@/components/Button';
import { PageProps } from '@/lib/types/common';
import { TableData } from '@/lib/types/services';

// SEO cho trang Implant Services
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.services',
    path: '/services/implant',
  });
}

export default async function Implant({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  // Get table data using t.raw() to get the object directly
  const table = t.raw('implant.sec3.table') as TableData;
  const { header, rows } = table;

  return (
    <div className="container">
      {/* BANNER */}
      <section className="full-bleed">
        <Image
          src={implantServiceImage(t('banner'))}
          alt="Implant"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-narrow prose-content">
        <section className="section">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <Image
              src={implantServiceImage('1.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <div>
              <h2 style={{ color: 'var(--color-title)' }}>{t('implant.sec1.ti')}</h2>
              <p>
                {t.rich('implant.sec1.desc', {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </p>
              <ul className="ml-3">
                <li className="flex items-start gap-2">
                  <span className="font-extrabold text-2xl leading-none">•</span>
                  <span>
                    {t.rich('implant.sec1.li1', {
                      strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                    })}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-extrabold text-2xl leading-none">•</span>
                  <span>
                    {t.rich('implant.sec1.li2', {
                      strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <p>
            {t.rich('implant.sec1.note', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        <section className="section">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h2 style={{ color: 'var(--color-title)' }}>{t('implant.sec2.ti')}</h2>
              <p>{t('implant.sec2.desc')}</p>
              <ul className="text-slate-700 leading-relaxed md:text-lg space-y-4">
                {['li1', 'li2', 'li3', 'li4'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">
                      <IconCheck className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
                    </span>
                    <span className="flex-1 pt-0.5">
                      {t.rich(`implant.sec2.${key}`, {
                        strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src={implantServiceImage('2.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
          </div>
          <p>
            {t.rich('implant.sec2.note', {
              strong: (chunks) => <strong className="font-bold text-red-500">{chunks}</strong>,
            })}
          </p>
        </section>

        <section className="section">
          <h2 className="text-center" style={{ color: 'var(--color-title)' }}>
            {t.rich('implant.sec3.ti', {
              br: () => <br />,
            })}
          </h2>
          <p>{t('implant.sec3.desc')}</p>
          <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-black/10">
            {/* Header */}
            <div className="hidden md:grid grid-cols-3 bg-slate-100 font-semibold text-center text-base" style={{ color: 'var(--color-title)' }}>
              {header.map((h, i) => (
                <div key={i} className="py-3 px-4 border-r last:border-r-0">
                  {h}
                </div>
              ))}
            </div>
            {/* Mobile header (stacked) */}
            <div className="md:hidden bg-slate-100 font-semibold text-sm" style={{ color: 'var(--color-title)' }}>
              <div className="grid grid-cols-3 text-center border-b border-slate-200">
                {header.map((h, i) => (
                  <div key={i} className="py-2 px-2 text-xs font-semibold">
                    {h}
                  </div>
                ))}
              </div>
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-t text-sm md:text-[15px] text-slate-700"
              >
                {/* Cột 1: tiêu đề đặc điểm */}
                <div className="px-4 py-3 font-semibold bg-slate-50 border-b md:border-b-0 md:border-r">
                  {r.col1}
                </div>
                {/* Cột 2: Implant */}
                <div className="px-4 py-3 border-b md:border-b-0 md:border-r">
                  {r.col2}
                </div>
                {/* Cột 3: Giải pháp truyền thống */}
                <div className="px-4 py-3 border-b md:border-b-0">{r.col3}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="text-center" style={{ color: 'var(--color-title)' }}>
            {t('implant.sec4.ti')}
          </h2>
          <p>{t('implant.sec4.desc')}</p>
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <Image
              src={implantServiceImage('3.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <ul className="mt-3 space-y-1 text-slate-700">
              {[
                { s: 'implant.sec4.li1' },
                { s: 'implant.sec4.li2' },
                { s: 'implant.sec4.li3' },
                { s: 'implant.sec4.li4' },
              ].map((item) => (
                <li key={item.s} className="flex items-start gap-2">
                  <span className="font-extrabold inline-flex items-center justify-center text-2xl leading-none">
                    •
                  </span>
                  <p>
                    {t.rich(item.s, {
                      strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>
            {t.rich('implant.sec5.ti', {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t.rich('implant.sec5.desc', {
              br: () => <br />,
            })}
          </p>
          <p className="font-bold">{t('implant.sec5.ti1')}</p>
          <p>
            {t.rich('implant.sec5.desc1-1', {
              br: () => <br />,
            })}
          </p>
          <p>
            {t.rich('implant.sec5.desc1-2', {
              br: () => <br />,
            })}
          </p>
          <Image
            src={implantServiceImage('4.jpg')}
            alt="Banner"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <p className="font-bold">{t('implant.sec5.ti2')}</p>
          <p>
            {t.rich('implant.sec5.desc2', {
              br: () => <br />,
            })}
          </p>
          <Image
            src={implantServiceImage('5.jpg')}
            alt="Banner"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <p className="font-bold">{t('implant.sec5.ti3')}</p>
          <p className="mt-3 text-slate-700 text-lg">
            {t.rich('implant.sec5.desc3', {
              br: () => <br />,
            })}
          </p>
        </section>

        <section className="section">
          <h3
            className="text-base font-bold md:text-lg text-center mb-6"
            style={{ color: 'var(--color-title)' }}
          >
            {t.rich('implant.sec6.ti', {
              br: () => <br />,
            })}
          </h3>
          <AllCarouselProps
            pageSize={2}
            aspectClass="aspect-square"
            source={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) =>
              implantServiceImage(`sl${n}.jpg`)
            )}
          />
          <p className="mt-5">
            {t.rich('implant.sec6.desc', {
              strong: (chunks) => <strong className="font-bold text-sky-800">{chunks}</strong>,
            })}
          </p>
          <Button text={t('bookingBtn')} to="/booking" />
        </section>
      </main>
    </div>
  );
}
