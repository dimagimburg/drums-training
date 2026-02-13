# Research: Jonathan's Drums Training Site

**Feature**: `001-drums-training-site`  
**Date**: 2026-02-13  
**Purpose**: Resolve all technical decisions before Phase 1 design

---

## R1. Build Tool — Vite

**Decision**: Vite 6.x  
**Rationale**: The standard build tool for modern React SPAs. Zero-config for React+TypeScript. Fast dev server with HMR. Produces optimized static files. No SSR capabilities tempting future scope creep (unlike Next.js). Aligns with constitution Principle I (simplest viable approach).  
**Alternatives considered**:
- Create React App — deprecated, no longer maintained
- Parcel — less ecosystem support, similar simplicity
- Webpack — more complex configuration, slower builds
- Next.js / Remix — prohibited by constitution (no meta-frameworks, no SSR)

## R2. YAML Import Strategy

**Decision**: `@modyfi/vite-plugin-yaml` for build-time YAML import + custom validation script as pre-build step  
**Rationale**: The Vite plugin imports YAML files directly as JavaScript objects during compilation. No runtime YAML parser needed in the browser bundle (smaller bundle, faster load). YAML files in `content/` are imported by `src/data/loadContent.ts` and type-checked at compile time. A separate `tools/validate-content.js` script runs as a pre-build step to catch validation errors (required fields, lesson reference integrity) with human-readable messages before the build even starts.  
**Alternatives considered**:
- Runtime YAML parsing (js-yaml in browser) — adds ~30KB to bundle, slower load, runtime errors instead of build-time errors
- Custom build script converting YAML→JSON before Vite — extra build step, two copies of truth
- JSON config files instead of YAML — user specifically chose YAML for readability and comments

**Build pipeline**:
```
npm run validate  →  npm run build
(validate-content.js)    (vite build)
```
Both are combined in `npm run build` via a `prebuild` script.

## R3. Fuzzy Search Library

**Decision**: Fuse.js 7.x  
**Rationale**: Lightweight (~5KB gzipped), client-side, no server needed. Supports fuzzy matching with configurable threshold. Can search across multiple fields (title, description, link titles) with weighted scoring. Well-documented, actively maintained. Standard choice for this use case.  
**Alternatives considered**:
- FlexSearch — faster for large datasets, but more complex API and overkill for <200 lessons
- Lunr.js — full-text search, heavier than needed for fuzzy matching
- Custom implementation — more work, less tested, no fuzzy tolerance

**Configuration**:
```typescript
const fuse = new Fuse(lessons, {
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'description', weight: 1.0 },
    { name: 'links.title', weight: 0.5 }
  ],
  threshold: 0.4,       // Tolerant enough for child typos
  includeMatches: true   // For highlighting matching text
});
```

## R4. CSS Theming Approach

**Decision**: CSS custom properties with `data-theme` attribute on `<html>`  
**Rationale**: Native CSS approach — no JS runtime overhead for styling, instant theme switch by toggling a single DOM attribute. All theme definitions live in one CSS file (`themes.css`). No CSS-in-JS library needed. Theme preference stored in localStorage and applied before first paint (inline script in `index.html` to prevent flash of wrong theme).  
**Alternatives considered**:
- CSS-in-JS (styled-components, emotion) — adds dependency, runtime overhead, more complex
- Tailwind CSS — utility-first framework, steeper learning curve, config overhead
- CSS modules with theme imports — more complex file structure

**Implementation pattern**:
```css
[data-theme="ocean"] {
  --color-primary: #1976D2;
  --color-bg: #E3F2FD;
  --color-surface: #FFFFFF;
  --color-text: #212121;
  --color-accent: #FF9800;
}
[data-theme="sunset"] {
  --color-primary: #E65100;
  --color-bg: #FFF3E0;
  --color-surface: #FFFFFF;
  --color-text: #3E2723;
  --color-accent: #FF6F00;
}
```

