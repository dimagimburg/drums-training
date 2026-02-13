import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './themes.css';
import './App.css';

// Placeholder components for routes — replaced in US1/US2 phases
function TrainingPlaceholder() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Training</h2>
      <p>Coming soon in Phase 3 (US1)…</p>
    </main>
  );
}

function LibraryPlaceholder() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Library</h2>
      <p>Coming soon in Phase 4 (US2)…</p>
    </main>
  );
}

function LessonDetailPlaceholder() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Lesson Detail</h2>
      <p>Coming soon in Phase 3 (US1)…</p>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<TrainingPlaceholder />} />
        <Route path="/library" element={<LibraryPlaceholder />} />
        <Route path="/lesson/:id" element={<LessonDetailPlaceholder />} />
      </Routes>
    </HashRouter>
  );
}
