"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";

type Benefit = {
  text: string;
};

const benefits: Benefit[] = [
  { text: "14-day free trial" },
  { text: "No credit card required" },
  { text: "Cancel anytime" },
  { text: "Full access to all features" },
];

const CTA = () => {
  return (
    <section
      id="for-parents"
      className="relative overflow-hidden py-24 sm:py-32"
      aria-label="Call to action section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-cta" />
      
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float-delayed" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating stars */}
        <Sparkles className="absolute left-[10%] top-[20%] h-8 w-8 text-white/20 animate-float" />
        <Sparkles className="absolute right-[15%] top-[30%] h-6 w-6 text-white/30 animate-float-delayed" />
        <Sparkles className="absolute left-[20%] bottom-[25%] h-10 w-10 text-white/15 animate-float" />
        <Sparkles className="absolute right-[25%] bottom-[20%] h-5 w-5 text-white/25 animate-float-delayed" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lucas-yellow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lucas-yellow" />
              </span>
              Limited Time: Extended Free Trial
            </div>

            {/* Headline */}
            <h2 className="font-[var(--font-baloo)] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Give Your Child
              <br />
              the Gift of
              <br />
              <span className="relative inline-block">
                Better Learning
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 280 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C70 2 210 2 278 8"
                    stroke="#FBBF24"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl">
              Join thousands of parents who&apos;ve already transformed their children&apos;s 
              education with Lucas. Start your free trial today!
            </p>

            {/* Benefits */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-4 w-4 text-lucas-yellow" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="group bg-white px-8 text-lg font-bold text-lucas-purple shadow-xl transition-all hover:bg-lucas-cream hover:scale-105"
                asChild
              >
                <Link href="#get-started">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-transparent px-8 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
                asChild
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-lucas-purple to-lucas-blue text-xs font-bold text-white"
                    >
                      {["👧", "👦", "👶", "🧒", "👧"][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  <strong className="text-white">50,000+</strong> happy kids
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-lg text-lucas-yellow">★</span>
                ))}
                <span className="ml-1 text-sm text-white/80">
                  <strong className="text-white">4.9</strong> on App Store
                </span>
              </div>
            </div>
          </div>

          {/* Right content - Illustration */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-[400px] w-[400px] sm:h-[450px] sm:w-[450px]">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl" />
              
              {/* Main image */}
              <Image
                src="/images/pixel/9673f030-ac04-4d7c-b3c3-57fa337327c2.png"
                alt="Happy child learning with Lucas AI"
                fill
                className="object-contain animate-float"
              />

              {/* Floating achievement card */}
              <div className="absolute -left-4 bottom-1/4 rounded-2xl bg-white p-4 shadow-2xl animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lucas-green/10">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Great Progress!</p>
                    <p className="text-sm text-muted-foreground">+500 XP this week</p>
                  </div>
                </div>
              </div>

              {/* Floating subject card */}
              <div className="absolute -right-4 top-1/4 rounded-2xl bg-white p-4 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lucas-blue/10">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Science Master</p>
                    <p className="text-sm text-muted-foreground">Badge unlocked!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

