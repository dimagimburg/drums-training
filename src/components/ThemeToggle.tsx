import { useTheme, type ThemeName } from '../hooks/useTheme';
import './ThemeToggle.css';

/** Display metadata for each theme */
const THEME_META: Record<ThemeName, { icon: string; label: string }> = {
  ocean: { icon: '🌊', label: 'Ocean' },
  sunset: { icon: '🌅', label: 'Sunset' },
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const meta = THEME_META[theme];

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Current theme: ${meta.label}. Tap to switch.`}
      title={`Theme: ${meta.label}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">{meta.icon}</span>
    </button>
  );
}
