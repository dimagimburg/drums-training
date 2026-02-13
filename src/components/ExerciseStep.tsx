import { useState, useCallback, useRef } from 'react';
import type { Lesson, ResolvedExercise } from '../types';
import LessonDetail from './LessonDetail';
import './ExerciseStep.css';

interface ExerciseStepProps {
  exercise: ResolvedExercise;
  availableLessons: Lesson[];
  stepNumber: number;
  totalSteps: number;
  onComplete: (lessonId: string) => void;
  pickRandom: () => Lesson | null;
}

export default function ExerciseStep({
  exercise,
  availableLessons,
  stepNumber,
  totalSteps,
  onComplete,
  pickRandom,
}: ExerciseStepProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const doneRef = useRef(false); // Debounce guard for double-tap

  const handlePickLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
  }, []);

  const handlePickRandom = useCallback(() => {
    const lesson = pickRandom();
    if (lesson) {
      setSelectedLesson(lesson);
    }
  }, [pickRandom]);

  const handleDone = useCallback(() => {
    if (doneRef.current || !selectedLesson) return;
    doneRef.current = true;
    onComplete(selectedLesson.id);
  }, [selectedLesson, onComplete]);

  // --- View: Lesson selected — show detail + Done button ---
  if (selectedLesson) {
    return (
      <div className="exercise-step">
        <div className="exercise-step__progress">
          Exercise {stepNumber} of {totalSteps}
        </div>
        <h2 className="exercise-step__title">{exercise.title}</h2>

        <LessonDetail lesson={selectedLesson} inline />

        <div className="exercise-step__actions">
          <button
            className="exercise-step__change"
            onClick={() => {
              setSelectedLesson(null);
              doneRef.current = false;
            }}
          >
            ← Pick a different lesson
          </button>
          <button className="exercise-step__done" onClick={handleDone}>
            Done! Next exercise →
          </button>
        </div>
      </div>
    );
  }

  // --- View: No lesson selected — show lesson picker ---
  return (
    <div className="exercise-step">
      <div className="exercise-step__progress">
        Exercise {stepNumber} of {totalSteps}
      </div>
      <h2 className="exercise-step__title">{exercise.title}</h2>
      {exercise.description && (
        <p className="exercise-step__description">{exercise.description}</p>
      )}

      <div className="exercise-step__picker">
        <h3 className="exercise-step__picker-heading">Pick a lesson:</h3>

        <div className="exercise-step__lesson-list">
          {availableLessons.map((lesson) => (
            <button
              key={lesson.id}
              className="exercise-step__lesson-option"
              onClick={() => handlePickLesson(lesson)}
            >
              <span className={`exercise-step__lesson-type exercise-step__lesson-type--${lesson.type}`}>
                {lesson.type === 'song' ? '🎵' : lesson.type === 'drum-beat' ? '🥁' : '🎯'}
              </span>
              <span className="exercise-step__lesson-title">{lesson.title}</span>
            </button>
          ))}
        </div>

        <button className="exercise-step__random" onClick={handlePickRandom}>
          🎲 Pick for me!
        </button>
      </div>
    </div>
  );
}
