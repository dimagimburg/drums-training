import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Training from './components/Training';
import Library from './components/Library';
import LessonDetail from './components/LessonDetail';
import './themes.css';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
        <Route path="/library" element={<Library />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
      </Routes>
    </HashRouter>
  );
}
