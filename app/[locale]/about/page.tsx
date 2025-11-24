import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { aboutImage } from '@/lib/utils/assetMaps';
import AllCarouselProps from '@/components/AllCarouselProps.lazy';
import { PageProps } from '@/lib/types/common';

// SEO cho trang About
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.about',
    path: '/about',
  });
}

export default async function About({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="container">
      <section className="full-bleed">
        <Image
          src={aboutImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-wide prose-content">
        {/* 1. Sứ mệnh & triết lý */}
        <section className="section">
          <h2>{t('index1.title')}</h2>
          {t.rich("index1.desc", {
            strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </section>

        {/* 2. Bác sĩ dẫn dắt chuyên môn */}
        <section className="section">
          <h2>{t('index2.title')}</h2>
          {t.rich("index2.desc1", {
            strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
          <h4 className="text-slate-700 font-semibold mt-4">
            {t('index2.desc2.title')}
          </h4>
          <ul className="my-3 ml-5 space-y-2 list-inside list-disc text-slate-700">
            <li className="flex items-start gap-5">
              <span className="font-extrabold text-2xl leading-none">•</span>
              <span>
                {t.rich("index2.desc2.li1", {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-5">
              <span className="font-extrabold text-2xl leading-none">•</span>
              <span>{t('index2.desc2.li2')}</span>
            </li>
            <li className="flex items-start gap-5">
              <span className="font-extrabold text-2xl leading-none">•</span>
              <span>{t('index2.desc2.li3')}</span>
            </li>
          </ul>

          <AllCarouselProps
            pageSize={3}
            aspectClass="aspect-video"
            source={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
              aboutImage(`2.${n}.jpg`)
            )}
          />
        </section>

        {/* 3. Vô trùng & công nghệ */}
        <section className="section">
          <h2>{t('index3.title')}</h2>
          <p>{t('index3.desc')}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Image
              src={aboutImage('3.1.jpg')}
              alt="Công nghệ DSD"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
            <Image
              src={aboutImage('3.2.jpg')}
              alt="Máy X-quang 3D"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
          </div>
        </section>

        {/* 4. Thế mạnh: Implant & Chỉnh nha */}
        <section className="section">
          <h2>{t('index4.title')}</h2>

          <p>
            {t.rich("index4.desc1", {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <div className="my-5 grid gap-4 md:grid-cols-2">
            <Image
              src={aboutImage('4.1.jpg')}
              alt="Case Implant toàn hàm"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
            <Image
              src={aboutImage('4.2.jpg')}
              alt="Trồng răng Implant"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
          </div>
          <p>
            {t.rich("index4.desc2", {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <div className="my-5 grid gap-4 md:grid-cols-2">
            <Image
              src={aboutImage('4.3.jpg')}
              alt="Case Implant toàn hàm"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
            <Image
              src={aboutImage('4.4.jpg')}
              alt="Trồng răng Implant"
              width={800}
              height={800}
              className="aspect-square object-fill"
              loading="lazy"
            />
          </div>
        </section>

        {/* 5. Quy trình 4 bước */}
        <section className="section">
          <h2>{t('index5.title')}</h2>
          <ol className="mt-4 space-y-3 text-slate-800">
            <li>
              {t.rich("index5.desc1", {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </li>
            <li>  
              {t.rich("index5.desc2", {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("index5.desc3", {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("index5.desc4", {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-500">{t('index5.note')}</p>
        </section>

        {/* 6. Đồng hành sau điều trị */}
        <section className="section">
          <h2>{t('index6.title')}</h2>
          <p>{t('index6.desc')}</p>
        </section>

        {/* 7. Khách quốc tế */}
        <section className="section">
          <h2>{t('index7.title')}</h2>
          <p>{t('index7.desc1')}</p>

          {/* CTA cuối trang */}
          <div className="my-5">
            <Image
              src={aboutImage('7.jpg')}
              alt="Đội ngũ Passion Dental cùng khách quốc tế"
              width={1920}
              height={1080}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-center text-sm italic text-slate-500">
            {t('index7.desc2')}
          </p>
        </section>
      </main>
    </div>
  );
}
