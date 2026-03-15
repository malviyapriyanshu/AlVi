import React from 'react';
import { Layers, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  overallProgress: number;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ overallProgress, onMenuToggle, isMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16">
          <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-6">
              <Layers className="text-white" size={20} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Algo<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">Vis</span>
              <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-slate-500 align-middle">Beta v2</span>
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3 bg-slate-800/30 px-3 py-1.5 rounded-full border border-slate-700/50">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Course Progress</span>
               </div>
               <div className="w-32 bg-slate-900 rounded-full h-1.5 overflow-hidden ring-1 ring-white/5">
                 <div 
                   className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all duration-700 ease-out" 
                   style={{ width: `${overallProgress}%` }} 
                 />
               </div>
               <span className="text-xs font-mono font-bold text-indigo-400">{overallProgress}%</span>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold border border-slate-700/50 transition-all active:scale-95 group">
               <span>Community</span>
               <ArrowUpRight size={14} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <button 
            onClick={onMenuToggle} 
            className="lg:hidden p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 hover:text-white transition-all shadow-lg"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
