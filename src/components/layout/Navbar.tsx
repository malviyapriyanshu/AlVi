import React from 'react';
import { BarChart3, Menu, X } from 'lucide-react';

interface NavbarProps {
  overallProgress: number;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ overallProgress, onMenuToggle, isMenuOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black">
              Algo<span className="text-indigo-400">Vis</span>
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-700 rounded-full h-1.5">
                <div 
                  className="bg-indigo-500 h-1.5 rounded-full transition-all" 
                  style={{ width: `${overallProgress}%` }} 
                />
              </div>
              <span className="text-[10px] text-slate-500">{overallProgress}%</span>
            </div>
          </div>

          <button 
            onClick={onMenuToggle} 
            className="lg:hidden p-2 bg-slate-800 text-slate-400 rounded-lg border border-slate-700"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
