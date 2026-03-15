import React from 'react';
import { AnimationStep } from '../../types/animationTypes';

interface DPTableProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  title?: string;
}

export const DPTable: React.FC<DPTableProps> = ({ steps, currentStepIndex, title = 'DP Table' }) => {
  const currentStep = steps[currentStepIndex];
  const cells = currentStep?.cells ?? [];
  const highlighted = currentStep?.highlightCells ?? [];

  const isHighlighted = (i: number, j: number) => highlighted.some(h => h.i === i && h.j === j);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <div className="overflow-x-auto">
        {cells.map((row, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {row.map((cell, j) => (
              <div key={j}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold border transition-all duration-300
                  ${isHighlighted(i, j)
                    ? 'bg-indigo-500/30 border-indigo-400 text-indigo-200 scale-105'
                    : cell.value < 0 ? 'bg-slate-800 border-slate-700 text-slate-600' : 'bg-slate-700/50 border-slate-600/50 text-slate-300'
                  }`}>
                {cell.value < 0 ? '∞' : cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>
      {currentStep?.explanation && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 px-4 py-2.5 text-sm text-slate-300">
          {currentStep.explanation}
        </div>
      )}
    </div>
  );
};
