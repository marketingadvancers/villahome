"use client";

import { useRef } from "react";
import { stickyReveal } from "@/lib/content";
import { useScrollProgress } from "@/lib/useScrollProgress";

/**
 * A photograph parks on screen while four captions advance through it, one per
 * quarter of the scroll spent inside the section.
 */
export function StickyReveal() {
  const spacer = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(spacer, "pinned");

  const panels = [{ intro: stickyReveal.intro }, ...stickyReveal.steps];
  const active = Math.min(panels.length - 1, Math.floor(progress * panels.length));

  return (
    <div ref={spacer} className="relative h-[280vh]">
      <div
        id="sticky-reveal-bg"
        className="sticky top-0 flex h-screen items-center overflow-hidden bg-cover bg-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 z-10">
          {panels.map((panel, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center transition-all duration-700 sm:px-6 lg:px-10"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateY(${i === active ? 0 : 50}px)`,
                visibility: i === active ? "visible" : "hidden",
              }}
            >
              {"intro" in panel ? (
                <div className="font-display text-[clamp(2.1rem,4.1vw,4.1rem)] leading-[1.06] text-white">
                  {panel.intro}
                </div>
              ) : (
                <>
                  <div className="font-script text-[clamp(2.4rem,4.2vw,4.2rem)] leading-[1.15] text-[color:var(--accent)]">
                    <span className="block">{panel.word}</span>
                  </div>
                  <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
                    {panel.body}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
