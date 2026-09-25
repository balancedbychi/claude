// Shared shapes for the Episode Builder. Everything a member creates lives in
// the browser (localStorage) in v1, so these are plain JSON-serialisable types.

export interface Character {
  id: string;
  name: string;
  role: string; // e.g. "lead", "best friend", "villain"
  age: string;
  look: string; // face, hair, skin tone, build, distinguishing features
  wardrobe: string; // signature outfit, kept identical across scenes
  voice: string; // how they sound, for voiceover / dialogue tools
  personality: string;
}

export interface SeriesBible {
  seriesName: string;
  niche: string;
  visualStyle: string; // e.g. "cinematic photoreal, soft film grain"
  setting: string; // recurring world / locations
  aspectRatio: "9:16" | "16:9" | "1:1";
}

export interface Concept {
  title: string;
  logline: string;
  hook: string; // first 3 seconds, spoken or on-screen
  whyItWorks: string;
}

export interface ScriptLine {
  speaker: string; // character name or "Narrator"
  text: string;
}

export interface Scene {
  number: number;
  title: string;
  location: string;
  durationSeconds: number;
  characterIds: string[];
  action: string; // what happens visually
  lines: ScriptLine[];
}

export interface Script {
  title: string;
  totalSeconds: number;
  scenes: Scene[];
}

export interface Shot {
  number: number;
  durationSeconds: number;
  characterIds: string[];
  action: string;
  camera: string;
  mood: string;
  lighting: string;
  /** Fully assembled, ready-to-paste prompt (character sheets inlined). */
  prompt: string;
}

export interface SceneShots {
  sceneNumber: number;
  shots: Shot[];
}

export interface PackageInfo {
  titles: string[];
  description: string;
  hashtags: string[];
  thumbnail: {
    concept: string;
    textOverlay: string;
    prompt: string;
  };
}

export interface Episode {
  id: string;
  createdAt: string;
  topic: string;
  concept: Concept | null;
  script: Script | null;
  shots: SceneShots[];
  pkg: PackageInfo | null;
}
