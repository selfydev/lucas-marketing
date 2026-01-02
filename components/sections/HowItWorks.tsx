"use client";

import Image from "next/image";
import { Download, MessageSquare, Rocket, PartyPopper } from "lucide-react";

type Step = {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  color: string;
  bgColor: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: <Download className="h-6 w-6" />,
    title: "Download Lucas",
    description: "Get Lucas on any device – phone, tablet, or computer. Setup takes less than 2 minutes.",
    image: "/images/pixel/22e3dab1-6024-4c9a-a725-87db617b1a2f.png",
    color: "text-lucas-purple",
    bgColor: "bg-lucas-purple",
  },
  {
    number: "02",
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Create Your Profile",
    description: "Tell Lucas about your child's age, interests, and subjects they're studying.",
    image: "/images/pixel/7a4116a0-02ac-4d3b-b099-d7db1e13f58b.png",
    color: "text-lucas-blue",
    bgColor: "bg-lucas-blue",
  },
  {
    number: "03",
    icon: <Rocket className="h-6 w-6" />,
    title: "Start Learning",
    description: "Ask Lucas anything! From homework help to exploring new topics – the adventure begins.",
    image: "/images/pixel/61f7aa4a-7411-42d6-91d1-ac944e0e18d5.png",
    color: "text-lucas-cyan",
    bgColor: "bg-lucas-cyan",
  },
  {
    number: "04",
    icon: <PartyPopper className="h-6 w-6" />,
    title: "Watch Them Grow",
    description: "Track progress, celebrate milestones, and watch your child fall in love with learning.",
    image: "/images/pixel/8a463c06-c03f-45e8-a4ae-ad2fa4b85a54.png",
    color: "text-lucas-green",
    bgColor: "bg-lucas-green",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-white via-lucas-sky/30 to-white py-24 sm:py-32"
      aria-label="How it works section"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-lucas-blue/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-lucas-cyan/10 px-4 py-2 text-sm font-medium text-lucas-cyan">
            <Rocket className="h-4 w-4" />
            Simple Setup
          </div>
          <h2 className="font-[var(--font-baloo)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Getting Started is{" "}
            <span className="text-gradient">Easy</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Four simple steps to transform your child&apos;s learning experience forever.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Step number */}
                <div className="mb-4 inline-flex items-center gap-3">
                  <span
                    className={`font-[var(--font-baloo)] text-5xl font-bold ${step.color} opacity-30`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.bgColor} text-white shadow-lg`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                  {step.title}
                </h3>
                <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Progress indicator (dots) */}
                <div className="mt-8 flex items-center justify-center gap-2 lg:justify-start">
                  {steps.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`h-2 rounded-full transition-all ${
                        dotIndex === index
                          ? `w-8 ${step.bgColor}`
                          : "w-2 bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative flex-1">
                <div className="relative mx-auto aspect-square max-w-md">
                  {/* Decorative background */}
                  <div
                    className={`absolute inset-0 rounded-3xl ${step.bgColor} opacity-10 blur-2xl`}
                  />
                  <div
                    className={`absolute -inset-4 rounded-[2rem] border-2 border-dashed ${step.color} opacity-20`}
                  />
                  
                  {/* Image container */}
                  <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-white to-muted/50 p-8 shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  {/* Floating accent */}
                  <div
                    className={`absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bgColor} text-white shadow-lg animate-bounce-slow`}
                  >
                    {step.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting line (desktop only) */}
        <div className="pointer-events-none absolute left-1/2 top-[200px] hidden h-[calc(100%-400px)] w-px -translate-x-1/2 lg:block">
          <div className="h-full w-full bg-gradient-to-b from-lucas-purple via-lucas-blue to-lucas-green opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

