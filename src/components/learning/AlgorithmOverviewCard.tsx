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
    <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/20 text-indigo-400">
              <Zap size={20} />
            </div>
            <h2 className="text-2xl font-black text-white">{info.name}</h2>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
            {info.description}
          </p>
        </div>
        
        {leetcodeLink && (
          <a 
            href={leetcodeLink} 
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
          >
            <BookOpen size={14} /> LeetCode <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <ComplexityBadge label="Best Time" value={info.complexity.time.best} />
        <ComplexityBadge label="Average Time" value={info.complexity.time.average} />
        <ComplexityBadge label="Worst Time" value={info.complexity.time.worst} />
        <ComplexityBadge label="Space" value={info.complexity.space} type="space" />
      </div>
    </div>
  );
};
