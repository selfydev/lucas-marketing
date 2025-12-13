import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ONBOARDING_STEPS, OnboardingCard } from "@/components/OnboardingCard";
import { LUCAS_BOT_CONTACT } from "@/lib/vcf";

// Screen width breakpoints for interpolation
const MIN_WIDTH = 320;
const MAX_WIDTH = 1920;

// Bushes animation values
const BUSHES = {
  mobile: { initialScale: 2, animateScale: 3.28 },
  desktop: { initialScale: 1, animateScale: 1.12 },
};

// Y offset as ratio of viewport WIDTH (not height) - derived from 1560x940 at 0.8 height
// At 1560px: Y = 0.48 * 1560 = 749px. At 430px: Y = 0.48 * 430 = 206px
const BUSHES_INITIAL_Y_WIDTH_RATIO = 0.48;

// Gentle ease-out curve - starts slow, gradual deceleration for subtle effect
const BUSHES_EASING: [number, number, number, number] = [0.1, 0, 0.25, 1];

/**
 * Compute interpolated value between mobile and desktop based on screen width.
 * Uses linear interpolation clamped to [MIN_WIDTH, MAX_WIDTH].
 */
function interpolateByWidth(
  mobileValue: number,
  desktopValue: number,
  width: number,
): number {
  const t = Math.max(
    0,
    Math.min(1, (width - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH)),
  );
  return mobileValue + (desktopValue - mobileValue) * t;
}

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppPage,
});

function AppPage() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = ONBOARDING_STEPS.length;

  // Compute bushes animation values ONCE at mount.
  // - Scale is interpolated based on screen width (mobile vs desktop)
  // - Y offset is derived from width (since image scales with width)
  const bushesAnimation = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;

    return {
      initialScale: interpolateByWidth(
        BUSHES.mobile.initialScale,
        BUSHES.desktop.initialScale,
        width,
      ),
      animateScale: interpolateByWidth(
        BUSHES.mobile.animateScale,
        BUSHES.desktop.animateScale,
        width,
      ),
      initialY: BUSHES_INITIAL_Y_WIDTH_RATIO * width,
    };
  }, []);

  // First: animation completes and fades out, background fades in
  useEffect(() => {
    const animationTimer = setTimeout(() => setAnimationComplete(true), 5000);
    return () => clearTimeout(animationTimer);
  }, []);

  // Second: card appears after background transition completes
  useEffect(() => {
    if (animationComplete) {
      const cardTimer = setTimeout(() => setShowCard(true), 800);
      return () => clearTimeout(cardTimer);
    }
  }, [animationComplete]);

  const handleContinue = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
      console.log("Onboarding complete!");
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background image - shows after animation */}
      <motion.div
        animate={{ opacity: animationComplete ? 1 : 0 }}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-bottom"
          src="/assets/app-hero-bg.png"
        />
      </motion.div>

      {/* Gradient overlay - fades in with background, dims when card appears */}
      <motion.div
        animate={{ opacity: animationComplete ? (showCard ? 0.4 : 0.8) : 0 }}
        className="absolute inset-0 bg-linear-to-b from-[rgba(61,131,177,0.8)] to-[rgba(200,231,249,0)]"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Logo - persistent, animates in but never out */}
      <motion.img
        alt="Lucas"
        animate={{ opacity: 1, y: 0 }}
        className="-translate-x-1/2 absolute top-16 left-1/2 z-30 h-12 w-16 md:top-24 md:h-16 md:w-20"
        initial={{ opacity: 0, y: -10 }}
        src="/assets/logo-white-full.svg"
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      {/* Intro animation - sky + bushes + text */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Sky background */}
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full object-cover object-bottom"
              src="/assets/app-hero-bg.png"
            />

            {/* Gradient overlay - fades in with background, dims when card appears */}
            <motion.div
              animate={{ opacity: showCard ? 0.4 : 0.8 }}
              className="absolute inset-0 bg-linear-to-b from-[rgba(61,131,177,0.8)] to-[rgba(200,231,249,0)]"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            />

            {/* Bushes - Y offset is percentage of viewport height */}
            <motion.img
              alt=""
              animate={{ scale: bushesAnimation.animateScale }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 w-full origin-bottom"
              initial={{
                scale: bushesAnimation.initialScale,
                y: bushesAnimation.initialY,
              }}
              src="/assets/app-hero-gradient.png"
              transition={{
                duration: 5.15,
                ease: BUSHES_EASING,
              }}
            />

            {/* Animated text overlay - responsive */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              {/* Title - vertical center expand reveal, starts 0.7s, ends 2.2s */}
              <motion.div
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                className="mt-[-60px]"
                initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
                transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
              >
                <h1 className="w-full px-4 text-center font-serif text-5xl text-white tracking-[-1.5px] sm:tracking-[-2px] md:text-7xl md:tracking-[-3px] lg:text-8xl lg:tracking-[-4px] xl:text-[110px] xl:tracking-[-4.4px]">
                  college admissions on autopilot
                </h1>
              </motion.div>

              {/* Subtitle - clip reveal from top at 2.2s */}
              <motion.div
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                className="mt-4 md:mt-6"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                transition={{
                  duration: 3,
                  delay: 2.2,
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

      {/* Text Me View Container - Centered Flex Column */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Title */}
            <motion.h1
              className="w-full max-w-[calc(100%-2rem)] text-center font-serif text-5xl text-white tracking-[-2px] sm:max-w-[calc(100%-4rem)] sm:text-7xl sm:tracking-[-3px] md:text-8xl md:tracking-[-4px] lg:max-w-none lg:text-[130px] lg:tracking-[-5.2px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              text me
            </motion.h1>

            {/* Button */}
            <motion.div
              className="w-full max-w-[293px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <button
                type="button"
                className="h-[59px] w-full rounded-[10px] bg-white/20 text-center shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-white/30 active:scale-95"
                onClick={() => {
                  window.location.href = `sms:${LUCAS_BOT_CONTACT.email}?&body=Hi Lucas!`;
                }}
              >
                <span className="font-normal font-sans text-[#272727] text-[20px] tracking-[-0.4px]">
                  send me a text
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer text - fades In when complete */}
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

      {/* Onboarding card - fades and scales in/out */}
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
    </main>
  );
}
