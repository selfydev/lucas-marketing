import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { downloadLucasContact } from "@/lib/vcf";

const ONBOARDING_STEPS = [
  {
    title: "i now live in iMessage",
    body: [
      "im smarter, funnier and more accessible.",
      "i now live where you spend most",
      "of your time anyway...",
    ],
    button: "continue",
  },
  {
    title: "grab my number",
    body: ["we can talk admissions all day long,", "whenever you need me."],
    button: "add me to your contacts",
  },
];

interface OnboardingCardProps {
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
}

const STEP_TRANSITION_DURATION_SECONDS = 0.55;
const STEP_TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;
const STEP_TRANSITION_Y = 16;
const STEP_TRANSITION_SCALE_FROM = 0.995;
const BUTTON_LABEL_TRANSITION_Y = 10;
const STEP_TRANSITION_LOCK_MS =
  Math.round(STEP_TRANSITION_DURATION_SECONDS * 1000) + 50;

function StepDots({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          className={`size-2 rounded-full transition-colors duration-300 ${
            index < currentStep
              ? "bg-white"
              : index === currentStep
                ? "border border-white/60 bg-white/30"
                : "border border-white/40 bg-transparent"
          }`}
          key={`step-dot-${index}`}
        />
      ))}
    </div>
  );
}

export function OnboardingCard({
  currentStep,
  totalSteps,
  onContinue,
}: OnboardingCardProps) {
  const step = ONBOARDING_STEPS[currentStep];
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [contactDownloaded, setContactDownloaded] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, STEP_TRANSITION_LOCK_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTransitioning]);

  const handleContinue = async () => {
    if (isTransitioning || isDownloading) {
      return;
    }

    // Step 2 (index 1): "add me to your contacts" - trigger VCF download first
    if (currentStep === 1 && !contactDownloaded) {
      setIsDownloading(true);
      try {
        await downloadLucasContact();
        setContactDownloaded(true);
      } catch (error) {
        console.error("Failed to download contact:", error);
      } finally {
        setIsDownloading(false);
      }
      return; // Stay on this step until user clicks "continue"
    }

    setIsTransitioning(true);
    onContinue();
  };

  if (!step) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Step dots indicator */}
      <StepDots currentStep={currentStep} totalSteps={totalSteps} />

      {/* Card */}
      <div className="onboarding-card relative flex w-[440px] max-w-[calc(100vw-2rem)] flex-col items-center rounded-[22px] px-3 py-8">
        {/* Illustration - static, doesn't animate */}
        <div className="mb-4 h-[170px] w-[122px] overflow-hidden">
          <OptimizedImage
            alt="Lucas landscape illustration"
            className="size-full object-contain"
            height={170}
            sizes="122px"
            src="/assets/imessage-illustration.png"
            width={122}
          />
        </div>

        {/* Step content - grouped layer, overlap transition */}
        <div className="relative h-[155px] w-full sm:h-[175px]">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center"
              exit={{
                opacity: 0,
                y: -STEP_TRANSITION_Y,
                scale: STEP_TRANSITION_SCALE_FROM,
              }}
              initial={{
                opacity: 0,
                y: STEP_TRANSITION_Y,
                scale: STEP_TRANSITION_SCALE_FROM,
              }}
              key={`step-content-${currentStep}`}
              style={{ willChange: "transform, opacity" }}
              transition={{
                duration: STEP_TRANSITION_DURATION_SECONDS,
                ease: STEP_TRANSITION_EASE,
              }}
            >
              {/* Title wrapper - FIXED HEIGHT to prevent layout shift */}
              <div className="flex h-[44px] w-full items-center justify-center sm:h-[52px]">
                <h2 className="text-center font-serif text-[#313131] text-[32px] tracking-[-1.28px] sm:text-[38px] sm:tracking-[-1.52px]">
                  {step.title}
                </h2>
              </div>

              {/* Dotted separator */}
              <div className="my-4 h-px w-[280px] border-[#c0c0c0] border-t border-dotted sm:w-[318px]" />

              {/* Body wrapper - FIXED HEIGHT to prevent layout shift */}
              <div className="flex h-[78px] w-full items-center justify-center sm:h-[90px]">
                <div className="w-full max-w-[400px] px-4 text-center text-[#313131] text-[18px] tracking-[-0.36px] sm:text-[20px] sm:tracking-[-0.4px]">
                  {step.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Continue button - stable container, animated label */}
        <div className="mt-6 flex w-full justify-center">
          <button
            aria-disabled={isTransitioning || isDownloading}
            className="h-[60px] w-full max-w-[380px] rounded-[10px] bg-[#232323] text-[18px] text-white tracking-[-0.36px] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[65px] sm:max-w-[416px] sm:text-[20px] sm:tracking-[-0.4px]"
            disabled={isDownloading}
            onClick={handleContinue}
            type="button"
          >
            <span className="relative flex size-full items-center justify-center">
              <AnimatePresence initial={false} mode="sync">
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0, y: -BUTTON_LABEL_TRANSITION_Y }}
                  initial={{ opacity: 0, y: BUTTON_LABEL_TRANSITION_Y }}
                  key={`button-label-${isDownloading ? "downloading" : contactDownloaded ? "continue" : step.button}`}
                  style={{ willChange: "transform, opacity" }}
                  transition={{
                    duration: STEP_TRANSITION_DURATION_SECONDS,
                    ease: STEP_TRANSITION_EASE,
                  }}
                >
                  {isDownloading
                    ? "downloading..."
                    : contactDownloaded
                      ? "continue"
                      : step.button}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { ONBOARDING_STEPS };
