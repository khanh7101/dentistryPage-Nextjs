import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { orthodonticServiceImage } from '@/lib/utils/assetMaps';
import AllCarouselProps from '@/components/AllCarouselProps.lazy';
import Button from '@/components/Button';
import { PageProps } from '@/lib/types/common';

// SEO cho trang Orthodontic Services
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.services',
    path: '/services/orthodontic',
  });
}

export default async function Orthodontic({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <div className="container">
      {/* BANNER */}
      <section className="full-bleed">
        <Image
          src={orthodonticServiceImage(t('banner'))}
          alt="Orthodontics"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-narrow prose-content">
        <section className="section flex flex-col-reverse gap-6 md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-10">
          <Image
            src={orthodonticServiceImage('1.jpg')}
            alt="Banner"
            width={800}
            height={600}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <div>
            <h2 style={{ color: 'var(--color-title)' }}>{t('ortho.sec1.ti')}</h2>
            <p className="text-slate-700 leading-relaxed md:text-lg">
              {t.rich('ortho.sec1.desc', {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </p>
          </div>
        </section>

        <section className="section grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
          <div>
            <h2 style={{ color: 'var(--color-title)' }}>{t('ortho.sec2.ti')}</h2>
            <div className="text-slate-700 leading-relaxed md:text-lg grid gap-3">
              <p>{t('ortho.sec2.desc')}</p>
              {['li1', 'li2', 'li3', 'li4', 'li5'].map((key) => (
                <li key={key}>
                  {t.rich(`ortho.sec2.${key}`, {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                  })}
                </li>
              ))}
            </div>
            <p>
              {t.rich('ortho.sec2.note', {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                em: (chunks) => <em className="text-red-500 font-bold">{chunks}</em>,
              })}
            </p>
          </div>
          <Image
            src={orthodonticServiceImage('2.jpg')}
            alt="Mắc cài & khay trong suốt"
            width={800}
            height={600}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        <section className="section">
          <h2 className="text-center" style={{ color: 'var(--color-title)' }}>
            {t('ortho.sec3.ti')}
          </h2>
          <p>{t('ortho.sec3.desc')}</p>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 mt-4">
            <Image
              src={orthodonticServiceImage('3.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-bold">{t('ortho.sec3.ti1')}</p>
              <p>{t('ortho.sec3.desc1')}</p>
              <p>
                {t.rich('ortho.sec3.desc1-1', {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </p>
              <p className="font-bold">{t('ortho.sec3.desc1-2')}</p>
              <ul className="ml-3">
                <li className="flex items-start gap-2">
                  <span className="font-extrabold text-2xl leading-none">•</span>
                  <span>{t('ortho.sec3.li1-1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-extrabold text-2xl leading-none">•</span>
                  <span>{t('ortho.sec3.li1-2')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 mt-4 prose-content">
            <div>
              <p className="font-bold">{t('ortho.sec3.ti2')}</p>
              <p className="text-slate-700 text-lg">{t('ortho.sec3.desc2')}</p>
              <div>
                <p className="font-bold">{t('ortho.sec3.desc2-1')}</p>
                <ul className="mt-3 space-y-2">
                  {[
                    { s: 'ortho.sec3.li2-1' },
                    { s: 'ortho.sec3.li2-2' },
                    { s: 'ortho.sec3.li2-3' },
                  ].map((item) => (
                    <li
                      key={item.s}
                      className="relative pl-6 text-slate-700 leading-relaxed"
                    >
                      <span className="absolute left-0 top-1 font-extrabold text-lg select-none" style={{ color: 'var(--color-brand)' }}>
                        •
                      </span>
                      {t.rich(item.s, {
                        strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Image
              src={orthodonticServiceImage('4.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-slate-700 text-lg">
            {t.rich('ortho.sec3.desc2-2', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        <section className="section">
          <h2 className="text-center" style={{ color: 'var(--color-title)' }}>
            {t.rich('ortho.sec4.ti', {
              br: () => <br />,
            })}
          </h2>
          <p>{t('ortho.sec4.desc')}</p>
          <p className="font-bold">{t('ortho.sec4.ti1')}</p>
          <p>
            {t.rich('ortho.sec4.desc1', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p className="font-bold">{t('ortho.sec4.ti2')}</p>
          <p>{t('ortho.sec4.desc2')}</p>
          <ul className="mt-3 space-y-2">
            {[
              { s: 'ortho.sec4.li1' },
              { s: 'ortho.sec4.li2' },
              { s: 'ortho.sec4.li3' },
            ].map((item) => (
              <li
                key={item.s}
                className="relative pl-6 text-slate-700 leading-relaxed"
              >
                <span className="absolute left-0 top-0 font-extrabold text-lg select-none" style={{ color: 'var(--color-brand)' }}>
                  •
                </span>
                {t.rich(item.s, {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </li>
            ))}
          </ul>
        </section>

        <section className="">
          <h3
            className="text-base font-bold md:text-lg text-center mb-6"
            style={{ color: 'var(--color-title)' }}
          >
            {t.rich('ortho.sec5.ti', {
              br: () => <br />,
            })}
          </h3>
          <div className="mb-16">
            <AllCarouselProps
              pageSize={2}
              aspectClass="aspect-square"
              source={[1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
                orthodonticServiceImage(`si${n}.jpg`)
              )}
            />
          </div>
          <p>
            {t.rich('ortho.sec5.desc', {
              strong: (chunks) => <strong className="font-bold text-sky-800">{chunks}</strong>,
            })}
          </p>
          <Button text={t('bookingBtn')} to="/booking" />
        </section>
      </main>
    </div>
  );
}
