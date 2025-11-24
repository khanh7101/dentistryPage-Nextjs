'use client';

import { Link } from '@/lib/i18n/routing';
import { IconPhone } from '@/components/icons/Icons';
import Image from 'next/image';
import { brandImage } from '@/lib/utils/assetMaps';
import { SOCIAL_LINKS } from '@/lib/config/social';
import { SITE_CONFIG } from '@/lib/config/constants';

/**
 * Header top bar component with logo, phone, and social links
 */
export function HeaderTopBar() {
  return (
    <div className="w-full bg-brand">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2"
          aria-label="Passion Dental - Home"
        >
          <Image
            src={brandImage('logo.png')}
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
  );
}

