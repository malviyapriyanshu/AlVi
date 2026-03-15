import React from 'react';
import { TrendingUp, Repeat, ArrowUpDown, Award } from 'lucide-react';

interface Props {
  algorithmName: string;
  comparisons: number;
  swaps: number;
  overwrites: number;
  arraySize: number;
}

const StatBox: React.FC<{ icon: React.ReactNode; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div className={`flex flex-col gap-1 bg-slate-900/50 rounded-xl p-3 border border-slate-700/50`}>
    <div className={`${color} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider`}>
      {icon} {label}
    </div>
    <div className="text-xl font-black text-white">{value.toLocaleString()}</div>
  </div>
);

export const AlgorithmMetrics: React.FC<Props> = ({ algorithmName, comparisons, swaps, overwrites, arraySize }) => {
  const total = comparisons + swaps + overwrites;
  const nSq = arraySize * arraySize;

  return (
    <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-indigo-400" size={16} />
        <h3 className="text-sm font-bold text-white">{algorithmName} — Run Metrics</h3>
        <span className="ml-auto text-xs text-slate-500 font-mono">N={arraySize}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <StatBox icon={<ArrowUpDown size={10} />} label="Comparisons" value={comparisons} color="text-yellow-400" />
        <StatBox icon={<Repeat size={10} />} label="Swaps" value={swaps} color="text-red-400" />
        <StatBox icon={<Award size={10} />} label="Writes" value={overwrites} color="text-blue-400" />
        <StatBox icon={<TrendingUp size={10} />} label="Total Ops" value={total} color="text-indigo-400" />
      </div>

      {comparisons > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Operations vs O(N²) baseline ({nSq})</span>
            <span>{Math.round((total / nSq) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((total / nSq) * 100, 100)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};
