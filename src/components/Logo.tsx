import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link className="flex items-center" to="/">
      <img alt="Lucas AI" className="h-6 w-auto" src="/assets/logo-main.svg" />
    </Link>
  );
}
