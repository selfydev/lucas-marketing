import posthogInstance from "posthog-js";

// PostHog public key - this is meant to be client-side, not a secret
const POSTHOG_KEY = "phc_GsdvpAKR8IssD0CjWYzaB9wuDUNSkBwLrOJ98juQ90P";
const POSTHOG_HOST = "/badabing";

let isInitialized = false;

function shouldEnableAnalytics(): boolean {
  return typeof window !== "undefined" && POSTHOG_KEY.length > 0;
}

export function initPostHog(): void {
  if (!shouldEnableAnalytics() || isInitialized) {
    return;
  }

  posthogInstance.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false, // We'll manually track pageviews in the router
    capture_pageleave: true,
    disable_session_recording: false, // Enable session recordings for marketing site
    persistence: "localStorage+cookie",
  });

  isInitialized = true;
}

export function capturePageview(): void {
  if (!(shouldEnableAnalytics() && isInitialized)) {
    return;
  }

  posthogInstance.capture("$pageview");
}

export function isAnalyticsEnabled(): boolean {
  return shouldEnableAnalytics() && isInitialized;
}

// Re-export posthog for direct usage
export { default as posthog } from "posthog-js";
