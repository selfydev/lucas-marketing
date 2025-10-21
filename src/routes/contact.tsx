import { createFileRoute } from "@tanstack/react-router";
import { ContactFAQSection } from "@/components/sections/ContactFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactInfoSection } from "@/components/sections/ContactInfoSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { generateMetadata } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => {
    const metadata = generateMetadata({
      title: "Contact Lucas AI - Get in Touch | Students & Universities",
      description:
        "Have questions about Lucas AI? Whether you're a student exploring college admissions or a university interested in partnering with us, we'd love to hear from you. Get in touch today.",
      url: "https://meetlucas.ai/contact",
      keywords:
        "contact lucas ai, get in touch, college admissions help, university partnerships, student support, admissions questions, lucas ai contact form",
    });

    return {
      meta: [{ title: metadata.meta.find((m) => m.property === "og:title")?.content || "Contact Lucas" }, ...metadata.meta],
      links: metadata.links,
      scripts: metadata.scripts,
    };
  },
  component: ContactRoute,
});

function ContactRoute() {
  return (
    <main className="w-full bg-white">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
      <ContactFAQSection />
      <FooterSection />
    </main>
  );
}
