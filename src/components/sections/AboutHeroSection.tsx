import { Button } from "@/components/ui/button";

export function AboutHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FDF5] to-white px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="w-full max-w-4xl">
        {/* Main Headline */}
        <div className="relative text-center">
          <h1 className="mx-auto max-w-[900px] px-2 text-center font-medium text-[53px] text-foreground leading-[1.1] tracking-[-1.80px] sm:text-3xl sm:tracking-[-1.20px] md:text-5xl md:tracking-[-1.50px] lg:text-6xl lg:tracking-[-1.80px] xl:text-[80px]">
            <span className="font-medium tracking-[-0.02em]">
              Leveling the playing field for
            </span>
            <br />
            <span className="relative inline-block">
              <img
                alt="Highlight line"
                className="absolute top-[0.4em] left-[-0.2em] h-[0.6em] opacity-80"
                height="20"
                loading="eager"
                src="/assets/line-83.svg"
                style={{
                  zIndex: 0,
                  maxWidth: "none",
                  width: "114%",
                  transformOrigin: "left center",
                }}
                width="100"
              />
              <span
                className="relative italic tracking-[-0.02em]"
                style={{
                  zIndex: 1,
                  fontFamily: "'Instrument Serif', serif",
                }}
              >
                every student
              </span>
            </span>
          </h1>
        </div>

        {/* Supporting Copy */}
        <p className="mx-auto mt-8 max-w-[700px] px-4 text-center font-medium text-foreground/80 text-lg leading-relaxed md:text-xl">
          College admissions shouldn't be a privilege reserved for those who can
          afford expensive consultants. We're building AI-powered tools that
          give every student access to world-class guidance, personalized
          feedback, and the confidence to showcase their unique story.
        </p>

        {/* Mission Statement */}
        <div className="mx-auto mt-12 max-w-[650px] rounded-2xl border border-primary/10 bg-white/60 px-8 py-6 backdrop-blur-sm md:px-10 md:py-8">
          <p className="text-center font-medium text-base text-foreground leading-relaxed md:text-lg">
            Our mission is simple: democratize access to exceptional college
            admissions support, empowering students to reach their full
            potential—regardless of their background or resources.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="h-auto rounded-[5px] px-6 py-4 font-medium backdrop-blur-sm"
          >
            <a href="https://hi.meetlucas.ai/sign-in">
              <span className="text-base">Join our mission</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* Sticky Note - Top Left */}
      <div
        className="absolute top-24 left-8 hidden md:block lg:left-16"
        style={{ transform: "rotate(-8deg)" }}
      >
        <img
          alt="Sticky Note"
          className="h-[240px] w-auto opacity-90 md:h-[200px] lg:h-[240px]"
          src="/assets/sticky-note-cross.png"
        />
      </div>

      {/* Highlighter - Top Right */}
      <div
        className="absolute top-32 right-4 hidden md:block lg:right-12"
        style={{ transform: "rotate(15deg)" }}
      >
        <img
          alt="Highlighter"
          className="h-auto w-[180px] opacity-90 md:w-[160px] lg:w-[200px]"
          src="/assets/highlighter.png"
        />
      </div>

      {/* Paperclip - Bottom Left */}
      <div className="absolute bottom-32 left-12 hidden md:block lg:left-24">
        <img
          alt="Paperclip"
          className="h-auto w-[100px] opacity-90 md:w-[85px] lg:w-[100px]"
          src="/assets/paperclip.png"
        />
      </div>

      {/* Tape - Bottom Right */}
      <div
        className="absolute right-0 bottom-24 hidden md:block"
        style={{ transform: "rotate(-5deg)" }}
      >
        <img
          alt="Blue Tape"
          className="h-auto w-[220px] opacity-90 md:w-[180px] lg:w-[220px]"
          src="/assets/tape.png"
        />
      </div>
    </section>
  );
}
