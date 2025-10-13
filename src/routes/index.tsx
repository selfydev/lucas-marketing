import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/HeroSection";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <main className="hero-gradient-bg min-h-screen w-full">
      <HeroSection />
    </main>
  );
}
