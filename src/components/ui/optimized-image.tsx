import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cdn, srcset } from "@/lib/cdn";

type NativeImageProps = Omit<
  ComponentPropsWithoutRef<"img">,
  "alt" | "fetchPriority" | "loading" | "sizes" | "src" | "srcSet"
>;

interface OptimizedImageProps extends NativeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, sizes = "100vw", priority = false, ...props }, ref) => {
    const extension = src.split("?")[0]?.toLowerCase();
    const isSvg = extension?.endsWith(".svg") ?? false;

    return (
      <img
        {...props}
        alt={alt}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        ref={ref}
        sizes={sizes}
        src={isSvg ? src : cdn(src, 1536)}
        srcSet={isSvg ? undefined : srcset(src)}
      />
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";
