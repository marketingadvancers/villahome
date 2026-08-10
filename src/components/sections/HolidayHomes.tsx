import Image from "next/image";
import { holidayHomes } from "@/lib/content";
import { Reveal, WordReveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, MountainIcon, WavesIcon } from "@/components/ui/icons";

const groupIcons = { waves: WavesIcon, mountain: MountainIcon };

export function HolidayHomes() {
  return (
    <section
      id="holiday-homes"
      className="theme-light px-4 py-16 sm:px-6 sm:py-[80px] lg:px-10 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
              {holidayHomes.eyebrow}
            </p>
          </Reveal>
          <h2 className="font-display h-page mt-3">
            <WordReveal words={holidayHomes.heading} />
          </h2>
          <Reveal>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
              {holidayHomes.lead}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {holidayHomes.groups.map((group) => {
            const Icon = groupIcons[group.icon];
            return (
              <div key={group.label}>
                <Reveal className="mb-8 flex items-center gap-3 border-b border-[color:var(--line)] pb-4">
                  <Icon className="h-5 w-5 shrink-0 text-[color:var(--accent)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                    {group.label}
                  </span>
                </Reveal>

                <div className="grid grid-cols-2 gap-6">
                  {group.places.map((place, i) => (
                    <Reveal key={place.name} as="article" delay={i * 120} className="group">
                      <a className="block" href={place.href}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[color:var(--bg-alt)]">
                          <Image
                            src={place.image}
                            alt={place.name}
                            fill
                            sizes="(min-width: 1024px) 22vw, 45vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                            {place.region}
                          </p>
                          <h3 className="font-display mt-2 text-2xl transition-colors group-hover:text-[color:var(--accent)]">
                            {place.name}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--muted)]">
                            {place.excerpt}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
                            Explore
                            <ArrowRightIcon className="h-3 w-3" />
                          </span>
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
