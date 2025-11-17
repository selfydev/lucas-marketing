import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type {
  MarketingContractInputs,
  MarketingContractOutputs,
} from "@lucas-ai/contracts/marketing";

const LOCAL_SERVER_FALLBACK = "http://localhost:5005";

const normalizedServerUrl =
  import.meta.env.VITE_SERVER_URL?.replace(/\/$/, "") ??
  (import.meta.env.DEV ? LOCAL_SERVER_FALLBACK : "");

if (!normalizedServerUrl) {
  throw new Error(
    "VITE_SERVER_URL must be configured for the marketing app in production."
  );
}

type MarketingRouterClient = {
  marketing: {
    submitContact: (
      input: MarketingContractInputs["submitContact"]
    ) => Promise<MarketingContractOutputs["submitContact"]>;
  };
};

const link = new RPCLink({
  url: `${normalizedServerUrl}/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  },
});

export const orpc: MarketingRouterClient = createORPCClient(link);
