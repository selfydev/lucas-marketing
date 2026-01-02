"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Mix of American high schools, colleges, and universities
const schools = [
  { name: "School 1", file: "Frame.svg" },
  { name: "Boston College", file: "Frame 10.svg" },
  { name: "Harper College", file: "Frame 11.svg" },
  { name: "School 4", file: "Frame 12.png" },
  { name: "School 5", file: "Frame 13.png" },
  { name: "School 6", file: "Frame 15.png" },
  { name: "School 7", file: "Frame14.svg" },
  { name: "NYU", file: "svg2.svg" },
];

const Hero = () => {
  return (
    <section
      className="relative h-screen"
      aria-label="Hero section"
    >
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Grid Overlay - 39px squares with white stroke, fading towards top */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '39px 39px',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
        aria-hidden="true"
      />


      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Announcement Badge */}
        <div 
          className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Indicator dot */}
          <span 
            className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
            style={{ backgroundColor: '#FFFFFF' }}
          />
          
          {/* Text */}
          <span className="text-xs sm:text-sm font-medium text-white">
            Lucas is a study companion in iMessage
          </span>
          
          {/* Arrow */}
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>

        {/* Main Heading */}
        <h1 
          className="text-center text-[82px] sm:text-[90px] md:text-[100px] lg:text-[130px]"
          style={{
            fontFamily: "'HW Cigar', serif",
            lineHeight: '1',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(to bottom, #F0F9FF, #BCDCFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
          }}
        >
          School on Autopilot
        </h1>

        {/* Subtext */}
        <p 
          className="mt-6 sm:mt-8 max-w-4xl text-center font-normal text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] px-4 sm:px-0"
          style={{ lineHeight: '1.6', letterSpacing: '-0.006em' }}
        >
          Lucas automates your school tasks, helps you stay on top of deadlines, improve grades,
          <span className="hidden sm:inline"><br /></span>
          <span className="inline sm:hidden"> </span>
          prepare for tests and get into college.
        </p>

        {/* CTA Button */}
        <a
          href="#message-lucas"
          className="group mt-6 sm:mt-8 flex h-[44px] sm:h-[48px] items-center justify-center gap-4 sm:gap-6 rounded-[8px] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[20px] font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#34C759]/30"
          style={{ 
            background: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
            boxShadow: '0 4px 14px rgba(52, 199, 89, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}
          tabIndex={0}
        >
          Message Lucas
          <svg 
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" 
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5L3 21l1.67-4.17C3.62 15.42 2 13.34 2 11c0-4.42 4.5-8 10-8z" />
          </svg>
        </a>

      </div>

      {/* Bottom Gradient Overlay - above background, below content */}
      <div 
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[300px]"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(199, 235, 254, 0) 0%, 
            rgba(199, 235, 254, 0.02) 20%, 
            rgba(199, 235, 254, 0.08) 40%, 
            rgba(199, 235, 254, 0.2) 55%, 
            rgba(199, 235, 254, 0.4) 70%, 
            rgba(199, 235, 254, 0.65) 82%, 
            rgba(199, 235, 254, 0.85) 91%, 
            rgba(199, 235, 254, 1) 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Cloud Left */}
      <div 
        className="pointer-events-none absolute -bottom-[40px] sm:-bottom-[60px] md:-bottom-[80px] -left-[20px] sm:left-0 md:left-0 z-30 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[509px]"
        aria-hidden="true"
      >
        <Image
          src="/images/cloud-left.svg"
          alt=""
          width={509}
          height={300}
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Cloud Right */}
      <div 
        className="pointer-events-none absolute -bottom-[40px] sm:-bottom-[60px] md:-bottom-[80px] -right-[20px] sm:right-0 md:right-0 z-30 w-[260px] sm:w-[330px] md:w-[380px] lg:w-[482px]"
        aria-hidden="true"
      >
        <Image
          src="/images/cloud-right.svg"
          alt=""
          width={482}
          height={300}
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Logo Marquee */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl overflow-hidden z-20"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <div className="inline-flex w-max flex-nowrap">
          <div 
            className="flex items-center gap-16 pr-16"
            style={{
              animation: 'marquee 30s linear infinite',
            }}
          >
            {schools.map((school) => (
              <img
                key={school.file}
                src={`/images/logos/${school.file}`}
                alt={school.name}
                className="h-[15px] w-auto opacity-70"
              />
            ))}
          </div>
          <div 
            className="flex items-center gap-16 pr-16"
            style={{
              animation: 'marquee 30s linear infinite',
            }}
          >
            {schools.map((school) => (
              <img
                key={`${school.file}-dup`}
                src={`/images/logos/${school.file}`}
                alt={school.name}
                className="h-[15px] w-auto opacity-70"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
