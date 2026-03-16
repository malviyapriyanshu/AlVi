import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, Trophy, Timer } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AlgorithmEntry {
  id: string;
  name: string;
  color: string;
  fn: (arr: number[]) => any[];
}

interface Props {
  array: number[];
  algorithms: AlgorithmEntry[];
}

export const ComparisonCanvas: React.FC<Props> = ({ array, algorithms }) => {
  const [results, setResults] = useState<Record<string, { steps: any[], index: number, finished: boolean, time?: number }>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const runRace = useCallback(() => {
    const newResults: typeof results = {};
    setWinner(null);
    
    algorithms.forEach(algo => {
      const start = performance.now();
      const steps = algo.fn([...array]);
      const end = performance.now();
      newResults[algo.id] = { steps, index: 0, finished: false, time: Math.round(end - start) };
    });

    setResults(newResults);
    setIsRunning(true);
  }, [array, algorithms]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setResults(prev => {
        const next = { ...prev };
        let allFinished = true;
        let potentialWinnerId: string | null = null;

        Object.keys(next).forEach(id => {
          if (next[id].index < next[id].steps.length - 1) {
            next[id].index += 1;
            allFinished = false;
          } else if (!next[id].finished) {
            next[id].finished = true;
            if (!winner && !potentialWinnerId) {
                potentialWinnerId = id;
            }
          }
        });

        if (potentialWinnerId && !winner) {
            setWinner(potentialWinnerId);
        }

        if (allFinished) {
          setIsRunning(false);
          clearInterval(interval);
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isRunning, winner]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
           <h3 className="text-xl font-black text-text-primary tracking-tighter uppercase">Algorithm Duel</h3>
           <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] opacity-40">Performance Benchmark</span>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={runRace}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary text-white font-black text-xs uppercase tracking-widest shadow-glow-indigo disabled:opacity-50"
            >
               <Play size={14} /> Start Race
            </button>
            <button 
              onClick={() => { setResults({}); setIsRunning(false); setWinner(null); }}
              className="p-2 rounded-xl bg-background-secondary border border-border text-text-secondary hover:text-text-primary"
            >
               <RotateCcw size={14} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1">
        {algorithms.map(algo => {
          const res = results[algo.id];
          const isWinner = winner === algo.id;
          const currentArr = res ? applySteps(array, res.steps, res.index) : array;

          return (
            <div key={algo.id} className={cn(
                "relative bg-background-secondary/50 border rounded-3xl p-6 flex flex-col transition-all duration-500",
                isWinner ? "border-success shadow-glow-success bg-success/5" : "border-border"
            )}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-8 rounded-full" style={{ backgroundColor: algo.color }} />
                   <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Algorithm</span>
                      <span className="text-sm font-black text-text-primary uppercase tracking-tight">{algo.name}</span>
                   </div>
                </div>
                <div className="flex flex-col items-end leading-none gap-2">
                   {res?.finished && <span className="text-[9px] font-mono font-black text-success uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> Finished</span>}
                   {res?.time !== undefined && <span className="text-[10px] font-mono font-bold text-text-secondary opacity-60 flex items-center gap-1"><Timer size={10} /> {res.time}ms (Calc)</span>}
                </div>
              </div>

              <div className="flex-1 flex items-end justify-center gap-1 min-h-[150px]">
                {currentArr.map((val, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    style={{ 
                        height: `${(val / Math.max(...array)) * 100}%`,
                        backgroundColor: res?.finished ? (isWinner ? '#22c55e' : algo.color) : algo.color
                    }}
                    className="w-full min-w-[4px] rounded-t-sm opacity-80"
                  />
                ))}
              </div>

              <AnimatePresence>
                {isWinner && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-success flex items-center justify-center text-white shadow-glow-success z-10"
                  >
                     <Trophy size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper to apply steps up to index
function applySteps(initial: number[], steps: any[], index: number) {
    const arr = [...initial];
    for(let i=0; i<=index && i<steps.length; i++) {
        const step = steps[i];
        if(step.type === 'swap') {
            const [a, b] = step.indices;
            [arr[a], arr[b]] = [arr[b], arr[a]];
        } else if (step.type === 'overwrite') {
            step.indices.forEach((idx: number) => arr[idx] = step.value);
        }
    }
    return arr;
}
