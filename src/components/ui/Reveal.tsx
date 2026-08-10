"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, applied as a transition delay. */
  delay?: number;
  as?: ElementType;
};

/**
 * Fades and lifts its children in once, the first time they scroll into view.
 * The visual states live in globals.css under `[data-reveal]`.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose words slide up from behind a mask, one after the other.
 * Renders a plain `<span>` per word so the heading stays a single text node
 * for screen readers.
 */
export function WordReveal({ words, className }: { words: readonly string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} data-shown={shown}>
      {words.map((word, i) => (
        <span key={word + i}>
          {i > 0 ? " " : null}
          <span className="inline-block overflow-hidden align-baseline">
            <span data-word="" style={{ transitionDelay: `${i * 90}ms` }}>
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
