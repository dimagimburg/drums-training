# Jonathan's Drums

A drums training and library website built for an 8-year-old kid to practice exercises sequentially and explore a searchable library of drum lessons.

**Live site**: [dimagimburg.github.io/drums-training](https://dimagimburg.github.io/drums-training/)

## What It Does

- **Training Routine** — A sequential set of exercises the kid walks through daily. Each exercise offers a list of lessons to pick from (or a "Pick for me" random button). Completed exercises show a motivational celebration message.
- **Lesson Library** — Browse all lessons grouped by type (Songs, Drum Beats, Fundamentals) with fuzzy search. Songs include embedded YouTube videos.
- **Theme Switching** — Two visual themes (Ocean and Sunset) the kid can toggle from any page. Choice persists across sessions.
- **Content via YAML** — Parents manage lessons and exercises by editing simple YAML files. No database, no admin panel.

## Quick Start

```bash
git clone https://github.com/dimagimburg/drums-training.git
cd drums-training
npm install
npm run dev
```

Dev server starts at `http://localhost:5173/drums-training/`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run validate` | Check YAML content for errors |
| `npm run build` | Validate + build static files to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Managing Content

All content lives in two YAML files:

- `content/lessons.yaml` — All lessons (songs, beats, fundamentals)
- `content/training.yaml` — Training routine (exercises referencing lessons)

### Add a lesson

```yaml
# content/lessons.yaml
- id: smoke-on-the-water
  type: song
  title: "Smoke on the Water"
  description: "Deep Purple classic with a simple but iconic drum part"
  difficulty: beginner
  youtubeUrl: "https://www.youtube.com/watch?v=zUwEIt9ez7M"
  links:
    - title: "Drum tutorial"
      url: "https://example.com/tutorial"
```

### Reference it in training

```yaml
# content/training.yaml
exercises:
  - id: new-song
    title: "This Week's Song"
    lessons:
      - smoke-on-the-water
```

### Validate before building

```bash
npm run validate
```

Catches YAML syntax errors, missing required fields, and broken lesson references.

**Tip**: If using [Cursor IDE](https://cursor.sh), you can ask the AI to add lessons for you — a built-in rule at `.cursor/rules/content-management.mdc` teaches it the schema.

## Architecture

```
content/*.yaml  →  Vite (build-time)  →  React SPA  →  static files  →  GitHub Pages
```

- Static site — no backend, no server runtime
- YAML compiled at build time into the JS bundle
- Training progress in `sessionStorage` (resets on tab close)
- Theme preference in `localStorage` (persists)
- YouTube embeds are the only external calls

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- React Router (HashRouter for GitHub Pages)
- Fuse.js (fuzzy search)
- CSS custom properties (theming)
- GitHub Actions (deployment)

## Adding Themes

1. Add a `[data-theme="your-theme"]` block in `src/themes.css`
2. Copy all CSS custom properties from an existing theme
3. Add the theme name to `THEMES` in `src/hooks/useTheme.ts`
4. Update the valid themes list in the `index.html` inline script

## License

Private project — not licensed for redistribution.
