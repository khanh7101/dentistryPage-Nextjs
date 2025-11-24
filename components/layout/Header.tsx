"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/routing";
import LanguageToggle from "@/components/LanguageToggle";
import { IconPhone } from "@/components/icons/Icons";
import Image from "next/image";
import { brandImage } from "@/lib/utils/assetMaps";
import { SOCIAL_LINKS } from "@/lib/config/social";
import { NAVIGATION_ITEMS } from "@/lib/config/navigation";
import { SITE_CONFIG } from "@/lib/config/constants";

/* ===========================================
   Styles
   =========================================== */
const STYLES = {
  navLink: {
    base: "inline-block w-full px-3 py-2 rounded-lg hover:bg-brand hover:text-white transition-colors duration-200 font-semibold",
    active: "bg-brand text-white",
  },
  dropdown: {
    item: "block px-4 py-2 rounded-md transition-colors duration-200",
  },
  mobile: {
    nav: "md:hidden px-4 relative z-[110] left-0 right-0",
    menu: "absolute left-0 right-0 shadow-lg rounded-b-lg mt-2 px-4 bg-white/90 backdrop-blur-md",
    toggleBar: "flex justify-end items-center bg-transparent",
    menuButton:
      "absolute left-2 p-2 text-brand hover:bg-brand hover:text-white rounded-md",
    item: "block rounded-md px-3 py-2 text-base font-medium",
    dropdown: "pl-4 space-y-1 bg-none",
  },
};

/* ===========================================
   Component
   =========================================== */
export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSvOpen, setMobileSvOpen] = useState<Record<string, boolean>>({});
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  // Nếu usePathname từ next-intl đã loại prefix locale thì đoạn này
  // vẫn an toàn. Nếu không, ta strip /vi, /en khỏi pathname.
  const normalizedPath =
    pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
      ? pathname.slice(locale.length + 1) || "/"
      : pathname || "/";

  const isPathActive = (to: string) =>
    normalizedPath === to || normalizedPath.startsWith(to + "/");

  /* ============ Scroll shadow ============ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ============ Click outside mobile menu ============ */
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        mobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="w-full bg-brand">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2"
            aria-label="Passion Dental - Home"
          >
            <Image
              src={brandImage("logo.png")} // "/images/brand/logo.png"
              alt="Passion Dental Logo"
              width={96}
              height={96}
              priority
              className="h-16 w-auto object-contain md:h-24"
            />
          </Link>

          {/* Hotline & Socials */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Hotline */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1.5 text-xs font-semibold text-brand md:gap-2 md:px-3 md:py-2 md:text-sm"
            >
              <IconPhone className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
            </a>

            {/* Social icons */}
            <div className="hidden items-center gap-2 md:gap-3 sm:flex">
              {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/30 focus:ring-2 focus:ring-white/50"
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky nav */}
      <div className="sticky top-0 z-[100]">
        {/* Giữ z-index của nav thấp hơn modal image preview */}
        <nav
          className={[
            "bg-white py-2 supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:backdrop-blur",
            scrolled ? "shadow-md ring-1 ring-black/5" : "",
          ].join(" ")}
        >
          {/* ========== Desktop Nav ========== */}
          <div className="relative mx-auto hidden max-w-6xl items-center px-4 text-brand sm:px-6 lg:px-8 md:flex">
            {/* Nav Items */}
            <ul className="flex flex-1 items-stretch justify-between gap-1 pr-12">
              {NAVIGATION_ITEMS.map((item) => {
                const { navLink, dropdown } = STYLES;

                /* -------- Item không có children -------- */
                if (!item.children) {
                  const active = isPathActive(item.to);
                  return (
                    <li key={item.to} className="grow text-center">
                      <Link
                        href={item.to}
                        className={[
                          navLink.base,
                          active ? navLink.active : "",
                        ].join(" ")}
                      >
                        <span className="block truncate text-sm md:text-base">
                          {t(item.key)}
                        </span>
                      </Link>
                    </li>
                  );
                }

                /* -------- Item có children (Services) -------- */
                const parentActive = isPathActive(item.to);

                return (
                  <li
                    key={item.to}
                    className="relative grow text-center"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={item.to}
                      className={[
                        navLink.base,
                        megaOpen ? "bg-brand text-white" : "",
                        !megaOpen && parentActive ? navLink.active : "",
                      ].join(" ")}
                    >
                      <span className="block truncate text-sm md:text-base">
                        {t(item.key)}
                      </span>
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-1/2 top-full mt-2 w-[220px] -translate-x-1/2 rounded-lg border bg-white shadow-xl transition-all duration-200 ${
                        megaOpen ? "visible opacity-100" : "invisible opacity-0"
                      }`}
                    >
                      {/* Invisible bridge div */}
                      <div className="absolute -top-2 left-0 right-0 h-2" />

                      <ul className="py-2">
                        {item.children.map((c) => {
                          const childActive = isPathActive(c.to);
                          return (
                            <li key={c.to}>
                              <Link
                                href={c.to}
                                className={[
                                  dropdown.item,
                                  childActive
                                    ? "bg-brand text-white font-semibold"
                                    : "text-slate-700 hover:bg-brand hover:text-white font-medium",
                                ].join(" ")}
                              >
                                {t(c.key)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Language Toggle - Absolute Position (trong wrapper relative) */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <LanguageToggle />
            </div>
          </div>

          {/* ========== Mobile Nav ========== */}
          <div className={STYLES.mobile.nav} ref={mobileRef}>
            {/* Toggle bar */}
            <div className={STYLES.mobile.toggleBar}>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className={STYLES.mobile.menuButton}
              >
                {mobileOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <LanguageToggle />
            </div>

            {/* Collapsible menu */}
            {mobileOpen && (
              <div className={STYLES.mobile.menu}>
                {NAVIGATION_ITEMS.map((item) =>
                  !item.children ? (
                    <Link
                      key={item.to}
                      href={item.to}
                      className={[
                        STYLES.mobile.item,
                        isPathActive(item.to)
                          ? "bg-brand text-white"
                          : "text-brand hover:bg-brand/10",
                      ].join(" ")}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ) : (
                    <div key={item.to}>
                      <div className="flex w-full">
                        <Link
                          href={item.to}
                          className={[
                            STYLES.mobile.item,
                            "flex-1 text-brand hover:bg-brand/10",
                            isPathActive(item.to)
                              ? "bg-brand text-white"
                              : "",
                          ].join(" ")}
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(item.key)}
                        </Link>

                        <button
                          type="button"
                          className="rounded-md px-3 py-2 text-brand hover:bg-brand/10"
                          onClick={() =>
                            setMobileSvOpen((prev) => ({
                              ...prev,
                              [item.to]: !prev[item.to],
                            }))
                          }
                        >
                          <svg
                            className={`h-5 w-5 transform transition-transform ${
                              mobileSvOpen[item.to] ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                        </button>
                      </div>

                      {mobileSvOpen[item.to] && (
                        <div className={STYLES.mobile.dropdown}>
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              href={child.to}
                              className={[
                                STYLES.mobile.item,
                                isPathActive(child.to)
                                  ? "bg-brand text-white"
                                  : "text-brand hover:bg-brand/10",
                              ].join(" ")}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSvOpen({});
                              }}
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
