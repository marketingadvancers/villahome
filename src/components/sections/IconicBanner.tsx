import { iconicBanner } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/** Full-bleed parallax band; the backdrop itself is set in globals.css. */
export function IconicBanner() {
  return (
    <section className="relative isolate flex min-h-[100vh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div
        id="iconic-bg"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[color:var(--brand)]/70" />

      <Reveal className="relative z-10 text-center">
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.08] tracking-[1px]">
          <span className="block">{iconicBanner.line1}</span>
          <span className="block text-[color:var(--accent)]">{iconicBanner.line2}</span>
        </h2>
      </Reveal>
    </section>
  );
}
