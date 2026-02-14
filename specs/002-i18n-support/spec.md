# Feature Specification: i18n Support with Hebrew Translation & RTL

**Feature Branch**: `002-i18n-support`  
**Created**: 2026-02-14  
**Status**: Draft  
**Input**: User description: "i18n support — language selector with full Hebrew translation, RTL layout support"

## User Scenarios & Testing

### User Story 1 — Kid or Parent Chooses a Language (Priority: P1)

A language switcher is visible on every page. Jonathan or his parent taps it to pick a language. The site instantly updates — all UI text (buttons, labels, headings, messages) switches to the chosen language, and the preference is remembered. On first visit, the site detects the browser's preferred language and selects it automatically. If the chosen language is a right-to-left language (like Hebrew), the layout direction flips to RTL; otherwise it stays LTR.

**Why this priority**: The language switcher is the core infrastructure that enables everything else. Without it, there is no way to activate Hebrew or any future language. It must work before translations have value.

**Independent Test**: Open site → verify language switcher is visible → switch language → verify all UI text updates and layout direction changes (if applicable) → close browser → reopen → verify preference persists → switch back → verify everything reverts.

**Acceptance Scenarios**:

1. **Given** any page, **When** the user looks at the header, **Then** a language switcher is visible and accessible.
2. **Given** the site is in English, **When** the user selects Hebrew, **Then** all UI text changes to Hebrew and the layout direction changes to RTL, without a page reload.
3. **Given** the site is in Hebrew, **When** the user selects English, **Then** all UI text changes to English and the layout direction changes to LTR, without a page reload.
4. **Given** the user selects a language, **When** they close and reopen the browser, **Then** the site loads in the previously selected language with the correct layout direction.
5. **Given** a first-time visitor whose browser prefers Hebrew, **When** they open the site, **Then** the site loads in Hebrew with RTL layout.
6. **Given** a first-time visitor whose browser prefers a language other than English or Hebrew, **When** they open the site, **Then** the site defaults to English with LTR layout.

---

### User Story 2 — Kid Uses the Full Site in Hebrew (Priority: P2)

Once Hebrew is selected, the entire site feels native: all buttons, labels, headings, empty states, motivational messages, type labels, difficulty labels, theme names, search placeholders, and aria-labels appear in Hebrew. The layout is right-to-left — navigation, text alignment, back arrows, and progress indicators are all mirrored. Lesson content (titles, descriptions, link titles) authored by the parent in YAML remains as-is.

**Why this priority**: The Hebrew translation and RTL layout are the reason this feature exists. But they depend on the switcher infrastructure (US1) being in place first.

**Independent Test**: Set language to Hebrew → navigate Home, Training (full exercise flow with completion), Library (browse, search, lesson detail) → verify all UI text is in Hebrew, layout is RTL, and no English leaks through except parent-authored content.

**Acceptance Scenarios**:

1. **Given** Hebrew is selected, **When** Jonathan opens the home screen, **Then** the title, subtitle, and navigation buttons appear in Hebrew with right-to-left alignment.
2. **Given** Hebrew is selected, **When** Jonathan completes a training session, **Then** the motivational message is displayed in Hebrew.
3. **Given** Hebrew is selected, **When** Jonathan browses the Library, **Then** filter labels, search placeholder, empty states, section headings, and lesson type badges all appear in Hebrew.
4. **Given** Hebrew is selected, **When** any page is viewed, **Then** the entire layout is mirrored (RTL): back arrows point right, progress flows right-to-left, text is right-aligned.
5. **Given** Hebrew is selected, **When** a lesson detail page is viewed, **Then** UI elements (type label, difficulty label, "Links" heading, back button) are in Hebrew, while the lesson title, description, and link titles remain as authored by the parent.

---

### User Story 3 — Consistent Experience Across Themes and Languages (Priority: P3)

When the language is set to Hebrew, all existing themes (Ocean, Sunset) render correctly in RTL. Theme switching continues to work as before. No visual glitches, overlapping text, or broken layouts appear in any theme + language combination.

**Why this priority**: Themes already exist and must not break. Lower priority because it's a compatibility concern, not a new capability.

**Independent Test**: For each theme × language combination (2 themes × 2 languages = 4 combos), navigate all pages → verify no visual regressions, overlapping elements, or broken alignment.

**Acceptance Scenarios**:

1. **Given** any combination of theme and language, **When** the user navigates through all pages, **Then** no visual glitches, text overflow, or layout breakage occurs.
2. **Given** Hebrew + Ocean theme, **When** switching to Sunset theme, **Then** the RTL layout is preserved and the theme change applies cleanly.

