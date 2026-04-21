export type Gender = "male" | "female" | "other";

// Trait values are 0–100 integers from the sliders
export type Traits = {
  extrovert: number;
  creative: number;
  calm: number;
  funny: number;
  social: number;
  gender: Gender;
};

export type EyeColor = { base: string; mid: string; deep: string; highlight: string };

export type Personality = {
  warm:     boolean;  // extrovert > 50
  creative: boolean;  // creative  > 50
  calm:     boolean;  // calm      > 60
  funny:    boolean;  // funny     > 60
  social:   boolean;  // social    > 60
};

// Fully derived visual config — no randomness, always deterministic from name + traits
export type AvatarConfig = {
  faceShape: "round" | "square" | "oval";
  eyeType: "big" | "small" | "almond" | "wide" | "sleepy" | "sharp";
  eyeColor: EyeColor;
  mouthType: "smile" | "neutral" | "smirk" | "grin";
  accessory: "none" | "glasses" | "hat" | "cowboy-hat" | "beanie" | "crown" | "party-hat" | "headphones" | "flower" | "sunflower" | "rose" | "bow" | "earrings";
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  bgGradientEnd: string;
  hatColor: string;
  eyelashes: boolean;
  beard: boolean;
  beardStyle: "full" | "stubble" | "goatee";
  beardColor: string;
  personality: Personality;
};

