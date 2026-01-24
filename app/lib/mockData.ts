import type { ProgressItem } from "./types";

export const mockProgress: ProgressItem[] = [
  {
    id: "1",
    domain: "diet",
    title: "Balanced meals",
    score: 72,
    tags: [{ id: "t1", label: "protein" }, { id: "t2", label: "fiber" }],
  },
  {
    id: "2",
    domain: "exercise",
    title: "Steps",
    score: 55,
    tags: [{ id: "t3", label: "walking" }],
  },
  {
    id: "3",
    domain: "sleep",
    title: "Sleep consistency",
    score: 81,
    tags: [{ id: "t4", label: "routine" }],
  },
];
