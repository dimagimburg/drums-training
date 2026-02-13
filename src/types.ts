// src/types.ts — TypeScript interfaces for the entire application
// Source: specs/001-drums-training-site/data-model.md

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
