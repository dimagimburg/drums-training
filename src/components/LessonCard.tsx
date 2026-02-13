import { Link } from 'react-router-dom';
import type { Lesson } from '../types';
import './LessonCard.css';

interface LessonCardProps {
  lesson: Lesson;
}

/** Type icon used across the app */
function typeIcon(type: string): string {
  switch (type) {
    case 'song': return '🎵';
    case 'drum-beat': return '🥁';
    case 'fundamental': return '🎯';
    default: return '📄';
  }
}

/** Readable type label */
function typeLabel(type: string): string {
  switch (type) {
    case 'song': return 'Song';
    case 'drum-beat': return 'Drum Beat';
    case 'fundamental': return 'Fundamental';
    default: return type;
  }
}

export default function LessonCard({ lesson }: LessonCardProps) {
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
          {typeLabel(lesson.type)}
        </span>
        {lesson.difficulty && (
          <span className={`lesson-card__difficulty lesson-card__difficulty--${lesson.difficulty}`}>
            {lesson.difficulty}
          </span>
        )}
      </div>
    </Link>
  );
}
