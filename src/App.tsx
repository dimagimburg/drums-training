import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Training from './components/Training';
import LessonDetail from './components/LessonDetail';
import './themes.css';
import './App.css';

// Placeholder — replaced in Phase 4 (US2)
function LibraryPlaceholder() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Library</h2>
      <p>Coming soon in Phase 4 (US2)…</p>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
        <Route path="/library" element={<LibraryPlaceholder />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
      </Routes>
    </HashRouter>
  );
}
