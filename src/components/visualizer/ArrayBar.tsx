import React from 'react';
import type { BarState } from '../../types';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: BarState;
  pointers: string[];
  totalBars: number;
}

export const ArrayBar: React.FC<ArrayBarProps> = ({ value, maxValue, state, pointers, totalBars }) => {
  const getColor = (s: BarState) => {
    switch (s) {
      case 'comparing': return 'bg-yellow-400';
      case 'swapping': return 'bg-red-500';
      case 'sorted': return 'bg-emerald-500';
      case 'found': return 'bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.8)] z-10 animate-pulse';
      case 'left_boundary': return 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
      case 'right_boundary': return 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      case 'mid_element': return 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
      case 'discarded': return 'bg-slate-700 opacity-30';
      case 'highlighted': return 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]';
      default: return 'bg-indigo-500';
    }
  };

  const height = (value / maxValue) * 100;

  return (
    <div className="flex flex-col justify-end items-center h-full relative flex-1 min-w-[4px] max-w-[48px]" style={{ margin: '0 1px' }}>
      {pointers && pointers.length > 0 && (
        <div className="absolute top-[-28px] flex flex-col items-center justify-center w-full">
          <div className="flex gap-0.5 justify-center">
            {pointers.map((p, idx) => (
              <span key={idx} className={`text-[10px] font-bold px-0.5 rounded-sm leading-tight
                ${p === 'L' ? 'bg-blue-500 text-white' :
                  p === 'R' ? 'bg-purple-500 text-white' :
                  p === 'M' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-600 text-white'}`}>
                {p}
              </span>
            ))}
          </div>
          <span className="text-slate-400 text-[10px] leading-none mt-0.5">↓</span>
        </div>
      )}
      {totalBars <= 30 && <span className="text-[10px] text-slate-400 mb-0.5 hidden sm:block">{value}</span>}
      <div
        className={`w-full rounded-t-md transition-all duration-200 ease-in-out ${getColor(state)}`}
        style={{ height: `${Math.max(height, 5)}%` }}
      />
    </div>
  );
};
