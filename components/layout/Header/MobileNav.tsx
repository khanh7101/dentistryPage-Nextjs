'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import LanguageToggle from '@/components/LanguageToggle';
import { NAVIGATION_ITEMS } from '@/lib/config/navigation';

interface MobileNavProps {
  isPathActive: (to: string) => boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  mobileSvOpen: Record<string, boolean>;
  setMobileSvOpen: (open: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  mobileRef: React.RefObject<HTMLDivElement | null>;
}

const STYLES = {
  nav: 'md:hidden px-4 relative z-[110] left-0 right-0',
  menu: 'absolute left-0 right-0 shadow-lg rounded-b-lg mt-2 px-4 bg-white/90 backdrop-blur-md',
  toggleBar: 'flex justify-end items-center bg-transparent',
  menuButton: 'absolute left-2 p-2 text-brand hover:bg-brand hover:text-white rounded-md',
  item: 'block rounded-md px-3 py-2 text-base font-medium',
  dropdown: 'pl-4 space-y-1 bg-none',
};

/**
 * Mobile navigation component
 */
export function MobileNav({
  isPathActive,
  mobileOpen,
  setMobileOpen,
  mobileSvOpen,
  setMobileSvOpen,
  mobileRef,
}: MobileNavProps) {
  const t = useTranslations('common');
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle ESC key to close menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMobileSvOpen({});
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen, setMobileOpen, setMobileSvOpen]);

  // Focus management: focus first link when menu opens
  useEffect(() => {
    if (mobileOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [mobileOpen]);

  return (
    <div className={STYLES.nav} ref={mobileRef}>
      {/* Toggle bar */}
      <div className={STYLES.toggleBar}>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`${STYLES.menuButton} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          ref={menuRef}
          className={STYLES.menu}
          role="menu"
          aria-label="Main navigation"
        >
          {NAVIGATION_ITEMS.map((item, index) =>
            !item.children ? (
              <Link
                key={item.to}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.to}
                className={[
                  STYLES.item,
                  isPathActive(item.to)
                    ? 'bg-brand text-white'
                    : 'text-brand hover:bg-brand/10',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                ].join(' ')}
                onClick={() => setMobileOpen(false)}
                role="menuitem"
              >
                {t(item.key)}
              </Link>
            ) : (
              <div key={item.to}>
                <div className="flex w-full">
                  <Link
                    href={item.to}
                    className={[
                      STYLES.item,
                      'flex-1 text-brand hover:bg-brand/10',
                      isPathActive(item.to) ? 'bg-brand text-white' : '',
                    ].join(' ')}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.key)}
                  </Link>

                  <button
                    type="button"
                    className="rounded-md px-3 py-2 text-brand hover:bg-brand/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    onClick={() =>
                      setMobileSvOpen((prev) => ({
                        ...prev,
                        [item.to]: !prev[item.to],
                      }))
                    }
                    aria-label={`Toggle ${t(item.key)} submenu`}
                    aria-expanded={mobileSvOpen[item.to] || false}
                    aria-controls={`submenu-${item.to}`}
                  >
                    <svg
                      className={`h-5 w-5 transform transition-transform ${
                        mobileSvOpen[item.to] ? 'rotate-180' : ''
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
                  <div
                    id={`submenu-${item.to}`}
                    className={STYLES.dropdown}
                    role="menu"
                    aria-label={`${t(item.key)} submenu`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        href={child.to}
                        className={[
                          STYLES.item,
                          isPathActive(child.to)
                            ? 'bg-brand text-white'
                            : 'text-brand hover:bg-brand/10',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                        ].join(' ')}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileSvOpen({});
                        }}
                        role="menuitem"
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
  );
}

