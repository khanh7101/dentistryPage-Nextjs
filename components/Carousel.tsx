"use client";

// ================================================
// Carousel.tsx  (big visible arrows outside, fixed z-index & overflow)
// ================================================
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowButton } from "./ArrowButton";

export type Slide = { id: string | number; content: React.ReactNode };

export type CarouselProps = {
  slides: Slide[];
  showDots?: boolean;
};

export default function Carousel({ slides, showDots }: CarouselProps) {
  const total = slides.length;
  const [index, setIndex] = useState(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const ids = useMemo(() => slides.map((s) => s.id), [slides]);

  const goTo = (i: number) => setIndex((i % total + total) % total);
  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);

  // Auto-height: điều chỉnh chiều cao theo slide hiện tại
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const cur = slideRefs.current[index];
    if (!vp || !cur) return;

    const setH = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        vp.style.height = cur.offsetHeight + "px";
      });
    };
    setH();

    const ro = new ResizeObserver(setH);
    ro.observe(cur);

    const onResize = () => setH();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, ids]);

  // Vuốt chuyển slide
  const startX = useRef<number | null>(null);
  const tracking = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    startX.current = e.clientX;
    tracking.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!tracking.current || startX.current == null) return;
    const dx = e.clientX - startX.current;
    tracking.current = false;
    startX.current = null;
    const w = viewportRef.current?.clientWidth || 1;
    const threshold = Math.max(40, w * 0.12);
    if (Math.abs(dx) > threshold) go(dx > 0 ? -1 : 1);
  };

  if (!total) return null;

  return (
    <div
      className="  rounded-xl relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
    >
      {/* Viewport */}
      <div
        ref={viewportRef}
        className=" select-none touch-none "
        style={{ contain: "paint" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 will-change-transform"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="w-full shrink-0"
              ref={(el) => {
                slideRefs.current[i] = el || null;
              }}
            >
              {s.content}
            </div>
          ))}
        </div>

      </div>

      {/* Nút mũi tên trái / phải */}
        {total > 1 && (
  <>
            <ArrowButton side="left" onClick={() => go(-1)} ariaLabel="Previous slide" />
            <ArrowButton side="right" onClick={() => go(1)} ariaLabel="Next slide" />
          </>
        )}
        {/* Thanh vạch điều hướng */}
        {showDots && total > 1 && (
          <div className="absolute bottom-[-1vh] left-0 right-0 flex justify-center gap-1">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={`h-0.5 w-7 transition-all duration-300 ${
                    active
                      ? "bg-blue-500 shadow-sm scale-110"
                      : "bg-blue-300 hover:bg-blue-400"
                  }`}
                />
              );
            })}
          </div>
        )}
    </div>
  );
}
