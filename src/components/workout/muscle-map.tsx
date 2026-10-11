import { createElement } from "react";
import anatomy from "@/data/anatomy.json";
import { targetClass } from "@/lib/workout";
import type { Muscle } from "@/types/workout";
export function MuscleMap({
  primary,
  secondary,
}: {
  primary: Muscle[];
  secondary: Muscle[];
}) {
  return (
    <div className="body-views">
      {(["front", "back"] as const).map((view) => (
        <figure key={view}>
          <figcaption>
            {view === "front" ? "Front view" : "Back view"}
          </figcaption>
          <svg
            viewBox="0 0 200 360"
            role="img"
            aria-label={`${view} view of selected muscle targets`}
          >
            <title>{`${view} muscle map`}</title>
            {anatomy[view].map((group, i) => (
              <g
                key={i}
                className={
                  group.muscle
                    ? targetClass(group.muscle, primary, secondary)
                    : "body-outline"
                }
              >
                {group.shapes.map((shape, j) =>
                  createElement(shape.tag, { ...shape.attrs, key: j }),
                )}
              </g>
            ))}
          </svg>
        </figure>
      ))}
    </div>
  );
}
