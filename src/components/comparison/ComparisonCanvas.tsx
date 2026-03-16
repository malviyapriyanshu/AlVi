import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart3, RotateCcw, Play, Pause, Activity, Zap } from 'lucide-react';
import type { AnimationStep } from '../../types';
import { useThemeStore } from '../../state/useThemeStore';

interface AlgoRun {
  id: string;
  name: string;
  color: string;
  steps: AnimationStep[];
  fn: (arr: number[]) => AnimationStep[];
}

interface RunStats {
  comparisons: number;
  swaps: number;
  overwrites: number;
}

function countStats(steps: AnimationStep[]): RunStats {
  return steps.reduce<RunStats>((acc, s) => ({
    comparisons: acc.comparisons + (s.type === 'compare' ? 1 : 0),
    swaps: acc.swaps + (s.type === 'swap' ? 1 : 0),
    overwrites: acc.overwrites + (s.type === 'overwrite' ? 1 : 0),
  }), { comparisons: 0, swaps: 0, overwrites: 0 });
}

interface Props {
  algorithms: AlgoRun[];
  array: number[];
}

export const ComparisonCanvas: React.FC<Props> = ({ algorithms, array }) => {
  const { theme } = useThemeStore();
  const [stepIndices, setStepIndices] = useState<number[]>(() => algorithms.map(() => 0));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(60);
  const timerRef = useRef<number | null>(null);
  const MAX = Math.max(...array, 1);

  const allSteps = useMemo(() => algorithms.map(a => a.fn([...array])), [algorithms, array]);
  const stats = useMemo(() => allSteps.map(countStats), [allSteps]);
  const maxStep = Math.max(...allSteps.map(s => s.length));
  const allDone = stepIndices.every((si, i) => si >= allSteps[i].length - 1);

  const tick = () => {
    setStepIndices(prev => prev.map((si, i) => Math.min(si + 1, allSteps[i].length - 1)));
  };

  useEffect(() => {
    if (isRunning && !allDone) {
      timerRef.current = window.setInterval(tick, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (allDone) setIsRunning(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, allDone, speed, allSteps]);

  const getArrayAtStep = (steps: AnimationStep[], si: number, baseArr: number[]) => {
    const arr = [...baseArr];
    for (let i = 0; i <= si && i < steps.length; i++) {
      const step = steps[i];
      const indices = step.indices || [];
      if (step.type === 'swap' && indices[0] !== undefined && indices[1] !== undefined) {
          [arr[indices[0]], arr[indices[1]]] = [arr[indices[1]], arr[indices[0]]];
      } else if (step.type === 'overwrite' && indices[0] !== undefined && step.value !== undefined) {
          arr[indices[0]] = step.value;
      }
    }
    return arr;
  };

  const handleReset = () => {
    setIsRunning(false);
    setStepIndices(algorithms.map(() => 0));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in w-full max-w-7xl mx-auto px-4 py-8">
      {/* ── Dashboard Stats ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-sm overflow-hidden relative group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-btn-indigo">
                <BarChart3 size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Algorithm Performance Race</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Comparative Efficiency Benchmarking</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsRunning(!isRunning)} 
              disabled={allDone}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl font-black text-sm transition-all shadow-sm active:scale-95 disabled:opacity-30 ${
                isRunning ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-indigo-600 text-white shadow-btn-indigo'
              }`}
            >
              {isRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              <span>{isRunning ? 'Pause Race' : 'Start Race!'}</span>
            </button>
            <button 
              onClick={handleReset} 
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all shadow-sm active:scale-95"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {algorithms.map((algo, i) => {
            const s = stats[i];
            const maxCmp = Math.max(...stats.map(x => x.comparisons), 1);
            const isDone = stepIndices[i] >= allSteps[i].length - 1;
            
            return (
              <div key={algo.id} className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                   <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: algo.color }} />
                      <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{algo.name}</span>
                   </div>
                   {isDone && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-glow-emerald">
                         <span className="text-[9px] font-black uppercase tracking-widest">Done</span>
                      </div>
                   )}
                </div>

                <div className="space-y-4">
                   <div className="group/metric">
                      <div className="flex justify-between items-center mb-1.5">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comparisons</span>
                         <span className="text-xs font-mono font-bold text-slate-900 dark:text-white px-2 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">{s.comparisons}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full transition-all duration-700 ease-out rounded-full" style={{ width: `${(s.comparisons / maxCmp) * 100}%`, backgroundColor: algo.color }} />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                         <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Activity size={10} /> Swaps
                         </div>
                         <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{s.swaps}</span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                         <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Zap size={10} /> Ops
                         </div>
                         <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{s.overwrites}</span>
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Side-by-Side Visualizers ── */}
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${algorithms.length}, 1fr)` }}>
        {algorithms.map((algo, i) => {
          const si = stepIndices[i];
          const curArr = getArrayAtStep(allSteps[i], si, array);
          const isDone = si >= allSteps[i].length - 1;
          const progress = Math.round((si / Math.max(allSteps[i].length - 1, 1)) * 100);

          return (
            <div key={algo.id} className="flex flex-col gap-4">
              <div className="h-48 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-4 flex items-end justify-center gap-[2px] overflow-hidden relative shadow-sm">
                {/* Minimalist grid overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {curArr.map((v, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 rounded-t-md transition-all duration-300 origin-bottom" 
                    style={{ 
                        height: `${Math.max((v / MAX) * 100, 4)}%`, 
                        background: isDone 
                            ? 'linear-gradient(to top, #10b981, #34d399)' 
                            : `linear-gradient(to top, ${algo.color}, ${algo.color}cc)` ,
                        boxShadow: !isDone ? `0 0 12px 0 ${algo.color}20` : 'none'
                    }} 
                  />
                ))}

                {/* Vertical Progress Bar */}
                <div className="absolute top-0 right-0 w-1 h-full bg-slate-100 dark:bg-slate-800">
                    <div className="w-full bg-indigo-500 transition-all duration-300" style={{ height: `${progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between px-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{algo.name} Trace</span>
                 <span className="text-[10px] font-mono font-bold text-slate-500">{progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
