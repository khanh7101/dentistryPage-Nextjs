// ArrowButton.tsx
type ArrowButtonProps = {
  side: "left" | "right";
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
};

export function ArrowButton({
  side,
  onClick,
  className = "",
  ariaLabel,
}: ArrowButtonProps) {
  const isLeft = side === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? (isLeft ? "Previous slide" : "Next slide")}
      className={[
        "group absolute top-1/2 -translate-y-1/2 z-10",
        isLeft
          ? "left-4 md:left-3 lg:left-6 xl:left-6"
          : "right-4 md:right-4 lg:right-6 xl:right-6",
        "flex items-center justify-center",
        "focus:outline-none cursor-pointer",
        className,
      ].join(" ")}
    >
      <svg
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
        className="transition-transform group-hover:scale-110"
        aria-hidden="true"
      >
        <path
          // chiều dài theo trục Y: 4 → 36 (32px > 30 như yêu cầu)
          d={isLeft ? "M15 4L9 20L15 36" : "M9 4L15 20L9 36"}
          stroke="currentColor"       // dùng currentColor cho dễ đổi màu bằng class
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
