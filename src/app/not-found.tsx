import Link from "next/link";
import { StrokeOutline } from "@/components/ui/StrokeOutline";

/** The home page is the only route in this build. */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">404</p>
      <h1 className="font-display h-section mt-4 max-w-2xl text-[color:var(--fg)]">
        This page isn&apos;t here
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--muted)]/80">
        The address does not match anything on this site.
      </p>
      <Link
        href="/"
        className="link-hover link-hover--filled relative mt-10 inline-flex h-12 items-center justify-center rounded-full px-7 text-xs tracking-[0.2em] text-[color:var(--bg)]"
      >
        <StrokeOutline radius="pill" />
        <span className="relative z-10 uppercase">Back to home</span>
      </Link>
    </main>
  );
}
