import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { usePlaybackStore } from '../../state/usePlaybackStore';

interface ControlPanelProps {
  onPlay: () => void;
  onStop: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onRestart: () => void;
  disabled?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onPlay, onStop, onStepForward, onStepBackward, onRestart, disabled 
}) => {
  const { isPlaying, isPaused, setIsPaused, currentStepIndex, totalSteps } = usePlaybackStore();

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <button 
          onClick={onRestart}
          className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          title="Restart"
        >
          <RotateCcw size={18} />
        </button>
        
        <button 
          onClick={onStepBackward}
          className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          disabled={currentStepIndex === 0}
          title="Previous Step"
        >
          <SkipBack size={18} />
        </button>

        {!isPlaying ? (
          <button 
            onClick={onPlay}
            disabled={disabled}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            <Play size={18} className="fill-current" />
            <span>Play</span>
          </button>
        ) : (
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-500 font-bold border border-amber-500/50 transition-all"
          >
            {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        )}

        <button 
          onClick={onStepForward}
          className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          disabled={currentStepIndex === totalSteps - 1}
          title="Next Step"
        >
          <SkipForward size={18} />
        </button>

        {isPlaying && (
          <button 
            onClick={onStop}
            className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 border border-rose-500/50 transition-all"
            title="Stop"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</div>
          <div className="text-sm font-mono text-white">
            {currentStepIndex + 1} / {totalSteps || 0}
          </div>
        </div>
        <div className="w-24 bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / (totalSteps || 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

import { X } from 'lucide-react';
