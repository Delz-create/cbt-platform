export type ApiErrorCode =
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "INVALID_INPUT"
  | "RESOURCE_NOT_FOUND"
  | "EXAM_NOT_ACTIVE"
  | "ATTEMPT_LIMIT_REACHED"
  | "ATTEMPT_EXPIRED"
  | "AI_BLOCKED_DURING_EXAM"
  | "INSUFFICIENT_TOKENS"
  | "WALLET_FROZEN"
  | "TRANSFER_LIMIT_EXCEEDED"
  | "PAYMENT_PENDING"
  | "PAYMENT_VERIFICATION_FAILED"
  | "IDEMPOTENCY_CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  constructor(
    public code: ApiErrorCode,
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const notFound = (resource: string) =>
  new ApiError("RESOURCE_NOT_FOUND", `${resource} not found`, 404);

export const forbidden = (message = "Not allowed") =>
  new ApiError("FORBIDDEN", message, 403);

export const authRequired = () =>
  new ApiError("AUTH_REQUIRED", "Authentication required", 401);

export const invalidInput = (message: string, details?: unknown) =>
  new ApiError("INVALID_INPUT", message, 400, details);