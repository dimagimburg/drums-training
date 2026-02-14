# Tasks: i18n Support with Hebrew Translation & RTL

**Input**: Design documents from `/specs/002-i18n-support/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included — no test framework in use per plan.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single SPA**: `src/` for React application source — all at repository root

---

## Phase 1: Setup (i18n Infrastructure)

**Purpose**: Create the core i18n type system, English translation bundle, translation hook, and language persistence — the foundation all user stories build on.

- [x] T001 [P] Create i18n type definitions in `src/i18n/types.ts` (Language type, Translations interface with all ~60 keys from translation-schema.json, language config with code/label/dir, supported languages array, RTL languages list)
- [x] T002 [P] Create English translation bundle in `src/i18n/en.ts` (extract all ~55 hardcoded UI strings from existing components into a typed object satisfying the Translations interface — per translation-schema.json)
- [x] T003 [P] Implement useLanguage hook in `src/hooks/useLanguage.ts` (read/write localStorage key `jonathan-drums-language`, detect browser language via navigator.language, resolve default per data-model.md detection logic, update `lang` and `dir` attributes on `<html>`)
- [x] T004 Create i18n context, LanguageProvider, useTranslation hook, and t() function in `src/i18n/index.tsx` (React context providing `{ t, language, setLanguage, dir }`, t() with interpolation `{{variable}}` and pluralization via Intl.PluralRules `_one`/`_other` suffixes, English fallback for missing keys — per research.md R1, R4)

**Checkpoint**: i18n infrastructure is ready — types, English bundle, language hook, and translation hook all exist. No components use them yet.

---

## Phase 2: Foundational (Wire Into App)

**Purpose**: Connect the i18n infrastructure to the running app so components can start using `t()`.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T005 Update `index.html` with language detection and flash prevention inline script (detect from localStorage then navigator.language, set `lang` and `dir` attributes on `<html>` before React mounts — per quickstart.md pattern, alongside existing theme flash script)
- [x] T006 Wrap App with LanguageProvider in `src/App.tsx` (import LanguageProvider from i18n, wrap HashRouter, pass language switcher slot to Header — similar to how ThemeToggle is passed)

**Checkpoint**: Foundation ready — `useTranslation()` works in any component. User story implementation can begin.

---

## Phase 3: User Story 1 — Language Switcher (Priority: P1) 🎯 MVP

**Goal**: A language switcher is visible on every page. Tapping it switches all UI text between English and Hebrew and toggles RTL/LTR layout. Preference persists across sessions. Browser language is auto-detected on first visit.

**Independent Test**: Open site → verify language switcher in header → switch language → verify text and direction change → refresh → verify persistence → switch back → verify revert.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create stub Hebrew translation bundle in `src/i18n/he.ts` (copy English values as placeholders to enable testing language switching before real translations exist)
- [x] T008 [P] [US1] Create LanguageSwitcher component in `src/components/LanguageSwitcher.tsx` and `src/components/LanguageSwitcher.css` (compact toggle button showing current language label e.g. "EN"/"עב", cycles on tap, large touch target, matches ThemeToggle styling pattern — per research.md R6)
- [x] T009 [US1] Integrate LanguageSwitcher into Header in `src/components/Header.tsx` (add alongside ThemeToggle, update `src/App.tsx` to pass LanguageSwitcher as prop — header layout: `[← Back] [Title] [LanguageSwitcher] [ThemeToggle]`)
- [x] T010 [P] [US1] Update `src/components/Home.tsx` to use t() for all hardcoded strings (title, subtitle, Training button, Library button)
- [x] T011 [P] [US1] Update `src/components/Training.tsx` to use t() for all hardcoded strings (empty state title/message, error title/message)
- [x] T012 [P] [US1] Update `src/components/ExerciseStep.tsx` to use t() for all hardcoded strings (progress text with interpolation, pick lesson heading, pick for me button, done button, previous button, start over button, change lesson button, no lessons empty state)
- [x] T013 [P] [US1] Update `src/components/CompletionScreen.tsx` to use t() for UI strings and load motivational messages by language (title, start again button, fallback message; import language-specific messages JSON based on current language)
- [x] T014 [P] [US1] Update `src/components/Library.tsx` to use t() for all hardcoded strings (title, lesson count with pluralization, search result count with pluralization, filter labels, empty state messages, no results messages, filter aria-label)
- [x] T015 [P] [US1] Update `src/components/LibraryList.tsx` to use t() for all hardcoded strings (section headings: Songs/Drum Beats/Fundamentals, empty state title/message)
- [x] T016 [P] [US1] Update `src/components/LessonDetail.tsx` and `src/components/LessonCard.tsx` to use t() for type labels (Song/Drum Beat/Fundamental), difficulty labels (beginner/intermediate/advanced), links heading, back button, not found state
- [x] T017 [P] [US1] Update `src/components/SearchBar.tsx` and `src/hooks/useSearch.ts` to use t() for search placeholder, aria-labels, clear button aria-label, match snippets (matched in title/description/link)
- [x] T018 [P] [US1] Update `src/components/ThemeToggle.tsx` to use t() for theme names (Ocean/Sunset), toggle aria-label, and toggle title
- [x] T019 [P] [US1] Update `src/components/YouTubeEmbed.tsx` to use t() for "Open on YouTube" link text and fallback link text
- [x] T020 [US1] Wire language switching end-to-end: verify switching updates all visible text, html `lang` and `dir` attributes toggle correctly, localStorage persists preference, browser language detection works on fresh visit

**Checkpoint**: Language switcher fully functional — switching between English and stub Hebrew works across all pages. All components use t() for UI text. Core MVP is deliverable.

---

## Phase 4: User Story 2 — Full Hebrew Translation + RTL (Priority: P2)

**Goal**: All UI strings have real Hebrew translations. All 85 motivational messages have Hebrew equivalents. Layout is properly mirrored in RTL with correct CSS and directional elements.

**Independent Test**: Set language to Hebrew → navigate all pages (Home, Training full flow, Library browse/search/detail, Completion) → verify all UI text is Hebrew, layout is RTL, arrows point correctly, no English leaks except parent-authored content.

### Implementation for User Story 2

- [x] T021 [US2] Write complete Hebrew translations for all keys in `src/i18n/he.ts` (replace stub English values with real Hebrew text for all ~60 keys — per translation-schema.json)
- [x] T022 [P] [US2] Create 85 Hebrew motivational messages in `src/data/motivational-messages.he.json` (per motivational-messages-schema.json, matching the tone and encouragement level of the English messages)
- [x] T023 [P] [US2] Convert physical CSS properties to logical properties: `margin-left` → `margin-inline-start` in `src/components/LibraryList.css`, `padding-left` → `padding-inline-start` in `src/components/Library.css`, `top:0;left:0` → `inset:0` in `src/components/YouTubeEmbed.css`, `text-align:left` → `text-align:start` in `src/components/ExerciseStep.css` — per research.md R2
- [x] T024 [US2] Handle directional arrow characters in components: update translated strings or add direction-aware rendering for `←`/`→` arrows in `src/components/ExerciseStep.tsx` and `src/components/LessonDetail.tsx`, review `flex-direction: row-reverse` in `src/components/ExerciseStep.css` for RTL correctness
- [x] T025 [US2] RTL layout verification pass: navigate all pages in Hebrew, verify flex layouts are mirrored, text is right-aligned, navigation flow is correct, progress indicators read right-to-left, no overflow or truncation from Hebrew text length

**Checkpoint**: Full Hebrew experience works — all text translated, RTL layout correct, motivational messages in Hebrew.

---

## Phase 5: User Story 3 — Theme × Language Compatibility (Priority: P3)

**Goal**: All 4 theme × language combinations render correctly with no visual regressions.

**Independent Test**: For each combo (Ocean/English, Ocean/Hebrew, Sunset/English, Sunset/Hebrew), navigate all pages → verify no visual glitches, text overflow, or broken layouts.

### Implementation for User Story 3

- [x] T026 [US3] Visual audit and fix: test all 4 theme × language combinations (Ocean/English, Ocean/Hebrew, Sunset/English, Sunset/Hebrew) across Home, Training, Library, Lesson Detail, and Completion pages — fix any layout glitches, text overflow, color contrast issues, or broken alignment found

**Checkpoint**: All user stories complete — language switcher, Hebrew translations, RTL layout, and theme compatibility all verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge case hardening, validation, and final verification

- [x] T027 Edge case hardening: verify localStorage unavailable fallback (defaults to English/LTR), missing translation key fallback (shows English string), empty motivational messages array handling (uses fallback message), mixed-direction text rendering (English content in Hebrew UI)
- [x] T028 Run quickstart.md validation: verify `npm run dev`, `npm run build`, `npm run preview` all work correctly with i18n changes; verify no TypeScript errors from missing translation keys

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 Language Switcher (Phase 3)**: Depends on Foundational — can start immediately after Phase 2
- **US2 Hebrew + RTL (Phase 4)**: Depends on US1 (components must use t() before real translations matter)
- **US3 Theme Compat (Phase 5)**: Depends on US2 (need Hebrew + RTL to test combinations)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **US2 (P2)**: Depends on US1 — components must be using t() for Hebrew translations to have effect
- **US3 (P3)**: Depends on US2 — needs Hebrew + RTL active to test theme combinations

### Within Each User Story

- Shared/utility components before container components
- Stub translations before real translations
- Core switching mechanism before component migration
- Component migration before end-to-end verification

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 can all run in parallel (different files)
- **Phase 3**: T007 and T008 can run in parallel. T010–T019 can ALL run in parallel (different component files, same pattern)
- **Phase 4**: T022 and T023 can run in parallel (different files)
- **Cross-phase**: None — phases are sequential due to US2 depending on US1

---

## Parallel Example: User Story 1

```bash
# Launch stub and component in parallel (no dependencies between them):
Task: "Create stub Hebrew bundle in src/i18n/he.ts"                          # T007
Task: "Create LanguageSwitcher component in src/components/LanguageSwitcher"  # T008

