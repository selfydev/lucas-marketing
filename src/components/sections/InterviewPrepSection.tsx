import { Button } from "@/components/ui/button";

export function InterviewPrepSection() {
  return (
    <section className="relative mx-auto mb-16 w-full max-w-[1320px] px-4 md:px-[60px]">
      <div
        className="relative flex h-auto w-full flex-col items-center justify-center gap-8 rounded-md border border-black/[0.05] border-solid bg-card-light p-[31px] md:flex-row md:items-center md:justify-between md:p-[43px]"
        style={{ paddingBottom: "0px" }}
      >
        <div className="max-w-[600px] flex-1">
          <h2 className="mb-6 w-full font-normal text-[26px] text-black leading-[31.2px] tracking-[0] md:w-[428px]">
            Interviews. Become the perfect-fit applicant.
          </h2>
          <p className="mb-8 font-normal text-[17.7px] text-black leading-[25.2px] tracking-[-0.11px] opacity-40">
            Prepare for your interview by practicing similar questions with
            Lucas. <br />
            Understand how you will be assessed, practice answers and get live
            feedback
          </p>
          <Button className="inline-flex h-auto items-center justify-center gap-2.5 rounded-[5px] border border-solid bg-primary px-[19px] py-1.5 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]">
            <span className="whitespace-nowrap text-center font-medium text-base text-white leading-[normal] tracking-[0]">
              Ready to practice?
            </span>
          </Button>
        </div>

        {/* Mobile phone interface */}
        <div className="mx-auto mt-8 block w-full max-w-[400px] md:hidden">
          <div className="relative w-full">
            <img
              alt="Phone showing interview interface"
              className="mx-auto h-auto w-full max-w-[300px] object-contain"
              data-testid="img-phone-section-mobile"
              src="/assets/phone-img-section.png"
            />

            {/* Mobile input field overlays */}
            <div
              className="-translate-x-1/2 absolute top-[15%] left-1/2 flex h-[40px] w-[85%] items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
              style={{
                marginTop: 45,
                maxWidth: "none",
                width: "115%",
                color: "rgb(147 170 134 / var(--tw-text-opacity, 1))",
              }}
            >
              <span className="font-medium text-[16px] text-muted-green leading-[normal] tracking-[0]">
                Hi Ryan, shall we get started?
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>

            {/* Response - middle */}
            <div
              className="-translate-x-1/2 absolute top-[35%] left-1/2 flex h-[60px] w-[85%] items-center rounded-2xl border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_100%)] px-[12px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
              style={{
                marginTop: 45,
                maxWidth: "none",
                width: "115%",
              }}
            >
              <span
                className="line-clamp-3 font-medium text-black/40 text-xs leading-[normal] tracking-[0]"
                style={{
                  fontSize: "16px",
                }}
              >
                I'm passionate about how tech unlocks impactful change at scale.
                I've done a ...
              </span>
            </div>

            {/* Feedback - bottom */}
            <div
              className="-translate-x-1/2 absolute top-[60%] left-1/2 flex h-[60px] w-[85%] items-center justify-between rounded-lg border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_100%)] p-4 backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
              style={{
                marginTop: 48,
                maxWidth: "none",
                width: "115%",
                color: "rgb(147 170 134 / var(--tw-text-opacity, 1))",
                height: "24%",
              }}
            >
              <span
                className="line-clamp-3 font-medium text-black/40 text-xs leading-[normal] tracking-[0]"
                style={{
                  color: "rgb(147 170 134 / var(--tw-text-opacity, 1))",
                  fontSize: "16px",
                }}
              >
                This is solid, however MIT's core focus is on "learning by
                doing". You're a founder at ABC robotics - talk about that
                instead.
              </span>
              <img
                alt="Logo button"
                className="ml-3 h-8 w-8"
                src="/assets/logo-button.svg"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto hidden h-[473px] w-full max-w-[564px] md:mx-0 md:block">
          {/* Empty space to preserve original layout proportions */}
        </div>

        <img
          alt="Phone showing interview interface"
          className="absolute right-32 bottom-0 hidden h-[420px] w-auto object-contain md:block"
          data-testid="img-phone-section"
          src="/assets/phone-img-section.png"
        />

        {/* Input field overlays - Desktop */}
        {/* Add text - top */}

        <div className="absolute right-[90px] bottom-[260px] hidden h-[50px] w-[320px] items-center rounded-2xl border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_100%)] px-[16px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)] md:flex">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "auto",
            }}
          >
            <span
              className="font-medium text-black/40 text-sm leading-[normal] tracking-[0]"
              style={{
                color: "rgb(147 170 134 / var(--tw-text-opacity, 1))",
              }}
            >
              Why are you choosing MIT?
            </span>
            <img
              alt="Logo button"
              className="ml-auto h-6 w-6"
              src="/assets/logo-button.svg"
            />
          </div>
        </div>

        {/* Add Text 2 - middle */}

        <div className="absolute right-[90px] bottom-[140px] hidden h-[80px] w-[320px] items-center rounded-2xl border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_100%)] px-[16px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)] md:flex">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "auto",
            }}
          >
            <span className="font-medium text-black/40 text-sm leading-[normal] tracking-[0]">
              I'm passionate about how tech unlocks impactful change at scale.
              I've done a ...
            </span>
          </div>
        </div>

        {/* Add Text 3 - bottom */}

        <div className="absolute right-[90px] bottom-[20px] hidden h-[80px] w-[320px] items-center rounded-2xl border border-white/30 border-solid bg-[linear-gradient(179deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_100%)] px-[16px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)] md:flex">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "auto",
              alignItems: "center",
              height: "24%",
            }}
          >
            <span
              className="font-medium text-black/40 text-sm leading-[normal] tracking-[0]"
              style={{
                color: "rgb(147 170 134 / var(--tw-text-opacity, 1))",
              }}
            >
              This is solid, however MIT's core focus is on "learning by doing".
              You're a founder at ABC robotics - talk about that instead.
            </span>
            <img
              alt="Logo button"
              className="ml-auto h-6 w-6"
              src="/assets/logo-button.svg"
              style={{ marginLeft: "8px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
