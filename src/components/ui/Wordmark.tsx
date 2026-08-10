import { site } from "@/lib/content";

/**
 * Logo lockup: a monogram in a hairline diamond, next to the letterspaced name.
 *
 * It is built from type and borders rather than artwork, so it inherits the
 * display face and the accent colour and stays crisp at any size. To use a real
 * drawn mark instead, replace the `<span aria-hidden>` diamond below with a
 * `next/image` (or an inline SVG) and leave the rest as is.
 */
export function Wordmark({
  className = "",
  size = "header",
}: {
  className?: string;
  size?: "header" | "footer";
}) {
  const header = size === "header";

  return (
    <span
      className={`inline-flex items-center text-[color:var(--accent)] ${header ? "gap-2.5" : "gap-4"} ${className}`}
    >
      {/* Monogram: the square is rotated, the letter inside is turned back. */}
      <span
        aria-hidden="true"
        className={`grid shrink-0 rotate-45 place-items-center border border-current/70 ${
          header ? "h-[1.6rem] w-[1.6rem]" : "h-[2.4rem] w-[2.4rem]"
        }`}
      >
        <span
          className={`font-display-alt -rotate-45 leading-none ${
            header ? "text-[0.8rem]" : "text-[1.15rem]"
          }`}
        >
          {site.name.charAt(0)}
        </span>
      </span>

      <span className="inline-flex flex-col leading-none">
        <span
          className={`font-display-alt uppercase ${
            header
              ? "text-[clamp(0.78rem,1.4vw,0.95rem)] tracking-[0.24em]"
              : "text-[clamp(1.15rem,2.6vw,1.6rem)] tracking-[0.3em]"
          }`}
        >
          {site.name}
        </span>
        <span
          aria-hidden="true"
          className={`h-px w-full bg-current/40 ${header ? "mt-1.5" : "mt-2.5"}`}
        />
      </span>
    </span>
  );
}
