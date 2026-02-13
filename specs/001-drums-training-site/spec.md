# Feature Specification: Jonathan's Drums Training Site

**Feature Branch**: `001-drums-training-site`  
**Created**: 2026-02-13  
**Status**: Final Draft  
**Input**: User description: "Create a drums training and library website for an 8-year-old kid to practice exercises sequentially and explore a searchable library of drum lessons."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Kid Completes the Training Routine (Priority: P1)

Jonathan (8 years old) opens the website and taps the Training button. He sees Exercise 1 with its title and a list of lessons to pick from. He can either tap a specific lesson or tap a "Pick for me" button that randomly selects one. He views the lesson content (description, embedded YouTube video for songs, links), practices along, then marks the exercise as done. He moves to Exercise 2, where the lesson he already picked is no longer available. He repeats this for all exercises (default: 4). After the last exercise, a big, cheerful motivational message appears on screen celebrating his effort.

This training routine is the first thing Jonathan should complete before free play. There is one training routine, configured by his parent based on what he learns in his drum lessons.

**Why this priority**: This is the core value proposition — structured daily practice. Without it, the site has no training purpose.

**Independent Test**: Can be fully tested by configuring 4 exercises with sample lessons and walking through the complete flow, using both manual and random lesson selection. Delivers the core training experience.

**Acceptance Scenarios**:

1. **Given** the training routine is configured with 4 exercises, **When** Jonathan opens Training, **Then** he sees Exercise 1 with its title and lesson list displayed as large, easy-to-tap options, plus a "Pick for me" button.
2. **Given** Jonathan is on Exercise 1, **When** he taps "Pick for me", **Then** a random lesson from the available list is selected for him.
3. **Given** Jonathan is on Exercise 1, **When** he picks Lesson X (manually or randomly) and marks the exercise done, **Then** he advances to Exercise 2 and Lesson X is disabled/hidden in Exercise 2's list (if it appears there).
4. **Given** an exercise has only one lesson and that lesson was already chosen in a prior exercise, **When** Jonathan reaches this exercise, **Then** the lesson is still available (it is the only option).
5. **Given** Jonathan completes the final exercise, **When** he marks it done, **Then** a randomly selected motivational message (from a pool of 100) is displayed prominently with a celebratory visual treatment.
6. **Given** Jonathan is mid-routine, **When** he navigates away or refreshes, **Then** his progress is preserved so he can resume where he left off.

---

### User Story 2 - Kid Browses the Library (Priority: P1)

Jonathan opens the Library section and sees all lessons organized by type (Songs, Drum Beats, Fundamental Base Beats). He taps a lesson to view its full details: title, description, embedded YouTube video (for songs), and links. He can easily go back to the library list.

**Why this priority**: The library is the second core section — it gives Jonathan a reference to revisit what he has learned. It is also the single source of all lesson content referenced by the training routine.

**Independent Test**: Can be tested by populating the library with sample lessons of each type and navigating through them. Delivers the reference/exploration experience.

**Acceptance Scenarios**:

1. **Given** the library contains lessons of all three types, **When** Jonathan opens the Library, **Then** he sees lessons grouped or filterable by type with clear visual distinctions.
2. **Given** Jonathan taps on a Song lesson, **When** the lesson detail view opens, **Then** he sees the title, optional description, an embedded YouTube video player, and any additional links.
3. **Given** Jonathan taps on a Drum Beat lesson, **When** the lesson detail view opens, **Then** he sees the title, optional description, and list of relevant links with their titles.
4. **Given** Jonathan is viewing a lesson, **When** he wants to go back, **Then** there is a large, obvious back button to return to the library list.

---

### User Story 3 - Kid Searches the Library (Priority: P2)

Jonathan remembers part of a lesson name but not exactly. He types a few letters into the search bar. The search matches against lesson titles, descriptions, and link titles using fuzzy matching. Results appear as he types, and he taps on the one he recognizes.

**Why this priority**: With a growing library, search becomes essential for an 8-year-old who may not remember exact names. Depends on the library existing first (P1).

**Independent Test**: Can be tested by populating the library with 10+ lessons and searching with partial/misspelled terms. Delivers quick content discovery.

**Acceptance Scenarios**:

