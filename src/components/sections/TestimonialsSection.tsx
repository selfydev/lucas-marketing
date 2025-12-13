import { OptimizedImage } from "@/components/ui/optimized-image";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Lucas legit made my essay sound fire. Got into NYU 🗽🔥",
      name: "Sarah Chen",
      school: "New York University",
      image: "S",
      imageURL: "1.png",
    },
    {
      quote:
        "I went from having no extracurriculars to founding a nonprofit organization with Lucas's step-by-step guidance. Got into MIT!",
      name: "Marcus Johnson",
      school: "MIT",
      image: "M",
      imageURL: "2.png",
    },
    {
      quote:
        "The interview prep was game-changing. Lucas helped me practice for Harvard interviews and I felt completely prepared.",
      name: "Emily Rodriguez",
      school: "Harvard University",
      image: "E",
      imageURL: "3.png",
    },
    {
      quote: "Stanford… thanks Lucas. You the goat fr.",
      name: "David Kim",
      school: "Stanford University",
      image: "D",
      imageURL: "4.png",
    },
    {
      quote:
        "The essay feedback was incredible. Lucas helped me find my unique voice and tell my story in a compelling way.",
      name: "Jessica Thompson",
      school: "Yale University",
      image: "J",
      imageURL: "5.png",
    },
    {
      quote: "Bro Lucas is top tier. My essay went from mid to INSANE.",
      name: "Alex Rivera",
      school: "Columbia University",
      image: "A",
      imageURL: "6.png",
    },
    {
      quote: "Lucas knew more about Harvard apps than my school counselor 💀",
      name: "Rachel Park",
      school: "Harvard University",
      image: "R",
      imageURL: "7.png",
    },
    {
      quote: "One word: Accepted. Thanks Lucas",
      name: "Jordan Williams",
      school: "Brown University",
      image: "J",
      imageURL: "8.png",
    },
    {
      quote:
        "I was lost between Duke and UCLA but Lucas helped me decide. No regrets.",
      name: "Maya Patel",
      school: "Duke University",
      image: "M",
      imageURL: "9.png",
    },
    {
      quote:
        "Family legit FIRED our admissions consultant after we found Lucas. Saved $ and got into Columbia 😂",
      name: "Kevin Wong",
      school: "Columbia University",
      image: "K",
      imageURL: "10.png",
    },
    {
      quote: "Lucas fixed my essay in like 2 minutes. Unreal.",
      name: "Sophia Martinez",
      school: "Duke University",
      image: "S",
      imageURL: "11.png",
    },
    {
      quote: "Lucas is crazy smart. Like knows EVERYTHING about colleges.",
      name: "Tyler Jackson",
      school: "Vanderbilt University",
      image: "T",
      imageURL: "12.png",
    },
    {
      quote: "Got into Penn. Essay was 💯 all because of Lucas.",
      name: "Lily Chen",
      school: "University of Pennsylvania",
      image: "L",
      imageURL: "13.png",
    },
    {
      quote: "Not gonna lie, Lucas knew exactly what Yale wanted to hear.",
      name: "James Miller",
      school: "Yale University",
      image: "J",
      imageURL: "14.png",
    },
    {
      quote:
        "Lucas gave me ideas for extracurriculars I never even thought of.",
      name: "Isabella Garcia",
      school: "Johns Hopkins University",
      image: "I",
      imageURL: "15.png",
    },
    {
      quote:
        "Lucas's mentorship made all the difference. I'm now pursuing my dreams at University of Chicago.",
      name: "Ryan Lee",
      school: "University of Chicago",
      image: "R",
      imageURL: "16.png",
    },
    {
      quote: "Essays used to be my nightmare, not anymore. Thank u Lucas 🙌",
      name: "Amanda Foster",
      school: "New York University",
      image: "A",
      imageURL: "17.png",
    },
    {
      quote: "Lucas helped me find my unique angle for applications.",
      name: "Brandon Liu",
      school: "Cornell University",
      image: "B",
      imageURL: "18.png",
    },
    {
      quote: "Lucas made my app look elite. USC said yes ✅",
      name: "Grace Kim",
      school: "University of Southern California",
      image: "G",
      imageURL: "19.png",
    },
    {
      quote: "Lucas is like having a genius best friend who actually cares!",
      name: "Nathan Davis",
      school: "Washington University",
      image: "N",
      imageURL: "20.png",
    },
  ];

  return (
    <section
      className="mx-auto w-full max-w-[1320px] px-4 py-16 md:px-[60px]"
      id="testimonials"
    >
      <div
        className="mb-16 flex flex-col items-center"
        style={{
          marginBottom: "0px",
        }}
      >
        <h2 className="mb-4 font-normal text-[#131313] text-[40px] leading-[48px] tracking-[0]">
          What our users say
        </h2>

        <p className="max-w-[380px] font-normal text-[17.7px] text-black leading-normal tracking-[-0.11px] opacity-40">
          See what our customers have to say about us.
        </p>
      </div>

      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Top fade */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-16 bg-gradient-to-b from-white via-white/80 to-transparent" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* Testimonials grid with scroll */}
        <div
          className="scrollbar-hide h-full overflow-y-auto px-6 py-8 md:px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflow: "clip",
          }}
        >
          <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, colIndex) => {
              const columnTestimonials = testimonials.slice(
                colIndex * 5,
                (colIndex + 1) * 5,
              );
              const isUpDirection = colIndex % 2 === 1;
              const animationClass = isUpDirection
                ? "testimonials-scroll-up"
                : "testimonials-scroll-down";

              return (
                <div
                  className="relative h-[600px] overflow-hidden"
                  key={colIndex}
                >
                  <div className={`flex flex-col gap-6 ${animationClass}`}>
                    {/* Triple testimonials for seamless looping */}
                    {[
                      ...columnTestimonials,
                      ...columnTestimonials,
                      ...columnTestimonials,
                    ].map((testimonial, index) => (
                      <div
                        className="h-[170px] w-full max-w-none flex-shrink-0 rounded-xl border border-black/[0.05] border-solid bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md md:max-w-none"
                        key={`${colIndex}-${index}`}
                      >
                        {/* Quote */}
                        <p
                          className="mb-4 line-clamp-4 font-normal text-[#131313] text-[15px] leading-[20px] tracking-[-0.1px]"
                          suppressHydrationWarning
                        >
                          "{testimonial.quote}"
                        </p>

                        {/* User info */}
                        <div className="mt-auto flex items-center gap-3">
                          {/* Avatar */}
                          {testimonial.imageURL ? (
                            <OptimizedImage
                              alt={testimonial.name}
                              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                              height={40}
                              sizes="40px"
                              src={`/assets/profiles/${testimonial.imageURL}`}
                              width={40}
                            />
                          ) : (
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                              <span className="font-medium text-[14px] text-white leading-[normal] tracking-[0]">
                                {testimonial.image}
                              </span>
                            </div>
                          )}

                          {/* Name and school */}
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-0.5 truncate font-medium text-[14px] text-foreground leading-[normal] tracking-[0]">
                              {testimonial.name}
                            </h4>
                            <p className="truncate font-normal text-[12px] text-foreground leading-[normal] tracking-[-0.1px]">
                              {testimonial.school}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Individual column fade effects */}
                  <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-16 bg-gradient-to-b from-white via-white/90 to-transparent" />
                  <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white via-white/90 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
