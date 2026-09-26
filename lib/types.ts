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

/** One locked room or area of a recurring set (e.g. "Kitchen" in "Hollywood Hills house"). */
export interface Location {
  id: string;
  setName: string; // the property or place this room belongs to
  name: string; // the room or area
  details: string; // fixed layout, materials, colours, furniture, window view
  lighting: string; // default time of day and light
}

/** A product members make ads for. The packaging text is pasted verbatim into prompts. */
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // e.g. "face moisturiser", "hair oil"
  packaging: string; // fixed look: container shape, colours, label layout, finish, size
  benefits: string; // key claims the member is allowed to make
  usage: string; // how it's applied or used on camera
}

export type ToolKind = "episode" | "ugc" | "commercial" | "transition";

/** Inputs for the ad tools. Each tool uses the fields it needs. */
export interface Brief {
  productId: string;
  characterId: string;
  locationId: string;
  angle: string; // UGC format, commercial style, or transformation type
  lengthSeconds: number;
  items: string; // transition: pieces applied in order, one per line
  message: string; // key message or offer
  cta: string;
  notes: string;
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
  hookStyle: string; // one of HOOK_STYLES, for performance tracking
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
  locationId: string; // "" when the scene is not in a locked set
  action: string; // what happens visually
  onScreenText: string; // caption burned into the video for this beat ("" for none)
  lines: ScriptLine[];
}

export interface Script {
  title: string;
  totalSeconds: number;
  hookStyle: string; // one of HOOK_STYLES, for performance tracking
  altHooks: string[]; // alternative opening lines to A/B test
  scenes: Scene[];
}

export interface Shot {
  number: number;
  durationSeconds: number;
  characterIds: string[];
  productIds: string[];
  action: string; // movement and performance during the clip
  camera: string; // framing: shot size and angle
  cameraMove: string; // camera movement during the clip
  mood: string;
  lighting: string;
  /** How this shot joins the previous one, e.g. "hard cut", "match cut on the door". */
  transition: string;
  /** What the very first frame shows. Also the composition of the keyframe image. */
  startFrame: string;
  /** What the very last frame shows, for the next shot to pick up from. */
  endFrame: string;
  /** Animate from the previous clip's last frame instead of a new keyframe image. */
  continueFromPrevious: boolean;
  /** Still-image prompt for the keyframe (character and set sheets inlined). */
  imagePrompt: string;
  /** Image-to-video prompt that animates the keyframe. */
  animationPrompt: string;
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
  kind: ToolKind;
  createdAt: string;
  brief: Brief | null;
  topic: string;
  concept: Concept | null;
  script: Script | null;
  shots: SceneShots[];
  pkg: PackageInfo | null;
}
