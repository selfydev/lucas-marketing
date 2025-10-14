import { createFileRoute } from "@tanstack/react-router";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { ApplicationFeaturesSection } from "@/components/sections/ApplicationFeaturesSection";
import { AppShowcaseSection } from "@/components/sections/AppShowcaseSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FooterSection } from "@/components/sections/FooterSection";
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
    <main className="w-full bg-gradient-to-b from-bg-[#FDFFFD] via-white to-white">
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
      <FooterSection />
    </main>
  );
}
