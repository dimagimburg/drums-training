import './EmptyState.css';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export default function EmptyState({ icon = '🤷', title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">{icon}</span>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__message">{message}</p>
    </div>
  );
}
