# Quickstart: i18n Support

**Feature**: 002-i18n-support  
**Date**: 2026-02-14

---

## Prerequisites

- Node.js (same version as existing project)
- Existing Jonathan Drums project running (`npm run dev`)
- No new dependencies to install

---

## Project Structure (i18n-specific files)

```text
src/
├── i18n/
│   ├── index.ts              # LanguageProvider, useTranslation hook, t() function
│   ├── types.ts              # Language type, Translations type, language config
│   ├── en.ts                 # English translation bundle (all UI strings)
│   └── he.ts                 # Hebrew translation bundle (all UI strings)
├── data/
│   ├── motivational-messages.json      # English messages (existing, unchanged)
│   └── motivational-messages.he.json   # Hebrew messages (new)
├── hooks/
│   └── useLanguage.ts        # Language preference persistence (localStorage)
├── components/
│   ├── LanguageSwitcher.tsx   # Language toggle button (new)
│   └── LanguageSwitcher.css   # Styles (new)
└── ... (existing components updated to use t() for all UI strings)
```

---

## Development Workflow

### Running the app

No changes to the dev workflow:

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Testing language switching

1. Open the app in the browser
2. Click the language switcher in the header (next to theme toggle)
3. Verify all UI text switches to Hebrew and layout flips to RTL
4. Refresh the page — language preference should persist
5. Open browser DevTools → Application → localStorage → verify `jonathan-drums-language` key

### Testing RTL layout

1. Switch to Hebrew
2. Check each page: Home, Training, Library, Lesson Detail, Completion
3. Verify: text is right-aligned, arrows point correctly, flex layouts are mirrored
4. Check both themes (Ocean, Sunset) in Hebrew

### Testing first-visit detection

1. Open DevTools → Application → localStorage → delete `jonathan-drums-language`
2. Go to Settings → Languages → set browser language to Hebrew
3. Reload the page → should auto-detect Hebrew
4. Change browser language to English → reload → should show English

---

## How to Add or Edit a Translation

### Adding a new UI string

1. **Add the key** to `src/i18n/types.ts` in the `Translations` type
2. **Add the English value** to `src/i18n/en.ts`
3. **Add the Hebrew value** to `src/i18n/he.ts`
4. **Use it in a component**: `const { t } = useTranslation(); ... t('your.key')`

TypeScript will error if you add a key to the type but forget it in either language file.

### Adding a plural string

1. Add two keys with `_one` and `_other` suffixes to the type and both language files
2. Call with count: `t('library.lessonCount', { count: lessons.length })`
3. The `t()` function automatically selects `_one` or `_other` based on count

### Adding a string with variables

1. Use `{{variable}}` tokens in the translation string: `"Exercise {{current}} of {{total}}"`
2. Call with variables: `t('exercise.progress', { current: 2, total: 4 })`

### Adding a motivational message

1. Add the English message to `src/data/motivational-messages.json`
2. Add the Hebrew equivalent to `src/data/motivational-messages.he.json`
3. Keep both files in sync (same number of messages recommended but not required)

---

## Key Patterns

### Using translations in a component

```typescript
import { useTranslation } from '../i18n';

function MyComponent() {
  const { t, language, dir } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('library.lessonCount', { count: 5 })}</p>
    </div>
  );
}
```

### Language-aware inline script (index.html)

The inline script in `index.html` prevents a flash of wrong language/direction on page load:

```javascript
(function () {
  var SUPPORTED = ['en', 'he'];
  var RTL = ['he'];
  var DEFAULT = 'en';
  try {
    var lang = localStorage.getItem('jonathan-drums-language');
    if (!lang || SUPPORTED.indexOf(lang) === -1) {
      var nav = (navigator.language || '').slice(0, 2);
      lang = SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT;
    }
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', RTL.indexOf(lang) !== -1 ? 'rtl' : 'ltr');
  } catch (e) {
    document.documentElement.setAttribute('lang', DEFAULT);
    document.documentElement.setAttribute('dir', 'ltr');
  }
})();
```

### CSS logical properties

Use logical properties instead of physical ones for RTL compatibility:

| Physical (avoid) | Logical (use) |
|-------------------|---------------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |

---

## Validation

### Compile-time

- Missing translation keys are caught by TypeScript — if a key exists in the `Translations` type but is missing from `en.ts` or `he.ts`, the build fails.

### Runtime

- Missing keys at runtime (edge case: dynamic keys) fall back to the English string.
- If the English string is also missing, the raw key is returned (should never happen with typed translations).

### Manual checks

- After adding/editing translations, visually verify both languages in the browser
- Check all 4 theme × language combinations for layout issues
- Verify interpolation tokens are preserved in translations (e.g., `{{count}}` appears in both English and Hebrew strings)
