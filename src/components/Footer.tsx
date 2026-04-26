import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Ideas', path: '/ideas' },
  { label: 'Events', path: '/events' },
  { label: 'Team', path: '/team' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Mail, href: 'mailto:fusionhub@college.edu', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-blue-900/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">FusionX</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Where innovation meets execution. We connect passionate builders with world-changing ideas.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
            <div className="space-y-3 text-sm text-gray-500">
              <p>Department of Computer Science<br />Innovation Hub, Block C<br />College Campus</p>
              <a href="mailto:fusionhub@college.edu" className="block hover:text-cyan-400 transition-colors">
                fusionhub@college.edu
              </a>
              <Link
                to="/ideas"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-200 text-sm"
              >
                <Zap size={14} />
                Submit Your Idea
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            Built with passion by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
              FusionX
            </span>
          </p>
          <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} FusionX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