1. **Given** the library has lessons titled "Billie Jean", "Seven Nation Army", **When** Jonathan types "bili", **Then** "Billie Jean" appears in the results.
2. **Given** a lesson has a link titled "slow practice version", **When** Jonathan types "slow pract", **Then** the lesson appears in search results.
3. **Given** Jonathan types a search term with no matches, **When** results are empty, **Then** a friendly message appears (e.g., "No lessons found. Try different words!") instead of a blank screen.
4. **Given** Jonathan types into the search bar, **When** results appear, **Then** each result shows the lesson title, type indicator, and a snippet of matching text.

---

### User Story 4 - Parent Updates Training Content (Priority: P2)

Jonathan had a drum lesson with his teacher and learned new material. The parent wants to include it in the training routine. They first add a new lesson to the library (editing the YAML file directly or asking the LLM in Cursor), then reference that lesson in one of the exercises so Jonathan can pick it during training. This is the typical workflow: teacher teaches → parent adds to library → parent references in exercise.

**Why this priority**: The training routine must stay current with what Jonathan is learning. Without easy content management, the site becomes stale after the first week.

**Independent Test**: Can be tested by creating a new lesson YAML entry, referencing it in an exercise config, and verifying it appears both in the library and as a pickable option in training.

**Acceptance Scenarios**:

1. **Given** the parent creates a new lesson in the library YAML, **When** the site is rebuilt/reloaded, **Then** the lesson appears in the Library and is searchable.
2. **Given** the parent references an existing library lesson in an exercise's lesson list, **When** Jonathan opens that exercise in training, **Then** the lesson appears as a pickable option.
3. **Given** the parent asks the LLM to add a new lesson via chat, **When** the LLM edits the YAML file, **Then** a properly structured entry is created in the library following the schema.
4. **Given** the parent makes a syntax error in the YAML, **When** the site attempts to load, **Then** a clear error message indicates which file and line has the problem (not a blank screen or cryptic error).
6. **Given** the parent references a lesson ID that doesn't exist in the library, **When** the site loads, **Then** a clear error message identifies the broken reference.

---

### User Story 5 - Parent Adds Library-Only Content (Priority: P3)

The parent wants to add a song Jonathan enjoys playing but that isn't part of the training routine — just a library reference he can browse to later. They add a lesson entry to the library YAML without referencing it in any exercise.

**Why this priority**: The library grows beyond just training material. Some lessons are for reference and enjoyment, not structured practice.

**Independent Test**: Can be tested by adding a YAML entry with no exercise references and verifying it appears only in the library.

**Acceptance Scenarios**:

1. **Given** the parent adds a Song lesson to the library YAML without referencing it in any exercise, **When** the site is rebuilt/reloaded, **Then** the song appears in the Library, is searchable, but does not appear in any training exercise.

---

### User Story 6 - Kid Switches Visual Theme (Priority: P1)

Jonathan wants to personalize his experience. He taps a theme button accessible from any page and switches between different visual themes. The site instantly changes appearance. His choice is remembered the next time he visits.

**Why this priority**: Personalization gives the kid a sense of ownership and makes the site feel like "his."

**Independent Test**: Can be tested by toggling themes and verifying visual changes are instant and persist after closing/reopening the browser.

**Acceptance Scenarios**:

1. **Given** Jonathan is on any page, **When** he taps the theme toggle, **Then** the site's visual appearance changes immediately without a page reload.
2. **Given** Jonathan selects a theme and closes the browser, **When** he returns later, **Then** his previously selected theme is applied automatically.
3. **Given** the site offers multiple themes, **When** Jonathan cycles through them, **Then** each theme has a distinct, visually coherent look (colors, backgrounds, accents).

---

### Edge Cases

