// src/i18n/types.ts — Language types, translation key definitions, language config

/** Supported language codes */
export type LanguageCode = 'en' | 'he';

/** Text direction */
export type Direction = 'ltr' | 'rtl';

/** Language configuration */
export interface LanguageConfig {
  code: LanguageCode;
  label: string; // Display name in its own language
  dir: Direction;
}

/** All supported languages */
export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
];

/** Languages that use RTL layout */
export const RTL_LANGUAGES: LanguageCode[] = ['he'];

/** Default language */
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

/** localStorage key for language preference */
export const LANGUAGE_STORAGE_KEY = 'jonathan-drums-language';

/** All valid language codes (for validation) */
export const VALID_LANGUAGE_CODES: LanguageCode[] = LANGUAGES.map((l) => l.code);

/** Get language config by code */
export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]!;
}

/**
 * Translation bundle type — every key must exist in every language file.
 * Plural keys use _one/_other suffixes.
 * Interpolation uses {{variable}} tokens.
 */
export interface Translations {
  // Home
  'home.title': string;
  'home.subtitle': string;
  'home.training': string;
  'home.library': string;

  // Header
  'header.title': string;
  'header.backLabel': string;

  // Training
  'training.emptyTitle': string;
  'training.emptyMessage': string;
  'training.errorTitle': string;
  'training.errorMessage': string;

  // Exercise
  'exercise.progress': string;
  'exercise.pickLesson': string;
  'exercise.pickForMe': string;
  'exercise.done': string;
  'exercise.previous': string;
  'exercise.startOver': string;
  'exercise.changeLesson': string;
  'exercise.noLessonsTitle': string;
  'exercise.noLessonsMessage': string;

  // Completion
  'completion.title': string;
  'completion.fallbackMessage': string;
  'completion.startAgain': string;

  // Library
  'library.title': string;
  'library.lessonCount_one': string;
  'library.lessonCount_other': string;
  'library.searchResultCount_one': string;
  'library.searchResultCount_other': string;
  'library.emptyTitle': string;
  'library.emptyMessage': string;
  'library.noResultsTitle': string;
  'library.noResultsMessage': string;
  'library.filterAll': string;
  'library.filterSongs': string;
  'library.filterBeats': string;
  'library.filterFundamentals': string;
  'library.filterAriaLabel': string;

  // Library List
  'libraryList.songs': string;
  'libraryList.beats': string;
  'libraryList.fundamentals': string;
  'libraryList.emptyTitle': string;
  'libraryList.emptyMessage': string;

  // Lesson Detail
  'lessonDetail.backToLibrary': string;
  'lessonDetail.links': string;
  'lessonDetail.notFoundTitle': string;
  'lessonDetail.notFoundMessage': string;

  // Lesson Types
  'lessonType.song': string;
  'lessonType.drumBeat': string;
  'lessonType.fundamental': string;

  // Difficulty
  'difficulty.beginner': string;
  'difficulty.intermediate': string;
  'difficulty.advanced': string;

  // Themes
  'theme.ocean': string;
  'theme.sunset': string;
  'theme.toggleAriaLabel': string;
  'theme.toggleTitle': string;

  // Search
  'search.placeholder': string;
  'search.ariaLabel': string;
  'search.clearAriaLabel': string;
  'search.matchTitle': string;
  'search.matchDescription': string;
  'search.matchLink': string;

  // YouTube
  'youtube.openOnYouTube': string;
  'youtube.openFallback': string;

  // Language
  'language.switchAriaLabel': string;

  // Meta
  'meta.title': string;
  'meta.description': string;
  'meta.noscript': string;
}

/** Translation key type (for type-safe lookups) */
export type TranslationKey = keyof Translations;
