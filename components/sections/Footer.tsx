"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Heart
} from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Updates", href: "#updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press Kit", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Help Center", href: "#help" },
      { label: "Parents Guide", href: "#guide" },
      { label: "Safety", href: "#safety" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "COPPA Compliance", href: "#coppa" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com/lucasai",
    label: "Follow us on Twitter",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://instagram.com/lucasai",
    label: "Follow us on Instagram",
  },
  {
    icon: <Youtube className="h-5 w-5" />,
    href: "https://youtube.com/lucasai",
    label: "Subscribe on YouTube",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com/company/lucasai",
    label: "Connect on LinkedIn",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <footer
      className="relative overflow-hidden bg-foreground text-white"
      aria-label="Footer"
    >
      {/* Decorative top border */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-lucas-purple via-lucas-blue to-lucas-cyan" />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-transform hover:scale-105"
              aria-label="Lucas AI Home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lucas-purple to-lucas-blue">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="font-[var(--font-baloo)] text-2xl font-bold">
                Lucas
              </span>
            </Link>

            {/* Tagline */}
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Making learning magical for kids everywhere. AI-powered education 
              that adapts to every child&apos;s unique journey.
            </p>

            {/* Newsletter signup */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-white/80">
                Get learning tips & updates
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-10 w-full rounded-lg bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lucas-purple"
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-lucas-purple to-lucas-blue px-4 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-lucas-purple/30"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-all hover:bg-lucas-purple hover:text-white"
                  aria-label={social.label}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, social.href)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-lucas-purple-light"
                      tabIndex={0}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © {currentYear} Lucas AI. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-white/40">
            Made with{" "}
            <Heart className="h-4 w-4 text-lucas-pink" fill="currentColor" />{" "}
            for curious kids everywhere
          </p>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
        <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-lucas-purple/5 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-lucas-blue/5 blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;

