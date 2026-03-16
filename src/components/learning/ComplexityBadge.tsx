import React from 'react';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  type?: 'time' | 'space';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ label, value, type = 'time' }) => {
  const isTime = type === 'time';
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]">
      <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className={`text-[13px] font-mono font-black tracking-tight ${
        isTime ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-300'
      }`}>
        {value}
      </span>
    </div>
  );
};
