import { phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "";

/**
 * Better Auth client for the marketing site.
 * Points to the main server for all auth operations (same pattern as web app).
 *
 * Sessions are stored in the same database as the main app,
 * so users can sign in from the marketing site and access the app seamlessly.
 */
export const authClient = createAuthClient({
  baseURL: SERVER_URL,
  plugins: [phoneNumberClient()],
  fetchOptions: {
    credentials: "include",
  },
});

export type Session = typeof authClient.$Infer.Session;
