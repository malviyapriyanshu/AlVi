import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, StopCircle, Zap } from 'lucide-react';
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
    <div className="group bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-indigo-500/30 transition-all duration-500">
      <div className="flex flex-col gap-3">
        {/* Main Controls Wrapper */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 px-2 py-1">
          
          {/* Action Buttons Group */}
          <div className="flex items-center justify-center gap-1.5 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-700/30">
            <button 
              onClick={onRestart}
              className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all active:scale-90"
              title="Restart"
            >
              <RotateCcw size={18} />
            </button>
            
            <button 
              onClick={onStepBackward}
              className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all disabled:opacity-20 active:scale-90"
              disabled={currentStepIndex === 0}
              title="Previous Step"
            >
              <SkipBack size={18} />
            </button>

            <div className="w-px h-8 bg-slate-700/50 mx-1" />

            {!isPlaying ? (
              <button 
                onClick={onPlay}
                disabled={disabled}
                className="group/btn relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <Play size={20} className="fill-current" />
                <span>Run Logic</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all border shadow-lg active:scale-95 ${
                  isPaused 
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20' 
                  : 'bg-amber-500 text-white border-amber-400 shadow-amber-500/20'
                }`}
              >
                {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            )}

            <div className="w-px h-8 bg-slate-700/50 mx-1" />

            <button 
              onClick={onStepForward}
              className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all disabled:opacity-20 active:scale-90"
              disabled={currentStepIndex === totalSteps - 1 || totalSteps === 0}
              title="Next Step"
            >
              <SkipForward size={18} />
            </button>

            {isPlaying && (
              <button 
                onClick={onStop}
                className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all active:scale-90 border border-rose-500/20"
                title="Emergency Stop"
              >
                <StopCircle size={20} />
              </button>
            )}
          </div>

          {/* Progress Section */}
          <div className="flex-1 flex flex-col justify-center px-2 min-w-[140px]">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-1.5">
                  <Zap size={10} className={isPlaying && !isPaused ? "text-amber-400 animate-pulse" : "text-slate-500"} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Step Sequence</span>
               </div>
               <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                  {totalSteps > 0 ? (currentStepIndex + 1).toString().padStart(2, '0') : '00'} 
                  <span className="text-slate-600 mx-1">/</span> 
                  {totalSteps.toString().padStart(2, '0')}
               </span>
            </div>
            
            <div className="relative h-2 bg-slate-900/80 rounded-full overflow-hidden border border-slate-700/30">
               <div 
                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                 style={{ width: `${progressPercentage}%` }}
               >
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripe_1s_linear_infinite]" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
