import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ONBOARDING_STEPS, OnboardingCard } from "@/components/OnboardingCard";
import { LUCAS_BOT_CONTACT } from "@/lib/vcf";

// =============================================================================
// ANIMATION CONFIGURATION
// =============================================================================

/** Timing values in milliseconds/seconds */
const TIMING = {
  introDuration: 5000, // ms - when intro animation completes
  cardDelay: 800, // ms - delay before card appears after intro
  bushesZoom: 5.15, // s - bushes scale animation duration
  titleReveal: { delay: 0.7, duration: 1.2 }, // s
  subtitleReveal: { delay: 2.2, duration: 3 }, // s
} as const;

/** Bushes animation configuration */
const BUSHES = {
  mobile: { initialScale: 2, animateScale: 3.28 },
  desktop: { initialScale: 1, animateScale: 1.12 },
  // Y offset as ratio of viewport WIDTH - derived from 1560x940 baseline
  yWidthRatio: 0.48,
  // Gentle ease-out: starts slow, gradual deceleration
  easing: [0.1, 0, 0.25, 1] as [number, number, number, number],
} as const;

/** Screen width breakpoints for responsive interpolation */
const BREAKPOINTS = { min: 320, max: 1920 } as const;

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Linear interpolation between mobile and desktop values based on screen width.
 * Clamps to [min, max] breakpoints.
 */
function lerp(mobile: number, desktop: number, width: number): number {
  const t = Math.max(
    0,
    Math.min(
      1,
      (width - BREAKPOINTS.min) / (BREAKPOINTS.max - BREAKPOINTS.min),
    ),
  );
  return mobile + (desktop - mobile) * t;
}

// =============================================================================
// ROUTE & COMPONENT
// =============================================================================

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppPage,
});

function AppPage() {
  // State
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = ONBOARDING_STEPS.length;

  // Compute bushes animation values once at mount
  const bushesAnimation = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    return {
      initialScale: lerp(
        BUSHES.mobile.initialScale,
        BUSHES.desktop.initialScale,
        width,
      ),
      animateScale: lerp(
        BUSHES.mobile.animateScale,
        BUSHES.desktop.animateScale,
        width,
      ),
      initialY: BUSHES.yWidthRatio * width,
    };
  }, []);

  // Intro completion timer
  useEffect(() => {
    const timer = setTimeout(
      () => setAnimationComplete(true),
      TIMING.introDuration,
    );
    return () => clearTimeout(timer);
  }, []);

  // Card appearance delay (after intro completes)
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => setShowCard(true), TIMING.cardDelay);
      return () => clearTimeout(timer);
    }
  }, [animationComplete]);

  const handleContinue = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  // Gradient opacity: 0.8 during intro/post-intro, dims to 0.4 when card visible
  const gradientOpacity = showCard ? 0.4 : 0.8;

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background - static, always visible */}
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover object-bottom"
        src="/assets/app-hero-bg.png"
      />

      {/* Gradient overlay - single instance, opacity changes with state */}
      <motion.div
        animate={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-linear-to-b from-[rgba(61,131,177,0.8)] to-[rgba(200,231,249,0)]"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Logo - persistent after initial animation */}
      <motion.img
        alt="Lucas"
        animate={{ opacity: 1, y: 0 }}
        className="-translate-x-1/2 absolute top-16 left-1/2 z-30 h-12 w-16 md:top-24 md:h-16 md:w-20"
        initial={{ opacity: 0, y: -10 }}
        src="/assets/logo-white-full.svg"
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      {/* Intro content - bushes + text, fades out when complete */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Bushes - animated zoom from bottom */}
            <motion.img
              alt=""
              animate={{ scale: bushesAnimation.animateScale }}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 w-full origin-bottom"
              initial={{
                scale: bushesAnimation.initialScale,
                y: bushesAnimation.initialY,
              }}
              src="/assets/app-hero-gradient.png"
              transition={{
                duration: TIMING.bushesZoom,
                ease: BUSHES.easing,
              }}
            />

            {/* Title + Subtitle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Title - vertical expand reveal */}
              <motion.div
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                className="mt-[-60px]"
                initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
                transition={{
                  duration: TIMING.titleReveal.duration,
                  delay: TIMING.titleReveal.delay,
                  ease: "easeOut",
                }}
              >
                <h1 className="w-full px-4 text-center font-serif text-5xl text-white tracking-[-1.5px] sm:tracking-[-2px] md:text-7xl md:tracking-[-3px] lg:text-8xl lg:tracking-[-4px] xl:text-[110px] xl:tracking-[-4.4px]">
                  college admissions on autopilot
                </h1>
              </motion.div>

              {/* Subtitle - reveal from top */}
              <motion.div
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                className="mt-4 md:mt-6"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                transition={{
                  duration: TIMING.subtitleReveal.duration,
                  delay: TIMING.subtitleReveal.delay,
                  ease: [0.5, 0, 0, 1],
                }}
              >
                <p className="text-center font-mono text-base text-white tracking-[-0.3px] sm:text-lg md:text-xl lg:text-2xl">
                  lets get started
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding card */}
      <AnimatePresence>
        {showCard && !isComplete && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            className="absolute top-1/2 left-1/2 z-20 origin-center"
            exit={{
              opacity: 0,
              scale: 0.95,
              y: "-45%",
              transition: { duration: 0.4 },
            }}
            initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <OnboardingCard
              currentStep={currentStep}
              onContinue={handleContinue}
              totalSteps={totalSteps}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion view - "text me" CTA */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[calc(100%-2rem)] text-center font-serif text-5xl text-white tracking-[-2px] sm:max-w-[calc(100%-4rem)] sm:text-7xl sm:tracking-[-3px] md:text-8xl md:tracking-[-4px] lg:max-w-none lg:text-[130px] lg:tracking-[-5.2px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              text me
            </motion.h1>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[293px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <button
                className="h-[59px] w-full rounded-[10px] bg-white/20 text-center shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-white/30 active:scale-95"
                onClick={() => {
                  window.location.href = `sms:${LUCAS_BOT_CONTACT.email}?&body=Hi Lucas!`;
                }}
                type="button"
              >
                <span className="font-normal font-sans text-[#272727] text-[20px] tracking-[-0.4px]">
                  send me a text
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - visible on completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.p
            animate={{ opacity: 1 }}
            className="-translate-x-1/2 absolute top-[calc(50%+472px)] left-1/2 whitespace-pre text-center font-mono text-[10px] text-white tracking-[-0.6px]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          >
            © lucas 2026 - san francisco, usa
          </motion.p>
        )}
      </AnimatePresence>
    </main>
  );
}
