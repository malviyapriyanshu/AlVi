import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onRestart: () => void;
  currentStep: number;
  totalSteps: number;
}

export const StepController: React.FC<Props> = ({
  isPlaying, isPaused, onPlay, onPause, onResume,
  onStepForward, onStepBackward, onRestart,
  currentStep, totalSteps,
}) => (
  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Step Controller</h3>
      <span className="text-xs text-slate-400 font-mono">{currentStep} / {totalSteps}</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
      <div
        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
        style={{ width: totalSteps ? `${(currentStep / totalSteps) * 100}%` : '0%' }}
      />
    </div>
    <div className="flex items-center justify-center gap-2">
      <button onClick={onRestart} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Restart">
        <RotateCcw size={16} />
      </button>
      <button onClick={onStepBackward} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Previous Step">
        <SkipBack size={16} />
      </button>
      {isPlaying && !isPaused ? (
        <button onClick={onPause} className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/20" title="Pause">
          <Pause size={20} />
        </button>
      ) : (
        <button onClick={isPaused ? onResume : onPlay} className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/20" title="Play">
          <Play size={20} className="fill-current" />
        </button>
      )}
      <button onClick={onStepForward} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Next Step">
        <SkipForward size={16} />
      </button>
    </div>
  </div>
);
