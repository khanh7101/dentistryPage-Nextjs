// app/layout.tsx
// Root layout - Next.js yêu cầu phải có html/body
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const dynamic = "force-dynamic";

// Metadata base URL để đảm bảo logo và images được resolve đúng
export const metadata: Metadata = {
  metadataBase: new URL('https://passiondental.vn'),
  icons: {
    icon: '/images/brand/logo.png',
    apple: '/images/brand/logo.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();

  // Root layout phải có html/body (Next.js requirement)
  // Locale layout sẽ override lang attribute
  return (
    <html lang="vi">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
