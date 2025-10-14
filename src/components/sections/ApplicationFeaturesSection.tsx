import { useRef } from "react";

export function ApplicationFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      className="relative mx-auto mt-16 mb-4 w-full max-w-[1320px] px-4 md:px-[60px]"
      ref={sectionRef}
    >
      <div className="flex h-auto w-full flex-col gap-4 md:flex-row">
        {/* Left section - Engineer your application */}
        <div
          className="relative flex min-h-[700px] flex-1 flex-col justify-start rounded-md border border-black/[0.05] border-solid p-[31px] md:min-h-[600px]"
          style={{
            backgroundImage: "url(/assets/engineer-box-bg.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h3 className="mb-6 font-normal text-[26px] text-black leading-[31.2px] tracking-[0]">
            Craft the perfect-admit application.
          </h3>
          <p className="mb-8 font-normal text-[17.7px] text-black leading-[25.2px] tracking-[-0.11px] opacity-40">
            It knows how to get you into the college of your dreams.
          </p>

          {/* Glassy text boxes */}
          <div className="absolute right-[31px] bottom-0 left-[31px] space-y-3 pb-3">
            {/* Background image for last 3 message boxes */}
            <div
              className="-left-3 -right-3 absolute top-[84px] z-0 h-[calc(100%-84px+12px)] rounded-t-2xl"
              style={{
                backgroundImage: "url(/assets/message-bounding.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* First suggestion with icon */}
            <div className="-translate-y-8 md:-translate-y-4 relative z-10 flex w-full items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
              <span className="font-medium text-[16px] text-muted-green leading-[normal] tracking-[0]">
                Ryan, your profile lacks leadership activities. Here are some
                options
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>

            {/* Second suggestion */}
            <div className="relative z-10 w-full rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
              <span className="font-normal text-[13px] text-muted-green leading-[normal] tracking-[0]">
                I can help you create an app for connecting students with
                internship opportunities?
              </span>
            </div>

            {/* Third suggestion */}
            <div className="relative z-10 w-full rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
              <span className="font-normal text-[13px] text-muted-green leading-[normal] tracking-[0]">
                I can help you start a podcast based on your interest in
                cybersecurity?
              </span>
            </div>

            {/* Fourth suggestion */}
            <div className="relative z-10 w-full rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
              <span className="font-normal text-[13px] text-muted-green leading-[normal] tracking-[0]">
                I can help you write and publish a research article on global
                warming with a PhD at Cambridge?
              </span>
            </div>
          </div>
        </div>

        {/* Right sections container */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Top right section - Craft the Obvious-Admit Profile */}
          <div className="h-auto w-full rounded-md border border-black/[0.05] border-solid bg-card-light p-[31px]">
            <h3 className="mb-4 font-normal text-[26px] text-black leading-[31.2px] tracking-[0]">
              Level-up your extracurriculars
            </h3>
            <p className="mb-6 font-normal text-[17.7px] text-black leading-[25.2px] tracking-[-0.11px] opacity-40">
              Turn cliche activities into powerful and impactful projects
              colleges fight to admit
            </p>

            <div
              className="-translate-y-8 md:-translate-y-4 relative z-10 flex w-full items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
              style={{ marginTop: "50px", marginLeft: "-20px" }}
            >
              <span className="font-medium text-[16px] text-muted-green leading-[normal] tracking-[0]">
                Ryan, want to check out what other Harvard admits with a similar
                profile to yours did for their extracurriculars?
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>

            {/* Yes response */}
            <div
              className="-mt-[10px] flex justify-end md:mt-[10px]"
              style={{ marginTop: "10px" }}
            >
              <div className="relative flex h-[40px] items-center rounded-l-2xl border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_100%)] px-[21px] pr-[31px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
                <div className="text-right font-medium text-base text-black/40 leading-[normal] tracking-[0]">
                  Yes
                </div>
              </div>
            </div>

            <div
              className="-translate-y-8 md:-translate-y-4 relative z-10 flex w-full items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
              style={{ marginTop: "50px", marginLeft: "-20px" }}
            >
              <span className="font-medium text-[16px] text-muted-green leading-[normal] tracking-[0]">
                John. 3.8 GPA, 1520 SAT with interest in Cybersecurity.
                <div className="mt-1 flex items-center">
                  <span>
                    Interviewed leading cybersecurity specialists in Europe
                  </span>
                </div>
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>
          </div>

          {/* Bottom right section - Your essays */}
          <div className="h-auto w-full rounded-md border border-black/[0.05] border-solid bg-card-light p-[31px]">
            <h3 className="mb-4 font-normal text-[26px] text-black leading-[31.2px] tracking-[0]">
              Turn your bland essays into Netflix-style stories.
            </h3>
            <p className="mb-6 font-normal text-[17.7px] text-black leading-[25.2px] tracking-[-0.11px] opacity-40">
              Find your unique story, craft essays with irresistible hooks, and
              breeze through supplements, leaving admissions officers wanting
              more.
            </p>

            {/* Chat input field */}
            <div className="flex w-full items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
              <span className="font-medium text-[16px] text-muted-green leading-[normal] tracking-[0]">
                Hi Ryan, shall we get started?
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
