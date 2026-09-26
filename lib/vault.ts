// The Prompt Vault: proven, reusable prompts. Placeholders are filled from
// the member's saved cast, products and sets:
//   {character}  → the character's full anchor (face, hair, wardrobe)
//   {product}    → the product's packaging anchor
//   {set}        → the room's fixed description
// Anything left unfilled is replaced with a sensible generic.

export type VaultType = "Image" | "Animation" | "Camera move" | "Look";

export interface VaultPrompt {
  id: string;
  category: string;
  type: VaultType;
  title: string;
  prompt: string;
}

export const VAULT_CATEGORIES = [
  "Luxury lifestyle",
  "UGC & product",
  "Beauty close-ups",
  "Fashion & try-on",
  "Story moments",
  "Portraits & celebrations",
  "Camera moves",
  "Lighting & looks",
] as const;

export const VAULT: VaultPrompt[] = [
  // Luxury lifestyle
  {
    id: "lux-poolside",
    category: "Luxury lifestyle",
    type: "Image",
    title: "Infinity pool selfie",
    prompt:
      "Candid smartphone selfie of {character} sitting on the edge of an infinity pool, legs in the water, city skyline and hills behind, late-afternoon sun, relaxed half-smile, slight lens flare, natural skin texture, shot on iPhone front camera, 9:16.",
  },
  {
    id: "lux-penthouse-morning",
    category: "Luxury lifestyle",
    type: "Image",
    title: "Penthouse morning coffee",
    prompt:
      "{character} standing at floor-to-ceiling windows in {set}, holding a ceramic coffee cup with both hands, soft morning light, sheer curtains moving slightly, calm expression looking out at the view, editorial lifestyle photograph, shallow depth of field, 9:16.",
  },
  {
    id: "lux-car-arrival",
    category: "Luxury lifestyle",
    type: "Animation",
    title: "Arrival from the car",
    prompt:
      "Start from the image. The rear door of a black luxury SUV opens; {character} steps out onto the driveway, adjusts her sunglasses and walks confidently toward camera. Camera: low angle, slow dolly back as she approaches. Keep her face, hair and outfit identical to the start image. 6s.",
  },
  {
    id: "lux-wardrobe-walk",
    category: "Luxury lifestyle",
    type: "Animation",
    title: "Walk-in wardrobe browse",
    prompt:
      "Start from the image. {character} walks slowly along the lit shelves, trailing her fingertips across hanging garments, pauses to pull out one piece and hold it up to herself in the mirror. Camera: smooth handheld follow at shoulder height. Keep the set and her look identical. 7s.",
  },
  {
    id: "lux-dinner",
    category: "Luxury lifestyle",
    type: "Image",
    title: "Rooftop dinner for one",
    prompt:
      "{character} seated alone at a candlelit rooftop restaurant table at blue hour, glass of sparkling water, city lights bokeh behind, warm candle glow on her face, looking just off camera with a knowing smile, cinematic 35mm look, 9:16.",
  },

  // UGC & product
  {
    id: "ugc-hold-to-camera",
    category: "UGC & product",
    type: "Image",
    title: "Holding the product to camera",
    prompt:
      "Front-camera UGC selfie of {character} in a bright bathroom, holding {product} up next to her face with the label facing camera and fully legible, natural window light, genuine excited expression mid-sentence, slight phone-camera softness, no studio lighting, 9:16.",
  },
  {
    id: "ugc-texture-swatch",
    category: "UGC & product",
    type: "Image",
    title: "Texture swatch on the hand",
    prompt:
      "Macro close-up of a fingertip swatch of {product} on the back of a hand, glossy texture catching window light, the product container slightly out of focus behind with the label readable, clean bathroom counter, authentic phone-camera look, 9:16.",
  },
  {
    id: "ugc-apply",
    category: "UGC & product",
    type: "Animation",
    title: "Apply and react",
    prompt:
      "Start from the image. {character} dispenses the product onto her fingertips, presses it into her cheeks in small circles, then looks into the camera and raises her eyebrows as if to say 'wow'. Camera: static, handheld micro-shake. Keep the product packaging and label identical. 5s.",
  },
  {
    id: "ugc-unbox",
    category: "UGC & product",
    type: "Animation",
    title: "Unboxing reveal",
    prompt:
      "Start from the image. Hands open the lid of the box on a bed, lift away tissue paper and pull out {product}, turning it so the label faces camera, then hold it still for a beat. Camera: top-down, slight push-in. Keep the label legible and identical. 5s.",
  },
  {
    id: "ugc-counter-flatlay",
    category: "UGC & product",
    type: "Image",
    title: "Shelfie on the vanity",
    prompt:
      "Eye-level shot of {product} standing on a marble bathroom vanity next to a small vase of fresh flowers and a folded white towel, label facing camera, soft morning light from a side window, realistic 'my current favourites' shelfie, 9:16.",
  },

  // Beauty close-ups
  {
    id: "beauty-lip-liner",
    category: "Beauty close-ups",
    type: "Image",
    title: "Lip liner, first stroke",
    prompt:
      "Extreme macro of full lips, a dark brown lip pencil tracing the cupid's bow, bare lips with natural texture, soft beauty lighting, tiny highlight on the lower lip, ultra-detailed skin and lip texture, clean beige background, 9:16.",
  },
  {
    id: "beauty-lip-press",
    category: "Beauty close-ups",
    type: "Animation",
    title: "Lip press and blend",
    prompt:
      "Start from the last frame of the previous clip. The lips press together and roll gently to blend the colour, then part slightly to reveal the finished ombré. Camera: locked-off macro. Keep every detail of the lips and liner identical. 3s.",
  },
  {
    id: "beauty-glow-reveal",
    category: "Beauty close-ups",
    type: "Animation",
    title: "Face reveal",
    prompt:
      "Start from the image. Hard cut feel: camera pulls out from a macro of the finished makeup to a full face as {character} lifts her chin and looks straight into the lens with a soft smile. Camera: fast zoom-out settling to a beauty close-up. Keep her face identical. 3s.",
  },
  {
    id: "beauty-dewy-skin",
    category: "Beauty close-ups",
    type: "Image",
    title: "Dewy skin close-up",
    prompt:
      "Beauty close-up of the cheek and jaw of {character}, dewy glass-skin finish with visible natural pores, soft diffused light from the left, water-droplet freshness, no heavy makeup, ultra-detailed skin texture, editorial skincare campaign, 4:5.",
  },

  // Fashion & try-on
  {
    id: "fashion-mirror-start",
    category: "Fashion & try-on",
    type: "Image",
    title: "Try-on starting frame",
    prompt:
      "Full-length mirror shot in {set}, {character} barefoot in a neutral bodysuit holding up the outfit on its hanger against her body, soft even light, symmetrical centred framing, locked-off camera position for a transition series, 9:16.",
  },
  {
    id: "fashion-snap-change",
    category: "Fashion & try-on",
    type: "Animation",
    title: "Snap outfit change",
    prompt:
      "Start from the image. {character} snaps her fingers at the camera; on the snap the outfit changes instantly while her pose, position and the background stay exactly the same. Camera: completely locked-off. 2s.",
  },
  {
    id: "fashion-back-reveal",
    category: "Fashion & try-on",
    type: "Animation",
    title: "Turn to show the back",
    prompt:
      "Start from the image. {character} turns slowly on the spot to show the back of the dress, glances over her shoulder at the camera, then turns back. Fabric moves naturally. Camera: static full-length. Keep the outfit and accessories identical. 3s.",
  },
  {
    id: "fashion-catwalk",
    category: "Fashion & try-on",
    type: "Animation",
    title: "Final catwalk",
    prompt:
      "Start from the image. {character} walks toward camera down the room with a confident runway stride, stops, and holds a final three-quarter pose with one hand on her hip. Camera: slow dolly back matching her pace. Keep the full look identical. 5s.",
  },
  {
    id: "fashion-accessory-macro",
    category: "Fashion & try-on",
    type: "Image",
    title: "Accessory close-up",
    prompt:
      "Macro close-up of hands fastening a gold bangle stack on a wrist, the dress fabric visible at the edge of frame, warm glossy highlights on the metal, soft background blur, luxury jewellery campaign style, 4:5.",
  },

  // Story moments
  {
    id: "story-shock-phone",
    category: "Story moments",
    type: "Image",
    title: "The text that changes everything",
    prompt:
      "Close-up of {character} in {set}, holding her phone, the screen's cold light on her face, eyes wide and lips parted in shock, the room dim behind her, cinematic drama lighting, shallow depth of field, 9:16.",
  },
  {
    id: "story-rain-watch",
    category: "Story moments",
    type: "Image",
    title: "Watching from the rain",
    prompt:
      "{character} in a black hooded coat standing in the rain across the street, face half in shadow, tears indistinguishable from raindrops, a lit mansion entrance blurred in the background, moody blue night lighting, cinematic thriller still, 9:16.",
  },
  {
    id: "story-door-reveal",
    category: "Story moments",
    type: "Animation",
    title: "The door opens",
    prompt:
      "Start from the image. The front door swings open slowly; a silhouette stands backlit in the doorway. {character} freezes, then takes one step back. Camera: slow push-in over her shoulder toward the doorway. 5s.",
  },
  {
    id: "story-cliffhanger",
    category: "Story moments",
    type: "Animation",
    title: "Cliffhanger look to camera",
    prompt:
      "Start from the image. {character} turns her head slowly toward the camera, her expression shifting from calm to a knowing, dangerous smile. Camera: slow push-in to an extreme close-up on her eyes. 4s.",
  },
  {
    id: "story-note",
    category: "Story moments",
    type: "Image",
    title: "The handwritten note",
    prompt:
      "Close-up of a woman's hands with long nails holding a folded handwritten note, the ink message partly visible, soft window light, shallow depth of field, tense cinematic mood, 9:16.",
  },

  // Portraits & celebrations
  {
    id: "portrait-headshot",
    category: "Portraits & celebrations",
    type: "Image",
    title: "Clean AI-twin headshot",
    prompt:
      "Studio headshot of {character}, shoulders up, facing camera with a relaxed natural smile, plain light-grey background, soft even beauty lighting, true-to-life skin texture, sharp eyes, neutral makeup, 4:5.",
  },
  {
    id: "portrait-traditional",
    category: "Portraits & celebrations",
    type: "Image",
    title: "Traditional attire portrait",
    prompt:
      "Regal full-length portrait of {character} in traditional ceremonial attire (describe the garment, head-tie or crown, and beadwork), standing in an arched gold-toned alcove with warm candlelight, rich jewel tones, editorial wedding photography, 4:5.",
  },
  {
    id: "portrait-birthday",
    category: "Portraits & celebrations",
    type: "Image",
    title: "Luxury birthday set-up",
    prompt:
      "A child in a formal outfit standing beside a tall tiered cake on a pedestal, balloon garland arch and floral wall behind with the age as a large gold number, soft glamorous event lighting, magazine-style party photography, 4:5.",
  },
  {
    id: "portrait-podcast",
    category: "Portraits & celebrations",
    type: "Image",
    title: "Podcast set",
    prompt:
      "Two women seated in cream bouclé armchairs facing each other at podcast microphones on boom arms, a round dark wood table with branded mugs and flowers between them, warm bookshelf wall with a neon sign behind, soft studio lighting, 16:9.",
  },

  // Camera moves
  { id: "cam-push", category: "Camera moves", type: "Camera move", title: "Slow push-in", prompt: "Camera: slow, steady dolly push-in toward the subject's face, building tension, ending on a close-up." },
  { id: "cam-orbit", category: "Camera moves", type: "Camera move", title: "Hero orbit", prompt: "Camera: smooth 180° orbit around the subject at chest height, background parallax, subject stays centred and sharp." },
  { id: "cam-crane", category: "Camera moves", type: "Camera move", title: "Crane reveal", prompt: "Camera: starts low on a detail, cranes up and back to reveal the whole room and the subject within it." },
  { id: "cam-whip", category: "Camera moves", type: "Camera move", title: "Whip pan transition", prompt: "Camera: fast whip pan to the right with motion blur, landing on the next subject; cut on the blur to join clips." },
  { id: "cam-handheld", category: "Camera moves", type: "Camera move", title: "Handheld UGC", prompt: "Camera: handheld at arm's length like a front-camera selfie, small natural wobble, occasional reframing as she talks." },
  { id: "cam-rack", category: "Camera moves", type: "Camera move", title: "Rack focus", prompt: "Camera: static; focus pulls from the product in the foreground to the subject's face behind it." },

  // Lighting & looks
  { id: "look-golden", category: "Lighting & looks", type: "Look", title: "Golden hour glow", prompt: "Warm low sun from behind the subject, rim light on hair and shoulders, soft flare, golden skin tones, gentle haze." },
  { id: "look-editorial", category: "Lighting & looks", type: "Look", title: "Clean editorial", prompt: "Large soft key light at 45°, subtle fill, seamless neutral background, crisp detail, magazine-cover polish." },
  { id: "look-moody", category: "Lighting & looks", type: "Look", title: "Moody drama", prompt: "Single hard side light, deep shadows, cool blue ambient, practical lamps glowing in the background, cinematic contrast." },
  { id: "look-ugc", category: "Lighting & looks", type: "Look", title: "Real-life UGC", prompt: "Daylight from a nearby window, no extra lights, slightly uneven exposure, true phone-camera colour, lived-in background." },
  { id: "look-film", category: "Lighting & looks", type: "Look", title: "35mm film", prompt: "Shot on 35mm film, fine grain, soft highlight roll-off, warm midtones, slight halation around lights." },
];

export interface VaultFill {
  character?: string;
  product?: string;
  set?: string;
}

const GENERIC: Required<VaultFill> = {
  character: "a woman in her late 20s",
  product: "the product",
  set: "a bright, modern luxury room",
};

export function fillPrompt(prompt: string, fill: VaultFill): string {
  return prompt
    .replaceAll("{character}", fill.character || GENERIC.character)
    .replaceAll("{product}", fill.product || GENERIC.product)
    .replaceAll("{set}", fill.set || GENERIC.set);
}
