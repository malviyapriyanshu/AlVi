import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  RotateCcw, 
  Play, 
  Pause, 
  Activity, 
  Zap,
  Trophy,
  ArrowRight,
  TrendingDown,
  Timer
} from 'lucide-react';
import { AnimationStep } from '../../types/animationTypes';
import { useTheme } from '../../theme/themeProvider';
import { cn } from '../../utils/cn';

import { useSynthesizedSound } from '../../hooks/useSynthesizedSound';

interface AlgoRun {
  id: string;
  name: string;
  color: string;
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
  const { resolvedTheme } = useTheme();
  const { playClick, playSuccess } = useSynthesizedSound();
  const [stepIndices, setStepIndices] = useState<number[]>(() => algorithms.map(() => 0));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(40);
  const timerRef = useRef<number | null>(null);
  const MAX_VAL = Math.max(...array, 1);

  const allSteps = useMemo(() => algorithms.map(a => a.fn([...array])), [algorithms, array]);
  const stats = useMemo(() => allSteps.map(countStats), [allSteps]);
  const allDone = stepIndices.every((si, i) => si >= allSteps[i].length - 1);

  const tick = () => {
    setStepIndices(prev => prev.map((si, i) => Math.min(si + 1, allSteps[i].length - 1)));
  };

  useEffect(() => {
    if (isRunning && !allDone) {
      timerRef.current = window.setInterval(tick, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (allDone) {
        setIsRunning(false);
        playSuccess();
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, allDone, speed, allSteps, playSuccess]);

  const getArrayAtStep = (steps: AnimationStep[], si: number, baseArr: number[]) => {
    const arr = [...baseArr];
    // In comparison mode, we reconstruct history up to current SI for each algorithm frame
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
    playClick();
    setIsRunning(false);
    setStepIndices(algorithms.map(() => 0));
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1600px] mx-auto min-h-0 h-full overflow-hidden">
      {/* Dashboard Control Center */}
      <div className="bg-background-primary border border-border rounded-[40px] p-8 shadow-sm relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-accent-primary rounded-2xl flex items-center justify-center text-white shadow-glow-indigo shrink-0">
                <BarChart3 size={28} />
            </div>
            <div>
               <h2 className="text-3xl font-black text-text-primary tracking-tighter leading-none mb-2">Performance Race</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-40">Comparative Benchmarking Core</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-6 hidden xl:flex">
               <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1.5 opacity-60">Race Progress</span>
               <div className="flex gap-1.5">
                  {stepIndices.map((si, i) => (
                    <div key={i} className="w-8 h-1 bg-border rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-accent-primary" 
                         animate={{ width: `${(si / Math.max(allSteps[i].length - 1, 1)) * 100}%` }} 
                       />
                    </div>
                  ))}
               </div>
            </div>

            <button 
              onClick={() => setIsRunning(!isRunning)} 
              disabled={allDone}
              className={cn(
                "flex items-center gap-3 px-8 h-14 rounded-full font-black text-sm tracking-widest uppercase transition-all active:scale-95 disabled:opacity-30",
                isRunning ? 'bg-background-secondary text-text-secondary border border-border' : 'bg-accent-primary text-white shadow-glow-indigo'
              )}
            >
              {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
              <span>{isRunning ? 'Halt Process' : 'Engage Race'}</span>
            </button>
            <button 
              onClick={handleReset} 
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-background-secondary border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all active:scale-90"
              title="Reset All Traces"
            >
              <RotateCcw size={22} />
            </button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
           {algorithms.map((algo, i) => {
              const s = stats[i];
              const maxCmp = Math.max(...stats.map(x => x.comparisons), 1);
              const isDone = stepIndices[i] >= allSteps[i].length - 1;
              const progress = Math.round((stepIndices[i] / Math.max(allSteps[i].length - 1, 1)) * 100);

              return (
                 <motion.div 
                   key={algo.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-background-secondary/50 border border-border rounded-3xl p-5 hover:border-accent-primary/20 transition-colors group"
                 >
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: algo.color }} />
                          <span className="text-sm font-black text-text-primary tracking-tight">{algo.name}</span>
                       </div>
                       <div className={cn(
                         "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all duration-500",
                         isDone ? "bg-success/10 text-success border-success/20" : "bg-slate-100 dark:bg-slate-800 text-text-secondary border-border"
                       )}>
                          {isDone ? <span className="flex items-center gap-1"><Trophy size={10} /> Winner</span> : <span>Active</span>}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div>
                          <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-2 text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-60">
                                <Activity size={10} /> Comparisons
                             </div>
                             <span className="text-xs font-mono font-black text-text-primary">{s.comparisons}</span>
                          </div>
                          <div className="h-1.5 w-full bg-border/30 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(s.comparisons / maxCmp) * 100}%` }}
                               className="h-full rounded-full" 
                               style={{ backgroundColor: algo.color }} 
                             />
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                          <MetricBox icon={<Zap size={10} />} label="Swaps" value={s.swaps} color={algo.color} />
                          <MetricBox icon={<Timer size={10} />} label="Step" value={stepIndices[i]} color={algo.color} />
                       </div>
                    </div>
                 </motion.div>
              );
           })}
        </div>
      </div>

      {/* Race Lanes */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
         {algorithms.map((algo, i) => {
           const si = stepIndices[i];
           const curArr = getArrayAtStep(allSteps[i], si, array);
           const isDone = si >= allSteps[i].length - 1;
           const progress = Math.round((si / Math.max(allSteps[i].length - 1, 1)) * 100);

           return (
             <div key={algo.id} className="flex flex-col gap-4 h-full min-h-0">
               <div className="flex-1 bg-background-primary rounded-[40px] border border-border p-6 flex items-end justify-center gap-[2px] overflow-hidden relative shadow-sm group/lane">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                       style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  <div className="flex-1 h-full flex items-end gap-[1px]">
                    {curArr.map((v, idx) => (
                      <motion.div 
                        key={idx} 
                        layout
                        initial={false}
                        animate={{ 
                          height: `${Math.max((v / MAX_VAL) * 100, 4)}%`,
                          backgroundColor: isDone ? '#10b981' : algo.color
                        }}
                        className="flex-1 rounded-t-lg transition-colors duration-500" 
                        style={{ 
                            boxShadow: !isDone ? `${algo.color}20 0px 4px 12px` : 'none'
                        }} 
                      />
                    ))}
                  </div>

                  {/* Lane Progress Vertical */}
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-border/20">
                     <motion.div 
                       className="w-full bg-accent-primary shadow-glow-indigo rounded-b-full" 
                       style={{ height: `${progress}%` }} 
                     />
                  </div>
                  
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background-secondary border border-border text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-0 group-hover/lane:opacity-100 transition-opacity whitespace-nowrap">
                     Trace Engine: {algo.id}
                  </div>
               </div>
               
               <div className="flex items-center justify-between px-3">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDone ? '#10b981' : algo.color }} />
                     <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">{algo.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-accent-primary">{progress}%</span>
               </div>
             </div>
           );
         })}
      </div>

      {/* Modal - Race Results Celebration */}
      <AnimatePresence>
        {allDone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-primary/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-background-primary border border-border rounded-[40px] p-10 shadow-premium text-center relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-primary via-indigo-400 to-accent-primary" />
               <div className="w-20 h-20 bg-accent-primary/10 rounded-3xl flex items-center justify-center text-accent-primary mx-auto mb-6 shadow-glow-indigo">
                  <Trophy size={40} />
               </div>
               <h2 className="text-4xl font-black text-text-primary tracking-tighter mb-2">Race Complete!</h2>
               <p className="text-xs font-bold text-text-secondary mb-8 italic">"Efficiency is the soul of computation."</p>

               <div className="space-y-3 mb-10">
                  {algorithms.map((algo, i) => (
                    <div key={algo.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-2xl border border-border">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: algo.color }} />
                          <span className="text-sm font-black text-text-primary">{algo.name}</span>
                       </div>
                       <span className="text-xs font-mono font-black text-text-secondary">{stats[i].comparisons} Cmp</span>
                    </div>
                  ))}
               </div>

               <button 
                onClick={handleReset}
                className="w-full h-14 bg-text-primary text-background-primary rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
               >
                  Relaunch Benchmarks
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MetricBox = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div className="bg-background-primary/50 p-2.5 rounded-2xl border border-border flex items-center justify-between">
    <div className="flex items-center gap-1.5 text-[8px] font-black text-text-secondary uppercase tracking-widest opacity-60">
       {icon} {label}
    </div>
    <span className="text-[10px] font-mono font-black text-text-primary transition-colors" style={{ color: value > 0 ? color : undefined }}>{value}</span>
  </div>
);
