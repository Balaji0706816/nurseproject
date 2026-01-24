import script from "../../data/stampley-script.json"; 

export type ScriptItem = {
  id: string;
  domain: string;
  subscaleItem: string;
  conversationType:
    | "Simple"
    | "Reflective"
    | "Follow-Up Reflection"
    | "Supportive Open-Ended"
    | "Re-engagement (variant)"
    | "Progress Reflection (variant)";
  distressMin: number;
  distressMax: number;
  stampleyPrompt: string;
  possibleResponses?: string[];
  validationLine: string;
  microSkill: string;
  skillObjective: string;
  educationChip: string;
  affirmation: string;
  suggestedDay: number;
  variant?: "standard" | "replacement" | "summary";
};

export type ChatMeta = {
  domain: string;
  day: number;
  distressScore: number;
  missedDay?: boolean;
  endOfWeek?: boolean;
};

const items = (script as { items: ScriptItem[] }).items;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function selectStampleyScript(meta: ChatMeta): ScriptItem | null {
  const score = clamp(meta.distressScore ?? 5, 0, 10);

  // Priority variants:
  const wantsReplacement = !!meta.missedDay;
  const wantsSummary = !!meta.endOfWeek;

  const candidates = items.filter((it) => {
    if (it.domain !== meta.domain) return false;
    if (it.suggestedDay !== meta.day) return false;
    if (score < it.distressMin || score > it.distressMax) return false;

    if (wantsReplacement) return it.variant === "replacement";
    if (wantsSummary) return it.variant === "summary";
    return (it.variant ?? "standard") === "standard";
  });

  // Fallback: ignore variant filter if none found
  if (candidates.length === 0) {
    const fallback = items.filter((it) => {
      if (it.domain !== meta.domain) return false;
      if (it.suggestedDay !== meta.day) return false;
      return score >= it.distressMin && score <= it.distressMax;
    });
    return fallback[0] ?? null;
  }

  return candidates[0] ?? null;
}
