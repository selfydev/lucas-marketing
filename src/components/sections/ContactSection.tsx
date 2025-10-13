import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ContactSection() {
  const faqData = [
    {
      id: "item-1",
      question: "How does Lucas improve my chances?",
      answer:
        "Lucas is trained on millions of college admission datapoints and knows what colleges want to see. Lucas has full context of your extracurriculars, background and scores and guides you to become admit ready.",
    },
    {
      id: "item-2",
      question: "Is Lucas free?",
      answer: "Yes, using Lucas AI is entirely free.",
    },
    {
      id: "item-3",
      question: "Can Lucas improve my extracurriculars?",
      answer:
        "Yes, Lucas ranks your current activities and provides actionable ideas on how to get them to the next level. Lucas can also help you ideate, create and execute new ideas from scratch.",
    },
    {
      id: "item-4",
      question: "Can Lucas improve my Personal Statements and Supplementaries?",
      answer:
        "Yes! Lucas can help you uncover strong personal stories, find great hooks and openers, create Netflix-style cliffhangers to make sure you tell your best stories.",
    },
    {
      id: "item-5",
      question: "Can Lucas help with interview preparation?",
      answer:
        "Yes! Answer real life college interview questions and get personalized feedback. Tweak your storytelling for each college and position yourself as the candidate colleges fight over to admit.",
    },
    {
      id: "item-6",
      question: "What is your satisfaction guarantee?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with Lucas within the first month, contact our support team for a full refund, no questions asked.",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1320px] px-4 pt-16 md:px-[60px]">
      <div className="flex flex-col gap-8 md:flex-row md:gap-[120px]">
        <div className="flex-shrink-0 text-center md:w-[342px] md:text-left">
          <h2 className="mb-[15px] font-normal text-[40px] text-neutral-950 leading-[48px] tracking-[0] md:whitespace-nowrap">
            FAQs
          </h2>

          <p className="mb-[28px] font-normal text-base text-black leading-normal tracking-[-0.11px] opacity-40 md:text-[17.7px]">
            Your questions answered
          </p>

          <div className="font-normal text-base leading-[17.7px] md:text-[17.7px]">
            <span className="text-black/40 leading-[0.1px] tracking-[0]">
              Can't find what you're looking for? Contact our{" "}
            </span>
            <a
              className="font-medium text-neutral-900 tracking-[-0.02px] transition-colors hover:text-black hover:underline"
              href="mailto:support@lucas.ai"
            >
              customer support team
            </a>
          </div>
        </div>

        <div className="flex-1">
          <Accordion
            className="w-full"
            collapsible
            defaultValue="item-1"
            type="single"
          >
            {faqData.map((faq) => (
              <AccordionItem
                className="border-neutral-200 border-b"
                key={faq.id}
                value={faq.id}
              >
                <AccordionTrigger className="flex h-14 w-full items-center justify-between px-0 py-0 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="text-left font-medium text-base text-neutral-950 leading-6 tracking-[0]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                {faq.answer && (
                  <AccordionContent className="pt-2 pb-6">
                    <div className="font-normal text-base text-neutral-950 leading-6 tracking-[0]">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
