import type { Exercise, Muscle, ViewerState } from "@/types/workout";
export function getTargets(exercises: Exercise[]) {
  const primary = [...new Set(exercises.flatMap((e) => e.primary))];
  const secondary = [...new Set(exercises.flatMap((e) => e.secondary))].filter(
    (m) => !primary.includes(m),
  );
  return { primary, secondary };
}
export function parseSavedState(raw: string | null): ViewerState | null {
  try {
    const v = JSON.parse(raw ?? "null");
    if (
      !v ||
      !Number.isInteger(v.day) ||
      v.day < 0 ||
      v.day > 7 ||
      (v.exercise !== null && typeof v.exercise !== "string") ||
      typeof v.includeAccessories !== "boolean"
    )
      return null;
    return {
      day: v.day,
      exercise: v.exercise,
      includeAccessories: v.includeAccessories,
    };
  } catch {
    return null;
  }
}
export function targetClass(
  muscle: string,
  primary: Muscle[],
  secondary: Muscle[],
) {
  return primary.includes(muscle as Muscle)
    ? "muscle primary"
    : secondary.includes(muscle as Muscle)
      ? "muscle secondary"
      : "muscle";
}
