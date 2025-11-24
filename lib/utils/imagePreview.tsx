"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ImgHTMLAttributes,
  type MouseEventHandler,
  type WheelEventHandler,
} from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

/** Options khi mở modal xem ảnh */
export type ImagePreviewOptions = {
  src: string;
  alt?: string;
  caption?: string;
  /** fit = contain toàn màn, cover = phủ kín, original = giữ kích thước gốc (có kéo-zoom) */
  mode?: "fit" | "cover" | "original";
};

/** Gọi hàm này ở onClick để bật modal xem ảnh */
export function showImagePreview(opts: ImagePreviewOptions) {
  if (typeof window === "undefined") return;

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  const close = () => {
    root.unmount();
    container.remove();
    document.body.style.removeProperty("overflow");
  };

  // Khoá scroll nền
  document.body.style.overflow = "hidden";
  root.render(<ImagePreviewModal {...opts} onClose={close} />);
}

/** (Tuỳ chọn) Component ảnh có sẵn onClick mở modal */
export function ImageWithPreview(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    previewCaption?: string;
    previewMode?: ImagePreviewOptions["mode"];
  }
) {
  const {
    previewCaption,
    previewMode = "fit",
    className = "",
    ...rest
  } = props;

  return (
    <img
      {...rest}
      className={`cursor-zoom-in ${className}`}
      onClick={(e) => {
        rest.onClick?.(e);
        const srcString = typeof rest.src === "string" ? rest.src : "";
        showImagePreview({
          src: srcString,
          alt: rest.alt,
          caption: previewCaption,
          mode: previewMode,
        });
      }}
    />
  );
}

/* ================== Internal Modal Component ================== */
function ImagePreviewModal({
  src,
  alt,
  caption,
  mode = "fit",
  onClose,
}: ImagePreviewOptions & { onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  // zoom/pan (chỉ dùng khi mode = "original")
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (mode === "original") {
        if (e.key === "+" || e.key === "=") {
          setScale((s) => Math.min(5, s + 0.1));
        }
        if (e.key === "-" || e.key === "_") {
          setScale((s) => Math.max(0.2, s - 0.1));
        }
        if (e.key === "0") {
          setScale(1);
          setPos({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, mode]);

  const onWheel: WheelEventHandler<HTMLDivElement> = (e) => {
    if (mode !== "original") return;
    e.preventDefault();
    const delta = -e.deltaY;
    setScale((s) => {
      const next = Math.max(0.2, Math.min(5, s + delta * 0.0015));
      return next;
    });
  };

  const startDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    if (mode !== "original") return;
    dragging.current = true;
    last.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    if (mode !== "original" || !dragging.current) return;
    setPos({ x: e.clientX - last.current.x, y: e.clientY - last.current.y });
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const imgClassByMode =
    mode === "fit"
      ? "max-w-[92vw] max-h-[85vh] object-contain"
      : mode === "cover"
      ? "w-[92vw] h-[85vh] object-cover"
      : "object-contain select-none";

  // Đóng nếu click bất kỳ chỗ nào KHÔNG nằm trong ảnh
  const handleGlobalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const node = e.target as Node;
    if (imgRef.current && !imgRef.current.contains(node)) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
      onClick={handleGlobalClick}
    >
      {/* Top bar: CHO PHÉP stopPropagation để bấm nút không bị đóng ngoài ý muốn */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3 text-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm">{alt}</span>
        <div className="flex items-center gap-2">
          {mode === "original" && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale((s) => Math.max(0.2, s - 0.1));
                }}
                className="rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
              >
                −
              </button>
              <span className="min-w-12 text-center text-sm">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale((s) => Math.min(5, s + 0.1));
                }}
                className="rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
              >
                +
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale(1);
                  setPos({ x: 0, y: 0 });
                }}
                className="ml-1 rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
              >
                100%
              </button>
            </>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="
              flex justify-center items-center
              w-8 h-8 md:w-12 md:h-12
              rounded-full
              bg-white/10 hover:bg-white/20
              text-white text-3xl
              transition-all duration-200
              backdrop-blur-md
              shadow-md
            "
          >
            ×
          </button>
        </div>
      </div>

      {/* KHÔNG stopPropagation ở khung trung tâm */}
      <div
        className="flex h-full w-full items-center justify-center p-4"
        onWheel={onWheel}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`rounded-lg shadow-2xl ${imgClassByMode}`}
          style={
            mode === "original"
              ? {
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transformOrigin: "center",
                  transition: dragging.current
                    ? "none"
                    : "transform 120ms ease-out",
                }
              : undefined
          }
          draggable={false}
        />
      </div>

      {/* Caption: cũng KHÔNG stopPropagation để click ngoài ảnh là đóng */}
      {caption ? (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 px-4 pb-4 text-center text-white/90">
          <div className="inline-block rounded-md bg-black/40 px-3 py-1 text-sm">
            {caption}
          </div>
        </div>
      ) : null}
    </div>,
    document.body
  );
}
