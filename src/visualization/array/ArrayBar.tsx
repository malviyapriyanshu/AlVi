import React from 'react';
import { PointerIndicator } from './PointerIndicator';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  state: 'default' | 'compare' | 'swap' | 'found' | 'sorted' | 'discarded';
  pointers: string[];
}

export const ArrayBar: React.FC<ArrayBarProps> = ({ value, maxValue, state, pointers }) => {
  const barHeight = Math.max((value / maxValue) * 100, 5);

  const colors = {
    default: 'bg-indigo-500 hover:bg-indigo-400',
    compare: 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    swap: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]',
    found: 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse',
    sorted: 'bg-emerald-500',
    discarded: 'bg-slate-700 opacity-40',
  };

  return (
    <div className="relative flex-1 flex flex-col items-center group transition-all duration-300">
      <div 
        className={`w-full rounded-t-sm transition-all duration-300 ${colors[state]}`}
        style={{ height: `${barHeight}%` }}
      />
      {pointers.map((label, i) => (
        <PointerIndicator key={i} label={label} color={label === 'L' ? 'bg-blue-500' : label === 'R' ? 'bg-purple-500' : 'bg-indigo-600'} />
      ))}
      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded border border-slate-700 font-mono z-10">
        {value}
      </div>
    </div>
  );
};
