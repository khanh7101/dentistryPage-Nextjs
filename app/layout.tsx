// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.passiondental.com.vn";
const LOGO = `${BASE_URL}/images/brand/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // Keep default minimal — page-level metadata will override this via generateMetadata
  title: {
    default: "Nha khoa Passion Đà Nẵng - Passion Dental Clinic",
    template: "%s |Passion Dental Clinic",
  },
  description: "Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện.",
  icons: {
    icon: "/images/brand/logo.png",
    apple: "/images/brand/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();

  // Only include Organization JSON-LD here (one single authoritative Organization object).
  // Do NOT include WebPage JSON-LD here (page-level StructuredData will emit that).
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Passion Dental Clinic",
    url: BASE_URL,
    logo: LOGO,
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd),
          }}
        />
      </head>

      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
