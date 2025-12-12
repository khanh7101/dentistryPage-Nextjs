// components/Collapse.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Collapse({
  open,
  children,
  collapsedHeight = 120,
  duration = 280,
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
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [height, setHeight] = useState<number | "auto">(open ? "auto" : collapsedHeight);
  const [isAnimating, setIsAnimating] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Cleanup previous animation scheduling
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (prefersReduced) {
      setIsAnimating(false);
      setHeight(open ? "auto" : collapsedHeight);
      return;
    }

    setIsAnimating(true);

    const currentHeight = el.getBoundingClientRect().height;
    const full = el.scrollHeight;

    // Start from current layout height (number)
    setHeight(currentHeight);

    // schedule next frame to trigger transition to target height
    rafRef.current = requestAnimationFrame(() => {
      // schedule actual height change in next frame to ensure transition
      if (open) {
        setHeight(full);
      } else {
        setHeight(collapsedHeight);
      }
      rafRef.current = null;
    });

    // After animation, reset flags; when opening we set height="auto"
    timeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      if (open) {
        setHeight("auto");
      }
      timeoutRef.current = null;
    }, duration + 40);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, collapsedHeight, duration, easing, prefersReduced]);

  // Nếu nội dung thay đổi khi đang mở và không đang animate -> đảm bảo auto để responsive
  useEffect(() => {
    if (open && !isAnimating && height !== "auto") {
      setHeight("auto");
    }
  }, [open, isAnimating]);

  const style: React.CSSProperties = prefersReduced
    ? { height: open ? "auto" : collapsedHeight, overflow: "hidden" }
    : {
        height,
        overflow: height === "auto" ? "visible" : "hidden",
        transition: isAnimating ? `height ${duration}ms ${easing}` : undefined,
      };

  return (
    <div className={className} style={style}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
