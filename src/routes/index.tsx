import { createFileRoute } from "@tanstack/react-router";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { AppShowcaseSection } from "@/components/sections/AppShowcaseSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SliderSection } from "@/components/sections/SliderSection";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <main className="hero-gradient-bg w-full">
      <HeroSection />
      <AboutUsSection />
      <FeaturesSection />
      <SliderSection />
      <AppShowcaseSection />
    </main>
  );
}
