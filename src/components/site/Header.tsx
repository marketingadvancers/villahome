"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { StrokeOutline } from "@/components/ui/StrokeOutline";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Site header with a full-width mega menu.
 *
 * The panel opens on hover but closes on a short delay, so the pointer can
 * travel from a trigger down into the panel without it collapsing underneath.
 * Switching between triggers slides the new panel in from the side you came
 * from. Pattern adapted from 21st.dev's animated mega-dropdown; the motion is
 * plain CSS here rather than a runtime animation library.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);

  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<"from-right" | "from-left">("from-right");

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previous = useRef<number | null>(null);

  const openMenu = useCallback((index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDirection(
      previous.current !== null && index < previous.current ? "from-left" : "from-right",
    );
    previous.current = index;
    setActive(index);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      previous.current = null;
    }, 120);
  }, []);

  useEffect(() => () => void (closeTimer.current && clearTimeout(closeTimer.current)), []);

  // Escape closes whichever menu is showing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scrolling away from a panel that is following the fixed header is disorienting.
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeItem = active !== null ? nav[active] : undefined;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--bg)]/85 backdrop-blur-md transition-colors duration-500"
      onMouseLeave={closeMenu}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-10">
        <a className="flex shrink-0 items-center" aria-label={`${site.name} home`} href="#top">
          <Wordmark />
        </a>

        <nav className="hidden shrink-0 gap-5 text-sm lg:flex xl:gap-7">
          {nav.map((item, index) =>
            item.menu ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={open && active === index}
                data-open={open && active === index}
                onMouseEnter={() => openMenu(index)}
                onFocus={() => openMenu(index)}
                onClick={() => (open && active === index ? setOpen(false) : openMenu(index))}
                className="nav-link flex cursor-pointer items-center gap-1 font-semibold text-white transition-colors hover:text-[color:var(--accent)] aria-expanded:text-[color:var(--accent)]"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`text-[0.6rem] transition-transform duration-300 ${
                    open && active === index ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={closeMenu}
                className="nav-link font-semibold text-white transition-colors hover:text-[color:var(--accent)]"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:inline-flex">
            <a
              href="#contact"
              className="enquire-btn link-hover relative inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[0.6875rem] tracking-[0.18em] text-[color:var(--fg)] transition-colors"
            >
              <StrokeOutline radius="pill" />
              <span className="relative z-10 uppercase">Enquire Now</span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="-mr-2 flex cursor-pointer flex-col gap-1.5 p-3 lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[color:var(--fg)] transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      <div
        onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
        onMouseLeave={closeMenu}
        className={`absolute inset-x-0 top-full hidden border-b border-[color:var(--line)] bg-[color:var(--bg)]/95 backdrop-blur-md transition-all duration-300 lg:block ${
          open && activeItem?.menu
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        {activeItem?.menu ? (
          <div
            key={active}
            className={`mx-auto max-w-[1400px] px-10 py-10 ${
              direction === "from-right" ? "mega-in-right" : "mega-in-left"
            }`}
          >
            <a
              href={activeItem.href}
              onClick={() => setOpen(false)}
              className="font-display-alt group mb-8 inline-flex items-center gap-3 text-2xl text-[color:var(--accent)]"
            >
              {activeItem.menu.featured}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
              {activeItem.menu.columns.map((column) => (
                <div key={column.heading}>
                  <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]/70">
                    {column.heading}
                  </div>
                  <ul className="space-y-2.5 text-sm">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-y-auto border-t border-[color:var(--line)] bg-[color:var(--bg)] transition-[max-height] duration-500 lg:hidden ${mobileOpen ? "max-h-[80vh]" : "max-h-0"}`}
      >
        <nav className="flex flex-col px-4 py-6 sm:px-6">
          {nav.map((item, index) =>
            item.menu ? (
              <div key={item.label} className="border-b border-[color:var(--line)]">
                <button
                  type="button"
                  aria-expanded={mobileSection === index}
                  onClick={() => setMobileSection(mobileSection === index ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--fg)]"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`text-[0.6rem] transition-transform duration-300 ${mobileSection === index ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-400 ${mobileSection === index ? "max-h-96" : "max-h-0"}`}
                >
                  <ul className="space-y-2 pb-4 pl-1 text-sm">
                    {item.menu.columns.flatMap((column) => column.links).map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[color:var(--line)] py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent)]"
              >
                {item.label}
              </a>
            ),
          )}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="link-hover link-hover--filled relative mt-6 inline-flex h-12 items-center justify-center rounded-full px-7 text-xs uppercase tracking-[0.2em]"
          >
            <StrokeOutline radius="pill" />
            <span className="relative z-10">Enquire Now</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
