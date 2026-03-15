import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { usePlaybackStore } from '../../state/usePlaybackStore';

interface Props {
  onPlay: () => void;
  onRestart: () => void;
}

export const StepController: React.FC<Props> = ({ onPlay, onRestart }) => {
  const { 
    isPlaying, isPaused, setIsPaused, currentStepIndex, totalSteps,
    setCurrentStepIndex
  } = usePlaybackStore();

  const handleNext = () => setCurrentStepIndex(Math.min(currentStepIndex + 1, totalSteps - 1));
  const handlePrev = () => setCurrentStepIndex(Math.max(currentStepIndex - 1, 0));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button onClick={onRestart} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all">
          <RotateCcw size={16} />
        </button>
        <button onClick={handlePrev} disabled={currentStepIndex === 0} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-30">
          <SkipBack size={16} />
        </button>
        
        {isPlaying ? (
          <button onClick={() => setIsPaused(!isPaused)} className="flex-1 py-2 px-4 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-500/50 flex items-center justify-center gap-2">
            {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        ) : (
          <button onClick={onPlay} className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2">
            <Play size={16} fill="currentColor" /> Play
          </button>
        )}

        <button onClick={handleNext} disabled={currentStepIndex === totalSteps - 1} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-30">
          <SkipForward size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
          <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStepIndex + 1) / (totalSteps || 1)) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / (totalSteps || 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
