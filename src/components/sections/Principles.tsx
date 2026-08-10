import { principles } from "@/lib/content";
import { ImageRail } from "./ImageRail";

export function Principles() {
  const [line1, accent, line3] = principles.heading;

  return (
    <ImageRail
      id="principles"
      className="theme-light relative overflow-hidden py-10 lg:py-[100px]"
      images={principles.images}
      direction="right"
      vignette={0.65}
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <h2 className="font-script max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.25] tracking-[0.05em] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
          <span className="block">{line1}</span>
          <span className="block uppercase italic tracking-[0.3em] text-[color:var(--accent-2)]">{accent}</span>
          <span className="block">{line3}</span>
        </h2>
      </div>
    </ImageRail>
  );
}
