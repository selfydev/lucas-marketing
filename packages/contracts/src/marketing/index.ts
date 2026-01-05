import type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from "@orpc/contract";
import { z } from "zod";
import { createContractProcedureBuilder } from "../errors";

const contractProcedure = createContractProcedureBuilder();

export const marketingContactSubmissionSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    userType: z.enum(["student", "university"]),
    message: z.string().trim().min(10).max(2000),
  })
  .strict();

const marketingContactSubmissionResponseSchema = z
  .object({
    ok: z.literal(true),
  })
  .strict();

export const marketingContract = {
  submitContact: contractProcedure
    .input(marketingContactSubmissionSchema)
    .output(marketingContactSubmissionResponseSchema),
} as const;

export type MarketingContract = typeof marketingContract;
export type MarketingContractInputs =
  InferContractRouterInputs<MarketingContract>;
export type MarketingContractOutputs =
  InferContractRouterOutputs<MarketingContract>;

export type SubmitMarketingContactInput =
  MarketingContractInputs["submitContact"];

