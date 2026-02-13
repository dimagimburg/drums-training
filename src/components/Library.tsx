import { useState, useMemo } from 'react';
import type { LessonType } from '../types';
import { getAllLessons } from '../data/loadContent';
import { useSearch, getMatchSnippet } from '../hooks/useSearch';
import LibraryList from './LibraryList';
import SearchBar from './SearchBar';
import LessonCard from './LessonCard';
import EmptyState from './EmptyState';
import './Library.css';

type FilterOption = LessonType | 'all';

const FILTER_OPTIONS: { value: FilterOption; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '📚' },
  { value: 'song', label: 'Songs', icon: '🎵' },
  { value: 'drum-beat', label: 'Beats', icon: '🥁' },
  { value: 'fundamental', label: 'Fundamentals', icon: '🎯' },
];

export default function Library() {
  const allLessons = useMemo(() => getAllLessons(), []);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const { query, setQuery, results, isSearching } = useSearch(allLessons);

  // Apply type filter (for browse mode only)
  const filteredLessons = useMemo(() => {
    if (activeFilter === 'all') return allLessons;
    return allLessons.filter((l) => l.type === activeFilter);
  }, [allLessons, activeFilter]);

  // Empty library — no lessons at all
  if (allLessons.length === 0) {
    return (
      <main className="library">
        <EmptyState
          icon="📚"
          title="Library is empty"
          message="No lessons set up yet! Ask your parent to add some."
        />
      </main>
    );
  }

  return (
    <main className="library">
      <div className="library__header">
        <h1 className="library__title">Library</h1>
        <p className="library__subtitle">
          {allLessons.length} lesson{allLessons.length !== 1 ? 's' : ''} to explore
        </p>
      </div>

      {/* Search bar — always visible */}
      <SearchBar query={query} onQueryChange={setQuery} />

      {/* Search results mode */}
      {isSearching ? (
        <div className="library__search-results">
          {results.length > 0 ? (
            <>
              <p className="library__results-count">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query.trim()}"
              </p>
              <div className="library__results-list">
                {results.map(({ lesson, matches }) => (
                  <div key={lesson.id} className="library__result-item">
                    <LessonCard lesson={lesson} />
                    {(() => {
                      const snippet = getMatchSnippet(matches);
                      return snippet ? (
                        <span className="library__match-snippet">{snippet}</span>
                      ) : null;
                    })()}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon="🔍"
              title="No lessons found"
              message="Try different words or check your spelling!"
            />
          )}
        </div>
      ) : (
        <>
          {/* Type filter tabs — only in browse mode */}
          <nav className="library__filters" aria-label="Filter by lesson type">
            {FILTER_OPTIONS.map(({ value, label, icon }) => {
              const count =
                value === 'all'
                  ? allLessons.length
                  : allLessons.filter((l) => l.type === value).length;

              if (count === 0 && value !== 'all') return null;

              return (
                <button
                  key={value}
                  className={`library__filter ${activeFilter === value ? 'library__filter--active' : ''}`}
                  onClick={() => setActiveFilter(value)}
                  aria-pressed={activeFilter === value}
                >
                  <span aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                  <span className="library__filter-count">{count}</span>
                </button>
              );
            })}
          </nav>

          {/* Grouped lesson list */}
          <LibraryList lessons={filteredLessons} activeFilter={activeFilter} />
        </>
      )}
    </main>
  );
}
