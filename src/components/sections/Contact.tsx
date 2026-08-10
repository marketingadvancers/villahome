"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/lib/content";
import { Reveal, WordReveal } from "@/components/ui/Reveal";
import { StrokeOutline } from "@/components/ui/StrokeOutline";

const field =
  "w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]";
const wrap = "border-b border-[color:var(--line)] pb-3";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  /**
   * No backend ships with this build, so the submission is acknowledged locally.
   * Point this at the real endpoint when one exists.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="eyebrow font-script mb-4 flex items-center justify-center text-2xl text-[color:var(--accent)]">
          <div>
            <p>{contact.eyebrow}</p>
          </div>
        </Reveal>

        <h2 className="font-display h-page whitespace-nowrap">
          <WordReveal words={contact.heading1} />
        </h2>
        <h2 className="font-display h-page whitespace-nowrap text-[color:var(--accent)]">
          <WordReveal words={contact.heading2} />
        </h2>

        <Reveal className="mx-auto mt-8 max-w-md text-sm text-[color:var(--muted)]">
          <p>{contact.lead}</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <form className="flex flex-col gap-6 text-left" onSubmit={onSubmit}>
            {/* Honeypot: bots fill this, humans never see it. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              name="companyWebsite"
              className="pointer-events-none absolute h-px w-px opacity-0"
              style={{ left: "-9999px" }}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className={wrap}>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  aria-label="Name"
                  name="name"
                  className={field}
                />
              </div>
              <div className={wrap}>
                <input
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  aria-label="Phone"
                  name="phone"
                  className={field}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className={wrap}>
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email"
                  name="email"
                  className={field}
                />
              </div>
              <div className={wrap}>
                <select
                  name="enquiryType"
                  aria-label="Enquiry type"
                  defaultValue=""
                  className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
                >
                  <option value="" disabled>
                    Enquiring as…
                  </option>
                  {contact.enquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={wrap}>
              <input
                type="text"
                placeholder="Interested in…"
                aria-label="Project interest"
                name="interest"
                className={field}
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-6">
              <label className="flex cursor-pointer items-start gap-3 text-left">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--accent)]"
                />
                <span className="text-[12px] leading-relaxed text-[color:var(--muted)]">
                  {contact.privacy}
                </span>
              </label>

              <button
                type="submit"
                className="link-hover link-hover--filled relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-xs tracking-[0.2em] text-[color:var(--bg)] transition-colors"
              >
                <StrokeOutline radius="pill" />
                <span className="relative z-10 uppercase">
                  {status === "sent" ? "Thank you — we'll be in touch" : contact.submitLabel}
                </span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
