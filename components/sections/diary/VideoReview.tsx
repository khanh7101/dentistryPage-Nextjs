"use client";

// src/sections/review/VideoReview.tsx
import React, { useState, useEffect } from "react";

/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function VideoReview() {
  const ids = ["KKj27Nu_8RA", "L-_2r_w3yqc", "scDIIcKYt8c", "tneRp716g4M"];
  const A = "aspect-[9/16]"; // Tỉ lệ dọc Shorts
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative z-auto">
      {/* GRID VIDEO */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5 max-w-6xl mx-auto">
        {ids.map((id) => (
          <VideoCard key={id} id={id} A={A} onOpen={() => setSelected(id)} />
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selected && (
        <Lightbox onClose={() => setSelected(null)}>
          <iframe
            className="w-[90vw] max-w-[400px] aspect-[9/16] rounded-xl shadow-lg"
            src={`https://www.youtube.com/embed/${selected}?autoplay=1&rel=0&modestbranding=1`}
            title="Short video"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </Lightbox>
      )}
    </div>
  );
}

/* =========================================
   VIDEO CARD
   ========================================= */
function VideoCard({
  id,
  A,
  onOpen,
}: {
  id: string;
  A: string;
  onOpen: () => void;
}) {
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <article className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
        aria-label={`Play video ${id}`}
      >
        <div className={`${A} relative w-full`}>
          <img
            src={thumb}
            alt="YouTube thumbnail"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition" />
          <PlayIcon />
        </div>
      </button>
    </article>
  );
}

/* =========================================
   PLAY ICON OVERLAY
   ========================================= */
function PlayIcon() {
  return (
    <span className="absolute inset-0 grid place-items-center">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="white" className="opacity-90" />
        <polygon points="26,20 46,32 26,44" fill="black" />
      </svg>
    </span>
  );
}

/* =========================================
   LIGHTBOX MODAL
   ========================================= */
function Lightbox({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Disable scroll khi mở modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Focus management: focus close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Focus trap: keep focus within modal
  useEffect(() => {
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          ref={closeButtonRef}
          className="absolute -top-4 -right-4 bg-white rounded-full px-2.5 py-1.5 shadow text-xl leading-none hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/80"
          onClick={onClose}
          aria-label="Close video"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

