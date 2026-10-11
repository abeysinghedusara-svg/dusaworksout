export type Session = "push" | "pull" | "legs" | "rest";
export type Muscle =
  | "chest"
  | "frontdelts"
  | "sidedelts"
  | "reardelts"
  | "triceps"
  | "biceps"
  | "forearms"
  | "lats"
  | "upperback"
  | "core"
  | "erectors"
  | "quads"
  | "adductors"
  | "glutes"
  | "hamstrings"
  | "calves";
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  primary: Muscle[];
  secondary: Muscle[];
  optional?: boolean;
  cue: string;
}
export interface ViewerState {
  day: number;
  exercise: string | null;
  includeAccessories: boolean;
}
