import { createFileRoute } from "@tanstack/react-router";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ValuesSection } from "@/components/sections/ValuesSection";

export const Route = createFileRoute("/about")({
  component: AboutRoute,
});

function AboutRoute() {
  return (
    <main className="w-full bg-white">
      <AboutHeroSection />
      <ValuesSection />
      <FooterSection />
    </main>
  );
}
