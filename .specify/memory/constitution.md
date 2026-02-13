<!--
Sync Impact Report
===================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (first version)
Added sections:
  - Core Principles (3 principles: Simplicity First, Static by Default, Progressive Enhancement)
  - Project Scope
  - Development Workflow
  - Governance
Removed sections: N/A
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
- No abstractions, frameworks, or tooling MUST be introduced unless a concrete,
  immediate need demands it (YAGNI).
- If a feature can be achieved with plain HTML, CSS, or vanilla JS, it MUST NOT
  require a build step or external dependency.
- Rationale: A small static site with a contained application does not warrant
  complexity. Keeping things simple makes the project easy to understand, extend,
  and maintain by anyone.

### II. Static by Default

- The website MUST be servable as static files with no server-side runtime.
- Any dynamic or interactive behavior MUST be self-contained within a clearly
  bounded area of the codebase (the "application" portion).
- Static content and application code MUST be separated so that changes to one
  do not unnecessarily affect the other.
- Rationale: A static-first approach ensures fast load times, trivial hosting,
  and maximum reliability. Isolating dynamic behavior prevents accidental
  coupling.

### III. Progressive Enhancement

- The site MUST deliver its core content and meaning with HTML alone.
- Styling and interactivity MUST layer on top without breaking the base
  experience.
- The application portion MAY depend on JavaScript, but MUST degrade gracefully
  or communicate its requirements clearly to the user.
- Rationale: Building in layers ensures the widest compatibility and a solid
  foundation to extend later.

## Project Scope

This repository contains a static website for "Jonathan Drums" with a small
interactive application embedded within it. The technology stack is intentionally
undecided at this stage. Decisions about frameworks, build tools, or hosting
will be made when concrete requirements demand them — not before.

Key constraints:

- The deliverable is a set of static files (HTML, CSS, JS, assets).
- No server-side processing is assumed or required.
- The interactive application is small in scope and self-contained.

## Development Workflow

- Changes MUST be committed in small, focused increments.
- Every change MUST be manually verifiable by opening the site in a browser
  (no complex build/test pipeline required at this stage).
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

**Version**: 1.0.0 | **Ratified**: 2026-02-13 | **Last Amended**: 2026-02-13
