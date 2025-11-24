// components/icons/Icons.tsx

import type { SVGProps, ReactNode, FC } from "react";

/* ================================================
   🔹 Base type for all icons
   ================================================ */
export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string; // icon size (px, em, rem)
  strokeWidth?: number; // for stroke-based icons
  className?: string; // Tailwind or custom class
};

/* ================================================
   🔹 Constants
   ================================================ */
const DEFAULT_ICON_SIZE = 20;
const DEFAULT_STROKE_WIDTH = 1.7;

/* ================================================
   🔹 Reusable base component for stroke icons
   ================================================ */
function IconBase({
  size = DEFAULT_ICON_SIZE,
  className = "",
  strokeWidth = DEFAULT_STROKE_WIDTH,
  children,
  ...rest
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ================================================
   🔹 Simple menu / close icons
   ================================================ */
export function IconMenu({
  size = 24,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export function IconClose({
  size = 24,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/* ================================================
   🔹 Stroke icons
   ================================================ */
export const IconHome = (props: IconProps) => (
  <IconBase {...props}>
    <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" />
  </IconBase>
);

export const IconPhone = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.15 9.81 19.79 19.79 0 0 1 .08 1.18 2 2 0 0 1 2.06 0h3a2 2 0 0 1 2 1.72c.12.89.31 1.76.57 2.6a2 2 0 0 1-.45 2.11L6.1 7.91a16 16 0 0 0 7 7l1.48-1.08a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.6.57A2 2 0 0 1 22 16.92z" />
  </IconBase>
);

export const IconMail = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 4h16a2 2 0 0 1 2 2v.5L12 13 2 6.5V6a2 2 0 0 1 2-2Zm18 4.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.5l10 6.5 10-6.5Z" />
  </IconBase>
);

export const IconMapPin = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10Z" />
    <circle cx="12" cy="11" r="2.5" />
  </IconBase>
);

export const IconClock = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
);

export const IconSearch = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-3.5-3.5" />
  </IconBase>
);

export const IconCheck = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M20 6L9 17l-5-5" />
  </IconBase>
);

/* ================================================
   🔹 Fill icons (brand / social)
   ================================================ */
export const IconFacebook = ({
  size = 20,
  className = "",
  ...rest
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M22.676 0H1.324A1.324 1.324 0 000 1.324v21.352C0 23.4.6 24 1.324 24h11.49v-9.294H9.847v-3.62h2.967V8.413c0-2.94 1.795-4.544 4.416-4.544 1.255 0 2.333.093 2.646.135v3.067h-1.815c-1.423 0-1.697.676-1.697 1.67v2.188h3.392l-.442 3.62h-2.95V24h5.782A1.324 1.324 0 0024 22.676V1.324A1.324 1.324 0 0022.676 0z" />
  </svg>
);

export const IconYoutube = ({
  size = 20,
  className = "",
  ...rest
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M23.498 6.186a3.01 3.01 0 00-2.12-2.121C19.614 3.5 12 3.5 12 3.5s-7.614 0-9.378.565A3.01 3.01 0 00.502 6.186 31.84 31.84 0 000 12a31.84 31.84 0 00.502 5.814 3.01 3.01 0 002.12 2.121C4.386 20.5 12 20.5 12 20.5s7.614 0 9.378-.565a3.01 3.01 0 002.12-2.121A31.84 31.84 0 0024 12a31.84 31.84 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
  </svg>
);

export const IconTiktok = ({ size = 20, className = "", ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M16 3a6.5 6.5 0 0 0 .1 1.2 5.9 5.9 0 0 0 4.6 4.6A8.3 8.3 0 0 0 21 6.7v3.1a8.6 8.6 0 0 1-4.8-1.5v6.8a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .8.1v3a2.9 2.9 0 1 0 2.1 2.8V3h2.8z" />
  </svg>
);

export const IconInstagram = ({
  size = 20,
  className = "",
  ...rest
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...rest}
  >
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5Zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7ZM18 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
);

/* ================================================
   🔹 Arrow (from SVGRepo)
   ================================================ */
export const IconArrowRight = (props: IconProps) => (
  <IconBase {...props} strokeWidth={2}>
    <path d="M5 12H19M19 12L13 6M19 12L13 18" />
  </IconBase>
);

/* ================================================
   🔹 Flags
   ================================================ */
export const IconFlagVN = ({
  size = 20,
  className = "",
  ...rest
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 640 480"
    className={className}
    {...rest}
  >
    <path fill="#da251d" d="M0 0h640v480H0z" />
    <path
      fill="#ff0"
      d="m320 96 36.5 112.3h118.1l-95.5 69.4 36.5 112.3L320 320.6 224.4 390l36.5-112.3-95.5-69.4h118.1z"
    />
  </svg>
);

export const IconFlagGB = ({
  size = 20,
  className = "",
  ...rest
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 640 480"
    className={className}
    {...rest}
  >
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path
      fill="#FFF"
      d="M241 0v480h160V0H241zM0 160v160h640V160H0z"
    />
    <path
      fill="#C8102E"
      d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
    />
  </svg>
);

/* ================================================
   🔹 Dynamic Icon registry
   ================================================ */
export type IconName =
  | "home"
  | "phone"
  | "mail"
  | "map-pin"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "instagram"
  | "arrow-right"
  | "check";

const ICONS: Record<IconName, FC<IconProps>> = {
  home: IconHome,
  phone: IconPhone,
  mail: IconMail,
  "map-pin": IconMapPin,
  facebook: IconFacebook,
  youtube: IconYoutube,
  tiktok: IconTiktok,
  instagram: IconInstagram,
  "arrow-right": IconArrowRight,
  check: IconCheck,
};

/** Use like: <Icon name="phone" size={24} className="text-brand" /> */
export function Icon({
  name,
  ...props
}: { name: IconName } & IconProps) {
  const Component = ICONS[name];
  return <Component {...props} />;
}

export default ICONS;
