
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { porcelainServiceImage } from '@/lib/utils/assetMaps';
import Button from '@/components/Button';
import { PageProps } from '@/lib/types/common';
import { TableData } from '@/lib/types/services';

// SEO cho trang Porcelain Services
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.services',
    path: '/services/porcelain',
  });
}

export default async function Porcelain({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  // Get table data using t.raw() to get the object directly
  const table = t.raw('porcelain.sec3.table') as TableData;
  const { header, rows } = table;

  return (
    <div className="container">
      {/* ===== Banner ===== */}
      <section className="full-bleed">
        <Image
          src={porcelainServiceImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-narrow prose-content">
        <section className="section flex flex-col-reverse gap-6 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-8">
          <Image
            src={porcelainServiceImage('1.jpg')}
            alt="Banner"
            width={800}
            height={600}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <div>
            <h2 style={{ color: 'var(--color-title)' }}>{t('porcelain.sec1.ti')}</h2>
            <p>
              {t.rich('porcelain.sec1.desc', {
                strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              })}
            </p>
          </div>
        </section>

        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('porcelain.sec2.ti')}</h2>
          <p>{t('porcelain.sec2.desc')}</p>
          <ul className="mt-3 space-y-3 text-slate-700 md:text-lg">
            {[
              { s: 'porcelain.sec2.li1' },
              { s: 'porcelain.sec2.li2' },
              { s: 'porcelain.sec2.li3' },
              { s: 'porcelain.sec2.li4' },
            ].map((item) => (
              <li key={item.s} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center text-xl">👉</span>
                <p>
                  {t.rich(item.s, {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                  })}
                </p>
              </li>
            ))}
          </ul>
          <p>
            {t.rich('porcelain.sec2.note', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              em: (chunks) => <em className="text-red-500 font-bold">{chunks}</em>,
            })}
          </p>
        </section>

        <section className="section">
          <h2 className="text-center" style={{ color: 'var(--color-title)' }}>
            {t.rich('porcelain.sec3.ti', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <p className="font-bold">{t('porcelain.sec3.ti1')}</p>
              <p>
                {t.rich('porcelain.sec3.desc1', {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </p>
            </div>
            <Image
              src={porcelainServiceImage('2.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
          </div>
          <p className="font-bold">{t('porcelain.sec3.ti2')}</p>
          <p>
            {t.rich('porcelain.sec3.desc2', {
            })}
          </p>
          <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-black/10 text-center">
            {/* Header */}
            <div className="grid grid-cols-3 bg-slate-100 text-[13px] md:text-base font-semibold" style={{ color: 'var(--color-title)' }}>
              {header.map((h, i) => (
                <div key={i} className="py-2.5 px-2 border-r last:border-r-0">
                  {h}
                </div>
              ))}
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-[13px] md:text-[15px] text-slate-700 border-t"
              >
                {/* Cột 1 */}
                <div className="px-3 py-2 font-semibold bg-slate-50 sm:bg-transparent sm:border-0 border-b sm:border-b-0 sm:border-r">
                  {r.col1}
                </div>
                {/* Cột 2 */}
                <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r">
                  {r.col2}
                </div>
                {/* Cột 3 */}
                <div className="px-3 py-2 border-b sm:border-b-0">{r.col3}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="text-center whitespace-pre-line" style={{ color: 'var(--color-title)' }}>
            {t.rich('porcelain.sec4.ti', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </h2>
          <p>
            {t.rich('porcelain.sec4.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <div className="grid gap-6 md:grid-cols-[1fr,1fr] mt-6">
            <Image
              src={porcelainServiceImage('3.jpg')}
              alt="Banner"
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-bold">{t('porcelain.sec4.ti1')}</p>
              <p>
                {t.rich('porcelain.sec4.desc1', {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] mt-6">
            <div>
              <p className="font-bold">{t('porcelain.sec4.ti2')}</p>
              <p>
                {t.rich('porcelain.sec4.desc2', {
                  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                })}
              </p>
            </div>
            <Image
              src={porcelainServiceImage('4.jpg')}
              alt=""
              width={800}
              height={600}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="section">
          <h3
            className="text-base font-bold md:text-lg text-center mb-6"
            style={{ color: 'var(--color-title)' }}
          >
            {t.rich('porcelain.sec5.ti', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </h3>
          <Image
            src={porcelainServiceImage('5.jpg')}
            alt=""
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <Image
            src={porcelainServiceImage('6.jpg')}
            alt=""
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <Image
            src={porcelainServiceImage('7.jpg')}
            alt=""
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
          <Button text={t('bookingBtn')} to="/booking" />
        </section>
      </main>
    </div>
  );
}
