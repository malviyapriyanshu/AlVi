import React from 'react';
import { PointerIndicator } from './PointerIndicator';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: 'default' | 'compare' | 'comparing' | 'swap' | 'found' | 'found_result' | 'sorted' | 'discarded' | 'overwrite';
  pointers: string[];
}

export const ArrayBar: React.FC<ArrayBarProps> = React.memo(({ value, maxValue, state, pointers }) => {
  const barHeight = Math.max((value / maxValue) * 100, 5);

  const colors: Record<string, string> = {
    default: 'bg-gradient-to-t from-slate-700 to-slate-500 border-slate-500/50',
    compare: 'bg-gradient-to-t from-amber-600 to-amber-400 border-amber-400/50 shadow-glow-amber z-10 scale-[1.03]',
    comparing: 'bg-gradient-to-t from-amber-600 to-amber-400 border-amber-400/50 shadow-glow-amber z-10 scale-[1.03]',
    swap: 'bg-gradient-to-t from-red-600 to-red-400 border-red-400/50 shadow-glow-red z-20 scale-[1.06]',
    found: 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-400/50 shadow-glow-emerald animate-pulse z-20',
    found_result: 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-400/50 shadow-glow-emerald animate-pulse z-20',
    sorted: 'bg-gradient-to-t from-emerald-700 to-emerald-500 border-emerald-500/50',
    discarded: 'bg-slate-800 border-slate-700/30 opacity-25 grayscale scale-95',
    overwrite: 'bg-gradient-to-t from-blue-600 to-blue-400 border-blue-400/50 shadow-glow-indigo z-20',
  };

  const hasPointer = pointers.length > 0;

  return (
    <div className="relative flex-1 h-full flex flex-col items-center group transition-all duration-300 justify-end px-[1px]">

      {/* Top Pointers */}
      <div className="absolute top-0 -translate-y-full mb-2 flex flex-col gap-1 items-center z-30">
        {pointers.filter(p => p === 'M' || p === 'pivot').map((label, i) => (
          <PointerIndicator key={i} label={label} color="bg-blue-500" isBottom={false} />
        ))}
      </div>

      {/* Bar */}
      <div
        className={`w-full rounded-t-md border-t transition-all duration-300 ${colors[state] || colors.default} relative overflow-hidden
          ${hasPointer && state === 'default' ? 'ring-1 ring-blue-400/40 border-blue-400/50' : ''}`}
        style={{ height: `${barHeight}%` }}
      >
        {/* Top shine */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-white/30" />
        {/* Left edge */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/15" />

        {/* Value Label */}
        <span className={`absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] font-bold transition-colors ${state !== 'default' ? 'text-white' : 'text-slate-500'}`}>
          {value}
        </span>
      </div>

      {/* Bottom Pointers */}
      <div className="absolute bottom-0 translate-y-full mt-2 flex flex-col gap-1 items-center z-30">
        {pointers.filter(p => p !== 'M' && p !== 'pivot').map((label, i) => (
          <PointerIndicator key={i} label={label} color="bg-blue-500" isBottom={true} />
        ))}
      </div>
    </div>
  );
});
