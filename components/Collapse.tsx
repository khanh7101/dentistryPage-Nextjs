// components/Collapse.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Collapse({
  open,
  children,
  collapsedHeight = 120,       // px khi thu gọn
  duration = 280,               // ms
  easing = "cubic-bezier(0.2, 0.7, 0.2, 1)",
  className = "",
}: {
  open: boolean;
  children: React.ReactNode;
  collapsedHeight?: number;
  duration?: number;
  easing?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">(open ? "auto" : collapsedHeight);
  const [isAnimating, setIsAnimating] = useState(false);

  // Tắt animation nếu user chọn reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const full = el.scrollHeight; // chiều cao thật
    if (prefersReduced) {
      // Không animate, nhảy thẳng
      setHeight(open ? "auto" : collapsedHeight);
      return;
    }

    setIsAnimating(true);

    if (open) {
      // 1) từ height hiện tại -> full
      setHeight(el.getBoundingClientRect().height);
      requestAnimationFrame(() => {
        setHeight(full);
      });
    } else {
      // 1) từ height hiện tại -> collapsedHeight
      setHeight(el.getBoundingClientRect().height);
      requestAnimationFrame(() => {
        setHeight(collapsedHeight);
      });
    }

    const t = setTimeout(() => {
      // Khi mở xong thì để "auto" để nội dung responsive
      setIsAnimating(false);
      if (open) setHeight("auto");
    }, duration + 40);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, collapsedHeight, prefersReduced]);

  // Khi content thay đổi mà đang mở, cập nhật height=auto
  useEffect(() => {
    if (open && !isAnimating) setHeight("auto");
  }, [children, open, isAnimating]);

  const style: React.CSSProperties = prefersReduced
    ? { height: open ? "auto" : collapsedHeight, overflow: "hidden" }
    : {
        height,
        overflow: "hidden",
        transition: isAnimating ? `height ${duration}ms ${easing}` : undefined,
      };

  return (
    <div className={className} style={style} aria-hidden={!open && height !== "auto"}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
