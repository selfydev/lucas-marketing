import { useCallback, useEffect, useRef, useState } from "react";
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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!(isDragging && containerRef.current)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleMouseMove(e);
    },
    [handleMouseMove]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!(isDragging && containerRef.current)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      className={cn(
        "relative mx-auto h-[225px] w-[300px] cursor-col-resize select-none overflow-hidden rounded-lg border-2 border-white/20 md:h-[500px] md:w-[800px]",
        className
      )}
      data-mobile-responsive="true"
      data-testid="before-after-slider"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={containerRef}
    >
      {/* After Image (Background) */}
      <img
        alt="After"
        className="absolute inset-0 h-full w-full object-cover"
        data-testid="img-after"
        src={afterImage}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          alt="Before"
          className="h-full w-full object-cover"
          data-testid="img-before"
          src={beforeImage}
        />
      </div>

      {/* Slider Line and Handle */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 w-0.5 bg-white"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div
          className="-translate-y-1/2 -translate-x-1/2 pointer-events-auto absolute top-1/2 flex h-12 w-12 cursor-col-resize items-center justify-center rounded-full bg-white shadow-lg md:h-8 md:w-8"
          data-testid="button-slider-handle"
        >
          <div className="flex gap-0.5 md:gap-0.5">
            <div className="h-5 w-0.5 rounded-full bg-gray-400 md:h-4 md:w-0.5" />
            <div className="h-5 w-0.5 rounded-full bg-gray-400 md:h-4 md:w-0.5" />
          </div>
        </div>
      </div>

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
