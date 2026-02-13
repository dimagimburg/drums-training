# Tasks: Jonathan's Drums Training Site

**Input**: Design documents from `/specs/001-drums-training-site/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included — testing was not explicitly requested in the feature specification. Vitest + React Testing Library are available in the tech stack if tests are desired later.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single SPA**: `src/` for React application source, `content/` for YAML data, `tools/` for build scripts, `public/` for static assets — all at repository root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize the Vite + React + TypeScript project and install all dependencies

- [x] T001 Initialize Vite project with React + TypeScript template and create folder structure (`src/components/`, `src/hooks/`, `src/data/`, `content/`, `tools/`, `public/`)
- [x] T002 Install runtime dependencies: `react-router-dom`, `fuse.js`, `@modyfi/vite-plugin-yaml`
- [x] T003 Install dev dependencies: `js-yaml`, `ajv`, `@types/js-yaml`
- [x] T004 [P] Configure Vite with YAML plugin and GitHub Pages base path in `vite.config.ts`
- [x] T005 [P] Configure TypeScript with YAML module type declarations in `tsconfig.json` and `src/vite-env.d.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, content files, data loading, routing, and global styles that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create TypeScript interfaces (Lesson, Exercise, TrainingConfig, TrainingSession, ResolvedExercise, MotivationalMessages) in `src/types.ts` per data-model.md
- [x] T007 [P] Create sample `content/lessons.yaml` with example lessons covering all 3 types (song, drum-beat, fundamental) per lesson-schema.json
- [x] T008 [P] Create sample `content/training.yaml` with 4 exercises referencing sample lessons per training-schema.json
- [x] T009 [P] Create `index.html` with root div, `<noscript>` message, and inline theme flash prevention script (reads localStorage, sets `data-theme` before React mounts)
- [x] T010 [P] Create global styles in `src/index.css` (CSS reset, responsive base, typography, 48px+ touch targets, mobile-first layout)
- [x] T011 [P] Create theme definitions in `src/themes.css` with at least two themes (ocean, sunset) using CSS custom properties on `[data-theme]` selector
- [x] T012 Implement data loading module in `src/data/loadContent.ts` (import YAML via vite-plugin-yaml, resolve exercise→lesson references, export typed content, handle broken references with clear errors)
- [x] T013 [P] Create Home component in `src/components/Home.tsx` (two large, kid-friendly buttons: Training and Library — FR-001, FR-002)
- [x] T014 [P] Create Header component shell in `src/components/Header.tsx` (back button, app title, ThemeToggle placeholder slot — FR-003)
- [x] T015 Create root App component with HashRouter in `src/App.tsx` (routes: `/` → Home, `/training` → Training, `/library` → Library, `/lesson/:id` → LessonDetail — per research.md R5)
- [x] T016 Create app entry point in `src/main.tsx` (render App into root div) and base app styles in `src/App.css`

**Checkpoint**: Foundation ready — project runs with `npm run dev`, shows Home page with two buttons, routing works. User story implementation can now begin.

---

## Phase 3: User Story 1 — Kid Completes the Training Routine (Priority: P1) 🎯 MVP

**Goal**: Jonathan can open Training, step through exercises sequentially, pick lessons (manually or randomly), see lesson content, mark exercises done, and see a motivational message on completion. Progress survives page refresh.

**Independent Test**: Configure 4 exercises with sample lessons → walk through complete flow using both manual and random lesson selection → verify deduplication, progress persistence, and completion message.

### Implementation for User Story 1

