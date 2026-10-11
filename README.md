# FORM — Workout Schedule Viewer

A responsive Next.js App Router app for exploring a push / pull / legs training rotation. Built with Next.js 16, React 19, TypeScript, plain CSS, and React-rendered SVG anatomy.

## Run locally

Requires Node.js 22.18 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. To use another port: `npm run dev -- --port 3001`.

```sh
npm test
npm run typecheck
npm run build
```

The production build generates `out/` for a static web host. Serve this directory over HTTP; opening index.html directly as a file will not resolve Next.js assets correctly. No database, account, API keys, or environment variables are required.

## Folder architecture

```text
workout-viewer/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, metadata, viewport
│   │   ├── page.tsx                   # Home route; server component
│   │   └── globals.css                # Visual system and responsive layout
│   ├── components/workout/
│   │   ├── workout-viewer.tsx         # Client state and session composition
│   │   ├── day-selector.tsx           # Accessible eight-day navigation
│   │   ├── exercise-list.tsx          # Exercise selection and prescriptions
│   │   └── muscle-map.tsx             # Front/back SVG highlights
│   ├── data/
│   │   ├── workouts.ts               # Routine, muscle names, references
│   │   └── anatomy.json              # Reusable anatomy geometry
│   ├── lib/
│   │   └── workout.ts                # Target aggregation, saved-state validation
│   └── types/
│       └── workout.ts                # Shared domain types
├── public/                           # Future static assets
├── scripts/
│   └── dev.mjs                       # Portable dev launcher with polling
├── tests/
│   └── workout.test.ts               # Routine, targets, and persistence checks
├── next.config.ts                    # Static export configuration
├── tsconfig.json                     # Strict TypeScript and @/ imports
├── package.json
├── package-lock.json
└── README.md
```

## Features

- Eight-day rotation: push, pull, legs, rest, repeated.
- Select a session or individual exercise to highlight main and assisting muscles.
- Toggle optional isolation exercises without losing the compound foundation.
- Show working sets, repetition ranges, and concise exercise cues.
- Recovery-day view with a next-session shortcut.
- Remember selected day, exercise, and accessories on the same browser/device. Denied or corrupt browser storage falls back safely.
- Four-column day selector on phones; two-column session/map layout on larger screens.
- Native buttons and checkbox controls, focus indicators, live target labels, and reduced-motion support.
- Research links and a clear distinction between an example routine and a proven universal optimum.

## Editing

Change exercises and the rotation in `src/data/workouts.ts`. Domain types live in `src/types/workout.ts`. Anatomy paths are data, while their highlighting behavior lives in `muscle-map.tsx` and `src/lib/workout.ts`. Update styling in `src/app/globals.css`.

The app uses React elements instead of embedding the previous HTML in an iframe. The original downloadable HTML remains a separate file, with its sandbox and CSP untouched. This new application has its own Next.js asset/runtime requirements.

## Verification and local environment

`npm test`, `npm run typecheck`, and `npm run build` passed during development. The default Turbopack file watcher could not start in this desktop sandbox, so the dev and build scripts explicitly use Webpack. Development uses polling to avoid native watcher limits. Browser checks verified leg-day and leg-curl selection, accessory removal, recovery days, saved state after reload, and no horizontal overflow at 320px and 390px widths. A physical-device review has not been performed.

## Next.js documentation

- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/getting-started/project-structure
- https://nextjs.org/docs/app/guides/static-exports

This project is developed locally. It has not been deployed to the existing Sites project.
