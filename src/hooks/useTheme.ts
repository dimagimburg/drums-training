// src/hooks/useTheme.ts — Theme state management with localStorage persistence
// Reads/writes the `jonathan-drums-theme` localStorage key and the
// `data-theme` attribute on <html>. The inline script in index.html
// applies the saved theme before React mounts (no flash).

import { useState, useCallback } from 'react';

/** Available themes — add new theme names here after defining them in themes.css */
export const THEMES = ['ocean', 'sunset'] as const;
export type ThemeName = (typeof THEMES)[number];

const STORAGE_KEY = 'jonathan-drums-theme';
const DEFAULT_THEME: ThemeName = 'ocean';

/** Read the currently active theme from the DOM (set by index.html inline script). */
function getInitialTheme(): ThemeName {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr && THEMES.includes(attr as ThemeName)) {
    return attr as ThemeName;
  }
  return DEFAULT_THEME;
}

/** Apply theme to DOM and persist to localStorage. */
function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — fail silently.
    // The theme still works for this session via the DOM attribute.
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme);

  const setTheme = useCallback((next: ThemeName) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex] ?? DEFAULT_THEME);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    cycleTheme,
    themes: THEMES,
  };
}
