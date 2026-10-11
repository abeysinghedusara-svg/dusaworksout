"use client";
import { useEffect, useState } from "react";
import {
  rotation,
  workouts,
  muscleNames,
  sessionDescriptions,
  sources,
} from "@/data/workouts";
import { getTargets, parseSavedState } from "@/lib/workout";
import type { ViewerState } from "@/types/workout";
import { DaySelector } from "./day-selector";
import { ExerciseList } from "./exercise-list";
import { MuscleMap } from "./muscle-map";
const storageKey = "workout-viewer:selection:v1";
export function WorkoutViewer() {
  const [state, setState] = useState<ViewerState>({
    day: 0,
    exercise: null,
    includeAccessories: true,
  });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = parseSavedState(localStorage.getItem(storageKey));
      if (saved) setState(saved);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {}
  }, [state, ready]);
  const session = rotation[state.day];
  const exercises = workouts[session].filter(
    (e) => state.includeAccessories || !e.optional,
  );
  const selected = exercises.find((e) => e.id === state.exercise);
  const { primary, secondary } = getTargets(selected ? [selected] : exercises);
  const title =
    session === "rest"
      ? "Recovery day"
      : session === "legs"
        ? "Leg day"
        : `${session[0].toUpperCase() + session.slice(1)} day`;
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Form workout viewer home">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          FORM<span className="brand-sub"> / training companion</span>
        </a>
        <span className="top-label">YOUR MOVEMENT, MAPPED</span>
      </header>
      <section className="intro">
        <div>
          <p className="eyebrow">THE PUSH / PULL / LEGS PLAN</p>
          <h1>
            A little structure.
            <br />
            <span>A stronger you.</span>
          </h1>
        </div>
        <p className="intro-note">
          Know your session. <br />
          See what you’re training. <br />
          Build consistency, one day at a time.
        </p>
      </section>
      <section className="rotation">
        <div className="section-line">
          <h2>Your rotation</h2>
          <span>8 days · 6 sessions · 2 recovery days</span>
        </div>
        <DaySelector
          day={state.day}
          onChange={(day) => setState({ ...state, day, exercise: null })}
        />
      </section>
      <div className="workout-grid">
        <section className="session-panel">
          <div className="session-heading">
            <p className="eyebrow">DAY {state.day + 1} / 08</p>
            <h2>{title}</h2>
            <p>{sessionDescriptions[session]}</p>
          </div>
          {session === "rest" ? (
            <div className="rest-panel">
              <span className="rest-symbol" aria-hidden="true">
                ↺
              </span>
              <h3>Make room for recovery.</h3>
              <p>
                Rest, take an easy walk, and return to your next session feeling
                ready.
              </p>
              <button
                type="button"
                className="action-button"
                onClick={() =>
                  setState({
                    ...state,
                    day: (state.day + 1) % 8,
                    exercise: null,
                  })
                }
              >
                Next training day →
              </button>
            </div>
          ) : (
            <>
              <div className="list-header">
                <h3>Session exercises</h3>
                <label className="accessory-toggle">
                  <input
                    type="checkbox"
                    checked={state.includeAccessories}
                    onChange={(e) =>
                      setState({
                        ...state,
                        includeAccessories: e.target.checked,
                        exercise: null,
                      })
                    }
                  />{" "}
                  Accessories
                </label>
              </div>
              <ExerciseList
                exercises={exercises}
                selected={selected?.id ?? null}
                onSelect={(exercise) => setState({ ...state, exercise })}
              />
              <p className="session-footer">
                {exercises.reduce((n, e) => n + e.sets, 0)} working sets ·
                warm-ups excluded
              </p>
            </>
          )}
        </section>
        <section className="map-panel">
          <div className="map-header">
            <div>
              <p className="eyebrow">MUSCLE FOCUS</p>
              <h3>
                {selected?.name ??
                  (session === "rest" ? "Rest & recover" : "The whole session")}
              </h3>
            </div>
            <span className={`session-badge ${session}`}>{session}</span>
          </div>
          <MuscleMap primary={primary} secondary={secondary} />
          <div className="map-legend">
            <span>
              <i className="legend-main" />
              Main target
            </span>
            <span>
              <i className="legend-secondary" />
              Assists / stabilizes
            </span>
          </div>
          <div className="target-details" aria-live="polite">
            <div>
              <h4>Main targets</h4>
              <div className="muscle-tags">
                {primary.length ? (
                  primary.map((m) => <span key={m}>{muscleNames[m]}</span>)
                ) : (
                  <span>No loaded training today</span>
                )}
              </div>
            </div>
            {secondary.length > 0 && (
              <div>
                <h4>Assists / stabilizes</h4>
                <p>{secondary.map((m) => muscleNames[m]).join(" · ")}</p>
              </div>
            )}
            {selected && <p className="exercise-cue">{selected.cue}</p>}
          </div>
          <p className="map-disclaimer">
            Simplified anatomy. Highlights show involvement, not measured
            activation or predicted growth.
          </p>
        </section>
      </div>
      <section className="training-notes">
        <p className="eyebrow">MAKE EACH SESSION COUNT</p>
        <div className="note-grid">
          <div>
            <span>01 / EFFORT</span>
            <h3>Leave a little in reserve.</h3>
            <p>
              Start with about 1–3 good repetitions left at the end of most
              working sets.
            </p>
          </div>
          <div>
            <span>02 / REST</span>
            <h3>Recover between sets.</h3>
            <p>
              Allow around 2–3 minutes between compound sets, longer when
              needed.
            </p>
          </div>
          <div>
            <span>03 / PROGRESSION</span>
            <h3>Earn the next weight.</h3>
            <p>
              Reach the top of the repetition range with consistent form, then
              add a small amount of weight.
            </p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div>
          <strong>Built on principles, not promises.</strong>
          <p>
            This example plan supports exploration; it is not a proven universal
            optimum.
          </p>
          <details>
            <summary>Research behind the plan</summary>
            <ul>
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                  <span>{s.detail}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <span>FORM / MOVE WITH INTENTION</span>
      </footer>
    </main>
  );
}
