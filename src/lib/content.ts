/**
 * Every string and image path on the page.
 *
 * The copy below is neutral placeholder content under the VillaHome name. Swap
 * this file's contents for the real thing and the whole page follows — no
 * component holds copy of its own.
 *
 * Placeholders that must be replaced before going live are marked TODO.
 */

export const site = {
  name: "VillaHome",
  title: "VillaHome — Luxury Residences",
  description:
    "A template for a luxury residential developer: signature residences, holiday homes, and a track record worth showing.",
  // TODO: real contact details
  phone: "+00 00000 00000",
  phoneHref: "tel:+0000000000",
  whatsapp: "#",
  email: "hello@villahome.com",
  hours: "Mon – Fri · 9am – 6pm",
  address: ["Street address line one,", "City, Region 000000"],
  // TODO: real profiles
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
} as const;

export type MenuColumn = { heading: string; links: { label: string; href: string }[] };

export type NavItem = {
  label: string;
  href: string;
  /** Present on entries that open a full-width panel under the header. */
  menu?: { featured: string; columns: MenuColumn[] };
};

/**
 * This build is a single page, so the header navigates within it: every entry
 * is an anchor to a section that actually exists below. The two entries that
 * open a panel do so because the section they point at holds several items
 * worth listing.
 */
export const nav: NavItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "Residences",
    href: "#residences",
    menu: {
      featured: "All Residences",
      columns: [
        {
          heading: "The Collection",
          links: [
            { label: "The Aster", href: "#residences" },
            { label: "The Belvedere", href: "#residences" },
            { label: "The Cordelia", href: "#residences" },
          ],
        },
        {
          heading: "Signature",
          links: [{ label: "The Dune", href: "#residences" }],
        },
      ],
    },
  },
  {
    label: "Holiday Homes",
    href: "#holiday-homes",
    menu: {
      featured: "Escape to Nature",
      columns: [
        {
          heading: "Beach & Lake",
          links: [
            { label: "The Coast", href: "#holiday-homes" },
            { label: "The Lakes", href: "#holiday-homes" },
          ],
        },
        {
          heading: "Mountain",
          links: [
            { label: "The Highlands", href: "#holiday-homes" },
            { label: "The Ridge", href: "#holiday-homes" },
          ],
        },
      ],
    },
  },
  { label: "Track Record", href: "#track-record" },
  { label: "Location", href: "#location" },
  { label: "Interiors", href: "#principles" },
  { label: "Insights", href: "#news" },
  { label: "Contact", href: "#contact" },
];

/**
 * Hero. The section pins for a few viewports while the headlines advance.
 *
 * `video` is optional: give it a path and scroll scrubs through the clip;
 * leave it null and the still below is used instead, drifting slowly. The
 * template ships without footage — add your own and the scrub turns itself on.
 */
export const hero = {
  video: "/videos/hero.mp4" as string | null,
  /**
   * Seconds of the clip to spread across the pinned scroll. Scrubbing a long
   * clip over a fixed scroll distance means each wheel notch jumps far through
   * the footage, which both looks disjointed and forces the decoder to hunt for
   * keyframes. Holding the window short keeps the steps small. Set to null to
   * scrub the whole clip.
   */
  scrubSeconds: null as number | null,
  poster: "/images/hero-poster.jpg",
  posterAlt: "Luxury residence at dusk",
  headlines: [
    "Building Spaces That Feel Like Home",
    "Designed With Quality That Lasts",
    "Creating Value For Years To Come",
  ],
};

export const intro = {
  headingTop: ["More", "Than"],
  headingAccent: ["Four", "Walls"],
  body: "The celebrations, the quiet evenings, the moments that bring everyone together — life's best moments happen at home. This is where moments like these find their place. Thoughtfully planned, beautifully finished and built to a standard that makes every day feel a little more special.",
  image: {
    src: "/images/intro-residence.jpg",
    alt: "Open-plan living and dining in a finished residence",
  },
  pillars: [
    { title: "Homes", caption: "Built to Last" },
    { title: "Design", caption: "Led By Excellence" },
    { title: "Quality", caption: "In Every Detail" },
  ],
};

/**
 * Credibility band.
 *
 * Every figure is derived from what this page itself shows: four residences,
 * four retreat destinations, the stated configuration and the gated security.
 * The numbers a visitor would also expect from a developer — years trading,
 * square feet delivered, families housed — are deliberately absent, because
 * only the business can verify them. Add them once confirmed rather than
 * estimating them.
 */
export const trackRecord = {
  eyebrow: "Track Record",
  heading: "Built on what is delivered",
  stats: [
    { countTo: 4, pad: 2, label: "Signature Residences", caption: "Across the collection" },
    { countTo: 4, pad: 2, label: "Retreat Destinations", caption: "Coast to highlands" },
    { countTo: 5, suffix: " BHK", label: "Independent Floors", caption: "S + 4 built form" },
    { value: "24×7", label: "Gated Security", caption: "Round-the-clock" },
  ] as {
    countTo?: number;
    pad?: number;
    suffix?: string;
    value?: string;
    label: string;
    caption: string;
  }[],
};

