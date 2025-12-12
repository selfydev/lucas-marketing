import { createFileRoute } from "@tanstack/react-router";
import Lottie from "lottie-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ONBOARDING_STEPS, OnboardingCard } from "@/components/OnboardingCard";
import { LUCAS_BOT_CONTACT } from "@/lib/vcf";
import lucasAnimation from "@/assets/lottie/lucas-animated.json";

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

      {/* Lottie animation - full bleed intro */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-white"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Lottie
              animationData={lucasAnimation}
              autoplay
              loop={false}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
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
