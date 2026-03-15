import React from 'react';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  type?: 'time' | 'space';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ label, value, type = 'time' }) => {
  return (
    <div className="flex flex-col bg-slate-800/40 rounded-xl px-3 py-2 border border-slate-700/30">
      <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-mono font-bold ${type === 'time' ? 'text-indigo-400' : 'text-emerald-400'}`}>
        {value}
      </span>
    </div>
  );
};
