import { useRef } from 'react';
import { MAX_QUERY_LENGTH } from '../hooks/useSearch';
import './SearchBar.css';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        ref={inputRef}
        className="search-bar__input"
        type="search"
        placeholder="Search lessons…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        maxLength={MAX_QUERY_LENGTH}
        aria-label="Search lessons"
        autoComplete="off"
      />
      {query.length > 0 && (
        <button
          className="search-bar__clear"
          onClick={() => {
            onQueryChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
