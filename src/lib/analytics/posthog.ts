import posthog from "posthog-js";

// PostHog public key - this is meant to be client-side, not a secret
const POSTHOG_KEY = "phc_GsdvpAKR8IssD0CjWYzaB9wuDUNSkBwLrOJ98juQ90P";
const POSTHOG_HOST = "/badabing";

let isInitialized = false;

// Debug: Log PostHog configuration on module load (client-side only)
if (typeof window !== "undefined") {
	console.warn("[PostHog] Config loaded:", {
		keyLength: POSTHOG_KEY.length,
		host: POSTHOG_HOST,
		keyPrefix: POSTHOG_KEY.substring(0, 8) + "...",
	});
}

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

// Re-export posthog for direct usage
export { default as posthog } from "posthog-js";
export { default } from "posthog-js";
