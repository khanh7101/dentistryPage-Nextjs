import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { diaryImage } from '@/lib/utils/assetMaps';
import { PageProps } from '@/lib/types/common';

// SEO cho trang Diary
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { generateSEOMetadata } = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.knowledge',
    path: '/knowledge',
  });
}

export default async function Knowledge({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'knowledge' });

  return (
    <div className="container">
      

      <main className="container-wide prose-content">
        <p>Knowledge 12345</p>  
      </main>
    </div>
  );
}
