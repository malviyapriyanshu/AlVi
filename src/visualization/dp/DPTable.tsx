import React, { useMemo } from 'react';
import { Database, Grid, Layers, Terminal } from 'lucide-react';
import { AnimationStep } from '../../types/animationTypes';
import { useThemeStore } from '../../state/useThemeStore';

interface DPTableProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  title?: string;
}

export const DPTable: React.FC<DPTableProps> = ({ steps, currentStepIndex, title = 'DP Table' }) => {
  const { theme } = useThemeStore();
  const currentStep = steps[currentStepIndex];
  
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
    <div className="flex flex-col gap-6 h-full animate-fade-in px-4 md:px-6 py-6 overflow-hidden">
      {/* Header Island */}
      <div className="flex items-center justify-between shrink-0 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-btn-indigo">
                <Database size={16} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{title}</h4>
              <p className="text-xs font-extra-bold text-slate-900 dark:text-white tracking-tight">Tabulation Workspace</p>
            </div>
         </div>
         {!isEmpty && (
             <div className="flex items-center gap-2.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                <Grid size={12} className="text-indigo-500" />
                <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                    {state.length} × {state[0]?.length || 0}
                </span>
             </div>
         )}
      </div>

      {/* Main Table Container */}
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-950 rounded-[40px] p-8 border border-slate-200 dark:border-slate-800 relative transition-all duration-500 custom-scrollbar shadow-card">
        {isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center opacity-30 select-none">
            <Terminal size={40} className="text-indigo-500 mb-2" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Awaiting stream</p>
            <p className="text-[11px] font-bold text-slate-400 max-w-[180px]">Run the algorithm to visualize the DP state transformation.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 min-w-max pb-4">
            {state.map((row: any[], i: number) => (
              <div key={i} className="flex gap-3">
                {row.map((cell: any, j: number) => (
                  <div key={j}
                    className={`group relative min-w-[4.5rem] h-20 flex flex-col items-center justify-center rounded-[24px] border-2 transition-all duration-300
                      ${isHighlighted(i, j)
                        ? 'bg-indigo-600 text-white border-indigo-400 scale-[1.03] z-10 shadow-btn-indigo'
                        : (cell.value === Infinity || cell.value === -1) 
                          ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-800' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
                      }`}>
                    
                    {/* Index Indicator */}
                    <span className={`absolute top-2.5 right-3 text-[8px] font-black opacity-50 transition-colors ${isHighlighted(i, j) ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {j}
                    </span>

                    {/* Value */}
                    <span className="text-[15px] font-black tracking-tight drop-shadow-sm select-all">
                        {(cell.value === Infinity || cell.value === -1) ? '∞' : cell.value}
                    </span>

                    {/* Subtle Inner Glow */}
                    {isHighlighted(i, j) && (
                        <div className="absolute inset-0 bg-white/10 rounded-[22px] pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      {!isEmpty && currentStep?.explanation && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[32px] border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm animate-slide-up">
           <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Layers size={18} />
           </div>
           <div className="flex flex-col overflow-hidden">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Observation</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate italic">
                {currentStep.explanation}
              </p>
           </div>
        </div>
      )}
    </div>
  );
};
