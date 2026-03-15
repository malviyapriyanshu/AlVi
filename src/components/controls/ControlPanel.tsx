import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, StopCircle } from 'lucide-react';
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

  const progressPercentage = totalSteps > 0 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-1 shadow-2xl overflow-hidden">
      <div className="flex flex-col gap-0.5">
        {/* Progress Line Layer */}
        <div className="h-1 bg-slate-900 overflow-hidden rounded-t-xl group/progress relative">
          <div 
            className="bg-indigo-500 h-full transition-all duration-300 relative shadow-[0_0_10px_#6366f1]"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-white/20 blur-sm" />
          </div>
        </div>

        <div className="px-3 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Main Controls Group */}
          <div className="flex items-center gap-1.5 bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/30">
            <button 
              onClick={onRestart}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center"
              title="Restart"
            >
              <RotateCcw size={16} />
            </button>
            
            <button 
              onClick={onStepBackward}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center"
              disabled={currentStepIndex === 0}
              title="Previous Step"
            >
              <SkipBack size={16} />
            </button>

            <div className="w-px h-6 bg-slate-700/50 mx-1" />

            {!isPlaying ? (
              <button 
                onClick={onPlay}
                disabled={disabled}
                className="group relative flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Play size={18} className="fill-current" />
                <span className="text-sm">Run</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold transition-all border ${
                  isPaused 
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/50 text-amber-500 hover:bg-amber-500/20'
                }`}
              >
                {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
                <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            )}

            <div className="w-px h-6 bg-slate-700/50 mx-1" />

            <button 
              onClick={onStepForward}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center"
              disabled={currentStepIndex === totalSteps - 1 || totalSteps === 0}
              title="Next Step"
            >
              <SkipForward size={16} />
            </button>

            {isPlaying && (
              <button 
                onClick={onStop}
                className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-500 transition-all flex items-center justify-center"
                title="Stop"
              >
                <StopCircle size={18} />
              </button>
            )}
          </div>

          {/* Stats Group */}
          <div className="flex items-center gap-4 bg-slate-900/30 px-3 py-1.5 rounded-xl border border-slate-700/20 shrink-0">
             <div className="flex flex-col items-center">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-0.5">Progress</span>
                <span className="text-sm font-mono font-bold text-slate-200">
                  {totalSteps > 0 ? currentStepIndex + 1 : 0} <span className="text-slate-600 mx-0.5">/</span> {totalSteps}
                </span>
             </div>
             <div className="flex flex-col items-center border-l border-slate-800 pl-4 ml-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-0.5">Status</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? (isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse') : 'bg-slate-600'}`} />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                    {isPlaying ? (isPaused ? 'Paused' : 'Running') : 'Idle'}
                  </span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
