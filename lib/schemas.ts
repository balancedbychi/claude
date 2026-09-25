import { z } from "zod";

// ---- Request bodies (validated on every API route) ----

export const CharacterIn = z.object({
  id: z.string().max(64),
  name: z.string().min(1).max(80),
  role: z.string().max(120),
  age: z.string().max(40),
  look: z.string().max(600),
  wardrobe: z.string().max(400),
  voice: z.string().max(300),
  personality: z.string().max(400),
});

export const LocationIn = z.object({
  id: z.string().max(64),
  setName: z.string().max(120),
  name: z.string().min(1).max(120),
  details: z.string().max(1200),
  lighting: z.string().max(300),
});

export const BibleIn = z.object({
  seriesName: z.string().max(120),
  niche: z.string().max(200),
  visualStyle: z.string().max(300),
  setting: z.string().max(400),
  aspectRatio: z.enum(["9:16", "16:9", "1:1"]),
});

export const ConceptIn = z.object({
  title: z.string().max(200),
  logline: z.string().max(1000),
  hook: z.string().max(500),
  whyItWorks: z.string().max(1000),
});

export const LineOut = z.object({ speaker: z.string(), text: z.string() });

export const SceneOut = z.object({
  number: z.number().int(),
  title: z.string(),
  location: z.string(),
  durationSeconds: z.number().int(),
  characterIds: z.array(z.string()),
  locationId: z.string(),
  action: z.string(),
  lines: z.array(LineOut),
});

export const ScriptOut = z.object({
  title: z.string(),
  totalSeconds: z.number().int(),
  scenes: z.array(SceneOut),
});

// ---- Model outputs ----

export const ConceptsOut = z.object({
  concepts: z.array(
    z.object({
      title: z.string(),
      logline: z.string(),
      hook: z.string(),
      whyItWorks: z.string(),
    }),
  ),
});

export const ShotsOut = z.object({
  shots: z.array(
    z.object({
      number: z.number().int(),
      durationSeconds: z.number().int(),
      characterIds: z.array(z.string()),
      action: z.string(),
      camera: z.string(),
      mood: z.string(),
      lighting: z.string(),
      transition: z.string(),
      startFrame: z.string(),
      endFrame: z.string(),
      continueFromPrevious: z.boolean(),
    }),
  ),
});

export const SetOut = z.object({
  setName: z.string(),
  rooms: z.array(z.object({ name: z.string(), details: z.string(), lighting: z.string() })),
});

export const CharacterFromPhotoOut = z.object({
  age: z.string(),
  look: z.string(),
  wardrobe: z.string(),
});

export const RoomFromPhotoOut = z.object({
  name: z.string(),
  details: z.string(),
  lighting: z.string(),
});

export const PackageOut = z.object({
  titles: z.array(z.string()),
  description: z.string(),
  hashtags: z.array(z.string()),
  thumbnail: z.object({
    concept: z.string(),
    textOverlay: z.string(),
    prompt: z.string(),
  }),
});
