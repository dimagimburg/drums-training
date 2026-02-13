# Implementation Plan: Jonathan's Drums Training Site

**Branch**: `001-drums-training-site` | **Date**: 2026-02-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-drums-training-site/spec.md`

## Summary

Build a React SPA for an 8-year-old drummer that serves two sections: a sequential Training routine (configurable exercises referencing library lessons, with lesson deduplication, random pick, and motivational completion messages) and a searchable Library (fuzzy search across Songs, Drum Beats, and Fundamental Base Beats with embedded YouTube for songs). Content is managed via YAML config files and a CLI scaffolding tool. The site compiles to static files, deploys to GitHub Pages, supports theme switching, and is fully responsive.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19  
**Primary Dependencies**: React, React Router (HashRouter), Vite, Fuse.js, vite-plugin-yaml  
**Storage**: YAML files (content source of truth), localStorage (theme preference), sessionStorage (training progress), JSON file (motivational messages)  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web — modern evergreen browsers (Chrome, Safari, Firefox), all device sizes  
**Project Type**: Single SPA (frontend-only, no backend)  
**Performance Goals**: <3s initial load, <100ms theme switch, instant fuzzy search on <200 lessons  
**Constraints**: Static files only, no SSR, no backend, no external services except YouTube embeds  
**Scale/Scope**: 1 user, ~10-50 lessons initially, ~4-8 exercises, 2+ themes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | PASS | React justified in constitution v1.1.0. No meta-frameworks (no Next.js/Remix). Dependencies are minimal: React, Vite, Fuse.js, React Router, YAML plugin. Each has a concrete need. |
| II. Static by Default | PASS | Vite builds to static files (HTML/CSS/JS). YAML content compiled at build time. Deployed to GitHub Pages. No server runtime. |
| III. Progressive Enhancement | PASS | SPA requires JS (acknowledged in constitution). `<noscript>` message will be included. Progressive loading states for content. |
| IV. Kid-First Design | PASS | Large touch targets (48px+), flat navigation (max 2 levels), responsive layout, theme switching, simple clear labels. |
| Technology Decisions table | PASS | All choices align: React SPA, no SSR, YAML config, GitHub Pages, mobile-first responsive, localStorage. |

**Gate result**: PASS — no violations. Proceeding to Phase 0.

### Post-Design Re-Check (after Phase 1)

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | PASS | Dependencies: React, React Router, Vite, Fuse.js, vite-plugin-yaml. Dev-only: js-yaml, ajv. Each justified in research.md. No meta-frameworks. No SSR. |
| II. Static by Default | PASS | Vite outputs static files to `dist/`. YAML compiled at build time (no runtime parsing). Deployed to GitHub Pages. No server runtime. |
| III. Progressive Enhancement | PASS | `<noscript>` message planned in index.html. Loading states for content. |
| IV. Kid-First Design | PASS | Flat component structure (~13 components). Hash routing for reliable back-button. Large touch targets. Responsive CSS. Theme switching via CSS custom properties. |
| Technology Decisions table | PASS | All design choices match the table. No new technology introduced beyond what's documented. |

**Post-design gate result**: PASS — design aligns with constitution v1.1.0.

## Project Structure

### Documentation (this feature)

```text
specs/001-drums-training-site/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── lesson-schema.json
│   ├── training-schema.json
│   └── messages-schema.json
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
jonathan-drums/
├── content/                        # YAML content files (parent edits these)
│   ├── lessons.yaml                # All library lessons (single source of truth)
│   └── training.yaml               # Training routine config (exercises + lesson refs)
├── src/                            # React application source
│   ├── components/                 # React components (flat — no sub-folders)
│   │   ├── Home.tsx                # Landing page: Training + Library buttons
│   │   ├── Training.tsx            # Training section container + exercise flow
│   │   ├── ExerciseStep.tsx        # Single exercise: lesson list + pick-for-me
│   │   ├── LessonDetail.tsx        # Full lesson view (shared: training + library)
│   │   ├── CompletionScreen.tsx    # Motivational message on routine completion
│   │   ├── Library.tsx             # Library section container
│   │   ├── LibraryList.tsx         # Lesson cards grouped by type
│   │   ├── SearchBar.tsx           # Fuzzy search input
│   │   ├── LessonCard.tsx          # Lesson summary card for lists
│   │   ├── YouTubeEmbed.tsx        # YouTube iframe embed component
│   │   ├── ThemeToggle.tsx         # Theme switcher control
│   │   ├── Header.tsx              # Shared header: back button + theme toggle
│   │   └── EmptyState.tsx          # Friendly empty/error states
│   ├── hooks/                      # Custom React hooks
│   │   ├── useTheme.ts             # Theme state + localStorage persistence
│   │   ├── useTrainingSession.ts   # Exercise flow state + sessionStorage
│   │   └── useSearch.ts            # Fuse.js search integration
│   ├── data/                       # Data loading and processing
│   │   ├── loadContent.ts          # Import YAML, validate, resolve references
│   │   └── motivational-messages.json  # 100 kid-friendly messages
│   ├── types.ts                    # TypeScript interfaces (Lesson, Exercise, etc.)
│   ├── themes.css                  # CSS custom properties per theme
│   ├── App.tsx                     # Root component with HashRouter
│   ├── App.css                     # App-level styles
│   ├── main.tsx                    # Entry point: render App
│   └── index.css                   # Global styles, resets, responsive base
├── tools/                          # Build tools
│   └── validate-content.js         # Build-time YAML validation + ref integrity
├── .cursor/
│   └── rules/
│       └── content-management.mdc  # Cursor rule for LLM-assisted content editing
├── public/                         # Static assets (favicon, etc.)
├── index.html                      # HTML entry with <noscript> message
├── package.json                    # Dependencies, scripts
├── vite.config.ts                  # Vite config with YAML plugin
├── tsconfig.json                   # TypeScript config
└── .github/
    └── workflows/
        └── deploy.yml              # GitHub Pages deployment action
```

**Structure Decision**: Single SPA (no backend, no separate packages). Flat `components/` folder — the app has ~13 components, not enough to justify sub-folders (constitution: "flat and obvious until complexity justifies nesting"). Content YAML files are in `content/` at the repo root, separate from the React source, making them easy for a parent to find and edit. No CLI tool — content management is done via LLM chat in Cursor, guided by a Cursor rule that knows the YAML schema.

## Complexity Tracking

> No violations to justify. All choices align with the constitution.

*Table intentionally empty — no complexity violations.*
