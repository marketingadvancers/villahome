"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** Index of the image on show, or null when the lightbox is closed. */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/**
 * Full-screen image viewer for the photo rails.
 *
 * Adapted from 21st.dev's "Gallery Grid with Lightbox". The wrap-around
 * prev/next and the dialog semantics come from there; the keyboard handling
 * (arrows, Escape), the scroll lock and the focus restore are added here, and
 * the motion is CSS instead of Framer Motion.
 */
export function Lightbox({ images, index, onClose, onChange }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<Element | null>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  // Keyboard: Escape closes, arrows page through. The reference implementation
  // had neither, which left the viewer unusable without a mouse.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  // Freeze the page behind the overlay, and hand focus back where it came from.
  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      (restoreTo.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt || "Image viewer"}
      onClick={onClose}
      className="lightbox-in fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 text-xl text-white transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] sm:right-8 sm:top-8"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
      >
        <div className="relative h-[70vh] w-full">
          {/* Re-keying fades each new photo in rather than swapping abruptly. */}
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            className="lightbox-fade object-contain"
            priority
          />
        </div>

        <div className="mt-6 flex items-center gap-6">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => step(-1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div className="min-w-0 text-center">
            {current.alt ? (
              <p className="font-display-alt truncate text-lg text-white">{current.alt}</p>
            ) : null}
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/60">
              {index + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={() => step(1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
