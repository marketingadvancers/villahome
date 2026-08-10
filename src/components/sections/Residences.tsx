"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { StrokeOutline } from "@/components/ui/StrokeOutline";
import { MaskIcon } from "@/components/ui/icons";

export function Residences() {
  const [index, setIndex] = useState(0);
  const active = projects[index];

  const step = (delta: number) =>
    setIndex((i) => (i + delta + projects.length) % projects.length);

  return (
    <section
      id="residences"
      className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <Reveal className="eyebrow font-script mb-4 flex items-center text-2xl text-[color:var(--accent)]">
              <span>The Residences</span>
            </Reveal>
            <Reveal as="h2" className="font-display h-section whitespace-nowrap">
              Find your <span className="text-[color:var(--accent)]">dream home.</span>
            </Reveal>
          </div>
          <Reveal className="self-end">
            <a className="group inline-flex items-center gap-3 text-sm" href="#residences">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                All residences
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 lg:flex-row lg:gap-12">
          <div className="w-full shrink-0 lg:w-[600px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              {projects.map((project, i) => (
                <Image
                  key={project.slug}
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  priority={i === 0}
                  className="object-cover transition-opacity duration-700 ease-out"
                  style={{ opacity: i === index ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div key={active.slug} className="places-fade">
              <h3 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {active.title}
              </h3>

              <dl className="mt-8 space-y-4">
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Location
                  </dt>
                  <dd className="text-sm">{active.location}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Built Form
                  </dt>
                  <dd className="text-sm">{active.builtForm}</dd>
                </div>
              </dl>

              <div className="mt-8 grid grid-cols-4 gap-3">
                {active.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="group flex flex-col items-center gap-2 rounded-md border border-[color:var(--line)] p-3 text-center transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                  >
                    <span className="text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                      <MaskIcon
                        name={feature.icon}
                        color="currentColor"
                        className="block h-9 w-9 shrink-0"
                      />
                    </span>
                    <span className="text-[0.625rem] uppercase leading-tight tracking-[0.12em] text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="link-hover link-hover--filled relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-xs tracking-[0.2em] text-[color:var(--bg)] transition-colors"
                >
                  <StrokeOutline radius="pill" />
                  <span className="relative z-10 uppercase">View Residence</span>
                </a>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous residence"
                onClick={() => step(-1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                aria-label="Next residence"
                onClick={() => step(1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md sm:grid-cols-4">
          {projects.map((project, i) => {
            const selected = i === index;
            return (
              <button
                key={project.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => setIndex(i)}
                className={`flex cursor-pointer flex-col items-start gap-1 px-4 py-5 text-left transition-colors ${
                  selected
                    ? "bg-[color:var(--accent)] text-[color:var(--bg)]"
                    : "bg-[color:var(--bg-alt)] text-[color:var(--fg)] hover:bg-[color:var(--bg-alt)]/70"
                }`}
              >
                <span className="font-display-alt text-base leading-tight">{project.title}</span>
                <span className="text-[0.625rem] uppercase tracking-[0.18em] opacity-60">
                  {project.location}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
