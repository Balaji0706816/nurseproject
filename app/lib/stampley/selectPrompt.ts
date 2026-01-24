export type ConversationType =
  | "Simple"
  | "Reflective"
  | "Follow-Up Reflection"
  | "Supportive Open-Ended"
  | "Re-engagement"
  | "Progress Reflection";

export type StampleyLibraryItem = {
  id: string;
  domain: string;
  subscaleItem: string;
  conversationType: ConversationType;
  distress: { min: number; max: number } | { kind: "missed" } | { kind: "end_of_week" };
  stampleyPrompt: string;
  possibleResponses?: string[];
  validationLine: string;
  microSkill: string;
  skillObjective: string;
  educationChip: string;
  affirmation: string;
  suggestedDay: number | "replacement" | "summary";
};

export function chooseConversationType(opts: {
  distressScore: number;
  missedDay?: boolean;
  endOfWeek?: boolean;
}): ConversationType {
  if (opts.missedDay) return "Re-engagement";
  if (opts.endOfWeek) return "Progress Reflection";
  if (opts.distressScore >= 8) return "Follow-Up Reflection";
  if (opts.distressScore >= 5) return "Reflective";
  return "Simple";
}

export function selectPromptRow(opts: {
  items: StampleyLibraryItem[];
  domain: string;
  day: number;
  distressScore: number;
  missedDay?: boolean;
  endOfWeek?: boolean;
}): StampleyLibraryItem | null {
  const conversationType = chooseConversationType(opts);

  const filtered = opts.items.filter((x) => {
    if (x.domain !== opts.domain) return false;
    if (x.suggestedDay !== opts.day && x.suggestedDay !== "replacement" && x.suggestedDay !== "summary")
      return false;
    if (x.conversationType !== conversationType) return false;

    // missed / end_of_week special handling if you store them that way
    if ("kind" in x.distress) {
      if (x.distress.kind === "missed") return !!opts.missedDay;
      if (x.distress.kind === "end_of_week") return !!opts.endOfWeek;
      return false;
    }

    return opts.distressScore >= x.distress.min && opts.distressScore <= x.distress.max;
  });

  return filtered[0] ?? null;
}
