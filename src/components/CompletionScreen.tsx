import { useMemo } from 'react';
import type { MotivationalMessages } from '../types';
import { useTranslation } from '../i18n';
import enMessages from '../data/motivational-messages.json';
import heMessages from '../data/motivational-messages.he.json';
import './CompletionScreen.css';

interface CompletionScreenProps {
  onRestart: () => void;
}

const messagesByLanguage: Record<string, string[]> = {
  en: (enMessages as MotivationalMessages).messages,
  he: (heMessages as MotivationalMessages).messages,
};

export default function CompletionScreen({ onRestart }: CompletionScreenProps) {
  const { t, language } = useTranslation();

  const message = useMemo(() => {
    const msgs = messagesByLanguage[language] ?? messagesByLanguage.en!;
    const idx = Math.floor(Math.random() * msgs.length);
    return msgs[idx] ?? t('completion.fallbackMessage');
  }, [language, t]);

  return (
    <div className="completion">
      <div className="completion__celebration" aria-hidden="true">
        🎉🥁🎉
      </div>
      <h1 className="completion__title">{t('completion.title')}</h1>
      <p className="completion__message">{message}</p>
      <button className="completion__restart" onClick={onRestart}>
        {t('completion.startAgain')}
      </button>
    </div>
  );
}