# Then integrate switcher into header:
Task: "Integrate LanguageSwitcher into Header"                                # T009

# Then launch ALL component migrations in parallel (different files, same pattern):
Task: "Update Home.tsx to use t()"                                           # T010
Task: "Update Training.tsx to use t()"                                       # T011
Task: "Update ExerciseStep.tsx to use t()"                                   # T012
Task: "Update CompletionScreen.tsx to use t()"                               # T013
Task: "Update Library.tsx to use t()"                                        # T014
Task: "Update LibraryList.tsx to use t()"                                    # T015
Task: "Update LessonDetail.tsx and LessonCard.tsx to use t()"               # T016
Task: "Update SearchBar.tsx and useSearch.ts to use t()"                     # T017
Task: "Update ThemeToggle.tsx to use t()"                                    # T018
Task: "Update YouTubeEmbed.tsx to use t()"                                   # T019

# Then end-to-end verification:
Task: "Wire language switching end-to-end"                                    # T020
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (i18n infrastructure)
2. Complete Phase 2: Foundational (wire into app)
3. Complete Phase 3: User Story 1 — Language Switcher
4. **STOP and VALIDATE**: Switching between English and stub Hebrew works on all pages
5. Deploy if ready — language infrastructure is in place

### Incremental Delivery

1. Setup + Foundational → i18n infrastructure ready, app still in English
2. Add US1 (Language Switcher) → Test switching → **Deploy (MVP!)**
3. Add US2 (Hebrew + RTL) → Test Hebrew experience → Deploy
4. Add US3 (Theme Compat) → Test all combinations → Deploy
5. Polish → Final deploy

Each increment adds value without breaking previous functionality.

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 28 |
| **Phase 1 — Setup** | 4 tasks |
| **Phase 2 — Foundational** | 2 tasks |
| **Phase 3 — US1 Language Switcher (P1)** | 14 tasks |
| **Phase 4 — US2 Hebrew + RTL (P2)** | 5 tasks |
| **Phase 5 — US3 Theme Compat (P3)** | 1 task |
| **Phase 6 — Polish** | 2 tasks |
| **Parallel opportunities** | 16 tasks marked [P] |
| **Suggested MVP scope** | Phases 1–3 (US1 only: 20 tasks) |
