import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Lucas AI help with college admissions?",
    answer:
      "Lucas AI democratizes access to college admissions guidance by providing personalized, AI-powered insights that were previously only available through expensive counselors. We analyze your profile, suggest improvements, and help you craft a compelling application that showcases your unique strengths.",
  },
  {
    question: "Is Lucas AI available for students right now?",
    answer:
      "We're currently in our beta phase and building our waitlist! Join early to get exclusive access when we launch, along with special founding member benefits. We're working hard to make Lucas available to students everywhere soon.",
  },
  {
    question: "Can my school or university partner with Lucas?",
    answer:
      "Absolutely! We're actively seeking partnerships with high schools, college counseling programs, and universities. Reach out through our contact form selecting 'University/College Representative' and our partnerships team will get in touch with you within 24 hours.",
  },
  {
    question: "What makes Lucas different from other admissions platforms?",
    answer:
      "Lucas combines cutting-edge AI technology with a deep understanding of the college admissions process. We don't just tell you what to do—we help you understand why it matters and how to authentically present your best self. Our platform is built with accessibility and equity at its core, ensuring every student has the tools they need to succeed.",
  },
  {
    question: "How can I stay updated on Lucas AI's launch?",
    answer:
      "Join our waitlist to receive regular updates on our progress, be first in line for early access, and get exclusive content about college admissions. You can also follow us on social media for tips, insights, and behind-the-scenes looks at how we're building the future of college admissions.",
  },
];

export function ContactFAQSection() {
  return (
    <section className="relative w-full bg-white px-4 py-16 md:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="mb-8 text-center font-medium text-2xl text-neutral-800 md:mb-12 md:text-3xl">
          Frequently Asked Questions
        </h2>

        <Accordion className="w-full" collapsible type="single">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-neutral-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Decorative Elements */}
      {/* Highlighter - bottom left */}
      <div className="absolute bottom-8 left-4 hidden md:block lg:left-12">
        <img
          alt=""
          className="h-auto w-48 rotate-12 lg:w-56"
          src="/assets/highlighter-full.png"
        />
      </div>

      {/* Paperclip - top right */}
      <div className="absolute top-12 right-8 hidden md:block lg:right-16">
        <img
          alt=""
          className="-rotate-12 h-auto w-16 lg:w-20"
          src="/assets/paperclip.png"
        />
      </div>
    </section>
  );
}
