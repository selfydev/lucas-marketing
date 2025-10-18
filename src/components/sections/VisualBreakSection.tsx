export function VisualBreakSection() {
  return (
    <section className="relative h-[1000px] w-full overflow-hidden bg-showcase-dark">
      <div className="relative h-full w-full">
        {/* Grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-100"
          style={{
            backgroundImage: "url(/assets/grain.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Content area */}
        <div className="relative z-20 h-full w-full">
          {/* Envelopes on the left side */}
          <img
            alt="College admission letters"
            className="md:-left-44 md:-translate-y-1/2 absolute right-4 bottom-16 h-[400px] w-auto scale-125 object-contain md:top-1/2 md:right-auto md:bottom-auto md:h-[900px] md:scale-100"
            data-testid="img-envelopes"
            height="900"
            loading="lazy"
            src="/assets/envelopes.png"
            width="600"
          />

          {/* Letter on top right */}
          <img
            alt="College acceptance letter"
            className="-translate-x-1/2 md:-translate-y-1/2 absolute top-[-400px] left-1/2 z-10 h-[1400px] w-auto scale-110 object-contain md:top-1/2 md:right-16 md:left-auto md:h-[840px] md:translate-x-0 md:scale-100"
            data-testid="img-letter"
            height="840"
            loading="lazy"
            src="/assets/letter.png"
            width="600"
          />

          {/* Paperclip over the letter */}
          <img
            alt="Paperclip"
            className="-translate-x-1/2 -translate-x-[200px] md:-translate-y-1/2 md:-translate-y-[320px] md:-translate-x-[550px] absolute top-20 left-1/2 z-20 h-[60px] w-auto object-contain md:top-1/2 md:right-16 md:left-auto md:h-[75px] md:translate-x-0"
            data-testid="img-paperclip"
            height="75"
            loading="lazy"
            src="/assets/paperclip.png"
            width="75"
          />

          {/* Pencil at the bottom right */}
          <img
            alt="Pencil"
            className="-translate-x-1/2 md:-translate-y-1/2 absolute top-64 left-1/2 z-30 h-[265px] w-auto translate-x-[50px] object-contain md:top-1/2 md:right-0 md:left-auto md:translate-x-0 md:translate-y-[100px]"
            data-testid="img-pencil"
            height="265"
            loading="lazy"
            src="/assets/pencil.png"
            width="100"
          />

          {/* Large clip at the left side of the screen */}
          <img
            alt="Large clip"
            className="md:-translate-y-1/2 absolute bottom-32 left-0 z-25 h-[194px] w-auto scale-[.8] object-contain md:top-1/2 md:right-auto md:bottom-auto md:left-8 md:translate-y-[270px] md:scale-100"
            data-testid="img-large-clip"
            height="194"
            loading="lazy"
            src="/assets/large-clip.png"
            width="150"
          />
        </div>
      </div>
    </section>
  );
}
