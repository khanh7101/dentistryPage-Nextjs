// lib/utils/assetMaps.ts

// Base path cho từng nhóm ảnh trong public/images
const IMAGE_BASE = {
  favoriteService: "/images/home/favorite_service",
  customReview: "/images/home/custom_review",
  home: "/images/home",
  brand: "/images/brand",
  about: "/images/about",
  diary: "/images/diary",
  booking: "/images/booking",
  service: "/images/services/service",
  general: "/images/services/general",
  porcelain: "/images/services/porcelain",
  orthodontic: "/images/services/orthodontic",
  implant: "/images/services/implant",
  blog: "/images/blog",
} as const;

export type ImageGroup = keyof typeof IMAGE_BASE;

/**
 * Trả về path ảnh dưới public/, ví dụ:
 * getImageUrl("home", "banner.jpg") → "/images/home/banner.jpg"
 */
export function getImageUrl(group: ImageGroup, filename: string) {
  const base = IMAGE_BASE[group];
  if (!filename) return base; // fallback nhẹ nhàng, tránh crash
  return `${base}/${filename}`;
}

/**
 * Alias helpers để code đọc dễ hơn
 * Ví dụ: favoriteServiceImage("1.jpg")
 */
export const favoriteServiceImage = (filename: string) =>
  getImageUrl("favoriteService", filename);

export const customReviewImage = (filename: string) =>
  getImageUrl("customReview", filename);

export const homeImage = (filename: string) =>
  getImageUrl("home", filename);

export const brandImage = (filename: string) =>
  getImageUrl("brand", filename);

export const aboutImage = (filename: string) =>
  getImageUrl("about", filename);

export const diaryImage = (filename: string) =>
  getImageUrl("diary", filename);

export const bookingImage = (filename: string) =>
  getImageUrl("booking", filename);

export const serviceImage = (filename: string) =>
  getImageUrl("service", filename);

export const generalServiceImage = (filename: string) =>
  getImageUrl("general", filename);

export const porcelainServiceImage = (filename: string) =>
  getImageUrl("porcelain", filename);

export const orthodonticServiceImage = (filename: string) =>
  getImageUrl("orthodontic", filename);

export const implantServiceImage = (filename: string) =>
  getImageUrl("implant", filename);

export const blogImage = (blogNumber: string, filename: string) =>
  `${IMAGE_BASE.blog}/${blogNumber}/${filename}`;
