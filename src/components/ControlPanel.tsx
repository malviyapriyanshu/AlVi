import React from 'react';
import { Play, RotateCcw, Shuffle, Square } from 'lucide-react';

interface ControlPanelProps {
  onGenerateNew: () => void;
  onStart: () => void;
  onReset: () => void;
  onStop?: () => void;
  isAnimating: boolean;
  isSorted: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerateNew,
  onStart,
  onReset,
  onStop,
  isAnimating,
  isSorted
}) => {
  return (
    <div className="flex items-center gap-4 border-l border-slate-700 pl-6 ml-6 h-full py-2">
      <button
        onClick={onGenerateNew}
        disabled={isAnimating}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 shadow-sm"
      >
        <Shuffle size={18} className={isAnimating ? 'text-slate-500' : 'text-indigo-400'} />
        <span>New Array</span>
      </button>

      {isAnimating ? (
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-6 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg font-bold transition-all border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          <Square size={20} className="fill-current" />
          <span>Stop</span>
        </button>
      ) : (
        <button
          onClick={isSorted ? onReset : onStart}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all border shadow-lg
            ${isSorted 
              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/20'
            }
          `}
        >
          {isSorted ? <RotateCcw size={20} /> : <Play size={20} className="fill-current" />}
          <span>{isSorted ? 'Reset' : 'Start Sorting'}</span>
        </button>
      )}
    </div>
  );
};
