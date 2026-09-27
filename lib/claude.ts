import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { z } from "zod";

const client = new Anthropic();

export const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5";

export class GenerationError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

/**
 * One structured-output call to Claude. Returns data already validated against
 * `schema`. Server-side fallbacks re-run a declined request on another model
 * instead of failing the member's generation outright.
 */
export async function generate<S extends z.ZodType>(opts: {
  system: string;
  prompt: string;
  /** Optional reference image sent before the prompt. */
  image?: { mediaType: "image/jpeg" | "image/png" | "image/webp"; data: string };
  schema: S;
  effort?: "low" | "medium" | "high";
  maxTokens?: number;
}): Promise<z.infer<S>> {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    throw new GenerationError("The AI isn't configured on the server yet (set ANTHROPIC_API_KEY).", 500);
  }
  let response;
  try {
    response = await client.beta.messages.parse({
      model: MODEL,
      max_tokens: opts.maxTokens ?? 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: {
        effort: opts.effort ?? "medium",
        format: betaZodOutputFormat(opts.schema),
      },
      system: opts.system,
      messages: [
        {
          role: "user",
          content: opts.image
            ? [
                { type: "image", source: { type: "base64", media_type: opts.image.mediaType, data: opts.image.data } },
                { type: "text", text: opts.prompt },
              ]
            : opts.prompt,
        },
      ],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      throw new GenerationError("The AI is busy right now. Try again in a minute.", 429);
    }
    if (err instanceof Anthropic.AuthenticationError) {
      throw new GenerationError("Server is missing a valid ANTHROPIC_API_KEY.", 500);
    }
    if (err instanceof Anthropic.APIError) {
      throw new GenerationError(`AI request failed (${err.status ?? "network"}).`);
    }
    throw err;
  }

  if (response.stop_reason === "refusal") {
    throw new GenerationError(
      "This request was declined. Try rephrasing the topic or character details.",
      422,
    );
  }
  if (response.stop_reason === "max_tokens") {
    throw new GenerationError("The response was cut off. Try a shorter request.");
  }
  if (!response.parsed_output) {
    throw new GenerationError("The AI returned an unexpected format. Try again.");
  }
  return response.parsed_output as z.infer<S>;
}

export interface ConnectionStatus {
  configured: boolean;
  ok: boolean;
  model: string;
  /** The model that actually answered (differs from `model` only after a fallback). */
  servedBy?: string;
  ms?: number;
  error?: string;
}

/** A tiny real request, so the admin can confirm the key and model work. Costs a fraction of a cent. */
export async function checkConnection(): Promise<ConnectionStatus> {
  const configured = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
  if (!configured) return { configured, ok: false, model: MODEL, error: "ANTHROPIC_API_KEY isn't set on the server." };
  const started = Date.now();
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      output_config: { effort: "low" },
      messages: [{ role: "user", content: "Reply with the single word: ready" }],
    });
    return { configured, ok: true, model: MODEL, servedBy: response.model, ms: Date.now() - started };
  } catch (err) {
    const error =
      err instanceof Anthropic.AuthenticationError
        ? "The API key was rejected. Check it was copied in full, and that it hasn't been deleted in the Claude Console."
        : err instanceof Anthropic.PermissionDeniedError
          ? "The key works but isn't allowed to use this model. Check the key's workspace in the Claude Console."
          : err instanceof Anthropic.NotFoundError
            ? `The model "${MODEL}" wasn't found. Remove CLAUDE_MODEL or set it to a current model id.`
            : err instanceof Anthropic.RateLimitError
              ? "Rate limited, or the account is out of credit. Check Billing in the Claude Console."
              : err instanceof Anthropic.APIConnectionError
                ? "Couldn't reach the Claude API from the server."
                : err instanceof Anthropic.APIError
                  ? `The Claude API returned an error (${err.status ?? "unknown"}).`
                  : (err as Error).message;
    return { configured, ok: false, model: MODEL, ms: Date.now() - started, error };
  }
}
