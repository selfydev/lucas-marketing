import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import sticky_note_cross from "/assets/sticky-note-cross.png";

const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#" },
  { label: "Enterprise", href: "/#" },
  { label: "Contact", href: "/contact" },
];

export function FooterSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMargin = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateMargin(); // run on mount
    window.addEventListener("resize", updateMargin);

    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  return (
    <footer className="relative w-full bg-transparent" id="contact">
      <div className="relative h-[650px] w-full md:h-[726px]">
        <div className="absolute top-[40px] left-0 h-[610px] w-full overflow-hidden bg-showcase-dark md:h-[686px]">
          {/* Grain texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-100"
            style={{
              backgroundImage: "url(/assets/grain.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />

          {/* White grid overlay - positioned to match footer content width */}
          <div className="-translate-x-1/2 pointer-events-none absolute left-1/2 z-20 mx-auto h-full w-full max-w-[1320px] transform">
            <div className="absolute top-[60px] right-4 bottom-[110px] left-4 md:top-[90px] md:right-[60px] md:bottom-[90px] md:left-[60px]">
              {/* Grid pattern with border to complete outer lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                  backgroundSize: "21px 21px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              />

              {/* Central cutout area for text with border to complete hole lines */}
              <div
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[240px] w-[280px] transform bg-showcase-dark md:h-[336px] md:w-[610px]"
                style={{
                  backgroundImage: "url(/assets/grain.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              />

              {/* iOS Message Element - top left */}
              <div
                className="absolute top-[-2px] left-[-10px] z-30 md:left-[5px]"
                style={{
                  transform: "rotate(1deg)",
                }}
              >
                <img
                  alt="iOS Message"
                  className="h-[61px] w-auto md:h-[83px]"
                  src="/assets/ios-message-footer.svg"
                />
              </div>
            </div>
          </div>

          {/* Tape Element - side of screen within footer */}
          <div className="absolute top-[420px] left-0 z-30 md:top-[245px]">
            <img
              alt="Blue Tape"
              className="h-auto w-[224px] md:w-[260px]"
              data-testid="img-tape-footer"
              src="/assets/tape.png"
            />
          </div>

          {/* Paperclip Element - below tape */}
          <div className="absolute top-[380px] left-[280px] z-30 md:top-[345px] md:left-[260px]">
            <img
              alt="Paperclip"
              className="h-auto w-[131px] md:w-[110px]"
              data-testid="img-paperclip-footer"
              src="/assets/paperclip.png"
            />
          </div>

          {/* Highlighter Cap Element - to the left and slightly lower than paperclip */}
          <div className="absolute top-[360px] left-[20px] z-30 hidden md:block">
            <img
              alt="Highlighter Cap"
              className="-rotate-[10deg] h-auto w-[154px] transform md:w-[121px] lg:w-[154px]"
              data-testid="img-highlighter-cap-footer"
              src="/assets/highlighter-cap.png"
            />
          </div>

          {/* Highlighter Element - below highlighter cap */}
          <div className="absolute top-[420px] left-[10px] z-30 hidden md:block">
            <img
              alt="Highlighter"
              className="h-auto w-[315px] rotate-[10deg] transform md:w-[252px] lg:w-[315px]"
              data-testid="img-highlighter-footer"
              src="/assets/highlighter-full.png"
            />
          </div>

          {/* Red Sticker Element - top right */}
          <div className="absolute top-[30px] right-[50px] z-30 hidden md:top-[50px] md:right-[200px] md:block">
            <img
              alt="Red Sticker"
              className="h-[90px] w-auto md:h-[140px]"
              data-testid="img-red-sticker-footer"
              src="/assets/red-sticker.png"
            />
          </div>

          {/* White Sticker Element - below pencil, right edge */}
          <div className="absolute top-[220px] right-[-20px] z-30 hidden md:block">
            <img
              alt="White Sticker"
              className="h-[140px] w-auto"
              data-testid="img-white-sticker-footer"
              src="/assets/white-sticker.png"
            />
          </div>

          {/* Sticky Note Element - below white sticker */}
          <div
            className="absolute top-[340px] right-[60px] z-30 hidden md:block"
            style={{ transform: "rotate(-11.64deg)" }}
          >
            <img
              alt="Sticky Note"
              className="h-[314px] w-auto sm:h-[198px] md:h-[242px] lg:h-[314px]"
              data-testid="img-sticky-note-footer"
              src={sticky_note_cross}
            />
          </div>
        </div>

        <div className="-translate-x-1/2 absolute top-[558px] left-1/2 mx-auto h-[42px] w-full max-w-[1320px] transform px-4 md:top-[664px] md:px-[60px]">
          <div className="relative h-full w-full">
            <img
              alt="Logo"
              className="absolute top-0 left-0 h-[42px] w-7"
              src="/assets/logo.svg"
            />

            <nav className="absolute top-4 left-[36px] hidden gap-4 md:left-[68px] md:flex md:gap-[40px]">
              {navigationLinks.map((link, index) => (
                <a
                  className="whitespace-nowrap font-medium text-sm text-white/50 leading-[10px] tracking-[-0.32px] transition-colors hover:text-white md:text-base"
                  href={link.href}
                  key={index}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="absolute top-4 right-0 whitespace-nowrap font-medium text-white/50 text-xs leading-[10px] tracking-[-0.32px] md:text-base">
              © 2025 Lucas. All rights reserved.
            </div>
          </div>
        </div>

        {/* Text content positioned to align with grid hole */}
        <div className="-translate-x-1/2 absolute top-[210px] left-1/2 z-30 h-[200px] w-[280px] transform md:top-[240px] md:h-[244px] md:w-[610px]">
          <h1 className="-translate-x-1/2 absolute top-0 left-1/2 w-full transform text-center font-medium text-3xl text-white leading-[34px] tracking-[-1.20px] md:text-6xl md:leading-[58px]">
            <span className="block md:whitespace-nowrap">
              Colleges falling in
            </span>
            <span className="block md:whitespace-nowrap">
              love with you ...
            </span>
          </h1>

          <p className="-translate-x-1/2 absolute top-[80px] left-1/2 w-[240px] transform text-center font-normal text-sm text-white leading-[normal] tracking-[-0.32px] md:top-[132px] md:w-[454px] md:text-base">
            Use Lucas AI to become the applicant colleges fight over to admit
          </p>

          <div
            className="-translate-x-1/2 absolute top-[180px] left-1/2 h-10 w-[200px] transform md:top-[220px] md:h-11 md:w-[235px]"
            style={{ top: isMobile ? "139px" : "180px" }}
          >
            <Button
              asChild
              className="relative h-full w-full rounded-[30px] border-0 bg-[linear-gradient(180deg,rgba(238,238,238,1)_0%,rgba(199,199,199,1)_100%)] shadow-none hover:bg-[linear-gradient(180deg,rgba(228,228,228,1)_0%,rgba(189,189,189,1)_100%)]"
            >
              <a href="https://app.meetlucas.ai/sign-in">
                <span className="text-center font-medium text-neutral-800 text-sm leading-[normal] tracking-[-0.32px] md:text-base">
                  Start your journey
                </span>
              </a>
            </Button>
          </div>
        </div>

        <div className="-translate-x-1/2 absolute top-[-50px] left-1/2 h-[334px] w-full max-w-[1440px] transform md:max-w-none">
          <div className="relative h-[334px]">
            <div className="absolute top-[10px] left-0 z-0 h-28 w-full rounded-b-[30px] bg-white shadow-[0px_4px_9px_#0000001f,0px_16px_16px_#0000001c,0px_36px_22px_#0000000f,0px_65px_26px_#00000005,0px_101px_28px_transparent]" />

            <div className="absolute top-0 left-0 z-10 h-[10px] w-full bg-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
