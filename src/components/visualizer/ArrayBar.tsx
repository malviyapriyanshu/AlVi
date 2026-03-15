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
      case 'found': return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] z-10';
      case 'left_boundary': return 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
      case 'right_boundary': return 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      case 'mid_element': return 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
      case 'discarded': return 'bg-slate-700 opacity-30';
      case 'highlighted': return 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]';
      default: return 'bg-indigo-500';
    }
  };

  const height = (value / maxValue) * 100;
  const widthClass = totalBars <= 20 ? 'w-12' : totalBars <= 50 ? 'w-6' : totalBars <= 100 ? 'w-4' : 'w-2';

  return (
    <div className={`flex flex-col justify-end items-center h-full relative ${widthClass}`} style={{ margin: '0 3px' }}>
      {pointers && pointers.length > 0 && (
        <div className="absolute top-[-30px] flex flex-col items-center justify-center w-full">
          <div className="flex gap-1 justify-center">
            {pointers.map((p, idx) => (
              <span key={idx} className={`text-xs font-bold px-1 rounded-sm
                ${p === 'L' ? 'bg-blue-500 text-white' :
                  p === 'R' ? 'bg-purple-500 text-white' :
                  p === 'M' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-600 text-white'}`}>
                {p}
              </span>
            ))}
          </div>
          <span className="text-slate-400 text-xs leading-none mt-1">↓</span>
        </div>
      )}
      {totalBars <= 40 && <span className="text-xs text-slate-400 mb-1">{value}</span>}
      <div
        className={`w-full rounded-t-md transition-all duration-200 ease-in-out ${getColor(state)}`}
        style={{ height: `${Math.max(height, 5)}%` }}
      />
    </div>
  );
};
