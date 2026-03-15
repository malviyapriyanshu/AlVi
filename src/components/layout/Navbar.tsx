import React from 'react';
import { Layers, Play, SkipForward, SkipBack, RotateCcw, Pause, Menu, X } from 'lucide-react';
import { AlgorithmDropdown } from '../controls/AlgorithmDropdown';
import { SpeedSlider } from '../controls/SpeedSlider';
import { useThemeStore } from '../../state/useThemeStore';
import { Sun, Moon } from 'lucide-react';

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
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shrink-0">
      <div className="flex items-center h-full px-4 md:px-5 gap-3 md:gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-sm">
            <Layers className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <h1 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
              Algo<span className="text-indigo-500">Vis</span>
            </h1>
            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">v3.0</span>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0 hidden lg:block" />

        {/* Algorithm Selector */}
        <div className="hidden lg:block w-56 shrink-0">
          <AlgorithmDropdown label="Algorithm" />
        </div>

        {/* Speed Slider */}
        <div className="hidden xl:block w-44 shrink-0">
          <SpeedSlider />
        </div>

        <div className="flex-1" />

        {/* ── Playback Island (desktop) ── */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-1 gap-0.5" role="toolbar" aria-label="Playback controls">
          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset (R)"
            aria-label="Reset"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            <RotateCcw size={15} />
          </button>

          {/* Step Back */}
          <button
            onClick={onStepBackward}
            disabled={isPlaying}
            title="Step back (←)"
            aria-label="Step backward"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all disabled:opacity-30"
          >
            <SkipBack size={15} />
          </button>

          {/* Play / Pause — hero button */}
          <button
            onClick={isPlaying ? onStop : onRun}
            title={isPlaying ? 'Pause (Space)' : 'Run (Space)'}
            aria-label={isPlaying ? 'Pause' : 'Run'}
            className={`w-10 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
              isPlaying
                ? 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-btn-indigo'
            }`}
          >
            {isPlaying
              ? <Pause size={17} fill="currentColor" />
              : <Play  size={17} fill="currentColor" className="ml-0.5" />}
          </button>

          {/* Step Forward */}
          <button
            onClick={onStepForward}
            disabled={isPlaying}
            title="Step forward (→)"
            aria-label="Step forward"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all disabled:opacity-30"
          >
            <SkipForward size={15} />
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Progress Avatar */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0 pl-1">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{overallProgress}%</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
            PM
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-5 flex flex-col gap-5 z-50 shadow-xl animate-fade-in">
          {/* Algorithm + Speed */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Algorithm</span>
              <AlgorithmDropdown label="Algorithm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Speed</span>
              <SpeedSlider />
            </div>
          </div>

          {/* Mastery + Theme */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{overallProgress}</span>
                <span className="text-sm font-bold text-slate-400">%</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => { toggleTheme(); onMenuToggle(); }}
                className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all hover:scale-105"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                PM
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
