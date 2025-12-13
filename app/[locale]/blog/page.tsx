import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { blogImage } from '@/lib/utils/assetMaps';
import { PageProps } from '@/lib/types/common';
import Button from '@/components/Button';
import { IconCheck } from '@/components/icons/Icons';

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
        <section className="section">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-title)' }}>{t('blog1.title')}</h1>
          <p>
            {t.rich('blog1.intro', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        
          <Image
            src={blogImage('blog1', '1.jpg')}
            alt="Dental Implant Collage"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* Subtitle */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.subtitle')}</h2>
        </section>

        {/* Section 1 */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec1.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec1.sub1.title')}</h3>
          <p>
            {t.rich('blog1.sec1.sub1.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec1.sub2.title')}</h3>
          <p>
            {t.rich('blog1.sec1.sub2.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec1.sub3.title')}</h3>
          <p>
            {t.rich('blog1.sec1.sub3.desc', {
              strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </section>

        {/* Section 2 */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec2.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec2.sub1.title')}</h3>
          <p>{t('blog1.sec2.sub1.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec2.sub2.title')}</h3>
          <p>{t('blog1.sec2.sub2.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec2.sub3.title')}</h3>
          <p>{t('blog1.sec2.sub3.desc')}</p>
        </section>

        {/* Image 2 - All on 4 banner */}
        <section className="section">
          <Image
            src={blogImage('blog1', '2.jpg')}
            alt="All on 4 Implant"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* Section 3 */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec3.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec3.sub1.title')}</h3>
          <p>{t('blog1.sec3.sub1.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec3.sub2.title')}</h3>
          <p>{t('blog1.sec3.sub2.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec3.sub3.title')}</h3>
          <p>{t('blog1.sec3.sub3.desc')}</p>
        </section>

        {/* Section 4 */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub1.title')}</h3>
          <p>{t('blog1.sec4.sub1.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub2.title')}</h3>
          <p>{t('blog1.sec4.sub2.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub3.title')}</h3>
          <p>{t('blog1.sec4.sub3.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub4.title')}</h3>
          
          <h4 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub4.benefit1.title')}</h4>
          <p>{t('blog1.sec4.sub4.benefit1.desc')}</p>

          <h4 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub4.benefit2.title')}</h4>
          <p>{t('blog1.sec4.sub4.benefit2.desc')}</p>

          <h4 style={{ color: 'var(--color-title)' }}>{t('blog1.sec4.sub4.benefit3.title')}</h4>
          <p>{t('blog1.sec4.sub4.benefit3.desc')}</p>
        </section>

        {/* Image 3 - Before/After */}
        <section className="section">
          <Image
            src={blogImage('blog1', '3.jpg')}
            alt="Before and After Implant"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* Section 5 - Comparison */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec5.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec5.whenImplant.title')}</h3>
          <p>{t('blog1.sec5.whenImplant.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec5.whenBridge.title')}</h3>
          <p>{t('blog1.sec5.whenBridge.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec5.whenDentures.title')}</h3>
          <p>{t('blog1.sec5.whenDentures.desc')}</p>
        </section>

        {/* Image 4 - Comparison visual */}
        <section className="section">
          <Image
            src={blogImage('blog1', '4.jpg')}
            alt="Implant vs Bridge Comparison"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* Section 6 */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.sec6.title')}</h2>
          
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec6.step1.title')}</h3>
          <p>{t('blog1.sec6.step1.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec6.step2.title')}</h3>
          <p>{t('blog1.sec6.step2.desc')}</p>

          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.sec6.step3.title')}</h3>
          <p>{t('blog1.sec6.step3.desc1')}</p>
          <p>{t('blog1.sec6.step3.desc2')}</p>
        </section>

        {/* Image 5 - Final banner */}
        <section className="section">
          <Image
            src={blogImage('blog1', '5.jpg')}
            alt="Passion Dental Banner"
            width={1920}
            height={1080}
            className="inset-0 w-full aspect-auto object-cover"
            loading="lazy"
          />
        </section>

        {/* CTA */}
        <section className="section">
          <h2 style={{ color: 'var(--color-title)' }}>{t('blog1.cta.title')}</h2>
          <p>{t('blog1.cta.desc')}</p>
          <Button text={t('blog1.cta.title')} to="/booking" />
        </section>

        {/* Contact Information */}
        <section className="section">
          <h3 style={{ color: 'var(--color-title)' }}>{t('blog1.contact.title')}</h3>
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
