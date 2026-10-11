import { rotation } from "@/data/workouts";
export function DaySelector({
  day,
  onChange,
}: {
  day: number;
  onChange: (day: number) => void;
}) {
  return (
    <nav className="day-selector" aria-label="Eight-day workout rotation">
      {rotation.map((session, i) => (
        <button
          type="button"
          key={i}
          aria-pressed={day === i}
          className={`day-button ${day === i ? "active" : ""}`}
          onClick={() => onChange(i)}
        >
          <span>DAY {i + 1}</span>
          <strong>{session}</strong>
          <i aria-hidden="true" className={`session-dot ${session}`} />
        </button>
      ))}
    </nav>
  );
}
