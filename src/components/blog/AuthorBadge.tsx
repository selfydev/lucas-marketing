import type * as React from "react";
import type { BlogAuthor } from "@/lib/types/blog";
import { cn } from "@/lib/utils";

interface AuthorBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  author?: BlogAuthor;
}

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);

  if (!parts.length) {
    return "LA";
  }

  const [first, second] = parts;
  const firstInitial = first?.charAt(0) ?? "";
  const secondInitial = second?.charAt(0) ?? first?.charAt(1) ?? "";

  return `${firstInitial}${secondInitial}`.toUpperCase();
}

function AuthorBadge({ author, className, ...props }: AuthorBadgeProps) {
  const name = author?.name || "Lucas AI Team";
  const role = author?.role;
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="flex size-10 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-800 text-sm"
      >
        {initials}
      </span>
      <span className="flex flex-col">
        <span className="font-semibold text-slate-900 text-sm">{name}</span>
        {role ? <span className="text-slate-600 text-xs">{role}</span> : null}
      </span>
    </div>
  );
}

export { AuthorBadge };
