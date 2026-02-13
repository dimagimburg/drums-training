# Jonathan's Drums — Feature Roadmap

**Created**: 2026-02-13  
**Status**: Draft — awaiting user classification of suggested features

---

## Phase 1 — MVP (Current Spec)

These are confirmed must-have features:

- [ ] Home screen with Training and Library sections
- [ ] Training section: sequential exercise flow with lesson picking and deduplication
- [ ] Training section: configurable exercise count (default 4)
- [ ] Training section: 100 hardcoded motivational messages on completion
- [ ] Library section: three lesson types (Song, Drum Beat, Fundamental Base Beat)
- [ ] Library section: fuzzy search across titles, descriptions, and link titles
- [ ] YAML-based configuration (no database)
- [ ] CLI tool for scaffolding exercises and library entries
- [ ] Child-friendly UI with large buttons and simple navigation

---

## Suggested Features — Awaiting Classification

> **Instructions**: For each feature below, mark as:
> - **MUST HAVE** → moves to Phase 1
> - **ROADMAP** → moves to a future phase below
> - **DISMISS** → removed from roadmap

### S1. YouTube Video Embedding

Embed YouTube videos directly within the lesson view instead of linking out. Keeps the kid on-site, prevents YouTube rabbit holes, and creates a focused practice environment. For an 8-year-old, this is a significant safety and focus improvement.

**Recommendation**: Strongly recommend for Phase 1 — the kid will inevitably end up watching unrelated videos if sent to YouTube.

**Classification**: _pending_

---

### S2. Practice Session History

Track which training sessions were completed and when. Display as a simple list: "Last practiced: Tuesday, Feb 11" or a small log. Helps the parent know if the kid is actually using the site without having to watch.

**Recommendation**: Lightweight to implement with localStorage. Good for accountability.

**Classification**: _pending_

---

### S3. Embedded Metronome

A simple metronome tool accessible from the training section or as a standalone tool. BPM control with large +/- buttons and a start/stop toggle. Essential for drum practice — the kid shouldn't need a separate app or device.

**Recommendation**: High value for drum practice. Could be Phase 1 or early Phase 2.

**Classification**: _pending_

---

### S4. Lesson Favorites / Quick Access

Let the kid star/heart favorite lessons in the library. A "My Favorites" filter or section gives quick access to frequently revisited material. Stored in localStorage.

**Recommendation**: Simple to implement, high usability payoff as the library grows.

**Classification**: _pending_

---

### S5. Practice Streak Calendar

A visual calendar (similar to a sticker chart) showing which days Jonathan practiced. Kids respond strongly to visual streaks — it gamifies consistency without complex point systems. Stored in localStorage.

**Recommendation**: Great for Phase 2. Motivational but not core functionality.

**Classification**: _pending_

---

### S6. Achievement Badges

Visual badges awarded for milestones: "First Session", "5 Sessions Completed", "7-Day Streak", "All Exercises Done", etc. Displayed on the home screen or a dedicated achievements page.

**Recommendation**: Phase 2 or 3. Fun but requires design work and doesn't affect core usability.

**Classification**: _pending_

---

### S7. Difficulty Levels / Tags

Tag exercises and library lessons with difficulty levels (beginner, intermediate, advanced) shown as star ratings or color codes. Helps the kid see progression and helps the parent organize content by skill level.

**Recommendation**: Phase 2. Useful for long-term content organization.

**Classification**: _pending_

---

### S8. Celebration Animations

Confetti, drum-roll sound effects, or fun animations when completing exercises or a full session. Makes the experience joyful and rewarding for a kid.

**Recommendation**: Small effort, big emotional impact. Could be Phase 1 or Phase 2.

**Classification**: _pending_

---

### S9. Dark Mode / Theme Selection

Let Jonathan pick a color theme or toggle dark mode. Kids enjoy personalization — it gives a sense of ownership.

**Recommendation**: Phase 2 or 3. Nice to have, not critical.

**Classification**: _pending_

---

### S10. Practice Notes

A simple text area on each lesson or exercise where the kid or parent can type notes ("work on the fill in bar 3", "too fast, slow down"). Stored in localStorage.

**Recommendation**: Phase 2. Useful for focused practice but adds UI complexity.

**Classification**: _pending_

---

### S11. Shuffle / Random Training Mode

Instead of a fixed exercise sequence, a "surprise me" mode that randomly selects exercises and lessons. Adds variety to prevent repetition fatigue.

**Recommendation**: Phase 2. Fun alternative mode once the core flow is solid.

**Classification**: _pending_

---

### S12. Print-Friendly Lesson View

A "Print" button on lesson detail pages that generates a clean, print-optimized layout. Useful for offline reference during practice away from the screen.

**Recommendation**: Phase 3. Niche use case but trivial with CSS print styles.

**Classification**: _pending_

---

### S13. Slow-Down / Loop Section for YouTube Videos

If videos are embedded, add controls to slow playback speed or loop a specific section of the video. Critical for learning — kids need to play along at slower tempos before full speed.

**Recommendation**: Phase 2. Depends on YouTube embedding being in Phase 1. YouTube iframe API supports playback rate.

**Classification**: _pending_

---

### S14. Exercise Timer / Practice Clock

A visible timer showing how long the kid has been practicing the current exercise or the total session. Optional configurable minimum practice time per exercise before the "Done" button activates.

**Recommendation**: Phase 2. Encourages focused practice but could feel restrictive.

**Classification**: _pending_

---

## Phase 2 — Engagement & Tools

_Features to be moved here based on classification above._

- TBD

## Phase 3 — Polish & Extras

_Features to be moved here based on classification above._

- TBD

---

## Versioning

This roadmap will be updated as features are classified and completed. Each phase will get its own spec when work begins.
