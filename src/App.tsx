import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Header from './components/Header';
import Home from './components/Home';
import Training from './components/Training';
import Library from './components/Library';
import LessonDetail from './components/LessonDetail';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import './themes.css';
import './App.css';

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Header
          languageSwitcher={<LanguageSwitcher />}
          themeToggle={<ThemeToggle />}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<Training />} />
          <Route path="/library" element={<Library />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}
