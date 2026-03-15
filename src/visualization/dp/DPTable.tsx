import React, { useMemo } from 'react';
import { Database, Grid, Layers } from 'lucide-react';
import { AnimationStep } from '../../types/animationTypes';

interface DPTableProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  title?: string;
}

export const DPTable: React.FC<DPTableProps> = ({ steps, currentStepIndex, title = 'DP Table' }) => {
  const currentStep = steps[currentStepIndex];
  
  // Reconstruct 1D or 2D state
  const state = useMemo(() => {
    if (currentStep?.cells) return currentStep.cells;
    if (currentStep?.table) {
        return [currentStep.table.map(val => ({ value: val }))];
    }
    return [];
  }, [currentStep]);

  const highlighted = currentStep?.highlightCells ?? [];
  const indices = currentStep?.indices ?? [];

  const isHighlighted = (i: number, j: number) => {
      if (highlighted.some(h => h.i === i && h.j === j)) return true;
      if (state.length === 1 && indices.includes(j)) return true;
      return false;
  };

  const isEmpty = state.length === 0;

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/5">
                <Database size={16} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tabulation Memory Map</p>
            </div>
         </div>
         {!isEmpty && (
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-white/5 shadow-inner">
                <Grid size={12} className="text-slate-500" />
                <span className="text-[10px] font-mono font-bold text-slate-400">
                    Matrix: {state.length} x {state[0]?.length || 0}
                </span>
             </div>
         )}
      </div>

      <div className="flex-1 overflow-auto bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-700/30 shadow-2xl relative min-h-[300px] custom-scrollbar">
        {isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
            <div className="relative">
                <Layers size={48} className="text-slate-700 animate-pulse" />
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Awaiting Computation</p>
              <p className="text-slate-600 text-[11px] max-w-[200px] font-medium leading-relaxed">
                Choose an algorithm and click <span className="text-indigo-500 font-black px-1.5 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">Run Logic</span> to populate the tabulation table.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 min-w-max">
            {state.map((row, i) => (
              <div key={i} className="flex gap-3 animate-in slide-in-from-left-4 duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                {row.map((cell: any, j: number) => (
                  <div key={j}
                    className={`group relative min-w-[3.5rem] h-14 flex flex-col items-center justify-center rounded-2xl text-[13px] font-black border-2 transition-all duration-300
                      ${isHighlighted(i, j)
                        ? 'bg-indigo-600 text-white border-indigo-400 scale-110 z-10 shadow-[0_10px_30px_rgba(79,70,229,0.4)] ring-4 ring-indigo-500/20'
                        : (cell.value === Infinity || cell.value === -1) 
                          ? 'bg-slate-800/30 border-slate-700/50 text-slate-700' 
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                      }`}>
                    <span className={`absolute top-1 right-2 text-[8px] font-black transition-colors ${isHighlighted(i, j) ? 'text-indigo-300' : 'text-slate-600'}`}>
                        {j}
                    </span>
                    <span className="relative drop-shadow-md">
                        {(cell.value === Infinity || cell.value === -1) ? '∞' : cell.value}
                    </span>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {currentStep?.explanation && (
        <div className="bg-indigo-600/10 p-4 rounded-2xl border border-indigo-500/30 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
             <Layers size={14} className="text-indigo-400" />
             <p className="font-black text-[10px] text-indigo-400 uppercase tracking-[0.2em]">State Transformation</p>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-semibold italic">"{currentStep.explanation}"</p>
        </div>
      )}
    </div>
  );
};
