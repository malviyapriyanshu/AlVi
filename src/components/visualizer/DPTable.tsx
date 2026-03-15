import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { DPAnimationStep } from '../../types/extended';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface Props {
  steps: DPAnimationStep[];
  labels?: string[];
  title?: string;
  speed?: number;
}

export const DPTable: React.FC<Props> = ({ steps, labels, title = 'DP Table', speed = 600 }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentStep = steps[stepIdx] as DPAnimationStep | undefined;
  const cells = currentStep?.cells ?? [];
  const highlighted = currentStep?.highlightCells ?? [];

  const advance = useCallback(() => {
    setStepIdx(prev => {
      if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
      return prev + 1;
    });
  }, [steps.length]);

  useEffect(() => {
    if (isPlaying) timerRef.current = window.setInterval(advance, speed);
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, advance, speed]);

  useEffect(() => { setStepIdx(0); setIsPlaying(false); }, [steps]);

  const isHighlighted = (i: number, j: number) => highlighted.some(h => h.i === i && h.j === j);
  const isResult = currentStep?.type === 'result';

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</h4>

      {/* Table */}
      <div className="overflow-x-auto">
        {cells.map((row, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {labels && <div className="w-8 flex items-center justify-center text-xs text-slate-500">{labels[i]}</div>}
            {row.map((cell, j) => (
              <div key={j}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold border transition-all duration-300
                  ${isHighlighted(i, j)
                    ? isResult
                      ? 'bg-orange-400/30 border-orange-400 text-orange-300 scale-110 shadow-[0_0_12px_rgba(251,146,60,0.4)]'
                      : 'bg-indigo-500/30 border-indigo-400 text-indigo-200 scale-105'
                    : cell.value < 0
                      ? 'bg-slate-800 border-slate-700 text-slate-600'
                      : 'bg-slate-700/50 border-slate-600/50 text-slate-300'
                  }`}>
                {cell.value < 0 ? '∞' : cell.value}
              </div>
            ))}
          </div>
        ))}
        {/* Index labels */}
        {cells[0] && (
          <div className="flex gap-1 mt-1">
            {labels && <div className="w-8" />}
            {cells[0].map((_, j) => (
              <div key={j} className="w-10 text-center text-[10px] text-slate-600">{j}</div>
            ))}
          </div>
        )}
      </div>

      {currentStep?.explanation && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 px-4 py-2.5 text-sm text-slate-300">{currentStep.explanation}</div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setStepIdx(0)} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><RotateCcw size={14} /></button>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipBack size={14} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
          </button>
          <button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><SkipForward size={14} /></button>
        </div>
        <span className="text-xs text-slate-500">Step {stepIdx + 1} / {steps.length}</span>
      </div>

      <div className="flex gap-4 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-700 inline-block border border-slate-600" /> Unfilled</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-500/30 inline-block border border-indigo-400" /> Computing</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400/30 inline-block border border-orange-400" /> Result</span>
      </div>
    </div>
  );
};
