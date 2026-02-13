import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  /** Optional slot for ThemeToggle — injected in US6 */
  themeToggle?: React.ReactNode;
}

export default function Header({ themeToggle }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <header className="header">
      <div className="header__left">
        {!isHome && (
          <button
            className="header__home"
            onClick={() => navigate('/')}
            aria-label="Go to home"
          >
            🏠
          </button>
        )}
      </div>

      <div className="header__center">
        <span className="header__title">🥁 Jonathan's Drums</span>
      </div>

      <div className="header__right">
        {themeToggle}
      </div>
    </header>
  );
}
