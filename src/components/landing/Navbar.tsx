import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Play, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLaunch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLaunch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Algorithms', href: '#algorithms' },
    { name: 'How it Works', href: '#how-it-works' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Ai<span className="text-indigo-500">Vi</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-indigo-400 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-6 w-[1px] bg-slate-800" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
          >
            <Github size={22} />
          </a>
          <button 
            onClick={onLaunch}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/25"
          >
            Launch App
            <Play size={16} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-indigo-400 text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-white bg-slate-800 p-2 rounded-full">
              <Github size={24} />
            </a>
            <button 
              onClick={onLaunch}
              className="flex-1 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Launch App
              <Play size={16} fill="currentColor" />
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
