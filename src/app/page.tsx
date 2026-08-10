import { BrandRail } from "@/components/site/BrandRail";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { TrackRecord } from "@/components/sections/TrackRecord";
import { ElegantDesign } from "@/components/sections/ElegantDesign";
import { HolidayHomes } from "@/components/sections/HolidayHomes";
import { IconicBanner } from "@/components/sections/IconicBanner";
import { LocationConnectivity } from "@/components/sections/LocationConnectivity";
import { Residences } from "@/components/sections/Residences";
import { StickyReveal } from "@/components/sections/StickyReveal";
import { Principles } from "@/components/sections/Principles";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <BrandRail />
      <FloatingActions />
      <Header />

      <main>
        <Hero />
        <Intro />
        <TrackRecord />
        <ElegantDesign />
        <HolidayHomes />
        <IconicBanner />
        <LocationConnectivity />
        <Residences />
        <StickyReveal />
        <Principles />
        <News />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
