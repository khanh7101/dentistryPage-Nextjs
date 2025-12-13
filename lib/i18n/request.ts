// lib/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = (await requestLocale) || 'vi';

  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;
  const about = (await import(`../../messages/${locale}/about.json`)).default;
  const services = (await import(`../../messages/${locale}/services.json`)).default;
  const booking = (await import(`../../messages/${locale}/booking.json`)).default;
  const diary = (await import(`../../messages/${locale}/diary.json`)).default;
  const seo = (await import(`../../messages/${locale}/seo.json`)).default;
  const blog = (await import(`../../messages/${locale}/blog.json`)).default;

  return {
    locale,
    messages: {
      common,
      home,
      about,
      services,
      booking,
      diary,
      seo,
      blog,
    },
  };
});
