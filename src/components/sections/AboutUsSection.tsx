export function AboutUsSection() {
  return (
    <section className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)] md:h-auto md:min-h-screen md:pb-0">
      <div className="w-full max-w-7xl px-4 sm:px-4 md:px-6 lg:px-4">
        {/* iOS Message - Above headline */}
        <div
          className="mb-2 flex justify-center pb-20 md:mb-6 md:pb-0 lg:mb-8"
          style={{
            paddingBottom: "2rem",
          }}
        >
          <img
            alt="iOS Message"
            className="h-[56px] w-[359px] max-w-full sm:h-[38px] sm:w-[240px] md:h-[44px] md:w-[280px] lg:h-[56px] lg:w-[359px]"
            src="/assets/iosmessage1.svg"
          />
        </div>

        {/* Main Headline - Center */}
        <div className="relative text-center">
          <h2
            className="mx-auto max-w-[824px] px-2 text-center font-medium text-[65px] text-foreground leading-[73px] tracking-[-0.02em] sm:text-[28px] sm:leading-[32px] sm:tracking-[-0.01em] md:text-[45px] md:leading-[50px] md:tracking-[-0.015em] lg:text-[65px] lg:leading-[73px] lg:tracking-[-0.02em]"
            style={{ lineHeight: 1 }}
          >
            <span style={{ fontSize: "55px" }}>
              <span className="font-medium tracking-[-0.02em] sm:tracking-[-0.01em] md:tracking-[-0.015em] lg:tracking-[-0.02em]">
                The{" "}
              </span>
              {/* Desktop highlight line */}
              <img
                alt="Line"
                className="absolute top-[0.4em] left-[-0.2em] hidden h-[0.6em] opacity-80 md:block"
                src="/assets/line-83.svg"
                style={{
                  zIndex: 0,
                  width: "calc(100% + 0.4em)",
                  paddingLeft: "115px",
                }}
              />
              {/* Mobile highlight line */}
              <img
                alt="Line"
                className="absolute top-[0.4em] left-[-0.2em] h-[0.6em] opacity-80 md:hidden"
                src="/assets/line-83.svg"
                style={{
                  paddingLeft: "175px",
                  paddingRight: "50px",
                  height: "34px",
                  maxHeight: "none",
                  objectFit: "cover",
                  opacity: 1,
                  zIndex: 0,
                  width: "calc(100% + 0.4em)",
                }}
              />
              <span
                className="relative italic tracking-[-0.02em] sm:tracking-[-0.01em] md:tracking-[-0.015em] lg:tracking-[-0.02em]"
                style={{
                  fontSize: "55px",
                  fontFamily: "'Instrument Serif', serif",
                }}
              >
                <span className="relative" style={{ zIndex: 1 }}>
                  college admission genius
                </span>
              </span>
            </span>
            <br />
            <span
              className="font-medium tracking-[-0.02em] sm:tracking-[-0.01em] md:tracking-[-0.015em] lg:tracking-[-0.02em]"
              style={{ fontSize: "55px" }}
            >
              that fits in your pocket.
            </span>
          </h2>
        </div>
      </div>

      {/* Sticky Note - Center Left */}
      <div
        className="absolute top-1/2 left-4 hidden md:top-1/2 md:left-2 md:block lg:top-1/2 lg:left-4"
        style={{ transform: "rotate(-11.64deg) translateY(-50%)" }}
      >
        <img
          alt="Sticky Note"
          className="h-[285px] w-auto md:h-[220px] lg:h-[285px]"
          src="/assets/sticky-note-cross.png"
        />
      </div>

      {/* Blue Tape - Bottom Left */}
      <div
        className="absolute bottom-8 left-0 z-10 sm:bottom-2 md:bottom-4 lg:bottom-8"
        style={{
          bottom: "150px",
          left: "-100px",
        }}
      >
        <img
          alt="Blue Tape"
          className="h-auto w-[260px] sm:w-[160px] md:w-[200px] lg:w-[260px]"
          src="/assets/tape.png"
        />
      </div>

      {/* Highlighter - Top Right */}
      <div className="absolute top-4 right-0 hidden md:top-2 md:block lg:top-4">
        <img
          alt="Highlighter"
          className="h-auto w-[200px] md:w-[160px] lg:w-[200px]"
          src="/assets/highlighter.png"
        />
      </div>

      {/* Highlighter Cap - Below Highlighter */}
      <div className="absolute top-32 right-4 hidden md:top-20 md:right-2 md:block lg:top-32 lg:right-4">
        <img
          alt="Highlighter Cap"
          className="h-auto w-[140px] rotate-45 transform md:w-[110px] lg:w-[140px]"
          src="/assets/highlighter-cap.png"
        />
      </div>

      {/* Paperclip - Bottom Right */}
      <div
        className="absolute right-12 bottom-8 z-10 sm:right-4 sm:bottom-3 sm:scale-75 md:right-8 md:bottom-6 md:scale-90 lg:right-12 lg:bottom-8"
        style={{
          bottom: "5rem",
          right: "1rem",
        }}
      >
        <img
          alt="Paperclip"
          className="h-auto w-[110px] sm:w-[70px] md:w-[85px] lg:w-[110px]"
          src="/assets/paperclip.png"
        />
      </div>
    </section>
  );
}
