import React from 'react';
import { Layers, Play, SkipForward, SkipBack, RotateCcw, StopCircle, Code2, Presentation, Pause } from 'lucide-react';
import { AlgorithmDropdown } from '../controls/AlgorithmDropdown';
import { SpeedSlider } from '../controls/SpeedSlider';
import { algorithmCategories } from '../../data/algorithmMetadata';

interface NavbarProps {
  overallProgress: number;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  selectedAlgorithmId: string;
  onAlgorithmChange: (id: string) => void;
  onRun: () => void;
  onStop: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  isPlaying?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  overallProgress, onRun, onStop, onStepForward, onStepBackward, onReset, 
  selectedAlgorithmId, onAlgorithmChange, isPlaying 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-white/5 shadow-2xl glass-card rounded-none border-t-0 border-x-0">
      <div className="flex items-center justify-between gap-6 h-20 px-6">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 min-w-max group cursor-pointer">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-indigo-500/20 shadow-lg group-hover:rotate-12 transition-transform">
            <Layers className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter leading-none">
                Algo<span className="text-indigo-500">Vis</span>
              </h1>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Engine v2.1</span>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-800 mx-2" />

        {/* Central Controls */}
        <div className="flex-1 flex items-center gap-8">
           <div className="w-80">
              <AlgorithmDropdown 
                label="Algorithm" 
                categories={algorithmCategories}
              />
           </div>
           
           <div className="w-48">
              <SpeedSlider />
           </div>

           <div className="flex items-center gap-1.5 bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 shadow-inner">
              <button 
                onClick={onReset} 
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all active:scale-90"
                title="Reset simulation"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={onStepBackward} 
                disabled={isPlaying}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all active:scale-90 disabled:opacity-20"
                title="Step backward"
              >
                <SkipBack size={18} />
              </button>
              
              <button 
                 onClick={isPlaying ? onStop : onRun}
                 className={`p-3 rounded-xl transition-all transform active:scale-90 shadow-xl ${isPlaying ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/40'}`}
                 title={isPlaying ? 'Stop' : 'Run Algorithm'}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>

              <button 
                onClick={onStepForward} 
                disabled={isPlaying}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all active:scale-90 disabled:opacity-20"
                title="Step forward"
              >
                <SkipForward size={18} />
              </button>
           </div>
        </div>

        {/* Right Section: Mode & Progress */}
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black text-white shadow-lg">
                <Presentation size={12} />
                <span>VISUALIZER</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 text-slate-400 hover:text-white transition-colors text-[10px] font-black">
                <Code2 size={12} />
                <span>PROBLEMS</span>
              </button>
           </div>

           <div className="h-10 w-px bg-slate-800" />
           
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none text-slate-600">Mastery</span>
                 <span className="text-xs font-mono font-black text-indigo-400 leading-none">{overallProgress}%</span>
              </div>
              <div className="w-10 h-10 rounded-2xl border-2 border-indigo-500 bg-slate-800 flex items-center justify-center text-indigo-400 font-black text-xs shadow-premium">
                PM
              </div>
           </div>
        </div>
      </div>
    </header>
  );
};
