import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

/**
 * Linearly interpolate between two values based on screen width
 * @param minWidth - Screen width where we use mobileValue (e.g., 320)
 * @param maxWidth - Screen width where we use desktopValue (e.g., 1920)
 * @param mobileValue - Value at minWidth
 * @param desktopValue - Value at maxWidth
 * @param currentWidth - Current screen width
 */
export function lerp(
  minWidth: number,
  maxWidth: number,
  mobileValue: number,
  desktopValue: number,
  currentWidth: number,
): number {
  const t = Math.max(
    0,
    Math.min(1, (currentWidth - minWidth) / (maxWidth - minWidth)),
  );
  return mobileValue + (desktopValue - mobileValue) * t;
}
