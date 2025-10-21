import { createFileRoute } from "@tanstack/react-router";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { generateMetadata } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => {
    const metadata = generateMetadata({
      title: "About Lucas - Democratizing College Admissions | Lucas AI",
      description:
        "Learn about Lucas AI's mission to level the playing field for every student. We're democratizing access to college admissions guidance through AI-powered, personalized support.",
      url: "https://meetlucas.ai/about",
      keywords:
        "about lucas ai, college admissions equity, accessible admissions counseling, AI college advisor mission, democratizing college access, admissions platform",
    });

    return {
      meta: [
        {
          title:
            metadata.meta.find((m) => m.property === "og:title")?.content ||
            "About Lucas",
        },
        ...metadata.meta,
      ],
      links: metadata.links,
      scripts: metadata.scripts,
    };
  },
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
