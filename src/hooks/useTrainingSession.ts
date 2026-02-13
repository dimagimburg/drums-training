import { useState, useCallback, useEffect } from 'react';
import type { TrainingSession, ResolvedExercise, Lesson } from '../types';

const STORAGE_KEY = 'jonathan-drums-training-session';

/** Load session from sessionStorage, or return a fresh session. */
function loadSession(): TrainingSession {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TrainingSession;
      // Basic shape validation
      if (
        typeof parsed.currentExerciseIndex === 'number' &&
        typeof parsed.selectedLessons === 'object' &&
        typeof parsed.completed === 'boolean'
      ) {
        return parsed;
      }
    }
  } catch {
    // Corrupted or unavailable — start fresh
  }
  return { currentExerciseIndex: 0, selectedLessons: {}, completed: false };
}

/** Persist session to sessionStorage. */
function saveSession(session: TrainingSession): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // sessionStorage unavailable — degrade silently
  }
}

export interface UseTrainingSessionReturn {
  session: TrainingSession;
  /** The current exercise (resolved with full lesson objects). */
  currentExercise: ResolvedExercise | null;
  /** Lessons available for the current exercise (with deduplication applied). */
  availableLessons: Lesson[];
  /** Select a lesson for the current exercise and advance to the next. */
  selectLessonAndAdvance: (lessonId: string) => void;
  /** Pick a random lesson from the available list. Returns the picked lesson. */
  pickRandom: () => Lesson | null;
  /** Reset the session (start over). */
  reset: () => void;
  /** Total number of exercises. */
  totalExercises: number;
}

export function useTrainingSession(
  exercises: ResolvedExercise[]
): UseTrainingSessionReturn {
  const [session, setSession] = useState<TrainingSession>(loadSession);

  // Persist on every change
  useEffect(() => {
    saveSession(session);
  }, [session]);

  const totalExercises = exercises.length;

  // Current exercise
  const currentExercise: ResolvedExercise | null =
    !session.completed && session.currentExerciseIndex < exercises.length
      ? exercises[session.currentExerciseIndex] ?? null
      : null;

  // Deduplication: remove lessons already selected in previous exercises,
  // UNLESS all lessons in this exercise have been used (then allow all).
  const alreadySelectedIds = new Set(Object.values(session.selectedLessons));

  const availableLessons: Lesson[] = (() => {
    if (!currentExercise) return [];

    const fresh = currentExercise.lessons.filter(
      (l) => !alreadySelectedIds.has(l.id)
    );

    // If all lessons were already used, override deduplication (edge case)
    return fresh.length > 0 ? fresh : currentExercise.lessons;
  })();

  const selectLessonAndAdvance = useCallback(
    (lessonId: string) => {
      setSession((prev) => {
        if (prev.completed || !currentExercise) return prev;

        const newSelected = {
          ...prev.selectedLessons,
          [currentExercise.id]: lessonId,
        };

        const nextIndex = prev.currentExerciseIndex + 1;
        const isComplete = nextIndex >= exercises.length;

        return {
          currentExerciseIndex: nextIndex,
          selectedLessons: newSelected,
          completed: isComplete,
        };
      });
    },
    [currentExercise, exercises.length]
  );

  const pickRandom = useCallback((): Lesson | null => {
    if (availableLessons.length === 0) return null;
    const idx = Math.floor(Math.random() * availableLessons.length);
    return availableLessons[idx] ?? null;
  }, [availableLessons]);

  const reset = useCallback(() => {
    const fresh: TrainingSession = {
      currentExerciseIndex: 0,
      selectedLessons: {},
      completed: false,
    };
    setSession(fresh);
    saveSession(fresh);
  }, []);

  return {
    session,
    currentExercise,
    availableLessons,
    selectLessonAndAdvance,
    pickRandom,
    reset,
    totalExercises,
  };
}
