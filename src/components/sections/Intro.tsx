import Image from "next/image";
import { intro } from "@/lib/content";
import { Reveal, WordReveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section
      id="intro"
      className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      <div className="mx-auto max-w-[1100px] text-center">
        <h2 className="font-display h-page">
          <WordReveal words={intro.headingTop} />
        </h2>
        <h2 className="font-display h-page text-[color:var(--accent)]">
          <WordReveal words={intro.headingAccent} />
        </h2>

        <Reveal className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
          <p>{intro.body}</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] lg:mt-24">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg sm:aspect-[21/9]">
          <Image
            src={intro.image.src}
            alt={intro.image.alt}
            fill
            sizes="(min-width: 1440px) 1400px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-10 lg:mt-24 lg:gap-x-16 lg:gap-y-10">
        {intro.pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            delay={i * 120}
            className="w-full border-t border-[color:var(--line)] pt-6 text-center sm:w-[200px] lg:w-[240px]"
          >
            <div className="mx-auto h-px w-8 bg-[color:var(--accent)]" />
            <div className="font-display-alt mt-5 text-2xl">{pillar.title}</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">{pillar.caption}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
