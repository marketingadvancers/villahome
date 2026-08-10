import Image from "next/image";
import { footer, site } from "@/lib/content";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/ui/icons";

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.twitter, label: "Twitter / X", Icon: TwitterIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="theme-brand relative pb-16 lg:pb-0">
      <div className="relative w-full overflow-hidden lg:h-[52vh]">
        <Image
          src={footer.image}
          alt=""
          width={1600}
          height={900}
          sizes="100vw"
          className="h-auto w-full object-cover lg:absolute lg:inset-0 lg:h-full lg:w-full"
        />
      </div>

      <div className="relative px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
        <div className="brand-strip absolute inset-x-0 top-0" aria-hidden="true" />

        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-8 lg:gap-8">
          <div className="col-span-12 lg:col-span-4">
            <Wordmark size="footer" className="text-[color:var(--fg)]" />
            <p className="mt-6 max-w-md text-sm text-[color:var(--muted)]">{footer.blurb}</p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-[color:var(--muted)]/70">
              {site.address.map((line, i) => (
                <span key={line}>
                  {line}
                  {i === 0 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title} className="col-span-6 lg:col-span-2">
              <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {column.title}
              </div>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="transition-colors hover:text-[color:var(--accent)]"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-6 lg:col-span-2">
            <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Get in Touch
            </div>
            <a
              href={site.phoneHref}
              className="block text-sm transition-colors hover:text-[color:var(--accent)]"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-sm transition-colors hover:text-[color:var(--accent)]"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{site.hours}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[color:var(--muted)]">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-[color:var(--fg)]"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-4 border-t border-[color:var(--line)] pt-6 text-center text-xs text-[color:var(--muted)] sm:justify-between sm:text-left">
          <span>{footer.copyright}</span>
          <span>{footer.registration}</span>
        </div>
      </div>
    </footer>
  );
}
