<!--
Sync Impact Report
===================
Version change: 1.0.0 → 1.1.0
Modified principles:
  - I. Simplicity First: Added justification for React as the UI framework
  - II. Static by Default: Clarified that a build step is expected (React compilation)
  - III. Progressive Enhancement: Relaxed to acknowledge the site is a JS-dependent SPA,
    not a content site. Core experience requires JavaScript; graceful messaging required
    when JS is unavailable.
Modified sections:
  - Project Scope: Updated from "undecided" to concrete technology decisions
    (React SPA, GitHub Pages, YAML config, responsive design)
  - Development Workflow: Updated to include build step and dev server
Added sections:
  - IV. Kid-First Design (new principle for the target audience)
  - Technology Decisions (new section documenting resolved choices)
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no changes needed (generic)
  - .specify/templates/spec-template.md ✅ no changes needed (generic)
  - .specify/templates/tasks-template.md ✅ no changes needed (generic)
Follow-up TODOs: None
-->

# Jonathan Drums Constitution

## Core Principles

### I. Simplicity First

- Every decision MUST favor the simplest viable approach.
- No abstractions, libraries, or tooling MUST be introduced unless a concrete,
  immediate need demands it (YAGNI).
- React is the chosen UI framework because the application requires interactive
  state management (exercise flow, lesson deduplication, session persistence,
  theme switching) that would be more complex and error-prone with vanilla JS.
  This is the justified exception — no additional frameworks or meta-frameworks
  (Next.js, Remix, Gatsby, etc.) are permitted.
- No server-side rendering, server-side logic, or backend services MUST be
  introduced. The application MUST remain a client-side SPA that compiles to
  static files.
- Rationale: React is the minimum viable framework for the interactive
  requirements. Everything beyond it must justify its existence.

### II. Static by Default

- The website MUST be deployable as static files with no server-side runtime.
- A build step (React compilation) is expected and acceptable, but the output
  MUST be plain static files (HTML, CSS, JS, assets) servable by any static
  file host.
- All content (exercises, lessons, library entries) MUST be defined in static
  YAML configuration files within the repository. No database, no CMS, no
  external data services.
- Rationale: Static output ensures fast load times, trivial hosting (GitHub
  Pages), zero operational cost, and maximum reliability.

### III. Progressive Enhancement

- The site is a JavaScript-dependent single-page application. Core functionality
  requires JavaScript to be enabled.
- When JavaScript is unavailable, the site MUST display a clear, friendly message
  explaining that the browser needs JavaScript enabled (not a blank screen).
- Within the application, rendering MUST be progressive: show a loading state
  immediately, then populate content as it becomes available.
- Rationale: While the SPA model requires JS, the user experience should never
  be a blank screen or a cryptic error. Communicate requirements clearly.

### IV. Kid-First Design

- The primary user is an 8-year-old child. Every UI decision MUST prioritize
  simplicity and ease of use for a young, non-technical user.
- Interactive elements MUST be large, clearly labeled, and impossible to miss
  (minimum touch target: 48x48px, larger preferred).
- Navigation MUST be flat and predictable — no deep nesting, no ambiguous icons
  without labels, no dead ends.
- The site MUST be fully responsive across phones, tablets, and desktops.
- Visual design MUST support multiple themes the child can choose between,
  fostering a sense of ownership.
- Rationale: If an 8-year-old can't use the site independently, the site has
  failed its purpose regardless of technical merit.

## Project Scope

This repository contains a drums training and library website for "Jonathan
Drums." The site is a React single-page application that compiles to static
files and is hosted on GitHub Pages.

Key constraints:

- The deliverable is a set of static files produced by a React build.
- No server-side processing, no database, no external services (except YouTube
  links).
- All content is managed through YAML configuration files in the repository.
- A CLI tool provides interactive scaffolding for new content.
- The site serves two sections: Training (interactive exercise flow) and Library
  (searchable lesson reference).

## Technology Decisions

Resolved decisions (documented here to prevent re-litigation):

| Decision | Choice | Rationale |
|----------|--------|-----------|
| UI Framework | React (client-side SPA) | Interactive state management; simplest viable framework for the requirements |
| Server-Side Rendering | None — explicitly prohibited | Adds complexity with no benefit for a static site used by one person |
| Configuration Format | YAML | Human-readable, supports comments, minimal punctuation — friendliest for parent editing |
| Hosting | GitHub Pages (free tier) | Free, static-only, already using GitHub, zero operational overhead |
| Responsive Strategy | Mobile-first, all breakpoints | Target user may use phone, tablet, or desktop interchangeably |
| Data Storage | localStorage (browser) | Session progress, theme preference, no user accounts needed |

## Development Workflow

- Changes MUST be committed in small, focused increments.
- The project uses a standard React development workflow: `npm run dev` for
  local development, `npm run build` for production static output.
- Every change MUST be verifiable by running the dev server and checking in a
  browser.
- File and folder structure MUST remain flat and obvious until complexity
  justifies nesting.

## Governance

- This constitution is the authoritative reference for project decisions.
- Amendments MUST be documented with a version bump and rationale.
- Versioning follows semantic versioning:
  - MAJOR: Principle removed or fundamentally redefined.
  - MINOR: New principle or section added, or existing one materially expanded.
  - PATCH: Clarifications, wording fixes, non-semantic refinements.
- When principles conflict with a practical need, the conflict MUST be
  documented and justified before proceeding.

**Version**: 1.1.0 | **Ratified**: 2026-02-13 | **Last Amended**: 2026-02-13
