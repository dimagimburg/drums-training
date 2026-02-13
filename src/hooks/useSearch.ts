// src/hooks/useSearch.ts — Fuzzy search over lessons using Fuse.js
// Config per research.md R3: weighted keys, threshold 0.4, includeMatches.

import { useState, useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Lesson } from '../types';

/** Maximum characters allowed in search query (edge case: very long queries) */
export const MAX_QUERY_LENGTH = 100;

export interface SearchMatch {
  /** Which field matched (e.g., "title", "description", "links.title") */
  key: string;
  /** The matched value string */
  value: string;
  /** Character index ranges of the match within the value */
  indices: readonly [number, number][];
}

export interface SearchResult {
  lesson: Lesson;
  matches: SearchMatch[];
  score: number;
}

const FUSE_OPTIONS: IFuseOptions<Lesson> = {
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'description', weight: 1.0 },
    { name: 'links.title', weight: 0.5 },
  ],
  threshold: 0.4,
  includeMatches: true,
  includeScore: true,
};

export function useSearch(lessons: Lesson[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(lessons, FUSE_OPTIONS), [lessons]);

  const results: SearchResult[] = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) return [];

    return fuse.search(trimmed).map((result) => ({
      lesson: result.item,
      matches: (result.matches ?? []).map((m) => ({
        key: m.key ?? '',
        value: m.value ?? '',
        indices: m.indices as readonly [number, number][],
      })),
      score: result.score ?? 1,
    }));
  }, [fuse, query]);

  const isSearching = query.trim().length > 0;

  return {
    query,
    setQuery: (q: string) => setQuery(q.slice(0, MAX_QUERY_LENGTH)),
    results,
    isSearching,
  };
}

/**
 * Build a human-readable match snippet from Fuse.js match data.
 * Returns a short text indicating where the match was found.
 */
export function getMatchSnippet(matches: SearchMatch[]): string | null {
  if (matches.length === 0) return null;

  // Prefer title match, then description, then links.title
  const preferred = matches.find((m) => m.key === 'title')
    ?? matches.find((m) => m.key === 'description')
    ?? matches[0]!;

  const label =
    preferred.key === 'title' ? 'title'
    : preferred.key === 'description' ? 'description'
    : preferred.key === 'links.title' ? 'link'
    : preferred.key;

  return `Matched in ${label}`;
}