---

### Edge Cases

- What happens when localStorage is unavailable? The site defaults to English/LTR and functions normally without persisting the preference.
- What happens if a new UI string is added in the future but not yet translated? The English string is displayed as a fallback, and the site does not crash or show a translation key.
- What happens if the motivational messages file for Hebrew has fewer messages than English? The system works with whatever messages are available; it does not crash on an empty or short list.
- What happens with mixed-direction text (e.g., English song titles inside Hebrew UI)? The browser's native bidirectional text handling (Unicode BiDi) is relied upon — no special intervention needed.
- What happens with very long Hebrew text that is longer than English equivalents? The UI must accommodate without truncation or overflow (Hebrew text can be longer or shorter than English for the same meaning).

## Requirements

### Functional Requirements

- **FR-001**: The site MUST support two languages: English and Hebrew.
- **FR-002**: All UI text (buttons, labels, headings, placeholders, empty states, aria-labels, page title, meta description, noscript message) MUST have translations in both languages.
- **FR-003**: All 85 motivational completion messages MUST have Hebrew equivalents.
- **FR-004**: Difficulty labels (beginner, intermediate, advanced) and lesson type labels (Song, Drum Beat, Fundamental) MUST be translated.
- **FR-005**: Theme names (Ocean, Sunset) MUST be translated.
- **FR-006**: The site MUST display a language switcher accessible from every page.
- **FR-007**: Switching language MUST update all visible text and layout direction immediately, without a full page reload.
- **FR-008**: The selected language MUST persist across browser sessions.
- **FR-009**: When Hebrew is selected, the entire page layout MUST render in right-to-left (RTL) direction.
- **FR-010**: RTL layout MUST include: mirrored navigation flow, right-aligned text, mirrored directional icons (arrows), and mirrored progress indicators.
- **FR-011**: When English is selected, the layout MUST render in left-to-right (LTR) direction.
- **FR-012**: The site MUST detect the browser's preferred language on first visit and default to Hebrew if the browser prefers Hebrew, otherwise default to English.
- **FR-013**: If a translation is missing for a given key, the site MUST fall back to the English string rather than showing a raw key or crashing.
- **FR-014**: The HTML `lang` attribute and `dir` attribute MUST update dynamically when the language changes.
- **FR-015**: Lesson content (titles, descriptions, link titles) authored by the parent in YAML is NOT translated by the i18n system — it is displayed as-is regardless of language setting.
- **FR-016**: Pluralization MUST be handled correctly in both languages (e.g., "1 lesson" vs. "3 lessons" in English; equivalent Hebrew plural forms).

### Key Entities

- **Translation bundle**: A collection of all UI strings for a single language, keyed by a stable identifier. One bundle per supported language.
- **Language preference**: The user's selected language, stored persistently. Determines which translation bundle is active and which layout direction (LTR/RTL) to apply.
- **Motivational messages (per language)**: A set of completion messages for each supported language. Loaded based on the active language.

## Assumptions

- **Content is not translated**: Lesson titles, descriptions, link titles, and exercise titles/descriptions from YAML files are authored by the parent in whatever language they choose. The i18n system only translates the UI shell (buttons, labels, headings, system messages). This keeps the content management workflow simple — no dual-language YAML files.
- **Two languages only**: The system is designed for English and Hebrew. Adding a third language should be structurally possible but is not a requirement.
- **RTL is driven by language choice**: RTL is not a standalone toggle — the layout direction is determined automatically by the selected language. Hebrew activates RTL; English activates LTR. If additional RTL languages are added in the future, they would also trigger RTL.
- **No server-side rendering**: Language detection and switching happen entirely on the client side.
- **Existing localStorage pattern**: Language preference uses the same localStorage-based persistence pattern as the existing theme preference.

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of UI strings (~55 across 13 components) have Hebrew translations — no English leaks when Hebrew is selected.
- **SC-002**: 100% of motivational messages (85) have Hebrew equivalents.
- **SC-003**: Language switching completes in under 200ms with no visible flicker or layout shift.
- **SC-004**: All 4 theme × language combinations (Ocean/English, Ocean/Hebrew, Sunset/English, Sunset/Hebrew) render without visual regressions.
- **SC-005**: The site passes a manual RTL audit: all directional elements (arrows, progress, alignment, navigation) are correctly mirrored when Hebrew is active.
- **SC-006**: Language preference persists across sessions — reopening the browser loads the last selected language.
- **SC-007**: First-time visitors see the site in their browser's preferred language (Hebrew or English) without manual intervention.
