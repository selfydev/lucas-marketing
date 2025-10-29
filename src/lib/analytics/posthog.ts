import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? "/badabing";

let isInitialized = false;

function shouldEnableAnalytics(): boolean {
  return typeof window !== "undefined" && POSTHOG_KEY.length > 0;
}

export function initPostHog(): void {
  if (!shouldEnableAnalytics() || isInitialized) {
      console.log("[PostHog] Init skipped:", {
        hasKey: POSTHOG_KEY.length > 0,
        isInitialized,
        shouldEnable: shouldEnableAnalytics(),
      });

    return;
  }


 console.log("[PostHog] Initializing with host:", POSTHOG_HOST);


  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false, // We'll manually track pageviews in the router
    capture_pageleave: true,
    disable_session_recording: false, // Enable session recordings for marketing site
    persistence: "localStorage+cookie",
    loaded: (ph) => {
      console.log("[PostHog] Successfully loaded");
      ph.debug();
    },
  });

  isInitialized = true;
}

export function capturePageview(): void {
  if (!(shouldEnableAnalytics() && isInitialized)) {
    return;
  }

  posthog.capture("$pageview");
}

export function isAnalyticsEnabled(): boolean {
  return shouldEnableAnalytics() && isInitialized;
}

export { posthog };
export default posthog;
