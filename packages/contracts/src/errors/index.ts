import { type ErrorMap, oc } from "@orpc/contract";
import { z } from "zod";

export const validationIssueSchema = z.object({
  code: z.string(),
  message: z.string(),
  path: z.array(z.string()),
});

export const rateLimitSchema = z
  .object({
    retryAfter: z.number().int().min(0).optional(),
  })
  .default({});

export const validationErrorSchema = z.object({
  issues: z.array(validationIssueSchema),
});

export const baseErrorMap = {
  BAD_REQUEST: {
    status: 400,
    message: "Bad request",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Authentication required",
  },
  FORBIDDEN: {
    status: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
  },
  RATE_LIMITED: {
    status: 429,
    message: "Too many requests",
    data: rateLimitSchema,
  },
  VALIDATION_ERROR: {
    status: 422,
    message: "Validation failed",
    data: validationErrorSchema,
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal server error",
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: "Service unavailable",
  },
} satisfies ErrorMap;

export type BaseErrorCode = keyof typeof baseErrorMap;

export function createContractProcedureBuilder() {
  return oc.errors(baseErrorMap);
}

export function createContractRouterBuilder() {
  return oc.errors(baseErrorMap);
}

