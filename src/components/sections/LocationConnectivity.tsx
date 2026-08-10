"use client";

import Image from "next/image";
import { useState } from "react";
import { places } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ForestIcon, MaskIcon, TravelIcon } from "@/components/ui/icons";

/** Picking a feature swaps the heading, the copy and the photograph behind it. */
export function LocationConnectivity() {
  const [index, setIndex] = useState(0);
  const active = places[index];

  return (
    <section
      id="location"
      className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        {places.map((place, i) => (
          <Image
            key={place.image}
            src={place.image}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover transition-opacity duration-[1.2s] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              filter: "sepia(0.22) saturate(0.85) brightness(0.42) contrast(1.05)",
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[color:var(--bg)]/35" />

      <div className="mx-auto max-w-[1400px]">
        <Reveal
          as="p"
          className="eyebrow mb-8 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]"
        >
          <span>Location &amp; Connectivity</span>
        </Reveal>

        <div className="min-h-[20rem] sm:min-h-[22rem] lg:min-h-[24rem]">
          {/* Re-keying on the index replays the fade-in for the new place. */}
          <div key={active.headingLine1} className="places-fade">
            <h2 className="font-display h-page">{active.headingLine1}</h2>
            <h2 className="font-display h-page text-[color:var(--accent)]">
              {active.headingLine2}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--fg)]/80 lg:text-lg">
              {active.body}
            </p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="flex flex-wrap justify-between gap-y-6">
            {places.map((place, i) => {
              const selected = i === index;
              return (
                <button
                  key={place.name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setIndex(i)}
                  className={`group flex cursor-pointer items-center gap-4 text-left transition-opacity duration-500 ${
                    selected ? "opacity-100" : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 lg:h-20 lg:w-20 ${
                      selected
                        ? "border-[color:var(--accent)] text-[color:var(--fg)]"
                        : "border-[color:var(--line)] text-[color:var(--fg)]/70"
                    }`}
                  >
                    <PlaceIcon icon={place.icon} />
                  </span>
                  <div>
                    <div className="font-display-alt text-base tracking-tight lg:text-lg">
                      {place.feature}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {place.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaceIcon({ icon }: { icon: (typeof places)[number]["icon"] }) {
  const className = "h-7 w-7 lg:h-8 lg:w-8";
  if (icon === "travel") return <TravelIcon className={className} />;
  if (icon === "forest") return <ForestIcon className={className} />;
  return (
    <MaskIcon
      name="Two Side Open and 247 Security"
      color="currentColor"
      className={`${className} block`}
    />
  );
}
