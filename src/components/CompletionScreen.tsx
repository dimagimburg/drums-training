import { useMemo } from 'react';
import type { MotivationalMessages } from '../types';
import messagesData from '../data/motivational-messages.json';
import './CompletionScreen.css';

interface CompletionScreenProps {
  onRestart: () => void;
}

const messages = (messagesData as MotivationalMessages).messages;

export default function CompletionScreen({ onRestart }: CompletionScreenProps) {
  // Pick a random message once per mount
  const message = useMemo(() => {
    const idx = Math.floor(Math.random() * messages.length);
    return messages[idx] ?? 'Great job today!';
  }, []);

  return (
    <div className="completion">
      <div className="completion__celebration" aria-hidden="true">
        🎉🥁🎉
      </div>
      <h1 className="completion__title">Amazing Job!</h1>
      <p className="completion__message">{message}</p>
      <button className="completion__restart" onClick={onRestart}>
        🔄 Start Again
      </button>
    </div>
  );
}
