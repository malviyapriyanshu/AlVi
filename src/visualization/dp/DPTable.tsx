import React, { useMemo } from 'react';
import { Database, Grid, Layers, Terminal } from 'lucide-react';
import { AnimationStep } from '../../types/animationTypes';
import { useTheme } from '../../theme/themeProvider';
import { cn } from '../../utils/cn';

interface DPTableProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  title?: string;
}

export const DPTable: React.FC<DPTableProps> = ({ steps, currentStepIndex, title = 'DP Table' }) => {
  const { resolvedTheme } = useTheme();
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
    <div className="flex flex-col gap-6 h-full px-4 md:px-6 py-6 overflow-hidden">
      {/* Header Island */}
      <div className="flex items-center justify-between shrink-0 bg-background-primary p-4 rounded-3xl border border-border shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent-primary rounded-xl text-white shadow-glow-indigo">
                <Database size={16} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-widest leading-none mb-1">{title}</h4>
              <p className="text-xs font-black text-text-primary tracking-tight">Tabulation Workspace</p>
            </div>
         </div>
         {!isEmpty && (
             <div className="flex items-center gap-2.5 px-4 py-1.5 bg-background-secondary rounded-full border border-border">
                <Grid size={12} className="text-accent-primary" />
                <span className="text-[10px] font-mono font-black text-text-secondary uppercase tracking-tighter">
                    {state.length} × {state[0]?.length || 0}
                </span>
             </div>
         )}
      </div>

      {/* Main Table Container */}
      <div className="flex-1 overflow-auto bg-background-secondary rounded-[40px] p-8 border border-border relative transition-all duration-500 custom-scrollbar shadow-inner">
        {isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center opacity-30 select-none">
            <Terminal size={40} className="text-accent-primary mb-2" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Awaiting stream</p>
            <p className="text-[11px] font-bold text-text-secondary max-w-[180px]">Run the algorithm to visualize the DP state transformation.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 min-w-max pb-4">
            {state.map((row: any[], i: number) => (
              <div key={i} className="flex gap-3">
                {row.map((cell: any, j: number) => (
                  <div key={j}
                    className={cn(
                      "group relative min-w-[4.5rem] h-20 flex flex-col items-center justify-center rounded-[24px] border-2 transition-all duration-300",
                      isHighlighted(i, j)
                        ? 'bg-accent-primary text-white border-accent-primary scale-[1.03] z-10 shadow-glow-indigo'
                        : (cell.value === Infinity || cell.value === -1) 
                          ? 'bg-background-primary border-border text-text-secondary opacity-30 italic' 
                          : 'bg-background-secondary border-border text-text-primary font-black hover:border-accent-primary shadow-sm'
                    )}>
                    
                    {/* Index Indicator */}
                    <span className={cn(
                      "absolute top-2.5 right-3 text-[8px] font-black opacity-50 transition-colors",
                      isHighlighted(i, j) ? 'text-white/60' : 'text-text-secondary'
                    )}>
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
        <div className="bg-background-primary p-5 rounded-[32px] border border-border flex items-center gap-4 shadow-sm">
           <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
              <Layers size={18} />
           </div>
           <div className="flex flex-col overflow-hidden">
              <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest leading-none mb-1">Observation</span>
              <p className="text-xs font-bold text-text-primary truncate italic">
                {currentStep.explanation}
              </p>
           </div>
        </div>
      )}
    </div>
  );
};
