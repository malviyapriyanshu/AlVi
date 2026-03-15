import React from 'react';
import type { LearningPath } from '../../types/extended';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';

interface Props {
  paths: LearningPath[];
  viewedAlgorithms: string[];
  onSelectAlgorithm?: (id: string) => void;
}

const levelColors: Record<string, { bg: string; border: string; badge: string; dot: string }> = {
  Beginner:     { bg: 'bg-emerald-500/5',  border: 'border-emerald-500/20', badge: 'bg-emerald-500/20 text-emerald-400', dot: 'bg-emerald-500' },
  Intermediate: { bg: 'bg-blue-500/5',     border: 'border-blue-500/20',    badge: 'bg-blue-500/20 text-blue-400',    dot: 'bg-blue-500' },
  Advanced:     { bg: 'bg-purple-500/5',   border: 'border-purple-500/20',  badge: 'bg-purple-500/20 text-purple-400', dot: 'bg-purple-500' },
};

export const LearningPathPanel: React.FC<Props> = ({ paths, viewedAlgorithms, onSelectAlgorithm }) => {
  return (
    <div className="flex flex-col gap-5">
      {paths.map((path) => {
        const colors = levelColors[path.level];
        const completed = path.steps.filter(s => viewedAlgorithms.includes(s.algorithmId)).length;
        const total = path.steps.length;
        const pct = Math.round((completed / total) * 100);

        return (
          <div key={path.id} className={`rounded-2xl border p-5 ${colors.bg} ${colors.border}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>{path.level}</span>
                  <h3 className="text-sm font-bold text-white">{path.title}</h3>
                </div>
                <div className="text-xs text-slate-500">{path.description}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-white">{pct}%</div>
                <div className="text-[10px] text-slate-500">{completed}/{total}</div>
              </div>
            </div>

            <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-4">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${colors.dot}`} style={{ width: `${pct}%` }} />
            </div>

            <div className="flex flex-col gap-2">
              {path.steps.map((step, i) => {
                const done = viewedAlgorithms.includes(step.algorithmId);
                const prevDone = i === 0 || viewedAlgorithms.includes(path.steps[i - 1].algorithmId);
                return (
                  <button key={step.algorithmId} onClick={() => done || prevDone ? onSelectAlgorithm?.(step.algorithmId) : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all
                      ${done ? 'bg-slate-700/30 border-slate-600/50' : prevDone ? 'bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/30 cursor-pointer' : 'bg-slate-800/20 border-slate-700/30 opacity-50 cursor-not-allowed'}`}>
                    {done
                      ? <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      : prevDone
                        ? <div className={`w-4 h-4 rounded-full border-2 ${colors.dot.replace('bg-', 'border-')} flex-shrink-0`} />
                        : <Lock size={14} className="text-slate-600 flex-shrink-0" />
                    }
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold ${done ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{step.name}</div>
                      <div className="text-xs text-slate-500 truncate">{step.description}</div>
                    </div>
                    {(done || prevDone) && <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