**Flash prevention**: A small inline `<script>` in `index.html` reads localStorage and sets `data-theme` before React mounts, preventing flash of default theme.

## R5. Routing Strategy

**Decision**: React Router v7 with `HashRouter`  
**Rationale**: Hash routing (`/#/training`, `/#/library`) works on GitHub Pages without any server configuration or 404.html workaround. React Router gives us browser back/forward button support for free (critical for the kid — FR-003, edge case). The URL structure is simple (kid doesn't read URLs) and hash routing is the most reliable approach for static hosting.  
**Alternatives considered**:
- BrowserRouter with 404.html hack — cleaner URLs but fragile on GitHub Pages, adds a redirect step
- No router (state-based navigation) — loses back button support, violates FR-003
- Wouter or other lightweight routers — React Router is well-known, small enough

**Routes**:
```
/#/          → Home (Training + Library buttons)
/#/training  → Training routine (exercise flow)
/#/library   → Library (browse + search)
/#/lesson/:id → Lesson detail view
```

## R6. GitHub Pages Deployment

**Decision**: GitHub Actions workflow with `peaceiris/actions-gh-pages`  
**Rationale**: Standard approach for deploying Vite builds to GitHub Pages. The workflow runs on push to main: installs deps, validates content, builds, and deploys `dist/` to the `gh-pages` branch. Free, automatic, no manual steps after initial setup.  
**Alternatives considered**:
- `gh-pages` npm package (manual `npm run deploy`) — requires manual step each time
- Netlify / Vercel — more features but user wants GitHub Pages (free, already on GitHub)
- Manual push to gh-pages branch — error-prone

## R7. YouTube Embed Strategy

**Decision**: Standard YouTube IFrame embed with `youtube-nocookie.com` domain  
**Rationale**: Using the privacy-enhanced `youtube-nocookie.com` embed URL avoids setting tracking cookies on the kid's browser. The embed is wrapped in a responsive container (16:9 aspect ratio) that scales to the viewport. An "Open on YouTube" link below the embed provides a fallback. No YouTube IFrame API needed for Phase 1 (no playback controls beyond YouTube's built-in ones).  
**Alternatives considered**:
- YouTube IFrame API (with JS control) — more complex, not needed for Phase 1. Reserved for roadmap S13 (slow-down/loop feature)
- `lite-youtube-embed` — lighter initial load (lazy-loads the iframe), could be a future optimization
- Direct link only — dismissed in spec; embedding keeps the kid on-site

## R8. Session Persistence Strategy

**Decision**: `sessionStorage` for training progress, `localStorage` for theme preference  
**Rationale**: The spec says training progress must "persist within the browser session so a page refresh does not lose progress" (FR-019). `sessionStorage` matches this exactly: data survives page refreshes but clears when the tab is closed, giving a fresh start each day. Theme preference should persist across sessions, so it uses `localStorage`. Both are synchronous, zero-dependency browser APIs.  
**Alternatives considered**:
- localStorage for everything — training progress would persist across sessions, which is undesirable (kid should start fresh each time they open the site)
- IndexedDB — more complex, no benefit for small data volumes
- No persistence — progress lost on page refresh, violates FR-019

## R9. Content Validation Strategy

**Decision**: Custom Node.js validation script (`tools/validate-content.js`) as a pre-build step  
**Rationale**: Runs `npm run validate` before every build. Checks: YAML syntax validity, required fields per lesson type (title, type, youtubeUrl for songs), lesson reference integrity (every exercise lesson ref points to a valid lesson ID), exercise count matches configuration. Outputs clear, human-readable error messages with file path and field name. Uses `js-yaml` and `ajv` (JSON Schema validator) as dev dependencies only — not in the browser bundle.  
**Alternatives considered**:
- Vite plugin that validates on import — errors appear during dev but don't block build; harder to give friendly messages
- TypeScript strict typing only — catches type errors but not reference integrity or required field logic
- No validation — violates FR-055 (clear error messages for invalid config)