/** Left-drifting image rail behind the "Luxury Redefined" title. */
export const elegantDesign = {
  heading: "Luxury Redefined",
  ctaHref: "#residences",
  ctaLabel: "Learn More",
  /* Captions describe the room, not a specific unit — these are library
     photographs standing in until real project photography exists. */
  images: [
    { src: "/images/rail-living-dining.jpg", alt: "Living & Dining" },
    { src: "/images/rail-living-room.jpg", alt: "Living Room" },
    { src: "/images/rail-lounge.jpg", alt: "Lounge" },
    { src: "/images/rail-double-height.jpg", alt: "Double-Height Living" },
    { src: "/images/rail-kitchen.jpg", alt: "Kitchen" },
    { src: "/images/rail-bedroom.jpg", alt: "Master Bedroom" },
    { src: "/images/rail-dining.jpg", alt: "Dining Room" },
  ],
};

export const holidayHomes = {
  eyebrow: "Holiday Homes",
  heading: ["Escape", "to", "nature"],
  lead: "A curated collection of retreat residences, from beaches that slow you down to hills that bring you peace.",
  groups: [
    {
      label: "Beach & Lake",
      icon: "waves" as const,
      places: [
        {
          name: "The Coast",
          region: "Coastal belt",
          excerpt: "Contemporary living minutes from the shoreline.",
          href: "#holiday-homes",
          image: "/images/place-coast.jpg",
        },
        {
          name: "The Lakes",
          region: "Lake district",
          excerpt: "A retreat where open skies, still water and future growth come together.",
          href: "#holiday-homes",
          image: "/images/place-lakes.jpg",
        },
      ],
    },
    {
      label: "Mountain",
      icon: "mountain" as const,
      places: [
        {
          name: "The Highlands",
          region: "Upper hills",
          excerpt: "Timber cottages set into the hillside.",
          href: "#holiday-homes",
          image: "/images/place-highlands.jpg",
        },
        {
          name: "The Ridge",
          region: "Mountain range",
          excerpt:
            "An exclusive hilltop retreat — seventy private residences across thirty acres of natural landscape.",
          href: "#holiday-homes",
          image: "/images/place-ridge.jpg",
        },
      ],
    },
  ],
};

export const iconicBanner = {
  line1: "Where Life Falls",
  line2: "Perfectly Into Place",
};

/**
 * Location & connectivity. Selecting a feature swaps the heading, the copy and
 * the photograph behind it.
 */
export const places = [
  {
    headingLine1: "The",
    headingLine2: "Expressway",
    body: "Easy access to one of the region's key road networks, connecting you to major destinations across the city and beyond.",
    feature: "Seamless Connectivity",
    name: "WELL CONNECTED",
    icon: "travel" as const,
    image: "/images/location-expressway.jpg",
  },
  {
    headingLine1: "Gated",
    headingLine2: "Community",
    body: "One of the region's most established gated communities, where security is round-the-clock and privacy is never compromised.",
    feature: "Safe & Secure",
    name: "TRUSTED COMMUNITY",
    icon: "security" as const,
    image: "/images/location-gated-community.jpg",
  },
  {
    headingLine1: "Green",
    headingLine2: "Surroundings",
    body: "Step outside to tree lined avenues, open parks and landscaped greens, where evenings slow down and open space becomes part of daily life.",
    feature: "Peaceful Living",
    name: "LANDSCAPED COMMUNITY",
    icon: "forest" as const,
    image: "/images/location-green-surroundings.jpg",
  },
];

/** Feature chips are rendered as CSS masks from /public/Icons/<label>.svg */
export const featureIcons = {
  floors: "5 BHK Independent Floors",
  openSpaces: "Large Open Spaces",
  airConditioning: "All Season VRVVRF Air Conditioning",
  threeSideOpen: "Three Side Open",
  security: "Two Side Open and 247 Security",
} as const;

export type Project = {
  slug: string;
  title: string;
  location: string;
  builtForm: string;
  image: string;
  features: { label: string; icon: string }[];
};

