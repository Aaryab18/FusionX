import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Ideas', path: '/ideas' },
  { label: 'Events', path: '/events' },
  { label: 'Team', path: '/team' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-blue-900/30 shadow-lg shadow-blue-950/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50 transition-shadow duration-300">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">FusionX</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/ideas"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
            >
              Submit Idea
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#050a14]/98 backdrop-blur-md border-t border-blue-900/30 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/ideas"
            className="mt-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold text-center"
          >
            Submit Idea
          </Link>
        </div>
      </div>
    </nav>
  );
}
