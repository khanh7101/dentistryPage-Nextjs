// app/layout.tsx
// Root layout - Next.js yêu cầu phải có html/body
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.passiondental.com.vn"; // <-- chỉnh lại nếu cần (vd: https://www.passiondental.com.vn)
const OG_IMAGE = `${BASE_URL}/images/og/og-image.jpg`;
const LOGO = `${BASE_URL}/images/brand/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nha khoa Passion Đà Nẵng - Passion Dental Clinic",
    template: "%s | Passion Dental Clinic",
  },
  description:
    "Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.",
  icons: {
    icon: "/images/brand/logo.png",
    apple: "/images/brand/logo.png",
  },
  openGraph: {
    title: "Nha khoa Passion Đà Nẵng - Passion Dental Clinic",
    description:
      "Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.",
    url: BASE_URL,
    siteName: "Passion Dental Clinic",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Passion Dental Clinic - Đà Nẵng",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nha khoa Passion Đà Nẵng - Passion Dental Clinic",
    description:
      "Nha khoa Passion Đà Nẵng cung cấp các dịch vụ nha khoa toàn diện, bao gồm cấy ghép implant, chỉnh nha, răng sứ và điều trị tổng quát.",
    images: [OG_IMAGE],
  },
  // nếu cần alternates (multilang) có thể bổ sung ở đây
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();

  // Root layout phải có html/body (Next.js requirement)
  // Locale layout sẽ override lang attribute
  // Chèn JSON-LD (Organization + WebPage) để hỗ trợ Google hiểu rõ logo, image, description
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Passion Dental Clinic",
    url: BASE_URL,
    logo: LOGO,
    sameAs: [
      /* thêm link FB/IG nếu có, ex: "https://www.facebook.com/yourpage" */
    ],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: BASE_URL,
    name: "Passion Dental Clinic",
    description: metadata.description,
    image: OG_IMAGE,
  };

  return (
    <html lang="vi">
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLd, webPageLd]),
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
