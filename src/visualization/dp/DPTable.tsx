import React from 'react';
import { AnimationStep } from '../../types/animationTypes';

interface DPTableProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  title?: string;
}

export const DPTable: React.FC<DPTableProps> = ({ steps, currentStepIndex, title = 'DP Table' }) => {
  const currentStep = steps[currentStepIndex];
  
  // Reconstruct 1D or 2D state
  const state = React.useMemo(() => {
    // If we have explicit cells, use them (2D)
    if (currentStep?.cells) return currentStep.cells;
    
    // If we have a 1D table snapshot, wrap it in a single row
    if (currentStep?.table) {
        return [currentStep.table.map(val => ({ value: val }))];
    }
    
    // Fallback: Reconstruct from scratch if we only have updates? 
    // For now, let's assume algorithms provide snapshots for DP
    return [];
  }, [currentStep]);

  const highlighted = currentStep?.highlightCells ?? [];
  const indices = currentStep?.indices ?? [];

  const isHighlighted = (i: number, j: number) => {
      // Check for 2D highlight
      if (highlighted.some(h => h.i === i && h.j === j)) return true;
      // Check for 1D highlight (indices)
      if (state.length === 1 && indices.includes(j)) return true;
      return false;
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <div className="flex-1 overflow-auto bg-slate-800/20 rounded-2xl p-4 border border-slate-700/30">
        <div className="flex flex-col gap-2 min-w-max">
          {state.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((cell: any, j: number) => (
                <div key={j}
                  className={`min-w-[3rem] h-12 flex flex-col items-center justify-center rounded-xl text-sm font-bold border transition-all duration-300
                    ${isHighlighted(i, j)
                      ? 'bg-indigo-500/30 border-indigo-400 text-indigo-200 scale-105 shadow-lg shadow-indigo-500/10'
                      : (cell.value === Infinity || cell.value === -1) 
                        ? 'bg-slate-800/50 border-slate-700/50 text-slate-600' 
                        : 'bg-slate-700/30 border-slate-600/30 text-slate-300'
                    }`}>
                  <span className="text-[10px] text-slate-500 mb-0.5">{j}</span>
                  <span>{(cell.value === Infinity || cell.value === -1) ? '∞' : cell.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {currentStep?.explanation && (
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/50 px-4 py-3 text-sm text-slate-300">
          <p className="font-semibold text-indigo-400 mb-1">Step Analysis</p>
          {currentStep.explanation}
        </div>
      )}
    </div>
  );
};
