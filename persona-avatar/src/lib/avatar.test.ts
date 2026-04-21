import { describe, it, expect } from "vitest";
import { buildAvatarConfig, hashSeed } from "./avatar";
import type { Traits } from "./avatar";

const base: Traits = { extrovert: 50, creative: 50, calm: 50, funny: 50, social: 50, gender: "other" };

describe("hashSeed", () => {
  it("same name + traits → same seed", () => {
    expect(hashSeed("Barak", base)).toBe(hashSeed("Barak", base));
  });

  it("different names, same traits → different seed", () => {
    expect(hashSeed("Barak", base)).not.toBe(hashSeed("Alice", base));
  });
});

describe("buildAvatarConfig", () => {
  it("same inputs always produce same output", () => {
    expect(buildAvatarConfig("Barak", base)).toEqual(buildAvatarConfig("Barak", base));
  });

  it("extrovert=100 → eyeType big, faceShape round", () => {
    const config = buildAvatarConfig("X", { ...base, extrovert: 100 });
    expect(config.eyeType).toBe("big");
    expect(config.faceShape).toBe("round");
  });

  it("extrovert=0 → eyeType small, faceShape oval", () => {
    const config = buildAvatarConfig("X", { ...base, extrovert: 0 });
    expect(config.eyeType).toBe("small");
    expect(config.faceShape).toBe("oval");
  });

  it("creative=0 → accessory none", () => {
    const config = buildAvatarConfig("X", { ...base, creative: 0 });
    expect(config.accessory).toBe("none");
  });

  it("funny>60 + calm>50 → mouthType grin", () => {
    const config = buildAvatarConfig("X", { ...base, funny: 70, calm: 60 });
    expect(config.mouthType).toBe("grin");
  });

  it("funny>60 + calm<=50 → mouthType smirk", () => {
    const config = buildAvatarConfig("X", { ...base, funny: 70, calm: 40 });
    expect(config.mouthType).toBe("smirk");
  });
});
