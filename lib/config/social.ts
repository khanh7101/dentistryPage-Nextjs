import {
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconTiktok,
} from '@/components/icons/Icons';

export const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/nhakhoapassiondanang',
    Icon: IconFacebook,
    label: 'Facebook',
    ariaLabel: 'Visit our Facebook page',
  },
  {
    href: 'https://www.instagram.com/nhakhoapassiondanang',
    Icon: IconInstagram,
    label: 'Instagram',
    ariaLabel: 'Visit our Instagram page',
  },
  {
    href: 'https://www.youtube.com/@NhaKhoaPassion%C4%90%C3%A0N%E1%BA%B5ng',
    Icon: IconYoutube,
    label: 'YouTube',
    ariaLabel: 'Visit our YouTube channel',
  },
  {
    href: 'https://www.tiktok.com/@nhakhoapassion?_t=ZS-90bLr3cSddd&_r=1',
    Icon: IconTiktok,
    label: 'TikTok',
    ariaLabel: 'Visit our TikTok page',
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];

