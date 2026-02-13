# Quickstart: Jonathan's Drums Training Site

**Feature**: `001-drums-training-site`  
**Date**: 2026-02-13

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Git
- Cursor IDE (for LLM-assisted content management)

## Setup

```bash
# Clone and enter the repo
git clone <repo-url> jonathan-drums
cd jonathan-drums

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

## Project Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Validate | `npm run validate` | Check YAML content for errors and broken references |
| Build | `npm run build` | Validate + compile to static files in `dist/` |
| Preview | `npm run preview` | Serve the production build locally |
| Deploy | `npm run deploy` | Build and deploy to GitHub Pages |

The `build` script runs validation automatically (via `prebuild`). If YAML content has errors, the build fails with a human-readable message.

## Content Management

Content is managed by editing YAML files directly or by asking the LLM in Cursor. A Cursor rule at `.cursor/rules/content-management.mdc` provides the LLM with the full schema context, so it knows how to format entries correctly.

### Adding a new lesson

**Option A — Ask the LLM:**

In Cursor chat, say something like:

> "Add a new song lesson called Seven Nation Army. The YouTube link is https://www.youtube.com/watch?v=0J2QdDbelmY. It's beginner difficulty. Add a link to a drum cover tutorial at https://example.com/tutorial."

The LLM will edit `content/lessons.yaml` with a correctly formatted entry.

**Option B — Edit YAML directly:**

Open `content/lessons.yaml` and add an entry:

```yaml
- id: seven-nation-army        # Unique slug ID
  type: song                    # song | drum-beat | fundamental
  title: "Seven Nation Army"
  description: "White Stripes iconic drum intro"
  difficulty: beginner          # Optional: beginner | intermediate | advanced
  youtubeUrl: "https://www.youtube.com/watch?v=0J2QdDbelmY"
  links:                        # Optional
    - title: "Drum cover tutorial"
      url: "https://example.com/tutorial"
```

### Referencing a lesson in training

Open `content/training.yaml` (or ask the LLM) and add the lesson ID to an exercise's `lessons` list:

```yaml
exercises:
  - id: new-song
    title: "This Week's Song"
    lessons:
      - seven-nation-army    # ← Add the lesson ID here
      - billie-jean
```

### Adding a new exercise

Add an entry to the `exercises` list in `content/training.yaml`:

```yaml
  - id: challenge
    title: "Challenge Round"
    description: "Try something harder today!"
    lessons:
      - seven-nation-army
```

The number of exercises in a session is simply the number of entries in the list — no separate count to maintain.

### Validating content

Run the validator to check for errors before building:

```bash
npm run validate
```

This checks:
- YAML syntax
- Required fields per lesson type
- Lesson reference integrity (exercise → lesson ID exists)

## Themes

Themes are defined in `src/themes.css` using CSS custom properties. To add a new theme:

1. Add a new `[data-theme="your-theme"]` block in `src/themes.css`
2. Define all required CSS custom properties (copy from an existing theme)
3. Add the theme name to the themes array in `src/hooks/useTheme.ts`

## Deployment

### Automatic (GitHub Actions)

On push to `main`, the GitHub Action at `.github/workflows/deploy.yml`:
1. Installs dependencies
2. Validates content
3. Builds the site
4. Deploys `dist/` to the `gh-pages` branch

The site is live at `https://<username>.github.io/jonathan-drums/`.

### Manual

```bash
npm run deploy
```

This runs `build` and pushes `dist/` to the `gh-pages` branch.

## Architecture Overview

```
content/*.yaml  →  Vite (build-time import)  →  React SPA  →  static files  →  GitHub Pages
                                                    ↕
                                         sessionStorage (training progress)
                                         localStorage (theme preference)
```

- **Content flows one way**: YAML → build → JS bundle. No runtime YAML parsing.
- **State is browser-local**: Training progress in sessionStorage (clears on tab close). Theme in localStorage (persists).
- **No backend**: Everything is client-side. The only external call is YouTube iframe embeds.
- **Content editing**: Via LLM in Cursor (guided by `.cursor/rules/content-management.mdc`) or direct YAML editing.
