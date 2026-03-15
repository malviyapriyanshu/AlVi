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
    <div className="surface-card p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
          <Zap size={20} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight leading-tight truncate">{info.name}</h2>
            {leetcodeLink && (
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            )}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{info.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/50">
        <ComplexityBadge label="Best" value={info.complexity.time.best} />
        <ComplexityBadge label="Average" value={info.complexity.time.average} />
        <ComplexityBadge label="Worst" value={info.complexity.time.worst} />
        <ComplexityBadge label="Space" value={info.complexity.space} type="space" />
      </div>
    </div>
  );
};
