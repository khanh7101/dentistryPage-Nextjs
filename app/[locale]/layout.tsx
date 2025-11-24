// app/[locale]/layout.tsx
import type {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/lib/i18n/routing';
import MainLayout from '@/components/layout/MainLayout';
import LangUpdater from '@/components/layout/LangUpdater';
import ScrollToTop from '@/components/ScrollToTop';
import {Toaster} from 'react-hot-toast';

type Props = {
  children: ReactNode;
  // ✅ params là Promise
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  // ✅ Phải await
  const {locale} = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  // Locale layout không nên có html/body vì root layout đã có
  // Chỉ wrap content và update lang attribute
  return (
    <>
      <LangUpdater />
      <ScrollToTop>
        <MainLayout>{children}</MainLayout>
      </ScrollToTop>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
