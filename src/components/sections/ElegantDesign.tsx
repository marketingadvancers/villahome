import { elegantDesign } from "@/lib/content";
import { ImageRail } from "./ImageRail";

export function ElegantDesign() {
  return (
    <ImageRail
      id="elegant-design"
      className="relative overflow-hidden bg-[color:var(--bg)] py-10 lg:py-[100px]"
      images={elegantDesign.images}
      direction="left"
      vignette={0.38}
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-script whitespace-nowrap text-[clamp(2.75rem,9vw,8rem)] leading-none text-[color:var(--fg)] drop-shadow-[0_4px_40px_rgba(0,0,0,0.55)]">
          {elegantDesign.heading}
        </h2>
        <a
          href={elegantDesign.ctaHref}
          className="pointer-events-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-[color:var(--accent)]/70 text-[0.625rem] uppercase tracking-[0.24em] text-[color:var(--fg)] backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] lg:h-32 lg:w-32"
        >
          <span className="text-center leading-[1.5]">{elegantDesign.ctaLabel}</span>
        </a>
      </div>
    </ImageRail>
  );
}
