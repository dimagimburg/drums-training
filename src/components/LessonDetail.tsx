import { useParams, useNavigate } from 'react-router-dom';
import type { Lesson } from '../types';
import { getLessonById } from '../data/loadContent';
import YouTubeEmbed from './YouTubeEmbed';
import EmptyState from './EmptyState';
import './LessonDetail.css';

interface LessonDetailProps {
  /** If provided, renders this lesson directly (used inline in Training). */
  lesson?: Lesson;
  /** If true, hides the back button (parent component handles navigation). */
  inline?: boolean;
}

/** Difficulty badge color class */
function difficultyClass(difficulty: string): string {
  return `lesson-detail__difficulty--${difficulty}`;
}

/** Lesson type display label */
function typeLabel(type: string): string {
  switch (type) {
    case 'song': return 'Song';
    case 'drum-beat': return 'Drum Beat';
    case 'fundamental': return 'Fundamental';
    default: return type;
  }
}

export default function LessonDetail({ lesson: propLesson, inline }: LessonDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use prop lesson (inline mode) or look up by route param
  const lesson = propLesson ?? (id ? getLessonById(id) : undefined);

  if (!lesson) {
    return (
      <EmptyState
        icon="❓"
        title="Lesson not found"
        message={`We couldn't find a lesson with ID "${id ?? 'unknown'}". It might have been removed.`}
      />
    );
  }

  return (
    <article className={`lesson-detail ${inline ? 'lesson-detail--inline' : ''}`}>
      <div className="lesson-detail__header">
        <div className="lesson-detail__badges">
          <span className={`lesson-detail__type lesson-detail__type--${lesson.type}`}>
            {typeLabel(lesson.type)}
          </span>
          {lesson.difficulty && (
            <span className={`lesson-detail__difficulty ${difficultyClass(lesson.difficulty)}`}>
              {lesson.difficulty}
            </span>
          )}
        </div>
        <h2 className="lesson-detail__title">{lesson.title}</h2>
        {lesson.description && (
          <p className="lesson-detail__description">{lesson.description}</p>
        )}
      </div>

      {/* YouTube embed for songs */}
      {lesson.type === 'song' && lesson.youtubeUrl && (
        <div className="lesson-detail__video">
          <YouTubeEmbed url={lesson.youtubeUrl} title={lesson.title} />
        </div>
      )}

      {/* Links */}
      {lesson.links && lesson.links.length > 0 && (
        <div className="lesson-detail__links">
          <h3 className="lesson-detail__links-heading">Links</h3>
          <ul className="lesson-detail__links-list">
            {lesson.links.map((link, i) => (
              <li key={i}>
                <a
                  className="lesson-detail__link"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back button for standalone (routed) mode — navigates to library, not history */}
      {!inline && (
        <button
          className="lesson-detail__back"
          onClick={() => navigate('/library')}
        >
          ← Back to Library
        </button>
      )}
    </article>
  );
}
