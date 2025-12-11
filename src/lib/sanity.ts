import {
  type ClientConfig,
  createClient,
  type SanityClient,
} from "@sanity/client";

export const SANITY_API_VERSION = "2025-02-15";

const token = import.meta.env.VITE_SANITY_API_TOKEN;
const useCdn = !token && import.meta.env.VITE_SANITY_USE_CDN === "true";

const sanityConfig: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn,
  perspective: "published",
  token,
};

if (!sanityConfig.projectId || !sanityConfig.dataset) {
  throw new Error(
    "Missing Sanity configuration. Please set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.",
  );
}

let sanityClientInstance: SanityClient | null = null;

export function getSanityClient() {
  if (!sanityClientInstance) {
    sanityClientInstance = createClient(sanityConfig);
  }

  return sanityClientInstance;
}

export const sanityClient = getSanityClient();
