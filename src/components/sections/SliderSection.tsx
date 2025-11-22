/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import Lottie from "lottie-react";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function SliderSection() {
  const slides = [
    {
      id: "lucas-chatbot",
      label: "Lucas Chatbot",
      icon: "/assets/memory---save.svg",
      title: "A college admission officer - in your pocket",
      description:
        "Let Lucas guide you through building the perfect activity list, essay ideation, interview prep and more!",
      image: "/assets/illustration.svg",
    },
    {
      id: "essay-assist",
      label: "Essay Assist",
      icon: "/assets/memory---save.svg",
      title: "Craft the perfect essay",
      description:
        "Lucas ideates essay themes based on your profile and helps you add Netflix-style storytelling throughout your writing.",
      image: "/assets/illustration.svg",
    },
    {
      id: "profile-builder",
      label: "Profile Builder",
      icon: "/assets/memory---save.svg",
      title: "Create killer extracurriculars",
      description:
        "Lucas can develop a scattered extracurricular profile into a one with passion, mission and intent.",
      image: "/assets/illustration.svg",
    },
    {
      id: "interview-prep",
      label: "Interview Prep Agent",
      icon: "/assets/memory---save.svg",
      title: "Master your college interviews",
      description:
        "Practice with AI-powered mock interviews and get personalized feedback to ace your college admission interviews.",
      image: "/assets/illustration.svg",
    },
    {
      id: "college-choice",
      label: "College Choice",
      icon: "/assets/memory---save.svg",
      title: "Find your perfect college match",
      description:
        "Get data-driven recommendations for colleges that align with your profile, preferences, and career goals.",
      image: "/assets/illustration.svg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Animation states
  // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
  const [animationData, setAnimationData] = useState<any>(null);
  const [animationCache, setAnimationCache] = useState<{
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    messages: any;
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    essay: any;
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    profile: any;
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    prep2: any;
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    data2: any;
  } | null>(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: lottie-react doesn't export proper types for ref
  const lottieRef = useRef<any>(null);
  const animationContainerRef = useRef(null);

  // Use IntersectionObserver to detect when animation comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimationVisible(true);
          // Play animation from start when coming into view
          if (lottieRef.current) {
            lottieRef.current.goToAndPlay(0, true);
          }
        } else {
          setIsAnimationVisible(false);
          // Stop animation when going out of view
          if (lottieRef.current) {
            lottieRef.current.stop();
          }
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the animation container is visible
        rootMargin: "0px 0px -50px 0px", // Slight offset for better timing
      }
    );

    if (animationContainerRef.current) {
      observer.observe(animationContainerRef.current);
    }

    return () => {
      if (animationContainerRef.current) {
        observer.unobserve(animationContainerRef.current);
      }
    };
  }, []);

  // Preload all animations at component mount
  useEffect(() => {
    Promise.all([
      fetch("/assets/messages.json").then((r) => r.json()),
      fetch("/assets/Essay.json").then((r) => r.json()),
      fetch("/assets/Profile2.json").then((r) => r.json()),
      fetch("/assets/Prep2.json").then((r) => r.json()),
      fetch("/assets/Data2.json").then((r) => r.json()),
    ])
      .then(([messages, essay, profile, prep2, data2]) => {
        setAnimationCache({ messages, essay, profile, prep2, data2 });
        // Set initial animation for first tab
        setAnimationData(messages);
      })
      .catch((error) => console.error("Error loading animations:", error));
  }, []);

  // Switch animation instantly when tab changes
  useEffect(() => {
    if (!animationCache) return;

    // Stop and destroy previous instance immediately to prevent stray frames
    if (lottieRef.current) {
      lottieRef.current.stop?.();
      lottieRef.current.destroy?.();
    }

    // Set new animation data from cache based on active tab
    // biome-ignore lint/suspicious/noExplicitAny: Lottie animation JSON data doesn't have strict types
    let data: any;
    if (activeIndex === 1) {
      data = animationCache.essay;
    } else if (activeIndex === 2) {
      data = animationCache.profile;
    } else if (activeIndex === 3) {
      data = animationCache.prep2;
    } else if (activeIndex === 4) {
      data = animationCache.data2;
    } else {
      data = animationCache.messages;
    }
    setAnimationData(data);
  }, [activeIndex, animationCache]);

  // Restart animation when active index changes and section is visible
  useEffect(() => {
    if (isAnimationVisible && lottieRef.current && animationData) {
      // Small delay to ensure new animation data is loaded
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.goToAndPlay(0, true);
        }
      }, 50);
    }
  }, [activeIndex, animationData, isAnimationVisible]);

  // Handle animation completion - loop if section is still visible
  const handleAnimationComplete = () => {
    if (isAnimationVisible && lottieRef.current) {
      // Restart animation from beginning if section is still in view
      lottieRef.current.goToAndPlay(0, true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <needed for rerendering>
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Check if we're in the sticky section area
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        // Calculate how much we've scrolled into this section
        const scrolledIntoSection = Math.abs(rect.top);
        const totalScrollableDistance = sectionHeight - windowHeight;

        // Calculate overall progress (0 to 1)
        const overallProgress = Math.min(
          scrolledIntoSection / totalScrollableDistance,
          1
        );

        // Calculate which slide should be active
        const slideIndex = Math.min(
          Math.floor(overallProgress * slides.length),
          slides.length - 1
        );

        // Calculate progress within the current slide
        const slideProgress = overallProgress * slides.length - slideIndex;

        setActiveIndex(slideIndex);
        setProgress(slideProgress);
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [slides.length]);

  // Auto-scroll tabs to active pair on mobile
  useEffect(() => {
    if (window.innerWidth >= 768 || !tabsRef.current) return;

    const pairIndex = Math.floor(activeIndex / 2);
    const child = tabsRef.current.children[pairIndex * 2] as
      | HTMLElement
      | undefined;

    if (child) {
      tabsRef.current.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const currentSlide = slides[activeIndex];

  return (
    <section
      className="relative w-full"
      ref={sectionRef}
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 z-10 flex h-screen items-center justify-center">
        <div className="relative w-full">
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
            <h1 className="mb-6 flex h-12 items-center justify-center text-center font-normal text-[40px] text-foreground leading-[44px] tracking-[0] md:mb-0 md:justify-start md:text-left md:text-[26px] md:leading-[31.2px]">
              One step closer to your dream college
            </h1>
          </div>

          <div className="-mt-[14px] mx-auto w-full max-w-7xl px-4 md:mt-0 lg:px-8">
            <div className="flex flex-col items-start gap-3 pt-2 pb-12 lg:flex-row lg:gap-8 lg:py-16 lg:pt-8 lg:pb-24">
              <div className="flex-1">
                {/* Show animation with bounding box for all tabs */}
                <div className="relative h-[244px] w-full max-w-[700px] transition-opacity duration-300 md:h-auto">
                  {/* Green bounding box frame */}
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                    src="/assets/features-bounding-box2.svg"
                  />

                  {/* Animation container positioned inside the frame */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    ref={animationContainerRef}
                    style={{
                      // Center the animation within the phone screen area
                      top: "8%",
                      left: "8%",
                      right: "8%",
                      bottom: "8%",
                    }}
                  >
                    {animationData && isAnimationVisible ? (
                      <Lottie
                        animationData={animationData}
                        autoplay={true}
                        className="h-full w-full object-contain"
                        data-testid="lottie-messages-animation"
                        loop={false}
                        lottieRef={lottieRef}
                        onComplete={handleAnimationComplete}
                        style={{
                          transform:
                            activeIndex === 2
                              ? "scale(1.1)"
                              : activeIndex === 3
                              ? "scale(1.2)"
                              : "scale(1)",
                          transition: "transform 300ms ease-out",
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                        <span className="text-gray-500 text-sm">
                          Loading...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-[566px] flex-1 space-y-3 md:space-y-6">
                <div className="space-y-3 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    <img
                      alt="Feature icon"
                      className="h-12 w-12 opacity-0 transition-all duration-300 ease-out"
                      key={`icon-${activeIndex}`}
                      src={currentSlide.icon}
                      style={{
                        animation: "fadeInUp 600ms ease-out 150ms forwards",
                      }}
                    />

                    <h2
                      className="text-left font-normal text-[26px] text-foreground leading-[31.2px] tracking-[0] opacity-0 transition-all duration-300 ease-out md:text-left md:text-[26px] md:leading-[31.2px]"
                      key={`title-${activeIndex}`}
                      style={{
                        animation: "fadeInUp 600ms ease-out 250ms forwards",
                      }}
                    >
                      {currentSlide.title}
                    </h2>
                  </div>

                  <p
                    className="font-normal text-[17.7px] text-muted-foreground leading-[25.2px] tracking-[-0.11px] opacity-0 transition-all duration-300 ease-out"
                    key={`desc-${activeIndex}`}
                    style={{
                      animation: "fadeInUp 600ms ease-out 350ms forwards",
                    }}
                  >
                    {currentSlide.description}
                  </p>
                </div>

                <Button
                  asChild
                  className="group h-auto p-0 text-foreground hover:bg-transparent"
                  variant="ghost"
                >
                  <a
                    href="https://app.meetlucas.ai/sign-up"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="font-normal text-[17.7px] leading-[21.6px] tracking-[0]">
                      Learn more on the platform
                    </span>
                    <ArrowRightIcon className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="w-full">
              <div
                className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2 md:flex md:flex-nowrap md:gap-8 md:overflow-visible"
                ref={tabsRef}
              >
                {slides.map((slide, index) => (
                  <div
                    className="relative shrink-0 basis-1/2 snap-start px-2 md:min-w-0 md:flex-1 md:px-0"
                    key={slide.id}
                  >
                    <div
                      aria-label={`View ${slide.label}`}
                      className={`cursor-pointer px-3 py-3 transition-opacity duration-300 hover:opacity-80 md:px-0 md:py-3 ${
                        index === activeIndex ? "opacity-100" : "opacity-40"
                      }`}
                      data-testid={`button-tab-${slide.id}`}
                      onClick={() => {
                        if (!sectionRef.current) return;

                        // Calculate the scroll position that corresponds to this slide
                        const section = sectionRef.current;
                        const sectionTop = section.offsetTop;
                        const windowHeight = window.innerHeight;
                        const totalScrollableDistance =
                          section.offsetHeight - windowHeight;

                        // Calculate target scroll position for this slide (middle of slide)
                        const slideProgress = (index + 0.5) / slides.length; // Middle of the slide
                        const targetScrollTop =
                          sectionTop + slideProgress * totalScrollableDistance;

                        // Smooth scroll to the calculated position
                        window.scrollTo({
                          top: targetScrollTop,
                          behavior: "smooth",
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (!sectionRef.current) return;

                          const section = sectionRef.current;
                          const sectionTop = section.offsetTop;
                          const windowHeight = window.innerHeight;
                          const totalScrollableDistance =
                            section.offsetHeight - windowHeight;

                          const slideProgress = (index + 0.5) / slides.length;
                          const targetScrollTop =
                            sectionTop +
                            slideProgress * totalScrollableDistance;

                          window.scrollTo({
                            top: targetScrollTop,
                            behavior: "smooth",
                          });
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div
                        className="whitespace-normal break-words text-center font-normal text-foreground text-sm leading-5 md:whitespace-nowrap md:text-left md:text-base md:leading-[19.2px] md:tracking-[-0.10px]"
                        style={{ fontWeight: "400" }}
                      >
                        {slide.label}
                      </div>
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-border/10">
                      <div
                        className="h-full bg-foreground"
                        style={{
                          width:
                            index === activeIndex
                              ? `${Math.max(progress * 100, 5)}%`
                              : index < activeIndex
                              ? "100%"
                              : "0%",
                          transition: "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
