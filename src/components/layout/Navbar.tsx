import React from 'react';
import { Layers, Play, SkipForward, SkipBack, RotateCcw, Pause, Menu, X, Code2, Presentation } from 'lucide-react';
import { AlgorithmDropdown } from '../controls/AlgorithmDropdown';
import { SpeedSlider } from '../controls/SpeedSlider';
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
  selectedAlgorithmId, onAlgorithmChange, isPlaying, onMenuToggle, isMenuOpen
}) => {
  return (
    <header className="sticky top-0 z-50 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shrink-0">
      <div className="flex items-center h-full px-4 gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
          <div className="bg-indigo-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
            <Layers className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <h1 className="text-base font-extrabold tracking-tight text-white">
              Algo<span className="text-slate-400">Vis</span>
            </h1>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">v3.0</span>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-800 shrink-0 hidden lg:block" />

        {/* Algorithm Selector */}
        <div className="hidden lg:block w-64 shrink-0">
          <AlgorithmDropdown label="Algorithm" />
        </div>

        {/* Speed Slider */}
        <div className="hidden xl:block w-48 shrink-0">
          <SpeedSlider />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Playback Controls — Center Island */}
        <div className="hidden md:flex items-center" role="toolbar" aria-label="Playback controls">
          <div className="flex items-center bg-slate-800/60 border border-slate-700/50 rounded-2xl p-1 gap-0.5">
            <button
              onClick={onReset}
              title="Reset (R)"
              aria-label="Reset simulation"
              className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={onStepBackward}
              disabled={isPlaying}
              title="Step Back (←)"
              aria-label="Step backward"
              className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30"
            >
              <SkipBack size={15} />
            </button>

            <button
              onClick={isPlaying ? onStop : onRun}
              title={isPlaying ? 'Pause (Space)' : 'Run (Space)'}
              aria-label={isPlaying ? 'Pause simulation' : 'Run simulation'}
              className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                isPlaying
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-glow-indigo'
              }`}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>

            <button
              onClick={onStepForward}
              disabled={isPlaying}
              title="Step Forward (→)"
              aria-label="Step forward"
              className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30"
            >
              <SkipForward size={15} />
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden md:block" />

        {/* Mode Switch + Progress */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="flex items-center bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 rounded-lg text-[11px] font-bold text-white" aria-pressed="true">
              <Presentation size={12} />
              <span>Visualizer</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-white transition-colors text-[11px] font-bold rounded-lg" aria-pressed="false">
              <Code2 size={12} />
              <span>Problems</span>
            </button>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Mastery</span>
              <span className="text-sm font-mono font-bold text-white">{overallProgress}%</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
              PM
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={onMenuToggle} className="md:hidden ml-auto p-2 text-slate-400 hover:text-white" aria-label="Toggle menu">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 p-4 flex flex-col gap-4 max-h-[calc(100vh-64px)] overflow-y-auto z-40 animate-fade-in">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
             <div className="flex flex-col gap-1.5">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Algorithm</span>
               <AlgorithmDropdown label="Algorithm" />
             </div>
             <div className="flex flex-col gap-1.5">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Speed</span>
               <SpeedSlider />
             </div>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 bg-slate-900/50 p-2 rounded-xl border border-slate-800/50">
            <button onClick={() => { onReset(); onMenuToggle(); }} className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all" aria-label="Reset">
              <RotateCcw size={18} />
            </button>
            <button onClick={onStepBackward} disabled={isPlaying} className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-30" aria-label="Step back">
              <SkipBack size={18} />
            </button>
            <button onClick={isPlaying ? onStop : onRun} className={`px-6 py-2.5 rounded-lg font-bold transition-all ${isPlaying ? 'bg-slate-800 text-white' : 'bg-indigo-500 text-white shadow-glow-indigo'}`} aria-label={isPlaying ? 'Pause' : 'Run'}>
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            <button onClick={onStepForward} disabled={isPlaying} className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-30" aria-label="Step forward">
              <SkipForward size={18} />
            </button>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/50 px-4 py-2.5 rounded-xl border border-slate-800/50">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Mastery</span>
              <span className="text-base font-mono font-bold text-indigo-400">{overallProgress}%</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-[10px]">
              PM
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
