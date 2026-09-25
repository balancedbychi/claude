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

export const SYSTEM = `You are the writers' room behind a faceless AI video series for TikTok, Reels and YouTube Shorts.
You write original, binge-able episodic stories performed by recurring AI-generated characters.
Priorities: a scroll-stopping first 3 seconds, clear visual storytelling that an AI video model can render, cliffhangers that make viewers follow for the next episode, and characters that stay visually consistent.
Never imitate real, identifiable people or existing copyrighted characters. Keep content platform-safe.`;
