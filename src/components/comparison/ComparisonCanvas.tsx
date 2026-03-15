import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import type { AnimationStep } from '../../types';

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
        if (arr[indices[0]] !== undefined && arr[indices[1]] !== undefined) {
          [arr[indices[0]], arr[indices[1]]] = [arr[indices[1]], arr[indices[0]]];
        }
      } else if (step.type === 'overwrite' && indices[0] !== undefined && step.value !== undefined) {
        if (arr[indices[0]] !== undefined) arr[indices[0]] = step.value;
      }
    }
    return arr;
  };

  const handleReset = () => {
    setIsRunning(false);
    setStepIndices(algorithms.map(() => 0));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={() => setIsRunning(!isRunning)} disabled={allDone}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all text-sm shadow-lg disabled:opacity-50">
          {isRunning ? 'Pause' : 'Race!'}
        </button>
        <button onClick={handleReset} className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all text-sm border border-slate-700">Reset</button>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Speed:</span>
          <input type="range" min="10" max="300" value={300 - speed + 10} onChange={e => setSpeed(300 - parseInt(e.target.value) + 10)}
            className="w-24 accent-indigo-500" />
        </div>
        <div className="ml-auto text-xs text-slate-500 font-mono">Step {Math.max(...stepIndices)} / {maxStep}</div>
      </div>

      {/* Side-by-side visualizers */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${algorithms.length}, 1fr)` }}>
        {algorithms.map((algo, i) => {
          const si = stepIndices[i];
          const curArr = getArrayAtStep(allSteps[i], si, array);
          const isDone = si >= allSteps[i].length - 1;
          return (
            <div key={algo.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: algo.color }} />
                <span className="text-sm font-bold text-white">{algo.name}</span>
                {isDone && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Done ✓</span>}
              </div>
              <div className="h-40 bg-slate-800/40 rounded-xl border border-slate-700/50 p-2 flex items-end gap-[1px] overflow-hidden">
                {curArr.map((v, idx) => (
                  <div key={idx} className="flex-1 rounded-t-sm transition-all duration-75" style={{ height: `${Math.max((v / MAX) * 100, 3)}%`, backgroundColor: isDone ? '#34d399' : algo.color }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats table */}
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="text-indigo-400" size={16} />
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Performance Metrics</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-slate-500 uppercase tracking-wider text-left">
                <th className="pb-2 pr-4">Algorithm</th>
                <th className="pb-2 pr-4">Comparisons</th>
                <th className="pb-2 pr-4">Swaps</th>
                <th className="pb-2">Writes</th>
              </tr>
            </thead>
            <tbody>
              {algorithms.map((algo, i) => {
                const s = stats[i];
                const maxCmp = Math.max(...stats.map(x => x.comparisons), 1);
                return (
                  <tr key={algo.id} className="border-t border-slate-700/50">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: algo.color }} />{algo.name}</div>
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 bg-slate-700 rounded-full h-1.5"><div className="h-1.5 rounded-full transition-all" style={{ width: `${(s.comparisons / maxCmp) * 100}%`, backgroundColor: algo.color }} /></div>
                        <span className="text-slate-300 font-mono w-10 text-right">{s.comparisons}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-300 font-mono">{s.swaps}</td>
                    <td className="py-2 text-slate-300 font-mono">{s.overwrites}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
