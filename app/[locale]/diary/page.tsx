import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { diaryImage } from '@/lib/utils/assetMaps';
import VideoReview from '@/components/sections/diary/VideoReview.lazy';
import { ImageWithPreview } from '@/lib/utils/imagePreview';
import ResponsivePhotoGrid from '@/components/sections/diary/ResponsivePhotoGrid';
import { PageProps } from '@/lib/types/common';

// SEO cho trang Diary
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.diary',
    path: '/diary',
  });
}

export default async function Diary({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'diary' });

  const implantPhotos = Array.from({ length: 8 }, (_, i) => `i${i + 1}.jpg`);
  const orthoPhotos = Array.from({ length: 8 }, (_, i) => `o${i + 1}.jpg`);
  const porcelainPhotos = Array.from({ length: 4 }, (_, i) => `p${i + 1}.jpg`);
  const generalPhotos = Array.from({ length: 4 }, (_, i) => `g${i + 1}.jpg`);
  const feedbackPhotos = Array.from({ length: 9 }, (_, i) => `f${i + 1}.jpg`);

  return (
    <div className="container">
      {/* BANNER */}
      <section className="full-bleed">
        <Image
          src={diaryImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-wide prose-content">
        {/* NHẬT KÝ NỤ CƯỜI */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('title1')}</div>
          </div>
          <p>{t('desc1')}</p>
          <h4>{t('li1')}</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            {implantPhotos.map((file) => (
              <div key={file} className="w-full">
                <ImageWithPreview
                  src={diaryImage(file)}
                  previewMode="fit"
                  className="aspect-square w-full object-cover shadow-sm cursor-zoom-in"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
            ))}
          </div>
          <h4>{t('li2')}</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            {orthoPhotos.map((file) => (
              <div key={file} className="w-full">
                <ImageWithPreview
                  src={diaryImage(file)}
                  previewMode="fit"
                  className="aspect-square w-full object-cover shadow-sm cursor-zoom-in"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
            ))}
          </div>
          <h4>{t('li3')}</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            {porcelainPhotos.map((file) => (
              <div key={file} className="w-full">
                <ImageWithPreview
                  src={diaryImage(file)}
                  previewMode="fit"
                  className="aspect-square w-full object-cover shadow-sm cursor-zoom-in"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
            ))}
          </div>
          <h4>{t('li4')}</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            {generalPhotos.map((file) => (
              <div key={file} className="w-full">
                <ImageWithPreview
                  src={diaryImage(file)}
                  previewMode="fit"
                  className="aspect-square w-full object-cover shadow-sm cursor-zoom-in"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO REVIEW */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('title2')}</div>
          </div>
          <p>{t('desc2')}</p>
          <VideoReview />
        </section>

        {/* KHÁCH HÀNG NÓI GÌ */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('title3')}</div>
          </div>
          <p>{t('desc3')}</p>
          <ResponsivePhotoGrid photos={feedbackPhotos} />
          <p className="text-center font-semibold">{t('note')}</p>
          <p className="text-slate-700 leading-relaxed">{t('desc4')}</p>
        </section>
      </main>
    </div>
  );
}
