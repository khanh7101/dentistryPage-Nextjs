import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { blogImage } from '@/lib/utils/assetMaps';
import { PageProps } from '@/lib/types/common';

// SEO cho trang Blog
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.blog',
    path: '/blog',
  });
}

export default async function Blog({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className="container">
      <main className="container-narrow prose-content">
        {/* Title */}
        <section className="section !py-3">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-title)' }}>{t('blog1.title')}</h1>
          <p>
            {t.rich('blog1.intro', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              em: (chunks) => <em className="font-bold text-title ">{chunks}</em>,
            })}
          </p>
          <div>
            <Image
              src={blogImage('blog1', '1.jpg')}
              alt="Dental Implant Collage"
              width={1920}
              height={1080}
              className="inset-0 w-full aspect-auto object-cover mt-5"
              loading="lazy"
            />
            <p className="text-center text-lg italic">{t('blog1.caption1')}</p>
          </div>
        </section>

        {/* Section 1 */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec1.title')}</h2>
          <h3 className="text-lg font-bold text-title mt-4">
            {t('blog1.sec1.sub1.title')}
          </h3>
          <p className="!mt-0">
            {t.rich('blog1.sec1.sub1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">
            {t('blog1.sec1.sub2.title')}
          </h3>
          <p className="!mt-0">
            {t.rich('blog1.sec1.sub2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">
            {t('blog1.sec1.sub3.title')}
          </h3>
          <p className="!mt-0">
            {t.rich('blog1.sec1.sub3.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          {/* Image 2 - All on 4 banner */}
          <div>
            <Image
              src={blogImage('blog1', '2.jpg')}
              alt="All on 4 Implant"
              width={1920}
              height={1080}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <p className="text-center text-lg italic">{t('blog1.caption2')}</p>
          </div >
        </section>


        {/* Section 2 */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec2.title')}</h2>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec2.sub1.title')}</h3>
          <p className="!mt-0">{t('blog1.sec2.sub1.desc')}</p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec2.sub2.title')}</h3>
          <p className="!mt-0">{t('blog1.sec2.sub2.desc')}</p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec2.sub3.title')}</h3>
          <p className="!mt-0">{t('blog1.sec2.sub3.desc')}</p>
        </section>



        {/* Section 3 */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec3.title')}</h2>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec3.sub1.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec3.sub1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          {/* Image 3 - Before/After */}
          <div>
            <Image
              src={blogImage('blog1', '3.jpg')}
              alt="Before and After Implant"
              width={1920}
              height={1080}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <p className="text-center text-lg italic">{t('blog1.caption3')}</p>
          </div>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec3.sub2.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec3.sub2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec3.sub3.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec3.sub3.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        {/* Section 4 */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec4.title')}</h2>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub1.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub2.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub3.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub3.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec4.sub4.title')}</h2>
          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub4.benefit1.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub4.benefit1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          {/* Image 4 - Comparison visual */}
          <div>
            <Image
              src={blogImage('blog1', '4.jpg')}
              alt="Implant vs Bridge Comparison"
              width={1920}
              height={1080}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <p className="text-center text-lg italic">{t('blog1.caption4')}</p>
          </div>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub4.benefit2.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub4.benefit2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec4.sub4.benefit3.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec4.sub4.benefit3.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        {/* Section 5 - Comparison */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec5.title')}</h2>

          {/* Image 5 - Comparison visual */}
          <div>
            <Image
              src={blogImage('blog1', '5.jpg')}
              alt="Passion Dental Banner"
              width={1920}
              height={1080}
              className="inset-0 w-full aspect-auto object-cover"
              loading="lazy"
            />
            <p className="text-center text-lg italic">{t('blog1.caption5')}</p>
          </div>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec5.sub1.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec5.sub1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec5.sub2.title')}</h3>
          <p className="!mt-0">{t('blog1.sec5.sub2.desc')}</p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec5.sub3.title')}</h3>
          <p className="!mt-0">{t('blog1.sec5.sub3.desc')}</p>
        </section>

        {/* Section 6 */}
        <section className="section !py-3">
          <h2 className="text-title mb-1">{t('blog1.sec6.title')}</h2>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec6.step1.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec6.step1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec6.step2.title')}</h3>
          <p className="!mt-0">
            {t.rich('blog1.sec6.step2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 className="text-lg font-bold text-title mt-4">{t('blog1.sec6.step3.title')}</h3>
          <p>
            {t.rich('blog1.sec6.step3.desc1', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p>
            {t.rich('blog1.sec6.step3.desc2', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
              em: (chunks) => <em className="font-bold text-title ">{chunks}</em>,
            })}
          </p>
        </section>

        {/* Contact Information */}
        <section className="section !py-3">
          <h3 className="text-title">{t('blog1.contact.title')}</h3>
          <div className="space-y-2">
            <p><strong>{t('blog1.contact.clinic')}</strong></p>
            <p><strong>Hotline:</strong> {t('blog1.contact.hotline')}</p>
            <p><strong>Email:</strong> {t('blog1.contact.email')}</p>
            <p><strong>Facebook:</strong> <a href={t('blog1.contact.facebook')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('blog1.contact.facebook')}</a></p>
            <p><strong>Instagram:</strong> {t('blog1.contact.instagram')}</p>
            <p><strong>TikTok:</strong> {t('blog1.contact.tiktok')}</p>
            <p><strong>Website:</strong> <a href={t('blog1.contact.website')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('blog1.contact.website')}</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
