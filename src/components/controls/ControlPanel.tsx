import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, StopCircle, Activity, Layout } from 'lucide-react';
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
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-premium transition-all duration-500 group">
      <div className="flex flex-col gap-6">
        {/* Playback Hub */}
        <div className="flex flex-col xl:flex-row items-center gap-6">
          
          {/* Controls Island */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="flex items-center gap-1 px-1">
                <button 
                  onClick={onRestart}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95 shadow-sm hover:shadow-md"
                  title="Reset Engine"
                >
                  <RotateCcw size={16} />
                </button>
                
                <button 
                  onClick={onStepBackward}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-20 active:scale-95 shadow-sm hover:shadow-md"
                  disabled={currentStepIndex === 0}
                  title="Step Back"
                >
                  <SkipBack size={16} />
                </button>
            </div>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            {!isPlaying ? (
              <button 
                onClick={onPlay}
                disabled={disabled}
                className="relative flex items-center justify-center gap-2.5 px-8 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow-btn-indigo active:scale-95 disabled:opacity-50"
              >
                <Play size={16} fill="currentColor" />
                <span className="uppercase tracking-widest font-black">Run Process</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center justify-center gap-2.5 px-8 h-10 rounded-xl font-black text-xs transition-all active:scale-95 border-2 ${
                  isPaused 
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-glow-emerald' 
                  : 'bg-amber-500 border-amber-400 text-white shadow-glow-amber'
                }`}
              >
                {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                <span className="uppercase tracking-widest font-black">{isPaused ? 'Resume' : 'Halt'}</span>
              </button>
            )}

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

            <div className="flex items-center gap-1 px-1">
                <button 
                  onClick={onStepForward}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-20 active:scale-95 shadow-sm hover:shadow-md"
                  disabled={currentStepIndex === totalSteps - 1 || totalSteps === 0}
                  title="Step Forward"
                >
                  <SkipForward size={16} />
                </button>

                {isPlaying && (
                  <button 
                    onClick={onStop}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white transition-all active:scale-95 border border-rose-500/20 shadow-sm"
                    title="Kill Execution"
                  >
                    <StopCircle size={18} />
                  </button>
                )}
            </div>
          </div>

          {/* Metrics / Monitoring */}
          <div className="flex-1 w-full flex flex-col justify-center gap-2.5">
            <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPlaying && !isPaused ? 'bg-indigo-600 text-white shadow-btn-indigo ring-4 ring-indigo-500/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Activity size={14} className={isPlaying && !isPaused ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 leading-none mb-1">Compute State</h4>
                    <p className="text-[10px] font-bold text-slate-900 dark:text-slate-100 leading-none">Sequence Execution</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                   <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/5 px-2.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/10 shadow-sm">
                      {totalSteps > 0 ? (currentStepIndex + 1).toString().padStart(3, '0') : '000'}
                      <span className="text-slate-300 dark:text-slate-700 mx-2">/</span>
                      {totalSteps.toString().padStart(3, '0')}
                   </span>
               </div>
            </div>
            
            <div className="relative h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50 p-[1px]">
               <div 
                 className="h-full bg-indigo-600 rounded-full transition-all duration-500 shadow-glow-indigo relative overflow-hidden"
                 style={{ width: `${progressPercentage}%` }}
               >
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
