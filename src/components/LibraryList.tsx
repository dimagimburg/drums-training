import type { Lesson, LessonType } from '../types';
import LessonCard from './LessonCard';
import EmptyState from './EmptyState';
import './LibraryList.css';

interface LibraryListProps {
  lessons: Lesson[];
  /** When set, lessons are shown as a flat list (already filtered). Otherwise grouped by type. */
  activeFilter: LessonType | 'all';
}

/** Display order and labels for lesson type groups */
const TYPE_GROUPS: { type: LessonType; label: string; icon: string }[] = [
  { type: 'song', label: 'Songs', icon: '🎵' },
  { type: 'drum-beat', label: 'Drum Beats', icon: '🥁' },
  { type: 'fundamental', label: 'Fundamentals', icon: '🎯' },
];

export default function LibraryList({ lessons, activeFilter }: LibraryListProps) {
  if (lessons.length === 0) {
    return (
      <EmptyState
        icon="📚"
        title="No lessons yet"
        message="No lessons found. Ask your parent to add some!"
      />
    );
  }

  // When a specific type is selected, render a flat list (no section headers)
  if (activeFilter !== 'all') {
    return (
      <div className="library-list">
        <div className="library-list__cards">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    );
  }

  // "All" view — group by type with section headers
  return (
    <div className="library-list">
      {TYPE_GROUPS.map(({ type, label, icon }) => {
        const group = lessons.filter((l) => l.type === type);
        if (group.length === 0) return null;

        return (
          <section key={type} className="library-list__section">
            <h3 className="library-list__section-heading">
              <span aria-hidden="true">{icon}</span> {label}
              <span className="library-list__section-count">{group.length}</span>
            </h3>
            <div className="library-list__cards">
              {group.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
