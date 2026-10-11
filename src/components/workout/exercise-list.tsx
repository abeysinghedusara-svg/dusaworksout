import type { Exercise } from "@/types/workout";
export function ExerciseList({
  exercises,
  selected,
  onSelect,
}: {
  exercises: Exercise[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="exercise-list">
      <button
        type="button"
        className={`overview-button ${selected === null ? "selected" : ""}`}
        onClick={() => onSelect(null)}
        aria-pressed={selected === null}
      >
        <span>Whole session</span>
        <span>View all targets ↗</span>
      </button>
      {exercises.map((e, i) => (
        <button
          type="button"
          className={`exercise-button ${selected === e.id ? "selected" : ""}`}
          key={e.id}
          onClick={() => onSelect(e.id)}
          aria-pressed={selected === e.id}
        >
          <span className="exercise-number">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="exercise-info">
            <strong>{e.name}</strong>
            <span>
              {e.optional ? "Optional accessory" : "Compound exercise"}
            </span>
          </span>
          <span className="prescription">
            <strong>{e.sets} sets</strong>
            <span>
              {e.reps.replace(" / leg", "")} reps
              {e.reps.includes("/ leg") ? " / leg" : ""}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