- [x] T017 [P] [US1] Generate 100 kid-friendly motivational messages in `src/data/motivational-messages.json` per messages-schema.json
- [x] T018 [P] [US1] Create EmptyState component in `src/components/EmptyState.tsx` (friendly messages for empty training config, empty library, errors — FR-005)
- [x] T019 [P] [US1] Create YouTubeEmbed component in `src/components/YouTubeEmbed.tsx` (responsive 16:9 iframe using youtube-nocookie.com, "Open on YouTube" fallback link — per research.md R7, FR-033)
- [x] T020 [US1] Create LessonDetail component in `src/components/LessonDetail.tsx` (title, description, difficulty badge, YouTube embed for songs, links list — FR-015, FR-033, FR-034, FR-035, FR-060, FR-061). This component is shared with Library (US2).
- [x] T021 [US1] Implement useTrainingSession hook in `src/hooks/useTrainingSession.ts` (exercise flow state machine, lesson selection tracking, deduplication logic with override when no fresh options, sessionStorage persistence — FR-014, FR-019, FR-020)
- [x] T022 [US1] Create ExerciseStep component in `src/components/ExerciseStep.tsx` (exercise title, description, lesson list with large tap targets, "Pick for me" random button, "Done" button with debounce — FR-010 through FR-016)
- [x] T023 [US1] Create CompletionScreen component in `src/components/CompletionScreen.tsx` (random motivational message from pool, celebratory visual treatment, "Start Again" button — FR-017, FR-020)
- [x] T024 [US1] Create Training container component in `src/components/Training.tsx` (orchestrates ExerciseStep flow, displays CompletionScreen on finish, shows EmptyState if no exercises configured — FR-010)
- [x] T025 [US1] Wire Training route end-to-end: integrate with App.tsx routing, handle edge cases (all lessons used, single lesson in list, empty config, broken references — spec Edge Cases section)

**Checkpoint**: User Story 1 fully functional — kid can complete entire training routine. Core MVP is deliverable.

---

## Phase 4: User Story 2 — Kid Browses the Library (Priority: P1)

**Goal**: Jonathan can open the Library, see all lessons grouped by type, tap a lesson to see full details, and navigate back easily.

**Independent Test**: Populate library with lessons of each type → browse by type → tap into lesson detail → verify back navigation works.

### Implementation for User Story 2

- [x] T026 [P] [US2] Create LessonCard component in `src/components/LessonCard.tsx` (lesson title, type indicator, difficulty badge, card layout with large tap target — FR-002, FR-039)
- [x] T027 [US2] Create LibraryList component in `src/components/LibraryList.tsx` (lessons grouped by type with clear visual distinctions, renders LessonCards — FR-031, FR-039)
- [x] T028 [US2] Create Library container component in `src/components/Library.tsx` (loads all lessons, renders LibraryList, shows EmptyState if no lessons — FR-030)
- [x] T029 [US2] Wire Library and Lesson detail routes: integrate Library into App.tsx, ensure `/lesson/:id` navigates from both Library and Training, verify back navigation (FR-003, edge case: browser back/forward)

**Checkpoint**: User Stories 1 AND 2 both work independently — Training and Library are complete.

---

## Phase 5: User Story 6 — Kid Switches Visual Theme (Priority: P1)

**Goal**: Jonathan can switch between visual themes from any page. The change is instant and persists across sessions.

**Independent Test**: Toggle themes → verify instant visual change → close and reopen browser → verify theme persists. Test with localStorage unavailable → verify fallback to default.

### Implementation for User Story 6

- [x] T030 [US6] Implement useTheme hook in `src/hooks/useTheme.ts` (read/write localStorage key `jonathan-drums-theme`, cycle through available themes, fallback to default if invalid/missing — FR-071, FR-074)
- [x] T031 [US6] Create ThemeToggle component in `src/components/ThemeToggle.tsx` (theme switcher button with current theme indicator, toggles `data-theme` attribute on `<html>` — FR-072, FR-073)
- [x] T032 [US6] Integrate ThemeToggle into Header component in `src/components/Header.tsx` (accessible from every page — FR-072, FR-075)

**Checkpoint**: All P1 stories complete — Training, Library, and Theme Switching all work.

---

## Phase 6: User Story 3 — Kid Searches the Library (Priority: P2)

**Goal**: Jonathan can search the library by typing partial or misspelled terms. Results update live with matching text highlighted.

**Independent Test**: Populate library with 10+ lessons → search "bili" → verify "Billie Jean" appears → search "slow pract" → verify matching lesson appears → search gibberish → verify friendly empty message.

### Implementation for User Story 3

