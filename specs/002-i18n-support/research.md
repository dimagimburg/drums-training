# Research: i18n Support with Hebrew Translation & RTL

**Feature**: 002-i18n-support  
**Date**: 2026-02-14

---

## R1. i18n Approach: Library vs Custom Solution

### Decision: Custom lightweight solution (no library)

### Rationale

The app has ~55 UI strings across 13 components and 2 supported languages. This is a trivially small translation surface. A custom solution using typed TypeScript objects, a React context, and a `t()` lookup function is simpler, smaller, and more maintainable than introducing an i18n library for this scale.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **react-i18next** | Industry standard, built-in pluralization, interpolation, language detection, namespace support | 3 new runtime dependencies (~52KB), significant API surface for 55 strings, violates Simplicity First | Rejected — overkill |
| **FormatJS / react-intl** | ICU message format, robust pluralization | Heavier than react-i18next, ICU syntax learning curve | Rejected — even more overkill |
| **Custom solution** | Zero dependencies, fully typed, trivial to understand, ~2KB | Manual pluralization and interpolation | **Selected** |

### Custom Solution Design

- **Translation files**: TypeScript objects (`en.ts`, `he.ts`) with a shared type defining all keys. Type safety ensures no missing translations at build time.
- **React context + hook**: `LanguageProvider` wraps the app. `useTranslation()` returns `{ t, language, setLanguage, dir }`.
- **`t()` function**: `t('key')` for simple strings, `t('key', { count: n })` for plurals. Returns English fallback if key is missing in current language.
- **Pluralization**: Handled via `Intl.PluralRules` (native browser API, zero dependencies). Hebrew and English both use simple singular/plural rules (1 vs other), so the implementation is straightforward.
- **Interpolation**: Simple `{{variable}}` token replacement in the `t()` function.

---

## R2. RTL CSS Strategy

### Decision: CSS logical properties + `dir="rtl"` on `<html>`

### Rationale

Setting `dir="rtl"` on the `<html>` element automatically mirrors flex layouts, text alignment, and table direction. CSS logical properties (`margin-inline-start`, `padding-inline-start`, `inset-inline-start`, `text-align: start`) handle the remaining physical properties. The existing CSS is already very clean — only 4-5 properties need conversion.

### RTL Audit Results

The existing codebase has minimal physical CSS properties:

| File | Property | Change |
|------|----------|--------|
| `LibraryList.css` | `margin-left: auto` | → `margin-inline-start: auto` |
| `Library.css` | `padding-left: 0.5rem` | → `padding-inline-start: 0.5rem` |
| `YouTubeEmbed.css` | `top: 0; left: 0` | → `inset: 0` (element is full-bleed) |
| `ExerciseStep.css` | `text-align: left` | → `text-align: start` |
| `ExerciseStep.css` | `flex-direction: row-reverse` | Review: may need RTL-specific override |

Arrow characters in TSX (`←`, `→`) need to be swapped or hidden/shown based on direction. This is handled via the translation system (arrow direction as part of the translated string) or via CSS `[dir="rtl"]` selectors.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| CSS logical properties only | Modern, clean, automatic | Requires converting all physical props; some older browsers don't support all logical props | Partially selected |
| `dir="rtl"` attribute only | Flex and text auto-mirror; zero CSS changes for flex layouts | Doesn't fix physical margin/padding/position props | Partially selected |
| **Both combined** | Comprehensive — dir handles flex/text, logical props handle margin/padding/position | Slightly more work upfront | **Selected** |
| Separate RTL stylesheet | Complete control | Maintenance burden, two files to keep in sync | Rejected |

---

## R3. Language Detection

### Decision: `navigator.language` with fallback to English

### Rationale

The `navigator.language` property returns the browser's preferred language as a BCP 47 tag (e.g., `"he"`, `"en-US"`, `"he-IL"`). Checking the first two characters against supported languages is sufficient. No external language detection library needed.

### Detection Logic

1. Check localStorage for saved preference → use if valid
2. Read `navigator.language` (or first entry of `navigator.languages`)
3. Extract the two-letter language code
4. If `"he"` → Hebrew; if `"en"` → English; otherwise → English (default)

### Flash Prevention

Same pattern as the existing theme flash prevention: an inline `<script>` in `index.html` that reads localStorage and sets `lang` and `dir` on `<html>` before React mounts. This prevents a visible flash of English/LTR before Hebrew/RTL loads.

---

## R4. Hebrew Pluralization

### Decision: Use `Intl.PluralRules` (native browser API)

### Rationale

Hebrew has the same simple plural categories as English for the UI strings in this app: singular (1) and plural (other). The `Intl.PluralRules` API is built into all modern browsers and returns `"one"` or `"other"` for both English and Hebrew, which matches our needs exactly.

### Translation File Format for Plurals

```typescript
// In the translation file:
"lessonCount_one": "שיעור אחד",
"lessonCount_other": "{{count}} שיעורים",
```

The `t()` function detects the `count` parameter, consults `Intl.PluralRules`, and appends the suffix (`_one`, `_other`) to the key.

### Hebrew Plural Examples

| English | Hebrew |
|---------|--------|
| 1 lesson | שיעור אחד |
| 3 lessons | 3 שיעורים |
| 1 result | תוצאה אחת |
| 5 results | 5 תוצאות |

---

## R5. Translation File Format

### Decision: TypeScript objects with a shared type

### Rationale

Using `.ts` files (not `.json`) for translation bundles enables:
- **Compile-time type checking**: A shared `TranslationKeys` type ensures every key exists in every language. Missing translations are caught at build time, not runtime.
- **IDE autocompletion**: Keys are autocompleted when calling `t()`.
- **No import overhead**: TS files are tree-shaken and bundled like any other code.

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| JSON files | Language-agnostic, can be edited by non-developers | No type safety, no compile-time missing-key detection | Rejected |
| **TypeScript objects** | Type-safe, IDE autocompletion, compile-time error for missing keys | Requires TS knowledge to edit | **Selected** |
| YAML files | Consistent with content files | Requires import plugin, no type safety | Rejected |

### Motivational Messages: Separate JSON Files

Motivational messages remain as JSON files (`motivational-messages.json` for English, `motivational-messages.he.json` for Hebrew) because:
- They are a large array (85 items), not key-value pairs
- They are loaded as data, not looked up by key
- Keeping them separate from the UI translation bundle keeps file sizes manageable
- The existing English file format is already JSON — no reason to change it

---

## R6. Language Switcher UX

### Decision: Compact toggle button in the header, next to the theme switcher

### Rationale

The existing header already has a ThemeToggle button. The LanguageSwitcher follows the same pattern: a small, clearly labeled button showing the current language (e.g., "EN" / "עב") that cycles on tap. For two languages, a toggle is simpler than a dropdown.

### Placement

Header: `[← Back] [Title] [LanguageSwitcher] [ThemeToggle]`

The language switcher sits to the left of the theme toggle. Both are persistent across all pages.

---

## Summary of Decisions

| Topic | Decision | Key Reason |
|-------|----------|------------|
| i18n approach | Custom (no library) | 55 strings, 2 languages — library is overkill |
| RTL strategy | `dir="rtl"` + CSS logical properties | Minimal CSS changes needed; comprehensive |
| Language detection | `navigator.language` + localStorage | Native API, no library |
| Pluralization | `Intl.PluralRules` | Native browser API, Hebrew = simple plural rules |
| Translation format | TypeScript objects (typed) | Compile-time safety for missing keys |
| Motivational messages | Separate JSON per language | Large array, not key-value; existing format |
| Language switcher | Toggle button in header | Consistent with theme toggle pattern |
