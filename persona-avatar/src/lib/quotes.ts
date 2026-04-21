import type { Traits } from "./avatar";

// Each quote pool targets a dominant trait combo
const pools = {
  extrovertFunny: [
    "Let's gooo! 🎉",
    "Who's ready to party?",
    "I came, I saw, I made it awkward.",
    "Talk to me, I don't bite… much.",
    "Energy level: always.",
  ],
  extrovertCalm: [
    "Good vibes only.",
    "I know everyone here.",
    "Relax, I got this.",
    "Life is better with people.",
    "Let's figure this out together.",
  ],
  introvertCalm: [
    "I'm fine, just thinking.",
    "Silence is underrated.",
    "My comfort zone is very cozy.",
    "One friend is enough.",
    "Please don't call, just text.",
  ],
  introvertFunny: [
    "Socially exhausted but mentally hilarious.",
    "I was funny in my head.",
    "I said no plans, not no fun.",
    "Quiet on the outside, chaotic inside.",
    "My inner monologue is a comedy show.",
  ],
  creative: [
    "What if we tried it this way…",
    "I have seventeen ideas, pick one.",
    "Rules? I see suggestions.",
    "I painted this with my feelings.",
    "Imagination is my main language.",
  ],
  analytical: [
    "Let me run the numbers.",
    "Technically speaking…",
    "I need more data on that.",
    "Actually, I looked it up.",
    "The answer is probably 42.",
  ],
  social: [
    "I know a guy who knows a guy.",
    "Have you met my friend?",
    "Group chat is popping.",
    "Everyone's invited.",
    "Connection is everything.",
  ],
  default: [
    "Just vibing.",
    "I contain multitudes.",
    "Somewhere in the middle.",
    "Ask me anything.",
    "I'm a work in progress.",
  ],
};

// Pick deterministically using a simple hash of the traits
const pick = (arr: string[], seed: number) => arr[seed % arr.length];

export const generateQuote = (traits: Traits, seed: number): string => {
  const { extrovert, funny, calm, creative, social } = traits;

  if (extrovert > 60 && funny > 60)   return pick(pools.extrovertFunny, seed);
  if (extrovert > 60 && calm > 60)    return pick(pools.extrovertCalm,  seed);
  if (extrovert < 40 && calm > 60)    return pick(pools.introvertCalm,  seed);
  if (extrovert < 40 && funny > 60)   return pick(pools.introvertFunny, seed);
  if (creative > 65)                  return pick(pools.creative,        seed);
  if (creative < 35)                  return pick(pools.analytical,      seed);
  if (social > 65)                    return pick(pools.social,           seed);
  return pick(pools.default, seed);
};
