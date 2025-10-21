import { createFileRoute } from "@tanstack/react-router";
import { ContactFAQSection } from "@/components/sections/ContactFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactInfoSection } from "@/components/sections/ContactInfoSection";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/contact")({
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
