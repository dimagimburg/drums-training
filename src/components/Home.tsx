import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <h1 className="home__title">Jonathan's Drums</h1>
      <p className="home__subtitle">What do you want to do?</p>

      <nav className="home__nav">
        <Link to="/training" className="home__button home__button--training">
          <span className="home__button-icon" aria-hidden="true">🥁</span>
          <span className="home__button-label">Training</span>
        </Link>

        <Link to="/library" className="home__button home__button--library">
          <span className="home__button-icon" aria-hidden="true">📚</span>
          <span className="home__button-label">Library</span>
        </Link>
      </nav>
    </main>
  );
}
