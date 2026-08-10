"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import { useScrollProgressEffect } from "@/lib/useScrollProgress";

/**
 * The hero parks a full-bleed backdrop on screen for ~3.5 viewports of
 * scrolling, and each third of that scroll swaps the headline.
 *
 * With `hero.video` set, scroll position drives `video.currentTime` rather than
 * playback, so the clip scrubs with the wheel. Without it, the still drifts and
 * scales instead — same pinned narrative, no footage required.
 *
 * Scrubbing is deliberately *not* a `currentTime` write per scroll frame. A
 * seek is a decode, and asking for sixty a second on a 1080p clip makes the
 * browser coalesce them into a handful of visible jumps. Instead one seek is in
 * flight at a time, always aimed at the newest scroll position, so the decoder
 * runs flat out and the picture never falls more than one seek behind.
 */
export function Hero() {
  const spacer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const pending = useRef<number | null>(null);
  const seeking = useRef(false);

  const flush = useCallback(() => {
    const el = video.current;
    const target = pending.current;
    pending.current = null;
    if (!el || target === null) {
      seeking.current = false;
      return;
    }
    // Anything under a frame's worth of movement is not worth a decode.
    if (Math.abs(el.currentTime - target) < 0.03) {
      seeking.current = false;
      return;
    }
    seeking.current = true;
    el.currentTime = target;
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.load();
    const onSeeked = () => flush();
    el.addEventListener("seeked", onSeeked);
    return () => el.removeEventListener("seeked", onSeeked);
  }, [flush]);

  useScrollProgressEffect(
    spacer,
    "pinned",
    useCallback(
      (progress: number) => {
        const el = video.current;
        if (el && Number.isFinite(el.duration) && el.duration > 0) {
          const span = Math.min(hero.scrubSeconds ?? el.duration, el.duration);
          // Seeking exactly to the end stalls in Safari.
          pending.current = Math.min(el.duration - 0.05, progress * span);
          if (!seeking.current) flush();
        }

        // Written straight to the node: these change every frame and nothing
        // else in the tree depends on them.
        if (poster.current) {
          poster.current.style.transform = `scale(${1 + progress * 0.12})`;
        }
        if (hint.current) {
          hint.current.style.opacity = progress > 0.02 ? "0" : "1";
        }

        const next = Math.min(
          hero.headlines.length - 1,
          Math.floor(progress * hero.headlines.length),
        );
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActive(next);
        }
      },
      [flush],
    ),
  );

  return (
    <section id="top" className="relative">
      <div ref={spacer} className="relative h-[350vh]">
        <div id="hero-pin" className="sticky top-0 h-[100svh] w-full overflow-hidden isolate">
          {hero.video ? (
            <video
              ref={video}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              poster={hero.poster}
              playsInline
              muted
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
            >
              <source src={hero.video} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 -z-20 overflow-hidden">
              <Image
                ref={poster}
                src={hero.poster}
                alt={hero.posterAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover will-change-transform"
              />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[color:var(--bg)]/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
            <div className="absolute -left-40 top-1/3 hidden h-[480px] w-[480px] rounded-full bg-[color:var(--accent)]/8 blur-[160px] lg:block" />
            <div className="absolute -right-40 bottom-0 hidden h-[560px] w-[560px] rounded-full bg-[color:var(--accent)]/6 blur-[200px] lg:block" />
          </div>

          {hero.headlines.map((headline, i) => (
            <div
              key={headline}
              className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start px-4 pb-16 pt-20 text-left transition-all duration-700 sm:px-6 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateY(${i === active ? 0 : -40}px)`,
                visibility: i === active ? "visible" : "hidden",
              }}
            >
              <div className="max-w-3xl" style={{ textShadow: "0 1px 40px rgba(0,0,0,0.45)" }}>
                {i === 0 ? (
                  <h1 className="font-display h-section text-[color:var(--fg)]">{headline}</h1>
                ) : (
                  <h2 className="font-display h-section text-[color:var(--fg)]">{headline}</h2>
                )}
              </div>
            </div>
          ))}

          <div
            ref={hint}
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3 text-[0.625rem] uppercase tracking-[0.3em] text-[color:var(--muted)] transition-opacity duration-500"
          >
            <span>Scroll</span>
            <span className="relative h-8 w-px overflow-hidden bg-[color:var(--accent)]/25">
              <span className="animate-scroll-line absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
