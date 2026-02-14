// src/hooks/useLanguage.ts — Language preference persistence and detection
// Follows the same pattern as useTheme.ts: read from DOM (set by index.html inline script),
// update DOM + localStorage on change.

import { useState, useCallback } from 'react';
import {
  type LanguageCode,
  type Direction,
  VALID_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  getLanguageConfig,
} from '../i18n/types';

/** Read the currently active language from the DOM (set by index.html inline script). */
function getInitialLanguage(): LanguageCode {
  const attr = document.documentElement.getAttribute('lang');
  if (attr && VALID_LANGUAGE_CODES.includes(attr as LanguageCode)) {
    return attr as LanguageCode;
  }
  return DEFAULT_LANGUAGE;
}

/** Apply language to DOM and persist to localStorage. */
function applyLanguage(code: LanguageCode): void {
  const config = getLanguageConfig(code);
  document.documentElement.setAttribute('lang', code);
  document.documentElement.setAttribute('dir', config.dir);
  // Update page title and meta description
  document.title = code === 'en' ? "Jonathan's Drums" : "התופים של ג'ונתן";
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    // localStorage unavailable — fail silently, language still works for this session.
  }
}

export function useLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    applyLanguage(code);
    setLanguageState(code);
  }, []);

  const cycleLanguage = useCallback(() => {
    const codes = VALID_LANGUAGE_CODES;
    const currentIndex = codes.indexOf(language);
    const nextIndex = (currentIndex + 1) % codes.length;
    setLanguage(codes[nextIndex] ?? DEFAULT_LANGUAGE);
  }, [language, setLanguage]);

  const dir: Direction = getLanguageConfig(language).dir;

  return {
    language,
    setLanguage,
    cycleLanguage,
    dir,
  };
}
