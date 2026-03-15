import React from 'react';
import { PointerIndicator } from './PointerIndicator';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: 'default' | 'compare' | 'comparing' | 'swap' | 'found' | 'found_result' | 'sorted' | 'discarded' | 'overwrite';
  pointers: string[];
}

/* Maps each state to a gradient + glow */
const stateStyles: Record<string, { gradient: string; glow: string; rounded?: string }> = {
  default:      { gradient: 'linear-gradient(to top, #6366f1, #a5b4fc)', glow: 'none' },
  compare:      { gradient: 'linear-gradient(to top, #f59e0b, #fde68a)', glow: '0 0 14px 3px rgba(245,158,11,0.45)' },
  comparing:    { gradient: 'linear-gradient(to top, #f59e0b, #fde68a)', glow: '0 0 14px 3px rgba(245,158,11,0.45)' },
  swap:         { gradient: 'linear-gradient(to top, #ef4444, #fca5a5)', glow: '0 0 16px 4px rgba(239,68,68,0.50)' },
  found:        { gradient: 'linear-gradient(to top, #10b981, #6ee7b7)', glow: '0 0 16px 4px rgba(16,185,129,0.50)' },
  found_result: { gradient: 'linear-gradient(to top, #10b981, #6ee7b7)', glow: '0 0 16px 4px rgba(16,185,129,0.50)' },
  sorted:       { gradient: 'linear-gradient(to top, #10b981, #34d399)', glow: 'none' },
  discarded:    { gradient: 'linear-gradient(to top, #334155, #475569)', glow: 'none' },
  overwrite:    { gradient: 'linear-gradient(to top, #8b5cf6, #c4b5fd)', glow: '0 0 14px 3px rgba(139,92,246,0.50)' },
};

export const ArrayBar: React.FC<ArrayBarProps> = React.memo(({ value, maxValue, state, pointers }) => {
  const barHeight = Math.max((value / maxValue) * 100, 4);
  const style = stateStyles[state] ?? stateStyles.default;
  const isActive = state !== 'default' && state !== 'discarded' && state !== 'sorted';
  const isDiscarded = state === 'discarded';

  return (
    <div className="relative flex-1 h-full flex flex-col items-center justify-end">
      {/* Top Pointers (pivot/M) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 items-center z-30">
        {pointers.filter(p => p === 'M' || p === 'pivot').map((label, i) => (
          <PointerIndicator key={i} label={label} color="bg-violet-500" isBottom={false} />
        ))}
      </div>

      {/* Value label */}
      <span className={`absolute text-[8px] sm:text-[9px] font-bold transition-all leading-none select-none hidden sm:block ${
        isActive ? 'text-white drop-shadow' : 'text-slate-400 dark:text-slate-500'
      }`} style={{ bottom: `calc(${barHeight}% + 6px)` }}>
        {value}
      </span>

      {/* Bar */}
      <div
        className={`w-full rounded-t-md transition-all duration-300 origin-bottom relative ${
          isActive ? 'scale-x-[1.05] z-10' : ''
        } ${isDiscarded ? 'opacity-25' : 'opacity-100'}`}
        style={{
          height: `${barHeight}%`,
          background: style.gradient,
          boxShadow: style.glow,
          minHeight: '4px',
        }}
      >
        {/* Top-shine */}
        <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-md bg-white/20" />
      </div>

      {/* Bottom Pointers (i, j, left, right…) */}
      <div className="absolute bottom-0 translate-y-full flex flex-col gap-0.5 items-center z-30">
        {pointers.filter(p => p !== 'M' && p !== 'pivot').map((label, i) => (
          <PointerIndicator key={i} label={label} color="bg-indigo-500" isBottom />
        ))}
      </div>
    </div>
  );
});
