"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import {
  IconHome,
  IconPhone,
  IconMail,
  IconMapPin,
  IconFacebook,
  IconYoutube,
  IconTiktok,
} from "@/components/icons/Icons";
import Image from "next/image";
import { brandImage } from "@/lib/utils/assetMaps";

const SOCIAL = {
  facebook: "https://www.facebook.com/nhakhoapassiondanang",
  tiktok: "https://www.tiktok.com/@nhakhoapassion?_t=ZS-90bLr3cSddd&_r=1",
  youtube: "https://www.youtube.com/@NhaKhoaPassion%C4%90%C3%A0N%E1%BA%B5ng",
};

export default function Footer() {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand text-white">
      <div className="container py-6 md:py-12">
        {/* Main grid container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          {/* Left side - Logo and Contact */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Logo section */}
            <section className="flex items-center justify-center">
              <Image
                src={brandImage("logo.png")} // "/images/brand/logo.png"
                alt="Passion Dental Logo"
                width={160}
                height={160}
                className="h-36 w-auto object-contain md:h-40"
              />
            </section>

            {/* Contact section */}
            <section aria-labelledby="footer-contact">
              <h3
                id="footer-contact"
                className="mb-4 text-center text-base font-semibold md:text-left lg:text-lg"
              >
                {t("footer.contact.title")}
              </h3>

              <ul className="mx-auto grid max-w-md grid-cols-[24px_auto] gap-x-3 gap-y-4 text-white/90 md:mx-0 md:grid-cols-[28px_auto]">
                {/* Address */}
                <li className="contents">
                  <IconHome size={24} className="mt-1 opacity-90" />
                  <span className="text-sm md:text-base">
                    {t("footer.contact.address")}
                  </span>
                </li>

                {/* Phone */}
                <li className="contents">
                  <IconPhone size={24} className="opacity-90" />
                  <a
                    href={`tel:${t("footer.contact.phone").replace(/\s+/g, "")}`}
                    className="text-sm hover:underline md:text-base"
                  >
                    {t("footer.contact.phone")}
                  </a>
                </li>

                {/* Email */}
                <li className="contents">
                  <IconMail size={24} className="opacity-90" />
                  <a
                    href={`mailto:${t("footer.contact.email")}`}
                    className="text-sm hover:underline md:text-base"
                  >
                    {t("footer.contact.email")}
                  </a>
                </li>

                {/* Hours */}
                <li className="contents">
                  <IconMapPin size={24} className="opacity-90" />
                  <span className="text-sm md:text-base">
                    {t("footer.contact.hours")}
                  </span>
                </li>
              </ul>
            </section>
          </div>

          {/* Right side - Services and Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Services section */}
            <section
              aria-labelledby="footer-services"
              className="grid text-center md:grid-cols-4 md:text-left"
            >
              <div className="col-span-1 hidden md:block" />
              <div className="md:col-span-3">
                <h3
                  id="footer-services"
                  className="mb-2 text-base font-semibold lg:mb-4 lg:text-lg"
                >
                  {t("footer.services.title")}
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li>
                    <Link
                      href="/services/general"
                      className="inline-block text-sm hover:underline md:text-base"
                    >
                      {t("footer.services.line1")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/implant"
                      className="inline-block text-sm hover:underline md:text-base"
                    >
                      {t("footer.services.line2")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/orthodontic"
                      className="inline-block text-sm hover:underline md:text-base"
                    >
                      {t("footer.services.line3")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/porcelain"
                      className="inline-block text-sm hover:underline md:text-base"
                    >
                      {t("footer.services.line4")}
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            {/* Quick Links section */}
            <section
              aria-labelledby="footer-quick"
              className="text-center md:text-left"
            >
              <h3
                id="footer-quick"
                className="mb-2 text-base font-semibold md:mb-4 md:text-lg"
              >
                {t("footer.quicklinks.title")}
              </h3>
              <ul className="space-y-3 text-white/90">
                <li>
                  <Link
                    href="/booking"
                    className="inline-block text-sm hover:underline md:text-base"
                  >
                    {t("footer.quicklinks.items.appointment")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-sm hover:underline md:text-base"
                  >
                    {t("footer.quicklinks.items.home")}
                  </Link>
                </li>
              </ul>

              {/* Social icons (optional in footer) */}
              <div className="mt-4 flex justify-center gap-3 md:justify-start">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
                  aria-label="Facebook"
                >
                  <IconFacebook className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
                  aria-label="YouTube"
                >
                  <IconYoutube className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
                  aria-label="TikTok"
                >
                  <IconTiktok className="h-4 w-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="container py-3 text-center text-xs text-white/80 sm:py-4 sm:text-sm">
          {t("footer.bottom.short", { year })}
        </div>
      </div>
    </footer>
  );
}