export const projects: Project[] = [
  {
    slug: "aster",
    title: "The Aster",
    location: "North Quarter",
    builtForm: "S + 4",
    image: "/images/project-aster.jpg",
    features: [
      { label: "5 BHK Independent Floors", icon: featureIcons.floors },
      { label: "Large Open Spaces", icon: featureIcons.openSpaces },
      { label: "VRV/VRF Air Conditioning", icon: featureIcons.airConditioning },
      { label: "Three Side Open", icon: featureIcons.threeSideOpen },
    ],
  },
  {
    slug: "belvedere",
    title: "The Belvedere",
    location: "North Quarter",
    builtForm: "S + 4",
    image: "/images/project-belvedere.jpg",
    features: [
      { label: "5 BHK Independent Floors", icon: featureIcons.floors },
      { label: "Two Side Open", icon: featureIcons.security },
      { label: "VRV/VRF Air Conditioning", icon: featureIcons.airConditioning },
      { label: "Large Open Spaces", icon: featureIcons.openSpaces },
    ],
  },
  {
    slug: "cordelia",
    title: "The Cordelia",
    location: "Riverside",
    builtForm: "S + 4",
    image: "/images/project-cordelia.jpg",
    features: [
      { label: "Three Side Open", icon: featureIcons.threeSideOpen },
      { label: "Large Open Spaces", icon: featureIcons.openSpaces },
      { label: "VRV/VRF Air Conditioning", icon: featureIcons.airConditioning },
      { label: "24x7 Security", icon: featureIcons.security },
    ],
  },
  {
    slug: "dune",
    title: "The Dune",
    location: "Garden District",
    builtForm: "S + 4",
    image: "/images/project-dune.jpg",
    features: [
      { label: "Two Side Open", icon: featureIcons.security },
      { label: "5 BHK Independent Floors", icon: featureIcons.floors },
      { label: "VRV/VRF Air Conditioning", icon: featureIcons.airConditioning },
      { label: "Large Open Spaces", icon: featureIcons.openSpaces },
    ],
  },
];

/** Pinned scroll narrative over a fixed photograph. */
export const stickyReveal = {
  intro: "A Home Built the Way You Always Imagined",
  steps: [
    {
      word: "Crafted",
      body: "With luxury finishes, smartly planned layouts and premium materials — every residence is designed to the finest detail, where quality is not a feature, it is the foundation.",
    },
    {
      word: "Connected",
      body: "To leading schools, world-class healthcare, premium retail and seamless city connectivity, all within reach.",
    },
    {
      word: "Complete",
      body: "Luxury inside. Convenience outside. Everything your family needs — nothing missing, nothing compromised.",
    },
  ],
};

/** Right-drifting image rail behind the "Customize Your INTERIOR" title. */
export const principles = {
  heading: ["Customize Your", "INTERIOR", "To Perfection"],
  images: [
    { src: "/images/interior-1.jpg", alt: "Contemporary living room with leather seating" },
    { src: "/images/interior-2.jpg", alt: "Loft-style living room in wood and leather" },
    { src: "/images/interior-3.jpg", alt: "Scandinavian loft living with study and shelving" },
    { src: "/images/interior-4.jpg", alt: "Open dining and living in a luxury finish" },
  ],
};

export const news = {
  heading: "Insights & updates",
  allHref: "#news",
  articles: [
    {
      title: "The 2050 Home: How Technology, Green Living and Community Will Redefine the City",
      href: "#news",
      image: "/images/news-1.jpg",
      category: "News",
      day: "21",
      month: "FEB",
    },
    {
      title: "Rent vs. Buy: When Does It Actually Make Sense to Take the Leap?",
      href: "#news",
      image: "/images/news-2.jpg",
      category: "News",
      day: "17",
      month: "FEB",
    },
  ],
};

export const contact = {
  eyebrow: "Get in Touch",
  heading1: ["Ready", "to", "find"],
  heading2: ["your", "perfect", "home?"],
  lead: "Submit your details and one of our representatives will get back to you as soon as possible.",
  enquiryTypes: [
    { value: "end-user", label: "End User / Home Buyer" },
    { value: "channel-partner", label: "Channel Partner / Broker" },
    { value: "investor", label: "Investor" },
    { value: "corporate", label: "Corporate / Institutional" },
    { value: "overseas", label: "Overseas Buyer" },
  ],
  privacy:
    "By proceeding, you acknowledge and agree to our Privacy Policy. You also consent to receive updates, notifications, and promotional communications via Email, SMS, and WhatsApp.",
  submitLabel: "Request a Callback",
};

export const footer = {
  blurb: "Redefining the standard of luxury living and building transformative real estate.",
  columns: [
    {
      title: "Corporate",
      links: [
        { label: "About Us", href: "#intro" },
        { label: "Track Record", href: "#track-record" },
        { label: "Interiors", href: "#principles" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Residences",
      links: [
        { label: "The Aster", href: "#residences" },
        { label: "The Belvedere", href: "#residences" },
        { label: "The Cordelia", href: "#residences" },
        { label: "The Dune", href: "#residences" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Residences", href: "#residences" },
        { label: "Holiday Homes", href: "#holiday-homes" },
        { label: "Location", href: "#location" },
        { label: "Insights", href: "#news" },
      ],
    },
  ],
  image: "/images/footer-visual.jpg",
  copyright: "© 2026 VillaHome. All rights reserved.",
  // TODO: real registration details, or drop this line
  registration: "Registration number · Region",
};
