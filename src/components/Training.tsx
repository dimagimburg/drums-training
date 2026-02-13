import { getResolvedExercises } from '../data/loadContent';
import { useTrainingSession } from '../hooks/useTrainingSession';
import ExerciseStep from './ExerciseStep';
import CompletionScreen from './CompletionScreen';
import EmptyState from './EmptyState';

const exercises = getResolvedExercises();

export default function Training() {
  const {
    session,
    currentExercise,
    availableLessons,
    selectLessonAndAdvance,
    pickRandom,
    reset,
    totalExercises,
  } = useTrainingSession(exercises);

  // Edge case: no exercises configured
  if (exercises.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No exercises set up yet!"
        message="Ask your parent to add some exercises to get started."
      />
    );
  }

  // Training complete — show celebration
  if (session.completed) {
    return <CompletionScreen onRestart={reset} />;
  }

  // Active exercise
  if (currentExercise) {
    return (
      <ExerciseStep
        key={currentExercise.id}
        exercise={currentExercise}
        availableLessons={availableLessons}
        stepNumber={session.currentExerciseIndex + 1}
        totalSteps={totalExercises}
        onComplete={selectLessonAndAdvance}
        pickRandom={pickRandom}
      />
    );
  }

  // Fallback (shouldn't happen, but safe)
  return (
    <EmptyState
      icon="🤔"
      title="Something went wrong"
      message="Try refreshing the page or starting a new session."
    />
  );
}
