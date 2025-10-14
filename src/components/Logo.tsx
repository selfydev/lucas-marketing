import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string | undefined }) {
  return (
    <Link className="flex items-center" to="/">
      <img
        alt="Lucas AI"
        className={cn("h-6 w-auto", className)}
        src="/assets/logo-main.svg"
      />
    </Link>
  );
}
