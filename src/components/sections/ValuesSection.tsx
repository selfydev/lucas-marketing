import { Globe, Heart, Lightbulb, Sparkles } from "lucide-react";

const values = [
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Expert college admissions guidance shouldn't cost thousands of dollars. We're making it accessible to every student, everywhere.",
  },
  {
    icon: Sparkles,
    title: "Empowerment",
    description:
      "We give students the tools, insights, and confidence they need to tell their unique story and stand out in a competitive landscape.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "By harnessing AI technology, we deliver personalized, adaptive guidance that evolves with each student's journey.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description:
      "Your application should reflect who you truly are. We help students showcase their genuine passions, experiences, and aspirations.",
  },
];

export function ValuesSection() {
  return (
    <section className="relative w-full bg-white px-4 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mx-auto max-w-[600px] font-medium text-4xl text-foreground tracking-[-0.02em] md:text-5xl lg:text-6xl">
            What drives us
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] font-medium text-foreground/70 text-lg md:text-xl">
            The principles that guide everything we build
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {values.map((value) => (
            <div
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-card-light p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg md:p-10"
              key={value.title}
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/15">
                <value.icon className="h-7 w-7 text-primary" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="mb-3 font-medium text-2xl text-foreground tracking-[-0.01em] md:text-3xl">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-normal text-base text-foreground/70 leading-relaxed md:text-lg">
                {value.description}
              </p>

              {/* Decorative gradient accent */}
              <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Decorative separator */}
        <div className="mx-auto mt-20 h-px w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Decorative Elements */}
      {/* Small pencil or clip accent */}
      <div className="absolute top-16 right-8 hidden opacity-40 lg:block">
        <img
          alt="Decorative element"
          className="h-auto w-[80px]"
          src="/assets/pencil.png"
        />
      </div>

      <div className="absolute bottom-16 left-8 hidden opacity-40 lg:block">
        <img
          alt="Decorative element"
          className="h-auto w-[60px]"
          src="/assets/large-clip.png"
        />
      </div>
    </section>
  );
}
