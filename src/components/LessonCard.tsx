import { Link } from 'react-router-dom';
import type { Lesson } from '../types';
import { useTranslation } from '../i18n';
import './LessonCard.css';

interface LessonCardProps {
  lesson: Lesson;
}

function typeIcon(type: string): string {
  switch (type) {
    case 'song': return '🎵';
    case 'drum-beat': return '🥁';
    case 'fundamental': return '🎯';
    default: return '📄';
  }
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const { t } = useTranslation();

  const typeKey = lesson.type === 'song' ? 'lessonType.song'
    : lesson.type === 'drum-beat' ? 'lessonType.drumBeat'
    : 'lessonType.fundamental';

  const difficultyKey = lesson.difficulty
    ? (`difficulty.${lesson.difficulty}` as 'difficulty.beginner' | 'difficulty.intermediate' | 'difficulty.advanced')
    : null;

  return (
    <Link to={`/lesson/${lesson.id}`} className="lesson-card">
      <span className="lesson-card__icon" aria-hidden="true">
        {typeIcon(lesson.type)}
      </span>

      <div className="lesson-card__body">
        <span className="lesson-card__title">{lesson.title}</span>
        {lesson.description && (
          <span className="lesson-card__description">{lesson.description}</span>
        )}
      </div>

      <div className="lesson-card__meta">
        <span className={`lesson-card__type lesson-card__type--${lesson.type}`}>
          {t(typeKey)}
        </span>
        {difficultyKey && (
          <span className={`lesson-card__difficulty lesson-card__difficulty--${lesson.difficulty}`}>
            {t(difficultyKey)}
          </span>
        )}
      </div>
    </Link>
  );
}
