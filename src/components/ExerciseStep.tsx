import { useState, useCallback, useRef } from 'react';
import type { Lesson, ResolvedExercise } from '../types';
import { useTranslation } from '../i18n';
import LessonDetail from './LessonDetail';
import EmptyState from './EmptyState';
import './ExerciseStep.css';

interface ExerciseStepProps {
  exercise: ResolvedExercise;
  availableLessons: Lesson[];
  stepNumber: number;
  totalSteps: number;
  onComplete: (lessonId: string) => void;
  onGoBack?: () => void;
  onReset: () => void;
  pickRandom: () => Lesson | null;
}

export default function ExerciseStep({
  exercise,
  availableLessons,
  stepNumber,
  totalSteps,
  onComplete,
  onGoBack,
  onReset,
  pickRandom,
}: ExerciseStepProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const doneRef = useRef(false);
  const { t } = useTranslation();

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

  const isFirstExercise = stepNumber === 1;

  const handleStartOver = useCallback(() => {
    if (isFirstExercise) {
      setSelectedLesson(null);
      doneRef.current = false;
    } else {
      onReset();
    }
  }, [isFirstExercise, onReset]);

  const showStartOver = !isFirstExercise || selectedLesson !== null;

  const wizardNav = (
    <div className="exercise-step__nav">
      {onGoBack ? (
        <button className="exercise-step__prev" onClick={onGoBack}>
          {t('exercise.previous')}
        </button>
      ) : (
        <span />
      )}
      <div className="exercise-step__progress">
        <span className="exercise-step__progress-text">
          {t('exercise.progress', { current: stepNumber, total: totalSteps })}
        </span>
        <div className="exercise-step__progress-bar">
          <div
            className="exercise-step__progress-fill"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {showStartOver ? (
        <button className="exercise-step__restart" onClick={handleStartOver}>
          <span aria-hidden="true">↺</span> {t('exercise.startOver')}
        </button>
      ) : (
        <span />
      )}
    </div>
  );

  if (selectedLesson) {
    return (
      <div className="exercise-step">
        {wizardNav}
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
            {t('exercise.changeLesson')}
          </button>
          <button className="exercise-step__done" onClick={handleDone}>
            {t('exercise.done')}
          </button>
        </div>
      </div>
    );
  }

  if (availableLessons.length === 0) {
    return (
      <div className="exercise-step">
        {wizardNav}
        <h2 className="exercise-step__title">{exercise.title}</h2>
        <EmptyState
          icon="⚠️"
          title={t('exercise.noLessonsTitle')}
          message={t('exercise.noLessonsMessage')}
        />
      </div>
    );
  }

  return (
    <div className="exercise-step">
      {wizardNav}
      <h2 className="exercise-step__title">{exercise.title}</h2>
      {exercise.description && (
        <p className="exercise-step__description">{exercise.description}</p>
      )}

      <div className="exercise-step__picker">
        <h3 className="exercise-step__picker-heading">{t('exercise.pickLesson')}</h3>

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
          {t('exercise.pickForMe')}
        </button>
      </div>
    </div>
  );
}
