# Implementation Plan: i18n Support with Hebrew Translation & RTL

**Branch**: `002-i18n-support` | **Date**: 2026-02-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-i18n-support/spec.md`

## Summary

Add a language switcher to every page that lets the user choose between English and Hebrew. When Hebrew (or any RTL language) is selected, the layout direction flips to RTL automatically. All ~55 UI strings and 85 motivational messages get Hebrew translations. Language preference persists in localStorage and is auto-detected from the browser on first visit. Implemented as a lightweight custom i18n solution (no external i18n library) to stay aligned with the Simplicity First principle.

## Technical Context

**Language/Version**: TypeScript 5.9 / React 19 (Vite 7.3)  
**Primary Dependencies**: react 19.2, react-router-dom 7.13, fuse.js 7.1 — no new runtime dependencies added  
**Storage**: localStorage (browser) — same pattern as existing theme preference  
**Testing**: Manual browser testing (no test framework in use)  
**Target Platform**: Client-side SPA, static deployment on GitHub Pages  
**Project Type**: Single SPA (Vite + React)  
**Performance Goals**: Language switching under 200ms with no flicker or layout shift  
**Constraints**: No server-side rendering, no external services, no new runtime dependencies  
**Scale/Scope**: ~55 UI strings across 13 components, 85 motivational messages, 2 languages (English, Hebrew)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | **PASS** | Custom i18n with plain TypeScript — no i18n library. Translation files are typed TS objects. No new runtime dependencies. |
| II. Static by Default | **PASS** | All translations are static files bundled at build time. No external translation service. Language preference in localStorage. |
| III. Progressive Enhancement | **PASS** | Inline script in index.html prevents flash of wrong language (same pattern as theme). Falls back to English if localStorage is unavailable. |
| IV. Kid-First Design | **PASS** | Language switcher uses large, clear labels. Layout direction adapts automatically — no separate RTL toggle for the kid to understand. |

No violations. No complexity tracking needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-i18n-support/
├── plan.md              # This file
├── research.md          # Phase 0: i18n approach, RTL strategy, pluralization
├── data-model.md        # Phase 1: translation bundle shape, language config
├── quickstart.md        # Phase 1: dev guide for adding/testing translations
├── contracts/           # Phase 1: translation file schema
│   └── translation-schema.json
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── i18n/
│   ├── index.ts              # i18n context, provider, useTranslation hook
│   ├── types.ts              # TranslationKey type, Language type, config
│   ├── en.ts                 # English translation bundle
│   └── he.ts                 # Hebrew translation bundle
├── data/
│   ├── motivational-messages.json      # English messages (existing)
│   └── motivational-messages.he.json   # Hebrew messages (new)
├── hooks/
│   └── useLanguage.ts        # Language preference hook (localStorage, detection)
├── components/
│   └── LanguageSwitcher.tsx   # Language selector component (new)
│   └── LanguageSwitcher.css   # Styles (new)
└── ... (existing components updated to use useTranslation)
```

**Structure Decision**: New `src/i18n/` directory for translation infrastructure. Follows existing patterns: hooks in `src/hooks/`, components in `src/components/`, data in `src/data/`. Hebrew motivational messages in a separate JSON file alongside the existing English one.
