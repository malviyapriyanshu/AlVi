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
    default: 'from-indigo-600 to-indigo-400 border-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-300',
    compare: 'from-yellow-400 to-amber-300 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]',
    comparing: 'from-yellow-400 to-amber-300 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]',
    swap: 'from-rose-600 to-pink-400 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-105',
    found: 'from-orange-500 to-amber-400 border-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse',
    found_result: 'from-orange-500 to-amber-400 border-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse',
    sorted: 'from-emerald-600 to-teal-400 border-emerald-400',
    discarded: 'from-slate-800 to-slate-700 border-slate-700 opacity-30 grayscale',
    overwrite: 'from-purple-600 to-fuchsia-400 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]',
  };

  return (
    <div className="relative flex-1 h-full flex flex-col items-center group transition-all duration-300 justify-end px-[1px]">
      {/* Bar Content */}
      <div 
        className={`w-full rounded-t-lg border-t-2 transition-all duration-500 bg-gradient-to-b ${colors[state]} shadow-lg relative overflow-hidden`}
        style={{ height: `${barHeight}%` }}
      >
        {/* Glossy Overlay */}
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-white/10 to-transparent opacity-20" />
        <div className="absolute inset-y-0 left-0 w-1 bg-white/10" />
        
        {/* Value Label (Compact) */}
        {barHeight > 15 && (
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/40 rotate-90 origin-center whitespace-nowrap">
                {value}
            </span>
        )}
      </div>

      {/* Pointers Section */}
      <div className="absolute bottom-0 translate-y-full pt-2 flex flex-col gap-1 w-full items-center z-10">
        {pointers.map((label, i) => (
            <div key={i} className="animate-in slide-in-from-bottom-2 duration-300">
                <PointerIndicator label={label} color={label === 'L' ? 'bg-blue-500' : label === 'R' ? 'bg-purple-500' : 'bg-indigo-600'} />
            </div>
        ))}
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-800 text-white text-[12px] px-2 py-1 rounded-lg border border-slate-700 font-bold shadow-2xl z-20 pointer-events-none translate-y-2 group-hover:translate-y-0">
        Value: {value}
      </div>
    </div>
  );
};
