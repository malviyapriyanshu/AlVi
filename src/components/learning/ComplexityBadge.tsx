import React from 'react';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  type?: 'time' | 'space';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ label, value, type = 'time' }) => {
  return (
    <div className="flex flex-col bg-slate-900/50 rounded-xl px-4 py-2 border border-slate-700/50">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      <span className={`text-sm font-mono font-bold ${type === 'time' ? 'text-indigo-400' : 'text-emerald-400'}`}>
        {value}
      </span>
    </div>
  );
};
