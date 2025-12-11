import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagPillProps extends React.ComponentProps<typeof Badge> {}

function TagPill({ className, children, ...props }: TagPillProps) {
  return (
    <Badge
      className={cn(
        "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-700 text-xs shadow-xs transition-colors focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-200",
        className,
      )}
      variant="outline"
      {...props}
    >
      {children}
    </Badge>
  );
}

export { TagPill };
