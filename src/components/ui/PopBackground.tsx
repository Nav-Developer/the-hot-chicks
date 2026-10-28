"use client";

import { forwardRef, ReactNode } from "react";

type Variant = "yellow" | "red" | "cream";

const STYLES = {
  yellow: {
    bg: "bg-brand-yellow",
    dot: "var(--brand-red)",
    dotOpacity: 0.18,
    blobA: "bg-brand-red opacity-90",
    blobB: "bg-brand-red-dark opacity-90",
  },
  red: {
    bg: "bg-brand-red",
    dot: "var(--brand-yellow)",
    dotOpacity: 0.2,
    blobA: "bg-brand-yellow opacity-25",
    blobB: "bg-brand-red-deep opacity-80",
  },
  cream: {
    bg: "bg-cream",
    dot: "var(--brand-red)",
    dotOpacity: 0.12,
    blobA: "bg-brand-yellow opacity-80",
    blobB: "bg-brand-red opacity-80",
  },
} as const;

type Props = {
  variant?: Variant;
  blobs?: boolean;
  className?: string;
  children?: ReactNode;
};

const PopBackground = forwardRef<HTMLElement, Props>(function PopBackground(
  { variant = "yellow", blobs = true, className = "", children },
  ref,
) {
  const s = STYLES[variant];

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden text-ink ${s.bg} ${className}`}
    >
      {/* halftone dots */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: s.dotOpacity,
          backgroundImage: `radial-gradient(${s.dot} 2px, transparent 2px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* corner bursts */}
      {blobs && (
        <>
          <div
            className={`pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full ${s.blobA}`}
          />
          <div
            className={`pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full ${s.blobB}`}
          />
        </>
      )}

      {children}
    </section>
  );
});

export default PopBackground;