// DJB2-style hash — keeps the same output across JS engines (no BigInt needed)
export const hashSeed = (name: string, traits: Traits): number => {
  const str = name + JSON.stringify(traits);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const seededPick = <T>(arr: T[], seed: number, offset = 0): T =>
  arr[(seed + offset) % arr.length];

export const buildAvatarConfig = (name: string, traits: Traits): AvatarConfig => {
  const seed = hashSeed(name, traits);
  const n = (v: number) => v / 100;

  const faceShape =
    n(traits.extrovert) > 0.6 ? "round" :
    n(traits.extrovert) < 0.4 ? "oval" :
    "square";

  const eyeType: AvatarConfig["eyeType"] =
    n(traits.funny)    > 0.75 ? "wide"   :
    n(traits.calm)     > 0.75 ? "sleepy" :
    n(traits.creative) > 0.7  ? "sharp"  :
    n(traits.extrovert)> 0.6  ? "big"    :
    n(traits.extrovert)< 0.35 ? "almond" :
    "small";

  const eyeColorPalette: EyeColor[] = [
    { base: "#5ba8e8", mid: "#3d7fc4", deep: "#2a5f9e", highlight: "#a0d4f8" }, // sky blue
    { base: "#4a9fd4", mid: "#2e7ab0", deep: "#1c5a8a", highlight: "#90c8ec" }, // ocean blue
    { base: "#4caf7d", mid: "#2e8a5a", deep: "#1a6840", highlight: "#88d4a8" }, // emerald green
    { base: "#7bc47a", mid: "#5aaa58", deep: "#3a8a38", highlight: "#aadcaa" }, // leaf green
    { base: "#a07845", mid: "#7a5a28", deep: "#5a3e10", highlight: "#c8a870" }, // warm brown
    { base: "#c8922a", mid: "#a07015", deep: "#785008", highlight: "#e8c060" }, // amber honey
    { base: "#8090a0", mid: "#607080", deep: "#405060", highlight: "#b0c4d0" }, // steel grey
    { base: "#9b7fd4", mid: "#7a5aaa", deep: "#5a3a88", highlight: "#c4a8f0" }, // violet
    { base: "#d47090", mid: "#b04868", deep: "#883048", highlight: "#f0a0b8" }, // rose pink
    { base: "#60b8b0", mid: "#409890", deep: "#207870", highlight: "#98dcd8" }, // teal
  ];
  const eyeColor = seededPick(eyeColorPalette, seed, 3);

  const mouthType =
    n(traits.funny) > 0.6 && n(traits.calm) > 0.5 ? "grin" :
    n(traits.funny) > 0.6 ? "smirk" :
    n(traits.calm) > 0.6 ? "smile" :
    "neutral";

  // Accessory pool filtered by gender
  const femaleAccessories: AvatarConfig["accessory"][] =
    ["flower", "sunflower", "rose", "bow", "earrings", "crown", "glasses"];
  const maleAccessories: AvatarConfig["accessory"][] =
    ["hat", "cowboy-hat", "beanie", "party-hat", "headphones", "glasses"];
  const otherAccessories: AvatarConfig["accessory"][] =
    ["glasses", "hat", "cowboy-hat", "beanie", "crown", "party-hat",
     "headphones", "flower", "sunflower", "rose", "bow", "earrings"];

  const pool =
    traits.gender === "female" ? femaleAccessories :
    traits.gender === "male"   ? maleAccessories   :
    otherAccessories;

  const accessory: AvatarConfig["accessory"] = n(traits.creative) > 0.5
    ? seededPick(pool, seed)
    : "none";

  type Palette = { primary: string; accent: string; bg: string; bgEnd: string };
  const warmPalettes: Palette[] = [
    { primary: "#FF6B9D", accent: "#FCD34D", bg: "#FFF0F5", bgEnd: "#FFD6E7" }, // hot pink + gold
    { primary: "#FF8C42", accent: "#FCD34D", bg: "#FFF4EC", bgEnd: "#FFE0C8" }, // sunset orange
    { primary: "#E91E8C", accent: "#FCD34D", bg: "#FFF0FA", bgEnd: "#FFD0EE" }, // magenta
    { primary: "#F59E0B", accent: "#EF4444", bg: "#FFFBEB", bgEnd: "#FEF08A" }, // golden amber
    { primary: "#F97316", accent: "#FCD34D", bg: "#FFF7ED", bgEnd: "#FFEDD5" }, // tangerine
    { primary: "#DC2626", accent: "#FCD34D", bg: "#FFF1F0", bgEnd: "#FFD0CC" }, // cherry red
    { primary: "#DB2777", accent: "#F9A8D4", bg: "#FDF2F8", bgEnd: "#FCE7F3" }, // rose
  ];
  const coolPalettes: Palette[] = [
    { primary: "#6C63FF", accent: "#A78BFA", bg: "#F5F3FF", bgEnd: "#DDD6FE" }, // brand violet
    { primary: "#A78BFA", accent: "#FCD34D", bg: "#EDE9FE", bgEnd: "#C4B5FD" }, // lavender + gold
    { primary: "#2563EB", accent: "#60A5FA", bg: "#EFF6FF", bgEnd: "#BFDBFE" }, // ocean blue
    { primary: "#0891B2", accent: "#22D3EE", bg: "#ECFEFF", bgEnd: "#A5F3FC" }, // teal
    { primary: "#059669", accent: "#34D399", bg: "#ECFDF5", bgEnd: "#A7F3D0" }, // emerald
    { primary: "#7C3AED", accent: "#C4B5FD", bg: "#F5F3FF", bgEnd: "#EDE9FE" }, // deep purple
    { primary: "#0F766E", accent: "#2DD4BF", bg: "#F0FDFA", bgEnd: "#CCFBF1" }, // deep teal
  ];
  const palette: Palette = n(traits.extrovert) > 0.5
    ? seededPick(warmPalettes, seed)
    : seededPick(coolPalettes, seed, 1);

  const hatColors = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB",
    "#1E88E5", "#00897B", "#43A047", "#F4511E", "#FB8C00",
    "#F9A825", "#6D4C41", "#546E7A", "#2E7D32", "#283593",
  ];
  const hatColor = seededPick(hatColors, seed, 7);

  // Eyelashes shown for female (and optionally other if seed picks it)
  const eyelashes =
    traits.gender === "female" ||
    (traits.gender === "other" && seed % 3 === 0);

  // Beard shown for male (and rarely for other)
  const beardColors = ["#1a0a00", "#2c1810", "#5c3d1e", "#8b6030", "#c8a850", "#808080", "#d4a860"];
  const beardStyles: AvatarConfig["beardStyle"][] = ["full", "stubble", "goatee"];
  const beard =
    traits.gender === "male" ||
    (traits.gender === "other" && seed % 4 === 0);
  const beardStyle  = seededPick(beardStyles, seed, 5);
  const beardColor  = seededPick(beardColors, seed, 9);

  const personality: Personality = {
    warm:     n(traits.extrovert) > 0.5,
    creative: n(traits.creative)  > 0.5,
    calm:     n(traits.calm)      > 0.6,
    funny:    n(traits.funny)     > 0.6,
    social:   n(traits.social)    > 0.6,
  };

  return {
    faceShape,
    eyeType,
    eyeColor,
    mouthType,
    accessory,
    primaryColor: palette.primary,
    accentColor: palette.accent,
    backgroundColor: palette.bg,
    bgGradientEnd: palette.bgEnd,
    hatColor,
    eyelashes,
    beard,
    beardStyle,
    beardColor,
    personality,
  };
};
