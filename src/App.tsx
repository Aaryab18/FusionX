import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Ideas from './pages/Ideas';
import Events from './pages/Events';
import Team from './pages/Team';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050a14] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
