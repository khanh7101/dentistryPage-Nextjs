"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "@/lib/i18n/routing";
import { useSearchParams } from "next/navigation";

type Props = {
  children?: ReactNode;
  behavior?: ScrollBehavior; // "auto" | "smooth"
};

export default function ScrollToTop({
  children,
  behavior = "auto",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scrollToTop = () => {
    // Lấy hash từ URL (vd: #contact)
    const hash = window.location.hash;

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Delay thêm một chút để đảm bảo element đã render
        setTimeout(() => {
          el.scrollIntoView({ behavior });
        }, 100);
        return;
      }
    }

    // Mặc định: cuộn lên đầu trang
    // Scroll cả documentElement và body để đảm bảo hoạt động trên mọi browser
    window.scrollTo({ top: 0, left: 0, behavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Force scroll cho các trường hợp đặc biệt
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  useEffect(() => {
    // Scroll khi route thay đổi
    const timer = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timer);
  }, [pathname, searchParams?.toString(), behavior]);

  useEffect(() => {
    // Scroll khi page load lần đầu (refresh hoặc direct navigation)
    if (typeof window !== 'undefined') {
      // Nếu page đã load xong
      if (document.readyState === 'complete') {
        scrollToTop();
      } else {
        // Đợi page load xong
        window.addEventListener('load', scrollToTop, { once: true });
        return () => window.removeEventListener('load', scrollToTop);
      }
    }
  }, []);

  return <>{children}</>;
}
