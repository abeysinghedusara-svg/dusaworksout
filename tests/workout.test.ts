import test from "node:test";
import assert from "node:assert/strict";
import { getTargets, parseSavedState } from "../src/lib/workout.ts";
import { rotation, workouts } from "../src/data/workouts.ts";
test("eight-day rotation contains two complete PPL cycles and two recovery days", () => {
  assert.deepEqual(rotation, [
    "push",
    "pull",
    "legs",
    "rest",
    "push",
    "pull",
    "legs",
    "rest",
  ]);
  assert.equal(workouts.rest.length, 0);
});
test("a primary target takes precedence over its assisting role in another exercise", () => {
  const targets = getTargets(workouts.push);
  assert(targets.primary.includes("triceps"));
  assert(!targets.secondary.includes("triceps"));
  assert.equal(new Set(targets.primary).size, targets.primary.length);
  assert.deepEqual(getTargets([]), { primary: [], secondary: [] });
});
test("leg curl highlights hamstrings without carrying targets from the whole session", () => {
  const exercise = workouts.legs.find((e) => e.id === "leg-curl");
  assert(exercise);
  assert.deepEqual(getTargets([exercise]), {
    primary: ["hamstrings"],
    secondary: [],
  });
});
test("saved selection rejects corrupt storage and invalid days", () => {
  for (const raw of [
    null,
    "not json",
    "{}",
    "null",
    "[]",
    JSON.stringify({ day: 8, exercise: null, includeAccessories: true }),
    JSON.stringify({ day: 1.5, exercise: null, includeAccessories: true }),
  ])
    assert.equal(parseSavedState(raw), null);
  const value = { day: 2, exercise: "leg-curl", includeAccessories: false };
  assert.deepEqual(parseSavedState(JSON.stringify(value)), value);
});
