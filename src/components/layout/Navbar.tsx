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

import { useThemeStore } from '../../state/useThemeStore';
import { Sun, Moon } from 'lucide-react';

export const Navbar: React.FC<NavbarProps> = ({
  overallProgress, onRun, onStop, onStepForward, onStepBackward, onReset,
  selectedAlgorithmId, onAlgorithmChange, isPlaying, onMenuToggle, isMenuOpen
}) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800/50 shrink-0 transition-colors duration-300">
      <div className="flex items-center h-full px-4 md:px-6 gap-4 md:gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
          <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm dark:shadow-none">
            <Layers className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Algo<span className="text-slate-400 dark:text-slate-500">Vis</span>
            </h1>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">v3.0</span>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 shrink-0 hidden lg:block" />

        {/* Algorithm Selector */}
        <div className="hidden lg:block w-64 shrink-0">
          <AlgorithmDropdown label="Algorithm" />
        </div>

        {/* Speed Slider */}
        <div className="hidden xl:block w-48 shrink-0">
          <SpeedSlider />
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden md:block" />

        {/* Playback Controls — Center Island */}
        <div className="hidden md:flex items-center" role="toolbar" aria-label="Playback controls">
          <div className="flex items-center bg-gray-100/80 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 rounded-2xl p-1 gap-1">
            <button
              onClick={onReset}
              title="Reset (R)"
              aria-label="Reset simulation"
              className="flex items-center justify-center w-9 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={onStepBackward}
              disabled={isPlaying}
              title="Step Back (←)"
              aria-label="Step backward"
              className="flex items-center justify-center w-9 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30"
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={isPlaying ? onStop : onRun}
              title={isPlaying ? 'Pause (Space)' : 'Run (Space)'}
              aria-label={isPlaying ? 'Pause simulation' : 'Run simulation'}
              className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                isPlaying
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                  : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-glow-indigo'
              }`}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>

            <button
              onClick={onStepForward}
              disabled={isPlaying}
              title="Step Forward (→)"
              aria-label="Step forward"
              className="flex items-center justify-center w-9 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Progress — sm+ only */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-800" />
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mastery</span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{overallProgress}%</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shadow-sm dark:shadow-none">
              PM
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={onMenuToggle} className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 p-6 flex flex-col gap-6 max-h-[calc(100vh-64px)] overflow-y-auto z-40 animate-fade-in shadow-xl dark:shadow-none">
          <div className="flex flex-col gap-4">
             <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Settings</span>
             <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Selection</span>
                  <AlgorithmDropdown label="Algorithm" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Speed</span>
                  <SpeedSlider />
                </div>
             </div>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-800/50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Mastery</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{overallProgress}</span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500">%</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button 
                onClick={() => { toggleTheme(); onMenuToggle(); }} 
                className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-indigo-600/10">
                PM
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
