import React from 'react';
import { AlgorithmInfo } from '../../types/algorithmTypes';
import { ComplexityBadge } from './ComplexityBadge';
import { Zap } from 'lucide-react';

interface Props {
  info: AlgorithmInfo;
  leetcodeLink?: string;
}

export const AlgorithmOverviewCard: React.FC<Props> = ({ info, leetcodeLink }) => {
  return (
    <div className="surface-card p-5 md:p-6 flex flex-col gap-5 bg-white dark:bg-slate-900/40">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm">
          <Zap size={22} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight truncate">{info.name}</h2>
            {leetcodeLink && (
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" title="Linked to LeetCode" />
            )}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-none">{info.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-100 dark:border-slate-800/50">
        <ComplexityBadge label="Best Case" value={info.complexity.time.best} />
        <ComplexityBadge label="Average Case" value={info.complexity.time.average} />
        <ComplexityBadge label="Worst Case" value={info.complexity.time.worst} />
        <ComplexityBadge label="Space Complexity" value={info.complexity.space} type="space" />
      </div>
    </div>
  );
};