- [x] T033 [US3] Implement useSearch hook in `src/hooks/useSearch.ts` (Fuse.js integration with weighted keys: title×2, description×1, links.title×0.5, threshold 0.4, includeMatches for highlighting — per research.md R3, FR-036)
- [x] T034 [US3] Create SearchBar component in `src/components/SearchBar.tsx` (search input with clear button, character limit, live/incremental triggering — FR-037, edge case: very long queries)
- [x] T035 [US3] Integrate search into Library: connect SearchBar and useSearch to `src/components/Library.tsx`, display results with type indicator and match snippet, show friendly "No lessons found" empty state — FR-037, FR-038

**Checkpoint**: Library now supports fuzzy search — all P1 + P2-search stories work.

---

## Phase 7: User Story 4 — Parent Updates Training Content (Priority: P2)

**Goal**: A parent can add new lessons and exercises by editing YAML files (directly or via LLM chat), with validation catching errors before build.

**Independent Test**: Add a new lesson to lessons.yaml → reference it in training.yaml → run validation → rebuild → verify lesson appears in Library and Training. Introduce a broken reference → verify clear error message.

### Implementation for User Story 4

- [x] T036 [P] [US4] Create content validation script in `tools/validate-content.js` (uses js-yaml + ajv to validate: YAML syntax, required fields per lesson type via lesson-schema.json, exercise schema via training-schema.json, lesson reference integrity — FR-054, per research.md R9)
- [x] T037 [P] [US4] Create Cursor rule for LLM-assisted content editing in `.cursor/rules/content-management.mdc` (schema context, file locations, validation rules, example entries — FR-052)
- [x] T038 [US4] Add npm scripts to `package.json`: `validate` (runs validate-content.js), `prebuild` (runs validate before build), update `build` script — per research.md R2, quickstart.md
- [x] T039 [US4] Add inline comments to `content/lessons.yaml` and `content/training.yaml` explaining each field and acceptable values (FR-053)

**Checkpoint**: Content management workflow complete — parent can add/edit content with validation safety net.

---

## Phase 8: User Story 5 — Parent Adds Library-Only Content (Priority: P3)

**Goal**: A parent can add lessons to the library that are not referenced by any training exercise — they appear in Library and search but not in Training.

**Independent Test**: Add a song lesson to lessons.yaml without referencing it in any exercise → rebuild → verify it appears in Library and search results → verify it does NOT appear in any training exercise list.

### Implementation for User Story 5

- [ ] T040 [US5] Add a library-only sample lesson (a song with no exercise reference) to `content/lessons.yaml` and verify it appears only in Library browse and search, not in any Training exercise

**Checkpoint**: All user stories complete.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Deployment, responsiveness, edge case hardening, and final validation

- [ ] T041 [P] Create GitHub Actions deployment workflow in `.github/workflows/deploy.yml` (install → validate → build → deploy dist/ to gh-pages via peaceiris/actions-gh-pages — per research.md R6)
- [ ] T042 [P] Responsive design pass: verify all components work on phone (320px), tablet (768px), and desktop (1024px+) — no horizontal scrolling, no broken layouts (FR-006)
- [ ] T043 Edge case hardening across the app: broken lesson references show clear error (not crash), double-tap "Done" debounce, localStorage unavailable fallback, browser back/forward predictability, "Pick for me" with one option (spec Edge Cases section)
- [ ] T044 Accessibility and kid-UX pass: verify all touch targets ≥48px, clear loading states (FR-005), `<noscript>` message works, contrast ratios readable in all themes (FR-075)
- [ ] T045 Run quickstart.md validation: verify `npm run dev`, `npm run validate`, `npm run build`, `npm run preview` all work correctly end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 Training (Phase 3)**: Depends on Foundational — can start immediately after Phase 2
- **US2 Library (Phase 4)**: Depends on Foundational — reuses LessonDetail from US1 but can start in parallel if LessonDetail is prioritized
- **US6 Themes (Phase 5)**: Depends on Foundational — can run in parallel with US1/US2
- **US3 Search (Phase 6)**: Depends on US2 (Library must exist to add search)
- **US4 Content Mgmt (Phase 7)**: Depends on Foundational (validation script works against content files) — can run in parallel with US1-US3
- **US5 Library-Only (Phase 8)**: Depends on US2 (must verify lesson appears in Library)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories
- **US2 (P1)**: Can start after Foundational — reuses LessonDetail.tsx and YouTubeEmbed.tsx from US1
- **US6 (P1)**: Can start after Foundational — independent of US1 and US2
- **US3 (P2)**: Depends on US2 — search is added to the existing Library
- **US4 (P2)**: Can start after Foundational — independent of other stories
- **US5 (P3)**: Depends on US2 — needs Library to verify behavior

