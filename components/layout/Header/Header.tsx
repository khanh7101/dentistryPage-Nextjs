'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/lib/i18n/routing';
import { HeaderTopBar } from './HeaderTopBar';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import { useMobileMenu } from './hooks/useMobileMenu';
import LanguageToggle from '@/components/LanguageToggle';

/**
 * Main Header component
 */
export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const scrolled = useHeaderScroll();
  const {
    mobileOpen,
    setMobileOpen,
    mobileSvOpen,
    setMobileSvOpen,
    mobileRef,
  } = useMobileMenu();

  // Normalize pathname for active state detection
  const normalizedPath =
    pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
      ? pathname.slice(locale.length + 1) || '/'
      : pathname || '/';

  const isPathActive = (to: string) =>
    normalizedPath === to || normalizedPath.startsWith(to + '/');

  return (
    <>
      <HeaderTopBar />

      {/* Sticky nav */}
      <div className="sticky top-0 z-[100]">
        <nav
          className={[
            'relative bg-white py-2 supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:backdrop-blur',
            scrolled ? 'shadow-md ring-1 ring-black/5' : '',
          ].join(' ')}
        >

          <DesktopNav isPathActive={isPathActive} />
          <MobileNav
            isPathActive={isPathActive}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            mobileSvOpen={mobileSvOpen}
            setMobileSvOpen={setMobileSvOpen}
            mobileRef={mobileRef}
          />
        </nav>
      </div>
    </>
  );
}

