# Jonathan's Drums — Feature Roadmap

**Created**: 2026-02-13  
**Last Updated**: 2026-02-14  
**Status**: Active

---

## Phase 1 — MVP

Core features for the initial release:

- [ ] **i18n support** — language selector with full Hebrew translation (super critical)
- [ ] **RTL layout support** — proper right-to-left rendering for Hebrew and other RTL languages (super critical)
- [ ] Home screen with Training and Library sections (large, kid-friendly buttons)
- [ ] Training section: sequential exercise flow with lesson picking and deduplication
- [ ] Training section: configurable exercise count (default 4)
- [ ] Training section: 100 hardcoded motivational messages on completion
- [ ] Library section: three lesson types (Song, Drum Beat, Fundamental Base Beat)
- [ ] Library section: fuzzy search across titles, descriptions, and link titles
- [ ] Library section: YouTube videos embedded in lesson view (with "Open on YouTube" fallback)
- [ ] Library section: lessons browsable and searchable (single source of truth for all content)
- [ ] Unified lesson model: lessons defined once in library, referenced by exercises
- [ ] "Pick for me" random lesson selection in training
- [ ] Motivational messages in a dedicated JSON file (easy to modify)
- [ ] Optional difficulty attribute on lessons (displayed if present, not required)
- [ ] Theme switching — at least 2 visual themes, kid can toggle, persists in localStorage
- [ ] Fully responsive design (phone, tablet, desktop)
- [ ] YAML-based configuration (no database)
- [ ] Cursor rule for LLM-assisted content management (replaces CLI tool)
- [ ] Example content for development and demo
- [ ] Static deployment on GitHub Pages (free hosting)

---

## Phase 2 — Engagement & Tracking

Features that enhance engagement, add accountability, and enrich the practice experience:

### S2. Practice Session History

Track completed training sessions with timestamps in localStorage. Display as a simple log ("Last practiced: Tuesday, Feb 11"). Gives the parent visibility into practice frequency without watching.

### S5. Practice Streak Calendar

A visual sticker-chart-style calendar showing which days Jonathan practiced. Stored in localStorage. Kids respond strongly to visual streaks — motivates daily consistency.

### S6. Achievement Badges

Visual badges for milestones: "First Session", "5 Sessions Completed", "7-Day Streak", "All Exercises Done", etc. Displayed on the home screen or a dedicated achievements page.

### S8. Celebration Animations

Confetti, drum-roll sound effects, or fun animations when completing exercises or a full session. Small effort, big emotional impact for a kid.

### S16. Add Lessons from Phone

A mobile-friendly interface for adding new lessons to the library directly from a phone. Enables the parent or teacher to quickly add content on the go without needing a desktop or editing YAML files manually.

### S11. Shuffle / Random Training Mode

A "Surprise Me" button that randomly selects exercises and lessons instead of following the fixed sequence. Adds variety once the kid is comfortable with the core flow.

### S14. Exercise Timer / Practice Clock

A visible timer showing how long the kid has been practicing the current exercise or the total session. Optional configurable minimum practice time per exercise before the "Done" button activates.

### S15. Parent Notifications & Reports

Notify the parent about each step of the training session (exercise started, lesson picked, session completed). Generate practice reports (weekly summary, time spent, lessons covered). Implementation approach TBD — options include:
- Browser-based reports viewable by the parent on the site
- Email/push notifications (would require a lightweight external service)
- Exportable reports (PDF/CSV generated client-side)

---

## Phase 3 — Polish & Extras

Lower-priority features for long-term improvement:

_No features classified here yet. Candidates may be promoted from Phase 2 or new ideas added as the product evolves._

---

## Dismissed

Features considered and intentionally excluded:

| Feature | Reason |
|---------|--------|
| S3. Embedded Metronome | Not needed — kid uses a separate metronome or teacher provides one |
| S4. Lesson Favorites / Quick Access | Not needed for current library size; can reconsider if library grows large |
| S10. Practice Notes | Adds UI complexity without clear value for an 8-year-old |
| S12. Print-Friendly Lesson View | Niche use case, not worth the effort now |
| S13. Slow-Down / Loop for YouTube | Dismissed — depends on embedding (Phase 2) and YouTube API complexity |

---

## Versioning

This roadmap is updated as features are classified, completed, or re-prioritized. Each phase may get its own feature spec when work begins.
