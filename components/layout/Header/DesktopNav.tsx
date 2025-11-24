'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { NAVIGATION_ITEMS } from '@/lib/config/navigation';

interface DesktopNavProps {
  isPathActive: (to: string) => boolean;
}

const STYLES = {
  navLink: {
    base: 'inline-block w-full px-3 py-2 rounded-lg hover:bg-brand hover:text-white transition-colors duration-200 font-semibold',
    active: 'bg-brand text-white',
  },
  dropdown: {
    item: 'block px-4 py-2 rounded-md transition-colors duration-200',
  },
};

/**
 * Desktop navigation component
 */
export function DesktopNav({ isPathActive }: DesktopNavProps) {
  const t = useTranslations('common');
  const [megaOpen, setMegaOpen] = useState(false);

  return (
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
                  className={[navLink.base, active ? navLink.active : ''].join(' ')}
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
                  megaOpen ? 'bg-brand text-white' : '',
                  !megaOpen && parentActive ? navLink.active : '',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                ].join(' ')}
                aria-haspopup="true"
                aria-expanded={megaOpen}
              >
                <span className="block truncate text-sm md:text-base">
                  {t(item.key)}
                </span>
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 top-full mt-2 w-[220px] -translate-x-1/2 rounded-lg border bg-white shadow-xl transition-all duration-200 ${
                  megaOpen ? 'visible opacity-100' : 'invisible opacity-0'
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
                              ? 'bg-brand text-white font-semibold'
                              : 'text-slate-700 hover:bg-brand hover:text-white font-medium',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                          ].join(' ')}
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
    </div>
  );
}

