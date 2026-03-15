import React from 'react';
import { Layers, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  overallProgress: number;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ overallProgress, onMenuToggle, isMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-4 flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-all duration-500 transform group-hover:rotate-12">
                  <Layers className="text-white" size={22} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-none mb-0.5">
                  Algo<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">Vis</span>
                </h1>
                <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-widest text-indigo-400">Beta v2.1</span>
                    <Sparkles size={10} className="text-amber-400" />
                </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {/* Learning Progress Widget */}
            <div className="flex flex-col gap-1.5 min-w-[200px]">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-slate-500">Learning Mastery</span>
                  <span className="text-indigo-400 font-mono">{overallProgress}%</span>
               </div>
               <div className="relative h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 ring-1 ring-white/5">
                 <div 
                   className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                   style={{ width: `${overallProgress}%` }} 
                 >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px] opacity-30" />
                 </div>
               </div>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-bold border border-slate-700/50 transition-all active:scale-95 group shadow-lg">
                   <span>Docs</span>
                   <ArrowUpRight size={14} className="opacity-40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm border-2 border-indigo-400 shadow-[0_5px_15px_rgba(79,70,229,0.3)] cursor-pointer hover:scale-110 transition-transform">
                    PM
                </div>
            </div>
          </div>

          <button 
            onClick={onMenuToggle} 
            className="lg:hidden p-3 bg-slate-800/80 text-slate-400 rounded-2xl border border-slate-700 hover:text-white transition-all shadow-xl active:scale-90"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
