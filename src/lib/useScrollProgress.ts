"use client";

import { RefObject, useEffect, useRef, useState } from "react";

type Mode = "pinned" | "crossing";

/** Progress of `el` through the viewport, by the rules described below. */
function measure(el: HTMLElement, mode: Mode) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  let p: number;
  if (mode === "pinned") {
    const travel = rect.height - vh;
    p = travel <= 0 ? 0 : -rect.top / travel;
  } else {
    p = (vh - rect.top) / (rect.height + vh);
  }
  return Math.min(1, Math.max(0, p));
}

/**
 * Same measurement as `useScrollProgress`, but it hands each reading to a
 * callback instead of putting it in state.
 *
 * Scroll-linked work runs at frame rate; routing it through state re-renders
 * the whole section sixty times a second for values that mostly end up written
 * straight back to the DOM. Use this for the per-frame work and keep state for
 * the things that actually change rarely, like which caption is showing.
 */
export function useScrollProgressEffect(
  ref: RefObject<HTMLElement | null>,
  mode: Mode,
  onProgress: (progress: number) => void,
) {
  // Keep the newest callback without re-subscribing the scroll listener.
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      cb.current(measure(el, mode));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode]);
}

/**
 * Progress of an element through the viewport, 0 → 1.
 *
 * `pinned` measures a tall spacer whose first child is `position: sticky`: 0 when
 * the spacer's top hits the top of the viewport, 1 when its bottom does. That is
 * exactly the window in which the sticky child stays parked on screen.
 *
 * `crossing` measures an ordinary element travelling past the viewport: 0 as it
 * enters from the bottom, 1 as it leaves past the top.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: "pinned" | "crossing" = "pinned",
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      let p: number;
      if (mode === "pinned") {
        // Distance scrolled past the top, over the scrollable overshoot.
        const travel = rect.height - vh;
        p = travel <= 0 ? 0 : -rect.top / travel;
      } else {
        const travel = rect.height + vh;
        p = (vh - rect.top) / travel;
      }

      setProgress(Math.min(1, Math.max(0, p)));
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
  }, [ref, mode]);

  return progress;
}
