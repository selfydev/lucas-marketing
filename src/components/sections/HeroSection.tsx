import { TypewriterText } from "@/components/TypewriterText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 pt-20 pb-4 sm:h-screen">
      <div className="flex w-full flex-col items-center space-y-4">
        {/* Katman Logo */}
        <div className="relative">
          <img
            alt="Katman"
            className="mx-auto mb-1 h-[69px] w-[127px] sm:h-[43px] sm:w-[80px] md:h-[54px] md:w-[100px] lg:h-[69px] lg:w-[127px]"
            fetchPriority="high"
            height="69"
            src="/assets/katman-1.svg"
            width="127"
          />
        </div>

        {/* Badge */}
        <Badge
          className="flex h-[34px] items-center rounded-full border-primary/5 bg-primary/5 px-5 font-medium text-primary backdrop-blur-sm sm:h-[28px] md:h-[30px] lg:h-[34px]"
          variant="outline"
        >
          <div className="mr-2 h-[5px] w-[5px] rounded-full bg-primary" />
          <span
            className="font-medium text-lg tracking-[-0.36px] sm:text-sm md:text-base"
            style={{ fontSize: "0.8rem" }}
          >
            Your AI college admission consultant
          </span>
        </Badge>

        {/* Hero Headline */}
        <div className="space-y-4 text-center">
          <div className="relative">
            <h1 className="max-w-[824px] px-2 text-center font-medium text-[53px] text-foreground leading-[1.1] tracking-[-1.80px] sm:text-3xl sm:tracking-[-1.20px] md:text-5xl md:tracking-[-1.50px] lg:text-6xl lg:tracking-[-1.80px] xl:text-[90px]">
              {/* Mobile: 3 lines */}
              <span className="md:hidden">
                <span className="font-medium tracking-[-1.62px] sm:tracking-[-1.20px] md:tracking-[-1.40px] lg:tracking-[-1.62px]">
                  College prep
                </span>
                <br />
                <span className="font-medium tracking-[-1.62px] sm:tracking-[-1.20px] md:tracking-[-1.40px] lg:tracking-[-1.62px]">
                  so easy
                </span>
                <br />
                <span className="relative inline-block font-serif italic tracking-[-1.62px] sm:tracking-[-1.20px] md:tracking-[-1.40px] lg:tracking-[-1.62px]">
                  it feels like{" "}
                  <span className="relative inline-block">
                    <img
                      alt="Line"
                      className="absolute top-[0.4em] left-[-0.2em] h-[0.6em] animate-highlight opacity-80"
                      height="20"
                      loading="eager"
                      src="/assets/line-83.svg"
                      style={{
                        zIndex: 0,
                        maxWidth: "none",
                        width: "114%",
                        transformOrigin: "left center",
                        animation: "highlightDraw 1.5s ease-out 2s forwards",
                        transform: "scaleX(0)",
                      }}
                      width="100"
                    />
                    <span className="relative z-10">cheating</span>
                  </span>
                </span>
              </span>

              {/* Desktop: 2 lines */}
              <span className="hidden md:inline">
                <span className="font-medium tracking-[-1.62px] sm:tracking-[-1.20px] md:tracking-[-1.40px] lg:tracking-[-1.62px]">
                  College prep so easy
                </span>
                <br />
                <span className="relative inline-block font-serif italic tracking-[-1.62px] sm:tracking-[-1.20px] md:tracking-[-1.40px] lg:tracking-[-1.62px]">
                  it feels like{" "}
                  <span className="relative inline-block">
                    <img
                      alt="Line"
                      className="absolute top-[0.4em] left-[-0.2em] h-[0.6em] animate-highlight opacity-80"
                      height="20"
                      loading="eager"
                      src="/assets/line-83.svg"
                      style={{
                        zIndex: 0,
                        maxWidth: "none",
                        width: "114%",
                        transformOrigin: "left center",
                        animation: "highlightDraw 1.5s ease-out 2s forwards",
                        transform: "scaleX(0)",
                      }}
                      width="100"
                    />
                    <span className="relative z-10">cheating</span>
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </div>

        {/* Description */}
        <p
          className="max-w-[910px] px-4 text-center font-medium text-foreground text-lg leading-normal"
          style={{ fontSize: "1.05rem" }}
        >
          Increase your college admission odds by 2x.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Build your profile &amp; essays that colleges fight over to admit.
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="h-auto rounded-[5px] px-8 py-3 font-medium backdrop-blur-sm sm:px-9 sm:py-4 md:px-7 md:py-2 lg:px-8 lg:py-3"
        >
          <a href="https://app.meetlucas.ai/sign-up">
            <span className="text-base">Start for free</span>
          </a>
        </Button>

        {/* Social Proof */}
        <p className="text-center text-base text-black leading-[19.2px] tracking-[-0.10px] opacity-40 sm:text-xs md:text-sm lg:text-base">
          Used by 11,823 students
        </p>

        {/* AI Input Field */}
        <div className="ai-input-field w-full max-w-[660px] p-4 sm:p-2 md:p-3 lg:p-4">
          <div className="flex items-center justify-between sm:flex-col sm:space-x-0 sm:space-y-3 md:flex-row lg:flex-row">
            <div className="flex min-w-0 flex-1 items-center space-x-4">
              {/* Animated Gradient Circle Icon */}
              <div className="animated-gradient-circle relative flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full">
                <svg
                  aria-label="Lucas AI icon"
                  className="relative z-10 h-5 w-3.5"
                  fill="none"
                  height="21"
                  viewBox="0 0 14 21"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.59717 21C6.83587 21 5.40297 19.5535 5.40297 17.7755C5.40297 16.1414 6.61389 14.7649 8.21955 14.5734C8.58409 14.5299 8.88887 14.2733 8.99663 13.9192C9.10452 13.565 8.99514 13.18 8.7176 12.9374C8.34282 12.6097 8.04477 12.1941 7.85529 11.7353C7.7114 11.3866 7.37397 11.1597 6.99987 11.1597C6.62576 11.1597 6.28833 11.3867 6.14444 11.7354C5.64572 12.9436 4.48753 13.7244 3.19393 13.7244C1.43291 13.7244 0 12.2779 0 10.4999C0 8.86584 1.21092 7.4892 2.81659 7.29778C3.18112 7.25435 3.48591 6.99773 3.59366 6.64363C3.70155 6.28939 3.59204 5.90439 3.31463 5.66179C2.61187 5.04725 2.20877 4.15894 2.20877 3.22448C2.20877 1.44649 3.64167 0 5.40297 0C7.16426 0 8.59717 1.44649 8.59717 3.22448C8.59717 4.85843 7.38624 6.23507 5.78058 6.42649C5.41605 6.46992 5.11126 6.72654 5.00351 7.08064C4.89562 7.43488 5.00499 7.81988 5.28254 8.06248C5.65732 8.39017 5.95536 8.80581 6.14457 9.26446C6.28847 9.61312 6.62589 9.8402 7 9.8402C7.37411 9.8402 7.71153 9.61312 7.85543 9.2646C8.35428 8.05622 9.51234 7.27546 10.8059 7.27546C12.5671 7.27546 14 8.72194 14 10.4999C14 12.134 12.7891 13.5105 11.1835 13.7021C10.819 13.7455 10.5142 14.0021 10.4065 14.3562C10.2986 14.7105 10.408 15.0955 10.6855 15.3381C11.3883 15.9527 11.7914 16.8412 11.7914 17.7755C11.7914 19.5535 10.3585 21 8.59717 21Z"
                    fill="#245039"
                  />
                </svg>
              </div>

              {/* Typing Animation Text */}
              <div className="min-w-0 flex-1">
                <TypewriterText
                  className="text-base text-foreground sm:whitespace-nowrap sm:text-xs md:text-sm lg:text-base"
                  text="Can you help me create a college list based on my profile and GPA?"
                />
              </div>
            </div>

            {/* Microphone and Audio Controls */}
            <div className="flex items-center space-x-2 sm:justify-center sm:space-x-4 md:space-x-2 lg:space-x-2">
              {/* Microphone Icon */}
              <svg
                aria-label="Microphone"
                className="h-4 w-4"
                fill="none"
                height="15"
                viewBox="0 0 15 15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 11.7188C8.49456 11.7188 9.44839 11.3237 10.1517 10.6204C10.8549 9.91714 11.25 8.96331 11.25 7.96875V7.03125M7.5 11.7188C6.50544 11.7188 5.55161 11.3237 4.84835 10.6204C4.14509 9.91714 3.75 8.96331 3.75 7.96875V7.03125M7.5 11.7188V14.0625M5.15625 14.0625H9.84375M7.5 9.84375C7.00272 9.84375 6.52581 9.64621 6.17417 9.29458C5.82254 8.94294 5.625 8.46603 5.625 7.96875V2.8125C5.625 2.31522 5.82254 1.83831 6.17417 1.48667C6.52581 1.13504 7.00272 0.9375 7.5 0.9375C7.99728 0.9375 8.47419 1.13504 8.82583 1.48667C9.17746 1.83831 9.375 2.31522 9.375 2.8125V7.96875C9.375 8.46603 9.17746 8.94294 8.82583 9.29458C8.47419 9.64621 7.99728 9.84375 7.5 9.84375Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Audio Visualizer Icon */}
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100">
                <svg
                  aria-label="Audio visualizer"
                  className="h-4 w-3"
                  fill="none"
                  height="15"
                  viewBox="0 0 11 15"
                  width="11"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.79735 0.00366165C3.57607 0.0518951 3.37872 0.17816 3.2402 0.360109C3.10169 0.542059 3.03095 0.767963 3.0405 0.997841V13.8677C3.01803 14.0072 3.02565 14.15 3.06285 14.2861C3.10005 14.4223 3.16593 14.5486 3.25593 14.6563C3.34592 14.7641 3.45788 14.8506 3.58404 14.9099C3.7102 14.9693 3.84755 15 3.98656 15C4.12557 15 4.26291 14.9693 4.38907 14.9099C4.51524 14.8506 4.6272 14.7641 4.71719 14.6563C4.80719 14.5486 4.87307 14.4223 4.91027 14.2861C4.94747 14.15 4.95509 14.0072 4.93262 13.8677V0.997841C4.93582 0.860816 4.91056 0.724645 4.85849 0.598219C4.80642 0.471792 4.72871 0.357952 4.63043 0.264132C4.53215 0.170311 4.41552 0.0986198 4.28814 0.0537378C4.16076 0.00885571 4.0255 -0.00820776 3.8912 0.00366165C3.85993 0.00210392 3.82861 0.00210392 3.79735 0.00366165ZM0.769964 1.79569C0.548689 1.84392 0.351332 1.97018 0.212818 2.15213C0.0743038 2.33408 0.00356442 2.55999 0.013119 2.78986V12.0757C-0.00984183 12.2154 -0.00259937 12.3584 0.0343441 12.4949C0.0712875 12.6315 0.137044 12.7582 0.227039 12.8662C0.317033 12.9743 0.429104 13.0611 0.555455 13.1207C0.681806 13.1802 0.819403 13.2111 0.958672 13.2111C1.09794 13.2111 1.23554 13.1802 1.36189 13.1207C1.48824 13.0611 1.60031 12.9743 1.6903 12.8662C1.7803 12.7582 1.84605 12.6315 1.883 12.4949C1.91994 12.3584 1.92719 12.2154 1.90422 12.0757V2.78986C1.9074 2.65303 1.88219 2.51705 1.83024 2.39077C1.77829 2.2645 1.70076 2.15077 1.60271 2.05698C1.50466 1.96319 1.38827 1.89145 1.26114 1.84643C1.134 1.80141 0.998967 1.78412 0.864822 1.79569C0.832887 1.79406 0.8019 1.79406 0.769964 1.79569ZM6.82473 2.84765C6.60346 2.89589 6.4061 3.02215 6.26759 3.2041C6.12907 3.38605 6.05833 3.61196 6.06789 3.84183V11.0237C6.04541 11.1632 6.05304 11.306 6.09023 11.4421C6.12743 11.5783 6.19331 11.7046 6.28331 11.8124C6.37331 11.9201 6.48527 12.0066 6.61143 12.0659C6.73759 12.1253 6.87494 12.156 7.01394 12.156C7.15295 12.156 7.2903 12.1253 7.41646 12.0659C7.54262 12.0066 7.65458 11.9201 7.74458 11.8124C7.83457 11.7046 7.90045 11.5783 7.93765 11.4421C7.97485 11.306 7.98248 11.1632 7.96 11.0237V3.84183C7.9632 3.70481 7.93795 3.56864 7.88588 3.44221C7.83381 3.31579 7.75609 3.20195 7.65781 3.10812C7.55954 3.0143 7.4429 2.94261 7.31552 2.89773C7.18814 2.85285 7.05289 2.83579 6.91858 2.84765C6.88732 2.8461 6.856 2.8461 6.82473 2.84765ZM9.85212 4.89962C9.63084 4.94786 9.43348 5.07412 9.29497 5.25607C9.15646 5.43802 9.08571 5.66393 9.09527 5.8938V8.97176C9.07279 9.11123 9.08042 9.254 9.11762 9.39018C9.15482 9.52635 9.2207 9.65267 9.31069 9.76039C9.40069 9.8681 9.51265 9.95462 9.63881 10.014C9.76497 10.0733 9.90232 10.104 10.0413 10.104C10.1803 10.104 10.3177 10.0733 10.4438 10.014C10.57 9.95462 10.682 9.8681 10.772 9.76039C10.862 9.65267 10.9278 9.52635 10.965 9.39018C11.0022 9.254 11.0099 9.11123 10.9874 8.97176V5.8938C10.9906 5.75678 10.9653 5.62061 10.9133 5.49418C10.8612 5.36776 10.7835 5.25392 10.6852 5.16009C10.5869 5.06627 10.4703 4.99458 10.3429 4.9497C10.2155 4.90482 10.0803 4.88776 9.94597 4.89962C9.9147 4.89807 9.88338 4.89807 9.85212 4.89962Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
