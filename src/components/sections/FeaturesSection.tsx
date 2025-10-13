import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

export function FeaturesSection() {
  const [animationData, setAnimationData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  // biome-ignore lint/suspicious/noExplicitAny: lottie-react doesn't export proper types for ref
  const lottieRef = useRef<any>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/assets/app-ani2.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Play animation from start when coming into view
          if (lottieRef.current) {
            lottieRef.current.goToAndPlay(0, true);
          }
        } else {
          setIsVisible(false);
          // Reset to start when going out of view
          if (lottieRef.current) {
            lottieRef.current.goToAndStop(0, true);
          }
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Slight offset for better timing
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle animation completion - loop if section is still visible
  const handleAnimationComplete = () => {
    if (isVisible && lottieRef.current) {
      // Restart animation from beginning if section is still in view
      lottieRef.current.goToAndPlay(0, true);
    }
  };

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-4 md:px-6 lg:px-4"
      ref={sectionRef}
    >
      {/* Tile Grid Background - Centered on mobile, Left Side on desktop */}
      <div className="-z-10 md:-translate-x-0 pointer-events-none absolute top-[140px] left-[5%] h-[calc(100%+200px)] w-[2400px] md:top-[-100px] md:left-[100px] md:z-0 md:w-[1200px] lg:left-[100px] lg:w-[1200px]">
        <svg
          aria-hidden="true"
          className="h-auto w-[600px] md:w-[1200px] lg:w-[900px]"
          height="939"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 900 939"
          width="900"
        >
          {/* Vertical Lines */}
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="59.5"
            x2="59.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="151.5"
            x2="151.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="243.5"
            x2="243.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="335.5"
            x2="335.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="427.5"
            x2="427.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="519.5"
            x2="519.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="611.5"
            x2="611.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="703.5"
            x2="703.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="795.5"
            x2="795.5"
            y1="0"
            y2="939"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="887.5"
            x2="887.5"
            y1="0"
            y2="939"
          />

          {/* Horizontal Lines */}
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="55.5"
            y2="55.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="147.5"
            y2="147.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="239.5"
            y2="239.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="331.5"
            y2="331.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="423.5"
            y2="423.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="515.5"
            y2="515.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="607.5"
            y2="607.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="699.5"
            y2="699.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="791.5"
            y2="791.5"
          />
          <line
            stroke="#3F8F24"
            strokeOpacity="0.35"
            x1="0"
            x2="900"
            y1="883.5"
            y2="883.5"
          />

          {/* Filled Rectangles */}
          <rect
            fill="#3F8F24"
            fillOpacity="0.2"
            height="93"
            width="93"
            x="611"
            y="423"
          />
          <rect
            fill="#3F8F24"
            fillOpacity="0.2"
            height="93"
            width="92"
            x="243"
            y="239"
          />
          <rect
            fill="#3F8F24"
            fillOpacity="0.2"
            height="93"
            width="93"
            x="151"
            y="607"
          />
          <rect
            fill="#3F8F24"
            fillOpacity="0.2"
            height="93"
            width="93"
            x="795"
            y="331"
          />

          {/* Radial Gradient Overlay */}
          <rect
            className="fill-opacity-70 md:fill-opacity-95"
            fill="url(#paint0_radial_features)"
            height="939"
            width="900"
          />

          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(300 441.5) rotate(90) scale(307 350)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_features"
              r="1"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      {/* Content Container - Vertical on mobile, horizontal side-by-side on desktop */}
      <div
        className={`relative z-10 flex w-full flex-col items-center justify-center pb-20 md:flex-row md:items-center md:justify-center md:pb-0 ${isMobile ? "" : "-left-[140px]"}`}
      >
        {/* Text Content - First on mobile, exact desktop positioning restored */}
        <div className="mb-8 max-w-[550px] text-center md:order-2 md:mb-0 md:ml-16 md:max-w-[550px] md:text-left">
          <h2 className="mb-4 text-[40px] text-foreground leading-[48px] tracking-[0] md:mb-4 md:text-[40px] md:leading-[48px] lg:mb-4 lg:text-[40px] lg:leading-[48px]">
            Supercharge your college application
          </h2>

          <p className="text-[26px] text-muted-foreground leading-[31.2px] tracking-[0] md:text-[26px] md:leading-[31.2px] lg:text-[26px] lg:leading-[31.2px]">
            Boost your extracurriculars, essays and interview prep{" "}
            {isMobile ? <br /> : ""} to get accepted.
          </p>
        </div>

        {/* Phone Image - Second on mobile, exact desktop positioning restored */}
        <div className="relative z-20 flex justify-center pb-16 md:z-auto md:order-1 md:mr-8 md:flex-shrink-0 md:pb-0">
          {animationData ? (
            <Lottie
              animationData={animationData}
              autoplay={false}
              className="h-[60vh] w-[125%] object-contain drop-shadow-2xl md:h-[350px] lg:h-[500px]"
              data-testid="lottie-mobile-interface"
              loop={false}
              lottieRef={lottieRef}
              onComplete={handleAnimationComplete}
            />
          ) : (
            <div className="flex h-[60vh] w-auto items-center justify-center rounded-lg bg-gray-100 object-contain drop-shadow-2xl md:h-[350px] lg:h-[500px]">
              <span className="text-gray-500">Loading animation...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
