"use client";

import { useEffect, useRef, useState } from "react";
import { trackRecord } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Burgundy credibility band between the intro and the first image rail.
 * Figures count up once, the first time the band scrolls into view.
 */
export function TrackRecord() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="track-record"
      className="theme-brand px-4 py-16 sm:px-6 sm:py-[80px] lg:px-10 lg:py-[110px]"
    >
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center lg:mb-16">
          <Reveal>
            <p className="eyebrow text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              <span>{trackRecord.eyebrow}</span>
            </p>
          </Reveal>
          <Reveal as="h2" className="font-display mt-4 text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.1]">
            {trackRecord.heading}
          </Reveal>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
          {trackRecord.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 110} className="text-center">
              <dd className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-[color:var(--accent)]">
                <Counter
                  run={run}
                  countTo={stat.countTo}
                  pad={stat.pad}
                  suffix={stat.suffix}
                  value={stat.value}
                />
              </dd>
              <div className="mx-auto mt-5 h-px w-8 bg-[color:var(--accent)]/50" />
              <dt className="font-display-alt mt-5 text-lg">{stat.label}</dt>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]/75">
                {stat.caption}
              </p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Counter({
  run,
  countTo,
  pad = 0,
  suffix = "",
  value,
}: {
  run: boolean;
  countTo?: number;
  pad?: number;
  suffix?: string;
  value?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run || countTo === undefined) return;

    // A zero duration lands the final value on the first frame, which keeps the
    // reduced-motion path inside the animation callback instead of setting
    // state synchronously here.
    const DURATION = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100;
    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const t = DURATION === 0 ? 1 : Math.min(1, (now - start) / DURATION);
      // Ease out, so the number settles rather than stopping dead.
      setN(Math.round(countTo * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, countTo]);

  // Static figures (like "24×7") are not counted, just shown.
  if (countTo === undefined) return <>{value}</>;

  return (
    <>
      {String(n).padStart(pad, "0")}
      {suffix}
    </>
  );
}
