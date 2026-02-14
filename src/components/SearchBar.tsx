import { useRef } from 'react';
import { useTranslation } from '../i18n';
import { MAX_QUERY_LENGTH } from '../hooks/useSearch';
import './SearchBar.css';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        ref={inputRef}
        className="search-bar__input"
        type="search"
        placeholder={t('search.placeholder')}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        maxLength={MAX_QUERY_LENGTH}
        aria-label={t('search.ariaLabel')}
        autoComplete="off"
      />
      {query.length > 0 && (
        <button
          className="search-bar__clear"
          onClick={() => {
            onQueryChange('');
            inputRef.current?.focus();
          }}
          aria-label={t('search.clearAriaLabel')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
