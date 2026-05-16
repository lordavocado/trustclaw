import { z } from "zod";

export const ALLOWED_MODELS = [
  "gpt-5.5",
  "gpt-4o",
  "gpt-4o-mini",
] as const;

export const allowedModelSchema = z.enum(ALLOWED_MODELS);

// Backwards-compatible alias used by onboarding & settings components
export const allowedAnthropicModelSchema = allowedModelSchema;
export const ALLOWED_ANTHROPIC_MODELS = ALLOWED_MODELS;

export const createInstanceInput = z.object({
  anthropicModel: allowedModelSchema.default("gpt-5.5"),
});

export type CreateInstanceInput = z.infer<typeof createInstanceInput>;
