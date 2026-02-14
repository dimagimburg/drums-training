import { getResolvedExercises } from '../data/loadContent';
import { useTrainingSession } from '../hooks/useTrainingSession';
import { useTranslation } from '../i18n';
import ExerciseStep from './ExerciseStep';
import CompletionScreen from './CompletionScreen';
import EmptyState from './EmptyState';

const exercises = getResolvedExercises();

export default function Training() {
  const { t } = useTranslation();
  const {
    session,
    currentExercise,
    availableLessons,
    selectLessonAndAdvance,
    goBack,
    canGoBack,
    pickRandom,
    reset,
    totalExercises,
  } = useTrainingSession(exercises);

  if (exercises.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title={t('training.emptyTitle')}
        message={t('training.emptyMessage')}
      />
    );
  }

  if (session.completed) {
    return <CompletionScreen onRestart={reset} />;
  }

  if (currentExercise) {
    return (
      <ExerciseStep
        key={currentExercise.id}
        exercise={currentExercise}
        availableLessons={availableLessons}
        stepNumber={session.currentExerciseIndex + 1}
        totalSteps={totalExercises}
        onComplete={selectLessonAndAdvance}
        onGoBack={canGoBack ? goBack : undefined}
        onReset={reset}
        pickRandom={pickRandom}
      />
    );
  }

  return (
    <EmptyState
      icon="🤔"
      title={t('training.errorTitle')}
      message={t('training.errorMessage')}
    />
  );
}
