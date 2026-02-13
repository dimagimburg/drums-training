# Data Model: Jonathan's Drums Training Site

**Feature**: `001-drums-training-site`  
**Date**: 2026-02-13  
**Source**: [spec.md](./spec.md) Key Entities section

---

## Entity Overview

```
┌─────────────┐       references        ┌──────────────┐
│   Exercise   │ ─────────────────────── │    Lesson     │
│              │  (lesson IDs list)       │  (library)    │
└──────┬───────┘                         └──────────────┘
       │ belongs to                            │
       │                                       │ displayed in
┌──────┴───────┐                         ┌─────┴────────┐
│   Training   │                         │   Library     │
│   Config     │                         │   (all)       │
└──────────────┘                         └──────────────┘

┌──────────────┐   ephemeral (sessionStorage)
│  Training    │   tracks: currentExercise, selectedLessons
│  Session     │
└──────────────┘

┌──────────────┐   persistent (localStorage)
│  Theme       │   stores: selected theme name
│  Preference  │
└──────────────┘
```

---

## Entities

### Lesson (core content unit)

The single source of truth for all content. Stored in `content/lessons.yaml`. Displayed in the Library. Referenced by Exercises.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (slug format: `basic-rock-beat`, `billie-jean`). Used by exercises to reference this lesson. |
| `type` | enum | Yes | One of: `song`, `drum-beat`, `fundamental`. Extensible — new types can be added. |
| `title` | string | Yes | Display title shown to the kid. |
| `description` | string | No | Optional description/instructions. |
| `difficulty` | enum | No | One of: `beginner`, `intermediate`, `advanced`. Displayed as visual indicator if present. |
| `youtubeUrl` | string | Conditional | Required for `song` type. Full YouTube video URL. Embedded as iframe in lesson detail. |
| `links` | array | No | Optional list of related links. Each entry has `title` (string, required) and `url` (string, required). |

**Validation rules**:
- `id` must be unique across all lessons
- `id` must match pattern: `^[a-z0-9]+(-[a-z0-9]+)*$` (lowercase slug)
- `type` must be one of the defined enum values
- `title` must be non-empty
- `youtubeUrl` is required when `type` is `song`
- `youtubeUrl` must be a valid YouTube URL when provided
- `links[].title` and `links[].url` must be non-empty when a link entry exists
- `difficulty` must be one of the defined enum values when provided

### Exercise (training step)

A step in the training routine. Stored in `content/training.yaml`. References Lessons by ID.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for this exercise. |
| `title` | string | Yes | Display title (e.g., "Warm Up", "New Material"). |
| `description` | string | No | Optional instructions for the kid. |
| `lessons` | string[] | Yes | List of lesson IDs from the library. At least 1 required. |

**Validation rules**:
- `id` must be unique across all exercises
- `title` must be non-empty
- `lessons` must contain at least 1 entry
- Every entry in `lessons` must reference an existing lesson `id` from `content/lessons.yaml`

### Training Config (top-level training settings)

Top-level configuration for the training routine. Stored in `content/training.yaml`. The number of exercises in a session is simply the length of the `exercises` array — no separate count field needed.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `exercises` | Exercise[] | Yes | Ordered list of exercises. The kid does all of them in sequence. |

**Validation rules**:
- `exercises` must contain at least 1 entry

### Training Session (ephemeral runtime state)

Tracks progress through a single training run. Not stored in YAML — exists only in the browser's `sessionStorage`.

| Field | Type | Description |
|-------|------|-------------|
| `currentExerciseIndex` | number | 0-based index of the current exercise in the sequence. |
| `selectedLessons` | Record<string, string> | Map of exercise ID → selected lesson ID. Grows as kid progresses. |
| `completed` | boolean | True when all exercises are done. |

**State transitions**:
```
START → Exercise 0 (pick lesson) → Exercise 1 (pick lesson) → ... → Exercise N-1 (pick lesson) → COMPLETED
                                                                                                      ↓
                                                                                                 Show message
                                                                                                      ↓
                                                                                               "Start Again" → START
```

### Motivational Feedback

100 pre-written encouraging messages. Stored in `src/data/motivational-messages.json`.

| Field | Type | Description |
|-------|------|-------------|
| `messages` | string[] | Array of exactly 100 motivational strings. |

One message is selected randomly on training completion (`Math.random()` index).

### Theme Preference (persistent)

Stored in `localStorage` under a single key.

| Key | Type | Description |
|-----|------|-------------|
| `jonathan-drums-theme` | string | Name of the selected theme (e.g., `"ocean"`, `"sunset"`). Falls back to default theme if invalid or missing. |

---

## YAML File Formats

### content/lessons.yaml

```yaml
# Jonathan's Drums Library — Lesson Definitions
# Each lesson is a content item displayed in the Library section.
# Lessons are referenced by exercises in training.yaml.

# Supported types: song, drum-beat, fundamental
# Supported difficulties: beginner, intermediate, advanced (optional)

- id: billie-jean
  type: song
  title: "Billie Jean"
  description: "Classic Michael Jackson drum groove"
  difficulty: beginner
  youtubeUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y"
  links:
    - title: "Sheet music"
      url: "https://example.com/billie-jean-sheet"
    - title: "Slow practice version"
      url: "https://example.com/billie-jean-slow"

- id: basic-rock-beat
  type: drum-beat
  title: "Basic Rock Beat"
  description: "The foundation of rock drumming — kick, snare, hi-hat"
  difficulty: beginner
  links:
    - title: "Tutorial video"
      url: "https://example.com/basic-rock-tutorial"

- id: single-stroke-roll
  type: fundamental
  title: "Single Stroke Roll"
  description: "Alternating right-left-right-left stick control"
  difficulty: beginner
```

### content/training.yaml

```yaml
# Jonathan's Drums Training Routine
# Exercises are presented sequentially. The kid does ALL exercises in order.
# Each exercise references lessons from lessons.yaml by ID.

exercises:
  - id: warmup
    title: "Warm Up"
    description: "Start with something familiar to get your hands moving"
    lessons:
      - basic-rock-beat
      - single-stroke-roll

  - id: new-song
    title: "This Week's Song"
    description: "Practice the song from your last lesson"
    lessons:
      - billie-jean

  - id: beat-practice
    title: "Beat Practice"
    description: "Pick a beat and play along"
    lessons:
      - basic-rock-beat

  - id: cool-down
    title: "Cool Down"
    description: "End with something fun and easy"
    lessons:
      - billie-jean
      - basic-rock-beat
```

---

## TypeScript Interfaces

```typescript
// src/types.ts

export type LessonType = 'song' | 'drum-beat' | 'fundamental';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonLink {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  description?: string;
  difficulty?: Difficulty;
  youtubeUrl?: string;
  links?: LessonLink[];
}

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  lessons: string[]; // Lesson IDs referencing Lesson.id
}

export interface TrainingConfig {
  exercises: Exercise[];
}

export interface TrainingSession {
  currentExerciseIndex: number;
  selectedLessons: Record<string, string>; // exerciseId → lessonId
  completed: boolean;
}

export interface MotivationalMessages {
  messages: string[];
}

// Resolved exercise with full lesson objects (after ref resolution)
export interface ResolvedExercise {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[]; // Full lesson objects, resolved from IDs
}
```
