"use client";

import { useEffect, useState } from "react";

/** Thin fixed rail down the left edge whose lit segment tracks page progress. */
export function BrandRail() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable <= 0 ? 0 : window.scrollY / scrollable;
      // The lit segment is 25vh tall and travels the remaining 75vh.
      setOffset(p * window.innerHeight * 0.75);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="brand-rail" aria-hidden="true">
      <div
        className="absolute left-0 top-0 w-full will-change-transform"
        style={{
          height: "25vh",
          background:
            "linear-gradient(180deg, var(--brand-green) 0%, var(--accent) 25%, var(--accent-2) 50%, var(--accent) 75%, var(--brand-green) 100%)",
          transform: `translateY(${offset}px)`,
        }}
      />
    </div>
  );
}
