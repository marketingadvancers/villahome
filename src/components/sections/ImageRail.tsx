"use client";

import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { Lightbox } from "@/components/ui/Lightbox";

type Props = {
  images: { src: string; alt: string }[];
  /** Which way the rail slides as the section crosses the viewport. */
  direction: "left" | "right";
  /** Strength of the vignette drawn over the rail. */
  vignette: number;
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * A row of tall photographs that drifts sideways as the section passes through
 * the viewport, with a title held still on top of it.
 */
export function ImageRail({ images, direction, vignette, children, className, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref, "crossing");
  const [viewing, setViewing] = useState<number | null>(null);

  // Travel from one edge of its overshoot to the other, centred at mid-scroll.
  const shift = (progress - 0.5) * 16;
  const offset = direction === "left" ? -shift : shift;

  return (
    <section id={id} className={className}>
      <div
        ref={ref}
        className="relative h-[45vh] min-h-[260px] overflow-hidden sm:h-[58vh] sm:min-h-[380px] lg:h-[80vh]"
      >
        <div className="flex h-full items-center justify-center">
          <div
            className="flex h-full items-center gap-3 will-change-transform lg:gap-5"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {images.map((image, i) => (
              <figure
                key={image.src}
                className="relative h-full w-[74vw] shrink-0 overflow-hidden sm:w-[48vw] lg:w-[34vw]"
              >
                {/* The title sitting over the rail is pointer-transparent, so
                    each photo carries its own control to open the viewer. */}
                <button
                  type="button"
                  onClick={() => setViewing(i)}
                  aria-label={image.alt ? `View ${image.alt}` : "View image"}
                  className="group absolute inset-0 z-[6] cursor-zoom-in"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 74vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </button>
              </figure>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background: `radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,${vignette}) 0%, transparent 100%)`,
          }}
        />

        {children}
      </div>

      <Lightbox
        images={images}
        index={viewing}
        onClose={() => setViewing(null)}
        onChange={setViewing}
      />
    </section>
  );
}
