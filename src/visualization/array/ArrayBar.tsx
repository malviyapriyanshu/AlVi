import React from 'react';
import { PointerIndicator } from './PointerIndicator';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: 'default' | 'compare' | 'comparing' | 'swap' | 'found' | 'found_result' | 'sorted' | 'discarded' | 'overwrite';
  pointers: string[];
}

export const ArrayBar: React.FC<ArrayBarProps> = ({ value, maxValue, state, pointers }) => {
  const barHeight = Math.max((value / maxValue) * 100, 5);

  const colors = {
    default: 'from-slate-700 to-slate-800 border-slate-600 shadow-lg',
    compare: 'from-yellow-400 to-yellow-600 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)] z-10 scale-105',
    comparing: 'from-yellow-400 to-yellow-600 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)] z-10 scale-105',
    swap: 'from-rose-500 to-rose-700 border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.5)] z-20 scale-110',
    found: 'from-emerald-400 to-emerald-600 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-pulse z-20',
    found_result: 'from-emerald-400 to-emerald-600 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-pulse z-20',
    sorted: 'from-emerald-500 to-emerald-700 border-emerald-400 opacity-90',
    discarded: 'from-slate-900 to-slate-850 border-slate-800 opacity-20 grayscale scale-95',
    overwrite: 'from-blue-400 to-blue-600 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] z-20',
  };

  const hasPointer = pointers.length > 0;

  return (
    <div className="relative flex-1 h-full flex flex-col items-center group transition-all duration-500 justify-end px-[1px]">
      
      {/* Top Pointers (e.g. Pivot or Mid) */}
      <div className="absolute top-0 -translate-y-full mb-2 flex flex-col gap-1 items-center z-30">
         {pointers.filter(p => p === 'M' || p === 'pivot').map((label, i) => (
            <PointerIndicator key={i} label={label} color="bg-blue-400" isBottom={false} />
         ))}
      </div>

      {/* Bar Content */}
      <div 
        className={`w-full rounded-t-xl border-t-2 transition-all duration-500 bg-gradient-to-b ${colors[state]} relative overflow-hidden
          ${hasPointer && state === 'default' ? 'ring-2 ring-blue-400/50 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}`}
        style={{ height: `${barHeight}%` }}
      >
        {/* Visual Polish */}
        <div className="absolute inset-x-0 top-0 h-[10%] bg-white/20 blur-[1px]" />
        <div className="absolute inset-y-0 left-0 w-[2px] bg-white/10" />
        
        {/* Value Label */}
        <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black transition-colors ${state !== 'default' ? 'text-white' : 'text-slate-500'}`}>
          {value}
        </span>
      </div>

      {/* Bottom Pointers (e.g. L, R, i, j) */}
      <div className="absolute bottom-0 translate-y-full mt-2 flex flex-col gap-1 items-center z-30">
        {pointers.filter(p => p !== 'M' && p !== 'pivot').map((label, i) => (
            <PointerIndicator key={i} label={label} color="bg-blue-500" isBottom={true} />
        ))}
      </div>
    </div>
  );
};
