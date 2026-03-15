import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, StopCircle, Zap, Activity } from 'lucide-react';
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
    <div className="group bg-slate-800/40 backdrop-blur-2xl rounded-[2rem] border border-slate-700/50 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 transition-all duration-700">
      <div className="flex flex-col gap-4">
        {/* Playback Engine Shell */}
        <div className="flex flex-col xl:flex-row items-center gap-6 px-1">
          
          {/* Controls Hub */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-1 px-1">
                <button 
                  onClick={onRestart}
                  className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-indigo-400 transition-all active:scale-90"
                  title="Reset Engine"
                >
                  <RotateCcw size={18} />
                </button>
                
                <button 
                  onClick={onStepBackward}
                  className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-indigo-400 transition-all disabled:opacity-10 active:scale-90"
                  disabled={currentStepIndex === 0}
                  title="Step Backward"
                >
                  <SkipBack size={18} />
                </button>
            </div>

            <div className="w-px h-10 bg-slate-800 mx-1" />

            {!isPlaying ? (
              <button 
                onClick={onPlay}
                disabled={disabled}
                className="group/btn relative flex items-center gap-3 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-[0_10px_25px_rgba(79,70,229,0.4)] active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <Play size={20} className="fill-current" />
                <span className="tracking-wide">Run Logic</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-sm transition-all border-2 shadow-xl active:scale-95 ${
                  isPaused 
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/20' 
                  : 'bg-amber-500 border-amber-400 text-white shadow-amber-500/20'
                }`}
              >
                {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                <span className="tracking-wide">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            )}

            <div className="w-px h-10 bg-slate-800 mx-1" />

            <div className="flex items-center gap-1 px-1">
                <button 
                  onClick={onStepForward}
                  className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-indigo-400 transition-all disabled:opacity-10 active:scale-90"
                  disabled={currentStepIndex === totalSteps - 1 || totalSteps === 0}
                  title="Step Forward"
                >
                  <SkipForward size={18} />
                </button>

                {isPlaying && (
                  <button 
                    onClick={onStop}
                    className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white transition-all active:scale-90 border border-rose-500/20 shadow-lg"
                    title="Terminate Process"
                  >
                    <StopCircle size={20} />
                  </button>
                )}
            </div>
          </div>

          {/* Real-time Telemetry Section */}
          <div className="flex-1 w-full flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-md ${isPlaying && !isPaused ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-slate-900 text-slate-600'}`}>
                    <Activity size={12} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Step Sequence</span>
               </div>
               <div className="flex items-center gap-2">
                   <span className="text-[11px] font-mono font-black text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-lg border border-indigo-500/10 shadow-inner">
                      {totalSteps > 0 ? (currentStepIndex + 1).toString().padStart(3, '0') : '000'}
                      <span className="text-slate-700 mx-1.5">/</span>
                      {totalSteps.toString().padStart(3, '0')}
                   </span>
               </div>
            </div>
            
            <div className="relative h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
               <div 
                 className="h-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] relative overflow-hidden"
                 style={{ width: `${progressPercentage}%` }}
               >
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:30px_30px] animate-[progress-stripe_2s_linear_infinite]" />
                 <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/20 to-transparent blur-sm" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
