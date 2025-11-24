import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ImageWithPreview } from "@/lib/utils/imagePreview";
import type { Slide } from "@/components/Carousel";

// Lazy load Carousel component
const Carousel = dynamic(() => import("@/components/Carousel").then((mod) => mod.default), {
  ssr: true,
});

// types
type PreviewMode = "fit" | "cover" | "original";
type SortMode = "asc" | "desc" | "name";
type ItemType = { name?: string; file: string; to?: string };

type AllCarouselProps = {
  pageSize: number;       // số ảnh mỗi slide (tổng)
  aspectClass: string;
  source: string[];       // CHỈ NHẬN MẢNG URL
  previewMode?: PreviewMode;
  sortMode?: SortMode;
  showDots?: boolean;
  rows?: number;          // 🆕 số hàng (mặc định 1)
};

// utils
function numericSegments(s: string) {
  return s.replace(/\.[^.]+$/, "").split(/[^0-9]+/).filter(Boolean).map(Number);
}
function naturalCompareByDigits(a: string, b: string) {
  const A = numericSegments(a), B = numericSegments(b);
  const len = Math.max(A.length, B.length);
  for (let i = 0; i < len; i++) {
    const av = A[i] ?? -1, bv = B[i] ?? -1;
    if (av !== bv) return av - bv;
  }
  return a.localeCompare(b);
}
function filenameFromUrl(u: string) {
  const s = u.split("?")[0].split("#")[0];
  return s.split("/").pop() || u;
}
function chunk<T>(arr: T[], size: number): T[][] {
  const s = Math.max(1, size);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += s) out.push(arr.slice(i, i + s));
  return out;
}

export default function AllCarouselProps({
  pageSize,
  aspectClass,
  source,
  previewMode = "fit",
  sortMode = "asc",
  showDots = true,
  rows = 1, // 🆕 mặc định 1 hàng
}: AllCarouselProps) {
  const slides = useMemo(() => {
    if (!source?.length) return [] as Slide[];

    // 1) Chuẩn hóa -> ItemType[]
    const base: ItemType[] = source.map((url) => ({
      name: filenameFromUrl(url),
      file: url,
    }));

    // 2) Sắp xếp
    base.sort((a, b) => {
      const cmp =
        sortMode === "name"
          ? a.name!.localeCompare(b.name!)
          : naturalCompareByDigits(a.name!, b.name!);
      return sortMode === "desc" ? -cmp : cmp;
    });

    // 3) Chia nhóm (pageSize * rows ảnh mỗi slide)
    const perSlide = Math.max(1, pageSize * rows);
    const pages = chunk(base, perSlide);

    return pages.map((page, idx) => {
      // số cột = làm tròn lên (pageSize / rows)
      const cols = Math.ceil(pageSize);
      const gridCols = `grid-cols-${cols}`; // ⚠️ cần mapping để hợp lệ với Tailwind

      // Tailwind không hiểu dynamic class string -> dùng mapping
      const colClass =
        cols === 1 ? "grid-cols-1" :
        cols === 2 ? "grid-cols-2" :
        cols === 3 ? "grid-cols-3" :
        cols === 4 ? "grid-cols-4" :
        cols === 5 ? "grid-cols-5" :
        cols === 6 ? "grid-cols-6" :
        cols === 8 ? "grid-cols-8" :
        "grid-cols-auto";

      return {
        id: idx,
        content: (
          <div className="w-full h-full bg-white">
            <div
              className={`grid ${colClass} gap-3 p-2`}
              style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
            >
              {page.map((it, i) => (
                <figure key={`${it.file}-${i}`} className="bg-white">
                  <ImageWithPreview
                    src={it.file}
                    previewMode={previewMode}
                    className={`${aspectClass} object-contain cursor-zoom-in`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        ),
      };
    });
  }, [pageSize, aspectClass, source, previewMode, sortMode, rows]);

  if (!slides.length) return null;

  return (
    <div className="overflow-visible w-full">
      <Carousel slides={slides} showDots={showDots} />
    </div>
  );
}
