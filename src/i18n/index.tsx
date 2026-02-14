// src/i18n/index.ts — LanguageProvider, useTranslation hook, and t() function
// Custom lightweight i18n — no library dependency.
// Provides: { t, language, setLanguage, dir }

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { LanguageCode, Direction, Translations, TranslationKey } from './types';
import { useLanguage } from '../hooks/useLanguage';
import en from './en';
import he from './he';

/** Translation bundles indexed by language code */
const bundles: Record<LanguageCode, Translations> = { en, he };

/**
 * Translate a key with optional interpolation and pluralization.
 *
 * Simple:  t('home.title')
 * Interpolation:  t('exercise.progress', { current: 2, total: 4 })
 * Pluralization:  t('library.lessonCount', { count: 5 })
 *   → resolves to 'library.lessonCount_one' or 'library.lessonCount_other'
 */
function translate(
  language: LanguageCode,
  key: string,
  params?: Record<string, string | number>,
): string {
  const bundle = bundles[language];
  const fallback = bundles.en;

  let resolvedKey = key;

  // Pluralization: if params.count exists, append _one or _other suffix
  if (params && typeof params.count === 'number') {
    const pluralRules = new Intl.PluralRules(language);
    const category = pluralRules.select(params.count); // 'one' | 'other' | ...
    const pluralKey = `${key}_${category}`;
    // Check if the plural key exists
    if (pluralKey in bundle) {
      resolvedKey = pluralKey;
    }
  }

  // Look up in current language, fall back to English, fall back to raw key
  let text =
    (bundle as unknown as Record<string, string>)[resolvedKey]
    ?? (fallback as unknown as Record<string, string>)[resolvedKey]
    ?? resolvedKey;

  // Interpolation: replace {{variable}} tokens
  if (params) {
    for (const [varName, value] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{\\{${varName}\\}\\}`, 'g'), String(value));
    }
  }

  return text;
}

// --- React Context ---

interface I18nContextValue {
  /** Translate a key. Accepts exact keys or plural base keys (e.g., 'library.lessonCount' resolves to _one/_other). */
  t: (key: TranslationKey | string, params?: Record<string, string | number>) => string;
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  cycleLanguage: () => void;
  dir: Direction;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { language, setLanguage, cycleLanguage, dir } = useLanguage();

  const value = useMemo<I18nContextValue>(
    () => ({
      t: (key, params) => translate(language, key, params),
      language,
      setLanguage,
      cycleLanguage,
      dir,
    }),
    [language, setLanguage, cycleLanguage, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook to access translations in any component.
 * Returns { t, language, setLanguage, cycleLanguage, dir }
 */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
