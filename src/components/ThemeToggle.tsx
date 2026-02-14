import { useTheme, type ThemeName } from '../hooks/useTheme';
import { useTranslation } from '../i18n';
import './ThemeToggle.css';

const THEME_ICONS: Record<ThemeName, string> = {
  ocean: '🌊',
  sunset: '🌅',
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const { t } = useTranslation();
  const icon = THEME_ICONS[theme];
  const label = t(`theme.${theme}` as 'theme.ocean' | 'theme.sunset');

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={t('theme.toggleAriaLabel', { label })}
      title={t('theme.toggleTitle', { label })}
    >
      <span className="theme-toggle__icon" aria-hidden="true">{icon}</span>
    </button>
  );
}
