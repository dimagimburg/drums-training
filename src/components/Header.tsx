import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import './Header.css';

interface HeaderProps {
  /** Slot for LanguageSwitcher */
  languageSwitcher?: React.ReactNode;
  /** Slot for ThemeToggle */
  themeToggle?: React.ReactNode;
}

export default function Header({ languageSwitcher, themeToggle }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <header className="header">
      <div className="header__left">
        {!isHome && (
          <button
            className="header__home"
            onClick={() => navigate('/')}
            aria-label={t('header.backLabel')}
          >
            🏠
          </button>
        )}
      </div>

      <div className="header__center">
        <span className="header__title">{t('header.title')}</span>
      </div>

      <div className="header__right">
        {languageSwitcher}
        {themeToggle}
      </div>
    </header>
  );
}
