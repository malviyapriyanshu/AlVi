import React from 'react';
import { AlgorithmInfo } from '../../types/algorithmTypes';
import { ComplexityBadge } from './ComplexityBadge';
import { BookOpen, ExternalLink, Zap } from 'lucide-react';

interface Props {
  info: AlgorithmInfo;
  leetcodeLink?: string;
}

export const AlgorithmOverviewCard: React.FC<Props> = ({ info, leetcodeLink }) => {
  return (
    <div className="glass-card p-8 flex flex-col gap-8 premium-glow rounded-[2rem]">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20" />
            <div className="relative bg-slate-900 p-3 rounded-2xl border border-indigo-500/30 text-indigo-400 shadow-xl">
              <Zap size={24} fill="currentColor" fillOpacity={0.2} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h2 className="text-3xl font-black text-white tracking-tight">{info.name}</h2>
              {leetcodeLink && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              )}
            </div>
            <div className="text-[13px] text-slate-400 leading-relaxed max-w-xl font-medium">
              {info.description}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
        <ComplexityBadge label="Best" value={info.complexity.time.best} />
        <ComplexityBadge label="Average" value={info.complexity.time.average} />
        <ComplexityBadge label="Worst" value={info.complexity.time.worst} />
        <ComplexityBadge label="Space" value={info.complexity.space} type="space" />
      </div>
    </div>
  );
};