### Within Each User Story

- Shared/utility components before container components
- Hooks before components that use them
- Container components last (they compose everything)
- Core implementation before integration/wiring

### Parallel Opportunities

- **Phase 1**: T004 and T005 can run in parallel (different config files)
- **Phase 2**: T007, T008, T009, T010, T011 can all run in parallel (different files). T013 and T014 can run in parallel.
- **Phase 3**: T017, T018, T019 can all run in parallel (different files, no dependencies)
- **Phase 4**: T026 can start while T027 is being planned
- **Phase 5**: All 3 tasks are sequential (hook → component → integration)
- **Phase 7**: T036 and T037 can run in parallel (different files)
- **Phase 9**: T041, T042, T044 can run in parallel
- **Cross-phase**: US6 (Phase 5) can run in parallel with US1 (Phase 3) or US2 (Phase 4) since they touch different files

---

## Parallel Example: User Story 1

```bash
# Launch parallel utility components (no dependencies between them):
Task: "Generate motivational messages in src/data/motivational-messages.json"      # T017
Task: "Create EmptyState component in src/components/EmptyState.tsx"                # T018
Task: "Create YouTubeEmbed component in src/components/YouTubeEmbed.tsx"            # T019

# Then sequential (each depends on prior):
Task: "Create LessonDetail component in src/components/LessonDetail.tsx"            # T020 (needs T019)
Task: "Implement useTrainingSession hook in src/hooks/useTrainingSession.ts"        # T021
Task: "Create ExerciseStep component in src/components/ExerciseStep.tsx"            # T022 (needs T020, T021)
Task: "Create CompletionScreen component in src/components/CompletionScreen.tsx"    # T023 (needs T017)
Task: "Create Training container in src/components/Training.tsx"                    # T024 (needs T022, T023)
Task: "Wire Training route end-to-end"                                              # T025 (needs T024)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 — Training Routine
4. **STOP and VALIDATE**: Kid can complete a full training session
5. Deploy to GitHub Pages if ready — this alone delivers the core value

### Incremental Delivery

1. Setup + Foundational → Project runs, Home page visible
2. Add US1 (Training) → Test independently → **Deploy (MVP!)**
3. Add US2 (Library) → Test independently → Deploy
4. Add US6 (Themes) → Test independently → Deploy
5. Add US3 (Search) → Test independently → Deploy
6. Add US4 (Content Mgmt tooling) → Test validation → Deploy
7. Add US5 (Library-only content) → Verify behavior → Deploy
8. Polish → Final deploy

Each increment adds value without breaking previous stories.

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 45 |
| **Phase 1 — Setup** | 5 tasks |
| **Phase 2 — Foundational** | 11 tasks |
| **Phase 3 — US1 Training (P1)** | 9 tasks |
| **Phase 4 — US2 Library (P1)** | 4 tasks |
| **Phase 5 — US6 Themes (P1)** | 3 tasks |
| **Phase 6 — US3 Search (P2)** | 3 tasks |
| **Phase 7 — US4 Content Mgmt (P2)** | 4 tasks |
| **Phase 8 — US5 Library-Only (P3)** | 1 task |
| **Phase 9 — Polish** | 5 tasks |
| **Parallel opportunities** | 18 tasks marked [P] |
| **Suggested MVP scope** | Phases 1–3 (US1 only: 25 tasks) |
