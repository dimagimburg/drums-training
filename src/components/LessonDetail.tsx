import { useParams, useNavigate } from 'react-router-dom';
import type { Lesson } from '../types';
import { getLessonById } from '../data/loadContent';
import { useTranslation } from '../i18n';
import YouTubeEmbed from './YouTubeEmbed';
import EmptyState from './EmptyState';
import './LessonDetail.css';

interface LessonDetailProps {
  lesson?: Lesson;
  inline?: boolean;
}

function difficultyClass(difficulty: string): string {
  return `lesson-detail__difficulty--${difficulty}`;
}

export default function LessonDetail({ lesson: propLesson, inline }: LessonDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const lesson = propLesson ?? (id ? getLessonById(id) : undefined);

  if (!lesson) {
    return (
      <EmptyState
        icon="❓"
        title={t('lessonDetail.notFoundTitle')}
        message={t('lessonDetail.notFoundMessage', { id: id ?? 'unknown' })}
      />
    );
  }

  const typeKey = lesson.type === 'song' ? 'lessonType.song'
    : lesson.type === 'drum-beat' ? 'lessonType.drumBeat'
    : 'lessonType.fundamental';

  const difficultyKey = lesson.difficulty
    ? (`difficulty.${lesson.difficulty}` as 'difficulty.beginner' | 'difficulty.intermediate' | 'difficulty.advanced')
    : null;

  return (
    <article className={`lesson-detail ${inline ? 'lesson-detail--inline' : ''}`}>
      <div className="lesson-detail__header">
        <div className="lesson-detail__badges">
          <span className={`lesson-detail__type lesson-detail__type--${lesson.type}`}>
            {t(typeKey)}
          </span>
          {difficultyKey && (
            <span className={`lesson-detail__difficulty ${difficultyClass(lesson.difficulty!)}`}>
              {t(difficultyKey)}
            </span>
          )}
        </div>
        <h2 className="lesson-detail__title">{lesson.title}</h2>
        {lesson.description && (
          <p className="lesson-detail__description">{lesson.description}</p>
        )}
      </div>

      {lesson.type === 'song' && lesson.youtubeUrl && (
        <div className="lesson-detail__video">
          <YouTubeEmbed url={lesson.youtubeUrl} title={lesson.title} />
        </div>
      )}

      {lesson.links && lesson.links.length > 0 && (
        <div className="lesson-detail__links">
          <h3 className="lesson-detail__links-heading">{t('lessonDetail.links')}</h3>
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

      {!inline && (
        <button
          className="lesson-detail__back"
          onClick={() => navigate('/library')}
        >
          {t('lessonDetail.backToLibrary')}
        </button>
      )}
    </article>
  );
}
