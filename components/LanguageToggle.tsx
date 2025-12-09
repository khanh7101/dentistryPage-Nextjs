'use client';

import type { FC } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import { IconFlagVN, IconFlagGB } from "@/components/icons/Icons";

type Props = {
  size?: number;
  variant?: "solid" | "ghost";
};

const LanguageToggle: FC<Props> = ({ size = 22, variant = "ghost" }) => {
  const locale = useLocale(); // từ next-intl, vd: "vi" | "en"
  const router = useRouter();
  const pathname = usePathname();

  const isVI = locale.toLowerCase().startsWith("vi");

  const btnBase =
    "inline-flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 active:scale-95";
  const solid = "bg-white/90 text-slate-900 hover:bg-white shadow hover:shadow-md";
  const ghost = "bg-white/15 text-white hover:bg-white/30 hover:shadow-md";

  const onClick = () => {
    const nextLocale = isVI ? "en" : "vi";

    // Sử dụng window.location.pathname để lấy full path (có locale prefix)
    const currentPath = typeof window !== 'undefined' 
      ? window.location.pathname 
      : pathname;
    
    // Debug logs (chỉ trong development)
    if (process.env.NODE_ENV === 'development') {
      console.log('LanguageToggle Debug:', {
        currentPath,
        pathname,
        locale,
        nextLocale,
      });
    }
    
    // Loại bỏ locale prefix hiện tại từ currentPath
    let pathWithoutLocale = currentPath;
    
    // Xử lý các trường hợp:
    // "/vi/about" → "/about"
    // "/vi" → "/"
    // "/en/services/general" → "/services/general"
    if (pathWithoutLocale.startsWith('/vi/')) {
      pathWithoutLocale = pathWithoutLocale.slice(3); // Bỏ "/vi"
    } else if (pathWithoutLocale.startsWith('/en/')) {
      pathWithoutLocale = pathWithoutLocale.slice(3); // Bỏ "/en"
    } else if (pathWithoutLocale === '/vi' || pathWithoutLocale === '/en') {
      pathWithoutLocale = '/';
    }
    
    // Đảm bảo path bắt đầu bằng /
    if (!pathWithoutLocale.startsWith("/")) {
      pathWithoutLocale = `/${pathWithoutLocale}`;
    }
    
    // Tạo path mới với locale mới
    const newPath = pathWithoutLocale === "/" 
      ? `/${nextLocale}` 
      : `/${nextLocale}${pathWithoutLocale}`;
    
    // Debug log new path
    if (process.env.NODE_ENV === 'development') {
      console.log('LanguageToggle - Path without locale:', pathWithoutLocale);
      console.log('LanguageToggle - New path:', newPath);
    }
    
    // Sử dụng window.location.href để đảm bảo full navigation
    // router.replace có thể tự động thêm locale prefix, gây lỗi
    if (typeof window !== 'undefined') {
      window.location.href = newPath;
    } else {
      router.replace(newPath, { scroll: false });
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isVI ? "Switch to English" : "Chuyển sang Tiếng Việt"}
      title={isVI ? "English" : "Tiếng Việt"}
      className={`${btnBase} ${variant === "solid" ? solid : ghost}`}
      style={{ width: size + 12, height: size + 12 }}
    >
      {isVI ? <IconFlagGB size={size} /> : <IconFlagVN size={size} />}
    </button>
  );
};

export default LanguageToggle;
