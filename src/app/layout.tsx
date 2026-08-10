import type { Metadata } from "next";
import { Cormorant_Garamond, Italiana, Montserrat } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans-pri",
});

/**
 * The original uses two licensed display faces, Adelora and Bizantheum, which
 * are not redistributable. These are the closest freely licensed stand-ins —
 * swap the two declarations below once the real webfonts are available.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-alt",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  // Resolves the relative OG/Twitter image paths below. Set NEXT_PUBLIC_SITE_URL
  // in the deployment environment to the real origin.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    images: [{ url: "/images/intro-residence.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/intro-residence.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} ${italiana.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
