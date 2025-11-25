import { delay } from "motion";
import { motion } from "motion/react";
import { Typewriter } from "motion-plus/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export function TypewriterText({ text, className }: TypewriterTextProps) {
  const [iteration, setIteration] = useState(0);
  const measureRef = useRef<HTMLParagraphElement | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) {
      return;
    }

    const updateHeight = () => {
      const nextHeight = element.getBoundingClientRect().height;
      setMeasuredHeight((current) =>
        current === nextHeight ? current : nextHeight,
      );
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    let frameId: number | null = null;

    const observer = new ResizeObserver(() => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateHeight();
      });
    });

    observer.observe(element);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      observer.disconnect();
    };
  }, [text, iteration]);

  const animation =
    measuredHeight === null ? undefined : { height: measuredHeight };
  const style =
    measuredHeight === null ? undefined : { height: measuredHeight };

  return (
    <motion.div
      animate={animation}
      className="relative w-full"
      initial={false}
      style={style}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <Typewriter
        as="p"
        backspace="all"
        className={cn("absolute inset-x-0 top-0 w-full", className)}
        key={iteration}
        onComplete={() => {
          delay(() => {
            setIteration((prev) => prev + 1);
          }, 5);
        }}
        speed="fast"
      >
        {text}
      </Typewriter>

      <p
        aria-hidden="true"
        className={cn("pointer-events-none opacity-0", className)}
        ref={measureRef}
      >
        {text}
      </p>
    </motion.div>
  );
}
