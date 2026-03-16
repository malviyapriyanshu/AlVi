import React from 'react';
import type { LearningPath } from '../../types/extended';
import { CheckCircle2, Lock, ChevronRight, Bookmark } from 'lucide-react';

interface Props {
  paths: LearningPath[];
  viewedAlgorithms: string[];
  onSelectAlgorithm?: (id: string) => void;
}

const levelStyles: Record<string, { badge: string; progress: string; text: string }> = {
  Beginner:     { badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', progress: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
  Intermediate: { badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', progress: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-300' },
  Advanced:     { badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', progress: 'bg-purple-500', text: 'text-purple-700 dark:text-purple-300' },
};

export const LearningPathPanel: React.FC<Props> = ({ paths, viewedAlgorithms, onSelectAlgorithm }) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {paths.map((path) => {
        const style = levelStyles[path.level];
        const completed = path.steps.filter(s => viewedAlgorithms.includes(s.algorithmId)).length;
        const total = path.steps.length;
        const pct = Math.round((completed / total) * 100);

        return (
          <div key={path.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest ${style.badge}`}>{path.level}</span>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                     <Bookmark size={14} className="text-indigo-500" />
                     <h3 className="text-lg font-black tracking-tight">{path.title}</h3>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">{path.description}</p>
              </div>
              <div className="shrink-0 flex items-center md:flex-col md:items-end gap-3 md:gap-1">
                <span className={`text-3xl font-black font-mono tracking-tighter ${style.text}`}>{pct}%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{completed} / {total} Units</span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-8 border border-slate-200/30 dark:border-slate-700/30 p-[2px]">
              <div className={`h-full rounded-full transition-all duration-700 shadow-sm ${style.progress}`} style={{ width: `${pct}%` }} />
            </div>

            {/* Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {path.steps.map((step, i) => {
                const done = viewedAlgorithms.includes(step.algorithmId);
                const prevDone = i === 0 || viewedAlgorithms.includes(path.steps[i - 1].algorithmId);
                const isLocked = !done && !prevDone;

                return (
                  <button 
                    key={step.algorithmId} 
                    onClick={() => !isLocked ? onSelectAlgorithm?.(step.algorithmId) : undefined}
                    className={`group/step relative flex flex-col gap-3 p-4 rounded-[20px] border transition-all duration-300 text-left
                      ${done 
                        ? 'bg-emerald-50/30 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20' 
                        : isLocked 
                          ? 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-900 opacity-60 cursor-not-allowed grayscale' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl border transition-colors ${
                        done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50' : 
                        isLocked ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200/50' : 
                        'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100/50'
                      }`}>
                        {done ? <CheckCircle2 size={14} strokeWidth={3} /> : isLocked ? <Lock size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                      </div>
                      {!isLocked && <ChevronRight size={14} className="text-slate-300 group-hover/step:translate-x-1 transition-transform" />}
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-black tracking-tight mb-1 ${
                        done ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-70' : 
                        isLocked ? 'text-slate-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {step.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 line-clamp-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
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
