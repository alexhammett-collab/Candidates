"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyCognition from "@/components/WhyCognition";
import PlatformOverview from "@/components/PlatformOverview";
import TechnologySection from "@/components/TechnologySection";
import DevinVisual from "@/components/visuals/DevinVisual";
import WindsurfVisual from "@/components/visuals/WindsurfVisual";
import CLIVisual from "@/components/visuals/CLIVisual";
import PRReviewVisual from "@/components/visuals/PRReviewVisual";
import DanaVisual from "@/components/visuals/DanaVisual";
import ParadigmShift from "@/components/ParadigmShift";
import SDLCSection from "@/components/SDLCSection";
import Traction from "@/components/Traction";
import Founders from "@/components/Founders";
import Culture from "@/components/Culture";
import MediaHub from "@/components/MediaHub";
import CTA from "@/components/CTA";

export default function PageContent() {
  const { t } = useLanguage();

  return (
    <main>
      <Navbar />
      <Hero />

      <WhyCognition />

      <PlatformOverview />

      <TechnologySection
        id="devin"
        label={t.tech.devin.label}
        title={t.tech.devin.title}
        description={t.tech.devin.description}
        bullets={t.tech.devin.bullets}
        visual={<DevinVisual />}
      />

      <TechnologySection
        label={t.tech.windsurf.label}
        title={t.tech.windsurf.title}
        description={t.tech.windsurf.description}
        bullets={t.tech.windsurf.bullets}
        visual={<WindsurfVisual />}
        reversed
      />

      <TechnologySection
        label={t.tech.cli.label}
        title={t.tech.cli.title}
        description={t.tech.cli.description}
        bullets={t.tech.cli.bullets}
        visual={<CLIVisual />}
      />

      <TechnologySection
        label={t.tech.review.label}
        title={t.tech.review.title}
        description={t.tech.review.description}
        bullets={t.tech.review.bullets}
        visual={<PRReviewVisual />}
        reversed
      />

      <TechnologySection
        label={t.tech.dana.label}
        title={t.tech.dana.title}
        description={t.tech.dana.description}
        bullets={t.tech.dana.bullets}
        visual={<DanaVisual />}
      />

      <ParadigmShift />

      <SDLCSection />

      <Traction />

      <Founders />

      <Culture />

      <MediaHub />

      <CTA />

      <footer className="py-8 px-6 text-center">
        <p className="text-xs text-[#bbb]">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </footer>
    </main>
  );
}
