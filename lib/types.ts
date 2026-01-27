export type Domain = "diet" | "exercise" | "sleep" | "meds";

export type Tag = {
  id: string;
  label: string;
};

export type ProgressItem = {
  id: string;
  domain: Domain;
  title: string;
  score: number; // 0-100
  tags: Tag[];
};