- **All lessons already used**: If Exercise 3's lesson list contains only lessons already picked in Exercises 1-2, the system MUST still allow picking from the list (override the deduplication rule when no fresh options exist).
- **Single lesson in list**: An exercise with exactly one lesson in its list — the kid should see it and pick it, even if it was used before (it's the only option).
- **"Pick for me" with one option**: If only one lesson is available, the random pick button simply selects it.
- **Empty training config**: If no exercises are configured, the Training section MUST show a friendly message ("No exercises set up yet! Ask your parent to add some.").
- **Empty library**: If no lessons exist, the Library section MUST show a friendly empty state.
- **Broken lesson reference**: If an exercise references a lesson ID that doesn't exist in the library, display a clear error rather than crashing.
- **Very long search queries**: The search bar should have a reasonable character limit and handle gracefully.
- **Browser back/forward buttons**: Navigation should behave predictably; the kid should never get stuck.
- **Accidental double-tap**: Marking an exercise as done should be debounced — tapping "Done" twice should not skip an exercise.
- **Theme persistence failure**: If localStorage is unavailable, the site MUST fall back to a default theme without breaking.

---

## Requirements *(mandatory)*

### Functional Requirements — Navigation & General UX

- **FR-001**: The site MUST have a home screen with exactly two main sections: "Training" and "Library", displayed as large, visually distinct buttons suitable for an 8-year-old.
- **FR-002**: All interactive elements (buttons, lesson cards, navigation) MUST be large enough for a child to tap/click easily (minimum touch target: 48x48px, recommended: larger).
- **FR-003**: Navigation MUST be simple and predictable — every screen MUST have a clear way to go back or return home.
- **FR-004**: The site MUST be fully functional as a static site with no server-side runtime.
- **FR-005**: The site MUST display a clear, friendly loading state if content takes time to appear.
- **FR-006**: The site MUST be fully responsive, working on phones, tablets, and desktop screens without horizontal scrolling or broken layouts.

### Functional Requirements — Training Section

- **FR-010**: The Training section MUST present exercises in a fixed sequential order (Exercise 1 through Exercise N).
- **FR-011**: The number of exercises in a training session is determined by the number of exercises defined in the training configuration file. No separate count setting is needed.
- **FR-012**: Each exercise MUST display a title, an optional description, and a list of lessons to choose from. Lessons are references to entries in the library.
- **FR-013**: Each exercise MUST provide a "Pick for me" button that randomly selects a lesson from the available list for that exercise.
- **FR-014**: When the kid selects a lesson for an exercise (manually or randomly), that lesson MUST be excluded from subsequent exercises' lesson lists, UNLESS it is the only lesson available in a given exercise's list.
- **FR-015**: When a lesson is selected for an exercise, the kid MUST see the full lesson content (same detail view as in the library: title, description, embedded YouTube video for songs, links).
- **FR-016**: The kid MUST be able to mark each exercise as "done" to advance to the next exercise.
- **FR-017**: After completing all exercises, the system MUST display a randomly selected motivational message from a pool of 100 pre-written, kid-friendly, encouraging messages.
- **FR-018**: The motivational messages MUST be stored in a dedicated JSON file within the application source — easy to locate, read, and modify. This file should be structured to allow future replacement with a dynamic source.
- **FR-019**: Session progress (which exercise the kid is on, which lessons were picked) MUST persist within the browser session so a page refresh does not lose progress.
- **FR-020**: The kid MUST be able to start a new training session (resetting all progress) from the completion screen or training home.

### Functional Requirements — Library Section

- **FR-030**: The Library MUST display all lessons defined in the YAML configuration, regardless of whether they are referenced by any exercise.
- **FR-031**: The Library MUST support the following lesson types: Song, Drum Beat, and Fundamental Base Beat.
- **FR-032**: The system MUST be designed so that new lesson types can be added in the future without restructuring existing content.
- **FR-033**: A Song lesson MUST have: title, optional description, a YouTube link (displayed as an embedded player), and an optional list of additional links (each with a link title). An "Open on YouTube" fallback link MUST also be provided.
- **FR-034**: A Drum Beat lesson MUST have: title, optional description, and an optional list of relevant links (each with a link title).
- **FR-035**: A Fundamental Base Beat lesson MUST have: title, optional description, and an optional list of relevant links (each with a link title).
- **FR-036**: The Library MUST provide fuzzy search functionality that matches against lesson titles, descriptions, and link titles.
- **FR-037**: Search results MUST update as the user types (live/incremental search).
- **FR-038**: Each search result MUST show the lesson type, title, and a snippet or highlight of the matching text.
- **FR-039**: The Library MUST allow browsing all lessons without searching (full listing view, optionally grouped by type).

### Functional Requirements — Theme Switching

- **FR-070**: The site MUST support at least two distinct visual themes that the kid can switch between.
- **FR-071**: Theme selection MUST persist across browser sessions using localStorage.
- **FR-072**: A theme toggle or selector MUST be accessible from every page (e.g., in a fixed header or floating control).
- **FR-073**: Theme switching MUST be instant — no page reload, no flash of unstyled content.
- **FR-074**: If localStorage is unavailable or the stored theme is invalid, the site MUST fall back to a sensible default theme.
- **FR-075**: Each theme MUST provide a coherent visual experience — consistent colors, backgrounds, accents, and contrast ratios that remain readable and accessible.

### Functional Requirements — Configuration & Content Management

- **FR-050**: All lessons MUST be defined in local YAML configuration files within the repository (no database). This is the single source of truth for lesson content.
- **FR-051**: Training exercises MUST be defined in a separate YAML configuration file that references lessons by identifier. An exercise's lesson list is a set of references to library lessons, not inline content.
- **FR-052**: A Cursor IDE rule MUST exist that provides the LLM with the content schema, file locations, and validation rules so the parent can add or modify content via natural language chat.
- **FR-053**: Configuration files MUST include inline comments explaining each field and acceptable values.
- **FR-054**: The system MUST provide clear, human-readable error messages when configuration files contain invalid data or broken lesson references.
- **FR-055**: The repository MUST include example content (sample lessons and exercises) for development and demonstration purposes.

### Functional Requirements — Lesson Attributes

- **FR-060**: Each lesson MAY have an optional difficulty level attribute (e.g., beginner, intermediate, advanced).
- **FR-061**: If a difficulty level is present on a lesson, it SHOULD be displayed as a small visual indicator in lesson views. If absent, no indicator is shown — this is not an error.

### Key Entities

- **Lesson**: The core content unit. Lives in the library (YAML config). Has a type (Song, Drum Beat, Fundamental Base Beat), title, optional description, optional difficulty level, and type-specific fields (YouTube link for songs, link lists for all types). The Library section displays all lessons. Exercises reference lessons by identifier.
- **Exercise**: A step in the training routine. Has a title, optional description, and a list of lesson references (pointing to library lessons). Exercises are ordered and presented sequentially. Defined in a separate training config YAML.
- **Training Session**: A single run through the exercise sequence. Tracks which exercise the kid is on and which lessons have been selected. Ephemeral (browser session storage).
- **Motivational Feedback**: One of 100 pre-written encouraging messages stored in a dedicated JSON file within the application. Displayed on training completion. Selected randomly.
- **Theme**: A named visual style (colors, backgrounds, accents) that can be applied site-wide. At least two themes must exist. Stored preference is per-browser via localStorage.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An 8-year-old can complete the full training routine (4 exercises) independently without adult help, in under 15 minutes.
- **SC-002**: An 8-year-old can find a specific lesson in the library by searching in under 30 seconds.
- **SC-003**: A parent can add a new lesson and reference it in an exercise in under 5 minutes using YAML files directly or by asking the LLM in Cursor.
- **SC-004**: The site loads and is interactive within 3 seconds on a standard connection.
- **SC-005**: All interactive elements are usable on phones, tablets, and desktop screens without horizontal scrolling or layout issues.
- **SC-006**: Fuzzy search returns relevant results for queries with up to 2 character typos.
- **SC-007**: The kid encounters zero dead ends — every screen has a clear, large navigation path forward or back.
- **SC-008**: Theme switching takes less than 100ms and produces no visible flicker or layout shift.

---

## Assumptions

- The parent is comfortable editing YAML files in a code editor or asking the LLM to make content changes via Cursor. No web-based admin interface or CLI tool is needed.
- Content updates are infrequent (after drum lessons, roughly weekly), so a rebuild/redeploy after editing config files is acceptable.
- The 100 motivational messages will be generated during development and stored in a dedicated JSON file within the application source.
- The site will be used by one child; there is no need for user accounts, authentication, or multi-user features.
- There is one training routine at a time. The parent updates it as new material is learned from the drum teacher.
- Lessons are the single source of truth — defined once in the library, referenced by exercises. No content duplication.
- The site targets modern evergreen browsers (Chrome, Safari, Firefox); no legacy browser support is needed.
- Internet connectivity is required (for embedded YouTube videos).
- The site will be a client-side React single-page application — no server-side rendering or server-side logic.
- Hosting will be GitHub Pages (free, static).
- Example content (sample lessons and exercises) will be created during development for demonstration and testing, and later replaced or augmented by the parent with real content.
- The initial theme set will include at least two themes; additional themes can be added over time.
