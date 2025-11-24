export type NavChild = { to: string; key: string };
export type NavItem =
  | { to: string; key: string; children?: undefined }
  | { to: string; key: string; children: NavChild[] };

export const NAVIGATION_ITEMS: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  {
    to: '/services',
    key: 'nav.services',
    children: [
      { to: '/services/general', key: 'nav.sv.general' },
      { to: '/services/orthodontic', key: 'nav.sv.ortho' },
      { to: '/services/implant', key: 'nav.sv.implant' },
      { to: '/services/porcelain', key: 'nav.sv.porcel' },
    ],
  },
  { to: '/diary', key: 'nav.smile_journal' },
  { to: '/knowledge', key: 'nav.knowledge' },
  { to: '/booking', key: 'nav.booking' },
] as const;

