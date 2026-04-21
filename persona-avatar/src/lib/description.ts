import type { Traits } from "@/lib/avatar";

export function generateDescription(name: string, traits: Traits): string {
  const parts: string[] = [];

  if (traits.creative > 60) parts.push("יצירתי");
  else if (traits.creative < 40) parts.push("אנליטי");

  if (traits.calm > 60) parts.push("רגוע");
  else if (traits.calm < 40) parts.push("נמרץ");

  if (traits.extrovert > 60) parts.push("חברותי");
  else if (traits.extrovert < 40) parts.push("מופנם");

  if (traits.funny > 60) parts.push("שובב");
  if (traits.social > 60) parts.push("אוהב אנשים");
  else if (traits.social < 40) parts.push("עצמאי");

  if (parts.length === 0) parts.push("מאוזן");

  const joined =
    parts.length === 1
      ? parts[0]
      : parts.slice(0, -1).join(", ") + " ו" + parts[parts.length - 1];

  return `ל${name} יש אישיות ${joined}.`;
}
