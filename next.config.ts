import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * The site is fully static: no API routes, no third-party scripts, no remote
 * images, and every font is self-hosted by `next/font`. So every source can be
 * pinned to 'self' and nothing else needs an allow-list entry.
 *
 * `'unsafe-inline'` stays on script-src/style-src because Next.js emits inline
 * bootstrap scripts and inline font styles. The strict alternative — per-request
 * nonces via a proxy — forces every page to render dynamically, which is a real
 * cost for a page with no dynamic content. If a third-party script (analytics,
 * chat widget) is ever added, add its origin here rather than widening a
 * directive to `*`.
 *
 * `'unsafe-eval'` is dev-only: React uses eval there to rebuild server error
 * stacks. Production never needs it.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt-and-braces for browsers that predate frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Sent only in production — over plain-http localhost it would pin the dev
  // origin to HTTPS in the browser and break `next dev`.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  // Drops the `X-Powered-By: Next.js` banner that tells a scanner what to target.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
