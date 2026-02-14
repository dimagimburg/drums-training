# Data Model: i18n Support

**Feature**: 002-i18n-support  
**Date**: 2026-02-14

---

## Entities

### 1. Language

Represents a supported language in the application.

| Attribute | Type | Description |
|-----------|------|-------------|
| `code` | `string` | BCP 47 language code (e.g., `"en"`, `"he"`) |
| `label` | `string` | Display name in the language itself (e.g., `"English"`, `"עברית"`) |
| `dir` | `"ltr" \| "rtl"` | Text direction for this language |

**Supported languages** (hardcoded):

| Code | Label | Direction |
|------|-------|-----------|
| `en` | English | `ltr` |
| `he` | עברית | `rtl` |

---

### 2. Translation Bundle

A complete set of UI strings for a single language. Each bundle is a TypeScript object satisfying the `Translations` type.

| Attribute | Type | Description |
|-----------|------|-------------|
| Key | `string` | Stable identifier for a UI string (e.g., `"home.title"`, `"training.done"`) |
| Value | `string` | The translated text. May contain `{{variable}}` interpolation tokens. |

**Key naming convention**: `component.element` or `component.element_pluralForm`

Examples:
- `"home.title"` → `"Jonathan's Drums"` / `"התופים של ג'ונתן"`
- `"library.lessonCount_one"` → `"{{count}} lesson to explore"` / `"שיעור אחד לגילוי"`
- `"library.lessonCount_other"` → `"{{count}} lessons to explore"` / `"{{count}} שיעורים לגילוי"`
- `"exercise.progress"` → `"Exercise {{current}} of {{total}}"` / `"תרגיל {{current}} מתוך {{total}}"`

**Plural keys**: Suffixed with `_one` or `_other` (matching `Intl.PluralRules` output).

**Relationship**: One Translation Bundle per Language. All bundles must satisfy the same `Translations` type (enforced at compile time).

---

### 3. Motivational Messages (per language)

A flat array of completion messages for a specific language. Loaded from a JSON file.

| Attribute | Type | Description |
|-----------|------|-------------|
| `messages` | `string[]` | Array of motivational messages in the target language |

**Files**:
- English: `src/data/motivational-messages.json` (existing, 85 messages)
- Hebrew: `src/data/motivational-messages.he.json` (new, 85 messages)

**Relationship**: One messages file per Language. The active file is selected based on the current language setting.

---

### 4. Language Preference

The user's selected language, persisted in the browser.

| Attribute | Type | Storage | Description |
|-----------|------|---------|-------------|
| `language` | `"en" \| "he"` | `localStorage` key: `jonathan-drums-language` | Currently selected language code |

**Default resolution order**:
1. Read `localStorage` → use if valid
2. Read `navigator.language` → match first two characters against supported languages
3. Fall back to `"en"`

**Side effects when language changes**:
- `document.documentElement.lang` is set to the language code
- `document.documentElement.dir` is set to the language's direction (`"ltr"` or `"rtl"`)
- `localStorage` is updated (if available)
- All components re-render with new translations

---

## Entity Relationships

```text
Language (en, he)
  ├── has one → Translation Bundle (en.ts / he.ts)
  ├── has one → Motivational Messages (messages.json / messages.he.json)
  └── has one → Direction (ltr / rtl)

Language Preference (localStorage)
  └── references → Language.code
```

---

## State Transitions

```text
App Load:
  ┌─ localStorage has valid language? ──→ Use stored language
  ├─ navigator.language matches "he"? ──→ Use Hebrew
  └─ Otherwise ─────────────────────────→ Use English

Language Switch:
  Current Language ──→ User taps switcher ──→ New Language
    Side effects: update lang attr, dir attr, localStorage, re-render
```

---

## Validation Rules

- Language code MUST be one of the supported language codes (`"en"`, `"he"`)
- All keys in the English translation bundle MUST exist in the Hebrew bundle (enforced by TypeScript shared type)
- Motivational messages arrays MUST contain at least 1 message per language
- Interpolation tokens (`{{variable}}`) MUST be preserved in translations (validated manually during translation authoring)
