import React from 'react';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  type?: 'time' | 'space';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ label, value, type = 'time' }) => {
  return (
    <div className="flex flex-col bg-gray-50/50 dark:bg-slate-800/40 rounded-xl px-3.5 py-2.5 border border-gray-100 dark:border-slate-700/30 shadow-sm dark:shadow-none">
      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</span>
      <span className={`text-xs md:text-sm font-mono font-extrabold ${type === 'time' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
        {value}
      </span>
    </div>
  );
};
