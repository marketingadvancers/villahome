"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Corner radius: a pixel value, or derived from the measured box. */
  radius?: number | "pill" | "circle";
  variant?: "link-hover" | "stroke-hover";
};

/**
 * The outline that draws itself around a control on hover. It is an SVG rect
 * whose dash pattern equals its own perimeter, so animating `stroke-dashoffset`
 * to zero traces the border exactly once.
 *
 * The perimeter can only be known once the parent has been laid out, so the box
 * is measured on the client and published as the `--len` custom property that
 * globals.css reads.
 */
export function StrokeOutline({ radius = 0, variant = "link-hover" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(([entry]) => {
      // The border box, not `contentRect` — the SVG is `inset-0` on a padded
      // element, so measuring the content box would draw the outline inside the
      // control rather than around it.
      const border = entry.borderBoxSize?.[0];
      const w = border ? border.inlineSize : parent.getBoundingClientRect().width;
      const h = border ? border.blockSize : parent.getBoundingClientRect().height;
      setBox({ w, h });
    });

    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Until the parent has been measured there is no honest length to dash with,
  // and rendering the rect anyway leaves a solid stroke on screen until the
  // first measurement lands.
  if (!box || box.w <= 0 || box.h <= 0) {
    return (
      <svg
        ref={ref}
        className={variant === "link-hover" ? "link-hover__circle" : "stroke-hover__svg"}
        aria-hidden="true"
      />
    );
  }

  const { w, h } = box;
  const r =
    radius === "pill" ? h / 2 : radius === "circle" ? Math.min(w, h) / 2 : (radius as number);
  // Perimeter of a rounded rectangle: the straight runs plus one full circle.
  const len = Math.max(0, 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r);

  return (
    <svg
      ref={ref}
      className={variant === "link-hover" ? "link-hover__circle" : "stroke-hover__svg"}
      aria-hidden="true"
      style={{ "--len": len } as React.CSSProperties}
    >
      <rect
        fill="none"
        x="0.5"
        y="0.5"
        width={Math.max(0, w - 1)}
        height={Math.max(0, h - 1)}
        rx={r}
        ry={r}
      />
    </svg>
  );
}
