import { useTranslation } from '../i18n';
import { getLanguageConfig } from '../i18n/types';
import './LanguageSwitcher.css';

/** Short display labels per language (always shown in the language's own script) */
const SHORT_LABELS: Record<string, string> = {
  en: 'EN',
  he: 'עב',
};

export default function LanguageSwitcher() {
  const { language, cycleLanguage, t } = useTranslation();
  const config = getLanguageConfig(language);
  const shortLabel = SHORT_LABELS[language] ?? language.toUpperCase();

  return (
    <button
      className="language-switcher"
      onClick={cycleLanguage}
      aria-label={t('language.switchAriaLabel')}
      title={config.label}
    >
      <span className="language-switcher__label">{shortLabel}</span>
    </button>
  );
}
