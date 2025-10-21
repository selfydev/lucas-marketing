export function ContactHeroSection() {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FDF5] to-white px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="font-medium text-4xl text-neutral-800 leading-tight tracking-tight md:text-6xl md:leading-tight">
          Let's Connect
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 leading-relaxed md:text-lg">
          Whether you're a student exploring your college journey or an
          institution looking to partner with us, we'd love to hear from you.
        </p>
      </div>

      {/* Decorative Elements */}
      {/* Sticky Note - top right */}
      <div className="absolute top-20 right-4 hidden md:right-12 md:block lg:right-20">
        <img
          alt=""
          className="h-auto w-24 rotate-6 md:w-28 lg:w-32"
          src="/assets/sticky-note-cross.png"
        />
      </div>

      {/* Tape - top left */}
      <div className="absolute top-32 left-0 hidden md:block">
        <img
          alt=""
          className="-rotate-12 h-auto w-40 md:w-48 lg:w-56"
          src="/assets/tape.png"
        />
      </div>

      {/* Paperclip - bottom right */}
      <div className="absolute right-8 bottom-12 hidden md:block lg:right-16">
        <img
          alt=""
          className="h-auto w-16 rotate-45 md:w-20 lg:w-24"
          src="/assets/paperclip.png"
        />
      </div>
    </section>
  );
}
