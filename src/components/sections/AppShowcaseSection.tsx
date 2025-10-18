import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function AppShowcaseSection() {
  return (
    <section className="relative h-[1051px] w-full overflow-hidden bg-showcase-dark">
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

        <div className="-translate-x-1/2 absolute top-[68px] left-1/2 transform">
          <div className="whitespace-nowrap text-center font-normal text-showcase-highlight text-xs leading-normal tracking-[0]">
            Ditch the spreadsheets
          </div>
        </div>

        <div className="-translate-x-1/2 absolute top-[86px] left-1/2 transform">
          <h1 className="px-1 text-center font-normal text-[40px] text-white leading-[48px] tracking-[0] md:whitespace-nowrap md:px-0">
            <span className="box-border block w-screen px-4 md:hidden">
              <span className="block">College&nbsp;admissions</span>
              <span className="block">in one tab</span>
            </span>
            <span className="hidden md:inline">
              College admissions in one tab
            </span>
          </h1>
        </div>

        <div className="-translate-x-1/2 absolute top-[200px] left-1/2 w-screen transform px-4 text-center font-normal text-[17.7px] text-white leading-normal tracking-[-0.11px] md:top-[150px] md:w-[656px] md:px-0">
          Select colleges, write essays, develop extracurriculars, store docs,
          practise interviews, learn from former admission experts and connect
          with tutors.
          <br />
          <br />
          All in one tab.
        </div>

        {/* Before/After Slider */}
        <div className="-translate-x-1/2 -mt-6 absolute top-[400px] left-1/2 transform md:top-[320px]">
          <BeforeAfterSlider
            afterImage="/assets/excel.png"
            beforeImage="/assets/Dashboard2.png"
            className="shadow-2xl"
          />
        </div>

        {/* Crumpled paper - top left */}
        <img
          alt="Crumpled paper ball"
          className="absolute top-[700px] right-0 h-[376px] w-60 scale-x-[-1] object-cover md:top-0 md:left-0 md:scale-x-100"
          data-testid="img-crumpled-paper"
          height="376"
          loading="lazy"
          src="/assets/crumpled-paper.png"
          width="240"
        />

        {/* Rubber bands - middle left */}
        <img
          alt="Rubber bands"
          className="absolute top-[331px] left-0 hidden h-[253px] w-60 object-cover md:block"
          data-testid="img-rubber-bands"
          height="253"
          loading="lazy"
          src="/assets/rubber-bands.png"
          width="240"
        />

        {/* Calculator - bottom left */}
        <img
          alt="Calculator"
          className="absolute top-[601px] left-0 h-[450px] w-[207px] object-cover"
          data-testid="img-calculator"
          height="450"
          loading="lazy"
          src="/assets/calculator.png"
          width="207"
        />

        {/* iOS Message - top right */}
        <img
          alt="iOS Message notification"
          className="absolute top-[690px] right-0 h-auto w-[320px] object-contain md:top-[200px]"
          data-testid="img-ios-message"
          height="100"
          loading="lazy"
          src="/assets/ios-message2.svg"
          width="320"
        />

        {/* Phone clip - bottom right */}
        <img
          alt="Phone clip"
          className="absolute right-0 bottom-40 hidden h-[500px] w-auto object-contain md:block"
          data-testid="img-phone-clip"
          height="500"
          loading="lazy"
          src="/assets/phone-clip.png"
          width="300"
        />
      </div>
    </section>
  );
}
