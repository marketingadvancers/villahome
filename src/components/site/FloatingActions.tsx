"use client";

import { site } from "@/lib/content";
import { StrokeOutline } from "@/components/ui/StrokeOutline";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

const tile =
  "link-hover relative flex flex-1 flex-col items-center justify-center gap-1 bg-[color:var(--brand)] py-3 text-white lg:flex-none lg:px-3 lg:py-4";

/** WhatsApp / callback / Instagram rail: bottom bar on mobile, right edge on desktop. */
export function FloatingActions() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex flex-row gap-px transition-all duration-500 lg:inset-x-auto lg:right-0 lg:bottom-auto lg:top-1/2 lg:flex-col lg:-translate-y-1/2">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={tile}
      >
        <StrokeOutline />
        <WhatsAppIcon className="relative z-10 h-5 w-5 shrink-0" />
      </a>

      <a
        href={site.phoneHref}
        aria-label="Request a callback"
        className="link-hover relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 bg-[color:var(--brand)] py-3 text-white lg:flex-none lg:gap-3 lg:px-3 lg:py-5"
      >
        <StrokeOutline />
        <PhoneIcon className="relative z-10 h-5 w-5 shrink-0" />
        <span className="relative z-10 text-[0.5625rem] font-semibold uppercase tracking-[0.22em] lg:hidden">
          Callback
        </span>
        <span
          className="relative z-10 hidden text-[0.5625rem] font-semibold uppercase tracking-[0.22em] lg:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Request a callback
        </span>
      </a>

      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        className={tile}
      >
        <StrokeOutline />
        <InstagramIcon className="relative z-10 h-5 w-5 shrink-0" />
      </a>
    </div>
  );
}
