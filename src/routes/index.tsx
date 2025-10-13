import { createFileRoute } from "@tanstack/react-router";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { ApplicationFeaturesSection } from "@/components/sections/ApplicationFeaturesSection";
import { AppShowcaseSection } from "@/components/sections/AppShowcaseSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InterviewPrepSection } from "@/components/sections/InterviewPrepSection";
import { SliderSection } from "@/components/sections/SliderSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VisualBreakSection } from "@/components/sections/VisualBreakSection";

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
      <ApplicationFeaturesSection />
      <InterviewPrepSection />
      <TestimonialsSection />
      <VisualBreakSection />
      <ContactSection />
    </main>
  );
}
