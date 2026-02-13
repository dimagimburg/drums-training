// src/data/loadContent.ts — Import YAML content, validate, resolve references
// This module is the single point of entry for all content data.
// YAML files are imported at build time via vite-plugin-yaml (no runtime parsing).

import type { Lesson, Exercise, TrainingConfig, ResolvedExercise } from '../types';
import lessonsYaml from '../../content/lessons.yaml';
import trainingYaml from '../../content/training.yaml';

// --- Raw imports (typed from YAML) ---

const rawLessons = lessonsYaml as Lesson[];
const rawTraining = trainingYaml as TrainingConfig;

// --- Lesson lookup map ---

const lessonMap = new Map<string, Lesson>();
for (const lesson of rawLessons) {
  if (lessonMap.has(lesson.id)) {
    console.warn(`[loadContent] Duplicate lesson ID: "${lesson.id}". Using first occurrence.`);
  } else {
    lessonMap.set(lesson.id, lesson);
  }
}

// --- Public API ---

/** All lessons from content/lessons.yaml */
export function getAllLessons(): Lesson[] {
  return rawLessons;
}

/** Look up a single lesson by ID. Returns undefined if not found. */
export function getLessonById(id: string): Lesson | undefined {
  return lessonMap.get(id);
}

/** All exercises from content/training.yaml (unresolved — lesson IDs only) */
export function getTrainingConfig(): TrainingConfig {
  return rawTraining;
}

/**
 * Resolve all exercises: replace lesson ID strings with full Lesson objects.
 * Logs warnings for broken references but does not crash — missing lessons
 * are silently omitted from the resolved list.
 */
export function getResolvedExercises(): ResolvedExercise[] {
  return rawTraining.exercises.map((exercise: Exercise) => {
    const resolvedLessons: Lesson[] = [];

    for (const lessonId of exercise.lessons) {
      const lesson = lessonMap.get(lessonId);
      if (lesson) {
        resolvedLessons.push(lesson);
      } else {
        console.error(
          `[loadContent] Exercise "${exercise.id}" references unknown lesson "${lessonId}". ` +
          `Check content/training.yaml — this lesson ID does not exist in content/lessons.yaml.`
        );
      }
    }

    return {
      id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      lessons: resolvedLessons,
    };
  });
}
