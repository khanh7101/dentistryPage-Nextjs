'use client';

import {useTranslations} from 'next-intl';
import FormBooking from '@/components/forms/FormBooking/FormBooking';
import { SITE_CONFIG } from '@/lib/config/constants';

export default function BookingMapSection() {
  const t = useTranslations('home');

  return (
    <section className="full-bleed">
      <div className="flex flex-col-reverse md:flex-row h-auto md:h-[520px] lg:h-[560px] relative">
        {/* MAP: fill toàn khung */}
        <iframe
          title="Passion Dental Clinic Location"
          className="md:absolute inset-0 h-full w-full"
          style={{border: 0}}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={SITE_CONFIG.googleMaps.embedUrl}
          allowFullScreen
        ></iframe>

        {/* FORM: overlay absolute bên phải */}
        <div className="md:absolute mx-5 md:mx-0 md:right-0 px-1 md:px-2 md:pt-2 mb-5 md:mb-0 z-10">
          <div className="pointer-events-auto md:w-[520px] rounded-xl md:rounded-l-2xl md:rounded-r-none bg-brand text-white shadow-xl ring-1 ring-black/10">
            <div className="px-5 py-4 md:px-8 md:py-8">
              <h3 className="text-xl font-bold tracking-wide md:text-2xl text-center">
                {t('bookingMap.title')}
              </h3>
              <p className="mt-1 text-white/90 text-center mb-5">
                {t('bookingMap.desc')}
              </p>
              <FormBooking
                variant="overlay"
                onSuccess={() => {
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

