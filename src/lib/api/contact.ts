import type { MarketingContractInputs } from "@lucas-ai/contracts/marketing";
import { orpc } from "@/lib/orpc";

export type ContactSubmissionInput = MarketingContractInputs["submitContact"];

export function submitMarketingContact(input: ContactSubmissionInput) {
  return orpc.marketing.submitContact(input);
}
