import { useState, useMemo } from 'react';
import type { LessonType } from '../types';
import { getAllLessons } from '../data/loadContent';
import { useSearch, getMatchSnippetKey } from '../hooks/useSearch';
import { useTranslation } from '../i18n';
import LibraryList from './LibraryList';
import SearchBar from './SearchBar';
import LessonCard from './LessonCard';
import EmptyState from './EmptyState';
import './Library.css';

type FilterOption = LessonType | 'all';

export default function Library() {
  const allLessons = useMemo(() => getAllLessons(), []);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const { query, setQuery, results, isSearching } = useSearch(allLessons);
  const { t } = useTranslation();

  const FILTER_OPTIONS: { value: FilterOption; label: string; icon: string }[] = [
    { value: 'all', label: t('library.filterAll'), icon: '📚' },
    { value: 'song', label: t('library.filterSongs'), icon: '🎵' },
    { value: 'drum-beat', label: t('library.filterBeats'), icon: '🥁' },
    { value: 'fundamental', label: t('library.filterFundamentals'), icon: '🎯' },
  ];

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
          title={t('library.emptyTitle')}
          message={t('library.emptyMessage')}
        />
      </main>
    );
  }

  return (
    <main className="library">
      <div className="library__header">
        <h1 className="library__title">{t('library.title')}</h1>
        <p className="library__subtitle">
          {t('library.lessonCount', { count: allLessons.length })}
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
                {t('library.searchResultCount', { count: results.length, query: query.trim() })}
              </p>
              <div className="library__results-list">
                {results.map(({ lesson, matches }) => (
                  <div key={lesson.id} className="library__result-item">
                    <LessonCard lesson={lesson} />
                    {(() => {
                      const matchKey = getMatchSnippetKey(matches);
                      if (!matchKey) return null;
                      const translationKey = matchKey === 'title' ? 'search.matchTitle'
                        : matchKey === 'description' ? 'search.matchDescription'
                        : 'search.matchLink';
                      return (
                        <span className="library__match-snippet">
                          {t(translationKey)}
                        </span>
                      );
                    })()}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon="🔍"
              title={t('library.noResultsTitle')}
              message={t('library.noResultsMessage')}
            />
          )}
        </div>
      ) : (
        <>
          {/* Type filter tabs — only in browse mode */}
          <nav className="library__filters" aria-label={t('library.filterAriaLabel')}>
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
