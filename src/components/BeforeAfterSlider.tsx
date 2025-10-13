import {
  animate,
  clamp,
  type MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [boundary, setBoundary] = useState(150); // Default to half of 300px mobile width

  // Transform x position to clip-path (reveals beforeImage from left)
  const clipPath = useTransform(
    x,
    [-boundary, boundary],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"]
  );

  // Dynamic slider line color that fades at edges for visual polish
  const lineBackgroundColor = useSliderColor(x, boundary);

  // Calculate boundary based on container width
  useLayoutEffect(() => {
    if (containerRef.current) {
      setBoundary(containerRef.current.clientWidth / 2);
    }
  }, []);

  // Keyboard navigation with smooth spring animations
  const keyboard = useKeyboard(x, boundary, 50);

  return (
    <div
      className={cn(
        "relative mx-auto h-[295px] w-[calc(100vw-8px)] select-none overflow-hidden rounded-lg border-2 border-white/20 md:h-[500px] md:w-[800px]",
        className
      )}
      data-mobile-responsive="true"
      data-testid="before-after-slider"
      ref={containerRef}
    >
      {/* After Image (Background - always visible) */}
      <img
        alt="After"
        className="absolute inset-0 h-full w-full object-cover"
        data-testid="img-after"
        src={afterImage}
      />

      {/* Before Image (Overlay with clip-path reveal) */}
      <motion.img
        alt="Before"
        className="absolute inset-0 h-full w-full object-cover"
        data-testid="img-before"
        src={beforeImage}
        style={{ clipPath }}
      />

      {/* Slider Line and Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 cursor-grab active:cursor-grabbing"
        data-testid="button-slider-handle"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.05}
        onBlur={keyboard.stop}
        onFocus={keyboard.start}
        style={{
          x,
          backgroundColor: lineBackgroundColor,
          left: "50%",
          transform: "translateX(-50%)",
          filter: "drop-shadow(2px 0 3px rgba(0, 0, 0, 0.4))",
        }}
        tabIndex={0}
      >
        {/* Slider Handle */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg focus-visible:outline-4 focus-visible:outline-blue-500 focus-visible:outline-offset-2 md:h-10 md:w-10">
          <LeftRightIcon />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-2 left-2 rounded bg-black/50 px-2 py-1 font-medium text-white text-xs md:top-4 md:left-4 md:text-sm">
        Before
      </div>
      <div className="pointer-events-none absolute top-2 right-2 rounded bg-black/50 px-2 py-1 font-medium text-white text-xs md:top-4 md:right-4 md:text-sm">
        After
      </div>
    </div>
  );
}

/**
 * ==============   Utils   ================
 */

function useSliderColor(x: MotionValue<number>, boundary: number) {
  return useTransform(
    x,
    [-boundary + 20, -boundary + 60, boundary - 60, boundary - 20],
    [
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 0)",
    ]
  );
}

function useKeyboard(x: MotionValue<number>, boundary: number, step: number) {
  const handleKeyDown = (event: KeyboardEvent) => {
    let moveBy = 0;

    if (event.key === "ArrowLeft") {
      moveBy = -step;
    } else if (event.key === "ArrowRight") {
      moveBy = step;
    } else {
      return;
    }

    animate(x, clamp(-boundary, boundary, x.get() + moveBy), {
      type: "spring",
      stiffness: 900,
      damping: 40,
      velocity: moveBy * 10,
    });
  };

  const start = () => {
    document.addEventListener("keydown", handleKeyDown);
  };

  const stop = () => {
    document.removeEventListener("keydown", handleKeyDown);
  };

  return { start, stop };
}

function LeftRightIcon() {
  return (
    <svg
      className="text-gray-800"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Drag slider left or right</title>
      <path d="m18 8 4 4-4 4" />
      <path d="m6 8-4 4 4 4" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}
