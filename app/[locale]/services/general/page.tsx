import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { generalServiceImage } from '@/lib/utils/assetMaps';
import Button from '@/components/Button';
import { PageProps } from '@/lib/types/common';

// SEO cho trang General Services
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.services',
    path: '/services/general',
  });
}

export default async function GeneralServicePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <div className="container">
      {/* ===== Banner ===== */}
      <section className="full-bleed">
        <Image
          src={generalServiceImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-narrow prose-content">
        {/* INTRO */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('general.title1')}</div>
          </div>
          <p>
            {t.rich('general.desc1', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('general.title2.ti')}</div>
          </div>
          <p>{t('general.title2.desc')}</p>

          <ServiceBlock
            tiKey="general.title2.ti1"
            desc1Key="general.title2.desc1-1"
            desc2Key="general.title2.desc1-2"
            img1="1.1.jpg"
            img2="1.2.jpg"
            note={t('general.title2.imgNote1')}
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti2"
            desc1Key="general.title2.desc2-1"
            desc2Key="general.title2.desc2-2"
            img1="2.1.jpg"
            img2="2.2.jpg"
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti3"
            desc1Key="general.title2.desc3-1"
            desc2Key="general.title2.desc3-2"
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti4"
            desc1Key="general.title2.desc4-1"
            desc2Key="general.title2.desc4-2"
            img1="4.1.jpg"
            img2="4.2.jpg"
            note={t('general.title2.imgNote4')}
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti5"
            desc1Key="general.title2.desc5-1"
            desc2Key="general.title2.desc5-2"
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti6"
            desc1Key="general.title2.desc6-1"
            desc2Key="general.title2.desc6-2"
            img1="6.1.jpg"
            img2="6.2.jpg"
            note={t('general.title2.imgNote6')}
            t={t}
          />

          <ServiceBlock
            tiKey="general.title2.ti7"
            desc1Key="general.title2.desc7-1"
            desc2Key="general.title2.desc7-2"
            t={t}
          />
        </section>

        {/* WHY CHOOSE */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('general.title3.ti')}</div>
          </div>
          <p>{t('general.title3.desc')}</p>
          <div className="mt-2 space-y-2">
            {['general.title3.desc1', 'general.title3.desc2', 'general.title3.desc3'].map((k) => (
              <div
                key={k}
                className="grid grid-cols-[1.25rem,1fr] gap-x-2 items-start leading-relaxed"
              >
                <span className="col-start-1 col-end-2 font-semibold text-sky-600 select-none">
                  💙
                </span>
                <div className="col-start-2 col-end-3 text-slate-700">
                  {t.rich(k, {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {['ti3.1.jpg', 'ti3.2.jpg'].map((f) => (
              <Image
                key={f}
                src={generalServiceImage(f)}
                alt=""
                width={800}
                height={600}
                className="w-full object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="grid">
          <div className="text-center">
            <div className="section-title">{t('general.title4.ti')}</div>
          </div>
          <div className="mt-3 text-slate-700 md:text-[17px]">
            <p className="italic text-center" style={{ color: 'var(--color-bgButton)' }}>
              {t('general.title4.desc1')}
            </p>
            <p>
              {t.rich('general.title4.desc2', {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </p>
            <Button text={t('bookingBtn')} to="/booking" />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------- ServiceBlock: đúng form mẫu + note dưới ảnh ------- */
type ServiceBlockProps = {
  tiKey: string; // "general.title2.ti2"
  desc1Key: string; // "general.title2.desc2-1"
  desc2Key: string; // "general.title2.desc2-2"
  img1?: string; // "3.jpg"
  img2?: string; // "4.jpg"
  note?: string; // ⬅️ chuỗi chú thích (đã dịch sẵn hoặc gọi t() khi truyền vào)
  t: Awaited<ReturnType<typeof getTranslations>>;
};

function ServiceBlock({ tiKey, desc1Key, desc2Key, img1, img2, note, t }: ServiceBlockProps) {
  const imgs = [img1, img2].filter(Boolean) as string[];
  const gridCols = imgs.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2';

  return (
    <div className="py-3">
      <h3 className="text-base font-bold md:text-lg" style={{ color: 'var(--color-title)' }}>
        {t(tiKey)}
      </h3>
      <ul className="ml-5 mt-2 list-disc space-y-2 text-slate-700 text-lg">
        <li>
          {t.rich(desc1Key, {
            strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </li>
        <li>
          {t.rich(desc2Key, {
            strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </li>
      </ul>
      {imgs.length > 0 && (
        <div className={`mt-4 grid gap-2 ${gridCols}`}>
          {imgs.map((src, idx) => (
            <Image
              key={idx}
              src={generalServiceImage(src)}
              alt=""
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
          ))}
        </div>
      )}
      {note ? (
        <p className="mt-3 text-center text-base italic text-slate-500">{note}</p>
      ) : null}
    </div>
  );
}
