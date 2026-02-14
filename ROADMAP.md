# Jonathan's Drums — Feature Roadmap

**Created**: 2026-02-13  
**Last Updated**: 2026-02-14  
**Status**: Active

---

## MVP — Completed

18 features shipped. See `specs/001-drums-training-site/tasks.md` for full implementation details.

Highlights: Home screen, Training flow (sequential exercises, lesson picking, deduplication, "Pick for me", motivational messages), Library (browsing, fuzzy search, YouTube embeds, three lesson types), theme switching, YAML-based content, responsive design, GitHub Pages deployment.

---

## Critical

_No pending critical features._

**Recently completed** (see `specs/002-i18n-support/`):
- [x] **i18n support** — language selector with full Hebrew translation
- [x] **RTL layout support** — proper right-to-left rendering for Hebrew and other RTL languages

---

## Important

- [ ] **Add lessons from phone** — mobile-friendly interface for adding new lessons directly from a phone, without editing YAML files manually
- [ ] **Practice session history** — track completed sessions with timestamps in localStorage; display as a simple log ("Last practiced: Tuesday, Feb 11") for parent visibility
- [ ] **Practice streak calendar** — visual sticker-chart-style calendar showing which days Jonathan practiced; stored in localStorage; motivates daily consistency

---

## Nice to Have

- [ ] **Achievement badges** — visual badges for milestones ("First Session", "5 Sessions", "7-Day Streak", etc.); displayed on home screen or dedicated page
- [ ] **Celebration animations** — confetti, drum-roll sounds, or fun animations on exercise/session completion
- [ ] **Shuffle / random training mode** — "Surprise Me" button that randomly selects exercises and lessons instead of following the fixed sequence
- [ ] **Exercise timer / practice clock** — visible timer for current exercise or total session; optional minimum practice time before "Done" activates
- [ ] **Parent notifications & reports** — notify parent about session progress; generate weekly summaries (browser-based, email/push, or exportable PDF/CSV — approach TBD)

---

## Dismissed

Features considered and intentionally excluded:

| Feature | Reason |
|---------|--------|
| Embedded Metronome | Not needed — kid uses a separate metronome or teacher provides one |
| Lesson Favorites / Quick Access | Not needed for current library size; can reconsider if library grows large |
| Practice Notes | Adds UI complexity without clear value for an 8-year-old |
| Print-Friendly Lesson View | Niche use case, not worth the effort now |
| Slow-Down / Loop for YouTube | Depends on YouTube API complexity; not worth it now |
