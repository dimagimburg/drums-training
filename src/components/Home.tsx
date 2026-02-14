import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="home">
      <h1 className="home__title">{t('home.title')}</h1>
      <p className="home__subtitle">{t('home.subtitle')}</p>

      <nav className="home__nav">
        <Link to="/training" className="home__button home__button--training">
          <span className="home__button-icon" aria-hidden="true">🥁</span>
          <span className="home__button-label">{t('home.training')}</span>
        </Link>

        <Link to="/library" className="home__button home__button--library">
          <span className="home__button-icon" aria-hidden="true">📚</span>
          <span className="home__button-label">{t('home.library')}</span>
        </Link>
      </nav>
    </main>
  );
}
