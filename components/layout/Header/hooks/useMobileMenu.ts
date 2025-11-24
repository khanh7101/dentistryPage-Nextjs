import { useEffect, useRef, useState } from 'react';

/**
 * Hook for mobile menu state and click outside detection
 */
export function useMobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSvOpen, setMobileSvOpen] = useState<Record<string, boolean>>({});
  const mobileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        mobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [mobileOpen]);

  return {
    mobileOpen,
    setMobileOpen,
    mobileSvOpen,
    setMobileSvOpen,
    mobileRef,
  };
}

