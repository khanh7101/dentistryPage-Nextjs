// app/[locale]/page.tsx
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {homeImage} from '@/lib/utils/assetMaps';
import FiveStarReviews from '@/components/sections/home/FiveStarReviews';
import FavServices from '@/components/sections/services/FavServices';
import Button from '@/components/Button';
import CustomerImagesCarousel from '@/components/sections/home/CustomerImagesCarousel.lazy';
import BookingMapSection from '@/components/sections/home/BookingMapSection';
import { PageProps } from '@/lib/types/common';
import { StructuredData } from '@/components/seo/StructuredData';

// SEO đa ngôn ngữ
export async function generateMetadata(
  {params}: PageProps
): Promise<Metadata> {
  const {locale} = await params;
  const {generateSEOMetadata} = await import('@/lib/utils/seo');

  return generateSEOMetadata({
    locale,
    namespace: 'seo.home',
    path: '',
  });
}

// Nội dung trang
export default async function Home({params}: PageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});

  return (
    <>
      <StructuredData
        locale={locale}
        type="MedicalBusiness"
        pageType="WebPage"
        title={t('title')}
        description={t('desc')}
      />
      <div className="container">
      <section className="full-bleed">
        <Image
          src={homeImage(t('banner'))}
          alt="Banner"
          width={1920}
          height={1080}
          className="inset-0 w-full aspect-auto object-cover"
          priority
        />
      </section>

      <main className="container-wide">
        {/* Section 2: ẢNH + Về nha khoa Passion */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('about.title')}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-3 gap-6">
            {/* LEFT: Poster/Image */}
            <div className="overflow-hidden">
              <Image
                src={homeImage(t('about.img'))}
                alt="Clinic poster"
                width={800}
                height={600}
                className="w-full h-full aspect-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* RIGHT: Text + bullets + CTA */}
            <div className="col-span-1 xl:col-span-2 lg:self-center flex">
              <div className="w-full space-y-4">
                <h2 className="text-sky-700 font-bold text-base md:text-xl">
                  {t('about.title1')}
                  <br />
                  {t('about.title2')}
                </h2>

                <p className="text-sky-600 leading-relaxed text-justify">
                  {t('about.desc')}
                </p>

                <h3 className="font-semibold text-sky-600">
                  {t('about.litTile')}
                </h3>

                <ul className="mt-3 space-y-3 text-sky-600 font-bold">
                  {[t('about.lit1'), t('about.lit2'), t('about.lit3')].map(
                    (text, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
                          <svg
                            viewBox="0 0 20 20"
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.543-6.543a1 1 0 0 1 1.414 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{text}</span>
                      </li>
                    )
                  )}
                </ul>

                <Button text={t('about.btn')} to="/about" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Đội ngũ bác sĩ */}
        <section className="section">
          <div className="text-center">
            <div className="section-title">{t('team.title')}</div>
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {/* BS CKI Đặng Hoàng Thanh Tùng */}
            <article className="rounded-2xl border bg-white/70 shadow-sm p-6 lg:p-8 grid gap-6 lg:grid-cols-2">
              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={homeImage(t('team.doc1.img'))}
                  alt={t('team.doc1.name')}
                  width={600}
                  height={600}
                  className="rounded-md overflow-hidden border"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div>
                <div className="flex flex-col gap-1 md:gap-2 text-brand font-bold text-xl">
                  <p className="self-start tracking-wide">
                    {t('team.doc1.name')}
                  </p>
                  <h4 className="self-end md:text-right text-title2">
                    – FOUNDER NHA KHOA PASSION –
                  </h4>
                </div>
                <p className="mt-4 text-index justify-around italic pl-4 border-l-4 border-slate-300">
                  {t('team.doc1.desc')}
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-800">
                  {[
                    t('team.doc1.li1'),
                    t('team.doc1.li2'),
                    t('team.doc1.li3'),
                    t('team.doc1.li4'),
                    t('team.doc1.li5'),
                    t('team.doc1.li6'),
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-extrabold text-2xl leading-none">
                        •
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <Button text={t('team.doc1.btn')} to="/booking" />
              </div>
            </article>

            {/* BÁC SĨ NGUYỄN BẢO YẾN */}
            <article className="rounded-2xl border bg-white/70 shadow-sm p-6 md:p-8 grid gap-6 lg:grid-cols-2">
              {/* Text */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-col gap-1 md:gap-2 text-brand font-bold text-xl">
                  <p className="self-start tracking-wide">
                    {t('team.doc2.name')}
                  </p>
                  <h4 className="self-end md:text-right text-title2">
                    - CO-FOUNDER NHA KHOA PASSION -
                  </h4>
                </div>
                <p className="mt-4 text-index justify-around italic pl-4 border-l-4 border-slate-300">
                  {t('team.doc2.desc')}
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-800">
                  {[
                    t('team.doc2.li1'),
                    t('team.doc2.li2'),
                    t('team.doc2.li3'),
                    t('team.doc2.li4'),
                    t('team.doc2.li5'),
                    t('team.doc2.li6'),
                    t('team.doc2.li7'),
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-extrabold text-2xl leading-none">
                        •
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <Button text={t('team.doc2.btn')} to="/booking" />
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 rounded-md overflow-hidden">
                <Image
                  src={homeImage(t('team.doc2.img'))}
                  alt={t('team.doc2.name')}
                  width={600}
                  height={600}
                  className="aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            </article>
          </div>
        </section>

        {/* Section 4: DỊCH VỤ ĐƯỢC YÊU THÍCH */}
        <section className="section">
          <div className="text-center">
            <div className="section-title text-center">
              {t('faServices.title')}
            </div>
          </div>

          {/* Cards */}
          <FavServices />

          <Button text={t('faServices.btn')} to="/services" />
        </section>

        {/* Section 5: Ảnh khách hàng */}
        <section className="section">
          <div className="text-center">
            <div className="section-title text-center">{t('cusImg.title')}</div>
          </div>
          <div className="">
            <CustomerImagesCarousel />
          </div>
        </section>

        {/* Section 6: Google Reviews */}
        <section className="section">
          <div className="text-center">
            <div className="section-title text-center">
              {t('cusReviews.title')}
            </div>
          </div>
          <div className="">
            <FiveStarReviews />
          </div>
        </section>
      </main>

      {/* Section 7: Bản đồ + form đặt lịch */}
      <BookingMapSection />
    </div>
    </>
  );
}
