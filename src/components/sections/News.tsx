import Image from "next/image";
import { news } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { StrokeOutline } from "@/components/ui/StrokeOutline";

export function News() {
  return (
    <section id="news" className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex items-center justify-between gap-8 lg:w-[26%] lg:flex-col lg:items-start lg:justify-center lg:gap-14">
          <Reveal>
            {/* Fluid below lg like every other heading; above lg it turns on
                its side and takes the viewport-width clamp instead. */}
            <h2 className="font-display text-[clamp(2.25rem,7vw,3.25rem)] uppercase leading-[1.04] tracking-[0.06em] text-[color:var(--accent)] lg:max-h-[460px] lg:rotate-180 lg:text-[clamp(2.5rem,3.4vw,4rem)] lg:[writing-mode:vertical-rl]">
              {news.heading}
            </h2>
          </Reveal>

          <Reveal>
            <a
              href={news.allHref}
              aria-label="All articles"
              className="stroke-hover group relative isolate flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-full border border-[color:var(--accent)]/40 text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent)] lg:h-32 lg:w-32"
            >
              <span aria-hidden="true" className="relative z-10 text-2xl">
                →
              </span>
              <span className="relative z-10 w-[4.5rem] pl-[0.18em] text-center text-[0.6rem] uppercase leading-tight tracking-[0.18em] lg:w-[6rem]">
                All articles
              </span>
              <StrokeOutline radius="circle" variant="stroke-hover" />
            </a>
          </Reveal>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {news.articles.map((article, i) => (
            <Reveal key={article.href} delay={i * 120} className="h-full">
              <a
                href={article.href}
                aria-label={article.title}
                className="stroke-hover group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg)] p-3"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <div className="font-mono text-[0.625rem] uppercase tracking-[0.26em] text-white/80">
                      {article.category}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="font-display text-4xl leading-none text-white">
                        {article.day}
                      </span>
                      <span className="mb-1 text-[0.625rem] uppercase tracking-[0.22em] text-white/80">
                        {article.month}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-4">
                  <h3 className="font-display text-xl leading-tight text-[color:var(--fg)] transition-colors group-hover:text-[color:var(--accent)]">
                    {article.title}
                  </h3>
                </div>

                <StrokeOutline radius={17} variant="stroke-hover" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
